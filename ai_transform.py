from pathlib import Path

CODE = Path("code.js")
INDEX = Path("Index.html")

s = CODE.read_text(encoding="utf-8")


def must_replace(old, new, count=1):
    global s
    if s.count(old) < count:
        raise SystemExit("Expected source block not found: " + old[:120])
    s = s.replace(old, new, count)

must_replace("const APP_VERSION = 'V10.10.5.1';", "const APP_VERSION = 'V10.10.6';")
must_replace("VERSION: 'AGENT_V3_PROACTIVE_2026-09-10',", "VERSION: 'AGENT_V3.1_RESOLVER_V2_2026-09-11',")

agent_block = """const AI_AGENT_CONFIG = Object.freeze({
  VERSION: 'AGENT_V3.1_RESOLVER_V2_2026-09-11',
  STATE_VERSION: 'CTX_V1',
  MAX_TOOL_ROUNDS: 3,
  MAX_TOOL_RESULTS: 24,
  MAX_STATE_ITEMS: 4,
  MAX_MOVEMENT_ROWS: 80,
  MAX_HISTORY_ROWS: 40,
  MAX_RECENT_VOUCHERS: 20,
  MAX_ALIAS_LENGTH: 120
});
"""
resolver_config = agent_block + """

// V10.10.6 · Resolver V2: confidence chuẩn hóa + chặn đoán variant/tình trạng.
const AI_RESOLVER_CONFIG = Object.freeze({
  VERSION: 'RESOLVER_V2_2026-09-11',
  AUTO_RESOLVE_MIN_CONFIDENCE: 88,
  EXACT_MODEL_CONFIDENCE: 96,
  HIGH_CONFIDENCE_FLOOR: 88,
  MAX_CANDIDATES: 8
});
"""
must_replace(agent_block, resolver_config)

