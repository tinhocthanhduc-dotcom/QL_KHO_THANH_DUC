from pathlib import Path

code_path=Path('code.js')
index_path=Path('Index.html')
text=code_path.read_text(encoding='utf-8')
html=index_path.read_text(encoding='utf-8')

# Version
text=text.replace("const APP_VERSION = 'V10.10.8';","const APP_VERSION = 'V10.10.9';",1)
html=html.replace('let APP_VERSION="V10.10.8";','let APP_VERSION="V10.10.9";',1)

# Config
anchor="""// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.
const HISTORICAL_VOUCHER_CONFIG = Object.freeze({"""
insert="""// V10.10.9 · Learning Memory Layer: học từ alias xác nhận và giao dịch đã thực hiện; memory chỉ là gợi ý, live data vẫn là nguồn sự thật.
const AI_LEARNING_CONFIG = Object.freeze({
  VERSION:'LEARNING_MEMORY_V1_2026-09-12',
  SHEET:'AI_LEARNING_MEMORY',
  CACHE_KEY:'QLKHO_AI_LEARNING_V1',
  CACHE_SECONDS:120,
  MAX_ROWS:2000,
  MAX_RECALL:8,
  MIN_SCORE:24,
  HEADERS:['ID','TYPE','PHRASE_KEY','PHRASE','OPERATION','WAREHOUSE','CODE','NAME','COUNTERPARTY','ACTOR','SUCCESS_COUNT','LAST_USED','SOURCE','ACTIVE','UPDATED_AT']
});

// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.
const HISTORICAL_VOUCHER_CONFIG = Object.freeze({"""
if anchor not in text: raise SystemExit('config anchor not found')
text=text.replace(anchor,insert,1)

