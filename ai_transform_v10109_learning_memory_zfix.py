from pathlib import Path

cp=Path('code.js'); hp=Path('Index.html')
text=cp.read_text(encoding='utf-8'); html=hp.read_text(encoding='utf-8')

text=text.replace("const APP_VERSION = 'V10.10.8';","const APP_VERSION = 'V10.10.9';",1)
text=text.replace("VERSION: 'AGENT_V3.3_COMMAND_RESOLVER_2026-09-12',","VERSION: 'AGENT_V3.4_LEARNING_MEMORY_2026-09-12',",1)
html=html.replace('let APP_VERSION="V10.10.8";','let APP_VERSION="V10.10.9";',1)

cfg_anchor="// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.\nconst HISTORICAL_VOUCHER_CONFIG = Object.freeze({"
cfg="""// V10.10.9 · Learning Memory Layer: chỉ học từ dữ liệu đã xác nhận; memory không thay dữ liệu live.
const AI_LEARNING_CONFIG = Object.freeze({
  VERSION:'LEARNING_MEMORY_V1_2026-09-12',
  SHEET:'AI_LEARNING_MEMORY', CACHE_KEY:'QLKHO_AI_LEARNING_V1', CACHE_SECONDS:120,
  MAX_ROWS:2000, MAX_RECALL:8, MIN_SCORE:24,
  HEADERS:['ID','TYPE','PHRASE_KEY','PHRASE','OPERATION','WAREHOUSE','CODE','NAME','COUNTERPARTY','ACTOR','SUCCESS_COUNT','LAST_USED','SOURCE','ACTIVE','UPDATED_AT']
});

// V10.10.7 · Historical Voucher Control: lịch sử bất biến; sửa/hủy bằng giao dịch bù có audit.
const HISTORICAL_VOUCHER_CONFIG = Object.freeze({"""
if cfg_anchor not in text: raise SystemExit('config anchor missing')
text=text.replace(cfg_anchor,cfg,1)