start = s.index('function coreResolveSkuIdentityV105_(itemText, catalog) {')
end = s.index('\nfunction coreBusinessReasonV105_', start)
s = s[:start] + 'function aiResolverItemTextV2_(item) {\n  return [item && item.name || \'\', item && item.aliases || \'\'].concat(item && item.legacyNames || []).join(\' | \');\n}\n\nfunction aiResolverScoreConfidenceV2_(score) {\n  score = Number(score || 0);\n  if (score >= 900) return 99;\n  if (score >= 650) return 97;\n  if (score >= 500) return 95;\n  if (score >= 400) return 93;\n  if (score >= 340) return 91;\n  if (score >= 300) return 89;\n  if (score >= 260) return 86;\n  if (score >= 220) return 80;\n  if (score >= 170) return 72;\n  if (score > 0) return Math.max(35, Math.min(70, Math.round(score / 3)));\n  return 0;\n}\n\nfunction aiResolverCandidateRowsV2_(scored) {\n  const rows = Array.isArray(scored) ? scored : [];\n  return rows.slice(0, AI_RESOLVER_CONFIG.MAX_CANDIDATES).map(function(x){\n    return {\n      code:x.item.code,\n      name:x.item.name,\n      score:Number(x.score || 0),\n      confidence:aiResolverScoreConfidenceV2_(x.score)\n    };\n  });\n}\n\nfunction aiResolverMachinePoolV2_(pool) {\n  return Array.isArray(pool) && pool.length > 0 && pool.every(function(item){\n    const text = aiResolverItemTextV2_(item);\n    return aiProductKind_(text) === \'MACHINE\';\n  });\n}\n\nfunction aiResolverMachineConditionV2_(text) {\n  const n = normalize_(text);\n  if (/da qua su dung|may cu|\\bcu\\b|thao may/.test(n)) return \'USED\';\n  if (/may moi|\\bmoi\\b/.test(n)) return \'NEW\';\n  // CH chỉ mang nghĩa NEW khi candidate pool đã xác định là máy in.\n  if (/chinh hang|\\bch\\b/.test(n)) return \'NEW\';\n  return \'\';\n}\n\nfunction aiResolverVariantAmbiguityV2_(raw, pool) {\n  if (!Array.isArray(pool) || pool.length < 2) return false;\n  const machinePool = aiResolverMachinePoolV2_(pool);\n  const queryVariants = aiVariantTokens_(raw).filter(function(v){return !(machinePool && v===\'CH\');});\n  if (queryVariants.length) return false;\n  const signatures = {};\n  let explicitCount = 0;\n  pool.forEach(function(item){\n    const vars = aiVariantTokens_(aiResolverItemTextV2_(item)).filter(function(v){return !(machinePool && v===\'CH\');});\n    if (vars.length) explicitCount++;\n    signatures[vars.length ? vars.slice().sort().join(\'+\') : \'(NONE)\'] = true;\n  });\n  return explicitCount > 0 && Object.keys(signatures).length > 1;\n}\n\nfunction aiResolverConditionAmbiguityV2_(raw, pool) {\n  if (!aiResolverMachinePoolV2_(pool) || aiResolverMachineConditionV2_(raw) || pool.length < 2) return false;\n  const conditions = {};\n  pool.forEach(function(item){\n    const condition = aiResolverMachineConditionV2_(aiResolverItemTextV2_(item));\n    if (condition) conditions[condition] = true;\n  });\n  return Object.keys(conditions).length > 1;\n}\n\nfunction aiResolverEnrichResultV2_(result, confidence, margin) {\n  result = result || {};\n  result.confidence = Math.max(0, Math.min(100, Math.round(Number(confidence || 0))));\n  result.margin = Math.max(0, Number(margin || 0));\n  result.resolverVersion = AI_RESOLVER_CONFIG.VERSION;\n  return result;\n}\n\nfunction coreResolveSkuIdentityV105_(itemText, catalog) {\n  const raw = String(itemText || \'\').trim();\n  const q = normalize_(raw);\n  const list = Array.isArray(catalog) ? catalog : [];\n  if (!q) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:\'EMPTY\',ruleId:\'R46\'},0,0);\n\n  const tdMatch = raw.toUpperCase().match(/TD-\\d{4}/);\n  if (tdMatch) {\n    const exactCode = list.find(function(x){return String(x.code||\'\').toUpperCase()===tdMatch[0];});\n    if (!exactCode) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:\'CODE_NOT_FOUND\',ruleId:\'R11\'},0,0);\n    const descriptive = raw.replace(tdMatch[0],\' \').trim();\n    const exactCandidate = [{code:exactCode.code,name:exactCode.name,score:10000,confidence:100}];\n    if (descriptive && !aiCandidateIdentityCompatible_(descriptive, exactCode)) {\n      return aiResolverEnrichResultV2_({resolved:false,candidates:exactCandidate,reason:\'CODE_IDENTITY_MISMATCH\',ruleId:\'R11\'},0,10000);\n    }\n    return aiResolverEnrichResultV2_({resolved:true,item:exactCode,score:10000,candidates:exactCandidate,reason:\'EXACT_CODE\',ruleId:\'R11\'},100,10000);\n  }\n\n  const qModels = aiStrongModelTokens_(raw);\n  const qBrands = aiBrandTokens_(raw);\n  const qVariants = aiVariantTokens_(raw);\n  const qKind = aiProductKind_(raw);\n  let qCondition = aiProductCondition_(raw,qKind);\n\n  // Exact normalized name/alias vẫn phải qua identity guard.\n  const exacts = list.filter(function(item){\n    const names=[item.name].concat(String(item.aliases||\'\').split(/[,;|\\n]+/)).concat(item.legacyNames||[]).map(normalize_).filter(Boolean);\n    return names.indexOf(q)>=0 && aiCandidateIdentityCompatible_(raw,item);\n  });\n  if (exacts.length===1) {\n    return aiResolverEnrichResultV2_({resolved:true,item:exacts[0],score:5000,candidates:[{code:exacts[0].code,name:exacts[0].name,score:5000,confidence:99}],reason:\'EXACT_NAME_OR_ALIAS\',ruleId:\'R11\'},99,5000);\n  }\n  if (exacts.length>1) {\n    return aiResolverEnrichResultV2_({resolved:false,candidates:exacts.slice(0,8).map(function(x){return {code:x.code,name:x.name,score:5000,confidence:99};}),reason:\'DUPLICATE_EXACT_ALIAS\',ruleId:\'R46\'},0,0);\n  }\n\n  let pool = list.slice();\n  if (qModels.length) {\n    pool = pool.filter(function(item){\n      const models=aiStrongModelTokens_(aiResolverItemTextV2_(item));\n      return qModels.some(function(m){return models.indexOf(m)>=0;});\n    });\n    if (!pool.length) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:\'MODEL_NOT_FOUND\',ruleId:\'R11\'},0,0);\n  }\n  if (qBrands.length) {\n    const branded = pool.filter(function(item){\n      const brands=aiBrandTokens_(aiResolverItemTextV2_(item));\n      return qBrands.some(function(b){return brands.indexOf(b)>=0;});\n    });\n    if (branded.length) pool=branded;\n  }\n  if (qKind) {\n    const kinded=pool.filter(function(item){return aiProductKind_(aiResolverItemTextV2_(item))===qKind;});\n    if (kinded.length) pool=kinded;\n  }\n  if (!qCondition && aiResolverMachinePoolV2_(pool)) qCondition = aiResolverMachineConditionV2_(raw);\n  if (qVariants.length) {\n    pool=pool.filter(function(item){\n      const vars=aiVariantTokens_(aiResolverItemTextV2_(item));\n      return qVariants.every(function(v){return vars.indexOf(v)>=0;});\n    });\n    if (!pool.length) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:\'VARIANT_NOT_FOUND\',ruleId:\'R12\'},0,0);\n  }\n  if (qCondition) {\n    const conditioned=pool.filter(function(item){\n      const t=aiResolverItemTextV2_(item);\n      return aiProductCondition_(t,aiProductKind_(t))===qCondition;\n    });\n    if (conditioned.length) pool=conditioned;\n  }\n\n  const scored=pool.map(function(item){return {item:item,score:aiScoreCandidate_(q,item)};})\n    .filter(function(x){return x.score>0;}).sort(function(a,b){return b.score-a.score;});\n  const top=scored[0], second=scored[1];\n  const candidates=aiResolverCandidateRowsV2_(scored);\n  if (!top) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:\'NO_MATCH\',ruleId:\'R46\'},0,0);\n\n  const margin = second ? Number(top.score-second.score) : Number(top.score);\n  let confidence = aiResolverScoreConfidenceV2_(top.score);\n  if (second) confidence = Math.min(98, confidence + Math.min(5, Math.floor(Math.max(0,margin)/45)));\n  else confidence = Math.min(98, confidence + 3);\n\n  if (qModels.length) {\n    if (aiResolverVariantAmbiguityV2_(raw, pool)) {\n      return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'MODEL_VARIANT_AMBIGUOUS\',ruleId:\'R12\'},Math.min(confidence,79),margin);\n    }\n    if (aiResolverConditionAmbiguityV2_(raw, pool)) {\n      return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'MODEL_CONDITION_AMBIGUOUS\',ruleId:\'R46\'},Math.min(confidence,79),margin);\n    }\n    if (second && margin<60) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'MODEL_VARIANT_AMBIGUOUS\',ruleId:\'R12\'},Math.min(confidence,79),margin);\n    confidence = Math.max(confidence, AI_RESOLVER_CONFIG.EXACT_MODEL_CONFIDENCE);\n    return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:\'EXACT_MODEL\',ruleId:\'R11\'},confidence,margin);\n  }\n\n  if (top.score<260) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'LOW_CONFIDENCE\',ruleId:\'R46\'},confidence,margin);\n  if (second && second.score>=170 && margin<70) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'AMBIGUOUS\',ruleId:\'R46\'},Math.min(confidence,79),margin);\n  if (confidence < AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE) {\n    return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:\'LOW_CONFIDENCE_V2\',ruleId:\'R46\'},confidence,margin);\n  }\n  confidence = Math.max(confidence, AI_RESOLVER_CONFIG.HIGH_CONFIDENCE_FLOOR);\n  return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:\'HIGH_CONFIDENCE\',ruleId:\'R11\'},confidence,margin);\n}\n' + s[end:]

