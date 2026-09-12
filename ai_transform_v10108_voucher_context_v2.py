from pathlib import Path

p = Path('code.js')
text = p.read_text(encoding='utf-8')

# 1) Agent context version
text = text.replace("STATE_VERSION: 'CTX_V2',", "STATE_VERSION: 'CTX_V3_VOUCHER',", 1)

# 2) Persist verified voucher context in agent state
old = """function aiNormalizeAgentStateV106_(state) {
  state = state && typeof state === 'object' ? state : {};
  const items = Array.isArray(state.lastItems) ? state.lastItems : [];
  return {"""
new = """function aiNormalizeAgentStateV106_(state) {
  state = state && typeof state === 'object' ? state : {};
  const items = Array.isArray(state.lastItems) ? state.lastItems : [];
  const rawVc = state.voucherContext && typeof state.voucherContext === 'object' ? state.voucherContext : null;
  const voucherContext = rawVc && rawVc.voucher ? {
    voucher:String(rawVc.voucher||'').toUpperCase().slice(0,80),
    warehouse:['58','145','all'].indexOf(String(rawVc.warehouse||''))>=0?String(rawVc.warehouse):'all',
    rows:(Array.isArray(rawVc.rows)?rawVc.rows:[]).slice(0,20).map(function(r){return {
      date:String(r&&r.date||'').slice(0,40),voucher:String(r&&r.voucher||'').toUpperCase().slice(0,80),warehouse:String(r&&r.warehouse||'').slice(0,10),
      code:/^TD-\\d{4}$/i.test(String(r&&r.code||''))?String(r.code).toUpperCase():'',name:String(r&&r.name||'').slice(0,220),type:String(r&&r.type||'').slice(0,40),
      input:Number(r&&r.input||0),output:Number(r&&r.output||0),before:Number(r&&r.before||0),after:Number(r&&r.after||0),person:String(r&&r.person||'').slice(0,120),reason:String(r&&r.reason||'').slice(0,180),note:String(r&&r.note||'').slice(0,260)
    };})
  } : null;
  return {"""
if old not in text: raise SystemExit('normalize state anchor not found')
text = text.replace(old, new, 1)

old = """    lastCounterparty:String(state.lastCounterparty||'').slice(0,160),
    lastVoucher:String(state.lastVoucher||'').slice(0,80),
    updatedAt:String(state.updatedAt||'')"""
new = """    lastCounterparty:String(state.lastCounterparty||'').slice(0,160),
    lastVoucher:String(state.lastVoucher||'').slice(0,80),
    voucherContext:voucherContext,
    updatedAt:String(state.updatedAt||'')"""
if old not in text: raise SystemExit('state return anchor not found')
text = text.replace(old, new, 1)

# 3) Capture GET_VOUCHER tool result and feed its item identity into lastItems
old = """  (toolContext||[]).forEach(function(t){
    const r=t&&t.result;if(!r)return;
    if(r.item&&r.item.code)focus.push(r.item);
    if(Array.isArray(r.items)&&r.items.length===1&&r.items[0].code)focus.push(r.items[0]);
  });"""
new = """  (toolContext||[]).forEach(function(t){
    const r=t&&t.result;if(!r)return;
    if(r.item&&r.item.code)focus.push(r.item);
    if(Array.isArray(r.items)&&r.items.length===1&&r.items[0].code)focus.push(r.items[0]);
    if(r.found&&r.voucher&&Array.isArray(r.rows)){
      out.lastVoucher=String(r.voucher||'').toUpperCase();
      out.voucherContext={voucher:String(r.voucher||'').toUpperCase(),warehouse:String(r.warehouse||'all'),rows:r.rows.slice(0,20).map(function(x){return {date:x.date,voucher:x.voucher,warehouse:x.warehouse,code:x.code,name:x.name,type:x.type,input:x.input,output:x.output,before:x.before,after:x.after,person:x.person,reason:x.reason,note:x.note};})};
      r.rows.forEach(function(x){if(x&&x.code)focus.push({code:x.code,name:x.name||'',unit:''});});
    }
  });"""
