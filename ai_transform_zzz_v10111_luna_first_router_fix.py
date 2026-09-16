from pathlib import Path
p=Path('code.js'); t=p.read_text(encoding='utf-8')
h=Path('Index.html'); x=h.read_text(encoding='utf-8')

t=t.replace("const APP_VERSION = 'V10.11.0';","const APP_VERSION = 'V10.11.1';",1)
x=x.replace('let APP_VERSION="V10.11.0";','let APP_VERSION="V10.11.1";',1).replace('V10.11.0','V10.11.1')
t=t.replace("VERSION:'SMART_AGENT_V1_2026-09-16'","VERSION:'SMART_AGENT_V1.1_LUNA_FIRST_2026-09-16'",1)

old=r"""function aiSmartAgentClassifyV10110_(message,currentDraft,agentState){
  const n=normalize_(message||'');
  const deep=/(phan tich|tai sao|vi sao|uu tien|bat thuong|xu huong|du bao|so sanh|toi uu|de xuat|quan tri|sua|chinh sua|dieu chinh|huy|xoa|hoan tac|khong dung|nham|sai ma)/.test(n);
  const work=/(nhap kho|xuat kho|nhap |xuat |dieu chuyen|chuyen kho|kiem kho|ghi so|lap phieu|phieu)/.test(n)||Boolean(currentDraft&&currentDraft.slips&&currentDraft.slips.length)||Boolean(agentState&&agentState.lastVoucher);
  return deep?{tier:'DEEP',effort:'high',maxOutputTokens:10000}:work?{tier:'BALANCED',effort:'medium',maxOutputTokens:7500}:{tier:'FAST',effort:'low',maxOutputTokens:5000};
}"""
new=r"""function aiSmartAgentClassifyV10110_(message,currentDraft,agentState){
  const raw=String(message||''),n=normalize_(raw);
  const management=/(phan tich|xu huong|du bao|so sanh|toi uu|de xuat|quan tri|30 ngay|60 ngay|90 ngay|vong quay|ton cham|ton chet|nen mua|can mua|nen dieu chuyen|uu tien mua)/.test(n);
  const correction=/(sua|chinh sua|dieu chinh|huy|xoa|hoan tac|khong dung|nham|sai ma|doi ma)/.test(n);
  const ambiguity=/(khong ro|khong chac|co the|nhieu ma|nhieu phieu|hang loat|tat ca|dong loat|nhieu kho)/.test(n);
  const lineCount=raw.split(/\n+/).filter(function(s){return s.trim();}).length;
  const manyItems=(raw.match(/TD-\d{4}/gi)||[]).length>=3 || lineCount>=4;
  const hasDraft=Boolean(currentDraft&&currentDraft.slips&&currentDraft.slips.length);
  const hasVoucher=Boolean(agentState&&agentState.lastVoucher);
  if(management)return {tier:'DEEP',effort:'high',maxOutputTokens:10000,reason:'MANAGEMENT_ANALYSIS'};
  if(ambiguity||manyItems||(correction&&(hasVoucher||hasDraft)))return {tier:'BALANCED',effort:'medium',maxOutputTokens:7500,reason:'COMPLEX_OPERATION'};
  return {tier:'FAST',effort:'low',maxOutputTokens:5500,reason:'ROUTINE_WAREHOUSE'};
}"""
if old not in t: raise SystemExit('classifier anchor not found')
t=t.replace(old,new,1)

s=t.find('function aiSmartAgentSelfTestV10110_()')
if s<0: raise SystemExit('selftest not found')
e=t.find('\nfunction ',s+20)
if e<0: e=len(t)
newtest=r"""function aiSmartAgentSelfTestV10110_(){const a=[];function z(n,p,d){a.push({name:n,pass:!!p,detail:d});}let r=aiSmartAgentClassifyV10110_('12A WB còn bao nhiêu?',null,null);z('FAST lookup Luna',r.tier==='FAST',r);r=aiSmartAgentClassifyV10110_('xuất 5 hộp 12A WB cho TikTok',null,null);z('FAST normal OUT Luna',r.tier==='FAST',r);r=aiSmartAgentClassifyV10110_('nhập 10 hộp 85A TOPZON',null,null);z('FAST normal IN Luna',r.tier==='FAST',r);r=aiSmartAgentClassifyV10110_('điều chuyển 5 hộp 12A WB từ kho 58 sang 145',null,null);z('FAST transfer Luna',r.tier==='FAST',r);r=aiSmartAgentClassifyV10110_('sửa số lượng phiếu PXK-20260912-006 từ 1 thành 2',null,{lastVoucher:'PXK-20260912-006'});z('BALANCED complex correction Terra',r.tier==='BALANCED',r);r=aiSmartAgentClassifyV10110_('xuất hàng loạt 5 mã sau\nTD-0001 2\nTD-0002 3\nTD-0003 4',null,null);z('BALANCED multi-item Terra',r.tier==='BALANCED',r);r=aiSmartAgentClassifyV10110_('phân tích tồn 90 ngày và đề xuất nên mua gì',null,null);z('DEEP analysis Sol',r.tier==='DEEP'&&r.effort==='high',r);return {appVersion:APP_VERSION,version:AI_SMART_AGENT_CONFIG.VERSION,total:a.length,passed:a.filter(x=>x.pass).length,failed:a.filter(x=>!x.pass).length,pass:a.every(x=>x.pass),results:a};}"""
t=t[:s]+newtest+t[e:]

p.write_text(t,encoding='utf-8');h.write_text(x,encoding='utf-8');print('V10.11.1 Luna-first router fixed')
