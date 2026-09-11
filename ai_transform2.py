from pathlib import Path

p=Path('code.js'); h=Path('Index.html')
code=p.read_text(encoding='utf-8'); html=h.read_text(encoding='utf-8')

def once(old,new,label):
    global code
    if old not in code:
        raise SystemExit('Missing anchor: '+label)
    code=code.replace(old,new,1)

once("const APP_VERSION = 'V10.10.6';","const APP_VERSION = 'V10.10.7';",'version')
once("VERSION: 'AGENT_V3.1_RESOLVER_V2_2026-09-11',","VERSION: 'AGENT_V3.2_HISTORICAL_VOUCHER_2026-09-11',",'agent version')

anchor="""const AI_RESOLVER_CONFIG = Object.freeze({
  VERSION: 'RESOLVER_V2_2026-09-11',
  AUTO_RESOLVE_MIN_CONFIDENCE: 88,
  EXACT_MODEL_CONFIDENCE: 96,
  HIGH_CONFIDENCE_FLOOR: 88,
  MAX_CANDIDATES: 8
});
"""
insert=anchor+"""
// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.
const HISTORICAL_VOUCHER_CONFIG = Object.freeze({
  VERSION: 'HIST_VOUCHER_V1_2026-09-11',
  POLICY: 'COMPENSATING_TRANSACTION_ONLY',
  MAX_VOUCHER_ROWS: 200,
  ORIGINAL_IMMUTABLE: true
});
"""
once(anchor,insert,'historical config')

code=code.replace("enum:['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_MOVEMENTS','GET_OPERATIONAL_REPORT','GET_PROACTIVE_REPORT','GET_RECENT_VOUCHERS','GET_TODAY_MOVEMENTS','GET_TODAY_SUMMARY']","enum:['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_VOUCHER','GET_MOVEMENTS','GET_OPERATIONAL_REPORT','GET_PROACTIVE_REPORT','GET_RECENT_VOUCHERS','GET_TODAY_MOVEMENTS','GET_TODAY_SUMMARY']")

old="""      else if (type === 'GET_ITEM_HISTORY') out.push({request:r,result:aiChatItemHistoryV106_(r.code || r.query, r.warehouse || 'all', r.limit)});
      else if (type === 'GET_MOVEMENTS') out.push({request:r,result:aiChatMovementsRangeV106_(r.query, r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});"""
new="""      else if (type === 'GET_ITEM_HISTORY') out.push({request:r,result:aiChatItemHistoryV106_(r.code || r.query, r.warehouse || 'all', r.limit)});
      else if (type === 'GET_VOUCHER') out.push({request:r,result:aiChatGetVoucherV1107_(r.query || r.code, r.warehouse || 'all')});
      else if (type === 'GET_MOVEMENTS') out.push({request:r,result:aiChatMovementsRangeV106_(r.query, r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});"""
if old not in code: raise SystemExit('Missing tool execution anchor')
code=code.replace(old,new)

prompt_old="SEARCH_CATALOG để tìm SKU; GET_STOCK để đọc tồn live 2 kho; GET_ITEM_HISTORY để xem lịch sử một mã; GET_MOVEMENTS cho hôm qua/ngày/range; GET_RECENT_VOUCHERS để liệt kê phiếu; GET_OPERATIONAL_REPORT cho báo cáo tài chính/tồn; GET_PROACTIVE_REPORT cho câu hỏi quản trị như ưu tiên hôm nay, cần mua gì, nên điều chuyển gì, hàng nào xuất nhanh/chậm hoặc bất thường."
prompt_new="SEARCH_CATALOG để tìm SKU; GET_STOCK để đọc tồn live 2 kho; GET_ITEM_HISTORY để xem lịch sử một mã; GET_VOUCHER để đọc chính xác toàn bộ dòng của một số phiếu; GET_MOVEMENTS cho hôm qua/ngày/range; GET_RECENT_VOUCHERS để liệt kê phiếu; GET_OPERATIONAL_REPORT cho báo cáo tài chính/tồn; GET_PROACTIVE_REPORT cho câu hỏi quản trị như ưu tiên hôm nay, cần mua gì, nên điều chuyển gì, hàng nào xuất nhanh/chậm hoặc bất thường."
if prompt_old not in code: raise SystemExit('Missing prompt anchor')
code=code.replace(prompt_old,prompt_new)

