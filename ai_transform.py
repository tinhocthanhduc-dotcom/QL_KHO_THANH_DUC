from pathlib import Path

code_path=Path('code.js')
html_path=Path('Index.html')
code=code_path.read_text(encoding='utf-8')
html=html_path.read_text(encoding='utf-8')


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f'Missing anchor: {label}')
    return text.replace(old, new, 1)

# Version bump
code=replace_once(code,"const APP_VERSION = 'V10.10.6';","const APP_VERSION = 'V10.10.7';",'APP_VERSION')
code=replace_once(code,"VERSION: 'AGENT_V3.1_RESOLVER_V2_2026-09-11',","VERSION: 'AGENT_V3.2_HISTORICAL_VOUCHER_2026-09-11',",'AI_AGENT_CONFIG.VERSION')

resolver_anchor="""const AI_RESOLVER_CONFIG = Object.freeze({\n  VERSION: 'RESOLVER_V2_2026-09-11',\n  AUTO_RESOLVE_MIN_CONFIDENCE: 88,\n  EXACT_MODEL_CONFIDENCE: 96,\n  HIGH_CONFIDENCE_FLOOR: 88,\n  MAX_CANDIDATES: 8\n});\n"""
historical_config=resolver_anchor+"""\n// V10.10.7 · Historical Voucher Control: phiếu cũ bất biến, sửa/hủy bằng bút toán đảo có audit.\nconst HISTORICAL_VOUCHER_CONFIG = Object.freeze({\n  VERSION: 'HIST_VOUCHER_V1_2026-09-11',\n  POLICY: 'COMPENSATING_TRANSACTION_ONLY',\n  MAX_VOUCHER_ROWS: 200,\n  REQUIRE_EXACT_VOUCHER: true,\n  ORIGINAL_IMMUTABLE: true\n});\n"""
code=replace_once(code,resolver_anchor,historical_config,'historical config')

# Add GET_VOUCHER tool execution
old_exec="""      else if (type === 'GET_ITEM_HISTORY') out.push({request:r,result:aiChatItemHistoryV106_(r.code || r.query, r.warehouse || 'all', r.limit)});\n      else if (type === 'GET_MOVEMENTS') out.push({request:r,result:aiChatMovementsRangeV106_(r.query, r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});"""
new_exec="""      else if (type === 'GET_ITEM_HISTORY') out.push({request:r,result:aiChatItemHistoryV106_(r.code || r.query, r.warehouse || 'all', r.limit)});\n      else if (type === 'GET_VOUCHER') out.push({request:r,result:aiChatGetVoucherV1107_(r.query || r.code, r.warehouse || 'all')});\n      else if (type === 'GET_MOVEMENTS') out.push({request:r,result:aiChatMovementsRangeV106_(r.query, r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});"""
# there are duplicate module copies; replace all occurrences intentionally
if old_exec not in code:
    raise SystemExit('Missing GET_ITEM_HISTORY execution anchor')
code=code.replace(old_exec,new_exec)

# Tool schema enum
old_enum="enum:['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_MOVEMENTS','GET_OPERATIONAL_REPORT','GET_PROACTIVE_REPORT','GET_RECENT_VOUCHERS','GET_TODAY_MOVEMENTS','GET_TODAY_SUMMARY']"
new_enum="enum:['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_VOUCHER','GET_MOVEMENTS','GET_OPERATIONAL_REPORT','GET_PROACTIVE_REPORT','GET_RECENT_VOUCHERS','GET_TODAY_MOVEMENTS','GET_TODAY_SUMMARY']"
if old_enum not in code:
    raise SystemExit('Missing tool enum anchor')
code=code.replace(old_enum,new_enum)

# Prompt text: explain historical policy
old_prompt="'SEARCH_CATALOG để tìm SKU; GET_STOCK để đọc tồn live 2 kho; GET_ITEM_HISTORY để xem lịch sử một mã; GET_MOVEMENTS cho hôm qua/ngày/range; GET_RECENT_VOUCHERS để liệt kê phiếu; GET_OPERATIONAL_REPORT cho báo cáo tài chính/tồn; GET_PROACTIVE_REPORT cho câu hỏi quản trị như ưu tiên hôm nay, cần mua gì, nên điều chuyển gì, hàng nào xuất nhanh/chậm hoặc bất thường.',"
new_prompt="'SEARCH_CATALOG để tìm SKU; GET_STOCK để đọc tồn live 2 kho; GET_ITEM_HISTORY để xem lịch sử một mã; GET_VOUCHER để đọc chính xác toàn bộ dòng của một số phiếu; GET_MOVEMENTS cho hôm qua/ngày/range; GET_RECENT_VOUCHERS để liệt kê phiếu; GET_OPERATIONAL_REPORT cho báo cáo tài chính/tồn; GET_PROACTIVE_REPORT cho câu hỏi quản trị như ưu tiên hôm nay, cần mua gì, nên điều chuyển gì, hàng nào xuất nhanh/chậm hoặc bất thường.',\n    'Khi người dùng yêu cầu sửa, hủy, xóa hoặc điều chỉnh một phiếu cũ: bắt buộc GET_VOUCHER đúng số phiếu trước khi lập Action Plan. Không được suy đoán nội dung phiếu từ hội thoại.',\n    'Không bao giờ hard-delete hoặc sửa trực tiếp dòng lịch sử đã ghi sổ. Từ "xóa phiếu" phải hiểu là VOID/HỦY bằng bút toán đảo. Từ "sửa phiếu" phải lập bút toán đảo phần sai rồi lập giao dịch đúng; note phải chứa số phiếu gốc theo dạng [VOID <SOPHIEU>] hoặc [CORRECT <SOPHIEU>].',\n    'Với phiếu cũ đã ghi: ưu tiên ngày hiện tại cho bút toán đảo/sửa để giữ chuỗi tồn hiện tại và audit. Nếu người dùng chỉ bổ sung giao dịch bị thiếu của ngày cũ thì transaction_date giữ đúng ngày người dùng cung cấp. Không tự viết lại before/after lịch sử.',"
if old_prompt not in code:
    raise SystemExit('Missing prompt anchor')
