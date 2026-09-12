from pathlib import Path
import re

p=Path('code.js')
text=p.read_text(encoding='utf-8')

old_extract="""function aiExtractVoucherNoV1107_(text) {
  const m=String(text||'').toUpperCase().match(/\\b(?:PXK|PNK|KK|DCK)-\\d{8}-[A-Z0-9]+\\b/);
  return m ? m[0] : '';
}"""
new_extract="""function aiExtractVoucherNoV1107_(text) {
  const m=String(text||'').toUpperCase().match(/\\b(?:PXK|PNK|KK|DCK)-\\d{8}-[A-Z0-9]+\\b/);
  return m ? m[0] : '';
}

function aiExtractVoucherRefV10108_(text) {
  const raw=String(text||'').trim();
  const full=aiExtractVoucherNoV1107_(raw);
  if(full) return {kind:'FULL',value:full,suffix:'',type:''};
  const up=raw.toUpperCase();
  const typeMatch=up.match(/\\b(PXK|PNK|KK|DCK)\\b/);
  const type=typeMatch?typeMatch[1]:'';
  let m=up.match(/(?:PHIẾU|PHIEU|SỐ|SO|MÃ|MA)?\\s*0*(\\d{1,4})\\s*$/i);
  if(!m) m=up.match(/^0*(\\d{1,4})$/);
  if(!m) return {kind:'TEXT',value:up,suffix:'',type:type};
  return {kind:'SUFFIX',value:String(parseInt(m[1],10)||0).padStart(3,'0'),suffix:String(parseInt(m[1],10)||0).padStart(3,'0'),type:type};
}

function aiVoucherSuffixMatchV10108_(voucher,suffix,type) {
  voucher=String(voucher||'').trim().toUpperCase();
  suffix=String(suffix||'').trim().toUpperCase();
  type=String(type||'').trim().toUpperCase();
  if(!voucher||!suffix) return false;
  if(type && voucher.indexOf(type+'-')!==0) return false;
  const m=voucher.match(/^(PXK|PNK|KK|DCK)-\\d{8}-([A-Z0-9]+)$/);
  if(!m) return false;
  const tail=m[2];
  if(/^\\d+$/.test(tail) && /^\\d+$/.test(suffix)) return parseInt(tail,10)===parseInt(suffix,10);
  return tail===suffix;
}"""
if old_extract not in text:
    raise SystemExit('extract anchor not found')
text=text.replace(old_extract,new_extract,1)

old_func=re.compile(r"function aiChatGetVoucherV1107_\(voucherText, warehouse\) \{.*?\n\}\n\nfunction aiHistoricalVoucherSelfTestV1107_",re.S)
m=old_func.search(text)
if not m:
    raise SystemExit('voucher function anchor not found')