if old not in text: raise SystemExit('build state tool context anchor not found')
text = text.replace(old, new, 1)

# 4) Always expose agentState/voucherContext to the model, not only the chat transcript
old = """  if(currentDraft)input.push({role:'user',content:'[PHIẾU ĐANG CHỜ XÁC NHẬN - draft cũ, không phải lệnh mới]\\
'+JSON.stringify(currentDraft)});
  input.push({role:'user',content:message});"""
new = """  if(currentDraft)input.push({role:'user',content:'[PHIẾU ĐANG CHỜ XÁC NHẬN - draft cũ, không phải lệnh mới]\\
'+JSON.stringify(currentDraft)});
  if(state&&(state.lastVoucher||state.voucherContext||(state.lastItems&&state.lastItems.length)))input.push({role:'user',content:'[AGENT STATE ĐÃ XÁC MINH - ngữ cảnh nghiệp vụ từ backend, không phải lệnh mới]\\
'+JSON.stringify(state)});
  input.push({role:'user',content:message});"""
if old not in text: raise SystemExit('chat input anchor not found')
text = text.replace(old, new, 1)

# 5) Fresh-read current voucher whenever a follow-up edits the voucher just viewed
anchor = "function aiApplyLiveToolFailsafes_(req,state) {\n"
insert = """function aiVoucherContextNeedsRefreshV2_(message, agentState){
  const s=aiNormalizeAgentStateV106_(agentState),n=normalize_(message);
  if(!s.lastVoucher)return false;
  return /(^|\\b)(sua|chinh sua|dieu chinh|doi|thay|huy|xoa|void|tang|giam)(\\b|$)/.test(n);
}

function aiApplyLiveToolFailsafes_(req,state) {
  if(aiVoucherContextNeedsRefreshV2_(req.message,req.agentState)&&!aiToolContextHasV106_(state.toolContext,'GET_VOUCHER')){
    const s=aiNormalizeAgentStateV106_(req.agentState);
    const vr={type:'GET_VOUCHER',query:s.lastVoucher,code:'',warehouse:'all',from_date:'',to_date:'',limit:HISTORICAL_VOUCHER_CONFIG.MAX_VOUCHER_ROWS};
    aiRunChatTools_([vr],req.defaultWarehouse).forEach(function(x){if(state.toolContext.length<AI_AGENT_CONFIG.MAX_TOOL_RESULTS)state.toolContext.push(x);});
    state.usedTools.push('GET_VOUCHER');
    state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,state.toolContext,true,req.currentDraft,req.agentState,{round:'voucher-refresh',maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
    state.calls++;
  }
"""
if anchor not in text: raise SystemExit('failsafe anchor not found')
text = text.replace(anchor, insert, 1)

# 6) Guard must trust verified voucher identity when user only patches qty/person/reason/etc.
text = text.replace('function aiCheckActionPlanConsistency_(message, plan, currentDraft) {', 'function aiCheckActionPlanConsistency_(message, plan, currentDraft, agentState) {', 1)
old = "const contextText = [String(message||''), JSON.stringify(currentDraft || {})].join(' ');"
new = "const contextText = [String(message||''), JSON.stringify(currentDraft || {}), JSON.stringify((aiNormalizeAgentStateV106_(agentState).voucherContext)||{})].join(' ');"
if old not in text: raise SystemExit('consistency context anchor not found')
text = text.replace(old, new, 1)
text = text.replace('aiCheckActionPlanConsistency_(req.message,plan,req.currentDraft)', 'aiCheckActionPlanConsistency_(req.message,plan,req.currentDraft,req.agentState)')