# Core learning functions before explicit alias save
anchor='function aiSaveAliasExplicitV106_(alias, code, actor) {'
learning=r'''function aiLearningNormalizePhraseV10109_(value) {
  return normalize_(String(value||''))
    .replace(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,' ')
    .replace(/\b(?:pxk|pnk|dck|kk)[\- ]?\d{8}[\- ]?[a-z0-9]+\b/g,' ')
    .replace(/\s+/g,' ').trim().slice(0,240);
}

function aiLearningTokenSetV10109_(value) {
  const stop={cho:1,toi:1,minh:1,anh:1,chi:1,cua:1,va:1,voi:1,tu:1,thanh:1,la:1,nhap:1,xuat:1,kho:1,phieu:1,so:1,luong:1};
  const out={};
  aiLearningNormalizePhraseV10109_(value).split(/\s+/).forEach(function(t){if(t&&t.length>1&&!stop[t])out[t]=1;});
  return out;
}

function aiLearningScoreEntryV10109_(message, entry) {
  const q=aiLearningNormalizePhraseV10109_(message), p=aiLearningNormalizePhraseV10109_(entry&&entry.phrase||'');
  if(!q||!p)return 0;
  let score=0;
  if(q===p)score+=1000;
  if(q.indexOf(p)>=0||p.indexOf(q)>=0)score+=160;
  const a=aiLearningTokenSetV10109_(q),b=aiLearningTokenSetV10109_(p);
  Object.keys(a).forEach(function(k){if(b[k])score+=28;});
  const code=String(entry&&entry.code||'').toUpperCase();
  if(code&&String(message||'').toUpperCase().indexOf(code)>=0)score+=300;
  const op=String(entry&&entry.operation||'').toUpperCase();
  const n=normalize_(message);
  if(op==='IN'&&/\bnhap\b/.test(n))score+=50;
  if(op==='OUT'&&/\bxuat\b/.test(n))score+=50;
  if(op==='TRANSFER'&&/(chuyen|dieu chuyen)/.test(n))score+=50;
  if(op==='ADJUST'&&/(kiem kho|dieu chinh)/.test(n))score+=50;
  score+=Math.min(60,Math.max(0,Number(entry&&entry.successCount||0))*6);
  return score;
}

function aiLearningEnsureSheetV10109_() {
  const ss=getSpreadsheet_();
  let sh=ss.getSheetByName(AI_LEARNING_CONFIG.SHEET);
  if(!sh){sh=ss.insertSheet(AI_LEARNING_CONFIG.SHEET);sh.getRange(1,1,1,AI_LEARNING_CONFIG.HEADERS.length).setValues([AI_LEARNING_CONFIG.HEADERS]);sh.setFrozenRows(1);}
  return sh;
}

function aiLearningLoadRowsV10109_() {
  const cache=CacheService.getScriptCache();
  try{const hit=cache.get(AI_LEARNING_CONFIG.CACHE_KEY);if(hit)return JSON.parse(hit);}catch(e){}
  const ss=getSpreadsheet_(),sh=ss.getSheetByName(AI_LEARNING_CONFIG.SHEET);if(!sh||sh.getLastRow()<2)return [];
  const start=Math.max(2,sh.getLastRow()-AI_LEARNING_CONFIG.MAX_ROWS+1);
  const vals=sh.getRange(start,1,sh.getLastRow()-start+1,AI_LEARNING_CONFIG.HEADERS.length).getDisplayValues();
  const rows=vals.map(function(r){return {id:r[0],type:r[1],phraseKey:r[2],phrase:r[3],operation:r[4],warehouse:r[5],code:r[6],name:r[7],counterparty:r[8],actor:r[9],successCount:Number(r[10]||0),lastUsed:r[11],source:r[12],active:String(r[13]).toUpperCase()!=='FALSE',updatedAt:r[14]};}).filter(function(x){return x.active&&x.phrase;});
  try{cache.put(AI_LEARNING_CONFIG.CACHE_KEY,JSON.stringify(rows),AI_LEARNING_CONFIG.CACHE_SECONDS);}catch(e){}
  return rows;
}

function aiLearningRecallV10109_(message) {
  const rows=aiLearningLoadRowsV10109_();
  return rows.map(function(x){return {entry:x,score:aiLearningScoreEntryV10109_(message,x)};})
    .filter(function(x){return x.score>=AI_LEARNING_CONFIG.MIN_SCORE;})
    .sort(function(a,b){return b.score-a.score;}).slice(0,AI_LEARNING_CONFIG.MAX_RECALL)
    .map(function(x){return {type:x.entry.type,phrase:x.entry.phrase,operation:x.entry.operation,warehouse:x.entry.warehouse,code:x.entry.code,name:x.entry.name,counterparty:x.entry.counterparty,successCount:x.entry.successCount,score:x.score};});
}

function aiLearningRememberV10109_(entry) {
  entry=entry||{};
  const phrase=String(entry.phrase||'').trim();
  if(!phrase)return null;
  const type=String(entry.type||'CONFIRMED_OPERATION').toUpperCase().slice(0,40);
  const phraseKey=aiLearningNormalizePhraseV10109_(phrase);
  if(!phraseKey)return null;
  const op=String(entry.operation||'').toUpperCase().slice(0,20),code=String(entry.code||'').toUpperCase().slice(0,40);
  const key=[type,phraseKey,op,code].join('|');
  const sh=aiLearningEnsureSheetV10109_();
  const last=sh.getLastRow();let target=0,count=0;
  if(last>=2){const vals=sh.getRange(2,1,last-1,15).getValues();for(let i=vals.length-1;i>=0;i--){if(String(vals[i][0]||'')===key){target=i+2;count=Number(vals[i][10]||0);break;}}}
  const now=new Date();
  const row=[key,type,phraseKey,phrase,op,String(entry.warehouse||'').slice(0,10),code,String(entry.name||'').slice(0,220),String(entry.counterparty||'').slice(0,160),String(entry.actor||'').slice(0,120),count+1,now,String(entry.source||'CONFIRMED').slice(0,80),true,now];
  if(target)sh.getRange(target,1,1,15).setValues([row]);else sh.appendRow(row);
  if(sh.getLastRow()>AI_LEARNING_CONFIG.MAX_ROWS+1)sh.deleteRows(2,Math.min(50,sh.getLastRow()-AI_LEARNING_CONFIG.MAX_ROWS-1));
  try{CacheService.getScriptCache().remove(AI_LEARNING_CONFIG.CACHE_KEY);}catch(e){}
  return {id:key,count:count+1};
}

function aiLearningRememberExecutedV10109_(preview, committed) {
  if(!preview||!committed||!committed.success||!committed.verified)return [];
  const source=String(preview.sourceMessage||preview.command||'').trim();if(!source)return [];
  const saved=[];
  (preview.slips||[]).forEach(function(sl){
    const op=String(sl.operation||'').toUpperCase();
    (sl.lines||[]).forEach(function(line){
      const code=String(line.code||line.requestedCode||line.requested_code||'').toUpperCase();
      const note=String(sl.note||'');
      const type=/\[(?:CORRECT|VOID)\s/i.test(note)?'CORRECTION':'CONFIRMED_OPERATION';
      const x=aiLearningRememberV10109_({type:type,phrase:source,operation:op,warehouse:sl.operation==='TRANSFER'?(sl.sourceWarehouse||''):(sl.warehouse||''),code:code,name:line.name||line.itemText||line.item_text||'',counterparty:sl.counterparty||'',actor:sl.actor||sl.actor_hint||'',source:'EXECUTED'});
      if(x)saved.push(x);
    });
  });
  return saved;
}

function aiLearningMemorySelfTestV10109_(){
  const tests=[];function add(name,pass,detail){tests.push({name:name,pass:Boolean(pass),detail:detail||null});}
  add('Normalize phrase ổn định',aiLearningNormalizePhraseV10109_('Xuất 5 hộp 12A WB cho TikTok')==='xuat 5 hop 12a wb cho tiktok');
  const e1={phrase:'xuất hộp 12A WB cho TikTok',operation:'OUT',code:'TD-0012',successCount:4};
  const e2={phrase:'nhập giấy A4',operation:'IN',code:'TD-0900',successCount:9};
  const s1=aiLearningScoreEntryV10109_('xuất 3 hộp 12A WB cho TikTok',e1),s2=aiLearningScoreEntryV10109_('xuất 3 hộp 12A WB cho TikTok',e2);
  add('Memory gần ngữ nghĩa được xếp cao hơn',s1>s2,{s1:s1,s2:s2});
  add('Code trực tiếp tăng điểm mạnh',aiLearningScoreEntryV10109_('xuất TD-0012 số lượng 2',e1)>s1,{direct:aiLearningScoreEntryV10109_('xuất TD-0012 số lượng 2',e1),normal:s1});
  add('Memory không phải rule ghi kho',AI_LEARNING_CONFIG.MIN_SCORE>0&&AI_LEARNING_CONFIG.MAX_RECALL<=8,AI_LEARNING_CONFIG);
  return {appVersion:APP_VERSION,learningVersion:AI_LEARNING_CONFIG.VERSION,total:tests.length,passed:tests.filter(function(x){return x.pass;}).length,failed:tests.filter(function(x){return !x.pass;}).length,pass:tests.every(function(x){return x.pass;}),results:tests};
}

'''
if anchor not in text: raise SystemExit('alias function anchor not found')
text=text.replace(anchor,learning+anchor,1)