fn_anchor='function aiSaveAliasExplicitV106_(alias, code, actor) {'
functions=r'''function aiLearningNormalizePhraseV10109_(value){
  return normalize_(String(value||'')).replace(/\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,' ').replace(/\b(?:pxk|pnk|dck|kk)[\- ]?\d{8}[\- ]?[a-z0-9]+\b/g,' ').replace(/\s+/g,' ').trim().slice(0,240);
}
function aiLearningTokenSetV10109_(value){
  const stop={cho:1,toi:1,minh:1,anh:1,chi:1,cua:1,va:1,voi:1,tu:1,thanh:1,la:1,nhap:1,xuat:1,kho:1,phieu:1,so:1,luong:1},out={};
  aiLearningNormalizePhraseV10109_(value).split(/\s+/).forEach(function(t){if(t&&t.length>1&&!stop[t])out[t]=1;});return out;
}
function aiLearningScoreEntryV10109_(message,entry){
  const q=aiLearningNormalizePhraseV10109_(message),p=aiLearningNormalizePhraseV10109_(entry&&entry.phrase||'');if(!q||!p)return 0;
  let score=0;if(q===p)score+=1000;if(q.indexOf(p)>=0||p.indexOf(q)>=0)score+=160;
  const a=aiLearningTokenSetV10109_(q),b=aiLearningTokenSetV10109_(p);Object.keys(a).forEach(function(k){if(b[k])score+=28;});
  const code=String(entry&&entry.code||'').toUpperCase();if(code&&String(message||'').toUpperCase().indexOf(code)>=0)score+=300;
  const op=String(entry&&entry.operation||'').toUpperCase(),n=normalize_(message);
  if(op==='IN'&&/\bnhap\b/.test(n))score+=50;if(op==='OUT'&&/\bxuat\b/.test(n))score+=50;if(op==='TRANSFER'&&/(chuyen|dieu chuyen)/.test(n))score+=50;if(op==='ADJUST'&&/(kiem kho|dieu chinh)/.test(n))score+=50;
  return score+Math.min(60,Math.max(0,Number(entry&&entry.successCount||0))*6);
}
function aiLearningEnsureSheetV10109_(){
  const ss=getSpreadsheet_();let sh=ss.getSheetByName(AI_LEARNING_CONFIG.SHEET);if(!sh){sh=ss.insertSheet(AI_LEARNING_CONFIG.SHEET);sh.getRange(1,1,1,AI_LEARNING_CONFIG.HEADERS.length).setValues([AI_LEARNING_CONFIG.HEADERS]);sh.setFrozenRows(1);}return sh;
}
function aiLearningLoadRowsV10109_(){
  const cache=CacheService.getScriptCache();try{const hit=cache.get(AI_LEARNING_CONFIG.CACHE_KEY);if(hit)return JSON.parse(hit);}catch(e){}
  const ss=getSpreadsheet_(),sh=ss.getSheetByName(AI_LEARNING_CONFIG.SHEET);if(!sh||sh.getLastRow()<2)return [];
  const start=Math.max(2,sh.getLastRow()-AI_LEARNING_CONFIG.MAX_ROWS+1),vals=sh.getRange(start,1,sh.getLastRow()-start+1,15).getDisplayValues();
  const rows=vals.map(function(r){return {id:r[0],type:r[1],phraseKey:r[2],phrase:r[3],operation:r[4],warehouse:r[5],code:r[6],name:r[7],counterparty:r[8],actor:r[9],successCount:Number(r[10]||0),lastUsed:r[11],source:r[12],active:String(r[13]).toUpperCase()!=='FALSE',updatedAt:r[14]};}).filter(function(x){return x.active&&x.phrase;});
  try{cache.put(AI_LEARNING_CONFIG.CACHE_KEY,JSON.stringify(rows),AI_LEARNING_CONFIG.CACHE_SECONDS);}catch(e){}return rows;
}
function aiLearningRecallV10109_(message){
  return aiLearningLoadRowsV10109_().map(function(x){return {entry:x,score:aiLearningScoreEntryV10109_(message,x)};}).filter(function(x){return x.score>=AI_LEARNING_CONFIG.MIN_SCORE;}).sort(function(a,b){return b.score-a.score;}).slice(0,AI_LEARNING_CONFIG.MAX_RECALL).map(function(x){return {type:x.entry.type,phrase:x.entry.phrase,operation:x.entry.operation,warehouse:x.entry.warehouse,code:x.entry.code,name:x.entry.name,counterparty:x.entry.counterparty,successCount:x.entry.successCount,score:x.score};});
}
function aiLearningRememberV10109_(entry){
  entry=entry||{};const phrase=String(entry.phrase||'').trim();if(!phrase)return null;const type=String(entry.type||'CONFIRMED_OPERATION').toUpperCase().slice(0,40),phraseKey=aiLearningNormalizePhraseV10109_(phrase);if(!phraseKey)return null;
  const op=String(entry.operation||'').toUpperCase().slice(0,20),code=String(entry.code||'').toUpperCase().slice(0,40),key=[type,phraseKey,op,code].join('|'),sh=aiLearningEnsureSheetV10109_();let target=0,count=0,last=sh.getLastRow();
  if(last>=2){const vals=sh.getRange(2,1,last-1,15).getValues();for(let i=vals.length-1;i>=0;i--){if(String(vals[i][0]||'')===key){target=i+2;count=Number(vals[i][10]||0);break;}}}
  const now=new Date(),row=[key,type,phraseKey,phrase,op,String(entry.warehouse||'').slice(0,10),code,String(entry.name||'').slice(0,220),String(entry.counterparty||'').slice(0,160),String(entry.actor||'').slice(0,120),count+1,now,String(entry.source||'CONFIRMED').slice(0,80),true,now];
  if(target)sh.getRange(target,1,1,15).setValues([row]);else sh.appendRow(row);if(sh.getLastRow()>AI_LEARNING_CONFIG.MAX_ROWS+1)sh.deleteRows(2,Math.min(50,sh.getLastRow()-AI_LEARNING_CONFIG.MAX_ROWS-1));try{CacheService.getScriptCache().remove(AI_LEARNING_CONFIG.CACHE_KEY);}catch(e){}return {id:key,count:count+1};
}
function aiLearningRememberExecutedV10109_(preview,committed){
  if(!preview||!committed||!committed.success||!committed.verified)return [];const source=String(preview.sourceMessage||preview.command||'').trim();if(!source)return [];const saved=[];
  (preview.slips||[]).forEach(function(sl){(sl.lines||[]).forEach(function(line){const note=String(sl.note||''),type=/\[(?:CORRECT|VOID)\s/i.test(note)?'CORRECTION':'CONFIRMED_OPERATION';const x=aiLearningRememberV10109_({type:type,phrase:source,operation:String(sl.operation||'').toUpperCase(),warehouse:sl.operation==='TRANSFER'?(sl.sourceWarehouse||''):(sl.warehouse||''),code:String(line.code||line.requestedCode||line.requested_code||'').toUpperCase(),name:line.name||line.itemText||line.item_text||'',counterparty:sl.counterparty||'',actor:sl.actor||sl.actor_hint||'',source:'EXECUTED'});if(x)saved.push(x);});});return saved;
}
function aiLearningMemorySelfTestV10109_(){
  const t=[];function add(n,p,d){t.push({name:n,pass:Boolean(p),detail:d||null});}
  add('Normalize phrase',aiLearningNormalizePhraseV10109_('Xuất 5 hộp 12A WB cho TikTok')==='xuat 5 hop 12a wb cho tiktok');
  const e1={phrase:'xuất hộp 12A WB cho TikTok',operation:'OUT',code:'TD-0012',successCount:4},e2={phrase:'nhập giấy A4',operation:'IN',code:'TD-0900',successCount:9};
  const s1=aiLearningScoreEntryV10109_('xuất 3 hộp 12A WB cho TikTok',e1),s2=aiLearningScoreEntryV10109_('xuất 3 hộp 12A WB cho TikTok',e2),sd=aiLearningScoreEntryV10109_('xuất TD-0012 số lượng 2',e1);
  add('Relevant memory ranks higher',s1>s2,{s1:s1,s2:s2});add('Direct code boosts memory',sd>s2,{direct:sd,other:s2});add('Memory limits safe',AI_LEARNING_CONFIG.MAX_RECALL<=8&&AI_LEARNING_CONFIG.MIN_SCORE>0,AI_LEARNING_CONFIG);
  return {appVersion:APP_VERSION,learningVersion:AI_LEARNING_CONFIG.VERSION,total:t.length,passed:t.filter(function(x){return x.pass;}).length,failed:t.filter(function(x){return !x.pass;}).length,pass:t.every(function(x){return x.pass;}),results:t};
}

'''
if fn_anchor not in text: raise SystemExit('function anchor missing')
text=text.replace(fn_anchor,functions+fn_anchor,1)

