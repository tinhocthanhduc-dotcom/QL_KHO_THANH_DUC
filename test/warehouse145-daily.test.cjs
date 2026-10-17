'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../code.js'),'utf8');
class Sheet {
 constructor(rows){this.rows=rows;this.failure=null;this.formula='';}
 getLastRow(){let n=this.rows.length;while(n&&!(this.rows[n-1]||[]).some(v=>v!==''&&v!=null))n--;return n;}
 getRange(r,c,n=1,w=1){if(r==='A1'){r=1;c=1;}const s=this;return {
 getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:w},(_,j)=>s.rows[r+i-1]?.[c+j-1]??'')),
 getDisplayValues(){return this.getValues().map(row=>row.map(String));},getValue(){return this.getValues()[0][0];},getDisplayValue(){return String(this.getValue());},getFormula:()=>s.formula,
 setValues(values){if(s.failure&&s.failure(r,c,values))throw Error('INJECTED_WRITE');values.forEach((row,i)=>row.forEach((v,j)=>{(s.rows[r+i-1]||(s.rows[r+i-1]=[]))[c+j-1]=v;}));return this;},
 setValue(v){return this.setValues(Array.from({length:n},()=>Array(w).fill(v)));},setNumberFormat(){return this;},clearContent(){return this.setValue('');}
 };}
}
const row=(qty=4,date='2026-10-17',type='XUẤT KHO',voucher='PX-1',reason='')=>[date,voucher,type,'TEST_ACTOR','85A TOPZON','Hộp',qty,reason,'TX','APP58','','','POSTED'];
function fixture(){
 const stock=new Sheet([['TỒN KHO ngày 16/10/2026'],[],[],[],[1,'85A TOPZON','Hộp',7,4,100,'TD-0001','85A TOPZON'],[2,'OTHER','Hộp',8,9,40,'TD-0002','OTHER']]);
 const main=new Sheet([['HEADER'],row()]),backup=new Sheet([['HEADER']]);const wb={getSheetByName:n=>({TONKHO:stock,NHAT_KY_XNT:main,NHAT_KY_XNT_BACKUP:backup}[n]||null)};
 let locks=0;const ctx=vm.createContext({console,Date:class extends Date {constructor(...args){super(...(args.length?args:['2026-10-17T05:00:00Z']));}},Utilities:{},LockService:{getScriptLock:()=>({waitLock(){locks++;},releaseLock(){locks--;}})},SpreadsheetApp:{openById:()=>wb,flush(){}},CacheService:{getScriptCache:()=>({remove(){},put(){}})}});
 vm.runInContext(source,ctx);ctx.dateKey_=v=>typeof v==='string'?v.slice(0,10):v.toISOString().slice(0,10);ctx.displayDate_=v=>v.slice(8,10)+'/'+v.slice(5,7)+'/'+v.slice(0,4);ctx.clearDashboardCache=()=>{};ctx.coreRequirePermissionV109_=()=>{};
 return {ctx,stock,main,backup,wb,locks:()=>locks};
}
const values=x=>JSON.parse(JSON.stringify(x));
test('85A: existing OUT 4 + transfer OUT 20 -> E24, old A1 does not block; F unchanged on rebuild',()=>{
 const f=fixture();f.main.rows.push(row(20,'2026-10-17','XUẤT KHO','PX-TRANSFER'));const result=f.ctx.rebuildWarehouse145DailyCounters();
 assert.equal(result.success,true);assert.deepEqual(f.stock.rows[4].slice(3,6),[0,24,100]);assert.deepEqual(f.stock.rows[5].slice(3,6),[0,0,40]);assert.equal(f.stock.rows[0][0],'TỒN KHO ngày 17/10/2026');assert.equal(f.locks(),0);
 f.ctx.rebuildWarehouse145DailyCounters();assert.equal(f.stock.rows[4][4],24);
});
test('main + backup duplicates counted once, prior/next-day movements excluded; incoming transfers count D',()=>{
 const f=fixture();f.backup.rows.push(row());f.main.rows.push(row(20,'2026-10-17','NHẬP KHO','PN-TRANSFER'),row(99,'2026-10-16','XUẤT KHO','OLD'),row(88,'2026-10-18','XUẤT KHO','FUTURE'));
 f.ctx.rebuildWarehouse145DailyCounters();assert.deepEqual(f.stock.rows[4].slice(3,5),[20,4]);
});
test('inventory adjustments use before/after delta, rerun does not accumulate',()=>{
 const f=fixture();f.main.rows.push(row(10,'2026-10-17','KIỂM KHO','KK','Tồn 100 → 90'));f.ctx.rebuildWarehouse145DailyCounters();f.ctx.rebuildWarehouse145DailyCounters();assert.deepEqual(f.stock.rows[4].slice(3,6),[0,14,100]);
});
test('blank title works and formula title is preserved',()=>{
 const f=fixture();f.stock.rows[0][0]='';f.ctx.rebuildWarehouse145DailyCounters();assert.equal(f.stock.rows[4][4],4);f.stock.formula='=TODAY()';f.stock.rows[0][0]='formula display';f.ctx.rebuildWarehouse145DailyCounters();assert.equal(f.stock.rows[0][0],'formula display');
});
test('failure after counter write restores whole D/E block and title, no F change',()=>{
 const f=fixture(),before=values(f.stock.rows);let once=true;f.stock.failure=(r,c)=>{if(r===1&&once){once=false;return true;}return false;};assert.throws(()=>f.ctx.rebuildWarehouse145DailyCounters(),/INJECTED_WRITE/);assert.deepEqual(f.stock.rows,before);assert.equal(f.locks(),0);
});
test('ambiguous matching legacy names rejected before any counter change',()=>{
 const f=fixture(),before=values(f.stock.rows);f.stock.rows.push([3,'85A TOPZON','Hộp',1,1,30,'TD-0003']);const unchanged=values(f.stock.rows);assert.throws(()=>f.ctx.rebuildWarehouse145DailyCounters(),/trùng dòng/);assert.deepEqual(f.stock.rows,unchanged);
});
test('permission denial cannot read or write warehouse',()=>{
 const f=fixture(),before=values(f.stock.rows);f.ctx.coreRequirePermissionV109_=()=>{throw Error('FORBIDDEN');};assert.throws(()=>f.ctx.rebuildWarehouse145DailyCounters(),/FORBIDDEN/);assert.deepEqual(f.stock.rows,before);assert.equal(f.locks(),0);
});
function engineFixture(){
 const f=fixture(),stock58=new Sheet([[],[],[],[],[1,'TD-0001','85A TOPZON','Hộp',10,2,'OK','']]),journal58=new Sheet([['HEADER']]),transfer=new Sheet([['HEADER']]);
 const wb58={getSheetByName:n=>({TONKHO:stock58,NHAT_KY_XNT:journal58}[n]||null)},cache=new Map();let finalStatus='';
 Object.assign(f.ctx,{
 getSpreadsheet_:()=>wb58,ensureTransferSheet_:()=>transfer,aiFindExecutedPreview_:id=>cache.has('AI_EXECUTED_'+id)?JSON.parse(cache.get('AI_EXECUTED_'+id)):null,
 coreLedgerBegin_:()=>({txId:'TEST_TX'}),coreReserveDocumentSequence_:()=>({startSuffix:1}),coreAssertVouchersUnique_:()=>{},coreLedgerTransition_:()=>{},
 coreAppendTransactionLines_:()=>({}),coreUpdateTransactionLinesStatus_:()=>{},coreBuildTransactionLine_:()=>[],corePersonnelNoteV105_:()=>'',
 corePostCommitDerivedSyncV105_:()=>({}),coreVerifyCommittedV105_:()=>({after:{}}),coreLedgerFinish_:(l,status)=>{finalStatus=status;},aiAudit_:()=>{},aiGetModel_:()=>'',
 Utilities:{formatDate:(date,tz,format)=>format==='yyyy-MM-dd'?'2026-10-17':'17/10/2026',getUuid:()=> 'TEST_UUID'},
 CacheService:{getScriptCache:()=>({put:(key,val)=>cache.set(key,val),remove:key=>cache.delete(key)})}
 });
 const preview={ready:true,batch:true,previewId:'TEST_PREVIEW',transactionDate:'2026-10-17',initialStock:{'145|TD-0001':100,'58|TD-0001':10},slips:[{operation:'TRANSFER',sourceWarehouse:'145',destinationWarehouse:'58',actor:'TEST_ACTOR',slipNo:'1',note:'TEST_TRANSFER',lines:[{code:'TD-0001',qty:20}]}]};
 return {...f,stock58,journal58,transfer,preview,status:()=>finalStatus};
}
test('real batch engine transfers 20: F100->80, E4->24; replay changes neither counter nor stock',()=>{
 const f=engineFixture(),r=f.ctx.aiExecuteBatchPreview_(f.preview);assert(r.success);assert.equal(f.status(),'COMMITTED');assert.deepEqual(f.stock.rows[4].slice(3,6),[0,24,80]);assert.equal(f.stock58.rows[4][4],30);
 const before=values(f.stock.rows),last=f.main.getLastRow();assert(f.ctx.aiExecuteBatchPreview_(f.preview).alreadyExecuted);assert.deepEqual(f.stock.rows,before);assert.equal(f.main.getLastRow(),last);
});
test('real engine backdated transfer affects F but not todays E',()=>{
 const f=engineFixture();f.preview.transactionDate='2026-10-16';f.ctx.aiExecuteBatchPreview_(f.preview);assert.deepEqual(f.stock.rows[4].slice(3,6),[0,4,80]);
});
test('real engine failure after full projection restores all counters, F, title and removes new journals',()=>{
 const f=engineFixture(),before=values(f.stock.rows),journalBefore=values(f.main.rows);let once=true;f.ctx.corePostCommitDerivedSyncV105_=()=>{if(once){once=false;throw Error('AFTER_DAILY_PROJECTION');}return {};};
 assert.throws(()=>f.ctx.aiExecuteBatchPreview_(f.preview),/AFTER_DAILY_PROJECTION/);assert.equal(f.status(),'ROLLED_BACK');assert.deepEqual(f.stock.rows,before);assert.equal(f.stock58.rows[4][4],10);assert.deepEqual(f.main.rows.slice(0,journalBefore.length),journalBefore);assert.equal(f.main.getLastRow(),journalBefore.length);assert.equal(f.locks(),0);
});
test('real engine projection write fails: stock and journals rolled back',()=>{
 const f=engineFixture(),before=values(f.stock.rows);let once=true;f.stock.failure=(r,c)=>{if(r===5&&c===4&&once){once=false;return true;}return false;};
 assert.throws(()=>f.ctx.aiExecuteBatchPreview_(f.preview),/INJECTED_WRITE/);assert.equal(f.status(),'ROLLED_BACK');assert.deepEqual(f.stock.rows,before);assert.equal(f.main.getLastRow(),2);
});
test('failed counter rollback is marked NEEDS_RECONCILIATION, never reported ROLLED_BACK',()=>{
 const f=engineFixture();f.ctx.corePostCommitDerivedSyncV105_=()=>{throw Error('AFTER_DAILY');};
 const restore=f.ctx.restoreWarehouse145DailyCounters_;f.ctx.restoreWarehouse145DailyCounters_=snap=>{if(snap?.started)throw Error('COUNTER_RESTORE_FAILED');return restore(snap);};
 f.ctx.coreAppendReconciliation_=()=>{};assert.throws(()=>f.ctx.aiExecuteBatchPreview_(f.preview),/AFTER_DAILY/);assert.equal(f.status(),'NEEDS_RECONCILIATION');
});