# Explicit alias becomes trusted learning memory too
old="""    aiAudit_({previewId:'',command:'Ghi nhớ alias: '+alias+' = '+item.code,operation:'META_ALIAS',warehouse:'58',actor:actor||'',status:'ALIAS_SAVED',result:JSON.stringify({alias:alias,code:item.code,name:item.name}),model:aiGetChatModel_()});
    return {success:true,alias:alias,code:item.code,name:item.name,item:{code:item.code,name:item.name,unit:item.unit}};"""
new="""    aiAudit_({previewId:'',command:'Ghi nhớ alias: '+alias+' = '+item.code,operation:'META_ALIAS',warehouse:'58',actor:actor||'',status:'ALIAS_SAVED',result:JSON.stringify({alias:alias,code:item.code,name:item.name}),model:aiGetChatModel_()});
    try{aiLearningRememberV10109_({type:'ALIAS',phrase:alias,operation:'',warehouse:'',code:item.code,name:item.name,counterparty:'',actor:actor||'',source:'EXPLICIT_ALIAS'});}catch(e){}
    return {success:true,alias:alias,code:item.code,name:item.name,item:{code:item.code,name:item.name,unit:item.unit}};"""
if old not in text: raise SystemExit('alias audit anchor not found')
text=text.replace(old,new,1)