marker="    'Có thể dùng nhiều vòng tool. Nếu kết quả vòng đầu cho mã TD, vòng sau được phép GET_STOCK hoặc GET_ITEM_HISTORY bằng mã đó. Không lặp lại cùng một tool request.',"
addition=marker+"""
    'Nếu người dùng yêu cầu sửa/hủy/xóa/điều chỉnh phiếu cũ, bắt buộc gọi GET_VOUCHER đúng số phiếu trước khi lập Action Plan; không suy đoán nội dung phiếu từ hội thoại.',
    'Không hard-delete và không sửa trực tiếp dòng lịch sử đã ghi. "xóa phiếu" = VOID/HỦY bằng bút toán đảo; "sửa phiếu" = đảo phần sai rồi lập giao dịch đúng. note phải chứa số phiếu gốc dạng [VOID SOPHIEU] hoặc [CORRECT SOPHIEU].',
    'Bút toán sửa/hủy phiếu cũ mặc định ghi ngày hiện tại để bảo toàn chuỗi tồn và audit. Riêng giao dịch bị thiếu nhưng chưa từng ghi có thể dùng transaction_date ngày cũ đúng theo yêu cầu người dùng.',"""
once(marker,addition,'historical prompt rules')

hist_marker="function aiChatItemHistoryV106_(codeOrQuery, warehouse, limit) {"
helpers=r'''function aiExtractVoucherNoV1107_(text) {
  const m=String(text||'').toUpperCase().match(/\b(?:PXK|PNK|KK|DCK)-\d{8}-[A-Z0-9]+\b/);
  return m ? m[0] : '';
}

function aiHistoricalVoucherRequestV1107_(text) {
  const n=normalize_(text);
  return /(sua|chinh sua|huy|xoa|void|dieu chinh).*(phieu|pxk|pnk|dck|kk)|(?:pxk|pnk|dck|kk).*?(sua|huy|xoa|void|dieu chinh)/.test(n);
}

function aiChatGetVoucherV1107_(voucherText, warehouse) {
  const voucher=aiExtractVoucherNoV1107_(voucherText) || String(voucherText||'').trim().toUpperCase();
  if(!voucher) return {found:false,reason:'MISSING_VOUCHER',message:'Thiếu số phiếu cần tra.'};
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  const data=getJournalHistory({warehouse:warehouse,query:voucher,allDates:true,limit:HISTORICAL_VOUCHER_CONFIG.MAX_VOUCHER_ROWS});
  const rows=(data.rows||[]).filter(function(r){return String(r.voucher||'').trim().toUpperCase()===voucher;});
  if(!rows.length) return {found:false,voucher:voucher,warehouse:warehouse,reason:'VOUCHER_NOT_FOUND',message:'Không tìm thấy đúng số phiếu '+voucher+'.'};
  return {found:true,voucher:voucher,warehouse:warehouse,totalLines:rows.length,originalImmutable:true,correctionPolicy:HISTORICAL_VOUCHER_CONFIG.POLICY,rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})};
}

function aiHistoricalVoucherSelfTestV1107_() {
  const t=[];function add(name,pass){t.push({name:name,pass:Boolean(pass)});}
  add('extract PXK',aiExtractVoucherNoV1107_('Hủy PXK-20260905-003')==='PXK-20260905-003');
  add('extract PNK',aiExtractVoucherNoV1107_('sửa pnk-20260903-12')==='PNK-20260903-12');
  add('detect sửa',aiHistoricalVoucherRequestV1107_('Sửa phiếu PXK-20260905-003'));
  add('detect hủy',aiHistoricalVoucherRequestV1107_('Hủy PXK-20260905-003'));
  add('query thường không phải sửa',!aiHistoricalVoucherRequestV1107_('PXK-20260905-003 có những gì?'));
  return {version:HISTORICAL_VOUCHER_CONFIG.VERSION,total:t.length,passed:t.filter(function(x){return x.pass;}).length,failed:t.filter(function(x){return !x.pass;}).length,pass:t.every(function(x){return x.pass;}),results:t};
}

'''
once(hist_marker,helpers+hist_marker,'voucher helpers')

html=html.replace('V10.10.6','V10.10.7')
p.write_text(code,encoding='utf-8'); h.write_text(html,encoding='utf-8')
print('V10.10.7 transform applied')