alias_old="aiAudit_({previewId:'',command:'Ghi nhớ alias: '+alias+' = '+item.code,operation:'META_ALIAS',warehouse:'58',actor:actor||'',status:'ALIAS_SAVED',result:JSON.stringify({alias:alias,code:item.code,name:item.name}),model:aiGetChatModel_()});\n    return {success:true,alias:alias,code:item.code,name:item.name,item:{code:item.code,name:item.name,unit:item.unit}};"
alias_new="aiAudit_({previewId:'',command:'Ghi nhớ alias: '+alias+' = '+item.code,operation:'META_ALIAS',warehouse:'58',actor:actor||'',status:'ALIAS_SAVED',result:JSON.stringify({alias:alias,code:item.code,name:item.name}),model:aiGetChatModel_()});\n    try{aiLearningRememberV10109_({type:'ALIAS',phrase:alias,code:item.code,name:item.name,actor:actor||'',source:'EXPLICIT_ALIAS'});}catch(e){}\n    return {success:true,alias:alias,code:item.code,name:item.name,item:{code:item.code,name:item.name,unit:item.unit}};"
if alias_old not in text: raise SystemExit('alias hook missing')
text=text.replace(alias_old,alias_new,1)

prompt="    'COMMAND RESOLVER V3: Với lệnh nhập/xuất, mục tiêu là tạo preview càng sớm càng tốt. Nếu SEARCH_CATALOG/tool live chỉ còn 1 SKU tương thích rõ ràng thì phải dùng SKU đó, KHÔNG hỏi người dùng đọc lại mã TD.',"
if prompt not in text: raise SystemExit('prompt anchor missing')
text=text.replace(prompt,prompt+"\n    'LEARNING MEMORY V1: Memory là kinh nghiệm từ alias đã xác nhận và giao dịch đã EXECUTED. Dùng để hiểu cách gọi hàng/cách diễn đạt và ưu tiên candidate; không được coi memory là tồn kho hay chứng từ live.',\n    'Nếu memory gợi ý SKU cho một lệnh ghi kho, vẫn phải xác minh qua tool live phù hợp trước khi chuẩn bị preview.',",1)

if '  const input=[];\n' not in text: raise SystemExit('input anchor missing')
text=text.replace('  const input=[];\n','  const learningContext=aiLearningRecallV10109_(message);\n  const input=[];\n',1)
msg_anchor="  input.push({role:'user',content:message});"
if msg_anchor not in text: raise SystemExit('message anchor missing')
text=text.replace(msg_anchor,"  if(learningContext.length)input.push({role:'user',content:'[LEARNING MEMORY - kinh nghiệm đã xác nhận, chỉ là gợi ý; phải kiểm tra live trước khi ghi]\\\n'+JSON.stringify(learningContext)});\n"+msg_anchor,1)

exec_old="aiAudit_({previewId:preview.previewId,command:preview.command,operation:'BATCH_'+preview.slips.length,warehouse:preview.slips.map(function(x){return x.operation==='TRANSFER'?x.sourceWarehouse+'→'+x.destinationWarehouse:x.warehouse;}).join(' | '),actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'EXECUTED',result:JSON.stringify(committed),model:preview.model || aiGetModel_()});\n    clearDashboardCache();"
exec_new="aiAudit_({previewId:preview.previewId,command:preview.command,operation:'BATCH_'+preview.slips.length,warehouse:preview.slips.map(function(x){return x.operation==='TRANSFER'?x.sourceWarehouse+'→'+x.destinationWarehouse:x.warehouse;}).join(' | '),actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'EXECUTED',result:JSON.stringify(committed),model:preview.model || aiGetModel_()});\n    try{aiLearningRememberExecutedV10109_(preview,committed);}catch(e){}\n    clearDashboardCache();"
if exec_old not in text: raise SystemExit('execute hook missing')
text=text.replace(exec_old,exec_new,1)

cp.write_text(text,encoding='utf-8');hp.write_text(html,encoding='utf-8')
print('V10.10.9 Learning Memory Layer zfix complete')