# Prompt policy
anchor="""    'COMMAND RESOLVER V3: Với lệnh nhập/xuất, mục tiêu là tạo preview càng sớm càng tốt. Nếu SEARCH_CATALOG/tool live chỉ còn 1 SKU tương thích rõ ràng thì phải dùng SKU đó, KHÔNG hỏi người dùng đọc lại mã TD.',"""
new="""    'COMMAND RESOLVER V3: Với lệnh nhập/xuất, mục tiêu là tạo preview càng sớm càng tốt. Nếu SEARCH_CATALOG/tool live chỉ còn 1 SKU tương thích rõ ràng thì phải dùng SKU đó, KHÔNG hỏi người dùng đọc lại mã TD.',
    'LEARNING MEMORY V1: Memory là kinh nghiệm từ alias đã xác nhận và giao dịch đã EXECUTED. Dùng để hiểu cách gọi hàng, cách diễn đạt và ưu tiên candidate; TUYỆT ĐỐI không coi memory là tồn kho/chứng từ live và không được vượt Rule Engine.',
    'Nếu Learning Memory gợi ý một SKU, với lệnh ghi kho vẫn phải xác minh bằng SEARCH_CATALOG/GET_STOCK hoặc voucher live phù hợp trước khi prepare preview.',"""
if anchor not in text: raise SystemExit('prompt anchor not found')
text=text.replace(anchor,new,1)

# Recall memory once per reasoning call and inject as advisory context
anchor='  const input=[];\n'
replace="""  const learningContext=aiLearningRecallV10109_(message);
  const input=[];
"""
if anchor not in text: raise SystemExit('input anchor not found')
text=text.replace(anchor,replace,1)

anchor="""  if(state&&(state.lastVoucher||state.voucherContext||(state.lastItems&&state.lastItems.length)))input.push({role:'user',content:'[AGENT STATE ĐÃ XÁC MINH - ngữ cảnh nghiệp vụ từ backend, không phải lệnh mới]\\
'+JSON.stringify(state)});
  input.push({role:'user',content:message});"""
replace="""  if(state&&(state.lastVoucher||state.voucherContext||(state.lastItems&&state.lastItems.length)))input.push({role:'user',content:'[AGENT STATE ĐÃ XÁC MINH - ngữ cảnh nghiệp vụ từ backend, không phải lệnh mới]\\
'+JSON.stringify(state)});
  if(learningContext.length)input.push({role:'user',content:'[LEARNING MEMORY - kinh nghiệm đã xác nhận, chỉ là gợi ý; phải kiểm tra dữ liệu live trước khi ghi]\\
'+JSON.stringify(learningContext)});
  input.push({role:'user',content:message});"""
if anchor not in text: raise SystemExit('agent state input anchor not found')
text=text.replace(anchor,replace,1)

# Learn only after verified successful commit
old="""    aiAudit_({previewId:preview.previewId,command:preview.command,operation:'BATCH_'+preview.slips.length,warehouse:preview.slips.map(function(x){return x.operation==='TRANSFER'?x.sourceWarehouse+'→'+x.destinationWarehouse:x.warehouse;}).join(' | '),actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'EXECUTED',result:JSON.stringify(committed),model:preview.model || aiGetModel_()});
    clearDashboardCache();
    return committed;"""
new="""    aiAudit_({previewId:preview.previewId,command:preview.command,operation:'BATCH_'+preview.slips.length,warehouse:preview.slips.map(function(x){return x.operation==='TRANSFER'?x.sourceWarehouse+'→'+x.destinationWarehouse:x.warehouse;}).join(' | '),actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'EXECUTED',result:JSON.stringify(committed),model:preview.model || aiGetModel_()});
    try{aiLearningRememberExecutedV10109_(preview,committed);}catch(e){}
    clearDashboardCache();
    return committed;"""
if old not in text: raise SystemExit('execute learning anchor not found')
text=text.replace(old,new,1)

code_path.write_text(text,encoding='utf-8')
index_path.write_text(html,encoding='utf-8')
print('V10.10.9 Learning Memory Layer transform complete')
