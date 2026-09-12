from pathlib import Path
import re

code_path = Path('code.js')
index_path = Path('Index.html')
apply_wf = Path('.github/workflows/apply-ai-patch.yml')
deploy_wf = Path('.github/workflows/deploy-apps-script.yml')

code = code_path.read_text(encoding='utf-8')
index = index_path.read_text(encoding='utf-8')

# Version
code = code.replace("const APP_VERSION = 'V10.10.7';", "const APP_VERSION = 'V10.10.8';", 1)
index = index.replace('let APP_VERSION="V10.10.7";', 'let APP_VERSION="V10.10.8";', 1)
index = index.replace('<title>QL KHO THÀNH ĐỨC · V10.10.7</title>', '<title>QL KHO THÀNH ĐỨC · V10.10.8</title>', 1)

old_cfg = """// V10.10.6 · Resolver V2: confidence chuẩn hóa + chặn đoán variant/tình trạng.
const AI_RESOLVER_CONFIG = Object.freeze({
  VERSION: 'RESOLVER_V2_2026-09-11',
  AUTO_RESOLVE_MIN_CONFIDENCE: 88,
  EXACT_MODEL_CONFIDENCE: 96,
  HIGH_CONFIDENCE_FLOOR: 88,
  MAX_CANDIDATES: 8
});"""
new_cfg = """// V10.10.8 · Command Resolver V3: ưu tiên hoàn thành phiếu, chỉ hỏi khi thực sự còn cạnh tranh gần nhau.
const AI_RESOLVER_CONFIG = Object.freeze({
  VERSION: 'COMMAND_RESOLVER_V3_2026-09-12',
  AUTO_RESOLVE_MIN_CONFIDENCE: 82,
  EXPLICIT_VARIANT_MIN_CONFIDENCE: 78,
  EXACT_MODEL_CONFIDENCE: 96,
  HIGH_CONFIDENCE_FLOOR: 84,
  DECISIVE_MARGIN: 45,
  NEAR_TIE_MARGIN: 28,
  MAX_CANDIDATES: 8
});"""
if old_cfg not in code:
    raise SystemExit('Resolver config anchor not found')
code = code.replace(old_cfg, new_cfg, 1)

code = code.replace("VERSION: 'AGENT_V3.2_HISTORICAL_VOUCHER_2026-09-11',\n  STATE_VERSION: 'CTX_V1',\n  MAX_TOOL_ROUNDS: 3,",
                    "VERSION: 'AGENT_V3.3_COMMAND_RESOLVER_2026-09-12',\n  STATE_VERSION: 'CTX_V2',\n  MAX_TOOL_ROUNDS: 4,", 1)

old_decision = """  if (top.score<260) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE',ruleId:'R46'},confidence,margin);
  if (second && second.score>=170 && margin<70) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'AMBIGUOUS',ruleId:'R46'},Math.min(confidence,79),margin);
  if (confidence < AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE) {
    return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE_V2',ruleId:'R46'},confidence,margin);
  }
  confidence = Math.max(confidence, AI_RESOLVER_CONFIG.HIGH_CONFIDENCE_FLOOR);
  return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:'HIGH_CONFIDENCE',ruleId:'R11'},confidence,margin);"""
new_decision = """  // V3: nếu chỉ còn một ứng viên tương thích rõ ràng thì ưu tiên hoàn thành phiếu.
  // Chỉ hỏi lại khi top-2 thực sự gần nhau; variant rõ (WB/ES/CH/INKVIET/...) được xem là tín hiệu mạnh.
  if (top.score<240) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE',ruleId:'R46'},confidence,margin);
  const explicitVariants = aiVariantTokens_(raw);
  const hasExplicitVariant = explicitVariants.length > 0;
  const decisive = !second || second.score < 140 || margin >= AI_RESOLVER_CONFIG.DECISIVE_MARGIN;
  const nearTie = second && second.score >= 170 && margin < AI_RESOLVER_CONFIG.NEAR_TIE_MARGIN;
  if (nearTie) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'AMBIGUOUS_NEAR_TIE_V3',ruleId:'R46'},Math.min(confidence,79),margin);
  const minConfidence = hasExplicitVariant ? AI_RESOLVER_CONFIG.EXPLICIT_VARIANT_MIN_CONFIDENCE : AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE;
  if (confidence < minConfidence && !decisive) {
    return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE_V3',ruleId:'R46'},confidence,margin);
  }
  if (confidence < minConfidence && decisive && top.score < 280) {
    return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE_V3',ruleId:'R46'},confidence,margin);
  }
  confidence = Math.max(confidence, hasExplicitVariant ? AI_RESOLVER_CONFIG.EXPLICIT_VARIANT_MIN_CONFIDENCE : AI_RESOLVER_CONFIG.HIGH_CONFIDENCE_FLOOR);
  return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:decisive?'DECISIVE_MATCH_V3':'HIGH_CONFIDENCE_V3',ruleId:'R11'},confidence,margin);"""