new_func="""function aiChatGetVoucherV1107_(voucherText, warehouse) {
  const ref=aiExtractVoucherRefV10108_(voucherText);
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  if(!ref.value) return {found:false,reason:'MISSING_VOUCHER',message:'Thiếu số phiếu cần tra.'};

  if(ref.kind==='FULL') {
    const voucher=ref.value;
    const data=getJournalHistory({warehouse:warehouse,query:voucher,allDates:true,limit:HISTORICAL_VOUCHER_CONFIG.MAX_VOUCHER_ROWS});
    const rows=(data.rows||[]).filter(function(r){return String(r.voucher||'').trim().toUpperCase()===voucher;});
    if(!rows.length) return {found:false,voucher:voucher,warehouse:warehouse,reason:'VOUCHER_NOT_FOUND',message:'Không tìm thấy đúng số phiếu '+voucher+'.'};
    return {found:true,voucher:voucher,warehouse:warehouse,totalLines:rows.length,originalImmutable:true,correctionPolicy:HISTORICAL_VOUCHER_CONFIG.POLICY,rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})};
  }

  if(ref.kind==='SUFFIX') {
    const today=Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'yyyyMMdd');
    const data=getJournalHistory({warehouse:warehouse,query:ref.suffix,allDates:true,limit:HISTORICAL_VOUCHER_CONFIG.MAX_VOUCHER_ROWS});
    const matched=(data.rows||[]).filter(function(r){return aiVoucherSuffixMatchV10108_(r.voucher,ref.suffix,ref.type);});
    const byVoucher={};
    matched.forEach(function(r){const v=String(r.voucher||'').trim().toUpperCase();if(!byVoucher[v])byVoucher[v]=[];byVoucher[v].push(r);});
    const vouchers=Object.keys(byVoucher);
    const todayVouchers=vouchers.filter(function(v){return v.indexOf('-'+today+'-')>0;});
    const pool=todayVouchers.length?todayVouchers:vouchers;
    if(pool.length===1){
      const voucher=pool[0],rows=byVoucher[voucher];
      return {found:true,resolvedFromShortRef:true,requestedRef:String(voucherText||''),voucher:voucher,warehouse:warehouse,totalLines:rows.length,originalImmutable:true,correctionPolicy:HISTORICAL_VOUCHER_CONFIG.POLICY,rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})};
    }
    if(pool.length>1){
      return {found:false,ambiguous:true,reason:'AMBIGUOUS_VOUCHER_SUFFIX',requestedRef:String(voucherText||''),suffix:ref.suffix,candidates:pool.slice(0,8),message:'Có '+pool.length+' phiếu khớp đuôi '+ref.suffix+'. Hãy chọn đúng số phiếu: '+pool.slice(0,5).join(', ')+'.'};
    }
    return {found:false,reason:'VOUCHER_SUFFIX_NOT_FOUND',requestedRef:String(voucherText||''),suffix:ref.suffix,message:'Không tìm thấy phiếu có đuôi '+ref.suffix+' trong dữ liệu hiện có.'};
  }

  const voucher=String(ref.value||'').trim().toUpperCase();
  const data=getJournalHistory({warehouse:warehouse,query:voucher,allDates:true,limit:HISTORICAL_VOUCHER_CONFIG.MAX_VOUCHER_ROWS});
  const rows=(data.rows||[]).filter(function(r){return String(r.voucher||'').trim().toUpperCase()===voucher;});
  if(!rows.length) return {found:false,voucher:voucher,warehouse:warehouse,reason:'VOUCHER_NOT_FOUND',message:'Không tìm thấy đúng số phiếu '+voucher+'.'};
  return {found:true,voucher:voucher,warehouse:warehouse,totalLines:rows.length,originalImmutable:true,correctionPolicy:HISTORICAL_VOUCHER_CONFIG.POLICY,rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})};
}

function aiHistoricalVoucherSelfTestV1107_"""
text=text[:m.start()]+new_func+text[m.end():]

anchor="    'Nếu người dùng yêu cầu sửa/hủy/xóa/điều chỉnh phiếu cũ, bắt buộc gọi GET_VOUCHER đúng số phiếu trước khi lập Action Plan; không suy đoán nội dung phiếu từ hội thoại.',"
extra="""    'Nếu người dùng đang tra phiếu và chỉ trả lời một số ngắn như 6, 06, 006 hoặc “phiếu 6”, coi đó là hậu tố số phiếu và tiếp tục GET_VOUCHER; không bắt người dùng gõ lại toàn bộ PXK/PNK.',
    'Khi GET_VOUCHER trả resolvedFromShortRef=true, phải dùng đúng voucher backend đã resolve. Khi ambiguous=true, chỉ hỏi người dùng chọn trong candidates backend trả về.',
"""
if anchor not in text:
    raise SystemExit('instruction anchor not found')
text=text.replace(anchor,anchor+'\n'+extra,1)

# Extend historical self-test with deterministic short-reference parsing only.
self_anchor="  add('extract PXK',aiExtractVoucherNoV1107_('Hủy PXK-20260905-003')==='PXK-20260905-003');"
if self_anchor in text and "short ref 006" not in text:
    text=text.replace(self_anchor,self_anchor+"\n  add('short ref 006',aiExtractVoucherRefV10108_('006').suffix==='006');\n  add('short ref phiếu 6',aiExtractVoucherRefV10108_('phiếu 6').suffix==='006');\n  add('suffix match numeric',aiVoucherSuffixMatchV10108_('PXK-20260912-006','006','')===true);",1)

p.write_text(text,encoding='utf-8')
print('Voucher Resolver V2 hotfix applied')