# 7) Explicit policy for correction follow-ups
anchor = "    'Nếu người dùng yêu cầu sửa/hủy/xóa/điều chỉnh phiếu cũ, bắt buộc gọi GET_VOUCHER đúng số phiếu trước khi lập Action Plan; không suy đoán nội dung phiếu từ hội thoại.',"
extra = """    'Nếu người dùng yêu cầu sửa/hủy/xóa/điều chỉnh phiếu cũ, bắt buộc gọi GET_VOUCHER đúng số phiếu trước khi lập Action Plan; không suy đoán nội dung phiếu từ hội thoại.',
    'VOUCHER CONTEXT V2: Nếu agentState.lastVoucher/voucherContext đã có phiếu vừa xem và tin nhắn tiếp theo chỉ nói “sửa số lượng”, “đổi từ X thành Y”, “sửa người thực hiện/lý do/ghi chú”, phải hiểu là đang sửa phiếu đó. Dùng chính code/name từ voucherContext làm identity đã xác minh; KHÔNG resolve SKU lại và KHÔNG yêu cầu người dùng nhắc lại model/mã.',
    'Khi sửa một trường của phiếu đang mở, chỉ patch đúng trường người dùng nói và giữ nguyên toàn bộ trường còn lại từ voucherContext. Vẫn GET_VOUCHER lại để fresh-read trước preview.',"""
if anchor not in text: raise SystemExit('voucher instruction anchor not found')
text = text.replace(anchor, extra, 1)

# 8) Extend V3 self-test with exact regression from production screenshot
old = """  add('Blocked response contract giữ Action Plan cho lượt sau',!!blockedClientShape.actionPlan&&blockedClientShape.actionPlan.slips[0].lines[0].quantity===5,blockedClientShape);
  return {appVersion:APP_VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:tests.length,passed:tests.filter(x=>x.pass).length,failed:tests.filter(x=>!x.pass).length,pass:tests.every(x=>x.pass),results:tests};"""
new = """  add('Blocked response contract giữ Action Plan cho lượt sau',!!blockedClientShape.actionPlan&&blockedClientShape.actionPlan.slips[0].lines[0].quantity===5,blockedClientShape);
  const voucherState=aiNormalizeAgentStateV106_({lastVoucher:'PXK-20260912-006',voucherContext:{voucher:'PXK-20260912-006',warehouse:'58',rows:[{voucher:'PXK-20260912-006',warehouse:'58',code:'TD-0246',name:'Hộp mực in 35A/85A - TOPZON',type:'Xuất',input:0,output:1,before:13,after:12,person:'TikTok',reason:'Gửi hàng TikTok',note:''}]}});
  add('Voucher context giữ identity đã xác minh',voucherState.lastVoucher==='PXK-20260912-006'&&voucherState.voucherContext&&voucherState.voucherContext.rows[0].code==='TD-0246',voucherState);
  add('Follow-up sửa số lượng kích hoạt fresh GET_VOUCHER',aiVoucherContextNeedsRefreshV2_('sửa số lượng từ 1 thành 2',voucherState)===true,voucherState);
  const correctionPlan={transaction_date:'2026-09-12',slips:[{slip_no:'1',operation:'OUT',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'TikTok',counterparty:'TikTok',note:'[CORRECT PXK-20260912-006]',clarification:'',lines:[{item_text:'Hộp mực in 35A/85A - TOPZON',source_excerpt:'sửa số lượng từ 1 thành 2',requested_code:'TD-0246',quantity:2,target_quantity:-1,force_new_sku:false}]}]};
  const guard=aiCheckActionPlanConsistency_('sửa số lượng từ 1 thành 2',correctionPlan,null,voucherState);
  add('Guard chấp nhận model từ voucher context',guard.ok===true,guard);
  return {appVersion:APP_VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:tests.length,passed:tests.filter(x=>x.pass).length,failed:tests.filter(x=>!x.pass).length,pass:tests.every(x=>x.pass),results:tests};"""
if old not in text: raise SystemExit('selftest anchor not found')
text = text.replace(old, new, 1)

p.write_text(text, encoding='utf-8')
print('Voucher Context V2 transform complete')