code=code.replace(old_prompt,new_prompt)

# Add voucher helper functions before item history helper
history_anchor="function aiChatItemHistoryV106_(codeOrQuery, warehouse, limit) {"
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
  const dates={},types={},warehouses={};
  rows.forEach(function(r){dates[String(r.date||'')]=true;types[String(r.type||'')]=true;warehouses[String(r.warehouse||'')]=true;});
  return {
    found:true,voucher:voucher,warehouse:warehouse,totalLines:rows.length,
    dates:Object.keys(dates).filter(Boolean),types:Object.keys(types).filter(Boolean),warehouses:Object.keys(warehouses).filter(Boolean),
    originalImmutable:HISTORICAL_VOUCHER_CONFIG.ORIGINAL_IMMUTABLE,
    correctionPolicy:HISTORICAL_VOUCHER_CONFIG.POLICY,
    rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})
  };
}

function aiHistoricalVoucherSelfTestV1107_() {
  const results=[];function add(name,pass,actual){results.push({name:name,pass:Boolean(pass),actual:actual});}
  add('Extract PXK',aiExtractVoucherNoV1107_('Hủy PXK-20260905-003 ngay')==='PXK-20260905-003',aiExtractVoucherNoV1107_('Hủy PXK-20260905-003 ngay'));
  add('Extract PNK',aiExtractVoucherNoV1107_('sửa pnk-20260903-12')==='PNK-20260903-12',aiExtractVoucherNoV1107_('sửa pnk-20260903-12'));
  add('Detect sửa phiếu',aiHistoricalVoucherRequestV1107_('Sửa phiếu PXK-20260905-003')===true,aiHistoricalVoucherRequestV1107_('Sửa phiếu PXK-20260905-003'));
  add('Detect hủy phiếu',aiHistoricalVoucherRequestV1107_('Hủy PXK-20260905-003')===true,aiHistoricalVoucherRequestV1107_('Hủy PXK-20260905-003'));
  add('Normal stock query not historical edit',aiHistoricalVoucherRequestV1107_('PXK-20260905-003 có những gì?')===false,aiHistoricalVoucherRequestV1107_('PXK-20260905-003 có những gì?'));
  return {version:HISTORICAL_VOUCHER_CONFIG.VERSION,total:results.length,passed:results.filter(function(x){return x.pass;}).length,failed:results.filter(function(x){return !x.pass;}).length,pass:results.every(function(x){return x.pass;}),results:results};
}

'''
if history_anchor not in code:
    raise SystemExit('Missing history helper anchor')
code=code.replace(history_anchor,helpers+history_anchor,1)

# Add aggregate regression function near existing V10.10.6 menu regression
anchor="function runRegressionTestsV1106FromMenu(){const r=runRegressionTestsV1106();SpreadsheetApp.getUi().alert('Regression V10.10.6: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}\n"
new_block=anchor+r'''\nfunction runRegressionTestsV1107(){
  const base=runRegressionTestsV1106();
  const hist=aiHistoricalVoucherSelfTestV1107_();
  const extra=(hist.results||[]).map(function(x){return {name:'V10.10.7 · '+x.name,pass:Boolean(x.pass),detail:{actual:x.actual}};});
  const merged=(base.results||[]).concat(extra);
  return {appVersion:APP_VERSION,historicalVoucherVersion:HISTORICAL_VOUCHER_CONFIG.VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,historicalTests:extra.length,results:merged};
}

function runRegressionTestsV1107FromMenu(){const r=runRegressionTestsV1107();SpreadsheetApp.getUi().alert('Regression V10.10.7: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}
'''
if anchor not in code:
    raise SystemExit('Missing V1106 regression anchor')
code=code.replace(anchor,new_block,1)

# Add menu item once
menu_anchor="    .addSeparator()\n    .addItem('V10.9 · Khởi tạo phân quyền + Audit', 'setupV109FromMenu')"
menu_new="    .addSeparator()\n    .addItem('V10.10.7 · Chạy regression Historical Voucher', 'runRegressionTestsV1107FromMenu')\n    .addSeparator()\n    .addItem('V10.9 · Khởi tạo phân quyền + Audit', 'setupV109FromMenu')"
code=replace_once(code,menu_anchor,menu_new,'menu item')

# Front-end visible version bump only; behavior remains backend-driven.
html=html.replace('V10.10.6','V10.10.7')

code_path.write_text(code,encoding='utf-8')
html_path.write_text(html,encoding='utf-8')
print('V10.10.7 transform applied')