must_replace("resolverReason:match.reason});", "resolverReason:match.reason,resolverConfidence:Number(match.confidence||0),resolverVersion:String(match.resolverVersion||AI_RESOLVER_CONFIG.VERSION)});", 2)

old = """const cands=(resolution.candidates||[]).slice(0,AI_CHAT_CONFIG.MAX_CANDIDATES).map(function(x){const s=by58[normalize_(x.code)]||{};return {code:x.code,name:x.name,unit:s.unit||'',qty58:Number(s.qty||0),qty145:Number(q145[normalize_(x.code)]||0),score:x.score};});
  return {query:query,resolved:Boolean(resolution.resolved),reason:resolution.reason||'',strongModels:aiStrongModelTokens_(query),exactModelFound:aiStrongModelTokens_(query).length?resolution.reason!=='MODEL_NOT_FOUND':Boolean(resolution.resolved),item:resolution.resolved?(function(){const z=by58[normalize_(resolution.item.code)]||{};return {code:resolution.item.code,name:resolution.item.name,unit:z.unit||'',qty58:Number(z.qty||0),qty145:Number(q145[normalize_(resolution.item.code)]||0),referencePrice:Number(z.referencePrice||0),stockValue58:Number(z.stockValue||0),status58:String(z.actualStatus||z.status||statusOf_(z.qty,z.threshold||0)),threshold58:Number(z.threshold||0)};})():null,candidates:cands};
"""
new = """const cands=(resolution.candidates||[]).slice(0,AI_CHAT_CONFIG.MAX_CANDIDATES).map(function(x){const s=by58[normalize_(x.code)]||{};return {code:x.code,name:x.name,unit:s.unit||'',qty58:Number(s.qty||0),qty145:Number(q145[normalize_(x.code)]||0),score:x.score,confidence:Number(x.confidence||0)};});
  return {query:query,resolved:Boolean(resolution.resolved),reason:resolution.reason||'',confidence:Number(resolution.confidence||0),margin:Number(resolution.margin||0),resolverVersion:String(resolution.resolverVersion||AI_RESOLVER_CONFIG.VERSION),strongModels:aiStrongModelTokens_(query),exactModelFound:aiStrongModelTokens_(query).length?resolution.reason!=='MODEL_NOT_FOUND':Boolean(resolution.resolved),item:resolution.resolved?(function(){const z=by58[normalize_(resolution.item.code)]||{};return {code:resolution.item.code,name:resolution.item.name,unit:z.unit||'',qty58:Number(z.qty||0),qty145:Number(q145[normalize_(resolution.item.code)]||0),referencePrice:Number(z.referencePrice||0),stockValue58:Number(z.stockValue||0),status58:String(z.actualStatus||z.status||statusOf_(z.qty,z.threshold||0)),threshold58:Number(z.threshold||0),resolutionConfidence:Number(resolution.confidence||0)};})():null,candidates:cands};
"""
must_replace(old, new)