if old_decision not in code:
    raise SystemExit('Resolver decision anchor not found')
code = code.replace(old_decision, new_decision, 1)

old_ret = """    clarification:'AI xác nhận CHƯA GHI SỔ. Không có thay đổi nào được ghi vào tồn kho hoặc nhật ký cho đến khi anh xử lý ngoại lệ và xác nhận lại.',
    exceptions:exceptions,unresolved:exceptions,createdAt:Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')"""
new_ret = """    clarification:'AI xác nhận CHƯA GHI SỔ. Không có thay đổi nào được ghi vào tồn kho hoặc nhật ký cho đến khi anh xử lý ngoại lệ và xác nhận lại.',
    actionPlan:cachePayload.plan || null,
    sourceMessage:cachePayload.sourceMessage || cachePayload.command,
    exceptions:exceptions,unresolved:exceptions,createdAt:Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')"""
if old_ret not in code:
    raise SystemExit('Blocked response anchor not found')
code = code.replace(old_ret, new_ret, 1)

agent_anchor = "    'Ưu tiên hiểu ngữ cảnh hội thoại. Không hỏi lại kho/người thực hiện nếu app đã cung cấp. Chỉ hỏi khi thiếu dữ liệu quan trọng hoặc có nhiều SKU thật sự khả dĩ.',"
agent_extra = """    'Ưu tiên hiểu ngữ cảnh hội thoại. Không hỏi lại kho/người thực hiện nếu app đã cung cấp. Chỉ hỏi khi thiếu dữ liệu quan trọng hoặc có nhiều SKU thật sự khả dĩ.',
    'COMMAND RESOLVER V3: Với lệnh nhập/xuất, mục tiêu là tạo preview càng sớm càng tốt. Nếu SEARCH_CATALOG/tool live chỉ còn 1 SKU tương thích rõ ràng thì phải dùng SKU đó, KHÔNG hỏi người dùng đọc lại mã TD.',
    'Nếu có draft cũ/actionPlan đang chờ và tin nhắn mới chỉ bổ sung mã, variant, số lượng, người thực hiện hoặc đối tượng, hãy GIỮ NGUYÊN mọi trường đã biết và chỉ vá trường vừa bổ sung. Không dựng lại phiếu từ đầu.',
    'Một dữ liệu đã biết từ draft/history/tool không được hỏi lại. Chỉ hỏi tối đa một câu khi còn từ 2 SKU cạnh tranh gần nhau hoặc thiếu trường bắt buộc mà backend không thể suy ra.',
    'Nếu cần hỏi SKU, phải đưa tối đa 3 lựa chọn cụ thể dạng TD-xxxx · tên hàng; không hỏi chung chung “mã nào?”. Khi người dùng chọn một mã, lượt kế tiếp phải chuẩn bị Action Plan ngay nếu các trường khác đã đủ.',"""
if agent_anchor not in code:
    raise SystemExit('Agent instruction anchor not found')
code = code.replace(agent_anchor, agent_extra, 1)

pattern = re.compile(r"function aiDraftContextForChat\(data\)\{.*?\}\nfunction loadAiRecent", re.S)
replacement = """function aiDraftContextForChat(data){
  if(!data)return null;
  try{
    return {
      ready:!!data.ready,
      transactionDate:data.transactionDate||'',
      actionPlan:data.actionPlan||null,
      sourceMessage:data.sourceMessage||data.command||'',
      exceptions:(data.exceptions||data.unresolved||[]).slice(0,8).map(x=>({type:x.type||'',code:x.code||'',itemText:x.itemText||'',message:x.message||'',candidates:(x.candidates||[]).slice(0,5)})),
      slips:(data.slips||[]).slice(0,8).map(s=>({slipNo:s.slipNo||'',operation:s.operation||'',warehouse:s.warehouse||'',sourceWarehouse:s.sourceWarehouse||'',destinationWarehouse:s.destinationWarehouse||'',actor:s.actor||'',counterparty:s.counterparty||'',note:s.note||'',lines:(s.lines||[]).slice(0,20).map(r=>({code:r.code||'',name:r.name||r.itemText||'',unit:r.unit||'',qty:Number(r.qty||r.quantity||0)}))}))
    };
  }catch(e){return null}
}
function loadAiRecent"""
index2, n = pattern.subn(replacement, index, count=1)
if n != 1:
    raise SystemExit(f'aiDraftContextForChat replacement count={n}')
