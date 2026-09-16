from pathlib import Path
p=Path('code.js'); t=p.read_text(encoding='utf-8')
h=Path('Index.html'); x=h.read_text(encoding='utf-8')

t=t.replace("const APP_VERSION = 'V10.10.9';","const APP_VERSION = 'V10.11.0';",1)
x=x.replace('let APP_VERSION="V10.10.9";','let APP_VERSION="V10.11.0";',1).replace('V10.10.9','V10.11.0').replace('V10.10.8','V10.11.0')
t=t.replace('MAX_HISTORY: 24,','MAX_HISTORY: 40,',1).replace('MAX_TOOL_REQUESTS: 8,','MAX_TOOL_REQUESTS: 12,',1)
t=t.replace("VERSION: 'AGENT_V3.4_LEARNING_MEMORY_2026-09-12',","VERSION: 'AGENT_V4_SMART_ROUTER_2026-09-16',",1)
t=t.replace('MAX_TOOL_ROUNDS: 4,','MAX_TOOL_ROUNDS: 6,',1).replace('MAX_TOOL_RESULTS: 24,','MAX_TOOL_RESULTS: 32,',1).replace('MAX_STATE_ITEMS: 4,','MAX_STATE_ITEMS: 8,',1)

cfg="""const AI_SMART_AGENT_CONFIG=Object.freeze({VERSION:'SMART_AGENT_V1_2026-09-16',ROUTER_PROPERTY:'OPENAI_AGENT_ROUTER_ENABLED',FAST_MODEL:'gpt-5.6-luna',BALANCED_MODEL:'gpt-5.6-terra',DEEP_MODEL:'gpt-5.6-sol'});\n\n"""
a="// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.\n"
if 'AI_SMART_AGENT_CONFIG' not in t:
    if a not in t: raise SystemExit('cfg anchor')
    t=t.replace(a,cfg+a,1)

func=r'''function aiSmartAgentClassifyV10110_(message,currentDraft,agentState){
  const n=normalize_(message||'');
  const deep=/(phan tich|tai sao|vi sao|uu tien|bat thuong|xu huong|du bao|so sanh|toi uu|de xuat|quan tri|sua|chinh sua|dieu chinh|huy|xoa|hoan tac|khong dung|nham|sai ma)/.test(n);
  const work=/(nhap kho|xuat kho|nhap |xuat |dieu chuyen|chuyen kho|kiem kho|ghi so|lap phieu|phieu)/.test(n)||Boolean(currentDraft&&currentDraft.slips&&currentDraft.slips.length)||Boolean(agentState&&agentState.lastVoucher);
  return deep?{tier:'DEEP',effort:'high',maxOutputTokens:10000}:work?{tier:'BALANCED',effort:'medium',maxOutputTokens:7500}:{tier:'FAST',effort:'low',maxOutputTokens:5000};
}
function aiSelectAgentRouteV10110_(message,currentDraft,agentState){
  const c=aiSmartAgentClassifyV10110_(message,currentDraft,agentState),p=PropertiesService.getScriptProperties();
  if(String(p.getProperty(AI_SMART_AGENT_CONFIG.ROUTER_PROPERTY)||'true').toLowerCase()==='false')return {tier:'FIXED',model:aiGetChatModel_(),effort:'medium',maxOutputTokens:7500};
  return {tier:c.tier,model:c.tier==='DEEP'?AI_SMART_AGENT_CONFIG.DEEP_MODEL:c.tier==='BALANCED'?AI_SMART_AGENT_CONFIG.BALANCED_MODEL:AI_SMART_AGENT_CONFIG.FAST_MODEL,effort:c.effort,maxOutputTokens:c.maxOutputTokens};
}

'''
a='function aiGetChatModel_() {\n'
if 'function aiSmartAgentClassifyV10110_' not in t:
    if a not in t: raise SystemExit('model anchor')
    t=t.replace(a,func+a,1)

s=t.find('function aiChatReason_('); e=t.find('\nfunction ',s+20)
if s<0 or e<0: raise SystemExit('chat function')
q=t[s:e]
if 'const model = aiGetChatModel_();' not in q: raise SystemExit('model line')
q=q.replace('const model = aiGetChatModel_();',"const route=aiSelectAgentRouteV10110_(message,currentDraft,agentState);\n  const model=route.model;",1)
q=q.replace("reasoning:{effort:'medium'}","reasoning:{effort:route.effort}",1).replace('max_output_tokens:7000','max_output_tokens:route.maxOutputTokens',1)
ins="    'Ưu tiên hiểu ngữ cảnh hội thoại. Không hỏi lại kho/người thực hiện nếu app đã cung cấp. Chỉ hỏi khi thiếu dữ liệu quan trọng hoặc có nhiều SKU thật sự khả dĩ.',"
add="""    'SMART AGENT V4: trước khi hỏi lại phải tận dụng history, draft, agentState, learning memory và tool live; chỉ hỏi khi vẫn còn nhiều khả năng quan trọng.',\n    'Luồng chuẩn: hiểu ý → gọi tool → đối chiếu → tự sửa kế hoạch → trả lời hoặc preview. Không kết luận sớm khi còn tool phù hợp chưa dùng.',\n    'Nếu người dùng chỉ sửa/bổ sung một trường, patch đúng trường đó và giữ nguyên dữ liệu đã biết. Tool live luôn ưu tiên hơn memory.',\n"""+ins
if 'SMART AGENT V4:' not in q:
    if ins not in q: raise SystemExit('instruction anchor')
    q=q.replace(ins,add,1)
t=t[:s]+q+t[e:]

test=r'''function aiSmartAgentSelfTestV10110_(){const a=[];function z(n,p,d){a.push({name:n,pass:!!p,detail:d});}let r=aiSmartAgentClassifyV10110_('12A WB còn bao nhiêu?',null,null);z('FAST',r.tier==='FAST',r);r=aiSmartAgentClassifyV10110_('xuất 5 hộp 12A WB',null,null);z('BALANCED',r.tier==='BALANCED',r);r=aiSmartAgentClassifyV10110_('phân tích tồn 90 ngày và đề xuất mua gì',null,null);z('DEEP analysis',r.tier==='DEEP'&&r.effort==='high',r);r=aiSmartAgentClassifyV10110_('sửa số lượng phiếu PXK-20260912-006',null,{lastVoucher:'PXK-20260912-006'});z('DEEP correction',r.tier==='DEEP',r);return {appVersion:APP_VERSION,version:AI_SMART_AGENT_CONFIG.VERSION,total:a.length,passed:a.filter(x=>x.pass).length,failed:a.filter(x=>!x.pass).length,pass:a.every(x=>x.pass),results:a};}'''
if 'function aiSmartAgentSelfTestV10110_' not in t:t+='\n'+test+'\n'
p.write_text(t,encoding='utf-8');h.write_text(x,encoding='utf-8');print('V10.11.0 done')