old2 = """if(search.resolved&&search.item){const x=search.item;return {found:true,item:x,total:Number(x.qty58||0)+Number(x.qty145||0),resolutionReason:search.reason};}
  return {found:false,candidates:(search.candidates||[]).slice(0,5),reason:search.reason,message:search.reason==='MODEL_NOT_FOUND'?'Không có model chính xác trong danh mục; không tự ghép sang model gần giống.':'Tên/mã chưa đủ chắc chắn để chọn một SKU.'};
"""
new2 = """if(search.resolved&&search.item){const x=search.item;return {found:true,item:x,total:Number(x.qty58||0)+Number(x.qty145||0),resolutionReason:search.reason,resolutionConfidence:Number(search.confidence||0),resolverVersion:search.resolverVersion};}
  return {found:false,candidates:(search.candidates||[]).slice(0,5),reason:search.reason,resolutionConfidence:Number(search.confidence||0),resolverVersion:search.resolverVersion,message:search.reason==='MODEL_NOT_FOUND'?'Không có model chính xác trong danh mục; không tự ghép sang model gần giống.':(search.reason==='MODEL_VARIANT_AMBIGUOUS'?'Model có nhiều phiên bản/variant; cần nói rõ WB/CH/ES/INKVIET/TOPZON/NP hoặc chọn đúng SKU.':(search.reason==='MODEL_CONDITION_AMBIGUOUS'?'Model có cả máy mới và đã qua sử dụng; cần nói rõ tình trạng.':'Tên/mã chưa đủ chắc chắn để chọn một SKU.'))};
"""
must_replace(old2, new2)