index = index2

selftest = r'''

function aiCommandResolverV3SelfTest_(){
  const tests=[];
  function add(name,pass,detail){tests.push({name:name,pass:Boolean(pass),detail:detail||null});}
  const catalog=[
    {code:'TD-2001',name:'Hộp mực 12A Whitebox',aliases:'12A WB; 12A whitebox',legacyNames:[],searchText:normalize_('TD-2001 Hộp mực 12A Whitebox 12A WB 12A whitebox')},
    {code:'TD-2002',name:'Hộp mực 12A TOPZON',aliases:'12A TOPZON',legacyNames:[],searchText:normalize_('TD-2002 Hộp mực 12A TOPZON')},
    {code:'TD-2003',name:'Hộp mực 12A INKVIET',aliases:'12A INKVIET',legacyNames:[],searchText:normalize_('TD-2003 Hộp mực 12A INKVIET')}
  ];
  let r=coreResolveSkuIdentityV105_('12A WB',catalog);
  add('Variant rõ tự resolve, không hỏi mã',r.resolved&&r.item.code==='TD-2001',r);
  r=coreResolveSkuIdentityV105_('12A whitebox',catalog);
  add('Alias exact vẫn resolve',r.resolved&&r.item.code==='TD-2001',r);
  r=coreResolveSkuIdentityV105_('12A',catalog);
  add('Model trần vẫn chặn đoán variant',!r.resolved,r);
  const blocked=aiBlockedResponse_({command:'xuất 5 hộp 12A',sourceMessage:'xuất 5 hộp 12A',defaultWarehouse:'58',actorInput:'Thanh',transactionDate:'2026-09-12',slips:[],exceptions:[{type:'AMBIGUOUS_SKU',itemText:'12A'}],plan:{transaction_date:'2026-09-12',slips:[{slip_no:'1',operation:'OUT',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'Thanh',counterparty:'',note:'',clarification:'',lines:[{item_text:'12A',source_excerpt:'12A',requested_code:'',quantity:5,target_quantity:-1,force_new_sku:false}]}]}});
  add('Blocked response giữ Action Plan cho lượt sau',!!blocked.actionPlan&&blocked.actionPlan.slips[0].lines[0].quantity===5,blocked.actionPlan);
  return {appVersion:APP_VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:tests.length,passed:tests.filter(x=>x.pass).length,failed:tests.filter(x=>!x.pass).length,pass:tests.every(x=>x.pass),results:tests};
}
'''
if 'function aiCommandResolverV3SelfTest_' not in code:
    code += selftest

code_path.write_text(code, encoding='utf-8')
index_path.write_text(index, encoding='utf-8')

for wf_path in (apply_wf, deploy_wf):
    if not wf_path.exists():
        continue
    wf = wf_path.read_text(encoding='utf-8')
    wf = wf.replace("grep -q \"const APP_VERSION = 'V10.10.7';\" code.js", "grep -q \"const APP_VERSION = 'V10.10.8';\" code.js")
    wf = wf.replace("grep -q 'let APP_VERSION=\"V10.10.7\";' Index.html", "grep -q 'let APP_VERSION=\"V10.10.8\";' Index.html")
    if 'const commandResolverV3 = aiCommandResolverV3SelfTest_();' not in wf:
        wf = wf.replace("const historicalSuite = aiHistoricalVoucherSelfTestV1107_();", "const historicalSuite = aiHistoricalVoucherSelfTestV1107_();\n          const commandResolverV3 = aiCommandResolverV3SelfTest_();")
        wf = wf.replace("if (!historicalSuite.pass)", "if (!commandResolverV3.pass) { console.error('Command Resolver V3 regression failed', JSON.stringify(commandResolverV3)); process.exit(14); }\n          if (!historicalSuite.pass)")
        wf = wf.replace("console.log('Historical Voucher:', historicalSuite.passed + '/' + historicalSuite.total, 'PASS');", "console.log('Historical Voucher:', historicalSuite.passed + '/' + historicalSuite.total, 'PASS');\n          console.log('Command Resolver V3:', commandResolverV3.passed + '/' + commandResolverV3.total, 'PASS');")
    wf_path.write_text(wf, encoding='utf-8')

print('V10.10.8 Command Resolver V3 transform complete')
# retry after CI gate update