menu_marker = "function runRegressionTestsV109FromMenu(){const r=runRegressionTestsV109();SpreadsheetApp.getUi().alert('Regression V10.9: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}\n"
run_block = """function runRegressionTestsV1106(){
  const base=runRegressionTestsV109();
  const resolver=aiResolverV2SelfTest_();
  const extra=(resolver.results||[]).map(function(x){return {name:'V10.10.6 · '+x.name,pass:Boolean(x.pass),detail:x.detail||{}};});
  const merged=(base.results||[]).concat(extra);
  return {appVersion:APP_VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,resolverTests:extra.length,results:merged};
}

function runRegressionTestsV1106FromMenu(){const r=runRegressionTestsV1106();SpreadsheetApp.getUi().alert('Regression V10.10.6: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}
"""
must_replace(menu_marker, menu_marker + "\n" + run_block + "\n")

test_marker = 'function runRegressionTestsV107() {'
test_block = """function aiResolverV2SelfTest_() {
  function item(code,name,aliases){
    const x={code:code,name:name,unit:'Hộp',aliases:aliases||'',legacyNames:[]};
    x.searchText=normalize_([code,name,aliases||''].join(' | '));
    return x;
  }
  const catalog=[
    item('TD-1001','Hộp mực in 12A/303/FX9 - WB','12A WB; 12A whitebox'),
    item('TD-1002','Hộp mực in 12A/303/FX9 - TOPZON','12A TOPZON'),
    item('TD-1003','Máy in Brother HL-2321D - CH','HL-2321D mới'),
    item('TD-1004','Máy in Brother HL-2321D - đã qua sử dụng','HL-2321D cũ'),
    item('TD-1005','Hộp mực in 83A - WB','83A WB')
  ];
  const tests=[];
  function add(name,pass,detail){tests.push({name:name,pass:Boolean(pass),detail:detail||{}});}
  let r=coreResolveSkuIdentityV105_('TD-1001 Hộp mực 12A WB',catalog);
  add('Exact code confidence 100',r.resolved&&r.item.code==='TD-1001'&&r.confidence===100,r);
  r=coreResolveSkuIdentityV105_('12A whitebox',catalog);
  add('Exact alias resolves with high confidence',r.resolved&&r.item.code==='TD-1001'&&r.confidence>=96,r);
  r=coreResolveSkuIdentityV105_('12A',catalog);
  add('Bare model blocks variant guessing',!r.resolved&&r.reason==='MODEL_VARIANT_AMBIGUOUS'&&r.candidates.length>=2,r);
  r=coreResolveSkuIdentityV105_('12A WB',catalog);
  add('Explicit variant resolves correct SKU',r.resolved&&r.item.code==='TD-1001'&&r.confidence>=AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE,r);
  r=coreResolveSkuIdentityV105_('Brother HL-2321D',catalog);
  add('Machine model blocks new/used guessing',!r.resolved&&r.reason==='MODEL_CONDITION_AMBIGUOUS',r);
  r=coreResolveSkuIdentityV105_('Brother HL-2321D đã qua sử dụng',catalog);
  add('Explicit used condition resolves correct machine',r.resolved&&r.item.code==='TD-1004'&&r.confidence>=AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE,r);
  r=coreResolveSkuIdentityV105_('Canon LBP2900',catalog);
  add('Unknown exact model remains blocked',!r.resolved&&r.reason==='MODEL_NOT_FOUND',r);
  return {appVersion:APP_VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:tests.length,passed:tests.filter(function(x){return x.pass;}).length,failed:tests.filter(function(x){return !x.pass;}).length,pass:tests.every(function(x){return x.pass;}),results:tests};
}
"""
if test_marker not in s:
    raise SystemExit('Regression insertion marker not found')
s = s.replace(test_marker, test_block + '\n' + test_marker, 1)

CODE.write_text(s, encoding='utf-8')

html = INDEX.read_text(encoding='utf-8')
if 'V10.10.5.1' not in html:
    raise SystemExit('Index version marker not found')
html = html.replace('V10.10.5.1', 'V10.10.6')
INDEX.write_text(html, encoding='utf-8')
