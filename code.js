

// ===== BEGIN 00_Config.gs =====

// QL KHO THÀNH ĐỨC · V10.10.2
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.

const APP_VERSION = 'V10.10.6';

const DASHBOARD_CONFIG = Object.freeze({
  SPREADSHEET_ID: '1Nuwjjj2HpirYJA9YUppkQ_kSVpVo6LH4ShN14NkOMZU',
  STOCK_SHEET: 'TONKHO',
  JOURNAL_SHEET: 'NHAT_KY_XNT',
  JOURNAL_BACKUP_SHEET: 'BACKUP_NHAT_KY_XNT',
  SUMMARY_SHEET: 'TONG_HOP',
  PENDING_SHEET: 'PHAT_SINH_TAM',
  MASTER_META_SHEET: 'MASTER_META',
  TRANSFER_SHEET: 'DIEU_CHUYEN_KHO',
  TIME_ZONE: 'Asia/Ho_Chi_Minh',
  CACHE_SECONDS: 15,
  STOCK_HEADER_ROW: 4,
  STOCK_FIRST_DATA_ROW: 5,
  PRICE_COLUMN: 9,
  VALUE_COLUMN: 10,
  PRICE_UPDATED_COLUMN: 11
});

const WAREHOUSE_145_CONFIG = Object.freeze({
  SPREADSHEET_ID: '1ACsqTWveQR3ksIwE3bkQcN7RNI1a7MymtOOgJRp72yw',
  STOCK_SHEET: 'TONKHO',
  JOURNAL_BACKUP_SHEET: 'NHAT_KY_XNT_BACKUP',
  JOURNAL_SHEET: 'NHAT_KY_XNT',
  STOCK_HEADER_ROW: 4,
  STOCK_FIRST_DATA_ROW: 5,
  NAME_COLUMN: 2,
  UNIT_COLUMN: 3,
  DAY_IN_COLUMN: 4,
  DAY_OUT_COLUMN: 5,
  QTY_COLUMN: 6,
  MASTER_CODE_COLUMN: 7,
  MASTER_NAME_COLUMN: 8,
  PRICE_COLUMN: 9,
  VALUE_COLUMN: 10,
  PRICE_UPDATED_COLUMN: 11,
  DEFAULT_THRESHOLD: 2
});

const MASTER_META_CONFIG = Object.freeze({
  HEADER_ROW: 1,
  FIRST_DATA_ROW: 2,
  CODE_COLUMN: 1,
  NAME_COLUMN: 2,
  ALIAS_COLUMN: 3,
  LOCATION_58_COLUMN: 4,
  LOCATION_145_COLUMN: 5,
  THRESHOLD_145_COLUMN: 6,
  NOTE_COLUMN: 7,
  UPDATED_COLUMN: 8,
  MANAGE_145_COLUMN: 9,
  THRESHOLD_58_OVERRIDE_COLUMN: 10,
  TOTAL_COLUMNS: 10
});

const DASHBOARD_CACHE_KEY = 'QL_KHO_THANH_DUC_' + APP_VERSION;

const DASHBOARD_FAST_CACHE_KEY = DASHBOARD_CACHE_KEY + '_FAST';

const MODULE_CACHE_58 = DASHBOARD_CACHE_KEY + '_CORE58';

const MODULE_CACHE_145 = DASHBOARD_CACHE_KEY + '_CORE145';

const MODULE_CACHE_META = DASHBOARD_CACHE_KEY + '_META';

const MODULE_CACHE_OPS58 = DASHBOARD_CACHE_KEY + '_OPS58';

const REPOSITORY_CACHE = Object.freeze({
  STOCK58: DASHBOARD_CACHE_KEY + '_REPO_STOCK58',
  META: DASHBOARD_CACHE_KEY + '_REPO_META'
});

const CORE_V105_CONFIG = Object.freeze({
  RULESET_VERSION: 'R01-R50_2026-09-10',
  LEDGER_SHEET: 'TRANSACTION_LEDGER',
  RULE_AUDIT_SHEET: 'RULE_AUDIT',
  MAX_SLIPS_PER_BATCH: 50,
  MAX_LINES_PER_SLIP: 100,
  LEDGER_COLUMNS: 16,
  RULE_AUDIT_COLUMNS: 10
});


const TRANSACTION_V107_CONFIG = Object.freeze({
  VERSION: 'TX_LEDGER_V2_2026-09-10',
  SEQUENCE_SHEET: 'DOCUMENT_SEQUENCE',
  LINE_LEDGER_SHEET: 'TRANSACTION_LINES',
  RECONCILIATION_SHEET: 'TRANSACTION_RECONCILIATION',
  LEDGER_COLUMNS: 21,
  LINE_COLUMNS: 18,
  SEQUENCE_COLUMNS: 5,
  STALE_MINUTES: 2,
  MAX_RECONCILIATION_ROWS: 500
});

const INVENTORY_RULES_V105 = Object.freeze({
  R01:'Fresh-read dữ liệu live trước khi ghi',
  R02:'QL KHO 58 MÃ LÒ là nguồn chính thức',
  R03:'Mỗi số thứ tự người dùng là một phiếu logic',
  R04:'Số phiếu theo PXK/PNK/KK/DCK + ngày + suffix',
  R05:'Không tự đánh lại số thứ tự người dùng',
  R06:'Không ghi trùng phiếu/giao dịch',
  R07:'Tồn được tính tuần tự theo thứ tự phát sinh',
  R08:'Không để tồn âm',
  R09:'Một phiếu nhiều mã là atomic mặc định',
  R10:'Không tự đảo thứ tự xuất/nhập',
  R11:'Ưu tiên identity chính xác: TD → model → hãng → variant → alias/tên',
  R12:'Hậu tố/phiên bản là SKU độc lập',
  R13:'Chỉ tạo SKU mới khi người dùng cho phép',
  R14:'SKU mới phải đủ trường chuẩn',
  R15:'Tên ghi nhật ký lấy từ TONKHO',
  R16:'Bộ phải tách đúng cấu phần nếu kho quản lý từng cấu phần',
  R17:'ĐVT giữ theo danh mục',
  R18:'Đối tượng/lý do phản ánh đúng nghiệp vụ',
  R19:'Khách có tên riêng phải giữ tên riêng',
  R20:'Người thực hiện giữ đúng tên người dùng cung cấp',
  R21:'Ghi chú nhân sự theo chuẩn',
  R22:'AI không được thay cho lý do nghiệp vụ',
  R23:'Version AI chỉ là metadata phụ',
  R24:'Nhật ký đúng cấu trúc cột',
  R25:'TONKHO chỉ sửa đúng trường liên quan',
  R26:'Trạng thái tính từ tồn và mức cảnh báo',
  R27:'Không đổi mức cảnh báo khi nhập/xuất',
  R28:'Ghi chú TONKHO phản ánh giao dịch mới nhất',
  R29:'CAN_BO_SUNG đồng bộ với TONKHO',
  R30:'Không tự dọn bất thường ngoài phạm vi',
  R31:'TONG_HOP cập nhật sau đợt giao dịch',
  R32:'Tổng tồn phải đọc lại từ TONKHO',
  R33:'Rollover/backup nhật ký phải an toàn và có lock',
  R34:'Không làm mất lịch sử',
  R35:'Ngày theo Asia/Ho_Chi_Minh hoặc ngày người dùng cung cấp',
  R36:'Phiếu ngày cũ giữ đúng ngày cũ',
  R37:'Bổ sung ngày đã backup phải cập nhật lịch sử phù hợp',
  R38:'Luôn hậu kiểm sau khi ghi',
  R39:'Lỗi post-check phải rollback hoặc đánh dấu cần đối soát',
  R40:'Không báo đã ghi khi chưa xác minh',
  R41:'Fresh-read khi có nhiều AI/công cụ cùng ghi',
  R42:'Không tự sửa dòng do AI khác nếu chưa xác định sai nghiệp vụ',
  R43:'Câu hỏi phiếu hôm nay phải đọc live',
  R44:'Câu hỏi tồn kho phải đọc live',
  R45:'Toàn vẹn dữ liệu ưu tiên hơn tốc độ',
  R46:'Không suy diễn dữ liệu quan trọng khi còn nhiều khả năng',
  R47:'Chỉ chuẩn hóa lỗi gõ nhỏ không đổi ý nghĩa',
  R48:'Phản hồi sau ghi ngắn và có tính kiểm soát',
  R49:'Không ghi được phải nói lý do cụ thể',
  R50:'Không dữ liệu giả, không tự cân kho, không bỏ cảnh báo, không trùng, không mất lịch sử'
});

const AI_CONFIG = Object.freeze({
  API_URL: 'https://api.openai.com/v1/responses',
  DEFAULT_MODEL: 'gpt-5.6-luna',
  API_KEY_PROPERTY: 'OPENAI_API_KEY',
  MODEL_PROPERTY: 'OPENAI_MODEL',
  AUDIT_SHEET: 'AI_TAC_VU',
  PREVIEW_TTL_SECONDS: 600,
  MAX_COMMAND_LENGTH: 8000
});

const AI_CHAT_CONFIG = Object.freeze({
  MODEL_PROPERTY: 'OPENAI_CHAT_MODEL',
  DEFAULT_MODEL: 'gpt-5.6-luna',
  MAX_HISTORY: 24,
  MAX_MESSAGE: 5000,
  MAX_TOOL_REQUESTS: 8,
  MAX_CANDIDATES: 8
});

const AI_AGENT_CONFIG = Object.freeze({
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


// V10.10.6 · Resolver V2: confidence chuẩn hóa + chặn đoán variant/tình trạng.
const AI_RESOLVER_CONFIG = Object.freeze({
  VERSION: 'RESOLVER_V2_2026-09-11',
  AUTO_RESOLVE_MIN_CONFIDENCE: 88,
  EXACT_MODEL_CONFIDENCE: 96,
  HIGH_CONFIDENCE_FLOOR: 88,
  MAX_CANDIDATES: 8
});

const PROACTIVE_V108_CONFIG = Object.freeze({
  VERSION: 'PROACTIVE_V1',
  CACHE_KEY: 'QLKHO_V108_PROACTIVE',
  CACHE_SECONDS: 45,
  LOOKBACK_DAYS: 90,
  TOP_LIMIT: 12,
  LOW_COVERAGE_DAYS: 14,
  SLOW_DAYS: 30,
  DEAD_DAYS: 90
});


const SECURITY_V109_CONFIG = Object.freeze({
  VERSION: 'SECURITY_V1',
  ROLE_SHEET: 'USER_ROLES',
  AUDIT_SHEET: 'SECURITY_AUDIT',
  FALLBACK_ROLE_PROPERTY: 'AUTH_FALLBACK_ROLE',
  DEFAULT_FALLBACK_ROLE: 'OPERATOR',
  ROLES: Object.freeze({VIEWER:1, OPERATOR:2, MANAGER:3, ADMIN:4}),
  PERMISSIONS: Object.freeze({
    READ:'VIEWER',
    INVENTORY_IN:'OPERATOR',
    INVENTORY_OUT:'OPERATOR',
    TRANSFER:'OPERATOR',
    ADJUST:'MANAGER',
    CREATE_SKU:'ADMIN',
    UPDATE_PRICE:'ADMIN',
    UPDATE_META:'ADMIN',
    UPDATE_MAPPING:'ADMIN',
    RECONCILE:'ADMIN'
  })
});


// ===== END 00_Config.gs =====


// ===== BEGIN 01_App_Menu.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 01_App_Menu.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('QL KHO THÀNH ĐỨC · ' + APP_VERSION + ' · QUẢN LÝ 2 KHO');
}

function healthCheck() {
  let warehouse58 = false;
  let warehouse145 = false;
  let error58 = '';
  let error145 = '';
  try {
    const ss58 = SpreadsheetApp.openById(DASHBOARD_CONFIG.SPREADSHEET_ID);
    warehouse58 = Boolean(ss58 && ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
  } catch (error) {
    error58 = String(error && error.message ? error.message : error);
  }
  try {
    const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
    warehouse145 = Boolean(ss145 && ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET));
  } catch (error) {
    error145 = String(error && error.message ? error.message : error);
  }
  return {
    ok: warehouse58,
    appVersion: APP_VERSION,
    warehouse58: warehouse58,
    warehouse145: warehouse145,
    error58: error58,
    error145: error145,
    serverTime: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')
  };
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Dashboard ' + APP_VERSION)
    .addItem('Khởi tạo V9.3 / Phiếu điều chuyển', 'setupV93FromMenu')
    .addItem('Khởi tạo / đồng bộ MASTER_META', 'setupV91FromMenu')
    .addItem('Đồng bộ tên chuẩn Kho 145', 'syncWarehouse145MasterCatalogFromMenu')
    .addItem('Khởi tạo cột giá trị tồn kho', 'setupInventoryValueColumnsFromMenu')
    .addSeparator()
    .addItem('V10.9 · Khởi tạo phân quyền + Audit', 'setupV109FromMenu')
    .addItem('V10.9 · Chạy regression test', 'runRegressionTestsV109FromMenu')
    .addSeparator()
    .addItem('V10.8 · Khởi tạo AI quản trị chủ động', 'setupV108FromMenu')
    .addItem('V10.8 · Chạy regression test', 'runRegressionTestsV108FromMenu')
    .addItem('V10.8 · Phân tích vận hành live', 'showProactiveInsightsV108FromMenu')
    .addSeparator()
    .addItem('V10.7 · Khởi tạo Ledger + Sequence', 'setupV107FromMenu')
    .addItem('V10.7 · Chạy regression test', 'runRegressionTestsV107FromMenu')
    .addItem('V10.7 · Kiểm tra giao dịch dang dở', 'auditTransactionHealthV107FromMenu')
    .addItem('V10.7 · Đối soát giao dịch dang dở', 'reconcileStaleTransactionsV107FromMenu')
    .addItem('V10.7 · Audit toàn vẹn dữ liệu', 'auditInventoryIntegrityV105FromMenu')
    .addItem('Xóa cache dashboard', 'clearDashboardCacheFromMenu')
    .addToUi();
}

function setupV93FromMenu() {
  SpreadsheetApp.getUi().alert(setupV93());
}

function setupV91FromMenu() {
  SpreadsheetApp.getUi().alert(setupV91());
}

function syncWarehouse145MasterCatalogFromMenu() {
  SpreadsheetApp.getUi().alert(syncWarehouse145MasterCatalog());
}

function setupInventoryValueColumnsFromMenu() {
  const message = setupInventoryValueColumns();
  SpreadsheetApp.getUi().alert(message);
}

function clearDashboardCacheFromMenu() {
  clearDashboardCache();
  SpreadsheetApp.getUi().alert('Đã xóa cache Dashboard ' + APP_VERSION + '.');
}

function setupV109FromMenu(){const r=setupV109();SpreadsheetApp.getUi().alert('V10.9 setup: '+(r.ok?'OK':'CÓ CẢNH BÁO')+'\nRegression: '+r.regression.passed+'/'+r.regression.total+'\nSecurity: '+r.securityVersion+'\nVai trò hiện tại: '+r.context.role+'\nFallback: '+r.fallbackRole);}

function setupV108FromMenu() {
  const r=setupV108();
  SpreadsheetApp.getUi().alert('V10.8 setup: '+(r.ok?'OK':'CÓ CẢNH BÁO')+'\nRegression: '+r.regression.passed+'/'+r.regression.total+'\nAgent: '+r.agentVersion+'\nĐiều chuyển gợi ý: '+Number(r.summary&&r.summary.transferCount||0)+'\nMã cần mua: '+Number(r.summary&&r.summary.purchaseCount||0));
}

function showProactiveInsightsV108FromMenu() {
  const r=getProactiveInsights(true),s=r.summary||{};
  SpreadsheetApp.getUi().alert('Bản tin V10.8 · '+r.generatedAt+'\nĐiều chuyển: '+Number(s.transferCount||0)+' mã / '+Number(s.transferQty||0)+' SL\nCần mua: '+Number(s.purchaseCount||0)+' mã / '+Number(s.purchaseQty||0)+' SL\nĐộ phủ <=14 ngày: '+Number(s.lowCoverageCount||0)+'\nKhông xuất 90 ngày: '+Number(s.noOut90Count||0)+'\nThiếu giá: '+Number(s.priceMissingCount||0));
}

function setupV107FromMenu() {
  const r=setupV107();
  SpreadsheetApp.getUi().alert('V10.7 setup: '+(r.ok?'OK':'CÓ CẢNH BÁO')+'\nRegression: '+r.regression.passed+'/'+r.regression.total+'\nSequence hôm nay: '+r.sequence.lastSuffix+'\nGiao dịch cần đối soát: '+r.transactionHealth.needsReconciliation);
}

function auditTransactionHealthV107FromMenu() {
  const r=auditTransactionHealth();
  SpreadsheetApp.getUi().alert('Transaction Health V10.7: '+(r.ok?'OK':'CẦN KIỂM TRA')+'\nOpen: '+r.open+'\nStale: '+r.stale+'\nNeeds reconciliation: '+r.needsReconciliation+'\nCommitted: '+r.committed+'\nRolled back: '+r.rolledBack);
}

function reconcileStaleTransactionsV107FromMenu() {
  const r=reconcileStaleTransactions();
  SpreadsheetApp.getUi().alert('Đối soát V10.7: '+(r.ok?'OK':'CÒN GIAO DỊCH CẦN KIỂM TRA')+'\nĐã kiểm tra: '+r.checked+'\nKhôi phục COMMITTED: '+r.recoveredCommitted+'\nKhôi phục ROLLED_BACK: '+r.recoveredRolledBack+'\nCần đối soát thủ công: '+r.needsReconciliation);
}

function setupV106FromMenu() {
  const r=setupV106();
  SpreadsheetApp.getUi().alert('V10.6 setup: '+(r.ok?'OK':'CÓ CẢNH BÁO')+'\nRegression: '+r.regression.passed+'/'+r.regression.total+'\nAgent: '+r.agentVersion+'\nCAN_BO_SUNG: '+r.canBoSung.count+' mã');
}

function setupV105FromMenu() {
  const r=setupV105();
  SpreadsheetApp.getUi().alert('V10.5 setup: '+(r.ok?'OK':'CÓ CẢNH BÁO')+'\nRegression: '+r.regression.passed+'/'+r.regression.total+'\nUnit mismatch: '+((r.integrity.unitMismatch58||[]).length)+'\nCAN_BO_SUNG: '+r.canBoSung.count+' mã');
}

function auditInventoryIntegrityV105FromMenu() {
  const r=auditInventoryIntegrityV105();
  SpreadsheetApp.getUi().alert('Audit V10.5: '+(r.pass?'PASS':'CÓ CẢNH BÁO')+'\nMã trùng: '+r.duplicateCodes.length+'\nÂm Kho 58: '+r.negative58.length+'\nÂm Kho 145: '+r.negative145.length+'\nĐVT lệch: '+(r.unitMismatch58||[]).length+'\nCAN_BO_SUNG thiếu: '+r.canBoSungMissing.length+'\nCAN_BO_SUNG thừa: '+r.canBoSungExtra.length);
}



// ===== END 01_App_Menu.gs =====


// ===== BEGIN 05_Data_Repository.gs =====

// QL KHO THÀNH ĐỨC · V10.10.3
// Repository + request-local context for READ paths.
// Write/transaction paths intentionally remain direct-to-sheet to preserve fresh-read guarantees.

function createRequestContext_() {
  return {
    primarySpreadsheet: null,
    warehouse145Spreadsheet: null,
    memo: {},
    diagnostics: {repositoryReads: 0, requestMemoHits: 0, scriptCacheHits: 0}
  };
}

function repoClone_(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function repoPrimarySpreadsheet_(ctx) {
  ctx = ctx || createRequestContext_();
  if (ctx.primarySpreadsheet) return ctx.primarySpreadsheet;
  ctx.primarySpreadsheet = getSpreadsheet_();
  return ctx.primarySpreadsheet;
}

function repoWarehouse145Spreadsheet_(ctx) {
  ctx = ctx || createRequestContext_();
  if (ctx.warehouse145Spreadsheet) return ctx.warehouse145Spreadsheet;
  ctx.warehouse145Spreadsheet = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  return ctx.warehouse145Spreadsheet;
}

function repoCacheGet_(key, ctx) {
  try {
    const raw = CacheService.getScriptCache().get(key);
    if (!raw) return null;
    if (ctx && ctx.diagnostics) ctx.diagnostics.scriptCacheHits++;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function repoCachePut_(key, value) {
  try {
    CacheService.getScriptCache().put(key, JSON.stringify(value), DASHBOARD_CONFIG.CACHE_SECONDS);
  } catch (e) {}
}

function repoStock58_(ctx, forceRefresh) {
  ctx = ctx || createRequestContext_();
  if (!forceRefresh && ctx.memo.stock58) {
    ctx.diagnostics.requestMemoHits++;
    return repoClone_(ctx.memo.stock58);
  }
  if (!forceRefresh) {
    const cached = repoCacheGet_(REPOSITORY_CACHE.STOCK58, ctx);
    if (cached) {
      ctx.memo.stock58 = cached;
      return repoClone_(cached);
    }
  }
  const ss = repoPrimarySpreadsheet_(ctx);
  const data = readStock_(ss.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
  ctx.diagnostics.repositoryReads++;
  ctx.memo.stock58 = data;
  repoCachePut_(REPOSITORY_CACHE.STOCK58, data);
  return repoClone_(data);
}

function repoMasterMeta_(ctx, forceRefresh) {
  ctx = ctx || createRequestContext_();
  if (!forceRefresh && ctx.memo.masterMeta) {
    ctx.diagnostics.requestMemoHits++;
    return repoClone_(ctx.memo.masterMeta);
  }
  if (!forceRefresh) {
    const cached = repoCacheGet_(REPOSITORY_CACHE.META, ctx);
    if (cached) {
      ctx.memo.masterMeta = cached;
      return repoClone_(cached);
    }
  }
  const ss = repoPrimarySpreadsheet_(ctx);
  const data = readMasterMeta_(ss.getSheetByName(DASHBOARD_CONFIG.MASTER_META_SHEET));
  ctx.diagnostics.repositoryReads++;
  ctx.memo.masterMeta = data;
  repoCachePut_(REPOSITORY_CACHE.META, data);
  return repoClone_(data);
}

function repoJournal_(ctx) {
  ctx = ctx || createRequestContext_();
  if (ctx.memo.journal) {
    ctx.diagnostics.requestMemoHits++;
    return repoClone_(ctx.memo.journal);
  }
  const ss = repoPrimarySpreadsheet_(ctx);
  const data = readJournal_(ss.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET));
  ctx.diagnostics.repositoryReads++;
  ctx.memo.journal = data;
  return repoClone_(data);
}

function repoPending_(ctx) {
  ctx = ctx || createRequestContext_();
  if (ctx.memo.pending) {
    ctx.diagnostics.requestMemoHits++;
    return repoClone_(ctx.memo.pending);
  }
  const ss = repoPrimarySpreadsheet_(ctx);
  const data = readPending_(ss.getSheetByName(DASHBOARD_CONFIG.PENDING_SHEET));
  ctx.diagnostics.repositoryReads++;
  ctx.memo.pending = data;
  return repoClone_(data);
}

function repoSummaryDate_(ctx) {
  ctx = ctx || createRequestContext_();
  if (Object.prototype.hasOwnProperty.call(ctx.memo, 'summaryDate')) {
    ctx.diagnostics.requestMemoHits++;
    return ctx.memo.summaryDate;
  }
  const ss = repoPrimarySpreadsheet_(ctx);
  const value = readSummaryDate_(ss.getSheetByName(DASHBOARD_CONFIG.SUMMARY_SHEET));
  ctx.diagnostics.repositoryReads++;
  ctx.memo.summaryDate = value;
  return value;
}

function repoInvalidateReadCaches_() {
  const cache = CacheService.getScriptCache();
  cache.remove(REPOSITORY_CACHE.STOCK58);
  cache.remove(REPOSITORY_CACHE.META);
  return true;
}


// ===== END 05_Data_Repository.gs =====


// ===== BEGIN 10_Security_RBAC.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 10_Security_RBAC.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function coreNormalizeRole_(role) {
  role=String(role||'').trim().toUpperCase();
  return Object.prototype.hasOwnProperty.call(SECURITY_V109_CONFIG.ROLES,role)?role:SECURITY_V109_CONFIG.DEFAULT_FALLBACK_ROLE;
}

function coreRoleLevel_(role){return SECURITY_V109_CONFIG.ROLES[coreNormalizeRole_(role)]||0;}

function coreRoleAllows_(role,permission){return coreRoleLevel_(role)>=coreRoleLevel_(coreRequiredRoleV109_(permission));}

function coreEnsureSecuritySheets_(){
  const ss=getSpreadsheet_();
  const roles=coreEnsureSheetV105_(ss,SECURITY_V109_CONFIG.ROLE_SHEET,['PRINCIPAL','TYPE','DISPLAY_NAME','ROLE','ENABLED','NOTE','UPDATED']);
  const audit=coreEnsureSheetV105_(ss,SECURITY_V109_CONFIG.AUDIT_SHEET,['TIMESTAMP','PRINCIPAL','DISPLAY_NAME','ROLE','PERMISSION','RESULT','ACTION','ACTOR_HINT','DETAIL','APP_VERSION']);
  if(roles.getLastRow()>=2){try{roles.getRange(2,5,roles.getLastRow()-1,1).insertCheckboxes();}catch(e){}}
  try{roles.setFrozenRows(1);audit.setFrozenRows(1);}catch(e){}
  return {roles:roles,audit:audit};
}

function coreSecurityContext_(actorHint){
  let activeEmail='',effectiveEmail='';
  try{activeEmail=String(Session.getActiveUser().getEmail()||'').trim().toLowerCase();}catch(e){}
  try{effectiveEmail=String(Session.getEffectiveUser().getEmail()||'').trim().toLowerCase();}catch(e){}
  const actor=String(actorHint||'').trim();
  const rows=coreReadRoleRowsV109_();
  let match=null,source='FALLBACK';
  if(activeEmail){match=rows.find(function(x){return x.enabled&&x.type==='EMAIL'&&String(x.principal).toLowerCase()===activeEmail;});if(match)source='ACTIVE_EMAIL';}
  if(!match&&actor){match=rows.find(function(x){return x.enabled&&x.type==='ACTOR'&&normalize_(x.principal)===normalize_(actor);});if(match)source='ACTOR';}
  let fallback='';
  try{fallback=String(PropertiesService.getScriptProperties().getProperty(SECURITY_V109_CONFIG.FALLBACK_ROLE_PROPERTY)||SECURITY_V109_CONFIG.DEFAULT_FALLBACK_ROLE);}catch(e){fallback=SECURITY_V109_CONFIG.DEFAULT_FALLBACK_ROLE;}
  const role=match?match.role:coreNormalizeRole_(fallback);
  const displayName=match?(match.displayName||match.principal):(actor||activeEmail||'Người dùng chưa định danh');
  const permissions={};Object.keys(SECURITY_V109_CONFIG.PERMISSIONS).forEach(function(p){permissions[p]=coreRoleAllows_(role,p);});
  return {appVersion:APP_VERSION,securityVersion:SECURITY_V109_CONFIG.VERSION,role:role,displayName:displayName,source:source,authenticated:Boolean(activeEmail),activeEmailMasked:activeEmail?activeEmail.replace(/(^.).*(@.*$)/,'$1***$2'):'',effectiveUserAvailable:Boolean(effectiveEmail),permissions:permissions,requiredRoles:SECURITY_V109_CONFIG.PERMISSIONS};
}

function coreLogSecurityAudit_(ctx,permission,result,action,actorHint,detail){
  try{const sh=coreEnsureSecuritySheets_().audit;sh.appendRow([new Date(),ctx&&ctx.activeEmailMasked?ctx.activeEmailMasked:(ctx&&ctx.displayName||''),ctx&&ctx.displayName||'',ctx&&ctx.role||'',String(permission||''),String(result||''),String(action||''),String(actorHint||''),String(detail||''),APP_VERSION]);}catch(e){}
}

function getSecurityContext(payload){payload=payload||{};return coreSecurityContext_(payload.actor||payload.actorHint||'');}

function updateUserRole(payload){
  payload=payload||{};coreRequirePermissionV109_('UPDATE_META',payload.actor||'','updateUserRole','Quản lý phân quyền');
  const principal=String(payload.principal||'').trim(),type=String(payload.type||'EMAIL').trim().toUpperCase(),role=coreNormalizeRole_(payload.role||'VIEWER');
  if(!principal)throw new Error('Thiếu principal cần phân quyền.');if(['EMAIL','ACTOR'].indexOf(type)<0)throw new Error('TYPE chỉ hỗ trợ EMAIL hoặc ACTOR.');
  const sh=coreEnsureSecuritySheets_().roles,rows=coreReadRoleRowsV109_();let rowObj=rows.find(function(x){return x.type===type&&normalize_(x.principal)===normalize_(principal);});let row=rowObj?rowObj.row:sh.getLastRow()+1;
  sh.getRange(row,1,1,7).setValues([[principal,type,String(payload.displayName||principal).trim(),role,payload.enabled!==false,String(payload.note||'').trim(),new Date()]]);sh.getRange(row,5).insertCheckboxes();sh.getRange(row,7).setNumberFormat('dd/MM/yyyy HH:mm');
  return {success:true,principal:principal,type:type,role:role,enabled:payload.enabled!==false};
}



// ===== END 10_Security_RBAC.gs =====


// ===== BEGIN 20_Inventory_Data.gs =====

// QL KHO THÀNH ĐỨC · V10.10.4 FUNCTION DECOMPOSITION
// Module: 20_Inventory_Data.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function getWarehouse58Core(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cached = cache.get(MODULE_CACHE_58);
    if (cached) return JSON.parse(cached);
  }
  const startedAt = Date.now();
  const ctx = createRequestContext_();
  const ss = repoPrimarySpreadsheet_(ctx);
  const stock = repoStock58_(ctx, Boolean(forceRefresh));
  const result = {
    ok: true, appVersion: APP_VERSION, warehouse: '58', stock: stock,
    spreadsheetUrl: ss.getUrl(),
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    diagnostics: {serverMs: Date.now() - startedAt}
  };
  const serialized = JSON.stringify(result);
  try { cache.put(MODULE_CACHE_58, serialized, DASHBOARD_CONFIG.CACHE_SECONDS); } catch (e) {}
  return JSON.parse(serialized);
}

function getWarehouse145Core(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cached = cache.get(MODULE_CACHE_145);
    if (cached) return JSON.parse(cached);
  }
  const startedAt = Date.now();
  const ss = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  if (!sheet) throw new Error('Không tìm thấy TONKHO của Kho 145.');
  const stock = readWarehouse145Raw_(sheet);

  const reportDateKey = dateKey_(new Date());
  let journalToday = [];
  try {
    journalToday = journalToday
      .concat(readJournalBackup145_(ss.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET), sheet, WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET, reportDateKey, reportDateKey))
      .concat(readJournalBackup145_(ss.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET), sheet, WAREHOUSE_145_CONFIG.JOURNAL_SHEET, reportDateKey, reportDateKey));
    journalToday = dedupeJournalHistory_(journalToday);
  } catch (e) {
    journalToday = [];
  }

  const byCode = {}, byLegacy = {}, mappingCount = {};
  stock.forEach(function(item){
    if (item.masterCode) {
      const k = normalize_(item.masterCode);
      mappingCount[k] = (mappingCount[k] || 0) + 1;
    }
  });
  journalToday.forEach(function(row) {
    const bucket = {input: toNumber_(row.input), output: toNumber_(row.output)};
    if (row.code) {
      const k = normalize_(row.code);
      if (!byCode[k]) byCode[k] = {input:0,output:0};
      byCode[k].input += bucket.input; byCode[k].output += bucket.output;
    }
    if (row.sourceName) {
      const k2 = normalize_(row.sourceName);
      if (!byLegacy[k2]) byLegacy[k2] = {input:0,output:0};
      byLegacy[k2].input += bucket.input; byLegacy[k2].output += bucket.output;
    }
  });

  stock.forEach(function(item) {
    // Ưu tiên tên legacy của đúng dòng. Chỉ fallback theo mã chuẩn nếu mã đó map duy nhất.
    // Nếu một TD-xxxx đang bị map vào nhiều dòng 145, không được nhân đôi phát sinh cho từng dòng.
    const legacyMovement = byLegacy[normalize_(item.legacyName)];
    const codeKey = normalize_(item.masterCode);
    const codeMovement = item.masterCode && mappingCount[codeKey] === 1 ? byCode[codeKey] : null;
    const movement = legacyMovement || codeMovement || {input:0,output:0};
    item.dayIn = toNumber_(movement.input);
    item.dayOut = toNumber_(movement.output);
    item.openingQty = toNumber_(item.qty) - item.dayIn + item.dayOut;
  });

  const result = {
    ok: true, appVersion: APP_VERSION, warehouse: '145', stock: stock,
    reportDate: displayDate_(reportDateKey),
    spreadsheetUrl: ss.getUrl(),
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    diagnostics: {serverMs: Date.now() - startedAt, journalRowsToday: journalToday.length}
  };
  const serialized = JSON.stringify(result);
  try { cache.put(MODULE_CACHE_145, serialized, DASHBOARD_CONFIG.CACHE_SECONDS); } catch (e) {}
  return JSON.parse(serialized);
}

function getMasterMetaCore(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cached = cache.get(MODULE_CACHE_META);
    if (cached) return JSON.parse(cached);
  }
  const startedAt = Date.now();
  const ctx = createRequestContext_();
  const meta = repoMasterMeta_(ctx, Boolean(forceRefresh));
  const result = {
    ok: true, appVersion: APP_VERSION, rows: meta.rows,
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    diagnostics: {serverMs: Date.now() - startedAt}
  };
  const serialized = JSON.stringify(result);
  try { cache.put(MODULE_CACHE_META, serialized, DASHBOARD_CONFIG.CACHE_SECONDS); } catch (e) {}
  return JSON.parse(serialized);
}

function getWarehouse58Ops(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cached = cache.get(MODULE_CACHE_OPS58);
    if (cached) return JSON.parse(cached);
  }
  const startedAt = Date.now();
  const ctx = createRequestContext_();
  const stock = repoStock58_(ctx, Boolean(forceRefresh));
  const journal = repoJournal_(ctx);
  const pendingRaw = repoPending_(ctx);
  // Báo cáo vận hành luôn theo ngày hiện tại tại Việt Nam.
  // Không lấy ngày cũ từ TONG_HOP vì sheet tổng hợp có thể chưa được cập nhật sang ngày mới.
  const reportDateKey = dateKey_(new Date());
  const derived = deriveDashboardState_(stock, journal, pendingRaw, reportDateKey);
  const result = {
    ok: true, appVersion: APP_VERSION, stock: derived.stock,
    pending: derived.pending, unmatched: derived.unmatched, valueSummary: derived.valueSummary,
    reportDate: displayDate_(reportDateKey),
    pendingSource: pendingRaw.length ? DASHBOARD_CONFIG.PENDING_SHEET : 'Không có phát sinh tạm',
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    diagnostics: {serverMs: Date.now() - startedAt}
  };
  const serialized = JSON.stringify(result);
  try { cache.put(MODULE_CACHE_OPS58, serialized, DASHBOARD_CONFIG.CACHE_SECONDS); } catch (e) {}
  return JSON.parse(serialized);
}

function updateWarehouse145Mapping(payload) {
  payload = payload || {};
  coreRequirePermissionV109_('UPDATE_MAPPING',payload.actor||payload.person||'','updateWarehouse145Mapping',String(payload.sourceName||payload.sheetRow||''));
  const sheetRow = Math.floor(toNumber_(payload.sheetRow));
  const sourceName = String(payload.sourceName || '').trim();
  const masterCode = String(payload.masterCode || '').trim().toUpperCase();
  if (sheetRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) throw new Error('Dòng Kho 145 không hợp lệ.');

  const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const sheet145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  if (!sheet145 || sheetRow > sheet145.getLastRow()) throw new Error('Dòng Kho 145 không còn tồn tại.');
  const currentName = String(sheet145.getRange(sheetRow, WAREHOUSE_145_CONFIG.NAME_COLUMN).getDisplayValue() || '').trim();
  if (!currentName) throw new Error('Dòng Kho 145 hiện trống.');
  if (sourceName && normalize_(sourceName) !== normalize_(currentName)) {
    throw new Error('Dữ liệu Kho 145 đã thay đổi. Hãy Refresh rồi thử lại.');
  }

  if (!masterCode) {
    sheet145.getRange(sheetRow, WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN, 1, 2).clearContent();
    clearDashboardCache();
    return {success: true, sheetRow: sheetRow, masterCode: '', masterName: ''};
  }
  if (!/^TD-\d{4}$/i.test(masterCode)) throw new Error('Mã chuẩn phải có dạng TD-0001.');

  const stock58 = readStock_(getSpreadsheet_().getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
  const target = stock58.find(function(item) { return normalize_(item.code) === normalize_(masterCode); });
  if (!target) throw new Error('Không tìm thấy ' + masterCode + ' trong danh mục Kho 58.');

  sheet145.getRange(sheetRow, WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN, 1, 2)
    .setValues([[target.code, target.name]]);
  clearDashboardCache();
  return {success: true, sheetRow: sheetRow, masterCode: target.code, masterName: target.name};
}

function readWarehouse145Raw_(sheet) {
  if (!sheet) throw new Error('Không tìm thấy TONKHO của Kho 145.');
  const lastRow = sheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return [];
  const rowCount = lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1;
  const values = sheet.getRange(WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW, 1, rowCount, 11).getValues();
  return values.map(function(row, index) {
    const legacyName = String(row[1] || '').trim();
    const masterCode = String(row[6] || '').trim();
    const storedMasterName = String(row[7] || '').trim();
    const dayIn = toNumber_(row[3]);
    const dayOut = toNumber_(row[4]);
    const qty = toNumber_(row[5]);
    const referencePrice = toNumber_(row[8]);
    const hasReferencePrice = referencePrice > 0;
    const priceAgeDays = ageInDays_(row[10]);
    return {
      stt: toNumber_(row[0]) || index + 1,
      sheetRow: WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + index,
      code: masterCode, masterCode: masterCode, masterName: storedMasterName,
      legacyName: legacyName, name: storedMasterName || legacyName,
      unit: normalizeUnitValue_(row[2], legacyName),
      dayIn: dayIn, dayOut: dayOut, openingQty: qty - dayIn + dayOut, qty: qty,
      threshold: WAREHOUSE_145_CONFIG.DEFAULT_THRESHOLD,
      referencePrice: referencePrice, hasReferencePrice: hasReferencePrice,
      stockValue: hasReferencePrice ? qty * referencePrice : 0,
      priceUpdatedAt: displayDateTime_(row[10]), priceAgeDays: priceAgeDays,
      priceIsStale: hasReferencePrice && priceAgeDays !== null && priceAgeDays > 180,
      priceDateMissing: hasReferencePrice && priceAgeDays === null
    };
  }).filter(function(item) { return item.legacyName; });
}

function getSpreadsheet_() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (
    activeSpreadsheet &&
    activeSpreadsheet.getId() === DASHBOARD_CONFIG.SPREADSHEET_ID
  ) {
    return activeSpreadsheet;
  }

  return SpreadsheetApp.openById(DASHBOARD_CONFIG.SPREADSHEET_ID);
}

function readStock_(sheet) {
  if (!sheet) {
    throw new Error('Không tìm thấy sheet ' + DASHBOARD_CONFIG.STOCK_SHEET);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW) return [];

  const values = sheet
    .getRange(
      DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW,
      1,
      lastRow - DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + 1,
      11
    )
    .getValues();

  return values
    .map(function(row, index) {
      const code = String(row[1] || '').trim();
      const name = String(row[2] || '').trim();
      const qty = toNumber_(row[4]);
      const threshold = String(row[5] ?? '').trim() === '' ? 2 : Math.max(0, toNumber_(row[5]));
      const referencePrice = toNumber_(row[8]);
      const hasReferencePrice = referencePrice > 0;
      const priceAgeDays = ageInDays_(row[10]);

      return {
        stt: toNumber_(row[0]) || index + 1,
        sheetRow: DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + index,
        code: code,
        name: name,
        unit: normalizeUnitValue_(row[3], name),
        qty: qty,
        threshold: threshold,
        status: statusOf_(qty, threshold),
        note: String(row[7] || '').trim(),
        category: category_(name),
        referencePrice: referencePrice,
        hasReferencePrice: hasReferencePrice,
        stockValue: hasReferencePrice ? qty * referencePrice : 0,
        priceUpdatedAt: displayDateTime_(row[10]),
        priceAgeDays: priceAgeDays,
        priceIsStale: hasReferencePrice && priceAgeDays !== null && priceAgeDays > 180,
        priceDateMissing: hasReferencePrice && priceAgeDays === null
      };
    })
    .filter(function(item) {
      return /^TD-/i.test(item.code) && item.name;
    });
}

function readMasterMeta_(sheet) {
  const result = {rows: [], byCode: {}};
  if (!sheet) return result;

  const lastRow = sheet.getLastRow();
  if (lastRow < MASTER_META_CONFIG.FIRST_DATA_ROW) return result;

  const availableColumns = Math.min(
    Math.max(8, sheet.getMaxColumns()),
    MASTER_META_CONFIG.TOTAL_COLUMNS
  );
  const values = sheet.getRange(
    MASTER_META_CONFIG.FIRST_DATA_ROW,
    1,
    lastRow - MASTER_META_CONFIG.FIRST_DATA_ROW + 1,
    availableColumns
  ).getValues();

  values.forEach(function(row, index) {
    const code = String(row[0] || '').trim();
    if (!/^TD-/i.test(code)) return;

    const threshold145Raw = row[5];
    const threshold145 = threshold145Raw === '' || threshold145Raw == null
      ? null
      : Math.max(0, toNumber_(threshold145Raw));

    const manageRaw = row.length >= 9 ? row[8] : '';
    let manage145 = null;
    if (manageRaw === true || String(manageRaw).toUpperCase() === 'TRUE' || String(manageRaw).toUpperCase() === 'CÓ') manage145 = true;
    if (manageRaw === false || String(manageRaw).toUpperCase() === 'FALSE' || String(manageRaw).toUpperCase() === 'KHÔNG') manage145 = false;

    const threshold58Raw = row.length >= 10 ? row[9] : '';
    const threshold58Override = threshold58Raw === '' || threshold58Raw == null
      ? null
      : Math.max(0, toNumber_(threshold58Raw));

    const item = {
      sheetRow: MASTER_META_CONFIG.FIRST_DATA_ROW + index,
      code: code,
      name: String(row[1] || '').trim(),
      aliases: String(row[2] || '').trim(),
      location58: String(row[3] || '').trim(),
      location145: String(row[4] || '').trim(),
      threshold145: threshold145,
      note: String(row[6] || '').trim(),
      updatedAt: displayDateTime_(row[7]),
      updatedRaw: row[7] instanceof Date ? row[7].getTime() : (row[7] || ''),
      manage145: manage145,
      threshold58Override: threshold58Override
    };
    result.rows.push(item);
    result.byCode[normalize_(code)] = item;
  });

  return result;
}

function ensureMasterMetaSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(DASHBOARD_CONFIG.MASTER_META_SHEET);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(DASHBOARD_CONFIG.MASTER_META_SHEET);
  }
  if (sheet.getMaxColumns() < MASTER_META_CONFIG.TOTAL_COLUMNS) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), MASTER_META_CONFIG.TOTAL_COLUMNS - sheet.getMaxColumns());
  }

  const headers = [[
    'MÃ HÀNG', 'TÊN CHUẨN', 'ALIAS / TỪ KHÓA', 'VỊ TRÍ KHO 58',
    'VỊ TRÍ KHO 145', 'MỨC CẢNH BÁO KHO 145', 'GHI CHÚ', 'CẬP NHẬT',
    'QUẢN LÝ TẠI KHO 145', 'MỨC CẢNH BÁO KHO 58 (GHI ĐÈ)'
  ]];
  sheet.getRange(1, 1, 1, MASTER_META_CONFIG.TOTAL_COLUMNS).setValues(headers)
    .setBackground('#1F4E78')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setFrozenRows(1);
  [110, 320, 320, 150, 150, 155, 260, 145, 145, 170].forEach(function(width, index) {
    sheet.setColumnWidth(index + 1, width);
  });
  return sheet;
}

function updateMasterMeta(payload) {
  payload = payload || {};
  coreRequirePermissionV109_('UPDATE_META',payload.actor||payload.person||'','updateMasterMeta',String(payload.code||''));
  const code = String(payload.code || '').trim();
  if (!/^TD-/i.test(code)) throw new Error('Mã hàng không hợp lệ.');

  const stockSheet = getSpreadsheet_().getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const stock = readStock_(stockSheet);
  const masterItem = stock.find(function(item) {
    return normalize_(item.code) === normalize_(code);
  });
  if (!masterItem) throw new Error('Không tìm thấy mã ' + code + ' trong danh mục Kho 58.');

  const sheet = ensureMasterMetaSheet_();
  const meta = readMasterMeta_(sheet);
  const existing = meta.byCode[normalize_(code)];
  let row = existing ? existing.sheetRow : sheet.getLastRow() + 1;
  if (row < 2) row = 2;

  const threshold145Raw = payload.threshold145;
  const threshold145 = threshold145Raw === '' || threshold145Raw == null
    ? ''
    : Math.max(0, toNumber_(threshold145Raw));

  const threshold58Raw = payload.threshold58Override;
  const threshold58Override = threshold58Raw === '' || threshold58Raw == null
    ? ''
    : Math.max(0, toNumber_(threshold58Raw));

  let manage145 = payload.manage145;
  if (manage145 === 'true') manage145 = true;
  if (manage145 === 'false') manage145 = false;
  manage145 = Boolean(manage145);

  sheet.getRange(row, 1, 1, MASTER_META_CONFIG.TOTAL_COLUMNS).setValues([[
    masterItem.code,
    masterItem.name,
    String(payload.aliases || '').trim(),
    String(payload.location58 || '').trim(),
    String(payload.location145 || '').trim(),
    threshold145,
    String(payload.note || '').trim(),
    new Date(),
    manage145,
    threshold58Override
  ]]);
  sheet.getRange(row, 6).setNumberFormat('0');
  sheet.getRange(row, 8).setNumberFormat('dd/MM/yyyy HH:mm');
  sheet.getRange(row, 9).insertCheckboxes();
  sheet.getRange(row, 10).setNumberFormat('0');

  clearDashboardCache();
  return {
    success: true,
    code: masterItem.code,
    updatedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm')
  };
}

function readWarehouse145Stock_(sheet, masterStock, metaByCode) {
  if (!sheet) {
    throw new Error('Không tìm thấy sheet ' + WAREHOUSE_145_CONFIG.STOCK_SHEET + ' của Kho 145.');
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return [];

  const rowCount = lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1;
  const values = sheet.getRange(
    WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW, 1, rowCount, 11
  ).getValues();

  const masterByCode = {};
  (masterStock || []).forEach(function(item) {
    const code = normalize_(item.code);
    if (code) masterByCode[code] = item.name;
  });

  return values
    .map(function(row, index) {
      const legacyName = String(row[1] || '').trim();
      const masterCode = String(row[WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN - 1] || '').trim();
      const storedMasterName = String(row[WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN - 1] || '').trim();
      const liveMasterName = masterCode ? String(masterByCode[normalize_(masterCode)] || '').trim() : '';
      const masterName = liveMasterName || storedMasterName;
      const isMapped = Boolean(masterCode && liveMasterName);
      const mappingIssue = Boolean(masterCode && !liveMasterName);
      const displayName = isMapped ? liveMasterName : legacyName;
      const dayIn = toNumber_(row[3]);
      const dayOut = toNumber_(row[4]);
      const qty = toNumber_(row[5]);
      const meta = metaByCode && masterCode ? metaByCode[normalize_(masterCode)] : null;
      const threshold = meta && meta.threshold145 !== null
        ? toNumber_(meta.threshold145)
        : WAREHOUSE_145_CONFIG.DEFAULT_THRESHOLD;
      const referencePrice = toNumber_(row[8]);
      const hasReferencePrice = referencePrice > 0;
      const priceAgeDays = ageInDays_(row[10]);
      const stockValue = hasReferencePrice ? qty * referencePrice : 0;

      return {
        stt: toNumber_(row[0]) || index + 1,
        sheetRow: WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + index,
        code: masterCode,
        masterCode: masterCode,
        masterName: masterName,
        legacyName: legacyName,
        name: displayName,
        isMapped: isMapped,
        mappingIssue: mappingIssue,
        unit: String(row[2] || 'Hàng hóa').trim(),
        qty: qty,
        threshold: threshold,
        status: statusOf_(qty, threshold),
        actualStatus: statusOf_(qty, threshold),
        note: mappingIssue ? 'Mã chuẩn không còn tồn tại trong danh mục Kho 58' : '',
        category: category_(displayName),
        dayIn: dayIn,
        dayOut: dayOut,
        openingQty: qty - dayIn + dayOut,
        pendingIn: 0,
        pendingOut: 0,
        projectedQty: qty,
        projectedStatus: statusOf_(qty, threshold),
        referencePrice: referencePrice,
        hasReferencePrice: hasReferencePrice,
        stockValue: stockValue,
        projectedValue: stockValue,
        priceUpdatedAt: displayDateTime_(row[10]),
        priceAgeDays: priceAgeDays,
        priceIsStale: hasReferencePrice && priceAgeDays !== null && priceAgeDays > 180,
        priceDateMissing: hasReferencePrice && priceAgeDays === null,
        location145: meta ? String(meta.location145 || '') : ''
      };
    })
    .filter(function(item) { return item.legacyName; })
    .sort(function(a, b) { return a.name.localeCompare(b.name, 'vi'); });
}

function buildWarehouse145CatalogSummary_(stock) {
  const rows = stock || [];
  const mappedCount = rows.filter(function(item) { return item.isMapped; }).length;
  const invalidCount = rows.filter(function(item) { return item.mappingIssue; }).length;
  const unmappedCount = rows.filter(function(item) { return !item.masterCode; }).length;
  return {
    totalCount: rows.length,
    mappedCount: mappedCount,
    unmappedCount: unmappedCount,
    invalidCount: invalidCount,
    mappedPercent: rows.length ? mappedCount / rows.length * 100 : 0
  };
}

function syncWarehouse145MasterCatalog() {
  const masterSpreadsheet = getSpreadsheet_();
  const masterSheet = masterSpreadsheet.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  ensureInventoryValueColumns_(masterSheet);
  const masterStock = readStock_(masterSheet);
  const masterByCode = {};
  masterStock.forEach(function(item) {
    masterByCode[normalize_(item.code)] = item.name;
  });

  const warehouse145Spreadsheet = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const warehouse145Sheet = warehouse145Spreadsheet.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  if (!warehouse145Sheet) throw new Error('Không tìm thấy TONKHO của Kho 145.');

  const lastRow = warehouse145Sheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return 'Kho 145 chưa có dữ liệu.';

  const rowCount = lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1;
  const codes = warehouse145Sheet.getRange(
    WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW,
    WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN,
    rowCount,
    1
  ).getDisplayValues();

  let mappedCount = 0;
  const names = codes.map(function(row) {
    const code = String(row[0] || '').trim();
    const name = code ? String(masterByCode[normalize_(code)] || '').trim() : '';
    if (name) mappedCount += 1;
    return [name];
  });

  warehouse145Sheet.getRange(
    WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW,
    WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN,
    rowCount,
    1
  ).setValues(names);

  clearDashboardCache();
  return 'Kho 145 đã đồng bộ tên chuẩn theo Kho 58: ' + mappedCount + '/' + rowCount + ' dòng có mã chuẩn hợp lệ.';
}

function readWarehouse145Date_(sheet) {
  if (!sheet) return '';
  const title = String(sheet.getRange('A1').getDisplayValue() || '');
  const match = title.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) return '';
  return match[3] + '-' + String(match[2]).padStart(2, '0') + '-' + String(match[1]).padStart(2, '0');
}

function inferUnitFromName_(name) {
  const n = normalize_(name);
  if (!n) return 'Cái';
  if (/hop muc/.test(n)) return 'Hộp';
  if (/muc nap chai|muc nuoc|muc chuyen nhiet|nuoc ngam|muc in phun|muc in canon gi\b|muc in epson\b|muc in hp gt\b|muc in brother bt5000|muc in brother btd/.test(n)) return 'Chai';
  if (/muc goi/.test(n)) return 'Gói';
  if (/muc in .*tn-|muc in [0-9]+[a-z]*a\b|muc in cf|muc in w[0-9]|muc in q[0-9]|muc in brother lc-/.test(n)) return 'Hộp';
  if (/ruy bang|ribbon/.test(n)) return 'Cái';
  if (/day cap|day nguon/.test(n)) return 'Sợi';
  if (/hop quang/.test(n)) return 'Hộp';
  if (/ong muc photo/.test(n)) return 'Ống';
  if (/xap giay/.test(n)) return 'Xấp';
  if (/tui khi.*cap/.test(n)) return 'Cặp';
  if (/tui khi/.test(n)) return 'Túi';
  if (/cum drum|cum trong/.test(n)) return 'Cụm';
  if (/may in/.test(n)) return 'Máy';
  return 'Cái';
}

function normalizeUnitValue_(unit, name) {
  const raw = String(unit || '').trim();
  if (!raw || normalize_(raw) === 'hang hoa') return inferUnitFromName_(name);
  return raw;
}

function getItemHistoryV91(payload) {
  payload = payload || {};
  const code = String(payload.code || '').trim();
  if (!code) throw new Error('Thiếu mã hàng.');
  const result = getJournalHistory({warehouse: 'all', query: code, allDates: true, limit: 300});
  const exact = (result.rows || []).filter(function(row) {
    return normalize_(row.code) === normalize_(code);
  }).slice(0, 15);
  return {rows: exact, loadedAt: result.loadedAt};
}

function updateReferencePrice(payload) {
  payload = payload || {};
  coreRequirePermissionV109_('UPDATE_PRICE',payload.actor||payload.person||'','updateReferencePrice',String(payload.code||payload.sourceName||''));
  const warehouse = String(payload.warehouse || '58').trim();
  const price = toNumber_(payload.price);
  if (price < 0) throw new Error('Giá nhập tham khảo không được âm.');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const target = resolveReferencePriceTarget_(payload, warehouse);
    applyReferencePriceUpdate_(target, price);
    clearDashboardCache();
    return buildReferencePriceUpdateResult_(target, warehouse, price);
  } finally {
    lock.releaseLock();
  }
}

function resolveReferencePriceTarget_(payload, warehouse) {
  let spreadsheet, sheet, targetRow, priceColumn, valueColumn, updatedColumn, quantityColumnLetter, itemLabel;
  if (warehouse === '145') {
    spreadsheet = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
    sheet = spreadsheet.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    if (!sheet) throw new Error('Không tìm thấy sheet TONKHO của Kho 145.');
    targetRow = Math.floor(toNumber_(payload.sheetRow));
    if (targetRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW || targetRow > sheet.getLastRow()) {
      throw new Error('Dòng hàng Kho 145 không hợp lệ. Hãy Refresh và thử lại.');
    }
    const currentName = String(sheet.getRange(targetRow, WAREHOUSE_145_CONFIG.NAME_COLUMN).getDisplayValue() || '').trim();
    const expectedName = String(payload.sourceName || payload.name || '').trim();
    if (!currentName) throw new Error('Dòng hàng Kho 145 hiện không còn dữ liệu.');
    if (expectedName && normalize_(currentName) !== normalize_(expectedName)) {
      throw new Error('Dữ liệu Kho 145 đã thay đổi vị trí. Hãy Refresh và thử lại.');
    }
    priceColumn = WAREHOUSE_145_CONFIG.PRICE_COLUMN;
    valueColumn = WAREHOUSE_145_CONFIG.VALUE_COLUMN;
    updatedColumn = WAREHOUSE_145_CONFIG.PRICE_UPDATED_COLUMN;
    quantityColumnLetter = 'F';
    itemLabel = currentName;
  } else {
    const code = String(payload.code || '').trim();
    if (!code) throw new Error('Thiếu mã hàng cần cập nhật giá.');
    spreadsheet = getSpreadsheet_();
    sheet = spreadsheet.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
    ensureInventoryValueColumns_(sheet);
    const lastRow = sheet.getLastRow();
    if (lastRow < DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW) throw new Error('Sheet TONKHO chưa có dữ liệu hàng hóa.');
    const codes = sheet.getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW,2,lastRow-DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW+1,1).getDisplayValues();
    const targetIndex = codes.findIndex(function(row){ return normalize_(row[0]) === normalize_(code); });
    if (targetIndex === -1) throw new Error('Không tìm thấy mã hàng ' + code + ' trong sheet TONKHO.');
    targetRow = DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + targetIndex;
    priceColumn = DASHBOARD_CONFIG.PRICE_COLUMN;
    valueColumn = DASHBOARD_CONFIG.VALUE_COLUMN;
    updatedColumn = DASHBOARD_CONFIG.PRICE_UPDATED_COLUMN;
    quantityColumnLetter = 'E';
    itemLabel = code;
  }
  return {spreadsheet:spreadsheet,sheet:sheet,targetRow:targetRow,priceColumn:priceColumn,valueColumn:valueColumn,updatedColumn:updatedColumn,quantityColumnLetter:quantityColumnLetter,itemLabel:itemLabel};
}

function applyReferencePriceUpdate_(target, price) {
  const priceCell = target.sheet.getRange(target.targetRow, target.priceColumn);
  const valueCell = target.sheet.getRange(target.targetRow, target.valueColumn);
  const updatedCell = target.sheet.getRange(target.targetRow, target.updatedColumn);
  if (price > 0) {
    priceCell.setValue(price);
    updatedCell.setValue(new Date());
  } else {
    priceCell.clearContent();
    updatedCell.clearContent();
  }
  valueCell.setFormula('=IF(OR(' + target.quantityColumnLetter + target.targetRow + '=\"\";I' + target.targetRow + '=\"\");0;' + target.quantityColumnLetter + target.targetRow + '*I' + target.targetRow + ')');
  priceCell.setNumberFormat('#,##0');
  valueCell.setNumberFormat('#,##0');
  updatedCell.setNumberFormat('dd/MM/yyyy HH:mm');
}

function buildReferencePriceUpdateResult_(target, warehouse, price) {
  return {
    success:true,warehouse:warehouse,label:target.itemLabel,price:price,
    updatedAt:price>0?Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm'):''
  };
}

function systemStatus_(qty58, qty145, threshold58, threshold145, has145Mapping, manage145) {
  const q58 = toNumber_(qty58);
  const q145 = toNumber_(qty145);
  const t58 = Math.max(0, toNumber_(threshold58));
  const t145 = Math.max(0, toNumber_(threshold145));
  const managed145 = Boolean(manage145);

  if (q58 < 0 || (has145Mapping && q145 < 0)) return 'ÂM KHO';
  if (q58 === 0 && q145 === 0) return 'HẾT TOÀN HỆ THỐNG';
  if (q58 === 0 && q145 > 0) return 'HẾT KHO 58 · CÒN KHO 145';
  if (q58 <= t58) return 'SẮP HẾT KHO 58';
  if (managed145) {
    if (q145 === 0 && q58 > 0) return 'HẾT KHO 145 · CÒN KHO 58';
    if (q145 <= t145) return 'SẮP HẾT KHO 145';
  }
  return 'OK';
}

function operationalAction_(qty58, qty145, threshold58, threshold145, has145Mapping, manage145) {
  const q58 = toNumber_(qty58);
  const q145 = toNumber_(qty145);
  const t58 = Math.max(0, toNumber_(threshold58));
  const t145 = Math.max(0, toNumber_(threshold145));
  const managed145 = Boolean(manage145);

  if (q58 < 0 || (has145Mapping && q145 < 0)) {
    return {type: 'CHECK', label: 'Kiểm tra âm kho', priority: 1, transferQty: 0, purchaseQty: 0};
  }

  const target58 = t58 + 1;
  const target145 = managed145 ? t145 + 1 : 0;
  const need58 = Math.max(0, target58 - q58);
  const need145 = managed145 ? Math.max(0, target145 - q145) : 0;
  const surplus58 = Math.max(0, q58 - target58);
  const reserve145 = managed145 ? target145 : 0;
  const surplus145 = Math.max(0, q145 - reserve145);

  if (need58 > 0 && need145 > 0) {
    const totalBuy = need58 + need145;
    return {type: 'PURCHASE', label: 'Cần nhập mua ' + totalBuy + ' (Kho 58: ' + need58 + ' · Kho 145: ' + need145 + ')', priority: 1, transferQty: 0, purchaseQty: totalBuy};
  }

  if (need58 > 0) {
    const move = Math.min(need58, surplus145);
    const buy = Math.max(0, need58 - move);
    if (move > 0 && buy === 0) {
      return {type: 'TRANSFER_TO_58', label: 'Điều chuyển ' + move + ' từ Kho 145 → Kho 58', priority: q58 === 0 ? 1 : 2, transferQty: move, purchaseQty: 0};
    }
    if (move > 0 && buy > 0) {
      return {type: 'TRANSFER_BUY_58', label: 'Điều chuyển ' + move + ' về Kho 58 + mua thêm ' + buy, priority: 1, transferQty: move, purchaseQty: buy};
    }
    return {type: 'PURCHASE', label: 'Cần nhập mua ' + need58 + ' cho Kho 58', priority: q58 === 0 ? 1 : 2, transferQty: 0, purchaseQty: need58};
  }

  if (managed145 && !has145Mapping) {
    return {type: 'CHECK', label: 'Kho 145 được quản lý nhưng chưa có dòng map', priority: 2, transferQty: 0, purchaseQty: 0};
  }

  if (need145 > 0) {
    const move = Math.min(need145, surplus58);
    const buy = Math.max(0, need145 - move);
    if (move > 0 && buy === 0) {
      return {type: 'TRANSFER_TO_145', label: 'Điều chuyển ' + move + ' từ Kho 58 → Kho 145', priority: q145 === 0 ? 2 : 3, transferQty: move, purchaseQty: 0};
    }
    if (move > 0 && buy > 0) {
      return {type: 'TRANSFER_BUY_145', label: 'Điều chuyển ' + move + ' về Kho 145 + mua thêm ' + buy, priority: 2, transferQty: move, purchaseQty: buy};
    }
    return {type: 'PURCHASE', label: 'Cần nhập mua ' + need145 + ' cho Kho 145', priority: q145 === 0 ? 2 : 3, transferQty: 0, purchaseQty: need145};
  }

  return {type: 'OK', label: 'Không cần xử lý', priority: 9, transferQty: 0, purchaseQty: 0};
}

function buildCombinedStock_(stock58, stock145, metaByCode, warehouse145Error) {
  const buckets = buildWarehouse145Buckets_(stock145, warehouse145Error);
  return (stock58 || []).map(function(item) {
    return buildCombinedStockItem_(item, buckets, metaByCode, warehouse145Error);
  });
}

function buildWarehouse145Buckets_(stock145, warehouse145Error) {
  const buckets = {};
  if (warehouse145Error) return buckets;
  (stock145 || []).forEach(function(row) {
    if (!row.isMapped || !row.masterCode) return;
    const key = normalize_(row.masterCode);
    if (!buckets[key]) buckets[key] = {rows:[],qty:0,value:0,openingQty:0,dayIn:0,dayOut:0,projectedQty:0};
    const bucket = buckets[key];
    bucket.rows.push(row);
    bucket.qty += toNumber_(row.qty);
    bucket.value += toNumber_(row.stockValue);
    bucket.openingQty += toNumber_(row.openingQty);
    bucket.dayIn += toNumber_(row.dayIn);
    bucket.dayOut += toNumber_(row.dayOut);
    bucket.projectedQty += toNumber_(row.projectedQty);
  });
  return buckets;
}

function buildCombinedStockItem_(item, buckets, metaByCode, warehouse145Error) {
  const key = normalize_(item.code);
  const meta = metaByCode && metaByCode[key] ? metaByCode[key] : {};
  const bucket = buckets[key] || {rows:[],qty:0,value:0,openingQty:0,dayIn:0,dayOut:0,projectedQty:0};
  const has145Mapping = bucket.rows.length > 0;
  const qty58 = toNumber_(item.qty);
  const qty145 = warehouse145Error ? null : toNumber_(bucket.qty);
  const totalQty = warehouse145Error ? qty58 : qty58 + qty145;
  const threshold58 = meta.threshold58Override === null || meta.threshold58Override === undefined ? Math.max(0,toNumber_(item.threshold)) : Math.max(0,toNumber_(meta.threshold58Override));
  const threshold145 = meta.threshold145 === null || meta.threshold145 === undefined ? WAREHOUSE_145_CONFIG.DEFAULT_THRESHOLD : Math.max(0,toNumber_(meta.threshold145));
  const manage145 = meta.manage145 === true;
  const status58 = statusOf_(qty58, threshold58);
  const status145 = warehouse145Error ? 'LỖI DỮ LIỆU' : (!manage145 ? 'KHÔNG YÊU CẦU DỰ TRỮ' : (has145Mapping ? statusOf_(qty145,threshold145) : statusOf_(0,threshold145)));
  const systemStatus = warehouse145Error ? status58 : systemStatus_(qty58,qty145,threshold58,threshold145,has145Mapping,manage145);
  const action = warehouse145Error ? {type:'CHECK',label:'Không đọc được Kho 145',priority:1,transferQty:0,purchaseQty:0} : operationalAction_(qty58,qty145,threshold58,threshold145,has145Mapping,manage145);
  const legacyNames = uniqueLegacyNames145_(bucket.rows);
  const aliases = [String(meta.aliases||'').trim()].concat(legacyNames).filter(Boolean).join(' | ');
  const priceComplete58 = qty58 <= 0 || Boolean(item.hasReferencePrice);
  const priceComplete145 = !has145Mapping || bucket.rows.every(function(row){return toNumber_(row.qty)<=0 || Boolean(row.hasReferencePrice);});
  const priceComplete = priceComplete58 && priceComplete145;
  const priceReview = Boolean(item.priceIsStale || item.priceDateMissing) || bucket.rows.some(function(row){return row.priceIsStale || row.priceDateMissing;});
  const presence = warehouse145Error ? (qty58>0?'only58':'none') : (qty58>0&&qty145>0?'both':qty58>0?'only58':qty145>0?'only145':'none');
  return {
    code:item.code,name:item.name,category:item.category,unit:item.unit,qty58:qty58,qty145:qty145,totalQty:totalQty,
    threshold58:threshold58,threshold145:threshold145,manage145:manage145,
    threshold58Override:meta.threshold58Override===null||meta.threshold58Override===undefined?null:meta.threshold58Override,
    status58:status58,status145:status145,systemStatus:systemStatus,actionType:action.type,actionLabel:action.label,actionPriority:action.priority,
    transferQty:toNumber_(action.transferQty),purchaseQty:toNumber_(action.purchaseQty),referencePrice:item.referencePrice,hasReferencePrice:item.hasReferencePrice,
    stockValue58:toNumber_(item.stockValue),stockValue145:warehouse145Error?0:toNumber_(bucket.value),totalStockValue:toNumber_(item.stockValue)+(warehouse145Error?0:toNumber_(bucket.value)),
    openingQty58:toNumber_(item.openingQty),openingQty145:warehouse145Error?null:toNumber_(bucket.openingQty),dayIn58:toNumber_(item.dayIn),dayOut58:toNumber_(item.dayOut),
    dayIn145:warehouse145Error?null:toNumber_(bucket.dayIn),dayOut145:warehouse145Error?null:toNumber_(bucket.dayOut),projectedQty58:toNumber_(item.projectedQty),projectedQty145:warehouse145Error?null:toNumber_(bucket.projectedQty),
    aliases:aliases,location58:String(meta.location58||''),location145:String(meta.location145||''),note:String(meta.note||''),has145Mapping:has145Mapping,mappingCount145:bucket.rows.length,
    mappingDuplicate:bucket.rows.length>1,legacyNames145:legacyNames,warehousePresence:presence,priceComplete:priceComplete,priceReview:priceReview,priceMissing:!priceComplete,
    searchText:normalize_([item.code,item.name,item.category,item.unit,aliases,meta.location58,meta.location145].join(' '))
  };
}

function uniqueLegacyNames145_(rows) {
  const values = [];
  (rows || []).forEach(function(row){const value=String(row.legacyName||'').trim();if(value&&values.indexOf(value)===-1)values.push(value);});
  return values;
}

function buildCatalogAudit_(stock145) {
  const rows = stock145 || [];
  const unmapped = rows.filter(function(row) { return !row.masterCode; }).map(function(row) {
    return {type: 'UNMAPPED', sheetRow: row.sheetRow, legacyName: row.legacyName, qty: row.qty};
  });
  const invalid = rows.filter(function(row) { return row.mappingIssue; }).map(function(row) {
    return {type: 'INVALID_CODE', sheetRow: row.sheetRow, masterCode: row.masterCode, legacyName: row.legacyName, qty: row.qty};
  });

  const byCode = {};
  rows.filter(function(row) { return row.isMapped && row.masterCode; }).forEach(function(row) {
    const key = normalize_(row.masterCode);
    if (!byCode[key]) byCode[key] = [];
    byCode[key].push(row);
  });

  const duplicates = Object.keys(byCode).filter(function(key) {
    return byCode[key].length > 1;
  }).map(function(key) {
    const group = byCode[key];
    return {
      type: 'DUPLICATE_MAPPING',
      masterCode: group[0].masterCode,
      masterName: group[0].name,
      rowCount: group.length,
      legacyNames: group.map(function(row) { return row.legacyName; }),
      totalQty: group.reduce(function(sum, row) { return sum + toNumber_(row.qty); }, 0)
    };
  });

  return {
    unmapped: unmapped,
    invalid: invalid,
    duplicates: duplicates,
    unmappedCount: unmapped.length,
    invalidCount: invalid.length,
    duplicateCount: duplicates.length,
    issueCount: unmapped.length + invalid.length + duplicates.length
  };
}

function buildActionCenter_(combinedStock, stock145, catalogAudit, unmatched, pending) {
  const rows = [];

  (combinedStock || []).forEach(function(item) {
    if (item.actionType !== 'OK') {
      rows.push({
        priority: item.actionPriority,
        type: item.actionType,
        code: item.code,
        name: item.name,
        qty58: item.qty58,
        qty145: item.qty145,
        totalQty: item.totalQty,
        label: item.actionLabel,
        detail: item.systemStatus
      });
    }
    if (item.priceMissing && toNumber_(item.totalQty) > 0) {
      rows.push({
        priority: 3, type: 'MISSING_PRICE', code: item.code, name: item.name,
        qty58: item.qty58, qty145: item.qty145, totalQty: item.totalQty,
        label: 'Thiếu giá tham khảo', detail: 'Có tồn nhưng chưa đủ giá để định giá cả 2 kho'
      });
    } else if (item.priceReview && toNumber_(item.totalQty) > 0) {
      rows.push({
        priority: 4, type: 'PRICE_REVIEW', code: item.code, name: item.name,
        qty58: item.qty58, qty145: item.qty145, totalQty: item.totalQty,
        label: 'Rà soát giá tham khảo', detail: 'Giá cũ hoặc thiếu ngày cập nhật'
      });
    }
  });

  (catalogAudit.unmapped || []).forEach(function(item) {
    rows.push({
      priority: toNumber_(item.qty) > 0 ? 2 : 4, type: 'MAPPING', code: '', name: item.legacyName,
      qty58: null, qty145: item.qty, totalQty: item.qty,
      label: 'Kho 145 chưa map mã chuẩn', detail: 'Dòng ' + item.sheetRow + ' · cần đối chiếu danh mục Kho 58'
    });
  });
  (catalogAudit.invalid || []).forEach(function(item) {
    rows.push({
      priority: 1, type: 'MAPPING_INVALID', code: item.masterCode, name: item.legacyName,
      qty58: null, qty145: item.qty, totalQty: item.qty,
      label: 'Mã chuẩn Kho 145 không hợp lệ', detail: 'Mã không còn tồn tại trong danh mục Kho 58'
    });
  });
  (catalogAudit.duplicates || []).forEach(function(item) {
    rows.push({
      priority: 4, type: 'MAPPING_DUPLICATE', code: item.masterCode, name: item.masterName,
      qty58: null, qty145: item.totalQty, totalQty: item.totalQty,
      label: 'Nhiều dòng Kho 145 cùng map một mã',
      detail: item.rowCount + ' dòng · kiểm tra nếu đây là các biến thể khác nhau'
    });
  });
  (unmatched || []).forEach(function(item) {
    rows.push({
      priority: 1, type: 'PENDING_UNMATCHED', code: item.code, name: item.name,
      qty58: null, qty145: null, totalQty: null,
      label: 'Phát sinh tạm không khớp mã', detail: item.voucher || ''
    });
  });

  rows.sort(function(a, b) {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return String(a.name || '').localeCompare(String(b.name || ''), 'vi');
  });

  const counts = {};
  rows.forEach(function(row) { counts[row.type] = (counts[row.type] || 0) + 1; });
  return {rows: rows, counts: counts, totalCount: rows.length};
}

function buildSystemValueSummary_(summary58, summary145, warehouse145Error) {
  const s58 = summary58 || buildValueSummary_([]);
  const s145 = warehouse145Error ? buildValueSummary_([]) : (summary145 || buildValueSummary_([]));
  const active = toNumber_(s58.activeStockItemCount) + toNumber_(s145.activeStockItemCount);
  const pricedActive = toNumber_(s58.pricedActiveStockCount) + toNumber_(s145.pricedActiveStockCount);
  const missingActive = toNumber_(s58.missingPriceWithStockCount) + toNumber_(s145.missingPriceWithStockCount);

  return {
    totalValue: toNumber_(s58.totalValue) + toNumber_(s145.totalValue),
    projectedValue: toNumber_(s58.projectedValue) + toNumber_(s145.projectedValue),
    openingValue: toNumber_(s58.openingValue) + toNumber_(s145.openingValue),
    dayInValue: toNumber_(s58.dayInValue) + toNumber_(s145.dayInValue),
    dayOutValue: toNumber_(s58.dayOutValue) + toNumber_(s145.dayOutValue),
    netChangeValue: toNumber_(s58.netChangeValue) + toNumber_(s145.netChangeValue),
    reconciliationExpected: toNumber_(s58.reconciliationExpected) + toNumber_(s145.reconciliationExpected),
    reconciliationDifference: toNumber_(s58.reconciliationDifference) + toNumber_(s145.reconciliationDifference),
    activeStockItemCount: active,
    pricedActiveStockCount: pricedActive,
    missingPriceWithStockCount: missingActive,
    valuationCoveragePercent: active ? pricedActive / active * 100 : 100,
    priceReviewCount: toNumber_(s58.priceReviewCount) + toNumber_(s145.priceReviewCount),
    warehouse145Error: Boolean(warehouse145Error)
  };
}

function getItemDetail(payload) {
  payload = payload || {};
  const code = String(payload.code || '').trim();
  if (!code) throw new Error('Thiếu mã hàng.');

  const data = getDashboardFastData(false);
  const item = (data.combinedStock || []).find(function(row) {
    return normalize_(row.code) === normalize_(code);
  });
  if (!item) throw new Error('Không tìm thấy mã ' + code + '.');

  let history = [];
  try {
    const historyResult = getJournalHistory({warehouse: 'all', query: code, allDates: true, limit: 200});
    history = (historyResult.rows || []).filter(function(row) {
      return normalize_(row.code) === normalize_(code);
    }).slice(0, 15);
  } catch (error) {
    console.warn('Không đọc được lịch sử chi tiết mã ' + code, error);
  }

  const rows145 = ((data.warehouse145 || {}).stock || []).filter(function(row) {
    return row.isMapped && normalize_(row.masterCode) === normalize_(code);
  });

  return {
    item: item,
    history: history,
    warehouse145Rows: rows145,
    meta: {
      code: item.code, name: item.name, aliases: item.aliases || '',
      location58: item.location58 || '', location145: item.location145 || '',
      threshold145: item.threshold145, note: item.note || ''
    }
  };
}

function getJournalHistory(payload) {
  payload = payload || {};

  const requestedWarehouse = String(payload.warehouse || '58').trim().toLowerCase();
  const warehouse = ['58', '145', 'all'].indexOf(requestedWarehouse) >= 0
    ? requestedWarehouse
    : '58';
  const query = normalize_(payload.query || '');
  const selectedType = String(payload.type || '').trim().toUpperCase();
  let fromDate = payload.fromDate ? dateKey_(payload.fromDate) : '';
  let toDate = payload.toDate ? dateKey_(payload.toDate) : '';
  const allowAllDates = Boolean(payload.allDates);

  if (payload.fromDate && !fromDate) throw new Error('Từ ngày không hợp lệ.');
  if (payload.toDate && !toDate) throw new Error('Đến ngày không hợp lệ.');

  if (!allowAllDates && !fromDate && !toDate) {
    fromDate = dateKey_(new Date());
    toDate = fromDate;
  }

  if (fromDate && toDate && fromDate > toDate) {
    throw new Error('Từ ngày phải nhỏ hơn hoặc bằng Đến ngày.');
  }

  let rows = [];
  const sources = [];

  if (warehouse === '58' || warehouse === 'all') {
    const ss58 = getSpreadsheet_();
    rows = rows
      .concat(readJournalBackup58_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET), DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET, fromDate, toDate))
      .concat(readJournalBackup58_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET), DASHBOARD_CONFIG.JOURNAL_SHEET, fromDate, toDate));
    sources.push('Kho 58: Backup + sổ hiện tại');
  }

  if (warehouse === '145' || warehouse === 'all') {
    const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
    const stock145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    // Để dựng ngược Tồn trước/Tồn sau cho nhật ký legacy, cần đọc từ ngày bắt đầu
    // tới hiện tại (không chỉ tới toDate), vì tồn live là số dư SAU tất cả giao dịch mới hơn.
    let rows145 = [];
    rows145 = rows145
      .concat(readJournalBackup145_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET), stock145, WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET, fromDate, ''))
      .concat(readJournalBackup145_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET), stock145, WAREHOUSE_145_CONFIG.JOURNAL_SHEET, fromDate, ''));
    rows145 = dedupeJournalHistory_(rows145);
    rows145 = reconstructWarehouse145Balances_(rows145, stock145);
    rows = rows.concat(rows145);
    sources.push('Kho 145: Backup + sổ hiện tại');
  }

  rows = dedupeJournalHistory_(rows);

  rows = rows.filter(function(row) {
    if (fromDate && row.dateKey && row.dateKey < fromDate) return false;
    if (toDate && row.dateKey && row.dateKey > toDate) return false;
    if (selectedType && String(row.type || '').toUpperCase() !== selectedType) return false;
    if (query) {
      const haystack = normalize_([
        row.date, row.voucher, row.warehouseLabel, row.code, row.name,
        row.sourceName, row.person, row.reason, row.note
      ].join(' '));
      if (haystack.indexOf(query) === -1) return false;
    }
    return true;
  });

  rows.sort(function(a, b) {
    if (a.dateKey !== b.dateKey) return a.dateKey < b.dateKey ? 1 : -1;
    if (a.warehouse !== b.warehouse) return String(a.warehouse).localeCompare(String(b.warehouse));
    return toNumber_(b.sheetRow) - toNumber_(a.sheetRow);
  });

  const totalMatches = rows.length;
  const limit = Math.max(1, Math.min(5000, toNumber_(payload.limit) || 5000));
  const outputRows = rows.slice(0, limit);

  return {
    rows: outputRows,
    totalMatches: totalMatches,
    returnedCount: outputRows.length,
    truncated: totalMatches > limit,
    warehouse: warehouse,
    sourceLabel: sources.join(' · '),
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')
  };
}

function dedupeJournalHistory_(rows) {
  const seen = {};
  const output = [];
  rows.forEach(function(row) {
    const key = [
      row.warehouse, row.dateKey, normalize_(row.voucher), normalize_(row.type),
      normalize_(row.code || row.sourceName || row.name),
      toNumber_(row.input), toNumber_(row.output), normalize_(row.person)
    ].join('|');
    if (seen[key]) return;
    seen[key] = true;
    output.push(row);
  });
  return output;
}

function getDateFilteredSheetRows_(sheet, startRow, columnCount, fromDate, toDate) {
  if (!sheet) return [];
  const lastRow = sheet.getLastRow();
  if (lastRow < startRow) return [];

  const rowCount = lastRow - startRow + 1;
  if (!fromDate && !toDate) {
    return sheet.getRange(startRow, 1, rowCount, columnCount).getValues()
      .map(function(values, index) {
        return {sheetRow: startRow + index, values: values};
      });
  }

  const dateValues = sheet.getRange(startRow, 1, rowCount, 1).getValues();
  const matchedRows = [];
  dateValues.forEach(function(row, index) {
    const key = dateKey_(row[0]);
    if (!key) return;
    if (fromDate && key < fromDate) return;
    if (toDate && key > toDate) return;
    matchedRows.push(startRow + index);
  });

  if (!matchedRows.length) return [];

  const groups = [];
  let groupStart = matchedRows[0];
  let previous = matchedRows[0];

  for (let i = 1; i < matchedRows.length; i += 1) {
    const current = matchedRows[i];
    if (current === previous + 1) {
      previous = current;
      continue;
    }
    groups.push({start: groupStart, end: previous});
    groupStart = current;
    previous = current;
  }
  groups.push({start: groupStart, end: previous});

  const output = [];
  groups.forEach(function(group) {
    const count = group.end - group.start + 1;
    const values = sheet.getRange(group.start, 1, count, columnCount).getValues();
    values.forEach(function(row, index) {
      output.push({sheetRow: group.start + index, values: row});
    });
  });
  return output;
}

function readJournalBackup58_(sheet, sourceName, fromDate, toDate) {
  if (!sheet) return [];
  return getDateFilteredSheetRows_(sheet, 5, 13, fromDate, toDate)
    .map(function(entry) {
      const row = entry.values;
      const dateKey = dateKey_(row[0]);
      return {
        warehouse: '58',
        warehouseLabel: 'Kho 58 Mã Lò',
        source: sourceName || DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET,
        sheetRow: entry.sheetRow,
        date: dateKey ? displayDate_(dateKey) : String(row[0] || '').trim(),
        dateKey: dateKey,
        voucher: String(row[1] || '').trim(),
        type: String(row[2] || '').trim(),
        code: String(row[3] || '').trim(),
        name: String(row[4] || '').trim(),
        sourceName: String(row[4] || '').trim(),
        unit: String(row[5] || '').trim(),
        input: toNumber_(row[6]),
        output: toNumber_(row[7]),
        before: row[8] === '' || row[8] == null ? null : toNumber_(row[8]),
        after: row[9] === '' || row[9] == null ? null : toNumber_(row[9]),
        person: String(row[10] || '').trim(),
        reason: String(row[11] || '').trim(),
        note: String(row[12] || '').trim()
      };
    })
    .filter(function(row) { return row.dateKey && row.name; });
}

function buildWarehouse145BackupNameMap_(stockSheet) {
  const map = {};
  if (!stockSheet) return map;

  const lastRow = stockSheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return map;

  const values = stockSheet.getRange(
    WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW,
    WAREHOUSE_145_CONFIG.NAME_COLUMN,
    lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1,
    WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN - WAREHOUSE_145_CONFIG.NAME_COLUMN + 1
  ).getDisplayValues();

  values.forEach(function(row) {
    const sourceName = String(row[0] || '').trim();
    if (!sourceName) return;
    const masterCode = String(row[WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN - WAREHOUSE_145_CONFIG.NAME_COLUMN] || '').trim();
    const masterName = String(row[WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN - WAREHOUSE_145_CONFIG.NAME_COLUMN] || '').trim();
    map[normalize_(sourceName)] = {code: masterCode, name: masterName || sourceName};
  });
  return map;
}

function parseWarehouse145StockTransition_(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  const match = raw.match(/(?:Tồn|Ton)\s*(-?\d+(?:[.,]\d+)?)\s*(?:→|->|=>)\s*(-?\d+(?:[.,]\d+)?)/i);
  if (!match) return null;
  const before = toNumber_(String(match[1]).replace(',', '.'));
  const after = toNumber_(String(match[2]).replace(',', '.'));
  if (!isFinite(before) || !isFinite(after)) return null;
  return {before: before, after: after};
}

function buildWarehouse145CurrentBalanceLookup_(stockSheet) {
  const result = {byName: {}, byCode: {}, ambiguousNames: {}, ambiguousCodes: {}};
  if (!stockSheet) return result;
  const lastRow = stockSheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return result;

  const rowCount = lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1;
  const values = stockSheet.getRange(
    WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW,
    1,
    rowCount,
    WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN
  ).getValues();

  values.forEach(function(row) {
    const legacyName = normalize_(row[WAREHOUSE_145_CONFIG.NAME_COLUMN - 1] || '');
    const masterCode = normalize_(row[WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN - 1] || '');
    const qty = toNumber_(row[WAREHOUSE_145_CONFIG.QTY_COLUMN - 1]);

    if (legacyName) {
      if (Object.prototype.hasOwnProperty.call(result.byName, legacyName)) {
        result.ambiguousNames[legacyName] = true;
      } else {
        result.byName[legacyName] = qty;
      }
    }
    if (masterCode) {
      if (Object.prototype.hasOwnProperty.call(result.byCode, masterCode)) {
        result.ambiguousCodes[masterCode] = true;
      } else {
        result.byCode[masterCode] = qty;
      }
    }
  });

  Object.keys(result.ambiguousNames).forEach(function(key) { delete result.byName[key]; });
  Object.keys(result.ambiguousCodes).forEach(function(key) { delete result.byCode[key]; });
  return result;
}

function warehouse145BalanceIdentity_(row, lookup) {
  const nameKey = normalize_(row && (row.sourceName || row.name) || '');
  if (nameKey && Object.prototype.hasOwnProperty.call(lookup.byName, nameKey)) {
    return {key: 'N|' + nameKey, qty: lookup.byName[nameKey]};
  }
  const codeKey = normalize_(row && row.code || '');
  if (codeKey && Object.prototype.hasOwnProperty.call(lookup.byCode, codeKey)) {
    return {key: 'C|' + codeKey, qty: lookup.byCode[codeKey]};
  }
  return null;
}

function reconstructWarehouse145Balances_(rows, stockSheet) {
  rows = Array.isArray(rows) ? rows : [];
  if (!rows.length || !stockSheet) return rows;

  const lookup = buildWarehouse145CurrentBalanceLookup_(stockSheet);
  const running = {};
  const ordered = rows.slice().sort(function(a, b) {
    if (a.dateKey !== b.dateKey) return a.dateKey < b.dateKey ? 1 : -1;
    const aCurrent = String(a.source || '') === WAREHOUSE_145_CONFIG.JOURNAL_SHEET ? 1 : 0;
    const bCurrent = String(b.source || '') === WAREHOUSE_145_CONFIG.JOURNAL_SHEET ? 1 : 0;
    if (aCurrent !== bCurrent) return bCurrent - aCurrent;
    return toNumber_(b.sheetRow) - toNumber_(a.sheetRow);
  });

  ordered.forEach(function(row) {
    const identity = warehouse145BalanceIdentity_(row, lookup);
    if (!identity) return;
    if (!Object.prototype.hasOwnProperty.call(running, identity.key)) running[identity.key] = identity.qty;

    if (row.before !== null && row.before !== undefined && row.after !== null && row.after !== undefined) {
      running[identity.key] = toNumber_(row.before);
      row.balanceSource = row.balanceSource || 'RECORDED';
      return;
    }

    const input = toNumber_(row.input);
    const output = toNumber_(row.output);
    if (!input && !output) return;

    const after = toNumber_(running[identity.key]);
    const before = after - input + output;
    // Nếu chuỗi lịch sử không khớp và suy ngược tạo tồn âm thì không bịa số.
    if (!isFinite(before) || !isFinite(after) || before < 0 || after < 0) return;

    row.before = before;
    row.after = after;
    row.balanceSource = 'RECONSTRUCTED';
    running[identity.key] = before;
  });

  return rows;
}

function readJournalBackup145_(sheet, stockSheet, sourceName, fromDate, toDate) {
  if (!sheet) return [];
  const nameMap = buildWarehouse145BackupNameMap_(stockSheet);

  return getDateFilteredSheetRows_(sheet, 2, 14, fromDate, toDate)
    .map(function(entry) {
      const row = entry.values;
      const dateKey = dateKey_(row[0]);
      const type = String(row[2] || '').trim().toUpperCase();
      const quantity = toNumber_(row[6]);
      const legacyName = String(row[4] || '').trim();
      const mapped = nameMap[normalize_(legacyName)] || {code: '', name: legacyName};
      const voucherRaw = String(row[1] || '').trim();
      const voucher = /^\d+$/.test(voucherRaw) ? 'P' + voucherRaw : voucherRaw;
      const reason = String(row[7] || '').trim();
      let input = type === 'NHẬP KHO' ? quantity : 0;
      let output = type === 'XUẤT KHO' ? quantity : 0;
      let before = null, after = null;

      // V10.10.5.1: đọc "Tồn X → Y" cho MỌI loại giao dịch Kho 145,
      // không chỉ KIỂM KHO. Các transaction mới đã lưu dấu vết này trong lý do.
      const transitionText = [reason, row[9], row[10], row[12]].filter(function(value) {
        return String(value || '').trim();
      }).join(' | ');
      const transition = parseWarehouse145StockTransition_(transitionText);
      if (transition) {
        before = transition.before;
        after = transition.after;
        // KIỂM KHO lấy delta từ tồn trước/sau. NHẬP/XUẤT vẫn giữ SL gốc ở cột số lượng.
        if (type === 'KIỂM KHO' || type === 'KIEM KHO') {
          input = after > before ? after - before : 0;
          output = before > after ? before - after : 0;
        } else if (type === 'NHẬP KHO' && !input) {
          input = Math.max(0, after - before);
        } else if (type === 'XUẤT KHO' && !output) {
          output = Math.max(0, before - after);
        }
      }

      return {
        warehouse: '145',
        warehouseLabel: 'Kho 145',
        source: sourceName || WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET,
        sheetRow: entry.sheetRow,
        date: dateKey ? displayDate_(dateKey) : String(row[0] || '').trim(),
        dateKey: dateKey,
        voucher: voucher,
        type: type,
        code: mapped.code || '',
        name: mapped.name || legacyName,
        sourceName: legacyName,
        unit: normalizeUnitValue_(row[5], mapped.name || legacyName),
        input: input,
        output: output,
        before: before,
        after: after,
        person: String(row[3] || '').trim(),
        reason: reason,
        note: [row[9], row[10], row[12]].filter(function(value) {
          return String(value || '').trim();
        }).join(' · ')
      };
    })
    .filter(function(row) {
      const isAdjust = row.type === 'KIỂM KHO' || row.type === 'KIEM KHO';
      return row.dateKey && row.sourceName && (row.input || row.output || isAdjust);
    });
}

function readJournal_(sheet) {
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow < 5) return [];

  const values = sheet.getRange(5, 1, lastRow - 4, 13).getValues();

  return values
    .map(function(row) {
      const dateKey = dateKey_(row[0]);

      return {
        date: dateKey ? displayDate_(dateKey) : String(row[0] || '').trim(),
        dateKey: dateKey,
        voucher: String(row[1] || '').trim(),
        type: String(row[2] || '').trim(),
        code: String(row[3] || '').trim(),
        name: String(row[4] || '').trim(),
        unit: String(row[5] || '').trim(),
        input: toNumber_(row[6]),
        output: toNumber_(row[7]),
        before: toNumber_(row[8]),
        after: toNumber_(row[9]),
        person: String(row[10] || '').trim(),
        reason: String(row[11] || '').trim(),
        note: String(row[12] || '').trim()
      };
    })
    .filter(function(row) {
      return row.name && row.dateKey;
    });
}

function readPending_(sheet) {
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

  return values
    .map(function(row) {
      const dateKey = dateKey_(row[0]);

      return {
        date: dateKey ? displayDate_(dateKey) : String(row[0] || '').trim(),
        dateKey: dateKey,
        voucher: String(row[1] || '').trim(),
        type: String(row[2] || '').trim(),
        code: String(row[3] || '').trim(),
        name: String(row[4] || '').trim(),
        input: toNumber_(row[5]),
        output: toNumber_(row[6]),
        person: String(row[7] || '').trim(),
        reason: String(row[8] || '').trim(),
        note: String(row[9] || '').trim()
      };
    })
    .filter(function(row) {
      return row.name && (row.input || row.output);
    });
}

function readSummaryDate_(sheet) {
  if (!sheet) return '';
  return dateKey_(sheet.getRange('B2').getValue());
}

function resolveReportDate_(summaryDate, journal) {
  if (summaryDate) return summaryDate;

  const dateKeys = journal
    .map(function(row) { return row.dateKey; })
    .filter(Boolean)
    .sort();

  return dateKeys.length ? dateKeys[dateKeys.length - 1] : dateKey_(new Date());
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.



// ===== END 20_Inventory_Data.gs =====


// ===== BEGIN 21_Dashboard_Read.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 21_Dashboard_Read.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function getDashboardData(forceRefresh) {
  const cache = CacheService.getScriptCache();

  if (!forceRefresh) {
    const cached = cache.get(DASHBOARD_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  }

  const ctx = createRequestContext_();
  const spreadsheet = repoPrimarySpreadsheet_(ctx);
  // V10.10.3: Dashboard READ dùng repository để tránh hydrate trùng dữ liệu trong cùng request.
  const stock = repoStock58_(ctx, Boolean(forceRefresh));
  const meta = repoMasterMeta_(ctx, Boolean(forceRefresh));
  const journal = repoJournal_(ctx);
  const pending = repoPending_(ctx);
  const summaryDate = repoSummaryDate_(ctx);

  const reportDateKey = resolveReportDate_(summaryDate, journal);
  const derived = deriveDashboardState_(stock, journal, pending, reportDateKey);

  let warehouse145Result = {
    name: 'Kho 145',
    stock: [],
    valueSummary: buildValueSummary_([]),
    catalogSummary: buildWarehouse145CatalogSummary_([]),
    reportDate: '',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/' + WAREHOUSE_145_CONFIG.SPREADSHEET_ID + '/edit',
    error: ''
  };

  try {
    const warehouse145Spreadsheet = repoWarehouse145Spreadsheet_(ctx);
    const warehouse145Sheet = warehouse145Spreadsheet.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    const warehouse145Stock = readWarehouse145Stock_(warehouse145Sheet, stock, meta.byCode);
    const warehouse145DateKey = readWarehouse145Date_(warehouse145Sheet);
    warehouse145Result = {
      name: 'Kho 145',
      stock: warehouse145Stock,
      valueSummary: buildValueSummary_(warehouse145Stock),
      catalogSummary: buildWarehouse145CatalogSummary_(warehouse145Stock),
      reportDate: warehouse145DateKey ? displayDate_(warehouse145DateKey) : '',
      spreadsheetUrl: warehouse145Spreadsheet.getUrl(),
      error: ''
    };
  } catch (error) {
    warehouse145Result.error = String(error && error.message ? error.message : error);
    console.warn('Không đọc được Kho 145:', error);
  }

  const combinedStock = buildCombinedStock_(derived.stock, warehouse145Result.stock, meta.byCode, Boolean(warehouse145Result.error));
  const systemValueSummary = buildSystemValueSummary_(derived.valueSummary, warehouse145Result.valueSummary, Boolean(warehouse145Result.error));
  const catalogAudit = buildCatalogAudit_(warehouse145Result.stock);
  const actionCenter = buildActionCenter_(combinedStock, warehouse145Result.stock, catalogAudit, derived.unmatched, derived.pending);

  const result = {
    appVersion: APP_VERSION,
    stock: derived.stock,
    combinedStock: combinedStock,
    pending: derived.pending,
    systemValueSummary: systemValueSummary,
    actionCenter: actionCenter,
    catalogAudit: catalogAudit,
    pendingSource: pending.length ? DASHBOARD_CONFIG.PENDING_SHEET : 'Không có phát sinh tạm',
    reportDate: displayDate_(reportDateKey),
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    spreadsheetUrl: spreadsheet.getUrl(),
    masterMetaSheet: DASHBOARD_CONFIG.MASTER_META_SHEET,
    warehouse145: warehouse145Result,
    diagnostics: {repository: ctx.diagnostics}
  };

  const serialized = JSON.stringify(result);
  try {
    cache.put(DASHBOARD_CACHE_KEY, serialized, DASHBOARD_CONFIG.CACHE_SECONDS);
  } catch (error) {
    console.warn('Không thể lưu cache dashboard:', error);
  }

  // Luôn trả về object đã JSON hóa để loại Date/undefined không tương thích google.script.run.
  return JSON.parse(serialized);
}

function getDashboardFastData(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cached = cache.get(DASHBOARD_FAST_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  }

  const startedAt = Date.now();
  const ctx = createRequestContext_();
  const spreadsheet = repoPrimarySpreadsheet_(ctx);
  const stock = repoStock58_(ctx, Boolean(forceRefresh));
  stock.forEach(function(item) {
    item.dayIn = 0;
    item.dayOut = 0;
    item.openingQty = item.qty;
    item.actualStatus = statusOf_(item.qty, item.threshold);
    item.pendingIn = 0;
    item.pendingOut = 0;
    item.projectedQty = item.qty;
    item.projectedStatus = item.actualStatus;
    item.projectedValue = item.stockValue;
  });

  const meta = repoMasterMeta_(ctx, Boolean(forceRefresh));

  let warehouse145Result = {
    name: 'Kho 145', stock: [], valueSummary: buildValueSummary_([]),
    catalogSummary: buildWarehouse145CatalogSummary_([]), reportDate: '',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/' + WAREHOUSE_145_CONFIG.SPREADSHEET_ID + '/edit',
    error: ''
  };

  try {
    const ss145 = repoWarehouse145Spreadsheet_(ctx);
    const sheet145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    const stock145 = readWarehouse145Stock_(sheet145, stock, meta.byCode);
    const date145 = readWarehouse145Date_(sheet145);
    warehouse145Result = {
      name: 'Kho 145', stock: stock145, valueSummary: buildValueSummary_(stock145),
      catalogSummary: buildWarehouse145CatalogSummary_(stock145),
      reportDate: date145 ? displayDate_(date145) : '', spreadsheetUrl: ss145.getUrl(), error: ''
    };
  } catch (error) {
    warehouse145Result.error = String(error && error.message ? error.message : error);
  }

  const combinedStock = buildCombinedStock_(stock, warehouse145Result.stock, meta.byCode, Boolean(warehouse145Result.error));
  const catalogAudit = buildCatalogAudit_(warehouse145Result.stock);
  const actionCenter = buildActionCenter_(combinedStock, warehouse145Result.stock, catalogAudit, [], []);
  const systemValueSummary = buildSystemValueSummary_(
    buildValueSummary_(stock), warehouse145Result.valueSummary, Boolean(warehouse145Result.error)
  );

  const result = {
    appVersion: APP_VERSION,
    loadMode: 'FAST',
    stock: stock,
    combinedStock: combinedStock,
    systemValueSummary: systemValueSummary,
    actionCenter: actionCenter,
    catalogAudit: catalogAudit,
    reportDate: displayDate_(dateKey_(new Date())),
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss'),
    spreadsheetUrl: spreadsheet.getUrl(),
    masterMetaSheet: DASHBOARD_CONFIG.MASTER_META_SHEET,
    warehouse145: warehouse145Result,
    diagnostics: {serverMs: Date.now() - startedAt, repository: ctx.diagnostics}
  };

  const serialized = JSON.stringify(result);
  try { cache.put(DASHBOARD_FAST_CACHE_KEY, serialized, DASHBOARD_CONFIG.CACHE_SECONDS); } catch (error) {}
  return JSON.parse(serialized);
}

function clearDashboardCache() {
  const cache = CacheService.getScriptCache();
  cache.remove(DASHBOARD_CACHE_KEY);
  cache.remove(DASHBOARD_FAST_CACHE_KEY);
  cache.remove(MODULE_CACHE_58);
  cache.remove(MODULE_CACHE_145);
  cache.remove(MODULE_CACHE_META);
  cache.remove(MODULE_CACHE_OPS58);
  cache.remove(PROACTIVE_V108_CONFIG.CACHE_KEY);
  repoInvalidateReadCaches_();
  return true;
}

function deriveDashboardState_(stock, journal, pending, reportDateKey) {
  const stockByCode = new Map();
  const stockByName = new Map();

  stock.forEach(function(item) {
    stockByCode.set(normalize_(item.code), item);
    stockByName.set(normalize_(item.name), item);

    item.dayIn = 0;
    item.dayOut = 0;
    item.openingQty = item.qty;
    item.actualStatus = statusOf_(item.qty, item.threshold);
    item.pendingIn = 0;
    item.pendingOut = 0;
    item.projectedQty = item.qty;
    item.projectedStatus = item.actualStatus;
    item.projectedValue = item.stockValue;
  });

  journal.forEach(function(row) {
    if (row.dateKey !== reportDateKey) return;

    const item =
      stockByCode.get(normalize_(row.code)) ||
      stockByName.get(normalize_(row.name));

    if (!item) return;
    item.dayIn += toNumber_(row.input);
    item.dayOut += toNumber_(row.output);
  });

  stock.forEach(function(item) {
    item.openingQty = item.qty - item.dayIn + item.dayOut;
  });

  const unmatched = [];

  pending.forEach(function(row) {
    const item =
      stockByCode.get(normalize_(row.code)) ||
      stockByName.get(normalize_(row.name));

    if (!item) {
      row.matched = 'Không khớp';
      row.currentQty = 0;
      row.projectedQty = toNumber_(row.input) - toNumber_(row.output);
      row.referencePrice = 0;
      row.projectedValue = 0;
      unmatched.push({code: row.code, name: row.name, voucher: row.voucher});
      return;
    }

    item.pendingIn += toNumber_(row.input);
    item.pendingOut += toNumber_(row.output);

    row.matched = item.code;
    row.currentQty = item.qty;
    row.projectedQty = item.qty + item.pendingIn - item.pendingOut;
    row.referencePrice = item.referencePrice;
    row.projectedValue = item.hasReferencePrice
      ? row.projectedQty * item.referencePrice
      : 0;
  });

  stock.forEach(function(item) {
    item.projectedQty = item.qty + item.pendingIn - item.pendingOut;
    item.projectedStatus = statusOf_(item.projectedQty, item.threshold);
    item.projectedValue = item.hasReferencePrice
      ? item.projectedQty * item.referencePrice
      : 0;
  });

  stock.sort(function(a, b) {
    return a.name.localeCompare(b.name, 'vi');
  });

  return {
    stock: stock,
    pending: pending,
    unmatched: unmatched,
    valueSummary: buildValueSummary_(stock)
  };
}

function buildValueSummary_(stock) {
  const totalValue = stock.reduce(function(sum, item) {
    return sum + toNumber_(item.stockValue);
  }, 0);
  const projectedValue = stock.reduce(function(sum, item) {
    return sum + toNumber_(item.projectedValue);
  }, 0);
  const openingValue = stock.reduce(function(sum, item) {
    return sum + (item.hasReferencePrice
      ? toNumber_(item.openingQty) * toNumber_(item.referencePrice)
      : 0);
  }, 0);
  const dayInValue = stock.reduce(function(sum, item) {
    return sum + (item.hasReferencePrice
      ? toNumber_(item.dayIn) * toNumber_(item.referencePrice)
      : 0);
  }, 0);
  const dayOutValue = stock.reduce(function(sum, item) {
    return sum + (item.hasReferencePrice
      ? toNumber_(item.dayOut) * toNumber_(item.referencePrice)
      : 0);
  }, 0);

  const activeStock = stock.filter(function(item) {
    return toNumber_(item.qty) > 0;
  });
  const pricedActiveStock = activeStock.filter(function(item) {
    return item.hasReferencePrice;
  });
  const missingPriceWithStock = activeStock.filter(function(item) {
    return !item.hasReferencePrice;
  });
  const pricedItems = stock.filter(function(item) {
    return item.hasReferencePrice;
  });
  const stalePrices = activeStock.filter(function(item) {
    return item.priceIsStale;
  });
  const pricesWithoutDate = activeStock.filter(function(item) {
    return item.priceDateMissing;
  });

  const topFiveValue = stock
    .filter(function(item) { return toNumber_(item.stockValue) > 0; })
    .sort(function(a, b) {
      return toNumber_(b.stockValue) - toNumber_(a.stockValue);
    })
    .slice(0, 5)
    .reduce(function(sum, item) {
      return sum + toNumber_(item.stockValue);
    }, 0);

  const reconciliationExpected = openingValue + dayInValue - dayOutValue;

  return {
    totalValue: totalValue,
    projectedValue: projectedValue,
    openingValue: openingValue,
    dayInValue: dayInValue,
    dayOutValue: dayOutValue,
    netChangeValue: dayInValue - dayOutValue,
    pendingChangeValue: projectedValue - totalValue,
    reconciliationExpected: reconciliationExpected,
    reconciliationDifference: totalValue - reconciliationExpected,
    missingPriceCount: stock.filter(function(item) {
      return !item.hasReferencePrice;
    }).length,
    missingPriceWithStockCount: missingPriceWithStock.length,
    pricedItemsCount: pricedItems.length,
    activeStockItemCount: activeStock.length,
    pricedActiveStockCount: pricedActiveStock.length,
    valuationCoveragePercent: activeStock.length
      ? pricedActiveStock.length / activeStock.length * 100
      : 100,
    stalePriceCount: stalePrices.length,
    priceDateMissingCount: pricesWithoutDate.length,
    priceReviewCount: stalePrices.length + pricesWithoutDate.length,
    lowStockValue: stock
      .filter(function(item) { return item.actualStatus === 'SẮP HẾT'; })
      .reduce(function(sum, item) { return sum + toNumber_(item.stockValue); }, 0),
    topFiveValue: topFiveValue,
    topFiveConcentrationPercent: totalValue > 0
      ? topFiveValue / totalValue * 100
      : 0
  };
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.



// ===== END 21_Dashboard_Read.gs =====


// ===== BEGIN 30_Rules_Ledger_V1.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 30_Rules_Ledger_V1.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function auditInventoryIntegrityV104() {
  const ss58=getSpreadsheet_(),sheet58=ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET),stock58=readStock_(sheet58);
  const codes={},duplicateCodes=[],negative58=[],missingUnit58=[];
  stock58.forEach(function(x){const k=normalize_(x.code);codes[k]=(codes[k]||0)+1;if(x.qty<0)negative58.push(x.code);if(!x.unit||normalize_(x.unit)==='hang hoa')missingUnit58.push(x.code);});
  Object.keys(codes).forEach(function(k){if(codes[k]>1)duplicateCodes.push(k);});
  let mapping={unmapped:0,invalid:0,duplicates:0},negative145=[];
  try{const ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID),rows=readWarehouse145Raw_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET));negative145=rows.filter(function(x){return x.qty<0;}).map(function(x){return x.sheetRow;});const valid={};stock58.forEach(function(x){valid[normalize_(x.code)]=true;});const seen={};rows.forEach(function(r){if(!r.masterCode)mapping.unmapped++;else if(!valid[normalize_(r.masterCode)])mapping.invalid++;else{const k=normalize_(r.masterCode);seen[k]=(seen[k]||0)+1;}});mapping.duplicates=Object.keys(seen).filter(function(k){return seen[k]>1;}).length;}catch(e){mapping.error=String(e&&e.message||e);}
  return {appVersion:APP_VERSION,stock58Count:stock58.length,duplicateCodes:duplicateCodes,negative58:negative58,missingUnit58:missingUnit58,negative145:negative145,mapping:mapping,serverTime:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
}

function coreRuleResult_(ruleId, ok, message, data) {
  return {ruleId:String(ruleId||''), ok:Boolean(ok), message:String(message||''), data:data||null};
}

function coreRuleFail_(ruleId, message, data) {
  return coreRuleResult_(ruleId,false,message,data);
}

function coreRulePass_(ruleId, message, data) {
  return coreRuleResult_(ruleId,true,message,data);
}

function coreRuleError_(ruleId, message, data) {
  const e = new Error('[' + ruleId + '] ' + message);
  e.ruleId = ruleId;
  e.ruleData = data || null;
  return e;
}

function coreValidateActionPlanV105_(plan, context) {
  context = context || {};
  const results = [];
  const slips = Array.isArray(plan && plan.slips) ? plan.slips : [];
  if (!slips.length) results.push(coreRuleFail_('R03','Action Plan chưa có phiếu logic.'));
  if (slips.length > CORE_V105_CONFIG.MAX_SLIPS_PER_BATCH) results.push(coreRuleFail_('R45','Batch vượt quá ' + CORE_V105_CONFIG.MAX_SLIPS_PER_BATCH + ' phiếu.'));
  const seenSlip = {};
  slips.forEach(function(s,si){
    const slipNo = String(s.slip_no || (si+1)).trim();
    if (seenSlip[slipNo]) results.push(coreRuleFail_('R03','Trùng số thứ tự phiếu logic ' + slipNo + '.'));
    seenSlip[slipNo] = true;
    const op = String(s.operation || '').toUpperCase();
    if (['IN','OUT','ADJUST','TRANSFER'].indexOf(op) < 0) results.push(coreRuleFail_('R49','Phiếu '+slipNo+': chưa xác định loại nghiệp vụ.'));
    const lines = Array.isArray(s.lines) ? s.lines : [];
    if (!lines.length) results.push(coreRuleFail_('R03','Phiếu '+slipNo+': chưa có mặt hàng.'));
    if (lines.length > CORE_V105_CONFIG.MAX_LINES_PER_SLIP) results.push(coreRuleFail_('R45','Phiếu '+slipNo+' vượt quá '+CORE_V105_CONFIG.MAX_LINES_PER_SLIP+' dòng.'));
    const actor = String(context.actor || s.actor_hint || '').trim();
    if (!actor) results.push(coreRuleFail_('R20','Phiếu '+slipNo+': thiếu người thực hiện.'));
    lines.forEach(function(l,li){
      const raw = String(l.source_excerpt || l.item_text || '').trim();
      if (!raw) results.push(coreRuleFail_('R46','Phiếu '+slipNo+' dòng '+(li+1)+': thiếu nhận diện hàng hóa.'));
      if (op !== 'ADJUST' && Math.floor(toNumber_(l.quantity)) <= 0) {
        // Số lượng có thể được deterministic fallback bổ sung sau, nên chỉ cảnh báo mềm ở đây.
        results.push(coreRuleResult_('R46',true,'Phiếu '+slipNo+' dòng '+(li+1)+': quantity sẽ được kiểm tra lại từ câu gốc.',{soft:true}));
      }
      if (op === 'ADJUST' && Math.floor(toNumber_(l.target_quantity)) < 0) results.push(coreRuleFail_('R08','Phiếu '+slipNo+' dòng '+(li+1)+': tồn điều chỉnh không được âm.'));
    });
  });
  const failures = results.filter(function(r){return !r.ok;});
  return {ok:failures.length===0, failures:failures, results:results, ruleset:CORE_V105_CONFIG.RULESET_VERSION};
}

function aiResolverItemTextV2_(item) {
  return [item && item.name || '', item && item.aliases || ''].concat(item && item.legacyNames || []).join(' | ');
}

function aiResolverScoreConfidenceV2_(score) {
  score = Number(score || 0);
  if (score >= 900) return 99;
  if (score >= 650) return 97;
  if (score >= 500) return 95;
  if (score >= 400) return 93;
  if (score >= 340) return 91;
  if (score >= 300) return 89;
  if (score >= 260) return 86;
  if (score >= 220) return 80;
  if (score >= 170) return 72;
  if (score > 0) return Math.max(35, Math.min(70, Math.round(score / 3)));
  return 0;
}

function aiResolverCandidateRowsV2_(scored) {
  const rows = Array.isArray(scored) ? scored : [];
  return rows.slice(0, AI_RESOLVER_CONFIG.MAX_CANDIDATES).map(function(x){
    return {
      code:x.item.code,
      name:x.item.name,
      score:Number(x.score || 0),
      confidence:aiResolverScoreConfidenceV2_(x.score)
    };
  });
}

function aiResolverMachinePoolV2_(pool) {
  return Array.isArray(pool) && pool.length > 0 && pool.every(function(item){
    const text = aiResolverItemTextV2_(item);
    return aiProductKind_(text) === 'MACHINE';
  });
}

function aiResolverMachineConditionV2_(text) {
  const n = normalize_(text);
  if (/da qua su dung|may cu|\bcu\b|thao may/.test(n)) return 'USED';
  if (/may moi|\bmoi\b/.test(n)) return 'NEW';
  // CH chỉ mang nghĩa NEW khi candidate pool đã xác định là máy in.
  if (/chinh hang|\bch\b/.test(n)) return 'NEW';
  return '';
}

function aiResolverVariantAmbiguityV2_(raw, pool) {
  if (!Array.isArray(pool) || pool.length < 2) return false;
  const machinePool = aiResolverMachinePoolV2_(pool);
  const queryVariants = aiVariantTokens_(raw).filter(function(v){return !(machinePool && v==='CH');});
  if (queryVariants.length) return false;
  const signatures = {};
  let explicitCount = 0;
  pool.forEach(function(item){
    const vars = aiVariantTokens_(aiResolverItemTextV2_(item)).filter(function(v){return !(machinePool && v==='CH');});
    if (vars.length) explicitCount++;
    signatures[vars.length ? vars.slice().sort().join('+') : '(NONE)'] = true;
  });
  return explicitCount > 0 && Object.keys(signatures).length > 1;
}

function aiResolverConditionAmbiguityV2_(raw, pool) {
  if (!aiResolverMachinePoolV2_(pool) || aiResolverMachineConditionV2_(raw) || pool.length < 2) return false;
  const conditions = {};
  pool.forEach(function(item){
    const condition = aiResolverMachineConditionV2_(aiResolverItemTextV2_(item));
    if (condition) conditions[condition] = true;
  });
  return Object.keys(conditions).length > 1;
}

function aiResolverEnrichResultV2_(result, confidence, margin) {
  result = result || {};
  result.confidence = Math.max(0, Math.min(100, Math.round(Number(confidence || 0))));
  result.margin = Math.max(0, Number(margin || 0));
  result.resolverVersion = AI_RESOLVER_CONFIG.VERSION;
  return result;
}

function coreResolveSkuIdentityV105_(itemText, catalog) {
  const raw = String(itemText || '').trim();
  const q = normalize_(raw);
  const list = Array.isArray(catalog) ? catalog : [];
  if (!q) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:'EMPTY',ruleId:'R46'},0,0);

  const tdMatch = raw.toUpperCase().match(/TD-\d{4}/);
  if (tdMatch) {
    const exactCode = list.find(function(x){return String(x.code||'').toUpperCase()===tdMatch[0];});
    if (!exactCode) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:'CODE_NOT_FOUND',ruleId:'R11'},0,0);
    const descriptive = raw.replace(tdMatch[0],' ').trim();
    const exactCandidate = [{code:exactCode.code,name:exactCode.name,score:10000,confidence:100}];
    if (descriptive && !aiCandidateIdentityCompatible_(descriptive, exactCode)) {
      return aiResolverEnrichResultV2_({resolved:false,candidates:exactCandidate,reason:'CODE_IDENTITY_MISMATCH',ruleId:'R11'},0,10000);
    }
    return aiResolverEnrichResultV2_({resolved:true,item:exactCode,score:10000,candidates:exactCandidate,reason:'EXACT_CODE',ruleId:'R11'},100,10000);
  }

  const qModels = aiStrongModelTokens_(raw);
  const qBrands = aiBrandTokens_(raw);
  const qVariants = aiVariantTokens_(raw);
  const qKind = aiProductKind_(raw);
  let qCondition = aiProductCondition_(raw,qKind);

  // Exact normalized name/alias vẫn phải qua identity guard.
  const exacts = list.filter(function(item){
    const names=[item.name].concat(String(item.aliases||'').split(/[,;|\n]+/)).concat(item.legacyNames||[]).map(normalize_).filter(Boolean);
    return names.indexOf(q)>=0 && aiCandidateIdentityCompatible_(raw,item);
  });
  if (exacts.length===1) {
    return aiResolverEnrichResultV2_({resolved:true,item:exacts[0],score:5000,candidates:[{code:exacts[0].code,name:exacts[0].name,score:5000,confidence:99}],reason:'EXACT_NAME_OR_ALIAS',ruleId:'R11'},99,5000);
  }
  if (exacts.length>1) {
    return aiResolverEnrichResultV2_({resolved:false,candidates:exacts.slice(0,8).map(function(x){return {code:x.code,name:x.name,score:5000,confidence:99};}),reason:'DUPLICATE_EXACT_ALIAS',ruleId:'R46'},0,0);
  }

  let pool = list.slice();
  if (qModels.length) {
    pool = pool.filter(function(item){
      const models=aiStrongModelTokens_(aiResolverItemTextV2_(item));
      return qModels.some(function(m){return models.indexOf(m)>=0;});
    });
    if (!pool.length) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:'MODEL_NOT_FOUND',ruleId:'R11'},0,0);
  }
  if (qBrands.length) {
    const branded = pool.filter(function(item){
      const brands=aiBrandTokens_(aiResolverItemTextV2_(item));
      return qBrands.some(function(b){return brands.indexOf(b)>=0;});
    });
    if (branded.length) pool=branded;
  }
  if (qKind) {
    const kinded=pool.filter(function(item){return aiProductKind_(aiResolverItemTextV2_(item))===qKind;});
    if (kinded.length) pool=kinded;
  }
  if (!qCondition && aiResolverMachinePoolV2_(pool)) qCondition = aiResolverMachineConditionV2_(raw);
  if (qVariants.length) {
    pool=pool.filter(function(item){
      const vars=aiVariantTokens_(aiResolverItemTextV2_(item));
      return qVariants.every(function(v){return vars.indexOf(v)>=0;});
    });
    if (!pool.length) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:'VARIANT_NOT_FOUND',ruleId:'R12'},0,0);
  }
  if (qCondition) {
    const conditioned=pool.filter(function(item){
      const t=aiResolverItemTextV2_(item);
      return aiProductCondition_(t,aiProductKind_(t))===qCondition;
    });
    if (conditioned.length) pool=conditioned;
  }

  const scored=pool.map(function(item){return {item:item,score:aiScoreCandidate_(q,item)};})
    .filter(function(x){return x.score>0;}).sort(function(a,b){return b.score-a.score;});
  const top=scored[0], second=scored[1];
  const candidates=aiResolverCandidateRowsV2_(scored);
  if (!top) return aiResolverEnrichResultV2_({resolved:false,candidates:[],reason:'NO_MATCH',ruleId:'R46'},0,0);

  const margin = second ? Number(top.score-second.score) : Number(top.score);
  let confidence = aiResolverScoreConfidenceV2_(top.score);
  if (second) confidence = Math.min(98, confidence + Math.min(5, Math.floor(Math.max(0,margin)/45)));
  else confidence = Math.min(98, confidence + 3);

  if (qModels.length) {
    if (aiResolverVariantAmbiguityV2_(raw, pool)) {
      return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'MODEL_VARIANT_AMBIGUOUS',ruleId:'R12'},Math.min(confidence,79),margin);
    }
    if (aiResolverConditionAmbiguityV2_(raw, pool)) {
      return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'MODEL_CONDITION_AMBIGUOUS',ruleId:'R46'},Math.min(confidence,79),margin);
    }
    if (second && margin<60) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'MODEL_VARIANT_AMBIGUOUS',ruleId:'R12'},Math.min(confidence,79),margin);
    confidence = Math.max(confidence, AI_RESOLVER_CONFIG.EXACT_MODEL_CONFIDENCE);
    return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:'EXACT_MODEL',ruleId:'R11'},confidence,margin);
  }

  if (top.score<260) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE',ruleId:'R46'},confidence,margin);
  if (second && second.score>=170 && margin<70) return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'AMBIGUOUS',ruleId:'R46'},Math.min(confidence,79),margin);
  if (confidence < AI_RESOLVER_CONFIG.AUTO_RESOLVE_MIN_CONFIDENCE) {
    return aiResolverEnrichResultV2_({resolved:false,candidates:candidates,reason:'LOW_CONFIDENCE_V2',ruleId:'R46'},confidence,margin);
  }
  confidence = Math.max(confidence, AI_RESOLVER_CONFIG.HIGH_CONFIDENCE_FLOOR);
  return aiResolverEnrichResultV2_({resolved:true,item:top.item,score:top.score,candidates:candidates,reason:'HIGH_CONFIDENCE',ruleId:'R11'},confidence,margin);
}

function coreBusinessReasonV105_(operation, counterparty, note) {
  const op=String(operation||'').toUpperCase();
  const raw=[counterparty,note].filter(Boolean).join(' ');
  const n=normalize_(raw);
  if (op==='TRANSFER') return 'Điều chuyển kho';
  if (op==='ADJUST') return 'Kiểm kho';
  if (op==='IN') {
    if (/chuyen tu kho|nhap chuyen kho/.test(n)) return 'Nhập chuyển kho';
    return 'Nhập hàng';
  }
  if (op==='OUT') {
    if (/shopee/.test(n)) return 'Gửi Shopee';
    if (/tiktok/.test(n)) return 'Gửi TikTok';
    if (/inkviet/.test(n)) return 'Đóng INKVIET';
    if (/gui xe|nha xe|chanh xe/.test(n)) return 'Gửi xe';
    if (/chuyen qua kho|chuyen kho/.test(n)) return 'Chuyển qua kho';
    return 'Xuất bán';
  }
  return String(note||'').trim() || 'Nghiệp vụ kho';
}

function coreCounterpartyV105_(operation, counterparty, note) {
  const explicit=String(counterparty||'').trim();
  if (explicit) return explicit;
  const n=normalize_(note);
  if (operation==='OUT') {
    if (/shopee/.test(n)) return 'Shopee';
    if (/tiktok/.test(n)) return 'TikTok';
    if (/inkviet/.test(n)) return 'INKVIET';
    if (/chuyen qua kho|chuyen kho/.test(n)) return 'Kho';
    return 'Khách cửa hàng';
  }
  if (operation==='IN') {
    if (/chuyen tu kho|nhap chuyen kho/.test(n)) return 'Chuyển từ kho';
  }
  return '';
}

function corePersonnelNoteV105_(operation, actor, voucher, appMeta) {
  const person=String(actor||'').trim();
  const op=String(operation||'').toUpperCase();
  let base='';
  if (op==='OUT') base=person ? person+' xuất; ghi thẳng sổ chính' : 'Không ghi người xuất; ghi thẳng sổ chính';
  else if (op==='IN') base=person ? person+' nhận; ghi thẳng sổ chính' : 'Không ghi người nhận; ghi thẳng sổ chính';
  else if (op==='ADJUST') base=person ? person+' kiểm kho; ghi thẳng sổ chính' : 'Không ghi người kiểm; ghi thẳng sổ chính';
  else if (op==='TRANSFER') base=person ? person+' chuyển kho; ghi thẳng sổ chính' : 'Không ghi người chuyển; ghi thẳng sổ chính';
  const meta=[voucher ? 'Phiếu '+voucher : '', appMeta ? 'Ghi bởi Trợ lý AI '+appMeta : ''].filter(Boolean).join(' · ');
  return [base,meta].filter(Boolean).join(' · ');
}

function coreEnsureSheetV105_(ss, name, headers) {
  let sh=ss.getSheetByName(name);
  if (!sh) sh=ss.insertSheet(name);
  if (headers && headers.length) {
    const current=sh.getRange(1,1,1,headers.length).getDisplayValues()[0];
    const needs=headers.some(function(h,i){return String(current[i]||'')!==String(h);});
    if (needs) {
      sh.getRange(1,1,1,headers.length).setValues([headers]);
      sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#1d4ed8').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
  }
  return sh;
}

function coreEnsureLedgerV105_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),CORE_V105_CONFIG.LEDGER_SHEET,[
    'TX_ID','PREVIEW_ID','NGÀY CHỨNG TỪ','TRẠNG THÁI','PHIẾU','NGƯỜI THỰC HIỆN','KHO','SỐ PHIẾU LOGIC','SỐ DÒNG','TỔNG SL','RULESET','RULE RESULT','BEFORE SNAPSHOT','AFTER SNAPSHOT','CẬP NHẬT','LỖI'
  ]);
}

function coreLedgerBeginV105_(preview) {
  const sh=coreEnsureLedgerV105_();
  const txId='TX-'+Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'yyyyMMdd-HHmmss-SSS')+'-'+Utilities.getUuid().slice(0,8).toUpperCase();
  const actors=Array.from(new Set((preview.slips||[]).map(function(s){return s.actor;}).filter(Boolean))).join(', ');
  const warehouses=(preview.slips||[]).map(function(s){return s.operation==='TRANSFER'?s.sourceWarehouse+'→'+s.destinationWarehouse:s.warehouse;}).join(' | ');
  const row=sh.getLastRow()+1;
  sh.getRange(row,1,1,CORE_V105_CONFIG.LEDGER_COLUMNS).setValues([[
    txId,preview.previewId||'',preview.transactionDate||'','PREPARED','',actors,warehouses,preview.slipCount||0,preview.lineCount||0,preview.totalQty||0,CORE_V105_CONFIG.RULESET_VERSION,'R01,R03,R07,R08,R09,R11,R12,R17,R35,R41,R45,R50',JSON.stringify(preview.initialStock||{}),'',new Date(),''
  ]]);
  sh.getRange(row,15).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  return {sheet:sh,row:row,txId:txId};
}

function coreLedgerFinishV105_(ledger,status,vouchers,afterSnapshot,errorText) {
  if (!ledger || !ledger.sheet || !ledger.row) return;
  ledger.sheet.getRange(ledger.row,4).setValue(status);
  ledger.sheet.getRange(ledger.row,5).setValue((vouchers||[]).map(function(v){return v.voucher||v.transferId||'';}).filter(Boolean).join(' | '));
  ledger.sheet.getRange(ledger.row,14).setValue(JSON.stringify(afterSnapshot||{}));
  ledger.sheet.getRange(ledger.row,15).setValue(new Date()).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  ledger.sheet.getRange(ledger.row,16).setValue(String(errorText||''));
}

function coreSyncCanBoSungV105_() {
  const ss=getSpreadsheet_();
  const stock=ss.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const sh=ss.getSheetByName('CAN_BO_SUNG');
  if (!stock || !sh) return {ok:false,message:'Thiếu TONKHO hoặc CAN_BO_SUNG'};
  const last=stock.getLastRow();
  const rows=last>=DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW ? stock.getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW,1,last-DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW+1,8).getValues() : [];
  const master={},need={};
  rows.forEach(function(r){
    const code=String(r[1]||'').trim(); if(!code)return;
    const qty=toNumber_(r[4]),threshold=String(r[5]??'').trim()===''?2:Math.max(0,toNumber_(r[5])),status=statusOf_(qty,threshold);
    const item={code:code,name:String(r[2]||'').trim(),unit:normalizeUnitValue_(r[3],String(r[2]||'')),qty:qty,threshold:threshold,status:status,note:String(r[7]||'').trim()};
    master[normalize_(code)]=item; if(status!=='OK')need[normalize_(code)]=item;
  });
  const start=5,lastCan=Math.max(sh.getLastRow(),start-1);
  const existingRows=lastCan>=start?sh.getRange(start,1,lastCan-start+1,8).getValues():[];
  const existing={},usedRows={}; let maxStt=0;
  existingRows.forEach(function(r,i){const rowNo=start+i;const code=String(r[1]||'').trim();maxStt=Math.max(maxStt,Math.floor(toNumber_(r[0])));if(code&&!existing[normalize_(code)])existing[normalize_(code)]={row:rowNo,values:r};});
  let updated=0,appended=0,removed=0;
  Object.keys(need).forEach(function(k){
    const item=need[k],ex=existing[k];
    if(ex){
      const stt=toNumber_(ex.values[0])>0?ex.values[0]:++maxStt;
      sh.getRange(ex.row,1,1,8).setValues([[stt,item.code,item.name,item.unit,item.qty,item.threshold,item.status,item.note]]);usedRows[ex.row]=true;updated++;
    }else{
      const rowNo=sh.getLastRow()+1;sh.getRange(rowNo,1,1,8).setValues([[++maxStt,item.code,item.name,item.unit,item.qty,item.threshold,item.status,item.note]]);usedRows[rowNo]=true;appended++;
    }
  });
  // R29 cho phép xóa mã đã OK; R30 yêu cầu không dọn các dòng bất thường/không nhận diện.
  Object.keys(existing).forEach(function(k){const ex=existing[k];if(master[k]&&!need[k]){sh.getRange(ex.row,1,1,8).clearContent();removed++;}});
  return {ok:true,count:Object.keys(need).length,updated:updated,appended:appended,removed:removed};
}

function coreUpdateTongHopV105_() {
  const ss=getSpreadsheet_();
  const stock=ss.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const journal=ss.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET);
  const summary=ss.getSheetByName(DASHBOARD_CONFIG.SUMMARY_SHEET);
  if(!stock||!summary) return {ok:false,message:'Thiếu TONKHO hoặc TONG_HOP'};
  const last=stock.getLastRow();
  const rows=last>=DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW?stock.getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW,1,last-DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW+1,8).getValues():[];
  let codes=0,total=0,out=0,low=0,ok=0;
  rows.forEach(function(r){if(!String(r[1]||'').trim())return;codes++;const q=toNumber_(r[4]),th=String(r[5]??'').trim()===''?2:Math.max(0,toNumber_(r[5])),st=statusOf_(q,th);total+=q;if(st==='HẾT HÀNG')out++;else if(st==='SẮP HẾT')low++;else ok++;});
  const journalRows=journal&&journal.getLastRow()>=5?Math.max(0,journal.getLastRow()-4):0;
  const today=Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy');
  summary.getRange('B2').setValue(today);
  summary.getRange('B3').setValue('Cập nhật tự động bởi Transaction Engine '+APP_VERSION+'; số liệu đọc lại từ TONKHO live.');
  summary.getRange(8,2,1,7).setValues([[codes,total,out,low,ok,journalRows,'Transaction Engine '+APP_VERSION]]);
  summary.getRange(11,2).setValue(out);
  summary.getRange(12,2).setValue(low);
  summary.getRange(13,2).setValue(out+low);
  return {ok:true,codes:codes,totalQty:total,out:out,low:low,okCount:ok,journalRows:journalRows};
}

function corePostCommitDerivedSyncV105_() {
  const can=coreSyncCanBoSungV105_();
  const sum=coreUpdateTongHopV105_();
  if(!can.ok) throw coreRuleError_('R29',can.message||'Không đồng bộ CAN_BO_SUNG.');
  if(!sum.ok) throw coreRuleError_('R31',sum.message||'Không cập nhật TONG_HOP.');
  return {canBoSung:can,tongHop:sum};
}

function coreVerifyCommittedV105_(preview, vouchers) {
  const ss58=getSpreadsheet_();
  const ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const stock58=ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const stock145=ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  const expected={};
  (preview.slips||[]).forEach(function(s){(s.lines||[]).forEach(function(l){
    if(s.operation==='TRANSFER'){
      expected[s.sourceWarehouse+'|'+l.code]=l.after;
      expected[s.destinationWarehouse+'|'+l.code]=l.destinationAfter;
    }else expected[s.warehouse+'|'+l.code]=l.after;
  });});
  const mismatches=[];
  Object.keys(expected).forEach(function(k){
    const parts=k.split('|'),wh=parts[0],code=parts.slice(1).join('|');
    const t=wh==='58'?getTransferTarget58_(stock58,code):getTransferTarget145_(stock145,code);
    const actual=t?toNumber_(t.qty):null;
    if(actual!==toNumber_(expected[k])) mismatches.push({warehouse:wh,code:code,expected:expected[k],actual:actual});
  });
  if(mismatches.length) throw coreRuleError_('R38','Hậu kiểm tồn sau ghi không khớp.',mismatches);

  const wanted={};
  (vouchers||[]).forEach(function(v){[v.voucher,v.issueVoucher,v.receiptVoucher].filter(Boolean).forEach(function(x){wanted[x]=true;});});
  const found={};
  [ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET),ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET)].forEach(function(sh){
    if(!sh||sh.getLastRow()<2)return;
    sh.getRange(2,2,sh.getLastRow()-1,1).getDisplayValues().forEach(function(r){const v=String(r[0]||'');if(wanted[v])found[v]=true;});
  });
  (vouchers||[]).forEach(function(v){
    const ok=(v.voucher&&found[v.voucher])||(v.issueVoucher&&found[v.issueVoucher])||(v.receiptVoucher&&found[v.receiptVoucher]);
    if(!ok) throw coreRuleError_('R40','Không tìm thấy chứng từ của phiếu logic '+String(v.slipNo||'')+' khi hậu kiểm nhật ký.');
  });
  return {ok:true,after:expected,verifiedVouchers:Object.keys(found)};
}

function auditInventoryIntegrityV105() {
  const ss58=getSpreadsheet_();
  const stock58=readStock_(ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
  const ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const stock145=readWarehouse145Stock_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET),stock58,{});
  const dup={}; stock58.forEach(function(x){dup[x.code]=(dup[x.code]||0)+1;});
  const duplicateCodes=Object.keys(dup).filter(function(k){return dup[k]>1;});
  const negative58=stock58.filter(function(x){return toNumber_(x.qty)<0;}).map(function(x){return x.code;});
  const negative145=stock145.filter(function(x){return toNumber_(x.qty)<0;}).map(function(x){return x.masterCode||x.legacyName;});
  const missingUnit58=stock58.filter(function(x){return !String(x.unit||'').trim()||normalize_(x.unit)==='hang hoa';}).map(function(x){return x.code;});
  const unitMismatch58=stock58.filter(function(x){const raw=String(x.unit||'').trim();const inferred=inferUnitFromName_(x.name);return raw&&normalize_(raw)!=='hang hoa'&&normalize_(raw)!==normalize_(inferred);}).map(function(x){return {code:x.code,name:x.name,current:x.unit,expected:inferUnitFromName_(x.name)};});
  const canSh=ss58.getSheetByName('CAN_BO_SUNG');
  const canCodes={}; if(canSh&&canSh.getLastRow()>=5)canSh.getRange(5,2,canSh.getLastRow()-4,1).getDisplayValues().forEach(function(r){if(r[0])canCodes[String(r[0]).trim()]=true;});
  const expectedNeed=stock58.filter(function(x){return statusOf_(x.qty,x.threshold)!=='OK';}).map(function(x){return x.code;});
  const canMissing=expectedNeed.filter(function(c){return !canCodes[c];});
  const canExtra=Object.keys(canCodes).filter(function(c){return expectedNeed.indexOf(c)<0;});
  return {appVersion:APP_VERSION,ruleset:CORE_V105_CONFIG.RULESET_VERSION,duplicateCodes:duplicateCodes,negative58:negative58,negative145:negative145,missingUnit58:missingUnit58,unitMismatch58:unitMismatch58,canBoSungMissing:canMissing,canBoSungExtra:canExtra,pass:duplicateCodes.length===0&&negative58.length===0&&negative145.length===0&&missingUnit58.length===0&&canMissing.length===0&&canExtra.length===0,serverTime:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
}

function coreEnsureRuleAuditV105_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),CORE_V105_CONFIG.RULE_AUDIT_SHEET,[
    'THỜI GIAN','RULE_ID','KẾT QUẢ','PREVIEW/BLOCKED ID','PHIẾU LOGIC','MÃ HÀNG','NỘI DUNG','NGƯỜI THỰC HIỆN','APP_VERSION','METADATA'
  ]);
}

function coreLogRuleAuditV105_(entry) {
  try {
    entry=entry||{};
    const sh=coreEnsureRuleAuditV105_();
    sh.appendRow([
      new Date(),String(entry.ruleId||''),String(entry.result||''),String(entry.refId||''),String(entry.slipNo||''),String(entry.code||''),String(entry.message||''),String(entry.actor||''),APP_VERSION,JSON.stringify(entry.metadata||{})
    ]);
    sh.getRange(sh.getLastRow(),1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  } catch(e) {}
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.



// ===== END 30_Rules_Ledger_V1.gs =====


// ===== BEGIN 31_Transaction_Ledger_V2.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 31_Transaction_Ledger_V2.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function coreEnsureLedger_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),CORE_V105_CONFIG.LEDGER_SHEET,[
    'TX_ID','PREVIEW_ID','NGÀY CHỨNG TỪ','TRẠNG THÁI','PHIẾU','NGƯỜI THỰC HIỆN','KHO','SỐ PHIẾU LOGIC','SỐ DÒNG','TỔNG SL','RULESET','RULE RESULT','BEFORE SNAPSHOT','AFTER SNAPSHOT','CẬP NHẬT','LỖI','CREATED_AT','VALIDATED_AT','COMMITTING_AT','FINAL_AT','SEQUENCE_RANGE'
  ]);
}

function coreEnsureDocumentSequence_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),TRANSACTION_V107_CONFIG.SEQUENCE_SHEET,[
    'DATE_KEY','LAST_SUFFIX','SEEDED_FROM_LIVE','UPDATED_AT','LAST_TX_ID'
  ]);
}

function coreEnsureTransactionLines_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),TRANSACTION_V107_CONFIG.LINE_LEDGER_SHEET,[
    'TX_ID','PREVIEW_ID','SLIP_NO','LINE_NO','VOUCHER','WAREHOUSE','OPERATION','CODE','NAME','UNIT','QTY','BEFORE_QTY','AFTER_QTY','STATUS','CREATED_AT','UPDATED_AT','ERROR','META'
  ]);
}

function coreEnsureReconciliation_() {
  return coreEnsureSheetV105_(getSpreadsheet_(),TRANSACTION_V107_CONFIG.RECONCILIATION_SHEET,[
    'THỜI GIAN','TX_ID','TRẠNG THÁI','LỖI','CHI TIẾT','APP_VERSION'
  ]);
}

function coreParseVoucherSuffix_(voucher,dateStamp) {
  const text=String(voucher||'').trim();
  const ds=String(dateStamp||'').replace(/[^0-9]/g,'');
  if(!text||!ds)return 0;
  const m=text.match(new RegExp('^(?:PXK|PNK|DCK|KK)-'+ds+'-(\\d{1,6})(?:\\.\\d+)?$','i'));
  return m?(parseInt(m[1],10)||0):0;
}

function coreScanMaxSequence_(dateStamp,ss58,ss145,transferSheet) {
  let maxValue=0;
  function scan_(sheet,startRow,column){
    if(!sheet)return;
    const last=sheet.getLastRow(); if(last<startRow)return;
    const vals=sheet.getRange(startRow,column,last-startRow+1,1).getDisplayValues();
    vals.forEach(function(r){maxValue=Math.max(maxValue,coreParseVoucherSuffix_(r[0],dateStamp));});
  }
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET),5,2);
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET),5,2);
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.PENDING_SHEET),2,2);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET),2,2);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET),2,2);
  scan_(transferSheet,2,2);
  return maxValue;
}

function coreFindSequenceRow_(sheet,dateKey) {
  const last=sheet.getLastRow(); if(last<2)return null;
  const vals=sheet.getRange(2,1,last-1,2).getDisplayValues();
  for(let i=0;i<vals.length;i++) if(String(vals[i][0]||'').trim()===dateKey) return {row:i+2,lastSuffix:Math.max(0,Math.floor(toNumber_(vals[i][1])))};
  return null;
}

function coreSeedDocumentSequence_(dateKey) {
  const key=aiNormalizeDateKey_(dateKey)||dateKey_(new Date());
  const ds=key.replace(/-/g,'');
  const sh=coreEnsureDocumentSequence_();
  const ss58=getSpreadsheet_(),ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID),transferSheet=ensureTransferSheet_();
  const liveMax=coreScanMaxSequence_(ds,ss58,ss145,transferSheet);
  let found=coreFindSequenceRow_(sh,key);
  if(!found){const row=sh.getLastRow()+1;sh.getRange(row,1,1,5).setValues([[key,liveMax,liveMax,new Date(),'SEED']]);sh.getRange(row,4).setNumberFormat('dd/MM/yyyy HH:mm:ss');return {dateKey:key,row:row,lastSuffix:liveMax,liveMax:liveMax,created:true};}
  const corrected=Math.max(found.lastSuffix,liveMax);
  if(corrected!==found.lastSuffix){sh.getRange(found.row,2).setValue(corrected);sh.getRange(found.row,3).setValue(liveMax);sh.getRange(found.row,4).setValue(new Date()).setNumberFormat('dd/MM/yyyy HH:mm:ss');sh.getRange(found.row,5).setValue('RESYNC');}
  return {dateKey:key,row:found.row,lastSuffix:corrected,liveMax:liveMax,created:false};
}

function coreReserveDocumentSequence_(dateKey,count,txId,ss58,ss145,transferSheet) {
  const n=Math.max(1,Math.floor(toNumber_(count)));
  const key=aiNormalizeDateKey_(dateKey)||dateKey_(new Date());
  const ds=key.replace(/-/g,'');
  const sh=coreEnsureDocumentSequence_();
  let found=coreFindSequenceRow_(sh,key);
  const liveMax=coreScanMaxSequence_(ds,ss58,ss145,transferSheet);
  if(!found){const row=sh.getLastRow()+1;sh.getRange(row,1,1,5).setValues([[key,liveMax,liveMax,new Date(),'SEED']]);found={row:row,lastSuffix:liveMax};}
  const base=Math.max(found.lastSuffix,liveMax);
  const start=base+1,end=base+n;
  sh.getRange(found.row,1,1,5).setValues([[key,end,liveMax,new Date(),String(txId||'')]]);
  sh.getRange(found.row,4).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  return {dateKey:key,dateStamp:ds,startSuffix:start,endSuffix:end,count:n,liveMaxAtReserve:liveMax,row:found.row,range:String(start).padStart(3,'0')+'-'+String(end).padStart(3,'0')};
}

function coreBuildVoucher_(operation,dateStamp,suffix) {
  const op=String(operation||'').toUpperCase(),s=String(Math.max(0,Math.floor(toNumber_(suffix)))).padStart(3,'0');
  const prefix=op==='IN'?'PNK':(op==='OUT'?'PXK':(op==='ADJUST'?'KK':'DCK'));
  return prefix+'-'+dateStamp+'-'+s;
}

function coreLedgerBegin_(preview) {
  const sh=coreEnsureLedger_();
  const txId='TX-'+Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'yyyyMMdd-HHmmss-SSS')+'-'+Utilities.getUuid().slice(0,8).toUpperCase();
  const actors=Array.from(new Set((preview.slips||[]).map(function(s){return s.actor;}).filter(Boolean))).join(', ');
  const warehouses=(preview.slips||[]).map(function(s){return s.operation==='TRANSFER'?s.sourceWarehouse+'→'+s.destinationWarehouse:s.warehouse;}).join(' | ');
  const row=sh.getLastRow()+1,now=new Date();
  const values=[txId,preview.previewId||'',preview.transactionDate||'','PREPARED','',actors,warehouses,preview.slipCount||0,preview.lineCount||0,preview.totalQty||0,CORE_V105_CONFIG.RULESET_VERSION,'R01,R03,R06,R07,R08,R09,R11,R12,R17,R35,R38,R40,R41,R45,R50',JSON.stringify(preview.initialStock||{}),'',now,'',now,'','','',''];
  sh.getRange(row,1,1,TRANSACTION_V107_CONFIG.LEDGER_COLUMNS).setValues([values]);
  [15,17,18,19,20].forEach(function(c){sh.getRange(row,c).setNumberFormat('dd/MM/yyyy HH:mm:ss');});
  return {sheet:sh,row:row,txId:txId};
}

function coreLedgerTransition_(ledger,status,vouchers,afterSnapshot,errorText,sequenceReservation) {
  if(!ledger||!ledger.sheet||!ledger.row)return;
  const now=new Date(),st=String(status||'').toUpperCase();
  ledger.sheet.getRange(ledger.row,4).setValue(st);
  if(vouchers)ledger.sheet.getRange(ledger.row,5).setValue((vouchers||[]).map(function(v){return v.voucher||v.transferId||'';}).filter(Boolean).join(' | '));
  if(afterSnapshot)ledger.sheet.getRange(ledger.row,14).setValue(JSON.stringify(afterSnapshot||{}));
  ledger.sheet.getRange(ledger.row,15).setValue(now).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  if(errorText!==undefined)ledger.sheet.getRange(ledger.row,16).setValue(String(errorText||''));
  if(st==='VALIDATED')ledger.sheet.getRange(ledger.row,18).setValue(now).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  if(st==='COMMITTING')ledger.sheet.getRange(ledger.row,19).setValue(now).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  if(['COMMITTED','ROLLED_BACK','NEEDS_RECONCILIATION'].indexOf(st)>=0)ledger.sheet.getRange(ledger.row,20).setValue(now).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  if(sequenceReservation)ledger.sheet.getRange(ledger.row,21).setValue(sequenceReservation.dateKey+'#'+sequenceReservation.range);
}

function coreLedgerFinish_(ledger,status,vouchers,afterSnapshot,errorText,sequenceReservation) {
  coreLedgerTransition_(ledger,status,vouchers,afterSnapshot,errorText,sequenceReservation);
}

function coreBuildTransactionLine_(txId,previewId,slipNo,lineNo,voucher,warehouse,operation,code,name,unit,qty,before,after,meta) {
  const now=new Date();
  return [String(txId||''),String(previewId||''),String(slipNo||''),Number(lineNo||0),String(voucher||''),String(warehouse||''),String(operation||''),String(code||''),String(name||''),String(unit||''),toNumber_(qty),toNumber_(before),toNumber_(after),'VALIDATED',now,now,'',JSON.stringify(meta||{})];
}

function coreAppendTransactionLines_(rows,status) {
  if(!rows||!rows.length)return null;
  const sh=coreEnsureTransactionLines_(),start=sh.getLastRow()+1,st=String(status||'VALIDATED');
  const values=rows.map(function(r){const x=r.slice();x[13]=st;x[15]=new Date();return x;});
  sh.getRange(start,1,values.length,TRANSACTION_V107_CONFIG.LINE_COLUMNS).setValues(values);
  sh.getRange(start,15,values.length,2).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  return {sheet:sh,start:start,count:values.length};
}

function coreUpdateTransactionLinesStatus_(block,status,errorText) {
  if(!block||!block.sheet||!block.start||!block.count)return;
  block.sheet.getRange(block.start,14,block.count,1).setValue(String(status||''));
  block.sheet.getRange(block.start,16,block.count,1).setValue(new Date()).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  if(errorText!==undefined)block.sheet.getRange(block.start,17,block.count,1).setValue(String(errorText||''));
}

function coreExistingVoucherSet_(ss58,ss145,transferSheet) {
  const out={};
  function scan_(sh,start,col){if(!sh)return;const last=sh.getLastRow();if(last<start)return;sh.getRange(start,col,last-start+1,1).getDisplayValues().forEach(function(r){const v=String(r[0]||'').trim();if(v)out[normalize_(v)]=true;});}
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET),5,2);
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET),5,2);
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.PENDING_SHEET),2,2);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET),2,2);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET),2,2);
  if(transferSheet){scan_(transferSheet,2,2);scan_(transferSheet,2,3);scan_(transferSheet,2,4);}
  return out;
}

function coreAssertVouchersUnique_(vouchers,ss58,ss145,transferSheet) {
  const existing=coreExistingVoucherSet_(ss58,ss145,transferSheet),seen={};
  (vouchers||[]).forEach(function(v){[v.voucher,v.issueVoucher,v.receiptVoucher].filter(Boolean).forEach(function(x){const k=normalize_(x);if(seen[k])throw coreRuleError_('R06','Phiếu '+x+' bị trùng ngay trong batch.');if(existing[k])throw coreRuleError_('R06','Phiếu '+x+' đã tồn tại trong dữ liệu live.');seen[k]=true;});});
  return true;
}

function coreOriginalSnapshot_(targetCache) {
  const out={};Object.keys(targetCache||{}).forEach(function(k){out[k]=toNumber_(targetCache[k].originalQty);});return out;
}

function coreVerifyRollback_(targetCache) {
  const mismatches=[];
  Object.keys(targetCache||{}).forEach(function(k){const t=targetCache[k],actual=t.warehouse==='58'?toNumber_(t.sheet.getRange(t.row,5).getValue()):toNumber_(t.sheet.getRange(t.row,WAREHOUSE_145_CONFIG.QTY_COLUMN).getValue());if(actual!==toNumber_(t.originalQty))mismatches.push({key:k,expected:t.originalQty,actual:actual});});
  return {ok:mismatches.length===0,mismatches:mismatches};
}

function coreAppendReconciliation_(ledger,errorText,detail) {
  const sh=coreEnsureReconciliation_();
  sh.appendRow([new Date(),ledger&&ledger.txId||'','NEEDS_RECONCILIATION',String(errorText||''),JSON.stringify(detail||{}),APP_VERSION]);
  sh.getRange(sh.getLastRow(),1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
}

function coreIsOpenTxStatus_(status) {return ['PREPARED','VALIDATED','COMMITTING'].indexOf(String(status||'').toUpperCase())>=0;}

function coreIsFinalTxStatus_(status) {return ['COMMITTED','ROLLED_BACK','NEEDS_RECONCILIATION'].indexOf(String(status||'').toUpperCase())>=0;}

function auditTransactionHealth() {
  const sh=coreEnsureLedger_(),last=sh.getLastRow(),now=Date.now(),staleMs=TRANSACTION_V107_CONFIG.STALE_MINUTES*60000;
  const out={appVersion:APP_VERSION,transactionVersion:TRANSACTION_V107_CONFIG.VERSION,total:0,open:0,stale:0,needsReconciliation:0,committed:0,rolledBack:0,items:[],ok:true};
  if(last<2)return out;
  const vals=sh.getRange(2,1,last-1,TRANSACTION_V107_CONFIG.LEDGER_COLUMNS).getValues();
  out.total=vals.length;
  vals.slice(-TRANSACTION_V107_CONFIG.MAX_RECONCILIATION_ROWS).forEach(function(r,i){const status=String(r[3]||'').toUpperCase(),updated=r[14] instanceof Date?r[14]:(r[16] instanceof Date?r[16]:null);if(status==='COMMITTED')out.committed++;if(status==='ROLLED_BACK')out.rolledBack++;if(status==='NEEDS_RECONCILIATION')out.needsReconciliation++;if(coreIsOpenTxStatus_(status)){out.open++;const isStale=!updated||now-updated.getTime()>staleMs;if(isStale){out.stale++;out.items.push({txId:String(r[0]||''),status:status,vouchers:String(r[4]||''),updatedAt:updated?Utilities.formatDate(updated,DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss'):'',error:String(r[15]||'')});}}});
  out.ok=out.needsReconciliation===0&&out.stale===0;
  return out;
}

function coreTransactionLineBlockByTx_(txId) {
  const sh=coreEnsureTransactionLines_(),last=sh.getLastRow();
  if(last<2)return {sheet:sh,start:0,count:0,rows:[]};
  const vals=sh.getRange(2,1,last-1,TRANSACTION_V107_CONFIG.LINE_COLUMNS).getValues();
  const rows=[];let start=0;
  vals.forEach(function(r,i){if(String(r[0]||'')===String(txId||'')){if(!start)start=i+2;rows.push(r);}});
  return {sheet:sh,start:start,count:rows.length,rows:rows};
}

function coreJournalVoucherSet_() {
  const ss58=getSpreadsheet_(),ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID),out={};
  function scan_(sh,start){if(!sh)return;const last=sh.getLastRow();if(last<start)return;sh.getRange(start,2,last-start+1,1).getDisplayValues().forEach(function(r){const v=String(r[0]||'').trim();if(v)out[normalize_(v)]=true;});}
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET),5);
  scan_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET),5);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET),2);
  scan_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET),2);
  return out;
}

function coreClassifyTransactionState_(txId) {
  const block=coreTransactionLineBlockByTx_(txId);
  if(!block.rows.length)return {status:'NEEDS_RECONCILIATION',reason:'Không tìm thấy TRANSACTION_LINES cho '+txId,before:{},after:{},actual:{},vouchers:[],voucherFound:{},lineBlock:block};
  const grouped={},vouchers={};
  block.rows.forEach(function(r){
    const wh=String(r[5]||''),code=String(r[7]||''),k=wh+'|'+code;
    if(!grouped[k])grouped[k]={warehouse:wh,code:code,before:toNumber_(r[11]),after:toNumber_(r[12])};
    else grouped[k].after=toNumber_(r[12]);
    const v=String(r[4]||'').trim();if(v)vouchers[v]=true;
  });
  const ss58=getSpreadsheet_(),ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID),stock58=ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET),stock145=ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  const before={},after={},actual={},mismatches=[];
  Object.keys(grouped).forEach(function(k){const g=grouped[k],t=g.warehouse==='58'?getTransferTarget58_(stock58,g.code):getTransferTarget145_(stock145,g.code);before[k]=g.before;after[k]=g.after;actual[k]=t?toNumber_(t.qty):null;if(!t)mismatches.push({key:k,reason:'MISSING_TARGET'});});
  const journal=coreJournalVoucherSet_(),voucherFound={};let foundCount=0;
  Object.keys(vouchers).forEach(function(v){const found=Boolean(journal[normalize_(v)]);voucherFound[v]=found;if(found)foundCount++;});
  const keys=Object.keys(grouped),allBefore=keys.length>0&&keys.every(function(k){return actual[k]===before[k];}),allAfter=keys.length>0&&keys.every(function(k){return actual[k]===after[k];});
  const voucherCount=Object.keys(vouchers).length,allVouchers=voucherCount>0&&foundCount===voucherCount,noVouchers=foundCount===0;
  if(!mismatches.length&&allAfter&&allVouchers)return {status:'COMMITTED',reason:'Tồn khớp AFTER và toàn bộ chứng từ có trong nhật ký.',before:before,after:after,actual:actual,vouchers:Object.keys(vouchers),voucherFound:voucherFound,lineBlock:block};
  if(!mismatches.length&&allBefore&&noVouchers)return {status:'ROLLED_BACK',reason:'Tồn khớp BEFORE và chưa có chứng từ trong nhật ký.',before:before,after:after,actual:actual,vouchers:Object.keys(vouchers),voucherFound:voucherFound,lineBlock:block};
  return {status:'NEEDS_RECONCILIATION',reason:'Trạng thái tồn/chứng từ không đồng nhất; không tự sửa dữ liệu kho.',before:before,after:after,actual:actual,vouchers:Object.keys(vouchers),voucherFound:voucherFound,mismatches:mismatches,lineBlock:block};
}

function reconcileStaleTransactions() {
  coreRequirePermissionV109_('RECONCILE','','reconcileStaleTransactions','Đối soát transaction dang dở');
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    const ledger=coreEnsureLedger_(),last=ledger.getLastRow(),result={appVersion:APP_VERSION,checked:0,recoveredCommitted:0,recoveredRolledBack:0,needsReconciliation:0,items:[],ok:true};
    if(last<2)return result;
    const now=Date.now(),staleMs=TRANSACTION_V107_CONFIG.STALE_MINUTES*60000,vals=ledger.getRange(2,1,last-1,TRANSACTION_V107_CONFIG.LEDGER_COLUMNS).getValues();
    vals.forEach(function(r,i){
      const status=String(r[3]||'').toUpperCase();if(!coreIsOpenTxStatus_(status))return;
      const updated=r[14] instanceof Date?r[14]:(r[16] instanceof Date?r[16]:null);if(updated&&now-updated.getTime()<=staleMs)return;
      result.checked++;const txId=String(r[0]||''),classification=coreClassifyTransactionState_(txId),row=i+2,ledgerRef={sheet:ledger,row:row,txId:txId};
      if(classification.status==='COMMITTED'){
        coreUpdateTransactionLinesStatus_(classification.lineBlock,'COMMITTED','Recovered by V10.7 reconciliation');
        coreLedgerFinish_(ledgerRef,'COMMITTED',null,classification.after,'Recovered by V10.7 reconciliation',null);
        result.recoveredCommitted++;
      }else if(classification.status==='ROLLED_BACK'){
        coreUpdateTransactionLinesStatus_(classification.lineBlock,'ROLLED_BACK','Recovered by V10.7 reconciliation');
        coreLedgerFinish_(ledgerRef,'ROLLED_BACK',null,classification.before,'Recovered by V10.7 reconciliation',null);
        result.recoveredRolledBack++;
      }else{
        coreUpdateTransactionLinesStatus_(classification.lineBlock,'NEEDS_RECONCILIATION',classification.reason);
        coreLedgerFinish_(ledgerRef,'NEEDS_RECONCILIATION',null,classification.actual,classification.reason,null);
        coreAppendReconciliation_(ledgerRef,classification.reason,{before:classification.before,after:classification.after,actual:classification.actual,voucherFound:classification.voucherFound,mismatches:classification.mismatches||[]});
        result.needsReconciliation++;
      }
      result.items.push({txId:txId,from:status,to:classification.status,reason:classification.reason});
    });
    if(result.recoveredCommitted>0){try{corePostCommitDerivedSyncV105_();}catch(e){}}
    result.ok=result.needsReconciliation===0;
    clearDashboardCache();
    return result;
  }finally{lock.releaseLock();}
}

function getTransactionHealth() {return auditTransactionHealth();}



// ===== END 31_Transaction_Ledger_V2.gs =====


// ===== BEGIN 32_Transfer.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 32_Transfer.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function ensureTransferSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(DASHBOARD_CONFIG.TRANSFER_SHEET);
  const headers = [
    'NGÀY','MÃ ĐIỀU CHUYỂN','PHIẾU XUẤT','PHIẾU NHẬP','KHO NGUỒN','KHO ĐÍCH',
    'MÃ HÀNG','TÊN HÀNG','ĐVT','SỐ LƯỢNG','TỒN NGUỒN TRƯỚC','TỒN NGUỒN SAU',
    'TỒN ĐÍCH TRƯỚC','TỒN ĐÍCH SAU','NGƯỜI THỰC HIỆN','GHI CHÚ','TRẠNG THÁI',
    'CREATED_AT','TRANSACTION_ID'
  ];
  if (!sheet) sheet = ss.insertSheet(DASHBOARD_CONFIG.TRANSFER_SHEET);
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const current = headerRange.getDisplayValues()[0];
  if (current.join('|') !== headers.join('|')) {
    headerRange.setValues([headers])
      .setBackground('#1F4E78').setFontColor('#FFFFFF').setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getTransferHistory(payload) {
  payload = payload || {};
  const sheet = ensureTransferSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {rows: [], total: 0, loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')};
  const values = sheet.getRange(2, 1, lastRow - 1, 19).getValues();
  const query = normalize_(payload.query || '');
  const limit = Math.max(1, Math.min(1000, Math.floor(toNumber_(payload.limit) || 300)));
  let rows = values.map(function(row, index) {
    const dateKey = dateKey_(row[0]);
    return {
      sheetRow: index + 2,
      date: dateKey ? displayDate_(dateKey) : String(row[0] || '').trim(),
      dateKey: dateKey,
      transferId: String(row[1] || '').trim(),
      issueVoucher: String(row[2] || '').trim(),
      receiptVoucher: String(row[3] || '').trim(),
      sourceWarehouse: String(row[4] || '').trim(),
      destinationWarehouse: String(row[5] || '').trim(),
      code: String(row[6] || '').trim(),
      name: String(row[7] || '').trim(),
      unit: String(row[8] || '').trim(),
      qty: toNumber_(row[9]),
      sourceBefore: toNumber_(row[10]), sourceAfter: toNumber_(row[11]),
      destinationBefore: toNumber_(row[12]), destinationAfter: toNumber_(row[13]),
      person: String(row[14] || '').trim(), note: String(row[15] || '').trim(),
      status: String(row[16] || '').trim(),
      createdAt: displayDateTime_(row[17]),
      transactionId: String(row[18] || '').trim()
    };
  }).filter(function(row) { return row.transferId && row.code; });

  if (query) {
    rows = rows.filter(function(row) {
      return normalize_([row.transferId,row.issueVoucher,row.receiptVoucher,row.code,row.name,row.person,row.note,row.status].join(' ')).indexOf(query) >= 0;
    });
  }
  rows.sort(function(a,b) {
    if (a.dateKey !== b.dateKey) return a.dateKey < b.dateKey ? 1 : -1;
    return b.sheetRow - a.sheetRow;
  });
  return {
    rows: rows.slice(0, limit), total: rows.length,
    loadedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')
  };
}

function previewWarehouseTransfer(payload) {
  payload = payload || {};
  const sourceWarehouse = String(payload.sourceWarehouse || '').trim();
  const destinationWarehouse = String(payload.destinationWarehouse || '').trim();
  const rawLines = Array.isArray(payload.lines) ? payload.lines : [];
  if (!((sourceWarehouse === '58' && destinationWarehouse === '145') || (sourceWarehouse === '145' && destinationWarehouse === '58'))) throw new Error('Hướng điều chuyển không hợp lệ.');
  if (!rawLines.length) throw new Error('Phiếu điều chuyển chưa có mặt hàng.');
  const ss58 = getSpreadsheet_();
  const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const stock58Sheet = ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const stock145Sheet = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  const output = [];
  const seen = {};
  rawLines.forEach(function(line) {
    const code = String(line && line.code || '').trim().toUpperCase();
    const qty = Math.floor(toNumber_(line && line.qty));
    if (!/^TD-\d{4}$/i.test(code)) throw new Error('Mã hàng không hợp lệ: ' + code);
    if (qty <= 0) throw new Error('Số lượng điều chuyển phải lớn hơn 0: ' + code);
    if (seen[normalize_(code)]) throw new Error('Mã ' + code + ' bị lặp trong cùng phiếu.');
    seen[normalize_(code)] = true;
    const ctx58 = getTransferTarget58_(stock58Sheet, code);
    const ctx145 = getTransferTarget145_(stock145Sheet, code);
    if (!ctx145) throw new Error(code + ' chưa có dòng map tại Kho 145.');
    const source = sourceWarehouse === '58' ? ctx58 : ctx145;
    const destination = destinationWarehouse === '58' ? ctx58 : ctx145;
    if (source.qty < qty) throw new Error(code + ': Kho ' + sourceWarehouse + ' chỉ còn ' + source.qty + ', không đủ để chuyển ' + qty + '.');
    output.push({code: code, name: ctx58.name, qty: qty, sourceBefore: source.qty, sourceAfter: source.qty - qty, destinationBefore: destination.qty, destinationAfter: destination.qty + qty});
  });
  return {sourceWarehouse: sourceWarehouse, destinationWarehouse: destinationWarehouse, lines: output, totalQty: output.reduce(function(sum,row){return sum + row.qty;},0), checkedAt: Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')};
}

function findTransferByRequestId_(sheet, requestId) {
  if (!sheet || !requestId) return null;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const values = sheet.getRange(2, 1, lastRow - 1, 19).getDisplayValues();
  const matched = values.filter(function(row) {
    return String(row[18] || '').indexOf(requestId + '-') === 0;
  });
  if (!matched.length) return null;
  const completed = matched.filter(function(row){ return String(row[16] || '').toUpperCase() === 'COMPLETED'; });
  const rows = completed.length ? completed : matched;
  return {
    status: completed.length ? 'COMPLETED' : String(rows[0][16] || '').toUpperCase(),
    transferId: String(rows[0][1] || ''), issueVoucher: String(rows[0][2] || ''), receiptVoucher: String(rows[0][3] || ''),
    sourceWarehouse: String(rows[0][4] || ''), destinationWarehouse: String(rows[0][5] || ''),
    lineCount: rows.length, totalQty: rows.reduce(function(sum,row){ return sum + toNumber_(row[9]); },0)
  };
}

function createWarehouseTransfer(payload) {
  payload=payload||{};
  coreRequirePermissionV109_('TRANSFER',payload.person||payload.actor||'','createWarehouseTransfer',(payload.sourceWarehouse||'')+'→'+(payload.destinationWarehouse||''));
  const sourceWarehouse=String(payload.sourceWarehouse||'').trim();
  const destinationWarehouse=String(payload.destinationWarehouse||'').trim();
  const person=String(payload.person||'').trim();
  const note=String(payload.note||'').trim();
  const requestId=String(payload.requestId||'').trim();
  const rawLines=Array.isArray(payload.lines)?payload.lines:[];
  if(!((sourceWarehouse==='58'&&destinationWarehouse==='145')||(sourceWarehouse==='145'&&destinationWarehouse==='58')))throw new Error('Hướng điều chuyển không hợp lệ.');
  if(!person)throw new Error('Vui lòng nhập người thực hiện.');
  if(!rawLines.length)throw new Error('Phiếu điều chuyển chưa có mặt hàng.');

  // Idempotency trước cả bước preview: double-click/retry không được phụ thuộc tồn sau lần ghi đầu.
  if(requestId){
    const existing=aiFindExecutedPreview_(requestId);
    if(existing){
      const ev=(existing.vouchers&&existing.vouchers[0])||{};
      return {success:true,idempotentReplay:true,transactionId:existing.transactionId||'',transferId:ev.voucher||ev.transferId||existing.voucher||'',issueVoucher:ev.issueVoucher||'',receiptVoucher:ev.receiptVoucher||'',sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,lineCount:ev.lineCount||rawLines.length,totalQty:ev.totalQty||0,verified:Boolean(existing.verified),createdAt:existing.createdAt||''};
    }
  }

  // V10.7: điều chuyển thủ công cũng đi qua cùng Transaction Engine với AI.
  // Preview ngoài lock chỉ dùng để dựng snapshot; aiExecuteBatchPreview_ sẽ fresh-read lại bên trong ScriptLock.
  const pre=previewWarehouseTransfer({sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,lines:rawLines});
  const previewId=requestId||('MANUAL-TRANSFER-'+Utilities.getUuid());
  const initialStock={};
  const lines=pre.lines.map(function(r){
    initialStock[sourceWarehouse+'|'+r.code]=toNumber_(r.sourceBefore);
    initialStock[destinationWarehouse+'|'+r.code]=toNumber_(r.destinationBefore);
    return {code:r.code,name:r.name,unit:r.unit||'',qty:r.qty,before:r.sourceBefore,after:r.sourceAfter,destinationBefore:r.destinationBefore,destinationAfter:r.destinationAfter};
  });
  const txPreview={
    ready:true,
    batch:true,
    previewId:previewId,
    transactionDate:dateKey_(new Date()),
    command:'Điều chuyển kho thủ công '+sourceWarehouse+' → '+destinationWarehouse,
    model:'MANUAL_TRANSFER',
    slipCount:1,
    lineCount:lines.length,
    totalQty:pre.totalQty,
    initialStock:initialStock,
    slips:[{
      slipNo:'1',operation:'TRANSFER',sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,
      warehouse:'',actor:person,counterparty:'Kho '+destinationWarehouse,note:note,lines:lines
    }]
  };
  const res=aiExecuteBatchPreview_(txPreview);
  const v=(res.vouchers&&res.vouchers[0])||{};
  return {
    success:true,
    idempotentReplay:Boolean(res.alreadyExecuted),
    transactionId:res.transactionId||'',
    transferId:v.voucher||v.transferId||res.voucher||'',
    issueVoucher:v.issueVoucher||'',
    receiptVoucher:v.receiptVoucher||'',
    sourceWarehouse:sourceWarehouse,
    destinationWarehouse:destinationWarehouse,
    lineCount:v.lineCount||lines.length,
    totalQty:v.totalQty||pre.totalQty,
    verified:Boolean(res.verified),
    createdAt:res.createdAt||Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')
  };
}

function getTransferTarget58_(sheet, code) {
  const lastRow = sheet.getLastRow();
  if (lastRow < DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW) throw new Error('Kho 58 chưa có dữ liệu.');
  const values = sheet.getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW, 1, lastRow - DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + 1, 8).getValues();
  const matches = [];
  values.forEach(function(row, index) {
    if (normalize_(row[1]) === normalize_(code)) {
      matches.push({
        warehouse: '58', sheet: sheet, row: DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + index,
        code: String(row[1] || '').trim(), name: String(row[2] || '').trim(), unit: normalizeUnitValue_(row[3], String(row[2] || '').trim()),
        qty: toNumber_(row[4]), threshold: String(row[5] ?? '').trim() === '' ? 2 : Math.max(0, toNumber_(row[5])),
        originalQty: toNumber_(row[4]), originalStatus: String(row[6] || '').trim(), originalNote: String(row[7] || '').trim()
      });
    }
  });
  if (matches.length !== 1) throw new Error(code + ': Kho 58 phải có đúng 1 dòng mã hàng, hiện có ' + matches.length + '.');
  return matches[0];
}

function getTransferTarget145_(sheet, code) {
  const lastRow = sheet.getLastRow();
  if (lastRow < WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW) return null;
  const values = sheet.getRange(WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW, 1, lastRow - WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + 1, 10).getValues();
  const matches = [];
  values.forEach(function(row, index) {
    if (normalize_(row[WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN - 1]) === normalize_(code)) {
      matches.push({
        warehouse: '145', sheet: sheet, row: WAREHOUSE_145_CONFIG.STOCK_FIRST_DATA_ROW + index,
        code: String(row[WAREHOUSE_145_CONFIG.MASTER_CODE_COLUMN - 1] || '').trim(),
        legacyName: String(row[WAREHOUSE_145_CONFIG.NAME_COLUMN - 1] || '').trim(),
        name: String(row[WAREHOUSE_145_CONFIG.MASTER_NAME_COLUMN - 1] || row[WAREHOUSE_145_CONFIG.NAME_COLUMN - 1] || '').trim(),
        unit: normalizeUnitValue_(row[WAREHOUSE_145_CONFIG.UNIT_COLUMN - 1], String(row[WAREHOUSE_145_CONFIG.NAME_COLUMN - 1] || '').trim()),
        qty: toNumber_(row[WAREHOUSE_145_CONFIG.QTY_COLUMN - 1]),
        originalQty: toNumber_(row[WAREHOUSE_145_CONFIG.QTY_COLUMN - 1]),
        originalDayIn: toNumber_(row[WAREHOUSE_145_CONFIG.DAY_IN_COLUMN - 1]),
        originalDayOut: toNumber_(row[WAREHOUSE_145_CONFIG.DAY_OUT_COLUMN - 1])
      });
    }
  });
  if (!matches.length) return null;
  if (matches.length > 1) throw new Error(code + ': Kho 145 có ' + matches.length + ' dòng cùng map. Hãy xử lý mapping trùng trước khi điều chuyển.');
  return matches[0];
}

function writeTransferStock_(target, newQty, movement, todayKey) {
  if (target.warehouse === '58') {
    target.sheet.getRange(target.row, 5).setValue(newQty);
    target.sheet.getRange(target.row, 7).setValue(statusOf_(newQty, target.threshold));
    return;
  }
  target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.QTY_COLUMN).setValue(newQty);
  const reportDate = readWarehouse145Date_(target.sheet);
  if (reportDate && reportDate === todayKey) {
    if (movement === 'IN') {
      target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.DAY_IN_COLUMN).setValue(target.originalDayIn + (newQty - target.originalQty));
    } else if (movement === 'OUT') {
      target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.DAY_OUT_COLUMN).setValue(target.originalDayOut + (target.originalQty - newQty));
    }
  }
}

function restoreTransferStock_(target) {
  if (!target || !target.sheet) return;
  if (target.warehouse === '58') {
    target.sheet.getRange(target.row, 5).setValue(target.originalQty);
    target.sheet.getRange(target.row, 7).setValue(target.originalStatus || statusOf_(target.originalQty, target.threshold));
    target.sheet.getRange(target.row, 8).setValue(target.originalNote || '');
  } else {
    target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.QTY_COLUMN).setValue(target.originalQty);
    target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.DAY_IN_COLUMN).setValue(target.originalDayIn);
    target.sheet.getRange(target.row, WAREHOUSE_145_CONFIG.DAY_OUT_COLUMN).setValue(target.originalDayOut);
  }
}

function nextTransferSequence_(dateStamp, ss58, ss145, transferSheet) {
  let maxValue = 0;
  function scanVouchers_(sheet, startRow, column) {
    if (!sheet) return;
    const lastRow = sheet.getLastRow();
    if (lastRow < startRow) return;
    const values = sheet.getRange(startRow, column, lastRow - startRow + 1, 1).getDisplayValues();
    values.forEach(function(row) {
      const text = String(row[0] || '').trim();
      const re = new RegExp('(?:PXK|PNK|DCK|KK)-' + dateStamp + '-(\\d{1,4})(?:\\.\\d+)?', 'i');
      const m = text.match(re);
      if (m) maxValue = Math.max(maxValue, parseInt(m[1], 10) || 0);
    });
  }
  scanVouchers_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET), 5, 2);
  scanVouchers_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET), 5, 2);
  scanVouchers_(ss58.getSheetByName(DASHBOARD_CONFIG.PENDING_SHEET), 2, 2);
  scanVouchers_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET), 2, 2);
  scanVouchers_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET), 2, 2);
  scanVouchers_(transferSheet, 2, 2);
  return maxValue + 1;
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.



// ===== END 32_Transfer.gs =====


// ===== BEGIN 40_AI_Inventory.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 40_AI_Inventory.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function executeAiInventoryPreview(payload) {
  payload = payload || {};
  const previewId = String(payload.previewId || '').trim();
  if (!previewId) throw new Error('Thiếu mã preview AI.');
  const already = aiFindExecutedPreview_(previewId);
  if (already) return Object.assign({alreadyExecuted:true},already);
  const cached = CacheService.getScriptCache().get('AI_PREVIEW_' + previewId);
  if (!cached) throw new Error('Bản xem trước đã hết hạn. Hãy bấm Phân tích lại lệnh.');
  let preview;
  try { preview = JSON.parse(cached); } catch(e) { throw new Error('Preview AI không hợp lệ.'); }
  if (!preview.ready || !Array.isArray(preview.slips) || !preview.slips.length) throw new Error('Preview chưa sẵn sàng để thực hiện.');
  const opPermission={IN:'INVENTORY_IN',OUT:'INVENTORY_OUT',TRANSFER:'TRANSFER',ADJUST:'ADJUST'};
  preview.slips.forEach(function(slip){const perm=opPermission[String(slip.operation||'').toUpperCase()]||'ADJUST';coreRequirePermissionV109_(perm,slip.actor||'', 'executeAiInventoryPreview', 'Phiếu '+String(slip.slipNo||'')+' '+String(slip.operation||''));});

  try {
    // aiExecuteBatchPreview_ giữ ScriptLock xuyên suốt kiểm tra idempotency → ghi → audit COMMIT.
    // Vì vậy double-click / callback lặp không thể ghi cùng preview hai lần.
    const result = aiExecuteBatchPreview_(preview);
    const stored = Object.assign({success:true,previewId:previewId},result);
    CacheService.getScriptCache().remove('AI_PREVIEW_' + previewId);
    clearDashboardCache();
    return stored;
  } catch (error) {
    const msg = String(error && error.message ? error.message : error);
    aiAudit_({previewId:previewId,command:preview.command,operation:'BATCH_'+preview.slipCount,warehouse:'',actor:'',status:'BLOCKED_EXECUTION_ROLLED_BACK',result:msg,model:preview.model || aiGetModel_()});
    throw new Error('AI xác nhận KHÔNG GHI SỔ. ' + msg + ' Mọi thay đổi của batch đã được chặn hoặc rollback; hãy Phân tích lại trước khi thử tiếp.');
  }
}

function getAiAssistantStatus() {
  const props = PropertiesService.getScriptProperties();
  const key = String(props.getProperty(AI_CONFIG.API_KEY_PROPERTY) || '').trim();
  const model = String(props.getProperty(AI_CONFIG.MODEL_PROPERTY) || AI_CONFIG.DEFAULT_MODEL).trim();
  return {
    configured: Boolean(key),
    model: model,
    chatModel: typeof aiGetChatModel_ === 'function' ? aiGetChatModel_() : model,
    reasoning: 'medium',
    chatReasoning: 'medium',
    appVersion: APP_VERSION,
    ruleset: CORE_V105_CONFIG.RULESET_VERSION,
    architecture: 'Agent V3 → Security RBAC V10.9 → Proactive Live Analytics → Rule Engine → Document Sequence → Transaction Ledger V2 → Post-write Audit',
    agentVersion: AI_AGENT_CONFIG.VERSION,
    transactionVersion: TRANSACTION_V107_CONFIG.VERSION,
    maxToolRounds: AI_AGENT_CONFIG.MAX_TOOL_ROUNDS,
    message: key ? 'AI Agent V10.9 · RBAC + Audit đã sẵn sàng.' : 'Chưa cấu hình OPENAI_API_KEY trong Script Properties.'
  };
}

function getAiRecentCommands(payload) {
  payload = payload || {};
  const limit = Math.max(1, Math.min(12, Number(payload.limit || 8)));
  const sheet = ensureAiAuditSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {rows:[], total:0};
  const start = Math.max(2, lastRow - 249);
  const values = sheet.getRange(start, 1, lastRow - start + 1, 9).getDisplayValues();
  const seen = {};
  const rows = [];
  function label_(status) {
    status = String(status || '').toUpperCase();
    if (status === 'EXECUTED') return 'ĐÃ GHI';
    if (status === 'PREVIEW') return 'ĐÃ PHÂN TÍCH';
    if (status === 'NEW_SKU_CREATED_NO_STOCK') return 'ĐÃ TẠO MÃ';
    if (status === 'NO_WRITE_CONFIRMED') return 'KHÔNG GHI';
    if (status.indexOf('BLOCKED') >= 0) return 'BỊ CHẶN';
    return status || '—';
  }
  for (let i = values.length - 1; i >= 0 && rows.length < limit; i--) {
    const row = values[i];
    const command = String(row[2] || '').trim();
    if (!command) continue;
    const key = command.replace(/\s+/g, ' ').toLowerCase();
    if (seen[key]) continue;
    seen[key] = true;
    const compact = command.replace(/\s+/g, ' ').trim();
    rows.push({
      time:String(row[0] || ''),
      previewId:String(row[1] || ''),
      command:command,
      commandShort:compact.length > 110 ? compact.slice(0, 107) + '...' : compact,
      operation:String(row[3] || ''),
      warehouse:String(row[4] || ''),
      actor:String(row[5] || ''),
      status:String(row[6] || ''),
      statusLabel:label_(row[6])
    });
  }
  return {rows:rows, total:rows.length};
}

function aiAudit_(entry) {
  try {
    const sheet = ensureAiAuditSheet_();
    sheet.appendRow([
      new Date(),
      String(entry.previewId || ''),
      String(entry.command || '').slice(0, AI_CONFIG.MAX_COMMAND_LENGTH),
      String(entry.operation || ''),
      String(entry.warehouse || ''),
      String(entry.actor || ''),
      String(entry.status || ''),
      String(entry.result || '').slice(0, 4500),
      String(entry.model || '')
    ]);
    sheet.getRange(sheet.getLastRow(),1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  } catch (e) {}
}

function aiFindExecutedPreview_(previewId) {
  if (!previewId) return null;
  try {
    const fast = CacheService.getScriptCache().get('AI_EXECUTED_' + previewId);
    if (fast) return JSON.parse(fast);
  } catch (e) {}
  const sheet = ensureAiAuditSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const start = Math.max(2, lastRow - 499);
  const values = sheet.getRange(start, 1, lastRow - start + 1, 9).getDisplayValues();
  for (let i = values.length - 1; i >= 0; i--) {
    const row = values[i];
    if (String(row[1] || '') !== previewId) continue;
    if (String(row[6] || '').toUpperCase() !== 'EXECUTED') continue;
    try { return JSON.parse(String(row[7] || '')); } catch (e) {
      return {success:true, alreadyExecuted:true, message:'Lệnh này đã được thực hiện trước đó.'};
    }
  }
  return null;
}

function aiInventoryPreview(payload) {
  throw new Error('[V10.5] Luồng parser cũ đã khóa để tránh resolve SKU hai lần. Hãy dùng Trợ lý AI dạng chat / aiChatTurn().');
}

function aiNormalizeActionPlan_(plan) {
  plan = plan && typeof plan === 'object' ? plan : {};
  const out = {transaction_date:String(plan.transaction_date || ''), slips:[]};
  const slips = Array.isArray(plan.slips) ? plan.slips : [];
  out.slips = slips.slice(0,50).map(function(s,si){
    const lines = Array.isArray(s.lines) ? s.lines : [];
    return {
      slip_no:String(s.slip_no || (si+1)),
      operation:String(s.operation || '').toUpperCase(),
      warehouse:String(s.warehouse || ''),
      source_warehouse:String(s.source_warehouse || ''),
      destination_warehouse:String(s.destination_warehouse || ''),
      actor_hint:String(s.actor_hint || ''),
      counterparty:String(s.counterparty || ''),
      note:String(s.note || ''),
      clarification:String(s.clarification || ''),
      lines:lines.slice(0,100).map(function(l){
        return {
          item_text:String(l.item_text || ''),
          source_excerpt:String(l.source_excerpt || ''),
          requested_code:String(l.requested_code || '').toUpperCase(),
          quantity:Math.max(0,Math.floor(toNumber_(l.quantity))),
          target_quantity:Math.floor(toNumber_(l.target_quantity)),
          force_new_sku:Boolean(l.force_new_sku)
        };
      })
    };
  });
  return out;
}

function aiApplyDeterministicPlanGuards_(message, plan) {
  plan = aiNormalizeActionPlan_(plan);
  const lines=[];
  plan.slips.forEach(function(s){(s.lines||[]).forEach(function(l){lines.push(l);});});
  // Nếu chính dòng/source_excerpt nói tạo mã mới thì backend ép NEW_SKU cho dòng đó.
  // Với batch chỉ có 1 dòng, câu lệnh tổng thể "tạo mã mới" cũng được áp dụng.
  // requested_code do model tự đoán luôn bị xóa khi force_new_sku=true.
  lines.forEach(function(line){
    const localRequest = aiMessageRequestsNewSku_([line.source_excerpt,line.item_text].join(' '));
    const globalSingleRequest = lines.length===1 && aiMessageRequestsNewSku_(message);
    if (localRequest || globalSingleRequest) {
      line.force_new_sku=true;
      line.requested_code='';
    }
  });
  return plan;
}

function aiCheckActionPlanConsistency_(message, plan, currentDraft) {
  plan = aiNormalizeActionPlan_(plan);
  const allLines = [];
  plan.slips.forEach(function(s,si){(s.lines||[]).forEach(function(l,li){allLines.push({line:l,slipIndex:si,lineIndex:li});});});
  if (!allLines.length) return {ok:false,reason:'AI chưa tạo action_plan có dòng hàng.',searchQuery:''};

  const contextText = [String(message||''), JSON.stringify(currentDraft || {})].join(' ');
  const contextModels = aiStrongModelTokens_(contextText);
  const latestModels = aiStrongModelTokens_(message);
  const latestBrand = aiLastBrand_(message);

  // Trường hợp 1 dòng: model/hãng mới nhất phải được giữ nguyên tuyệt đối.
  if (allLines.length === 1) {
    const l = allLines[0].line;
    const identity = [l.item_text,l.source_excerpt,l.requested_code].join(' ');
    const identityModels = aiStrongModelTokens_(identity);
    const missing = latestModels.filter(function(t){return identityModels.indexOf(t)<0;});
    if (missing.length) return {ok:false,reason:'Action plan đã làm mất/đổi model: '+missing.join(', '),searchQuery:latestModels[0]||''};
    const planBrand = aiLastBrand_(identity);
    if (latestBrand && planBrand && latestBrand !== planBrand) return {ok:false,reason:'Action plan đổi hãng '+latestBrand+' thành '+planBrand+'.',searchQuery:[latestBrand,latestModels[0]||''].join(' ').trim()};
    if (aiMessageRequestsNewSku_(message) && !l.requested_code && !l.force_new_sku) {
      return {ok:false,reason:'Người dùng yêu cầu tạo mã mới nhưng action plan chưa bật force_new_sku.',searchQuery:l.item_text};
    }
  }

  // Mọi dòng: source_excerpt là "dấu vân tay" identity. Không cho model/hãng/variant
  // trong item_text lệch khỏi đoạn nguồn mà AI vừa trích từ hội thoại.
  for (let i=0;i<allLines.length;i++) {
    const l = allLines[i].line;
    const source = String(l.source_excerpt || '').trim();
    const item = String(l.item_text || '').trim();
    const sourceModels = aiStrongModelTokens_(source);
    const itemModels = aiStrongModelTokens_(item);
    const invented = itemModels.filter(function(t){return contextModels.length && contextModels.indexOf(t)<0;});
    if (invented.length) return {ok:false,reason:'Action plan phát sinh model không có trong hội thoại: '+invented.join(', '),searchQuery:''};
    const lostFromSource = sourceModels.filter(function(t){return itemModels.indexOf(t)<0;});
    if (lostFromSource.length) return {ok:false,reason:'Action plan đổi model so với source_excerpt: '+lostFromSource.join(', '),searchQuery:sourceModels[0]||''};

    const srcBrand = aiLastBrand_(source), itemBrand = aiLastBrand_(item);
    if (srcBrand && itemBrand && srcBrand !== itemBrand) return {ok:false,reason:'Action plan đổi hãng trong dòng '+(i+1)+': '+srcBrand+' → '+itemBrand+'.',searchQuery:[srcBrand,sourceModels[0]||''].join(' ').trim()};
    const srcKind = aiProductKind_(source), itemKind = aiProductKind_(item);
    if (srcKind && itemKind && srcKind !== itemKind) return {ok:false,reason:'Action plan đổi loại hàng trong dòng '+(i+1)+'.',searchQuery:source};
    const srcVariants = aiVariantTokens_(source), itemVariants = aiVariantTokens_(item);
    const lostVariants = srcVariants.filter(function(v){return itemVariants.indexOf(v)<0;});
    if (lostVariants.length) return {ok:false,reason:'Action plan làm mất phiên bản '+lostVariants.join(', ')+' ở dòng '+(i+1)+'.',searchQuery:source};
  }
  return {ok:true,reason:'',searchQuery:''};
}

function aiInventoryPreviewFromActionPlan_(payload) {
  payload = payload || {};
  let plan = aiNormalizeActionPlan_(payload.plan);
  const command = String(payload.command || payload.sourceMessage || '').trim();
  const sourceMessage = String(payload.sourceMessage || command).trim();
  const defaultWarehouse = String(payload.defaultWarehouse || '58') === '145' ? '145' : '58';
  const actorInput = String(payload.actor || '').trim();

  plan = aiApplyDeterministicPlanGuards_(sourceMessage || command, plan);
  const planRules = coreValidateActionPlanV105_(plan,{actor:actorInput,defaultWarehouse:defaultWarehouse,sourceMessage:sourceMessage});
  if (!planRules.ok) {
    return aiBlockedResponse_({command:command,sourceMessage:sourceMessage,defaultWarehouse:defaultWarehouse,actorInput:actorInput,transactionDate:dateKey_(new Date()),slips:[],exceptions:planRules.failures.map(function(r){return {type:'RULE_BLOCK',ruleId:r.ruleId,slipNo:'',itemText:'',message:'['+r.ruleId+'] '+r.message,candidates:[]};}),plan:plan});
  }

  const rawSlips = plan.slips || [];
  if (!rawSlips.length) {
    return aiBlockedResponse_({command:command,sourceMessage:sourceMessage,defaultWarehouse:defaultWarehouse,actorInput:actorInput,transactionDate:dateKey_(new Date()),slips:[],exceptions:[{type:'UNKNOWN_COMMAND',ruleId:'R03',slipNo:'',itemText:'',message:'AI chưa dựng được phiếu có cấu trúc; chưa ghi sổ.',candidates:[]}],plan:plan});
  }

  const transactionDate = aiExtractCommandDate_(sourceMessage) || aiExtractCommandDate_(command) || aiNormalizeDateKey_(plan.transaction_date) || dateKey_(new Date());
  const catalog = aiBuildCatalog_();
  const unresolved = [], slips = [];
  const totalPlanLines = rawSlips.reduce(function(sum,s){return sum+(s.lines||[]).length;},0);

  rawSlips.forEach(function(rawSlip, slipIndex){
    const slipNo = String(rawSlip.slip_no || (slipIndex+1));
    const operation = String(rawSlip.operation || '').toUpperCase();
    if (['IN','OUT','ADJUST','TRANSFER'].indexOf(operation)<0) {
      unresolved.push({type:'UNKNOWN_OPERATION',ruleId:'R49',slipNo:slipNo,itemText:'Phiếu '+slipNo,message:rawSlip.clarification||'Chưa xác định loại tác vụ.',candidates:[],planSlipIndex:slipIndex}); return;
    }
    let warehouse=String(rawSlip.warehouse||''),sourceWarehouse=String(rawSlip.source_warehouse||''),destinationWarehouse=String(rawSlip.destination_warehouse||'');
    if(operation!=='TRANSFER'){
      if(warehouse!=='58'&&warehouse!=='145') warehouse=defaultWarehouse;
    } else if(!((sourceWarehouse==='58'&&destinationWarehouse==='145')||(sourceWarehouse==='145'&&destinationWarehouse==='58'))){
      unresolved.push({type:'TRANSFER_DIRECTION',ruleId:'R18',slipNo:slipNo,itemText:'Phiếu '+slipNo,message:'Chuyển kho phải có hướng 58→145 hoặc 145→58.',candidates:[],planSlipIndex:slipIndex}); return;
    }
    const actor=actorInput||String(rawSlip.actor_hint||'').trim();
    if(!actor){unresolved.push({type:'MISSING_ACTOR',ruleId:'R20',slipNo:slipNo,itemText:'Phiếu '+slipNo,message:'Thiếu người thực hiện.',candidates:[],planSlipIndex:slipIndex});return;}
    const rawLines=Array.isArray(rawSlip.lines)?rawSlip.lines:[];
    if(!rawLines.length){unresolved.push({type:'MISSING_LINES',ruleId:'R03',slipNo:slipNo,itemText:'Phiếu '+slipNo,message:'Chưa có mặt hàng.',candidates:[],planSlipIndex:slipIndex});return;}

    const resolved=[];
    rawLines.forEach(function(line,lineIndex){
      const itemText=String(line.item_text||'').trim();
      const requestedCode=String(line.requested_code||'').trim().toUpperCase();
      const sourceExcerpt=String(line.source_excerpt||'').trim();
      // V10.5: source_excerpt/tin nhắn gốc là identity fingerprint. item_text chỉ là diễn giải của AI.
      const identityText=(sourceExcerpt || itemText || requestedCode).trim();
      const forceNew=Boolean(line.force_new_sku) || (!requestedCode && totalPlanLines===1 && aiMessageRequestsNewSku_(sourceMessage));
      let match=null;

      // Bảo vệ identity: nếu item_text có model/hãng khác source_excerpt thì block trước khi resolve.
      if(sourceExcerpt && itemText){
        const srcModels=aiStrongModelTokens_(sourceExcerpt), itemModels=aiStrongModelTokens_(itemText);
        const srcBrands=aiBrandTokens_(sourceExcerpt), itemBrands=aiBrandTokens_(itemText);
        const modelChanged=srcModels.length && itemModels.length && !srcModels.some(function(m){return itemModels.indexOf(m)>=0;});
        const brandChanged=srcBrands.length && itemBrands.length && !srcBrands.some(function(b){return itemBrands.indexOf(b)>=0;});
        if(modelChanged || brandChanged){
          unresolved.push({type:'ACTION_PLAN_IDENTITY_CHANGED',ruleId:'R11',slipNo:slipNo,itemText:identityText,operation:operation,warehouse:warehouse,message:'AI đã làm thay đổi hãng/model so với câu người dùng. CHƯA GHI SỔ.',canCreateNew:false,candidates:[],planSlipIndex:slipIndex,planLineIndex:lineIndex,sourceExcerpt:sourceExcerpt});
          return;
        }
      }

      if(requestedCode){
        match=coreResolveSkuIdentityV105_(requestedCode+' '+identityText,catalog);
        if(!match.resolved){
          unresolved.push({type:'CODE_IDENTITY_MISMATCH',ruleId:match.ruleId||'R11',slipNo:slipNo,itemText:identityText||requestedCode,code:requestedCode,operation:operation,warehouse:warehouse,sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,message:'Mã '+requestedCode+' không khớp identity gốc. AI xác nhận CHƯA GHI SỔ.',candidates:match.candidates||[],planSlipIndex:slipIndex,planLineIndex:lineIndex,sourceExcerpt:sourceExcerpt});
          return;
        }
      } else if(forceNew){
        // Nếu người dùng nói rõ tạo mã mới, chỉ tái sử dụng mã cũ khi tên/identity exact tuyệt đối.
        const exact=coreResolveSkuIdentityV105_(identityText,catalog);
        if(exact.resolved && ['EXACT_CODE','EXACT_NAME_OR_ALIAS','EXACT_MODEL'].indexOf(exact.reason)>=0 && normalize_(exact.item.name)===normalize_(itemText || identityText)){
          match=exact;
        } else {
          unresolved.push({type:'NEW_SKU',ruleId:'R13',slipNo:slipNo,itemText:itemText||identityText,operation:operation,warehouse:warehouse,sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,message:'Người dùng yêu cầu tạo mã mới. AI xác nhận CHƯA GHI SỔ cho đến khi tạo TD-xxxx mới.',canCreateNew:true,candidates:exact.candidates||[],planSlipIndex:slipIndex,planLineIndex:lineIndex,sourceExcerpt:identityText});
          return;
        }
      } else {
        match=coreResolveSkuIdentityV105_(identityText,catalog);
        if(!match.resolved){
          const candidates=match.candidates||[];
          const isNew=match.reason==='MODEL_NOT_FOUND'||match.reason==='VARIANT_NOT_FOUND'||!candidates.length||aiLooksLikeNewModel_(identityText,candidates);
          unresolved.push({type:isNew?'NEW_SKU':'AMBIGUOUS_SKU',ruleId:isNew?'R13':(match.ruleId||'R46'),slipNo:slipNo,itemText:itemText||identityText,operation:operation,warehouse:warehouse,sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,message:isNew?'Không có model/SKU chính xác trong danh mục chuẩn. Không tự ghép sang model gần giống.':'Có nhiều SKU phù hợp; cần chọn đúng mã hoặc tạo mã mới.',canCreateNew:true,candidates:candidates,planSlipIndex:slipIndex,planLineIndex:lineIndex,sourceExcerpt:identityText});
          return;
        }
      }

      let qty=Math.floor(toNumber_(line.quantity));
      const targetQty=Math.floor(toNumber_(line.target_quantity));
      if(operation!=='ADJUST'&&qty<=0) qty=aiInferQuantityFromCommand_(sourceMessage||command,identityText,slipNo,rawLines.length);
      if(operation==='ADJUST'){
        if(targetQty<0){unresolved.push({type:'INVALID_ADJUST',ruleId:'R08',slipNo:slipNo,itemText:identityText,message:'Điều chỉnh tồn phải có tồn mới không âm.',candidates:[{code:match.item.code,name:match.item.name}],planSlipIndex:slipIndex,planLineIndex:lineIndex});return;}
        resolved.push({code:match.item.code,name:match.item.name,quantity:0,targetQuantity:targetQty,itemText:identityText,sourceExcerpt:identityText,resolverReason:match.reason,resolverConfidence:Number(match.confidence||0),resolverVersion:String(match.resolverVersion||AI_RESOLVER_CONFIG.VERSION)});
      }else{
        if(qty<=0){unresolved.push({type:'INVALID_QTY',ruleId:'R46',slipNo:slipNo,itemText:identityText,message:'Thiếu số lượng lớn hơn 0.',candidates:[{code:match.item.code,name:match.item.name}],planSlipIndex:slipIndex,planLineIndex:lineIndex});return;}
        resolved.push({code:match.item.code,name:match.item.name,quantity:qty,targetQuantity:-1,itemText:identityText,sourceExcerpt:identityText,resolverReason:match.reason,resolverConfidence:Number(match.confidence||0),resolverVersion:String(match.resolverVersion||AI_RESOLVER_CONFIG.VERSION)});
      }
    });

    if(resolved.length){
      slips.push({slipNo:slipNo,operation:operation,warehouse:warehouse,sourceWarehouse:sourceWarehouse,destinationWarehouse:destinationWarehouse,actor:actor,counterparty:String(rawSlip.counterparty||'').trim(),note:String(rawSlip.note||'').trim(),lines:aiDeduplicateResolvedLines_(resolved,operation)});
    }
  });

  if(unresolved.length||slips.length!==rawSlips.length){
    return aiBlockedResponse_({command:command,sourceMessage:sourceMessage,defaultWarehouse:defaultWarehouse,actorInput:actorInput,transactionDate:transactionDate,slips:slips,exceptions:unresolved,plan:plan});
  }
  try{
    const preview=aiBuildBatchLivePreview_({transactionDate:transactionDate,command:command,slips:slips});
    preview.planVersion='RULE_ENGINE_V105';
    preview.ruleSet=CORE_V105_CONFIG.RULESET_VERSION;
    preview.actionPlan=plan;
    return aiStoreReadyPreview_(preview,command);
  }catch(error){
    if(error&&error.aiBlocked)return aiBlockedResponse_({command:command,sourceMessage:sourceMessage,defaultWarehouse:defaultWarehouse,actorInput:actorInput,transactionDate:transactionDate,slips:slips,exceptions:[Object.assign({ruleId:error.aiBlocked.ruleId||'R08'},error.aiBlocked)],plan:plan});
    throw error;
  }
}

function aiValidateParsedIdentityAgainstCommand_(command, parsed) {
  const slips=Array.isArray(parsed&&parsed.slips)?parsed.slips:[];
  const issues=[];
  slips.forEach(function(s,si){
    const no=String(s.slip_no||(si+1));
    const segment=aiSlipSegment_(command,no);
    const segmentModels=aiStrongModelTokens_(segment);
    const lines=Array.isArray(s.lines)?s.lines:[];
    lines.forEach(function(l,li){
      const text=String(l.item_text||'');
      const lineModels=aiStrongModelTokens_(text);
      const invented=lineModels.filter(function(t){return segmentModels.length&&segmentModels.indexOf(t)<0;});
      if(invented.length)issues.push({slipNo:no,lineIndex:li,itemText:text,invented:invented,segmentModels:segmentModels});
    });
  });
  return {ok:issues.length===0,issues:issues};
}

function aiThrowBlocked_(details) {
  details = details || {};
  const error = new Error(String(details.message || 'AI xác nhận CHƯA GHI SỔ do dữ liệu chưa đủ điều kiện.'));
  error.aiBlocked = details;
  throw error;
}

function aiBlockedResponse_(ctx) {
  ctx = ctx || {};
  const blockedId = Utilities.getUuid();
  const exceptions = Array.isArray(ctx.exceptions) ? ctx.exceptions : [];
  const cachePayload = {
    blockedId:blockedId,
    command:String(ctx.command || ''),
    sourceMessage:String(ctx.sourceMessage || ''),
    defaultWarehouse:String(ctx.defaultWarehouse || '58'),
    actorInput:String(ctx.actorInput || ''),
    transactionDate:String(ctx.transactionDate || dateKey_(new Date())),
    slips:Array.isArray(ctx.slips) ? ctx.slips : [],
    exceptions:exceptions,
    parsed:ctx.parsed || null,
    plan:ctx.plan || null,
    createdAt:new Date().getTime()
  };
  CacheService.getScriptCache().put('AI_BLOCKED_' + blockedId, JSON.stringify(cachePayload), AI_CONFIG.PREVIEW_TTL_SECONDS);
  aiAudit_({
    previewId:blockedId,command:cachePayload.command,operation:'BLOCKED_NO_WRITE',warehouse:'',actor:cachePayload.actorInput,
    status:'BLOCKED_NO_WRITE',result:JSON.stringify({exceptions:exceptions}),model:aiGetModel_()
  });
  exceptions.forEach(function(ex){
    coreLogRuleAuditV105_({ruleId:ex.ruleId||'R49',result:'BLOCKED',refId:blockedId,slipNo:ex.slipNo||'',code:ex.code||'',message:ex.message||ex.type||'',actor:cachePayload.actorInput,metadata:{type:ex.type||'',itemText:ex.itemText||'',candidates:ex.candidates||[]}});
  });
  return {
    ready:false,writeBlocked:true,aiConfirmedNoWrite:true,blockedId:blockedId,
    transactionDate:cachePayload.transactionDate,transactionDateDisplay:aiDisplayDateKey_(cachePayload.transactionDate),
    clarification:'AI xác nhận CHƯA GHI SỔ. Không có thay đổi nào được ghi vào tồn kho hoặc nhật ký cho đến khi anh xử lý ngoại lệ và xác nhận lại.',
    exceptions:exceptions,unresolved:exceptions,createdAt:Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss')
  };
}

function aiStoreReadyPreview_(preview, command) {
  const previewId = Utilities.getUuid();
  preview.previewId = previewId;
  preview.model = aiGetModel_();
  preview.command = String(command || preview.command || '');
  preview.createdAt = Utilities.formatDate(new Date(), DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm:ss');
  CacheService.getScriptCache().put('AI_PREVIEW_' + previewId, JSON.stringify(preview), AI_CONFIG.PREVIEW_TTL_SECONDS);
  aiAudit_({
    previewId:previewId,command:preview.command,operation:preview.slipCount > 1 ? 'BATCH_' + preview.slipCount : preview.slips[0].operation,
    warehouse:preview.slips.map(function(x){return x.operation === 'TRANSFER' ? x.sourceWarehouse + '→' + x.destinationWarehouse : x.warehouse;}).join(' | '),
    actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'PREVIEW',
    result:JSON.stringify({transactionDate:preview.transactionDate,slips:preview.slips.map(function(x){return {slipNo:x.slipNo,operation:x.operation,lineCount:x.lines.length};})}),
    model:preview.model
  });
  return preview;
}

function aiNormalizeStockUnits() {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSpreadsheet_().getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
    if (!sheet) throw new Error('Không tìm thấy TONKHO.');
    const lastRow = sheet.getLastRow();
    if (lastRow < DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW) return {updated:0,total:0};
    const range = sheet.getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW, 2, lastRow - DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + 1, 3);
    const rows = range.getValues();
    let updated = 0;
    rows.forEach(function(row) {
      const code = String(row[0] || '').trim();
      const name = String(row[1] || '').trim();
      if (!/^TD-/i.test(code) || !name) return;
      const next = inferUnitFromName_(name);
      if (String(row[2] || '').trim() !== next) { row[2] = next; updated++; }
    });
    range.setValues(rows);
    SpreadsheetApp.flush();
    clearDashboardCache();
    return {updated:updated,total:rows.filter(function(r){return /^TD-/i.test(String(r[0]||''));}).length,message:'Đã chuẩn hóa ĐVT theo loại hàng.'};
  } finally { lock.releaseLock(); }
}

function aiGetBlockedContext_(blockedId) {
  blockedId = String(blockedId || '').trim();
  if (!blockedId) throw new Error('Thiếu mã ngoại lệ AI.');
  const raw = CacheService.getScriptCache().get('AI_BLOCKED_' + blockedId);
  if (!raw) throw new Error('Xác nhận ngoại lệ đã hết hạn. Hãy Phân tích lại lệnh.');
  try { return JSON.parse(raw); } catch(e) { throw new Error('Dữ liệu ngoại lệ AI không hợp lệ.'); }
}

function aiCreateNewSkuFromBlocked(payload) {
  payload = payload || {};
  coreRequirePermissionV109_('CREATE_SKU',payload.actor||payload.person||'','aiCreateNewSkuFromBlocked',String(payload.blockedId||''));
  const blocked = aiGetBlockedContext_(payload.blockedId);
  const index = Math.floor(toNumber_(payload.exceptionIndex));
  const ex = (blocked.exceptions || [])[index];
  if (!ex || !ex.canCreateNew || ['NEW_SKU','AMBIGUOUS_SKU'].indexOf(String(ex.type || '')) < 0) throw new Error('Ngoại lệ này không hỗ trợ tạo mã mới.');
  const name = String(ex.itemText || '').trim();
  if (!name) throw new Error('Tên hàng mới đang trống.');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = getSpreadsheet_();
    const sheet = ss.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
    const stock = readStock_(sheet);
    let existing = stock.find(function(x){return normalize_(x.name) === normalize_(name);});
    let code='', unit='', created=false;
    if (existing) {
      code=existing.code; unit=existing.unit; created=false;
    } else {
      let maxCode = 0, maxStt = 0;
      stock.forEach(function(x){
        const m = String(x.code || '').toUpperCase().match(/^TD-(\d{4})$/); if (m) maxCode = Math.max(maxCode, parseInt(m[1],10));
        maxStt = Math.max(maxStt, Math.floor(toNumber_(x.stt || 0)));
      });
      const next = maxCode + 1;
      if (next > 9999) throw new Error('Đã hết dải mã TD-xxxx.');
      code = 'TD-' + String(next).padStart(4,'0');
      const row = sheet.getLastRow() + 1;
      unit = inferUnitFromName_(name);
      sheet.getRange(row,1,1,11).setValues([[maxStt+1,code,name,unit,0,2,'HẾT HÀNG','Tạo bởi Trợ lý AI · chưa phát sinh tồn','','','']]);
      sheet.getRange(row,5,1,2).setNumberFormat('0');
      sheet.getRange(row,9,1,2).setNumberFormat('#,##0');
      // Mã mới phải có công thức giá trị tồn ngay từ lúc tạo; không để J = 0 cố định.
      // Locale vi_VN của file dùng dấu chấm phẩy trong công thức.
      sheet.getRange(row,DASHBOARD_CONFIG.VALUE_COLUMN).setFormula('=IF(OR(E'+row+'="";I'+row+'="");0;E'+row+'*I'+row+')').setNumberFormat('#,##0');
      const metaSheet = ensureMasterMetaSheet_();
      const metaRow = metaSheet.getLastRow()+1;
      metaSheet.getRange(metaRow,1,1,MASTER_META_CONFIG.TOTAL_COLUMNS).setValues([[code,name,'','','','', 'Tạo bởi Trợ lý AI · mã mới chờ vận hành',new Date(),false,'']]);
      metaSheet.getRange(metaRow,8).setNumberFormat('dd/MM/yyyy HH:mm');
      metaSheet.getRange(metaRow,9).insertCheckboxes();
      SpreadsheetApp.flush();
      created=true;
      corePostCommitDerivedSyncV105_();
      clearDashboardCache();
      coreLogRuleAuditV105_({ruleId:'R13',result:'USER_CONFIRMED_NEW_SKU',refId:blocked.blockedId,code:code,message:'Tạo SKU mới '+code+' với tồn 0.',actor:blocked.actorInput,metadata:{name:name,unit:unit}});
      aiAudit_({previewId:blocked.blockedId,command:blocked.command,operation:'CREATE_NEW_SKU',warehouse:'58',actor:blocked.actorInput,status:'NEW_SKU_CREATED_NO_STOCK',result:JSON.stringify({code:code,name:name,unit:unit}),model:aiGetModel_()});
    }

    let preview=null;
    if (blocked.plan && Number.isInteger(ex.planSlipIndex) && Number.isInteger(ex.planLineIndex)) {
      const plan=JSON.parse(JSON.stringify(blocked.plan));
      const line=plan.slips[ex.planSlipIndex] && plan.slips[ex.planSlipIndex].lines[ex.planLineIndex];
      if (line) {
        line.requested_code=code;
        line.force_new_sku=false;
        line.item_text=code+' '+name;
        preview=aiInventoryPreviewFromActionPlan_({plan:plan,command:blocked.command,sourceMessage:blocked.sourceMessage||blocked.command,actor:blocked.actorInput,defaultWarehouse:blocked.defaultWarehouse});
      }
    }
    CacheService.getScriptCache().remove('AI_BLOCKED_' + blocked.blockedId);
    return {success:true,created:created,code:code,name:name,unit:unit,command:blocked.command,preview:preview,message:(created?'Đã tạo mã mới ':'Đã tìm thấy mã hiện có ')+code+' · ĐVT: '+unit+'. Chưa ghi tồn nếu preview chưa được xác nhận.'};
  } finally { lock.releaseLock(); }
}

function aiResolveBlockedInventoryException(payload) {
  payload = payload || {};
  const blocked = aiGetBlockedContext_(payload.blockedId);
  const index = Math.floor(toNumber_(payload.exceptionIndex));
  const action = String(payload.action || '').toUpperCase();
  const ex = (blocked.exceptions || [])[index];
  if (!ex) throw new Error('Không tìm thấy ngoại lệ cần xử lý.');
  let slips = JSON.parse(JSON.stringify(blocked.slips || []));

  if (action === 'USE_AVAILABLE') {
    if (ex.type !== 'INSUFFICIENT_STOCK') throw new Error('Chỉ được dùng tồn hiện có với lỗi thiếu tồn.');
    const available = Math.floor(toNumber_(ex.available));
    if (available <= 0) throw new Error('Tồn hiện có bằng 0, không thể tiếp tục dòng này.');
    const slip = slips.find(function(s){return String(s.slipNo) === String(ex.slipNo);});
    if (!slip) throw new Error('Không tìm thấy phiếu cần điều chỉnh.');
    const line = (slip.lines || []).find(function(l){return normalize_(l.code) === normalize_(ex.code);});
    if (!line) throw new Error('Không tìm thấy dòng hàng cần điều chỉnh.');
    line.quantity = available;
  } else if (action === 'SKIP_SLIP') {
    slips = slips.filter(function(s){return String(s.slipNo) !== String(ex.slipNo);});
    if (!slips.length) {
      CacheService.getScriptCache().remove('AI_BLOCKED_' + blocked.blockedId);
      aiAudit_({previewId:blocked.blockedId,command:blocked.command,operation:'BLOCKED_NO_WRITE',warehouse:'',actor:blocked.actorInput,status:'NO_WRITE_CONFIRMED',result:'Bỏ toàn bộ batch sau ngoại lệ',model:aiGetModel_()});
      return {ready:false,writeBlocked:true,aiConfirmedNoWrite:true,closed:true,clarification:'Đã bỏ phiếu. Batch không còn phiếu nào để ghi; AI xác nhận KHÔNG GHI SỔ.'};
    }
  } else {
    throw new Error('Quyết định ngoại lệ không hợp lệ.');
  }

  try {
    const preview = aiBuildBatchLivePreview_({transactionDate:blocked.transactionDate,command:blocked.command,slips:slips});
    CacheService.getScriptCache().remove('AI_BLOCKED_' + blocked.blockedId);
    return aiStoreReadyPreview_(preview, blocked.command);
  } catch(error) {
    if (error && error.aiBlocked) {
      return aiBlockedResponse_({command:blocked.command,defaultWarehouse:blocked.defaultWarehouse,actorInput:blocked.actorInput,transactionDate:blocked.transactionDate,slips:slips,exceptions:[error.aiBlocked],parsed:blocked.parsed,plan:blocked.plan,sourceMessage:blocked.sourceMessage});
    }
    throw error;
  }
}

function aiConfirmBlockedNoWrite(payload) {
  payload = payload || {};
  const blocked = aiGetBlockedContext_(payload.blockedId);
  CacheService.getScriptCache().remove('AI_BLOCKED_' + blocked.blockedId);
  aiAudit_({previewId:blocked.blockedId,command:blocked.command,operation:'BLOCKED_NO_WRITE',warehouse:'',actor:blocked.actorInput,status:'NO_WRITE_CONFIRMED',result:'Người dùng xác nhận không ghi sổ',model:aiGetModel_()});
  return {success:true,message:'Đã xác nhận không ghi sổ. Không có thay đổi tồn kho hoặc nhật ký.'};
}

function aiRegexEscape_(text) {
  return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function aiSlipSegment_(command, slipNo) {
  const text = String(command || '');
  const no = String(slipNo || '').trim();
  if (!no || !/^\d+$/.test(no)) return text;
  // Ưu tiên tách đúng đoạn 1/, 2/, 3/... để không lấy nhầm SL của phiếu khác.
  const re = new RegExp('(?:^|\\n)\\s*' + aiRegexEscape_(no) + '\\s*[\\/.)-]\\s*', 'im');
  const m = re.exec(text);
  if (!m) return text;
  const start = m.index + m[0].length;
  const rest = text.slice(start);
  const next = /\n\s*\d+\s*[\/.)-]\s*/m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

function aiInferQuantityFromCommand_(command, itemText, slipNo, lineCount) {
  const item = String(itemText || '').trim();
  if (!item) return 0;
  const segment = aiSlipSegment_(command, slipNo);
  const itemPattern = item.split(/\s+/).filter(Boolean).map(aiRegexEscape_).join('\\s+');
  if (!itemPattern) return 0;

  let m;
  // Dạng: \"1 Máy in Canon MF 241D...\", \"2 Mực in...\"
  m = new RegExp('(?:^|[,;:\\n])\\s*(\\d+)\\s+(?=' + itemPattern + ')', 'i').exec(segment);
  if (m) return Math.max(0, parseInt(m[1], 10) || 0);

  // Dạng: \"Máy in ... SL 1\", \"... số lượng 2\", \"... x 3\"
  m = new RegExp(itemPattern + '\\s*(?:[,;:-]?\\s*)(?:SL|SỐ\\s*LƯỢNG|SO\\s*LUONG|QTY|X)\\s*[:=]?\\s*(\\d+)', 'i').exec(segment);
  if (m) return Math.max(0, parseInt(m[1], 10) || 0);

  // Với phiếu chỉ có một mặt hàng, cho phép dạng ngắn ngay sau dấu hai chấm:
  // \"Nhập kho: 1 Máy in ...\". Chỉ dùng khi có đúng 1 line để tránh bắt nhầm.
  if (Number(lineCount || 0) === 1) {
    m = /(?:NHẬP\s*KHO|NHAP\s*KHO|XUẤT\s*KHO|XUAT\s*KHO|NHẬP|NHAP|XUẤT|XUAT)\s*[:：-]?\s*(\d+)\s+/i.exec(segment);
    if (m) return Math.max(0, parseInt(m[1], 10) || 0);
  }
  return 0;
}

function aiParseCommandWithOpenAI_(command, defaultWarehouse) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = String(props.getProperty(AI_CONFIG.API_KEY_PROPERTY) || '').trim();
  if (!apiKey) throw new Error('Chưa cấu hình OPENAI_API_KEY trong Apps Script → Project Settings → Script Properties.');
  const model = aiGetModel_();

  const lineSchema = {
    type:'object',additionalProperties:false,
    properties:{item_text:{type:'string'},quantity:{type:'integer',minimum:0},target_quantity:{type:'integer',minimum:-1}},
    required:['item_text','quantity','target_quantity']
  };
  const slipSchema = {
    type:'object',additionalProperties:false,
    properties:{
      slip_no:{type:'string'},
      operation:{type:'string',enum:['IN','OUT','ADJUST','TRANSFER','UNKNOWN']},
      warehouse:{type:'string',enum:['58','145','']},
      source_warehouse:{type:'string',enum:['58','145','']},
      destination_warehouse:{type:'string',enum:['58','145','']},
      actor_hint:{type:'string'},counterparty:{type:'string'},note:{type:'string'},clarification:{type:'string'},
      lines:{type:'array',items:lineSchema}
    },
    required:['slip_no','operation','warehouse','source_warehouse','destination_warehouse','actor_hint','counterparty','note','clarification','lines']
  };
  const schema = {
    type:'object',additionalProperties:false,
    properties:{transaction_date:{type:'string'},clarification:{type:'string'},slips:{type:'array',items:slipSchema}},
    required:['transaction_date','clarification','slips']
  };

  const instructions = [
    'Bạn là bộ phân tích lệnh cho ứng dụng quản lý kho Thành Đức. Chỉ trích xuất dữ liệu, KHÔNG tự thực hiện giao dịch.',
    'Một tin nhắn có thể chứa NHIỀU PHIẾU. Khi người dùng đánh số 1/, 2/, 3/ (hoặc 1., 2., 3.), MỖI SỐ THỨ TỰ LÀ MỘT PHIẾU LOGIC RIÊNG.',
    'Nhiều mặt hàng nằm trong cùng một số thứ tự vẫn thuộc CÙNG MỘT PHIẾU. Không tách mỗi mặt hàng thành một phiếu.',
    'Nếu đầu lệnh có ngày chung như NGÀY 10/9/2026 thì transaction_date=2026-09-10 và áp dụng cho toàn bộ phiếu, trừ khi một phiếu ghi ngày khác (trường hợp đó ghi clarification vì backend hiện dùng một ngày chung cho cả batch).',
    'Mỗi phiếu có thể độc lập là IN=nhập kho, OUT=xuất kho, ADJUST=đặt lại tồn kiểm kho, TRANSFER=chuyển giữa Kho 58 và Kho 145.',
    'Nếu IN/OUT/ADJUST không nói rõ kho, dùng kho mặc định: ' + defaultWarehouse + '.',
    'TRANSFER phải xác định rõ kho nguồn và kho đích; không tự suy đoán nếu hướng không rõ.',
    'Giữ NGUYÊN TUYỆT ĐỐI cụm mô tả mặt hàng trong item_text, đặc biệt mọi chữ số/model/hãng. HL-2361DN không được đổi thành HL-2321D; MF241D không được đổi thành model gần giống. Bao gồm mã TD nếu có và hậu tố WB, Whitebox, TOPZON, ES, ESTAR, NP, CH, INKVIET, PCS, NOBOX.',
    'IN/OUT/TRANSFER: quantity là số lượng tác vụ, target_quantity=-1. ADJUST: target_quantity là tồn mới, quantity=0.',
    'QUAN TRỌNG: số lượng có thể đứng TRƯỚC tên hàng. Ví dụ "Nhập kho: 1 Máy in Canon MF 241D" thì item_text="Máy in Canon MF 241D" và quantity=1. Tương tự "2 Hộp mực 12A" thì quantity=2. Không được bỏ qua con số đứng ngay trước tên hàng.',
    'actor_hint là người thực hiện của chính phiếu đó. Ví dụ cuối phiếu có “Thanh, xuất bán” thì actor_hint=Thanh và note=xuất bán.',
    'counterparty là NCC/khách/người nhận nếu câu lệnh nêu rõ. Ví dụ “xuất a Thành” có thể đặt counterparty=a Thành và note=xuất a Thành.',
    'Nếu một phiếu thiếu loại tác vụ, hàng, số lượng, người thực hiện hoặc hướng chuyển thì operation=UNKNOWN hoặc ghi câu hỏi ngắn trong clarification.',
    'Không tạo mã hàng mới, không tự đổi phiên bản SKU, không gộp các số thứ tự khác nhau thành một phiếu.',
    'Giữ đúng thứ tự phiếu như người dùng nhập.'
  ].join('\n');

  const body = {
    model:model,store:false,reasoning:{effort:'medium'},instructions:instructions,input:command,max_output_tokens:5000,
    text:{format:{type:'json_schema',name:'inventory_batch_command',strict:true,schema:schema}}
  };
  const response = UrlFetchApp.fetch(AI_CONFIG.API_URL, {
    method:'post',contentType:'application/json',headers:{Authorization:'Bearer ' + apiKey},payload:JSON.stringify(body),muteHttpExceptions:true
  });
  const status = response.getResponseCode();
  const text = response.getContentText();
  let json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('OpenAI trả dữ liệu không hợp lệ. HTTP ' + status); }
  if (status < 200 || status >= 300) {
    const msg = json && json.error && json.error.message ? json.error.message : text.slice(0,500);
    throw new Error('OpenAI API lỗi ' + status + ': ' + msg);
  }
  const outputText = aiExtractResponseText_(json);
  if (!outputText) throw new Error('OpenAI không trả nội dung phân tích.');
  try { return JSON.parse(outputText); } catch (e) { throw new Error('Không đọc được JSON phân tích từ OpenAI.'); }
}

function aiExtractCommandDate_(command) {
  const text = String(command || '');
  const m = text.match(/(?:ngày\s*)?(\d{1,2})\s*[\/\-]\s*(\d{1,2})\s*[\/\-]\s*(\d{4})/i);
  if (!m) return '';
  const d = parseInt(m[1],10), mo = parseInt(m[2],10), y = parseInt(m[3],10);
  if (!aiValidDateParts_(y,mo,d)) return '';
  return String(y).padStart(4,'0') + '-' + String(mo).padStart(2,'0') + '-' + String(d).padStart(2,'0');
}

function aiNormalizeDateKey_(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  let m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const y=+m[1],mo=+m[2],d=+m[3];
    if (aiValidDateParts_(y,mo,d)) return String(y).padStart(4,'0')+'-'+String(mo).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  }
  m = text.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const d=+m[1],mo=+m[2],y=+m[3];
    if (aiValidDateParts_(y,mo,d)) return String(y).padStart(4,'0')+'-'+String(mo).padStart(2,'0')+'-'+String(d).padStart(2,'0');
  }
  return '';
}

function aiValidDateParts_(y,mo,d) {
  if (y < 2000 || y > 2100 || mo < 1 || mo > 12 || d < 1 || d > 31) return false;
  const dt = new Date(y, mo-1, d, 12, 0, 0, 0);
  return dt.getFullYear() === y && dt.getMonth() === mo-1 && dt.getDate() === d;
}

function aiDateFromKey_(key) {
  const m = String(key || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return new Date();
  return new Date(+m[1], +m[2]-1, +m[3], 12, 0, 0, 0);
}

function aiDisplayDateKey_(key) {
  const m = String(key || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? m[3] + '/' + m[2] + '/' + m[1] : String(key || '');
}

function aiExtractResponseText_(json) {
  if (!json) return '';
  if (typeof json.output_text === 'string') return json.output_text;
  const output = Array.isArray(json.output) ? json.output : [];
  for (let i=0;i<output.length;i++) {
    const content = Array.isArray(output[i].content) ? output[i].content : [];
    for (let j=0;j<content.length;j++) {
      if (typeof content[j].text === 'string') return content[j].text;
    }
  }
  return '';
}

function aiGetModel_() {
  return String(PropertiesService.getScriptProperties().getProperty(AI_CONFIG.MODEL_PROPERTY) || AI_CONFIG.DEFAULT_MODEL).trim();
}

function aiBuildCatalog_() {
  const ss58 = getSpreadsheet_();
  const stock58 = readStock_(ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
  const meta = readMasterMeta_(ss58.getSheetByName(DASHBOARD_CONFIG.MASTER_META_SHEET));
  let raw145 = [];
  try {
    const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
    raw145 = readWarehouse145Raw_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET));
  } catch (e) {}
  const legacyByCode = {};
  raw145.forEach(function(row) {
    if (!row.masterCode) return;
    const k = normalize_(row.masterCode);
    if (!legacyByCode[k]) legacyByCode[k] = [];
    if (row.legacyName) legacyByCode[k].push(row.legacyName);
  });
  return stock58.map(function(item) {
    const m = meta.byCode[normalize_(item.code)] || {};
    const aliases = String(m.aliases || '').trim();
    const legacy = legacyByCode[normalize_(item.code)] || [];
    return {
      code:item.code,
      name:item.name,
      unit:item.unit || '',
      aliases:aliases,
      legacyNames:legacy,
      searchText:normalize_([item.code,item.name,aliases].concat(legacy).join(' | '))
    };
  });
}

function aiModelTokens_(text) {
  const raw = normalize_(text).toUpperCase();
  // Model/SKU kỹ thuật: HL-2361DN, MF 241D, BTD60BK, 83A, 12A...
  // QUAN TRỌNG: loại các cụm nghiệp vụ có số như "KHO 58", "PHIẾU 1", "SL 2"
  // vì chúng không phải model và từng làm consistency guard hiểu sai yêu cầu.
  const matches = [];
  (raw.match(/\b[A-Z]{1,8}\s*[-]?\s*\d{1,6}[A-Z0-9-]*\b/g) || []).forEach(function(x){matches.push(x);});
  (raw.match(/\b\d{2,6}[A-Z][A-Z0-9-]*\b/g) || []).forEach(function(x){matches.push(x);});
  const operationalPrefixes = /^(?:KHO|SL|SO|PHIEU|NGAY|THANG|NAM|DONG|LAN|MUC|PHAN|NHOM|CA|GIO|PHUT|BAN|NHAP|XUAT|TON|MUA|IN|TIEP|THEM|LAY|CON|HET|CAI|HOP|CHAI|MAY|BO|LOAI|MA)\d+[A-Z0-9-]*$/;
  const unique = Array.from(new Set(matches.map(aiCompactToken_).filter(function(t){
    if (!t || /^TD\d+$/.test(t)) return false;
    if (operationalPrefixes.test(t)) return false;
    return t.length >= 3;
  })));
  // HL-2361DN có thể sinh đồng thời HL2361DN và 2361DN; giữ token đầy đủ hơn.
  return unique.filter(function(t){if(/^\d/.test(t)) return true; return !unique.some(function(u){return u!==t && u.length>t.length && u.slice(-t.length)===t;});});
}

function aiBrandTokens_(text) {
  const n = ' ' + normalize_(text).replace(/[^a-z0-9]+/g,' ') + ' ';
  return ['brother','canon','epson','ricoh','xerox','oki','samsung','pantum','hp'].filter(function(b){
    return n.indexOf(' ' + b + ' ') >= 0;
  });
}

function aiStrongModelTokens_(text) {
  return aiModelTokens_(text).filter(function(t){
    // A4/A3 quá chung, không dùng làm khóa SKU. 12A/83A/HL2361DN/MF241D... đủ đặc trưng.
    return t.length >= 3 && !/^A[0-9]$/.test(t);
  });
}

function aiVariantTokens_(text) {
  const n = ' ' + normalize_(text) + ' ';
  const out = [];
  function add(v, re){ if (re.test(n) && out.indexOf(v)<0) out.push(v); }
  add('TOPZON', /\btopzon\b/);
  add('INKVIET', /\binkviet\b/);
  add('PCS', /\bpcs\b/);
  add('NOBOX', /\bnobox\b|\bno box\b/);
  add('WB', /\bwhitebox\b|\bwb\b/);
  add('NP', /\bnhat phong\b|\bnp\b/);
  add('ES', /\bestar\b|\bes\b/);
  add('CH', /\bchinh hang\b|\bch\b/);
  return out;
}

function aiProductKind_(text) {
  const n = normalize_(text);
  if (!n) return '';
  if (/^may in\b|\bmay in (brother|canon|epson|hp|ricoh|xerox|oki|samsung|pantum)\b/.test(n)) return 'MACHINE';
  if (/hop muc|phoi muc/.test(n)) return 'CARTRIDGE';
  if (/muc nap chai|muc nuoc|muc chuyen nhiet|nuoc ngam|\bgi ?-?\d|\bbt5000|\bbtd\d|\bepson (001|003|005|008|057|t664|t673|t774)|\bhp gt5/.test(n)) return 'INK_BOTTLE';
  if (/cum drum|cum trong/.test(n)) return 'DRUM_UNIT';
  if (/\bdrum\b|\btrong\b/.test(n)) return 'DRUM_PART';
  if (/ruy bang|ribbon/.test(n)) return 'RIBBON';
  if (/bao lua|rulo|gat |truc |chip|qua dao|ong say|dau phun/.test(n)) return 'PART';
  if (/day cap|day nguon/.test(n)) return 'CABLE';
  if (/xap giay|giay a4/.test(n)) return 'PAPER';
  if (/muc goi/.test(n)) return 'POWDER_BAG';
  if (/muc in|toner/.test(n)) return 'CARTRIDGE';
  return '';
}

function aiProductCondition_(text, kind) {
  if (kind !== 'MACHINE') return '';
  const n = normalize_(text);
  if (/da qua su dung|may cu|\bcu\b|thao may/.test(n)) return 'USED';
  if (/chinh hang|\bch\b|may moi|\bmoi\b/.test(n)) return 'NEW';
  return '';
}

function aiMessageRequestsNewSku_(text) {
  const n = normalize_(text);
  if (!n) return false;
  if (/khong\s+tao.*ma.*moi|khong\s+can.*ma.*moi/.test(n)) return false;
  return /tao\s+(?:ma\s+)?(?:hang\s+)?moi|tao\s+ma\s+hang\s+moi|hang\s+moi|chua\s+co\s+ma/.test(n);
}

function aiExactNameCandidate_(itemText, catalog) {
  const q = normalize_(itemText);
  if (!q) return null;
  return (catalog || []).find(function(x){return normalize_(x.name) === q;}) || null;
}

function aiCandidateIdentityCompatible_(raw, item) {
  const itemText = [item.name || '', item.aliases || ''].concat(item.legacyNames || []).join(' | ');
  const qModels = aiStrongModelTokens_(raw);
  const itemModels = aiStrongModelTokens_(itemText);
  if (qModels.length) {
    // Model là khóa cứng: phải có token model CHÍNH XÁC, không dùng substring hay model gần giống.
    const exactModel = qModels.some(function(t){ return itemModels.indexOf(t) >= 0; });
    if (!exactModel) return false;
  }

  const qBrands = aiBrandTokens_(raw);
  const itemBrands = aiBrandTokens_(itemText);
  if (qBrands.length && itemBrands.length && !qBrands.some(function(b){return itemBrands.indexOf(b)>=0;})) return false;

  const qKind = aiProductKind_(raw), itemKind = aiProductKind_(itemText);
  if (qKind && itemKind && qKind !== itemKind) return false;

  const qVariants = aiVariantTokens_(raw), itemVariants = aiVariantTokens_(itemText);
  if (qVariants.length && !qVariants.every(function(v){return itemVariants.indexOf(v)>=0;})) return false;

  const qCondition = aiProductCondition_(raw, qKind);
  const itemCondition = aiProductCondition_(itemText, itemKind);
  if (qCondition && itemCondition && qCondition !== itemCondition) return false;
  return true;
}

function aiLooksLikeNewModel_(itemText, candidates) {
  const tokens = aiStrongModelTokens_(itemText);
  if (!tokens.length) return false;
  const candidateCompact = aiCompactToken_((candidates || []).map(function(c){return String(c.name || '') + ' ' + String(c.code || '');}).join(' | '));
  // Nếu câu lệnh có model/mã đặc trưng mà không xuất hiện chính xác ở bất kỳ ứng viên nào,
  // coi là hàng mới thay vì ép ghép theo từ chung như "máy in", "đã qua sử dụng".
  return tokens.some(function(token){return candidateCompact.indexOf(token) < 0;});
}

function aiResolveItem_(itemText, catalog) {
  return coreResolveSkuIdentityV105_(itemText, catalog);
}

function aiScoreCandidate_(q, item) {
  const hay = item.searchText || '';
  const name = normalize_(item.name);
  const code = normalize_(item.code);
  if (q === code || q === name) return 1000;
  let score = 0;
  if (hay.indexOf(q) >= 0) score += 260;
  if (q.indexOf(name) >= 0 && name.length > 5) score += 170;
  const aliases = String(item.aliases || '').split(/[,;|\n]+/).map(normalize_).filter(Boolean);
  if (aliases.some(function(a){return a === q;})) score += 450;
  const tokens = q.split(' ').filter(function(t){return t.length >= 2;});
  if (!tokens.length) return score;
  let matched = 0;
  tokens.forEach(function(t){
    if (hay.split(' ').indexOf(t) >= 0 || hay.indexOf(t) >= 0) {
      matched++;
      score += /\d/.test(t) ? 34 : 18;
      if (['topzon','whitebox','wb','estar','es','np','ch','inkviet','pcs','nobox'].indexOf(t)>=0) score += 28;
    } else if (/\d/.test(t)) {
      score -= 55;
    }
  });
  const ratio = matched / tokens.length;
  score += Math.round(ratio * 100);
  if (ratio === 1) score += 90;
  ['hop muc','drum','trong','gat','rulo','bao lua','muc nap','may in','ruy bang','chip'].forEach(function(kind){
    if (q.indexOf(kind)>=0) score += name.indexOf(kind)>=0 ? 35 : -35;
  });
  return score;
}

function aiDeduplicateResolvedLines_(lines, operation) {
  const byCode = {};
  lines.forEach(function(line) {
    const k = normalize_(line.code);
    if (!byCode[k]) {
      byCode[k] = Object.assign({},line);
      return;
    }
    if (operation === 'ADJUST') {
      throw new Error(line.code + ' xuất hiện nhiều lần trong lệnh điều chỉnh tồn.');
    }
    byCode[k].quantity += line.quantity;
  });
  return Object.keys(byCode).map(function(k){return byCode[k];});
}

function aiBuildBatchLivePreview_(request) {
  const ss58 = getSpreadsheet_();
  const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const sheet58 = ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const sheet145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  const cache58 = {}, cache145 = {}, virtual = {}, initialStock = {};

  function target_(warehouse, code, slipNo, operation) {
    const k = normalize_(code);
    if (warehouse === '58') {
      if (!cache58[k]) cache58[k] = getTransferTarget58_(sheet58, code);
      if (!cache58[k]) aiThrowBlocked_({type:'MISSING_SKU',slipNo:slipNo||'',code:code,itemText:code,operation:operation||'',warehouse:'58',message:code + ' không còn trong danh mục Kho 58. AI xác nhận CHƯA GHI SỔ.'});
      return cache58[k];
    }
    if (!cache145[k]) cache145[k] = getTransferTarget145_(sheet145, code);
    if (!cache145[k]) aiThrowBlocked_({type:'MISSING_MAPPING',slipNo:slipNo||'',code:code,itemText:code,operation:operation||'',warehouse:'145',message:code + ' chưa có đúng 1 dòng mapping tại Kho 145. AI xác nhận CHƯA GHI SỔ; cần map trước khi thao tác.'});
    return cache145[k];
  }
  function key_(warehouse, code) { return warehouse + '|' + String(code).toUpperCase(); }
  function qty_(warehouse, code, slipNo, operation) {
    const key = key_(warehouse, code);
    if (!Object.prototype.hasOwnProperty.call(virtual,key)) {
      const t = target_(warehouse,code,slipNo,operation);
      virtual[key] = toNumber_(t.qty);
      initialStock[key] = toNumber_(t.qty);
    }
    return virtual[key];
  }
  function setQty_(warehouse, code, qty) { virtual[key_(warehouse,code)] = qty; }

  const slips = request.slips.map(function(slip) {
    const outLines = [];
    slip.lines.forEach(function(line) {
      if (slip.operation === 'TRANSFER') {
        target_('58',line.code,slip.slipNo,slip.operation); target_('145',line.code,slip.slipNo,slip.operation);
        const srcBefore = qty_(slip.sourceWarehouse,line.code,slip.slipNo,slip.operation);
        const dstBefore = qty_(slip.destinationWarehouse,line.code,slip.slipNo,slip.operation);
        if (srcBefore < line.quantity) aiThrowBlocked_({
          type:'INSUFFICIENT_STOCK',slipNo:slip.slipNo,code:line.code,itemText:line.itemText||line.name||line.code,
          operation:'TRANSFER',warehouse:slip.sourceWarehouse,sourceWarehouse:slip.sourceWarehouse,destinationWarehouse:slip.destinationWarehouse,
          available:srcBefore,requested:line.quantity,
          message:'Phiếu ' + slip.slipNo + ' · ' + line.code + ': Kho ' + slip.sourceWarehouse + ' chỉ còn ' + srcBefore + ', không đủ chuyển ' + line.quantity + '. AI xác nhận CHƯA GHI SỔ.'
        });
        const srcAfter = srcBefore - line.quantity, dstAfter = dstBefore + line.quantity;
        setQty_(slip.sourceWarehouse,line.code,srcAfter); setQty_(slip.destinationWarehouse,line.code,dstAfter);
        const t58 = target_('58',line.code,slip.slipNo,slip.operation);
        outLines.push({code:line.code,name:t58.name,unit:t58.unit,qty:line.quantity,before:srcBefore,after:srcAfter,destinationBefore:dstBefore,destinationAfter:dstAfter});
        return;
      }
      const t = target_(slip.warehouse,line.code,slip.slipNo,slip.operation);
      const before = qty_(slip.warehouse,line.code,slip.slipNo,slip.operation);
      let after = before, movementQty = 0;
      if (slip.operation === 'IN') { movementQty = line.quantity; after = before + movementQty; }
      if (slip.operation === 'OUT') {
        movementQty = line.quantity; after = before - movementQty;
        if (after < 0) aiThrowBlocked_({
          type:'INSUFFICIENT_STOCK',slipNo:slip.slipNo,code:line.code,itemText:line.itemText||line.name||line.code,
          operation:'OUT',warehouse:slip.warehouse,available:before,requested:movementQty,
          message:'Phiếu ' + slip.slipNo + ' · ' + line.code + ': tồn Kho ' + slip.warehouse + ' chỉ còn ' + before + ', không đủ xuất ' + movementQty + '. AI xác nhận CHƯA GHI SỔ.'
        });
      }
      if (slip.operation === 'ADJUST') {
        after = line.targetQuantity; movementQty = Math.abs(after-before);
        if (after < 0) aiThrowBlocked_({type:'INVALID_ADJUST',slipNo:slip.slipNo,code:line.code,itemText:line.itemText||line.name||line.code,operation:'ADJUST',warehouse:slip.warehouse,message:'Phiếu ' + slip.slipNo + ' · ' + line.code + ': tồn điều chỉnh không được âm. AI xác nhận CHƯA GHI SỔ.'});
      }
      setQty_(slip.warehouse,line.code,after);
      outLines.push({code:line.code,name:t.name || line.name,unit:t.unit,qty:movementQty,targetQuantity:slip.operation==='ADJUST'?after:null,before:before,after:after,delta:after-before});
    });
    return {
      slipNo:slip.slipNo,operation:slip.operation,operationLabel:aiOperationLabel_(slip.operation),warehouse:slip.warehouse || '',
      sourceWarehouse:slip.sourceWarehouse || '',destinationWarehouse:slip.destinationWarehouse || '',actor:slip.actor,
      counterparty:slip.counterparty,note:slip.note,lines:outLines,
      totalQty:outLines.reduce(function(sum,x){return sum + toNumber_(x.qty);},0)
    };
  });

  return {
    ready:true,batch:true,transactionDate:request.transactionDate,transactionDateDisplay:aiDisplayDateKey_(request.transactionDate),command:request.command,
    slipCount:slips.length,lineCount:slips.reduce(function(sum,s){return sum+s.lines.length;},0),
    totalQty:slips.reduce(function(sum,s){return sum+s.totalQty;},0),slips:slips,initialStock:initialStock
  };
}

function aiBuildLivePreview_(request) {
  const ss58 = getSpreadsheet_();
  const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
  const sheet58 = ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const sheet145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
  const op = request.operation;
  const lines = [];
  request.lines.forEach(function(line) {
    if (op === 'TRANSFER') {
      const c58 = getTransferTarget58_(sheet58,line.code);
      const c145 = getTransferTarget145_(sheet145,line.code);
      if (!c145) throw new Error(line.code + ' chưa có dòng mapping tại Kho 145 nên chưa thể chuyển kho.');
      const src = request.sourceWarehouse === '58' ? c58 : c145;
      const dst = request.destinationWarehouse === '58' ? c58 : c145;
      if (src.qty < line.quantity) throw new Error(line.code + ': Kho ' + request.sourceWarehouse + ' chỉ còn ' + src.qty + ', không đủ chuyển ' + line.quantity + '.');
      lines.push({code:line.code,name:c58.name,unit:c58.unit,qty:line.quantity,before:src.qty,after:src.qty-line.quantity,destinationBefore:dst.qty,destinationAfter:dst.qty+line.quantity});
      return;
    }
    const target = request.warehouse === '58' ? getTransferTarget58_(sheet58,line.code) : getTransferTarget145_(sheet145,line.code);
    if (!target) throw new Error(line.code + ' chưa có dòng mapping tại Kho 145 nên chưa thể thao tác.');
    let after = target.qty;
    let movementQty = 0;
    if (op === 'IN') { movementQty = line.quantity; after = target.qty + movementQty; }
    if (op === 'OUT') { movementQty = line.quantity; after = target.qty - movementQty; if (after < 0) throw new Error(line.code + ': tồn Kho ' + request.warehouse + ' chỉ còn ' + target.qty + ', không đủ xuất ' + movementQty + '.'); }
    if (op === 'ADJUST') { after = line.targetQuantity; movementQty = Math.abs(after - target.qty); if (after < 0) throw new Error('Tồn sau điều chỉnh không được âm.'); }
    lines.push({code:line.code,name:target.name || line.name,unit:target.unit,qty:movementQty,targetQuantity:op==='ADJUST'?after:null,before:target.qty,after:after,delta:after-target.qty});
  });
  return {
    ready:true,
    operation:op,
    operationLabel:aiOperationLabel_(op),
    warehouse:request.warehouse || '',
    sourceWarehouse:request.sourceWarehouse || '',
    destinationWarehouse:request.destinationWarehouse || '',
    actor:request.actor,
    counterparty:request.counterparty,
    note:request.note,
    command:request.command,
    lines:lines
  };
}

function aiOperationLabel_(op) {
  return ({IN:'NHẬP KHO',OUT:'XUẤT KHO',ADJUST:'ĐIỀU CHỈNH TỒN',TRANSFER:'CHUYỂN KHO'})[op] || op;
}

function aiExecuteBatchPreview_(preview) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  let ledger = null;
  const executedInsideLock = aiFindExecutedPreview_(preview && preview.previewId);
  if (executedInsideLock) {
    lock.releaseLock();
    return Object.assign({alreadyExecuted:true}, executedInsideLock);
  }

  const targetCache = {};
  const journalBlocks = [];
  let transferSheet = null, transferStartRow = 0, transferCount = 0;
  let txLinesBlock = null;
  let sequenceReservation = null;
  try {
    if (!preview || !preview.ready || !Array.isArray(preview.slips) || !preview.slips.length) throw coreRuleError_('R45','Preview không hợp lệ để commit.');
    ledger = coreLedgerBegin_(preview);

    const ss58 = getSpreadsheet_();
    const ss145 = SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);
    const stock58 = ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
    const stock145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    const journal58 = ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET);
    const journal145 = ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET);
    if (!stock58 || !stock145 || !journal58 || !journal145) throw coreRuleError_('R02','Thiếu sheet vận hành của một trong hai kho.');
    transferSheet = ensureTransferSheet_();

    function target_(warehouse, code) {
      const key = warehouse + '|' + String(code).toUpperCase();
      if (targetCache[key]) return targetCache[key];
      const t = warehouse === '58' ? getTransferTarget58_(stock58,code) : getTransferTarget145_(stock145,code);
      if (!t) throw coreRuleError_('R12',code + ': chưa có mapping duy nhất tại Kho 145.');
      targetCache[key] = t;
      return t;
    }

    // R01/R41: fresh-read tồn ngay bên trong lock, trước mọi write.
    Object.keys(preview.initialStock || {}).forEach(function(key) {
      const parts = key.split('|'), warehouse = parts[0], code = parts.slice(1).join('|');
      const t = target_(warehouse,code), expected = toNumber_(preview.initialStock[key]);
      if (toNumber_(t.qty) !== expected) throw coreRuleError_('R41',code + ': tồn Kho ' + warehouse + ' đã thay đổi từ ' + expected + ' thành ' + t.qty + '. Hãy Phân tích lại trước khi ghi.');
    });

    const transactionDate = aiNormalizeDateKey_(preview.transactionDate) || dateKey_(new Date());
    const txDateObj = aiDateFromKey_(transactionDate);
    const now = new Date();
    const dateStamp = transactionDate.replace(/-/g,'');
    sequenceReservation = coreReserveDocumentSequence_(transactionDate, preview.slips.length, ledger.txId, ss58, ss145, transferSheet);
    const startSequence = sequenceReservation.startSuffix;
    const virtual = {}, delta145In = {}, delta145Out = {}, latestNote58 = {};
    Object.keys(preview.initialStock || {}).forEach(function(k){virtual[k]=toNumber_(preview.initialStock[k]);});
    function key_(warehouse,code){return warehouse+'|'+String(code).toUpperCase();}
    function getQty_(warehouse,code){const k=key_(warehouse,code);if(!Object.prototype.hasOwnProperty.call(virtual,k))virtual[k]=toNumber_(target_(warehouse,code).qty);return virtual[k];}
    function setQty_(warehouse,code,q){virtual[key_(warehouse,code)]=q;}
    function add145Delta_(kind,code,qty){const k=key_('145',code),obj=kind==='IN'?delta145In:delta145Out;obj[k]=(obj[k]||0)+qty;}
    function note58_(code,text){latestNote58[key_('58',code)]=text;}

    const rows58 = [], rows145 = [], transferRows = [], vouchers = [], txLineDrafts = [];
    let totalQty = 0, lineCount = 0;

    preview.slips.forEach(function(slip, slipIndex) {
      const sequence = startSequence + slipIndex;
      const suffix = String(sequence).padStart(3,'0');
      const op = slip.operation;
      const prefix = op === 'IN' ? 'PNK' : (op === 'OUT' ? 'PXK' : (op === 'ADJUST' ? 'KK' : 'DCK'));
      const voucher = prefix + '-' + dateStamp + '-' + suffix;
      const issueVoucher = 'PXK-' + dateStamp + '-' + suffix;
      const receiptVoucher = 'PNK-' + dateStamp + '-' + suffix;
      const transferId = 'DCK-' + dateStamp + '-' + suffix;
      const slipResult = {slipNo:slip.slipNo,operation:op,voucher:op==='TRANSFER'?transferId:voucher,issueVoucher:op==='TRANSFER'?issueVoucher:'',receiptVoucher:op==='TRANSFER'?receiptVoucher:'',lineCount:slip.lines.length,totalQty:0};
      const reason = coreBusinessReasonV105_(op,slip.counterparty,slip.note);
      const counterparty = coreCounterpartyV105_(op,slip.counterparty,slip.note) || slip.actor;

      slip.lines.forEach(function(line, lineIndex) {
        lineCount++;
        if (op === 'TRANSFER') {
          const t58 = target_('58',line.code), t145 = target_('145',line.code);
          const srcWh=slip.sourceWarehouse,dstWh=slip.destinationWarehouse;
          const src=srcWh==='58'?t58:t145,dst=dstWh==='58'?t58:t145;
          const srcBefore=getQty_(srcWh,line.code),dstBefore=getQty_(dstWh,line.code),qty=Math.floor(toNumber_(line.qty));
          if (qty<=0) throw coreRuleError_('R46','Phiếu '+slip.slipNo+' · '+line.code+': số lượng chuyển không hợp lệ.');
          if (srcBefore<qty) throw coreRuleError_('R08','Phiếu '+slip.slipNo+' · '+line.code+': Kho '+srcWh+' còn '+srcBefore+', không đủ chuyển '+qty+'.');
          const srcAfter=srcBefore-qty,dstAfter=dstBefore+qty;
          setQty_(srcWh,line.code,srcAfter);setQty_(dstWh,line.code,dstAfter);
          if(srcWh==='145')add145Delta_('OUT',line.code,qty);else add145Delta_('IN',line.code,qty);
          totalQty+=qty;slipResult.totalQty+=qty;
          const txId=ledger.txId+'-S'+slip.slipNo+'-'+(lineIndex+1);
          transferRows.push([txDateObj,transferId,issueVoucher,receiptVoucher,srcWh,dstWh,line.code,t58.name,t58.unit||t145.unit||'Hàng hóa',qty,srcBefore,srcAfter,dstBefore,dstAfter,slip.actor,slip.note||'', 'PENDING',now,txId]);
          txLineDrafts.push(coreBuildTransactionLine_(ledger.txId,preview.previewId,slip.slipNo,lineIndex+1,issueVoucher,srcWh,'TRANSFER_OUT',line.code,t58.name,t58.unit||t145.unit||'Hàng hóa',qty,srcBefore,srcAfter,{transferId:transferId,destinationWarehouse:dstWh}));
          txLineDrafts.push(coreBuildTransactionLine_(ledger.txId,preview.previewId,slip.slipNo,lineIndex+1,receiptVoucher,dstWh,'TRANSFER_IN',line.code,t58.name,t58.unit||t145.unit||'Hàng hóa',qty,dstBefore,dstAfter,{transferId:transferId,sourceWarehouse:srcWh}));
          const is58Source=srcWh==='58';
          const note58 = corePersonnelNoteV105_('TRANSFER',slip.actor,transferId,APP_VERSION) + (slip.note?' · '+slip.note:'');
          rows58.push([txDateObj,is58Source?issueVoucher:receiptVoucher,is58Source?'XUẤT KHO':'NHẬP KHO',line.code,t58.name,t58.unit,is58Source?0:qty,is58Source?qty:0,is58Source?srcBefore:dstBefore,is58Source?srcAfter:dstAfter,'Kho '+(is58Source?dstWh:srcWh),is58Source?'Chuyển qua kho':'Nhập chuyển kho',note58]);
          note58_(line.code,is58Source?'Chuyển '+transferId+' sang Kho '+dstWh:'Nhập chuyển '+transferId+' từ Kho '+srcWh);
          const is145Source=srcWh==='145';
          rows145.push([txDateObj,is145Source?issueVoucher:receiptVoucher,is145Source?'XUẤT KHO':'NHẬP KHO',slip.actor,t145.legacyName,t145.unit||t58.unit,qty,['DIEU_CHUYEN_KHO',transferId,slip.note,'Tồn '+(is145Source?srcBefore:dstBefore)+' → '+(is145Source?srcAfter:dstAfter)].filter(Boolean).join(' | '),txId,'AI_'+APP_VERSION,transferId,'','POSTED',now]);
          return;
        }

        const wh=slip.warehouse,t=target_(wh,line.code),before=getQty_(wh,line.code);
        let after=before,qty=0,input=0,output=0;
        if(op==='IN'){
          qty=Math.floor(toNumber_(line.qty)); if(qty<=0) throw coreRuleError_('R46','Phiếu '+slip.slipNo+' · '+line.code+': số lượng nhập không hợp lệ.');
          after=before+qty; input=qty; if(wh==='145')add145Delta_('IN',line.code,qty);
        }
        if(op==='OUT'){
          qty=Math.floor(toNumber_(line.qty)); if(qty<=0) throw coreRuleError_('R46','Phiếu '+slip.slipNo+' · '+line.code+': số lượng xuất không hợp lệ.');
          if(before<qty) throw coreRuleError_('R08','Phiếu '+slip.slipNo+' · '+line.code+': Kho '+wh+' chỉ còn '+before+', không đủ xuất '+qty+'.');
          after=before-qty; output=qty; if(wh==='145')add145Delta_('OUT',line.code,qty);
        }
        if(op==='ADJUST'){
          after=Math.floor(toNumber_(line.after)); if(after<0) throw coreRuleError_('R08','Phiếu '+slip.slipNo+' · '+line.code+': tồn điều chỉnh không được âm.');
          qty=Math.abs(after-before); input=after>before?after-before:0; output=before>after?before-after:0;
          if(wh==='145'){if(input>0)add145Delta_('IN',line.code,input);if(output>0)add145Delta_('OUT',line.code,output);}
        }
        setQty_(wh,line.code,after);totalQty+=qty;slipResult.totalQty+=qty;
        txLineDrafts.push(coreBuildTransactionLine_(ledger.txId,preview.previewId,slip.slipNo,lineIndex+1,voucher,wh,op,line.code,t.name,t.unit,qty,before,after,{counterparty:counterparty,reason:reason}));
        if(wh==='58'){
          const personnelNote=corePersonnelNoteV105_(op,slip.actor,voucher,APP_VERSION);
          const journalNote=[personnelNote,slip.note].filter(Boolean).join(' · ');
          rows58.push([txDateObj,voucher,op==='IN'?'NHẬP KHO':(op==='OUT'?'XUẤT KHO':'KIỂM KHO'),line.code,t.name,t.unit,input,output,before,after,counterparty,reason,journalNote]);
          note58_(line.code,op==='IN'?'Nhập '+voucher:(op==='OUT'?'Xuất '+voucher:'Điều chỉnh '+voucher));
        } else {
          const txId=ledger.txId+'-S'+slip.slipNo+'-'+(lineIndex+1);
          rows145.push([txDateObj,voucher,op==='IN'?'NHẬP KHO':(op==='OUT'?'XUẤT KHO':'KIỂM KHO'),slip.actor,t.legacyName,t.unit,qty,[reason,counterparty?'Đối tượng: '+counterparty:'',slip.note,'Tồn '+before+' → '+after].filter(Boolean).join(' | '),txId,'AI_'+APP_VERSION,preview.previewId,'','POSTED',now]);
        }
      });
      vouchers.push(slipResult);
    });

    // R06/R09: toàn batch đã tính virtual xong nhưng chưa thay đổi tồn.
    coreAssertVouchersUnique_(vouchers, ss58, ss145, transferSheet);
    coreLedgerTransition_(ledger,'VALIDATED',vouchers,virtual,'',sequenceReservation);
    txLinesBlock=coreAppendTransactionLines_(txLineDrafts,'VALIDATED');
    coreLedgerTransition_(ledger,'COMMITTING',vouchers,virtual,'',sequenceReservation);
    coreUpdateTransactionLinesStatus_(txLinesBlock,'COMMITTING','');

    // R09: chỉ bắt đầu write sau khi toàn batch đã validate và ghi kế hoạch transaction.
    if (transferRows.length) {
      transferStartRow = transferSheet.getLastRow()+1; transferCount=transferRows.length;
      transferSheet.getRange(transferStartRow,1,transferRows.length,19).setValues(transferRows);
      transferSheet.getRange(transferStartRow,1,transferRows.length,1).setNumberFormat('dd/MM/yyyy');
      transferSheet.getRange(transferStartRow,18,transferRows.length,1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    }

    Object.keys(virtual).forEach(function(k){
      const parts=k.split('|'),wh=parts[0],code=parts.slice(1).join('|'),t=target_(wh,code),newQty=virtual[k];
      if(newQty<0) throw coreRuleError_('R08',code+': transaction tạo tồn âm.');
      if(wh==='58'){
        t.sheet.getRange(t.row,5).setValue(newQty);
        t.sheet.getRange(t.row,7).setValue(statusOf_(newQty,t.threshold));
        if(latestNote58[k]) t.sheet.getRange(t.row,8).setValue(latestNote58[k]);
      } else {
        t.sheet.getRange(t.row,WAREHOUSE_145_CONFIG.QTY_COLUMN).setValue(newQty);
        const reportDate=readWarehouse145Date_(t.sheet);
        if(reportDate===transactionDate){
          t.sheet.getRange(t.row,WAREHOUSE_145_CONFIG.DAY_IN_COLUMN).setValue(t.originalDayIn+(delta145In[k]||0));
          t.sheet.getRange(t.row,WAREHOUSE_145_CONFIG.DAY_OUT_COLUMN).setValue(t.originalDayOut+(delta145Out[k]||0));
        }
      }
    });
    SpreadsheetApp.flush();

    if(rows58.length){const start=journal58.getLastRow()+1;journal58.getRange(start,1,rows58.length,13).setValues(rows58);journal58.getRange(start,1,rows58.length,1).setNumberFormat('dd/MM/yyyy');journalBlocks.push({sheet:journal58,start:start,count:rows58.length,width:13});}
    if(rows145.length){const start=journal145.getLastRow()+1;journal145.getRange(start,1,rows145.length,14).setValues(rows145);journal145.getRange(start,1,rows145.length,1).setNumberFormat('dd/MM/yyyy');journal145.getRange(start,14,rows145.length,1).setNumberFormat('dd/MM/yyyy HH:mm:ss');journalBlocks.push({sheet:journal145,start:start,count:rows145.length,width:14});}
    SpreadsheetApp.flush();
    if(transferRows.length) transferSheet.getRange(transferStartRow,17,transferCount,1).setValue('COMPLETED');

    // R29-R32: các sheet dẫn xuất được tái tạo từ TONKHO live, không sửa chắp vá.
    const derived=corePostCommitDerivedSyncV105_();
    SpreadsheetApp.flush();

    // R38/R40: hậu kiểm tồn + chứng từ trước khi báo thành công.
    const verified=coreVerifyCommittedV105_(preview,vouchers);
    const committed = {success:true,batch:true,previewId:preview.previewId,transactionId:ledger.txId,transactionDate:transactionDate,transactionDateDisplay:aiDisplayDateKey_(transactionDate),slipCount:preview.slips.length,lineCount:lineCount,totalQty:totalQty,vouchers:vouchers,voucher:vouchers.length?vouchers[0].voucher:'',derived:derived,verified:true,createdAt:Utilities.formatDate(now,DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
    coreUpdateTransactionLinesStatus_(txLinesBlock,'COMMITTED','');
    coreLedgerFinish_(ledger,'COMMITTED',vouchers,verified.after,'',sequenceReservation);
    try { CacheService.getScriptCache().put('AI_EXECUTED_' + preview.previewId, JSON.stringify(committed), 21600); } catch(e) {}
    aiAudit_({previewId:preview.previewId,command:preview.command,operation:'BATCH_'+preview.slips.length,warehouse:preview.slips.map(function(x){return x.operation==='TRANSFER'?x.sourceWarehouse+'→'+x.destinationWarehouse:x.warehouse;}).join(' | '),actor:Array.from(new Set(preview.slips.map(function(x){return x.actor;}))).join(', '),status:'EXECUTED',result:JSON.stringify(committed),model:preview.model || aiGetModel_()});
    clearDashboardCache();
    return committed;
  } catch(error) {
    Object.keys(targetCache).forEach(function(k){try{restoreTransferStock_(targetCache[k]);}catch(e){}});
    journalBlocks.forEach(function(b){try{b.sheet.getRange(b.start,1,b.count,b.width).clearContent();}catch(e){}});
    try{if(transferSheet&&transferStartRow&&transferCount){transferSheet.getRange(transferStartRow,17,transferCount,1).setValue('ROLLED_BACK');const msg=String(error&&error.message?error.message:error);const vals=transferSheet.getRange(transferStartRow,16,transferCount,1).getDisplayValues().map(function(r){return [[r[0],'LỖI: '+msg].filter(Boolean).join(' · ')];});transferSheet.getRange(transferStartRow,16,transferCount,1).setValues(vals);}}catch(e){}
    try{corePostCommitDerivedSyncV105_();}catch(e){}
    const msg=String(error&&error.message?error.message:error);
    let rollbackCheck={ok:false,mismatches:[{message:'Không xác minh được rollback'}]};
    try{rollbackCheck=coreVerifyRollback_(targetCache);}catch(e){rollbackCheck={ok:false,mismatches:[{message:String(e&&e.message?e.message:e)}]};}
    const finalStatus=rollbackCheck.ok?'ROLLED_BACK':'NEEDS_RECONCILIATION';
    try{coreUpdateTransactionLinesStatus_(txLinesBlock,finalStatus,msg);}catch(e){}
    try{coreLedgerFinish_(ledger,finalStatus,[],rollbackCheck.ok?coreOriginalSnapshot_(targetCache):{},msg,sequenceReservation);}catch(e){}
    if(!rollbackCheck.ok){try{coreAppendReconciliation_(ledger,msg,rollbackCheck);}catch(e){}}
    clearDashboardCache();
    throw error;
  } finally { lock.releaseLock(); }
}

function aiExecuteMovement_(preview) {
  throw new Error('[V10.7] Luồng ghi đơn cũ đã khóa. Mọi giao dịch phải đi qua aiExecuteBatchPreview_ và Rule Engine.');
}

function aiGetChatModel_() {
  const props = PropertiesService.getScriptProperties();
  return String(props.getProperty(AI_CHAT_CONFIG.MODEL_PROPERTY) || AI_CHAT_CONFIG.DEFAULT_MODEL).trim();
}

function aiNormalizeCurrentDraft_(draft) {
  if (!draft || typeof draft !== 'object') return null;
  try {
    const out = {ready:Boolean(draft.ready), transactionDate:String(draft.transactionDate || ''), slips:[]};
    const slips = Array.isArray(draft.slips) ? draft.slips.slice(0,8) : [];
    out.slips = slips.map(function(s){
      return {
        slipNo:String(s.slipNo || ''), operation:String(s.operation || ''), warehouse:String(s.warehouse || ''),
        sourceWarehouse:String(s.sourceWarehouse || ''), destinationWarehouse:String(s.destinationWarehouse || ''),
        lines:(Array.isArray(s.lines)?s.lines.slice(0,20):[]).map(function(l){
          return {code:String(l.code || ''),name:String(l.name || l.itemText || ''),unit:String(l.unit || ''),qty:Number(l.qty || l.quantity || 0)};
        })
      };
    });
    return out;
  } catch(e) { return null; }
}

function aiCompactToken_(text) {
  return String(text || '').toUpperCase().replace(/[^A-Z0-9]/g,'');
}

function aiDistinctiveProductTokens_(text) {
  // Legacy helper now delegates to the same canonical tokenizer as SKU resolver.
  // Tránh hai bộ regex nhận diện model cho kết quả khác nhau.
  return aiStrongModelTokens_(text).filter(function(t){return t.length>=4;});
}

function aiLastBrand_(text) {
  const n = normalize_(text);
  const brands = ['brother','canon','epson','ricoh','xerox','oki','samsung','pantum','hp'];
  let best = '', pos = -1;
  brands.forEach(function(b){const p=n.lastIndexOf(b); if(p>pos){pos=p;best=b;}});
  return best;
}

function aiCheckDraftConsistency_(message, decision, currentDraft) {
  const proposed = String(decision && decision.proposed_command || '').trim();
  if (!decision || !decision.should_prepare || !proposed) return {ok:true,reason:'',searchQuery:''};
  const n = normalize_(message);
  const correction = Boolean(currentDraft) || /khong phai|sao van|toi can|doi thanh|sua lai|nham|chinh lai|y toi|thay bang/.test(n);
  if (!correction) return {ok:true,reason:'',searchQuery:''};

  const targetTokens = aiDistinctiveProductTokens_(message);
  const proposedCompact = aiCompactToken_(proposed);
  const missingTokens = targetTokens.filter(function(t){return proposedCompact.indexOf(t)<0;});
  if (missingTokens.length) {
    return {ok:false,reason:'proposed_command thiếu model/mã mới nhất: ' + missingTokens.join(', '),searchQuery:missingTokens[missingTokens.length-1]};
  }

  const latestBrand = aiLastBrand_(message);
  const proposedBrand = aiLastBrand_(proposed);
  if (latestBrand && proposedBrand && latestBrand !== proposedBrand) {
    return {ok:false,reason:'Thương hiệu trong draft ('+proposedBrand+') khác yêu cầu mới ('+latestBrand+').',searchQuery:latestBrand + ' ' + (targetTokens[targetTokens.length-1] || '')};
  }
  return {ok:true,reason:'',searchQuery:''};
}

function aiNormalizeChatHistory_(history) {
  const rows = Array.isArray(history) ? history : [];
  return rows.slice(-AI_CHAT_CONFIG.MAX_HISTORY).map(function(m) {
    const role = String(m && m.role || '').toLowerCase() === 'assistant' ? 'assistant' : 'user';
    const text = String(m && (m.content || m.text) || '').trim().slice(0, 2500);
    return {role:role, content:text};
  }).filter(function(m){return m.content;});
}

function aiRunChatTools_(requests, defaultWarehouse) {
  const out = [];
  const rows = Array.isArray(requests) ? requests.slice(0, AI_CHAT_CONFIG.MAX_TOOL_REQUESTS) : [];
  rows.forEach(function(r) {
    const type = String(r.type || '').toUpperCase();
    try {
      if (type === 'SEARCH_CATALOG') out.push({request:r,result:aiChatSearchCatalog_(r.query || r.code)});
      else if (type === 'GET_STOCK') out.push({request:r,result:aiChatGetStock_(r.code || r.query)});
      else if (type === 'GET_ITEM_HISTORY') out.push({request:r,result:aiChatItemHistoryV106_(r.code || r.query, r.warehouse || 'all', r.limit)});
      else if (type === 'GET_MOVEMENTS') out.push({request:r,result:aiChatMovementsRangeV106_(r.query, r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});
      else if (type === 'GET_OPERATIONAL_REPORT') out.push({request:r,result:aiChatOperationalReportV106_(r.warehouse || 'all')});
      else if (type === 'GET_PROACTIVE_REPORT') out.push({request:r,result:aiChatProactiveReport_(r.warehouse || 'all')});
      else if (type === 'GET_RECENT_VOUCHERS') out.push({request:r,result:aiChatRecentVouchersV106_(r.warehouse || defaultWarehouse, r.from_date, r.to_date, r.limit)});
      else if (type === 'GET_TODAY_MOVEMENTS') out.push({request:r,result:aiChatTodayMovements_(r.query, r.warehouse || defaultWarehouse)});
      else if (type === 'GET_TODAY_SUMMARY') out.push({request:r,result:aiChatTodaySummary_(r.warehouse || defaultWarehouse)});
    } catch(e) {
      out.push({request:r,error:String(e && e.message || e)});
    }
  });
  return out;
}



// ===== END 40_AI_Inventory.gs =====


// ===== BEGIN 41_AI_Agent_Chat.gs =====

// QL KHO THÀNH ĐỨC · V10.10.4 FUNCTION DECOMPOSITION
// Module: 41_AI_Agent_Chat.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function aiChatTurn(payload) {
  const req = aiPrepareChatRequest_(payload);
  const aliasResult = aiHandleExplicitAliasTurn_(req);
  if (aliasResult) return aliasResult;

  const loop = aiRunAgentReasoningLoop_(req);
  aiApplyLiveToolFailsafes_(req, loop);
  const prepared = aiPrepareActionPlanTurn_(req, loop);
  const preview = aiPrepareInventoryPreviewTurn_(req, loop, prepared);
  aiApplyBlockedPreviewReply_(loop.decision, preview);

  const nextState = aiBuildAgentStateV106_(req.agentState,req.message,loop.decision,loop.toolContext,preview,req.defaultWarehouse,[]);
  return aiBuildChatTurnResponse_(req, loop, prepared.plan, preview, nextState);
}

function aiPrepareChatRequest_(payload) {
  payload=payload||{};
  const message=String(payload.message||'').trim();
  const actor=String(payload.actor||'').trim();
  const defaultWarehouse=String(payload.defaultWarehouse||'58')==='145'?'145':'58';
  if(!message)throw new Error('Hãy nhập tin nhắn cho Trợ lý AI.');
  if(message.length>AI_CHAT_CONFIG.MAX_MESSAGE)throw new Error('Tin nhắn quá dài. Vui lòng rút gọn dưới '+AI_CHAT_CONFIG.MAX_MESSAGE+' ký tự.');
  return {payload:payload,message:message,actor:actor,defaultWarehouse:defaultWarehouse,history:aiNormalizeChatHistory_(payload.history),currentDraft:aiNormalizeCurrentDraft_(payload.currentDraft),agentState:aiNormalizeAgentStateV106_(payload.agentState)};
}

function aiHandleExplicitAliasTurn_(req) {
  const explicitAlias=aiTryExplicitAliasCommandV106_(req.message);
  if(!explicitAlias)return null;
  const savedAlias=aiSaveAliasExplicitV106_(explicitAlias.alias,explicitAlias.code,req.actor);
  const nextAliasState=aiBuildAgentStateV106_(req.agentState,req.message,null,[],null,req.defaultWarehouse,savedAlias.item?[savedAlias.item]:[]);
  return {reply:'Đã ghi nhớ “'+savedAlias.alias+'” = '+savedAlias.code+' · '+savedAlias.name+'. Từ lần sau mình sẽ dùng alias này để tra đúng SKU.',intent:'CHAT',confidence:100,needsUserAnswer:false,proposedCommand:'',actionPlan:{transaction_date:'',slips:[]},preview:null,toolContext:[],agentState:nextAliasState,agentVersion:AI_AGENT_CONFIG.VERSION,agentRounds:0,usedTools:['SAVE_ALIAS'],model:aiGetChatModel_(),serverTime:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
}

function aiRunAgentReasoningLoop_(req) {
  const state={toolContext:[],usedSignatures:{},usedTools:[],calls:0,decision:null};
  state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,state.toolContext,false,req.currentDraft,req.agentState,{round:0,maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
  state.calls++;
  for(let round=0;round<AI_AGENT_CONFIG.MAX_TOOL_ROUNDS;round++){
    const requests=aiUniqueToolRequestsV106_(aiApplyToolReferencesV106_(state.decision.tool_requests||[],req.message,req.agentState),state.usedSignatures);
    if(!requests.length)break;
    const results=aiRunChatTools_(requests,req.defaultWarehouse);
    results.forEach(function(x){if(state.toolContext.length<AI_AGENT_CONFIG.MAX_TOOL_RESULTS)state.toolContext.push(x);if(x&&x.request&&x.request.type)state.usedTools.push(String(x.request.type));});
    state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,state.toolContext,round===AI_AGENT_CONFIG.MAX_TOOL_ROUNDS-1,req.currentDraft,req.agentState,{round:round+1,maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
    state.calls++;
  }
  return state;
}

function aiApplyLiveToolFailsafes_(req,state) {
  if(aiMessageNeedsLiveStockV106_(req.message,state.decision)&&!aiToolContextHasV106_(state.toolContext,'GET_STOCK')){
    const autoReq=aiAutoStockRequestV106_(req.message,req.agentState,state.decision);
    if(autoReq){
      aiRunChatTools_([autoReq],req.defaultWarehouse).forEach(function(x){if(state.toolContext.length<AI_AGENT_CONFIG.MAX_TOOL_RESULTS)state.toolContext.push(x);});
      state.usedTools.push('GET_STOCK');
      state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,state.toolContext,true,req.currentDraft,req.agentState,{round:'stock-failsafe',maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
      state.calls++;
    }
  }
  if(aiMessageNeedsProactive_(req.message)&&!aiToolContextHasV106_(state.toolContext,'GET_PROACTIVE_REPORT')){
    aiRunChatTools_([{type:'GET_PROACTIVE_REPORT',query:'',code:'',warehouse:'all',from_date:'',to_date:'',limit:PROACTIVE_V108_CONFIG.TOP_LIMIT}],req.defaultWarehouse).forEach(function(x){if(state.toolContext.length<AI_AGENT_CONFIG.MAX_TOOL_RESULTS)state.toolContext.push(x);});
    state.usedTools.push('GET_PROACTIVE_REPORT');
    state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,state.toolContext,true,req.currentDraft,req.agentState,{round:'proactive-failsafe',maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
    state.calls++;
  }
}

function aiPrepareActionPlanTurn_(req,state) {
  let plan=aiNormalizeActionPlan_(state.decision.action_plan);
  plan=aiApplyDeterministicPlanGuards_(req.message,plan);
  plan=aiApplyConversationReferencesV106_(req.message,plan,req.agentState,req.currentDraft);
  let consistency=state.decision.should_prepare?aiCheckActionPlanConsistency_(req.message,plan,req.currentDraft):{ok:true,reason:'',searchQuery:''};
  if(!consistency.ok&&state.decision.should_prepare){
    const guardContext=state.toolContext.slice(-AI_AGENT_CONFIG.MAX_TOOL_RESULTS);
    if(consistency.searchQuery){try{guardContext.push({request:{type:'SEARCH_CATALOG',query:consistency.searchQuery,code:'',warehouse:'',from_date:'',to_date:'',limit:8},result:aiChatSearchCatalog_(consistency.searchQuery)});}catch(e){}}
    guardContext.push({request:{type:'ACTION_PLAN_GUARD',query:'',code:'',warehouse:'',from_date:'',to_date:'',limit:0},result:{latestMessage:req.message,currentDraft:req.currentDraft,agentState:req.agentState,problem:consistency.reason,instruction:'Dựng lại action_plan từ đầu theo tin nhắn mới nhất. Không đổi hãng/model/hậu tố. Nếu người dùng đang tham chiếu “cái đó/mã vừa nói”, dùng agentState nếu chỉ có một mặt hàng rõ ràng.'}});
    state.decision=aiChatReason_(req.message,req.history,req.actor,req.defaultWarehouse,guardContext,true,req.currentDraft,req.agentState,{round:'guard',maxRounds:AI_AGENT_CONFIG.MAX_TOOL_ROUNDS});
    state.calls++;
    plan=aiApplyConversationReferencesV106_(req.message,aiApplyDeterministicPlanGuards_(req.message,aiNormalizeActionPlan_(state.decision.action_plan)),req.agentState,req.currentDraft);
    consistency=aiCheckActionPlanConsistency_(req.message,plan,req.currentDraft);
  }
  return {plan:plan,consistency:consistency};
}

function aiPrepareInventoryPreviewTurn_(req,state,prepared) {
  if(!state.decision.should_prepare)return null;
  if(!prepared.consistency.ok||!prepared.plan.slips.length){
    state.decision.should_prepare=false;state.decision.needs_user_answer=true;
    state.decision.reply='Mình chưa dựng phiếu vì identity hàng hóa chưa đủ chắc chắn. Không có gì được ghi kho. '+(prepared.consistency.reason||'');
    return null;
  }
  try{return aiInventoryPreviewFromActionPlan_({plan:prepared.plan,command:req.message,sourceMessage:req.message,actor:req.actor,defaultWarehouse:req.defaultWarehouse});}
  catch(e){return {ready:false,aiConfirmedNoWrite:true,clarification:'Backend chưa thể chuẩn bị phiếu: '+String(e&&e.message||e)};}
}

function aiApplyBlockedPreviewReply_(decision, preview) {
  if(!preview||preview.ready)return;
  const ex=Array.isArray(preview.exceptions)?preview.exceptions:[];
  if(ex.some(function(x){return String(x.type||'').toUpperCase()==='NEW_SKU';}))decision.reply='Mình đã giữ đúng tên/model anh yêu cầu. Mặt hàng chưa có mã chuẩn nên chưa ghi sổ; chọn “Tạo mã mới” ở phần bên dưới.';
  else if(ex.some(function(x){return String(x.type||'').toUpperCase()==='AMBIGUOUS_SKU';}))decision.reply='Có nhiều SKU thật sự phù hợp nên mình chưa tự chọn. Anh chọn đúng mã hoặc tạo mã mới.';
  else if(ex.some(function(x){return /IDENTITY|PARSER/i.test(String(x.type||''));}))decision.reply='Mình phát hiện nguy cơ đổi nhầm model/SKU nên đã chặn, chưa ghi sổ.';
}

function aiBuildChatTurnResponse_(req,state,plan,preview,nextState) {
  return {reply:String(state.decision.reply||'').trim()||'Mình đã đọc yêu cầu.',intent:String(state.decision.intent||'CHAT'),confidence:Math.max(0,Math.min(100,Number(state.decision.confidence||0))),needsUserAnswer:Boolean(state.decision.needs_user_answer),proposedCommand:String(state.decision.proposed_command||''),actionPlan:plan,preview:preview,toolContext:state.toolContext,agentState:nextState,agentVersion:AI_AGENT_CONFIG.VERSION,agentRounds:state.calls,usedTools:Array.from(new Set(state.usedTools)),model:aiGetChatModel_(),serverTime:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
}

function aiNormalizeAgentStateV106_(state) {
  state = state && typeof state === 'object' ? state : {};
  const items = Array.isArray(state.lastItems) ? state.lastItems : [];
  return {
    version:AI_AGENT_CONFIG.STATE_VERSION,
    lastItems:items.slice(0,AI_AGENT_CONFIG.MAX_STATE_ITEMS).map(function(x){return {
      code:/^TD-\d{4}$/i.test(String(x&&x.code||''))?String(x.code).toUpperCase():'',
      name:String(x&&x.name||'').slice(0,220),unit:String(x&&x.unit||'').slice(0,30)
    };}).filter(function(x){return x.code;}),
    lastWarehouse:['58','145'].indexOf(String(state.lastWarehouse||''))>=0?String(state.lastWarehouse):'',
    lastOperation:String(state.lastOperation||'').toUpperCase().slice(0,20),
    lastCounterparty:String(state.lastCounterparty||'').slice(0,160),
    lastVoucher:String(state.lastVoucher||'').slice(0,80),
    updatedAt:String(state.updatedAt||'')
  };
}

function aiMessageUsesReferenceV106_(message) {
  const n=normalize_(message);
  return /\b(cai do|ma do|hang do|san pham do|sp do|cai vua noi|ma vua noi|hang vua noi|vua noi|xuat tiep|nhap tiep|lay tiep|them tiep|phan con lai|con lai|xuat het|lay het)\b/.test(n);
}

function aiMessageHasExplicitIdentityV106_(message) {
  if (/TD-\d{4}/i.test(String(message||''))) return true;
  if (aiStrongModelTokens_(message).length) return true;
  return false;
}

function aiApplyConversationReferencesV106_(message, plan, agentState, currentDraft) {
  plan=aiNormalizeActionPlan_(plan);
  const state=aiNormalizeAgentStateV106_(agentState);
  const refs=state.lastItems||[];
  const lines=[];plan.slips.forEach(function(s){(s.lines||[]).forEach(function(l){lines.push(l);});});
  if (!aiMessageUsesReferenceV106_(message) || aiMessageHasExplicitIdentityV106_(message) || refs.length!==1 || lines.length!==1) return plan;
  const ref=refs[0];
  const catalog=aiBuildCatalog_();
  const live=catalog.find(function(x){return normalize_(x.code)===normalize_(ref.code);});
  if (!live) return plan;
  const line=lines[0];
  if (line.force_new_sku) return plan;
  line.requested_code=live.code;
  line.item_text=live.name;
  line.source_excerpt=String(message||'');
  return plan;
}

function aiBuildAgentStateV106_(previous, message, decision, toolContext, preview, defaultWarehouse, forcedItems) {
  const out=aiNormalizeAgentStateV106_(previous);
  let focus=[];
  (forcedItems||[]).forEach(function(x){if(x&&x.code)focus.push(x);});
  if (preview && Array.isArray(preview.slips)) {
    const ps=preview.slips;
    ps.forEach(function(sl){(sl.lines||[]).forEach(function(l){if(l.code)focus.push({code:l.code,name:l.name||l.itemText||'',unit:l.unit||'',qty58:0,qty145:0});});});
    if (ps.length) {
      const last=ps[ps.length-1];out.lastOperation=String(last.operation||'');
      out.lastWarehouse=String(last.operation==='TRANSFER'?last.destinationWarehouse:last.warehouse||defaultWarehouse||'');
      out.lastCounterparty=String(last.counterparty||'');
    }
  }
  (toolContext||[]).forEach(function(t){
    const r=t&&t.result;if(!r)return;
    if(r.item&&r.item.code)focus.push(r.item);
    if(Array.isArray(r.items)&&r.items.length===1&&r.items[0].code)focus.push(r.items[0]);
  });
  const dedup={},clean=[];
  focus.reverse().forEach(function(x){const k=normalize_(x.code);if(!k||dedup[k]||clean.length>=AI_AGENT_CONFIG.MAX_STATE_ITEMS)return;dedup[k]=true;clean.push({code:String(x.code).toUpperCase(),name:String(x.name||''),unit:String(x.unit||'')});});
  if(clean.length)out.lastItems=clean.reverse();
  if(decision&&decision.action_plan&&Array.isArray(decision.action_plan.slips)&&decision.action_plan.slips.length){
    const sl=decision.action_plan.slips[decision.action_plan.slips.length-1];
    out.lastOperation=String(sl.operation||out.lastOperation||'');
    out.lastWarehouse=String(sl.operation==='TRANSFER'?(sl.destination_warehouse||''):(sl.warehouse||out.lastWarehouse||defaultWarehouse||''));
    out.lastCounterparty=String(sl.counterparty||out.lastCounterparty||'');
  }
  out.updatedAt=Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss');
  return out;
}

function aiToolSignatureV106_(r) {
  return [String(r.type||'').toUpperCase(),normalize_(r.query||''),String(r.code||'').toUpperCase(),String(r.warehouse||''),String(r.from_date||''),String(r.to_date||''),Math.floor(Number(r.limit||0))].join('|');
}

function aiUniqueToolRequestsV106_(requests, seen) {
  seen=seen||{};const out=[];
  (Array.isArray(requests)?requests:[]).slice(0,AI_CHAT_CONFIG.MAX_TOOL_REQUESTS).forEach(function(r){
    const sig=aiToolSignatureV106_(r);if(!sig||seen[sig])return;seen[sig]=true;out.push(r);
  });
  return out;
}

function aiApplyToolReferencesV106_(requests, message, agentState) {
  const rows=(Array.isArray(requests)?requests:[]).map(function(r){const x=Object.assign({},r);return x;});
  const state=aiNormalizeAgentStateV106_(agentState),items=state.lastItems||[];
  if(!aiMessageUsesReferenceV106_(message)||aiMessageHasExplicitIdentityV106_(message)||items.length!==1)return rows;
  const ref=items[0];
  rows.forEach(function(r){
    const type=String(r.type||'').toUpperCase();
    if(['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_MOVEMENTS'].indexOf(type)<0)return;
    const q=normalize_(r.code||r.query||'');
    if(!q||/cai do|ma do|hang do|san pham do|sp do|vua noi|con lai/.test(q)){
      r.code=ref.code;r.query=ref.code;
    }
  });
  return rows;
}

function aiMessageNeedsLiveStockV106_(message, decision) {
  const n=normalize_(message),intent=String(decision&&decision.intent||'').toUpperCase();
  if(intent==='STOCK_QUERY')return true;
  return /xuat het|lay het|phan con lai|het phan con lai|con bao nhieu|con may|ton bao nhieu/.test(n);
}

function aiToolContextHasV106_(toolContext, type) {
  type=String(type||'').toUpperCase();
  return (toolContext||[]).some(function(x){return String(x&&x.request&&x.request.type||'').toUpperCase()===type&&!x.error;});
}

function aiAutoStockRequestV106_(message, agentState, decision) {
  const state=aiNormalizeAgentStateV106_(agentState),items=state.lastItems||[];
  let q='';
  if(aiMessageUsesReferenceV106_(message)&&!aiMessageHasExplicitIdentityV106_(message)&&items.length===1)q=items[0].code;
  else q=String(message||'').trim();
  if(!q)return null;
  return {type:'GET_STOCK',query:q,code:/^TD-\d{4}$/i.test(q)?q:'',warehouse:'all',from_date:'',to_date:'',limit:0};
}

function aiTryExplicitAliasCommandV106_(message) {
  const raw=String(message||'').trim(),n=normalize_(raw);
  if (!/(^|\b)(nho|ghi nho|tu nay|hay nho)\b/.test(n)) return null;
  const codeMatch=raw.match(/TD-\d{4}/i);if(!codeMatch)return null;
  const code=codeMatch[0].toUpperCase();
  let before=raw.slice(0,codeMatch.index).trim();
  before=before.replace(/^(nhớ|ghi nhớ|từ nay|hãy nhớ)\s+/i,'').replace(/\s*(là|=|tương ứng|ứng với|mã)\s*$/i,'').trim();
  if(!before||before.length>AI_AGENT_CONFIG.MAX_ALIAS_LENGTH)return null;
  return {alias:before,code:code};
}

function aiSaveAliasExplicitV106_(alias, code, actor) {
  alias=String(alias||'').trim();code=String(code||'').toUpperCase();
  if(!alias||alias.length>AI_AGENT_CONFIG.MAX_ALIAS_LENGTH)throw new Error('Alias không hợp lệ.');
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try {
    const stock=readStock_(getSpreadsheet_().getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET));
    const item=stock.find(function(x){return normalize_(x.code)===normalize_(code);});
    if(!item)throw new Error('Không tìm thấy '+code+' trong TONKHO live.');
    const aModels=aiStrongModelTokens_(alias),iModels=aiStrongModelTokens_(item.name);
    if(aModels.some(function(x){return iModels.indexOf(x)<0;}))throw coreRuleError_('R11','Alias chứa model không khớp với '+code+'.');
    const ab=aiLastBrand_(alias),ib=aiLastBrand_(item.name);if(ab&&ib&&ab!==ib)throw coreRuleError_('R11','Alias khác hãng với '+code+'.');
    const av=aiVariantTokens_(alias),iv=aiVariantTokens_(item.name);if(av.some(function(x){return iv.indexOf(x)<0;}))throw coreRuleError_('R12','Alias chứa hậu tố/phiên bản không khớp '+code+'.');
    const existingResolution=aiResolveItem_(alias,aiBuildCatalog_());
    if(existingResolution.resolved&&normalize_(existingResolution.item.code)!==normalize_(code))throw coreRuleError_('R11','Alias hiện đang nhận diện chắc chắn sang '+existingResolution.item.code+', không tự ghi đè.');
    const sh=ensureMasterMetaSheet_(),meta=readMasterMeta_(sh),existing=meta.byCode[normalize_(code)];
    let row=existing?existing.sheetRow:sh.getLastRow()+1;
    if(existing){
      const current=String(sh.getRange(row,MASTER_META_CONFIG.ALIAS_COLUMN).getDisplayValue()||'').trim();
      const aliases=current.split(/[;,|\n]+/).map(function(x){return x.trim();}).filter(Boolean);
      if(!aliases.some(function(x){return normalize_(x)===normalize_(alias);}))aliases.push(alias);
      sh.getRange(row,MASTER_META_CONFIG.ALIAS_COLUMN).setValue(aliases.join('; '));
      sh.getRange(row,MASTER_META_CONFIG.UPDATED_COLUMN).setValue(new Date()).setNumberFormat('dd/MM/yyyy HH:mm');
    }else{
      sh.getRange(row,1,1,MASTER_META_CONFIG.TOTAL_COLUMNS).setValues([[item.code,item.name,alias,'','','','Alias học bởi AI Agent'+(actor?' · '+actor:''),new Date(),false,'']]);
      sh.getRange(row,MASTER_META_CONFIG.UPDATED_COLUMN).setNumberFormat('dd/MM/yyyy HH:mm');
      sh.getRange(row,MASTER_META_CONFIG.MANAGE_145_COLUMN).insertCheckboxes();
    }
    SpreadsheetApp.flush();clearDashboardCache();
    aiAudit_({previewId:'',command:'Ghi nhớ alias: '+alias+' = '+item.code,operation:'META_ALIAS',warehouse:'58',actor:actor||'',status:'ALIAS_SAVED',result:JSON.stringify({alias:alias,code:item.code,name:item.name}),model:aiGetChatModel_()});
    return {success:true,alias:alias,code:item.code,name:item.name,item:{code:item.code,name:item.name,unit:item.unit}};
  } finally { lock.releaseLock(); }
}

function aiChatReason_(message, history, actor, defaultWarehouse, toolContext, finalPass, currentDraft, agentState, agentRound) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = String(props.getProperty(AI_CONFIG.API_KEY_PROPERTY) || '').trim();
  if (!apiKey) throw new Error('Chưa cấu hình OPENAI_API_KEY trong Script Properties.');
  const model = aiGetChatModel_();
  const today=Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'yyyy-MM-dd');
  const toolSchema = {
    type:'object',additionalProperties:false,
    properties:{
      type:{type:'string',enum:['SEARCH_CATALOG','GET_STOCK','GET_ITEM_HISTORY','GET_MOVEMENTS','GET_OPERATIONAL_REPORT','GET_PROACTIVE_REPORT','GET_RECENT_VOUCHERS','GET_TODAY_MOVEMENTS','GET_TODAY_SUMMARY']},
      query:{type:'string'},code:{type:'string'},warehouse:{type:'string',enum:['58','145','all','']},
      from_date:{type:'string'},to_date:{type:'string'},limit:{type:'integer',minimum:0,maximum:500}
    },
    required:['type','query','code','warehouse','from_date','to_date','limit']
  };
  const linePlanSchema={type:'object',additionalProperties:false,properties:{item_text:{type:'string'},source_excerpt:{type:'string'},requested_code:{type:'string'},quantity:{type:'integer',minimum:0},target_quantity:{type:'integer',minimum:-1},force_new_sku:{type:'boolean'}},required:['item_text','source_excerpt','requested_code','quantity','target_quantity','force_new_sku']};
  const slipPlanSchema={type:'object',additionalProperties:false,properties:{slip_no:{type:'string'},operation:{type:'string',enum:['IN','OUT','ADJUST','TRANSFER','UNKNOWN']},warehouse:{type:'string',enum:['58','145','']},source_warehouse:{type:'string',enum:['58','145','']},destination_warehouse:{type:'string',enum:['58','145','']},actor_hint:{type:'string'},counterparty:{type:'string'},note:{type:'string'},clarification:{type:'string'},lines:{type:'array',items:linePlanSchema}},required:['slip_no','operation','warehouse','source_warehouse','destination_warehouse','actor_hint','counterparty','note','clarification','lines']};
  const planSchema={type:'object',additionalProperties:false,properties:{transaction_date:{type:'string'},slips:{type:'array',items:slipPlanSchema}},required:['transaction_date','slips']};
  const schema={type:'object',additionalProperties:false,properties:{reply:{type:'string'},intent:{type:'string',enum:['CHAT','STOCK_QUERY','INVENTORY_ACTION','CLARIFY','REPORT_QUERY','UNKNOWN']},confidence:{type:'integer',minimum:0,maximum:100},needs_user_answer:{type:'boolean'},should_prepare:{type:'boolean'},proposed_command:{type:'string'},action_plan:planSchema,tool_requests:{type:'array',items:toolSchema,maxItems:AI_CHAT_CONFIG.MAX_TOOL_REQUESTS}},required:['reply','intent','confidence','needs_user_answer','should_prepare','proposed_command','action_plan','tool_requests']};

  const state=aiNormalizeAgentStateV106_(agentState);
  const round=agentRound&&agentRound.round!=null?agentRound.round:0;
  const instructions=[
    'Bạn là AI Agent quản lý kho Thành Đức V10.8. Trò chuyện như một trợ lý kho thông minh, chủ động tra dữ liệu nhưng không được tự vượt qua Rule Engine.',
    'Hôm nay theo giờ Việt Nam là '+today+'. Model đang dùng: '+model+' với reasoning medium.',
    'AI BRAIN chỉ hiểu ý, chọn công cụ và tạo Action Plan. Backend deterministic là nguồn sự thật duy nhất cho SKU, tồn, chứng từ và quyền ghi.',
    'Ưu tiên hiểu ngữ cảnh hội thoại. Không hỏi lại kho/người thực hiện nếu app đã cung cấp. Chỉ hỏi khi thiếu dữ liệu quan trọng hoặc có nhiều SKU thật sự khả dĩ.',
    'TIN NHẮN MỚI NHẤT có ưu tiên cao nhất. Draft cũ và agentState chỉ dùng làm ngữ cảnh; nếu người dùng sửa model/hãng thì phải bỏ identity cũ.',
    'AgentState có thể chứa mặt hàng vừa nói. Khi người dùng nói “cái đó”, “mã đó”, “xuất tiếp”, “nhập tiếp”, “phần còn lại”, hãy dùng đúng mặt hàng trong AgentState nếu chỉ có một lựa chọn rõ. Không bịa tham chiếu khi state có nhiều item.',
    'Khi hỏi tồn, số liệu, lịch sử, phiếu, báo cáo hoặc “còn lại/xuất hết”, PHẢI dùng tool live phù hợp; không trả số từ trí nhớ hội thoại.',
    'SEARCH_CATALOG để tìm SKU; GET_STOCK để đọc tồn live 2 kho; GET_ITEM_HISTORY để xem lịch sử một mã; GET_MOVEMENTS cho hôm qua/ngày/range; GET_RECENT_VOUCHERS để liệt kê phiếu; GET_OPERATIONAL_REPORT cho báo cáo tài chính/tồn; GET_PROACTIVE_REPORT cho câu hỏi quản trị như ưu tiên hôm nay, cần mua gì, nên điều chuyển gì, hàng nào xuất nhanh/chậm hoặc bất thường.',
    'Có thể dùng nhiều vòng tool. Nếu kết quả vòng đầu cho mã TD, vòng sau được phép GET_STOCK hoặc GET_ITEM_HISTORY bằng mã đó. Không lặp lại cùng một tool request.',
    'Khi người dùng hỏi “hôm nay nên làm gì”, “có gì bất thường”, “cần mua gì”, “nên điều chuyển gì”, “hàng nào bán nhanh/chậm”, “tồn lâu” hoặc câu tương đương, phải dùng GET_PROACTIVE_REPORT. Phân biệt rõ dữ liệu thực tế và heuristic: độ phủ ngày/tồn chậm chỉ là tín hiệu quản trị, không phải lệnh mua tự động.',
    'Nếu SEARCH_CATALOG báo MODEL_NOT_FOUND/exactModelFound=false cho model rõ, không được tự đổi sang model gần giống.',
    'Identity bắt buộc giữ nguyên: TD code → model → hãng → hậu tố/variant → điều kiện hàng. HL-2361DN khác HL-2321D; GI-71C khác GI-790C; CH/WB/ES/TOPZON/NP/INKVIET/PCS/NOBOX là độc lập.',
    'Nếu người dùng nói rõ tạo mã mới, force_new_sku=true và requested_code="". Không ép ghép mã gần giống.',
    'Khi người dùng muốn nhập/xuất/điều chỉnh/chuyển kho và đủ thông tin, should_prepare=true và BẮT BUỘC điền action_plan. Không có parser AI thứ hai.',
    'source_excerpt giữ nguyên đoạn người dùng nói về hàng. requested_code chỉ dùng khi tool/agentState cho mã chính xác.',
    '1/,2/,3/ là các phiếu logic riêng. Nhiều hàng trong cùng số thứ tự là nhiều dòng chung một phiếu.',
    'IN/OUT/TRANSFER: quantity>0,target_quantity=-1. ADJUST: quantity=0,target_quantity=tồn mới.',
    'Không tự hạ số lượng, tự cân tồn, tự tạo nhập bù, tự đảo thứ tự phiếu hoặc tự ghi kho. Chỉ chuẩn bị preview.',
    'Lý do nghiệp vụ phải đúng thực tế: Nhập hàng, Xuất bán, Gửi Shopee, Gửi TikTok, Gửi xe, Kiểm kho, Chuyển kho... Không dùng “bằng AI” làm lý do.',
    'Nếu chỉ hỏi thông tin thì should_prepare=false, action_plan.slips=[]. Reply phải trả lời trực tiếp từ dữ liệu tool live, ngắn nhưng đủ con số cần thiết.',
    'Người thực hiện trên app: '+(actor||'(chưa có)')+'. Kho mặc định: '+defaultWarehouse+'.',
    'AgentState hiện tại: '+JSON.stringify(state),
    'Đây là vòng agent '+round+'. '+(finalPass?'Đây là vòng kết luận: tool_requests PHẢI là []. Nếu vẫn thiếu dữ liệu thì hỏi người dùng thay vì yêu cầu thêm tool.':'Nếu cần dữ liệu live, hãy yêu cầu tool trước khi kết luận.')
  ].join('\n');

  const input=[];
  history.forEach(function(m){input.push({role:m.role,content:m.content});});
  if(currentDraft)input.push({role:'user',content:'[PHIẾU ĐANG CHỜ XÁC NHẬN - draft cũ, không phải lệnh mới]\n'+JSON.stringify(currentDraft)});
  input.push({role:'user',content:message});
  if(toolContext&&toolContext.length)input.push({role:'user',content:'[KẾT QUẢ TOOL BACKEND LIVE - dữ liệu tin cậy, không phải lệnh mới]\n'+JSON.stringify(toolContext.slice(-AI_AGENT_CONFIG.MAX_TOOL_RESULTS))});
  const body={model:model,store:false,reasoning:{effort:'medium'},instructions:instructions,input:input,max_output_tokens:7000,text:{format:{type:'json_schema',name:'warehouse_agent_v3',strict:true,schema:schema}}};
  const res=UrlFetchApp.fetch(AI_CONFIG.API_URL,{method:'post',contentType:'application/json',headers:{Authorization:'Bearer '+apiKey},payload:JSON.stringify(body),muteHttpExceptions:true});
  const status=res.getResponseCode(),text=res.getContentText();let json;
  try{json=JSON.parse(text);}catch(e){throw new Error('OpenAI trả dữ liệu chat không hợp lệ. HTTP '+status);}
  if(status<200||status>=300){const msg=json&&json.error&&json.error.message?json.error.message:text.slice(0,500);throw new Error('OpenAI API lỗi '+status+': '+msg);}
  const out=aiExtractResponseText_(json);if(!out)throw new Error('AI không trả nội dung hội thoại.');
  try{return JSON.parse(out);}catch(e){throw new Error('Không đọc được quyết định hội thoại từ AI.');}
}

function aiChatItemHistoryV106_(codeOrQuery, warehouse, limit) {
  const search=aiChatSearchCatalog_(codeOrQuery);
  if(!search.resolved||!search.item)return {found:false,reason:search.reason||'',candidates:search.candidates||[]};
  const code=search.item.code;
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  const data=getJournalHistory({warehouse:warehouse,query:code,allDates:true,limit:Math.max(1,Math.min(AI_AGENT_CONFIG.MAX_HISTORY_ROWS,Number(limit||15)))});
  const rows=(data.rows||[]).filter(function(r){return normalize_(r.code)===normalize_(code);}).slice(0,AI_AGENT_CONFIG.MAX_HISTORY_ROWS);
  return {found:true,item:search.item,totalMatches:rows.length,rows:rows.map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason,note:r.note};})};
}

function aiChatMovementsRangeV106_(query, warehouse, fromDate, toDate, limit) {
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  const today=dateKey_(new Date());
  const from=String(fromDate||'').trim()||today,to=String(toDate||'').trim()||from;
  const data=getJournalHistory({warehouse:warehouse,query:String(query||''),fromDate:from,toDate:to,limit:Math.max(1,Math.min(AI_AGENT_CONFIG.MAX_MOVEMENT_ROWS,Number(limit||40)))});
  return {fromDate:from,toDate:to,warehouse:warehouse,totalMatches:data.totalMatches,rows:(data.rows||[]).slice(0,AI_AGENT_CONFIG.MAX_MOVEMENT_ROWS).map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,before:r.before,after:r.after,person:r.person,reason:r.reason};})};
}

function aiChatOperationalReportV106_(warehouse) {
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  const data=getDashboardData(true);
  const combined=data.combinedStock||[];
  const stock58=data.stock||[];
  const stock145=(data.warehouse145&&data.warehouse145.stock)||[];
  const value58=buildValueSummary_(stock58),value145=(data.warehouse145&&data.warehouse145.valueSummary)||buildValueSummary_(stock145);
  const value=warehouse==='58'?value58:warehouse==='145'?value145:data.systemValueSummary;
  const actions=(data.actionCenter||[]).filter(function(a){
    if(warehouse==='all')return true;
    if(warehouse==='58')return a.qty58!=null;
    return a.qty145!=null;
  }).sort(function(a,b){return Number(a.priority||9)-Number(b.priority||9);}).slice(0,15).map(function(a){return {priority:a.priority,type:a.type,code:a.code,name:a.name,qty58:a.qty58,qty145:a.qty145,totalQty:a.totalQty,label:a.label,detail:a.detail};});
  const scoped=warehouse==='58'?stock58:warehouse==='145'?stock145:combined;
  let out=0,low=0,ok=0;scoped.forEach(function(x){const st=String(x.actualStatus||x.status||x.systemStatus||'');if(st==='HẾT HÀNG')out++;else if(st==='SẮP HẾT')low++;else if(st==='OK')ok++;});
  return {date:dateKey_(new Date()),warehouse:warehouse,totalValue:Number(value&&value.totalValue||0),openingValue:Number(value&&value.openingValue||0),dayInValue:Number(value&&value.dayInValue||0),dayOutValue:Number(value&&value.dayOutValue||0),netChangeValue:Number(value&&value.netChangeValue||0),valuationCoveragePercent:Number(value&&value.valuationCoveragePercent||0),outOfStock:out,lowStock:low,ok:ok,topActions:actions,catalogIssues:data.catalogAudit||{},warehouse145Error:data.warehouse145&&data.warehouse145.error||''};
}

function aiChatRecentVouchersV106_(warehouse, fromDate, toDate, limit) {
  warehouse=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  const today=dateKey_(new Date()),from=String(fromDate||'').trim(),to=String(toDate||'').trim();
  const payload={warehouse:warehouse,limit:500};
  if(from||to){payload.fromDate=from||to;payload.toDate=to||from;}else payload.allDates=true;
  const data=getJournalHistory(payload),seen={},vouchers=[];
  (data.rows||[]).forEach(function(r){const v=String(r.voucher||'').trim();if(!v||seen[v]||vouchers.length>=Math.max(1,Math.min(AI_AGENT_CONFIG.MAX_RECENT_VOUCHERS,Number(limit||12))))return;seen[v]=true;vouchers.push({date:r.date,voucher:v,warehouse:r.warehouse,type:r.type,person:r.person,reason:r.reason});});
  return {warehouse:warehouse,fromDate:from,toDate:to,total:vouchers.length,vouchers:vouchers};
}

function aiChatSearchCatalog_(query) {
  query = String(query || '').trim();
  if (!query) return {query:'',resolved:false,exactModelFound:false,candidates:[]};
  const catalog = aiBuildCatalog_();
  const resolution = aiResolveItem_(query, catalog);
  const candidateCodes = (resolution.candidates || []).map(function(x){return normalize_(x.code);});
  if (resolution.resolved && candidateCodes.indexOf(normalize_(resolution.item.code))<0) {
    resolution.candidates = [{code:resolution.item.code,name:resolution.item.name,score:resolution.score||1000}].concat(resolution.candidates||[]);
  }
  const ss58=getSpreadsheet_(),stock58=readStock_(ss58.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET)),by58={};
  stock58.forEach(function(x){by58[normalize_(x.code)]=x;});
  let raw145=[];try{const ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID);raw145=readWarehouse145Raw_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET));}catch(e){}
  const q145={};raw145.forEach(function(x){if(x.masterCode)q145[normalize_(x.masterCode)]=(q145[normalize_(x.masterCode)]||0)+Number(x.qty||0);});
  const cands=(resolution.candidates||[]).slice(0,AI_CHAT_CONFIG.MAX_CANDIDATES).map(function(x){const s=by58[normalize_(x.code)]||{};return {code:x.code,name:x.name,unit:s.unit||'',qty58:Number(s.qty||0),qty145:Number(q145[normalize_(x.code)]||0),score:x.score,confidence:Number(x.confidence||0)};});
  return {query:query,resolved:Boolean(resolution.resolved),reason:resolution.reason||'',confidence:Number(resolution.confidence||0),margin:Number(resolution.margin||0),resolverVersion:String(resolution.resolverVersion||AI_RESOLVER_CONFIG.VERSION),strongModels:aiStrongModelTokens_(query),exactModelFound:aiStrongModelTokens_(query).length?resolution.reason!=='MODEL_NOT_FOUND':Boolean(resolution.resolved),item:resolution.resolved?(function(){const z=by58[normalize_(resolution.item.code)]||{};return {code:resolution.item.code,name:resolution.item.name,unit:z.unit||'',qty58:Number(z.qty||0),qty145:Number(q145[normalize_(resolution.item.code)]||0),referencePrice:Number(z.referencePrice||0),stockValue58:Number(z.stockValue||0),status58:String(z.actualStatus||z.status||statusOf_(z.qty,z.threshold||0)),threshold58:Number(z.threshold||0),resolutionConfidence:Number(resolution.confidence||0)};})():null,candidates:cands};
}

function aiChatGetStock_(codeOrQuery) {
  const q=String(codeOrQuery||'').trim();
  if(!q)return {found:false,message:'Thiếu mã/tên hàng.'};
  const search=aiChatSearchCatalog_(q);
  if(search.resolved&&search.item){const x=search.item;return {found:true,item:x,total:Number(x.qty58||0)+Number(x.qty145||0),resolutionReason:search.reason,resolutionConfidence:Number(search.confidence||0),resolverVersion:search.resolverVersion};}
  return {found:false,candidates:(search.candidates||[]).slice(0,5),reason:search.reason,resolutionConfidence:Number(search.confidence||0),resolverVersion:search.resolverVersion,message:search.reason==='MODEL_NOT_FOUND'?'Không có model chính xác trong danh mục; không tự ghép sang model gần giống.':(search.reason==='MODEL_VARIANT_AMBIGUOUS'?'Model có nhiều phiên bản/variant; cần nói rõ WB/CH/ES/INKVIET/TOPZON/NP hoặc chọn đúng SKU.':(search.reason==='MODEL_CONDITION_AMBIGUOUS'?'Model có cả máy mới và đã qua sử dụng; cần nói rõ tình trạng.':'Tên/mã chưa đủ chắc chắn để chọn một SKU.'))};
}

function aiChatTodayMovements_(query, warehouse) {
  warehouse = ['58','145','all'].indexOf(String(warehouse))>=0 ? String(warehouse) : 'all';
  const today = dateKey_(new Date());
  const data = getJournalHistory({warehouse:warehouse,query:String(query||''),fromDate:today,toDate:today,limit:80});
  return {
    date:today,
    totalMatches:data.totalMatches,
    rows:(data.rows||[]).slice(0,40).map(function(r){return {date:r.date,voucher:r.voucher,warehouse:r.warehouse,code:r.code,name:r.name,type:r.type,input:r.input,output:r.output,person:r.person,reason:r.reason};})
  };
}

function aiChatTodaySummary_(warehouse) {
  warehouse = ['58','145','all'].indexOf(String(warehouse))>=0 ? String(warehouse) : 'all';
  const today = dateKey_(new Date());
  const data = getJournalHistory({warehouse:warehouse,fromDate:today,toDate:today,limit:5000});
  let inQty=0,outQty=0,inLines=0,outLines=0;
  (data.rows||[]).forEach(function(r){
    const t=String(r.type||'').toUpperCase();
    if(t.indexOf('NHẬP')>=0||t.indexOf('NHAP')>=0){inQty+=Number(r.input||r.qty||0);inLines++;}
    if(t.indexOf('XUẤT')>=0||t.indexOf('XUAT')>=0){outQty+=Number(r.output||r.qty||0);outLines++;}
  });
  return {date:today,warehouse:warehouse,inQty:inQty,outQty:outQty,inLines:inLines,outLines:outLines,totalMovements:(data.rows||[]).length};
}



// ===== END 41_AI_Agent_Chat.gs =====


// ===== BEGIN 42_Proactive_Analytics.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 42_Proactive_Analytics.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function proactiveDateKeyOffset_(daysBack) {
  const d=new Date();
  d.setHours(12,0,0,0);
  d.setDate(d.getDate()-Math.max(0,Math.floor(Number(daysBack||0))));
  return Utilities.formatDate(d,DASHBOARD_CONFIG.TIME_ZONE,'yyyy-MM-dd');
}

function proactiveDaysBetween_(fromKey,toKey) {
  const a=aiDateFromKey_(fromKey),b=aiDateFromKey_(toKey);
  if(!a||!b)return null;
  return Math.max(0,Math.floor((b.getTime()-a.getTime())/86400000));
}

function proactiveReadMovements_(fromKey,toKey) {
  let rows=[];
  const ss58=getSpreadsheet_();
  rows=rows
    .concat(readJournalBackup58_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET),DASHBOARD_CONFIG.JOURNAL_BACKUP_SHEET,fromKey,toKey))
    .concat(readJournalBackup58_(ss58.getSheetByName(DASHBOARD_CONFIG.JOURNAL_SHEET),DASHBOARD_CONFIG.JOURNAL_SHEET,fromKey,toKey));
  try{
    const ss145=SpreadsheetApp.openById(WAREHOUSE_145_CONFIG.SPREADSHEET_ID),stock145=ss145.getSheetByName(WAREHOUSE_145_CONFIG.STOCK_SHEET);
    rows=rows
      .concat(readJournalBackup145_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET),stock145,WAREHOUSE_145_CONFIG.JOURNAL_BACKUP_SHEET,fromKey,toKey))
      .concat(readJournalBackup145_(ss145.getSheetByName(WAREHOUSE_145_CONFIG.JOURNAL_SHEET),stock145,WAREHOUSE_145_CONFIG.JOURNAL_SHEET,fromKey,toKey));
  }catch(e){console.warn('V10.8 không đọc được lịch sử Kho 145:',e);}
  return dedupeJournalHistory_(rows).filter(function(r){return /^TD-\d{4}$/i.test(String(r.code||''));});
}

function proactiveAggregateMovements_(rows,todayKey) {
  const by={};
  (rows||[]).forEach(function(r){
    const code=String(r.code||'').toUpperCase();if(!code)return;
    if(!by[code])by[code]={out30:0,out60:0,out90:0,in30:0,in60:0,in90:0,lastOutDate:'',lastMoveDate:'',movementRows:0};
    const x=by[code],age=proactiveDaysBetween_(r.dateKey,todayKey);if(age===null||age>PROACTIVE_V108_CONFIG.LOOKBACK_DAYS)return;
    const input=Number(r.input||0),output=Number(r.output||0);
    if(age<=30){x.out30+=output;x.in30+=input;}
    if(age<=60){x.out60+=output;x.in60+=input;}
    if(age<=90){x.out90+=output;x.in90+=input;}
    if(output>0&&(!x.lastOutDate||r.dateKey>x.lastOutDate))x.lastOutDate=r.dateKey;
    if((input>0||output>0)&&(!x.lastMoveDate||r.dateKey>x.lastMoveDate))x.lastMoveDate=r.dateKey;
    x.movementRows++;
  });
  return by;
}

function proactiveCompactItem_(x,m,todayKey) {
  m=m||{};
  const qty58=Number(x.qty58||0),qty145=Number(x.qty145||0),totalQty=Number(x.totalQty||0);
  const out30=Number(m.out30||0),avgDaily=out30/30;
  const daysCover=avgDaily>0?Math.round((totalQty/avgDaily)*10)/10:null;
  const daysSinceLastOut=m.lastOutDate?proactiveDaysBetween_(m.lastOutDate,todayKey):null;
  return {
    code:x.code,name:x.name,unit:x.unit||'',qty58:qty58,qty145:qty145,totalQty:totalQty,
    threshold58:Number(x.threshold58||0),threshold145:Number(x.threshold145||0),manage145:!!x.manage145,
    status:x.systemStatus||'',actionType:x.actionType||'OK',actionLabel:x.actionLabel||'',actionPriority:Number(x.actionPriority||9),
    transferQty:Number(x.transferQty||0),purchaseQty:Number(x.purchaseQty||0),referencePrice:Number(x.referencePrice||0),
    totalValue:Number(x.totalStockValue||0),priceMissing:!!x.priceMissing,has145Mapping:!!x.has145Mapping,mappingCount145:Number(x.mappingCount145||0),
    out30:out30,out60:Number(m.out60||0),out90:Number(m.out90||0),in30:Number(m.in30||0),
    avgDailyOut30:Math.round(avgDaily*100)/100,daysCover30:daysCover,lastOutDate:m.lastOutDate||'',daysSinceLastOut:daysSinceLastOut
  };
}

function proactiveRankRecommendations_(items,dashboard,txHealth) {
  const out=[];
  if(txHealth&&Number(txHealth.needsReconciliation||0)>0)out.push({severity:0,type:'TX_RECONCILIATION',title:'Đối soát giao dịch trước',detail:Number(txHealth.needsReconciliation||0)+' transaction cần đối soát; không nên bỏ qua trước khi xử lý tồn.',code:'',qty:0,value:0});
  items.filter(function(x){return /ÂM KHO/.test(x.status);}).forEach(function(x){out.push({severity:0,type:'NEGATIVE_STOCK',title:'Kiểm tra âm kho',detail:x.code+' · '+x.name+' · '+x.status,code:x.code,qty:0,value:x.totalValue});});
  items.filter(function(x){return x.transferQty>0;}).sort(function(a,b){return a.actionPriority-b.actionPriority||b.transferQty-a.transferQty;}).slice(0,8).forEach(function(x){out.push({severity:1,type:'TRANSFER',title:x.actionLabel||'Có thể điều chuyển',detail:x.code+' · '+x.name+' · Kho58 '+x.qty58+' · Kho145 '+x.qty145,code:x.code,qty:x.transferQty,value:x.referencePrice*x.transferQty,actionType:x.actionType});});
  items.filter(function(x){return x.purchaseQty>0;}).sort(function(a,b){return a.actionPriority-b.actionPriority||b.purchaseQty-a.purchaseQty;}).slice(0,8).forEach(function(x){out.push({severity:1,type:'PURCHASE',title:x.actionLabel||'Cần nhập mua',detail:x.code+' · '+x.name+' · tồn hệ thống '+x.totalQty,code:x.code,qty:x.purchaseQty,value:x.referencePrice*x.purchaseQty});});
  items.filter(function(x){return x.totalQty>0&&x.out30>0&&x.daysCover30!==null&&x.daysCover30<=PROACTIVE_V108_CONFIG.LOW_COVERAGE_DAYS;}).sort(function(a,b){return a.daysCover30-b.daysCover30;}).slice(0,6).forEach(function(x){out.push({severity:2,type:'LOW_COVERAGE',title:'Độ phủ tồn thấp ~'+x.daysCover30+' ngày',detail:x.code+' · '+x.name+' · xuất 30 ngày '+x.out30+' · tồn '+x.totalQty,code:x.code,qty:x.totalQty,value:x.totalValue});});
  items.filter(function(x){return x.totalQty>0&&x.out90===0;}).sort(function(a,b){return b.totalValue-a.totalValue||b.totalQty-a.totalQty;}).slice(0,6).forEach(function(x){out.push({severity:3,type:'NO_OUT_90',title:'Không có xuất trong 90 ngày',detail:x.code+' · '+x.name+' · tồn '+x.totalQty+(x.totalValue?' · giá trị '+Math.round(x.totalValue):''),code:x.code,qty:x.totalQty,value:x.totalValue});});
  items.filter(function(x){return x.totalQty>0&&x.priceMissing;}).sort(function(a,b){return b.totalQty-a.totalQty;}).slice(0,6).forEach(function(x){out.push({severity:3,type:'MISSING_PRICE',title:'Có tồn nhưng thiếu giá tham khảo',detail:x.code+' · '+x.name+' · tồn '+x.totalQty,code:x.code,qty:x.totalQty,value:0});});
  const audit=dashboard&&dashboard.catalogAudit||{};
  const mappingCount=(audit.unmapped||[]).length+(audit.invalid||[]).length+(audit.duplicates||[]).length;
  if(mappingCount>0)out.push({severity:2,type:'MAPPING',title:'Danh mục Kho 145 cần rà soát',detail:mappingCount+' vấn đề mapping/định danh đang tồn tại.',code:'',qty:mappingCount,value:0});
  return out.sort(function(a,b){return a.severity-b.severity||Number(b.value||0)-Number(a.value||0);}).slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT);
}

function getProactiveInsights(forceRefresh) {
  const cache=CacheService.getScriptCache();
  if(!forceRefresh){const cached=cache.get(PROACTIVE_V108_CONFIG.CACHE_KEY);if(cached)return JSON.parse(cached);}
  const dashboard=getDashboardData(Boolean(forceRefresh)),today=dateKey_(new Date()),from=proactiveDateKeyOffset_(PROACTIVE_V108_CONFIG.LOOKBACK_DAYS);
  const movements=proactiveReadMovements_(from,today),agg=proactiveAggregateMovements_(movements,today);
  const items=(dashboard.combinedStock||[]).map(function(x){return proactiveCompactItem_(x,agg[String(x.code||'').toUpperCase()],today);});
  const transfer=items.filter(function(x){return x.transferQty>0;}).sort(function(a,b){return a.actionPriority-b.actionPriority||b.transferQty-a.transferQty;});
  const purchase=items.filter(function(x){return x.purchaseQty>0;}).sort(function(a,b){return a.actionPriority-b.actionPriority||b.purchaseQty-a.purchaseQty;});
  const topOut30=items.filter(function(x){return x.out30>0;}).sort(function(a,b){return b.out30-a.out30||b.totalValue-a.totalValue;}).slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT);
  const slow30=items.filter(function(x){return x.totalQty>0&&x.out30===0;}).sort(function(a,b){return b.totalValue-a.totalValue||b.totalQty-a.totalQty;}).slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT);
  const noOut90=items.filter(function(x){return x.totalQty>0&&x.out90===0;}).sort(function(a,b){return b.totalValue-a.totalValue||b.totalQty-a.totalQty;}).slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT);
  const lowCoverage=items.filter(function(x){return x.totalQty>0&&x.out30>0&&x.daysCover30!==null&&x.daysCover30<=PROACTIVE_V108_CONFIG.LOW_COVERAGE_DAYS;}).sort(function(a,b){return a.daysCover30-b.daysCover30;}).slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT);
  const priceMissing=items.filter(function(x){return x.totalQty>0&&x.priceMissing;});
  const txHealth=auditTransactionHealth();
  const transferValue=transfer.reduce(function(s,x){return s+x.transferQty*x.referencePrice;},0),purchaseValue=purchase.reduce(function(s,x){return s+x.purchaseQty*x.referencePrice;},0);
  const result={
    appVersion:APP_VERSION,proactiveVersion:PROACTIVE_V108_CONFIG.VERSION,date:today,fromDate:from,lookbackDays:PROACTIVE_V108_CONFIG.LOOKBACK_DAYS,
    generatedAt:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss'),source:'TONKHO + Kho145 + NHAT_KY_XNT/BACKUP live',
    summary:{
      inventoryValue:Number(dashboard.systemValueSummary&&dashboard.systemValueSummary.totalValue||0),
      outOfStock:items.filter(function(x){return /HẾT/.test(x.status);}).length,
      lowStock:items.filter(function(x){return /SẮP HẾT/.test(x.status);}).length,
      transferCount:transfer.length,transferQty:transfer.reduce(function(s,x){return s+x.transferQty;},0),transferValue:transferValue,
      purchaseCount:purchase.length,purchaseQty:purchase.reduce(function(s,x){return s+x.purchaseQty;},0),purchaseValue:purchaseValue,
      lowCoverageCount:lowCoverage.length,slow30Count:items.filter(function(x){return x.totalQty>0&&x.out30===0;}).length,noOut90Count:items.filter(function(x){return x.totalQty>0&&x.out90===0;}).length,
      priceMissingCount:priceMissing.length,movementRows90:movements.length,txNeedsReconciliation:Number(txHealth.needsReconciliation||0)
    },
    recommendations:proactiveRankRecommendations_(items,dashboard,txHealth),
    transferCandidates:transfer.slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT),purchaseCandidates:purchase.slice(0,PROACTIVE_V108_CONFIG.TOP_LIMIT),
    topOut30:topOut30,slow30:slow30,noOut90:noOut90,lowCoverage:lowCoverage,
    catalogIssues:dashboard.catalogAudit||{},transactionHealth:txHealth,
    heuristicNote:'Tốc độ xuất và độ phủ ngày là tín hiệu quản trị dựa trên lịch sử 30/90 ngày; không tự tạo đơn mua, không tự điều chuyển và không thay thế mức cảnh báo do người dùng thiết lập.'
  };
  const serialized=JSON.stringify(result);try{cache.put(PROACTIVE_V108_CONFIG.CACHE_KEY,serialized,PROACTIVE_V108_CONFIG.CACHE_SECONDS);}catch(e){}
  return JSON.parse(serialized);
}

function aiChatProactiveReport_(warehouse) {
  const d=getProactiveInsights(true),wh=['58','145','all'].indexOf(String(warehouse))>=0?String(warehouse):'all';
  function scoped(rows){return (rows||[]).filter(function(x){if(wh==='all')return true;if(wh==='58')return Number(x.qty58||0)>0||/58/.test(String(x.actionLabel||''));return Number(x.qty145||0)>0||/145/.test(String(x.actionLabel||''));}).slice(0,10);}
  return {date:d.date,warehouse:wh,summary:d.summary,recommendations:(d.recommendations||[]).slice(0,12),transferCandidates:scoped(d.transferCandidates),purchaseCandidates:scoped(d.purchaseCandidates),topOut30:scoped(d.topOut30),slow30:scoped(d.slow30),noOut90:scoped(d.noOut90),lowCoverage:scoped(d.lowCoverage),catalogIssues:{unmapped:(d.catalogIssues.unmapped||[]).length,invalid:(d.catalogIssues.invalid||[]).length,duplicates:(d.catalogIssues.duplicates||[]).length},transactionHealth:d.transactionHealth,heuristicNote:d.heuristicNote};
}

function aiMessageNeedsProactive_(message) {
  const n=normalize_(message);
  return /hom nay.*(lam gi|uu tien|xu ly)|co gi (bat thuong|can lam|can xu ly)|can mua gi|nen mua gi|can nhap gi|nen nhap gi|nen dieu chuyen|can dieu chuyen|hang nao (ban nhanh|xuat nhanh|ban cham|xuat cham|ton lau)|ton cham|ton lau|dead stock|do phu ton|sap thieu/.test(n);
}



// ===== END 42_Proactive_Analytics.gs =====


// ===== BEGIN 90_Setup_Migration.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 90_Setup_Migration.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function setupV109(){
  const sheets=coreEnsureSecuritySheets_(),rows=coreReadRoleRowsV109_();let seeded='';
  let active='',effective='';try{active=String(Session.getActiveUser().getEmail()||'').trim();}catch(e){}try{effective=String(Session.getEffectiveUser().getEmail()||'').trim();}catch(e){}
  const seedEmail=active||effective;
  if(seedEmail&&!rows.some(function(x){return x.type==='EMAIL'&&String(x.principal).toLowerCase()===seedEmail.toLowerCase();})){
    const r=sheets.roles.getLastRow()+1;sheets.roles.getRange(r,1,1,7).setValues([[seedEmail,'EMAIL','Chủ App','ADMIN',true,'Tự tạo bởi setupV109',new Date()]]);sheets.roles.getRange(r,5).insertCheckboxes();sheets.roles.getRange(r,7).setNumberFormat('dd/MM/yyyy HH:mm');seeded=seedEmail;
  }
  const props=PropertiesService.getScriptProperties();if(!props.getProperty(SECURITY_V109_CONFIG.FALLBACK_ROLE_PROPERTY))props.setProperty(SECURITY_V109_CONFIG.FALLBACK_ROLE_PROPERTY,SECURITY_V109_CONFIG.DEFAULT_FALLBACK_ROLE);
  const regression=runRegressionTestsV109();
  return {ok:regression.pass,appVersion:APP_VERSION,securityVersion:SECURITY_V109_CONFIG.VERSION,seededAdmin:seeded?true:false,seededPrincipal:seeded?seeded.replace(/(^.).*(@.*$)/,'$1***$2'):'',fallbackRole:props.getProperty(SECURITY_V109_CONFIG.FALLBACK_ROLE_PROPERTY),regression:regression,context:coreSecurityContext_('')};
}

function setupV91() {
  const metaMessage = syncMasterMetaCatalog();
  clearDashboardCache();
  return APP_VERSION + ' sẵn sàng. ' + metaMessage;
}

function setupInventoryValueColumns() {
  const sheet = getSpreadsheet_().getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  ensureInventoryValueColumns_(sheet);
  clearDashboardCache();
  return 'Đã khởi tạo cột giá nhập tham khảo và giá trị tồn kho.';
}

function setupV9() {
  setupInventoryValueColumns();
  const metaMessage = syncMasterMetaCatalog();
  const mapMessage = syncWarehouse145MasterCatalog();
  clearDashboardCache();
  return APP_VERSION + ' đã sẵn sàng.\n' + metaMessage + '\n' + mapMessage;
}

function setupV92() {
  const metaSheet = ensureMasterMetaSheet_();
  syncMasterMetaCatalog();

  const meta = readMasterMeta_(metaSheet);
  meta.rows.forEach(function(row) {
    if (row.manage145 !== null) return;
    metaSheet.getRange(row.sheetRow, MASTER_META_CONFIG.MANAGE_145_COLUMN).setValue(false);
  });
  const count = Math.max(0, metaSheet.getLastRow() - 1);
  if (count) metaSheet.getRange(2, MASTER_META_CONFIG.MANAGE_145_COLUMN, count, 1).insertCheckboxes();

  clearDashboardCache();
  return APP_VERSION + ' sẵn sàng. Mặc định không bắt buộc dự trữ tại Kho 145; bật từng SKU trong Chi tiết hàng khi cần quản lý mức tồn Kho 145.';
}

function setupV100AI() {
  ensureAiAuditSheet_();
  const status = getAiAssistantStatus();
  clearDashboardCache();
  return APP_VERSION + ' · ' + status.message + ' Model: ' + status.model;
}

function setupV101AI() {
  return setupV100AI();
}

function setupV105() {
  const tests=runRegressionTestsV105();
  if(!tests.pass) throw new Error('V10.5 regression test không đạt: '+tests.failed+'/'+tests.total+' test lỗi. Không tiếp tục setup.');
  const ledger=coreEnsureLedgerV105_();
  const audit=coreEnsureRuleAuditV105_();
  const can=coreSyncCanBoSungV105_();
  const sum=coreUpdateTongHopV105_();
  const integrity=auditInventoryIntegrityV105();
  clearDashboardCache();
  return {
    appVersion:APP_VERSION,
    ruleset:CORE_V105_CONFIG.RULESET_VERSION,
    ledgerSheet:ledger.getName(),
    ruleAuditSheet:audit.getName(),
    canBoSung:can,
    tongHop:sum,
    regression:tests,
    integrity:integrity,
    warnings:{unitMismatch58:integrity.unitMismatch58||[]},
    ok:tests.pass && integrity.duplicateCodes.length===0 && integrity.negative58.length===0 && integrity.negative145.length===0
  };
}

function setupV107() {
  const tests=runRegressionTestsV107();
  if(!tests.pass) throw new Error('V10.7 regression test không đạt: '+tests.failed+'/'+tests.total+' test lỗi. Không tiếp tục setup.');
  const core=setupV106();
  const ledger=coreEnsureLedger_();
  const lines=coreEnsureTransactionLines_();
  const sequenceSheet=coreEnsureDocumentSequence_();
  const reconcile=coreEnsureReconciliation_();
  const today=dateKey_(new Date());
  const sequence=coreSeedDocumentSequence_(today);
  const transactionHealth=auditTransactionHealth();
  clearDashboardCache();
  return {
    appVersion:APP_VERSION,
    transactionVersion:TRANSACTION_V107_CONFIG.VERSION,
    ruleset:CORE_V105_CONFIG.RULESET_VERSION,
    ledgerSheet:ledger.getName(),
    transactionLinesSheet:lines.getName(),
    sequenceSheet:sequenceSheet.getName(),
    reconciliationSheet:reconcile.getName(),
    sequence:sequence,
    transactionHealth:transactionHealth,
    regression:tests,
    integrity:core.integrity,
    ok:tests.pass && core.ok && transactionHealth.needsReconciliation===0
  };
}

function setupV106() {
  const tests=runRegressionTestsV106();
  if(!tests.pass) throw new Error('V10.6 regression test không đạt: '+tests.failed+'/'+tests.total+' test lỗi. Không tiếp tục setup.');
  const core=setupV105();
  return {
    appVersion:APP_VERSION,
    agentVersion:AI_AGENT_CONFIG.VERSION,
    ruleset:CORE_V105_CONFIG.RULESET_VERSION,
    ledgerSheet:core.ledgerSheet,
    ruleAuditSheet:core.ruleAuditSheet,
    canBoSung:core.canBoSung,
    tongHop:core.tongHop,
    regression:tests,
    integrity:core.integrity,
    ok:tests.pass && core.ok
  };
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.

function ensureInventoryValueColumns_(sheet) {
  if (!sheet) {
    throw new Error('Không tìm thấy sheet ' + DASHBOARD_CONFIG.STOCK_SHEET);
  }

  const headerRow = DASHBOARD_CONFIG.STOCK_HEADER_ROW;
  const headers = [
    'GIÁ NHẬP THAM KHẢO',
    'GIÁ TRỊ TỒN KHO',
    'CẬP NHẬT GIÁ'
  ];
  const headerRange = sheet.getRange(headerRow, DASHBOARD_CONFIG.PRICE_COLUMN, 1, 3);
  const currentHeaders = headerRange.getDisplayValues()[0];
  const headersNeedSetup = currentHeaders.join('|') !== headers.join('|');

  if (headersNeedSetup) {
    headerRange.setValues([headers]);
    headerRange
      .setBackground('#1F4E78')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);

    sheet.setColumnWidth(DASHBOARD_CONFIG.PRICE_COLUMN, 145);
    sheet.setColumnWidth(DASHBOARD_CONFIG.VALUE_COLUMN, 150);
    sheet.setColumnWidth(DASHBOARD_CONFIG.PRICE_UPDATED_COLUMN, 145);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW) return;

  const rowCount = lastRow - DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + 1;
  const valueRange = sheet.getRange(
    DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW,
    DASHBOARD_CONFIG.VALUE_COLUMN,
    rowCount,
    1
  );
  const currentFormulas = valueRange.getFormulas();
  const formulaNeedsSetup = currentFormulas.some(function(row) {
    return !row[0];
  });

  if (formulaNeedsSetup) {
    const formulas = [];
    for (let offset = 0; offset < rowCount; offset += 1) {
      const row = DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW + offset;
      formulas.push([
        '=IF(OR(E' + row + '="";I' + row + '="");0;E' + row + '*I' + row + ')'
      ]);
    }

    valueRange.setFormulas(formulas).setNumberFormat('#,##0');
    sheet
      .getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW, DASHBOARD_CONFIG.PRICE_COLUMN, rowCount, 1)
      .setNumberFormat('#,##0');
    sheet
      .getRange(DASHBOARD_CONFIG.STOCK_FIRST_DATA_ROW, DASHBOARD_CONFIG.PRICE_UPDATED_COLUMN, rowCount, 1)
      .setNumberFormat('dd/MM/yyyy HH:mm');
  }
}

function syncMasterMetaCatalog() {
  const spreadsheet = getSpreadsheet_();
  const metaSheet = ensureMasterMetaSheet_();
  const stockSheet = spreadsheet.getSheetByName(DASHBOARD_CONFIG.STOCK_SHEET);
  const masterStock = readStock_(stockSheet);
  const current = readMasterMeta_(metaSheet);
  const existing = current.byCode;

  const rows = masterStock.map(function(item) {
    const meta = existing[normalize_(item.code)] || {};
    return [
      item.code,
      item.name,
      meta.aliases || '',
      meta.location58 || '',
      meta.location145 || '',
      meta.threshold145 === null || meta.threshold145 === undefined ? '' : meta.threshold145,
      meta.note || '',
      meta.updatedRaw ? (typeof meta.updatedRaw === 'number' ? new Date(meta.updatedRaw) : meta.updatedRaw) : '',
      meta.manage145 === true ? true : (meta.manage145 === false ? false : ''),
      meta.threshold58Override === null || meta.threshold58Override === undefined ? '' : meta.threshold58Override
    ];
  });

  const oldLastRow = metaSheet.getLastRow();
  if (oldLastRow >= 2) {
    metaSheet.getRange(2, 1, oldLastRow - 1, MASTER_META_CONFIG.TOTAL_COLUMNS).clearContent();
  }
  if (rows.length) {
    metaSheet.getRange(2, 1, rows.length, MASTER_META_CONFIG.TOTAL_COLUMNS).setValues(rows);
    metaSheet.getRange(2, 6, rows.length, 1).setNumberFormat('0');
    metaSheet.getRange(2, 8, rows.length, 1).setNumberFormat('dd/MM/yyyy HH:mm');
    metaSheet.getRange(2, 9, rows.length, 1).insertCheckboxes();
    metaSheet.getRange(2, 10, rows.length, 1).setNumberFormat('0');
  }

  clearDashboardCache();
  return 'MASTER_META đã đồng bộ ' + rows.length + ' mã theo danh mục Kho 58.';
}

function setupV93() {
  ensureTransferSheet_();
  clearDashboardCache();
  return APP_VERSION + ' sẵn sàng. Sheet ' + DASHBOARD_CONFIG.TRANSFER_SHEET + ' đã được kiểm tra.';
}

function setupV108() {
  const tests=runRegressionTestsV108();
  if(!tests.pass)throw new Error('V10.8 regression test không đạt: '+tests.failed+'/'+tests.total+' test lỗi.');
  const core=setupV107(),proactive=getProactiveInsights(true);
  clearDashboardCache();
  return {appVersion:APP_VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,proactiveVersion:PROACTIVE_V108_CONFIG.VERSION,regression:tests,transactionHealth:core.transactionHealth,summary:proactive.summary,ok:tests.pass&&core.ok};
}



// ===== END 90_Setup_Migration.gs =====


// ===== BEGIN 95_Compatibility.gs =====

// QL KHO THÀNH ĐỨC · V10.10.2
// LEGACY COMPATIBILITY LAYER
// Keep only externally callable V10.7-V10.9 public APIs during rollout.
// Internal production code MUST call canonical names, not these wrappers.

function getSecurityContextV109(actorHint) { return getSecurityContext(actorHint); }
function updateUserRoleV109(email, role, displayName, actorHint) { return updateUserRole(email, role, displayName, actorHint); }
function getTransactionHealthV107() { return getTransactionHealth(); }
function auditTransactionHealthV107() { return auditTransactionHealth(); }
function reconcileStaleTransactionsV107(actorHint) { return reconcileStaleTransactions(actorHint); }
function getProactiveInsightsV108(options) { return getProactiveInsights(options); }


// ===== END 95_Compatibility.gs =====


// ===== BEGIN 98_Utils.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 98_Utils.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function coreRequiredRoleV109_(permission){return SECURITY_V109_CONFIG.PERMISSIONS[String(permission||'').toUpperCase()]||'ADMIN';}

function coreReadRoleRowsV109_(){
  const sh=coreEnsureSecuritySheets_().roles,last=sh.getLastRow();
  if(last<2)return [];
  return sh.getRange(2,1,last-1,7).getValues().map(function(r,i){return {row:i+2,principal:String(r[0]||'').trim(),type:String(r[1]||'').trim().toUpperCase(),displayName:String(r[2]||'').trim(),role:coreNormalizeRole_(r[3]),enabled:r[4]!==false&&String(r[4]).toUpperCase()!=='FALSE',note:String(r[5]||''),updated:r[6]};}).filter(function(x){return x.principal;});
}

function coreRequirePermissionV109_(permission,actorHint,action,detail){
  const ctx=coreSecurityContext_(actorHint),ok=coreRoleAllows_(ctx.role,permission);
  coreLogSecurityAudit_(ctx,permission,ok?'ALLOW':'DENY',action,actorHint,detail);
  if(!ok)throw new Error('Không đủ quyền '+permission+'. Vai trò hiện tại: '+ctx.role+'; yêu cầu tối thiểu: '+coreRequiredRoleV109_(permission)+'.');
  return ctx;
}

function ensureAiAuditSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(AI_CONFIG.AUDIT_SHEET);
  const headers = [
    'THỜI GIAN','PREVIEW_ID','LỆNH NGƯỜI DÙNG','TÁC VỤ','KHO / HƯỚNG',
    'NGƯỜI THỰC HIỆN','TRẠNG THÁI','KẾT QUẢ / LỖI','MODEL'
  ];
  if (!sheet) sheet = ss.insertSheet(AI_CONFIG.AUDIT_SHEET);
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  const current = sheet.getRange(1,1,1,headers.length).getDisplayValues()[0];
  if (current.join('|') !== headers.join('|')) {
    sheet.getRange(1,1,1,headers.length).setValues([headers])
      .setBackground('#1F4E78').setFontColor('#FFFFFF').setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
    sheet.setFrozenRows(1);
  }
  [140,220,420,110,130,160,110,440,150].forEach(function(width,index){
    try { sheet.setColumnWidth(index+1,width); } catch(e) {}
  });
  return sheet;
}

function statusOf_(qty, threshold) {
  if (qty < 0) return 'ÂM KHO';
  if (qty === 0) return 'HẾT HÀNG';
  if (qty <= threshold) return 'SẮP HẾT';
  return 'OK';
}

function category_(name) {
  const text = normalize_(name);

  if (
    ['muc nap chai', 'muc in epson', 'muc in canon', 'muc in hp', 'muc in brother', 'muc nuoc']
      .some(function(keyword) { return text.indexOf(keyword) !== -1; })
  ) return 'Mực nạp / Mực nước';

  if (['hop muc', 'phoi muc'].some(function(keyword) {
    return text.indexOf(keyword) !== -1;
  })) return 'Hộp mực';

  if (['drum', 'trong', 'cum drum'].some(function(keyword) {
    return text.indexOf(keyword) !== -1;
  })) return 'Drum / Trống';

  if (
    ['bao lua', 'rulo', 'gat', 'truc', 'chip', 'nhong', 'qua dao', 'mika', 'ong say']
      .some(function(keyword) { return text.indexOf(keyword) !== -1; })
  ) return 'Linh kiện';

  if (
    ['may in', 'ban phim', 'chuot', 'bo chuyen', 'ribbon', 'ruy bang', 'giay']
      .some(function(keyword) { return text.indexOf(keyword) !== -1; })
  ) return 'Thiết bị / VPP';

  return 'Khác';
}

function normalize_(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function toNumber_(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  const text = String(value == null ? '' : value)
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function dateKey_(value) {
  if (
    Object.prototype.toString.call(value) === '[object Date]' &&
    !Number.isNaN(value.getTime())
  ) {
    return Utilities.formatDate(value, DASHBOARD_CONFIG.TIME_ZONE, 'yyyy-MM-dd');
  }

  const text = String(value || '').trim();

  let match = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  if (match) {
    return [
      match[3],
      String(Number(match[2])).padStart(2, '0'),
      String(Number(match[1])).padStart(2, '0')
    ].join('-');
  }

  match = text.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
  if (match) {
    return [
      match[1],
      String(Number(match[2])).padStart(2, '0'),
      String(Number(match[3])).padStart(2, '0')
    ].join('-');
  }

  return '';
}

function displayDate_(dateKey) {
  const match = String(dateKey || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? [match[3], match[2], match[1]].join('/') : '--';
}

function ageInDays_(value) {
  if (
    Object.prototype.toString.call(value) !== '[object Date]' ||
    Number.isNaN(value.getTime())
  ) {
    return null;
  }

  const now = new Date();
  const difference = now.getTime() - value.getTime();
  return Math.max(0, Math.floor(difference / 86400000));
}

function displayDateTime_(value) {
  if (
    Object.prototype.toString.call(value) === '[object Date]' &&
    !Number.isNaN(value.getTime())
  ) {
    return Utilities.formatDate(value, DASHBOARD_CONFIG.TIME_ZONE, 'dd/MM/yyyy HH:mm');
  }

  return String(value || '').trim();
}


// ===== V10.8.0 · PROACTIVE INVENTORY INTELLIGENCE =====



// ===== END 98_Utils.gs =====


// ===== BEGIN 99_Tests.gs =====

// QL KHO THÀNH ĐỨC · V10.10.1 MODULAR REFACTOR
// Module: 99_Tests.gs
// Logic preserved from V10.9.0; no intentional business-rule changes.

function runRegressionTestsV109(){
  const base=runRegressionTestsV108(),extra=[];function add(name,pass,detail){extra.push({name:name,pass:Boolean(pass),detail:detail||{}});}
  add('VIEWER can READ',coreRoleAllows_('VIEWER','READ')===true,{});
  add('VIEWER cannot OUT',coreRoleAllows_('VIEWER','INVENTORY_OUT')===false,{});
  add('OPERATOR can IN',coreRoleAllows_('OPERATOR','INVENTORY_IN')===true,{});
  add('OPERATOR can OUT',coreRoleAllows_('OPERATOR','INVENTORY_OUT')===true,{});
  add('OPERATOR can TRANSFER',coreRoleAllows_('OPERATOR','TRANSFER')===true,{});
  add('OPERATOR cannot ADJUST',coreRoleAllows_('OPERATOR','ADJUST')===false,{});
  add('MANAGER can ADJUST',coreRoleAllows_('MANAGER','ADJUST')===true,{});
  add('MANAGER cannot CREATE_SKU',coreRoleAllows_('MANAGER','CREATE_SKU')===false,{});
  add('ADMIN can CREATE_SKU',coreRoleAllows_('ADMIN','CREATE_SKU')===true,{});
  add('ADMIN can UPDATE_PRICE',coreRoleAllows_('ADMIN','UPDATE_PRICE')===true,{});
  add('ADMIN can UPDATE_MAPPING',coreRoleAllows_('ADMIN','UPDATE_MAPPING')===true,{});
  add('Unknown role falls back OPERATOR',coreNormalizeRole_('xxx')==='OPERATOR',{});
  const merged=base.results.concat(extra);return {appVersion:APP_VERSION,securityVersion:SECURITY_V109_CONFIG.VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,securityTests:extra.length,results:merged};
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.

function runRegressionTestsV109FromMenu(){const r=runRegressionTestsV109();SpreadsheetApp.getUi().alert('Regression V10.9: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}

function runRegressionTestsV1106(){
  const base=runRegressionTestsV109();
  const resolver=aiResolverV2SelfTest_();
  const extra=(resolver.results||[]).map(function(x){return {name:'V10.10.6 · '+x.name,pass:Boolean(x.pass),detail:x.detail||{}};});
  const merged=(base.results||[]).concat(extra);
  return {appVersion:APP_VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,resolverVersion:AI_RESOLVER_CONFIG.VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,resolverTests:extra.length,results:merged};
}

function runRegressionTestsV1106FromMenu(){const r=runRegressionTestsV1106();SpreadsheetApp.getUi().alert('Regression V10.10.6: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));}


function runRegressionTestsV108FromMenu() {
  const r=runRegressionTestsV108();
  SpreadsheetApp.getUi().alert('Regression V10.8: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));
}

function runRegressionTestsV107FromMenu() {
  const r=runRegressionTestsV107();
  SpreadsheetApp.getUi().alert('Regression V10.7: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));
}

function runRegressionTestsV106FromMenu() {
  const r=runRegressionTestsV106();
  SpreadsheetApp.getUi().alert('Regression V10.6: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));
}

function runRegressionTestsV105FromMenu() {
  const r=runRegressionTestsV105();
  SpreadsheetApp.getUi().alert('Regression V10.5: '+r.passed+'/'+r.total+' pass'+(r.pass?' ✅':' ❌'));
}

function auditInventoryLogicV104() {
  const integrity=auditInventoryIntegrityV104();
  const resolver=aiResolverSelfTestV104();
  const codeText='Chat AI → action_plan có cấu trúc → deterministic SKU resolver → live preview → user confirm → live recheck → write/rollback';
  return {appVersion:APP_VERSION,architecture:codeText,integrity:integrity,resolver:resolver,pass:resolver.pass&&integrity.duplicateCodes.length===0&&integrity.negative58.length===0&&integrity.negative145.length===0&&integrity.missingUnit58.length===0,serverTime:Utilities.formatDate(new Date(),DASHBOARD_CONFIG.TIME_ZONE,'dd/MM/yyyy HH:mm:ss')};
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.

function runRegressionTestsV105() {
  function cat(code,name,unit,aliases){return {code:code,name:name,unit:unit||'',aliases:aliases||'',legacyNames:[],searchText:normalize_([code,name,aliases||''].join(' '))};}
  const catalog=[
    cat('TD-0117','Máy in Brother HL-2321D - CH','Máy'),
    cat('TD-0277','Máy in Canon MF 241D - đã qua sử dụng','Máy','Canon 241D cũ'),
    cat('TD-0278','Máy in Brother HL-2361DN - đã qua sử dụng','Máy','Brother 2361DN; HL2361DN cũ'),
    cat('TD-0248','Hộp mực in 12A/303/FX9 - TOPZON','Hộp','12a top'),
    cat('TD-0019','Hộp mực in 12A/303/FX9 - WB','Hộp','12a wb; 12a whitebox'),
    cat('TD-0274','Mực in Canon GI-71C ( Nobox)','Chai'),
    cat('TD-0107','Mực in Canon GI-790C - CH','Chai'),
    cat('TD-0111','Mực in Canon GI-790C (NoBox) - CH','Chai'),
    cat('TD-0132','Mực nạp chai Brother Gold 4 - PCS','Chai','Brother 4; Gold 4'),
    cat('TD-0087','Mực in Brother BTD60BK - CH','Chai'),
    cat('TD-0024','Mực in 83A/337 - WB','Hộp','83a 337 whitebox'),
    cat('TD-0023','Mực in 83A/337 - INKVIET','Hộp'),
    cat('TD-0144','Trống Drum rời DR-B022/DR-2385 - ES','Cái'),
    cat('TD-0093','Cụm Drum Brother DR-B022 Chính hãng - CH','Cụm')
  ];
  const results=[];
  function add(name,expected,actual,pass){results.push({name:name,expected:expected,actual:actual,pass:Boolean(pass)});}
  function resolve(query,expected){const r=coreResolveSkuIdentityV105_(query,catalog);const actual=r.resolved?r.item.code:'BLOCKED:'+r.reason;add('Resolve '+query,expected,actual,actual===expected);}
  function blocked(query,reason,subset){const r=coreResolveSkuIdentityV105_(query,subset||catalog);const actual=r.resolved?r.item.code:'BLOCKED:'+r.reason;add('Block '+query,'BLOCKED:'+reason,actual,!r.resolved&&r.reason===reason);}

  resolve('Brother HL-2361DN đã qua sử dụng','TD-0278');
  resolve('HL2361DN cũ','TD-0278');
  resolve('Brother HL-2321D','TD-0117');
  resolve('Canon MF 241D đã qua sử dụng','TD-0277');
  resolve('Canon 241D cũ','TD-0277');
  resolve('12A TOPZON','TD-0248');
  resolve('12a top','TD-0248');
  resolve('12A WB','TD-0019');
  resolve('12a whitebox','TD-0019');
  resolve('Canon GI-71C Nobox','TD-0274');
  blocked('Canon GI-790C chính hãng','MODEL_VARIANT_AMBIGUOUS');
  resolve('Canon GI-790C Nobox','TD-0111');
  resolve('Brother Gold 4 PCS','TD-0132');
  resolve('Mực nạp Brother 4','TD-0132');
  resolve('Brother BTD60BK chính hãng','TD-0087');
  resolve('83A 337 WB','TD-0024');
  resolve('83A 337 INKVIET','TD-0023');
  resolve('Trống DR-2385 ES','TD-0144');
  resolve('Cụm Drum DR-B022 chính hãng','TD-0093');
  resolve('TD-0248 Hộp mực 12A TOPZON','TD-0248');

  blocked('Brother HL-2361DN','MODEL_NOT_FOUND',catalog.filter(function(x){return x.code!=='TD-0278';}));
  blocked('Brother HL-9999DN','MODEL_NOT_FOUND');
  blocked('Canon GI-71M','MODEL_NOT_FOUND');
  blocked('TD-0117 Brother HL-2361DN','CODE_IDENTITY_MISMATCH');
  blocked('TD-0277 Brother HL-2361DN','CODE_IDENTITY_MISMATCH');
  blocked('Canon GI-790C TOPZON','VARIANT_NOT_FOUND');
  blocked('83A 337 TOPZON','VARIANT_NOT_FOUND');
  const amb=coreResolveSkuIdentityV105_('12A',catalog); add('12A không hậu tố phải mơ hồ','BLOCKED',amb.resolved?amb.item.code:'BLOCKED:'+amb.reason,!amb.resolved);
  const amb83=coreResolveSkuIdentityV105_('83A 337',catalog); add('83A/337 không hậu tố phải mơ hồ','BLOCKED',amb83.resolved?amb83.item.code:'BLOCKED:'+amb83.reason,!amb83.resolved);

  [['OUT','Shopee','','Gửi Shopee'],['OUT','TikTok','','Gửi TikTok'],['OUT','INKVIET','','Đóng INKVIET'],['OUT','','gửi nhà xe','Gửi xe'],['OUT','','','Xuất bán'],['IN','','','Nhập hàng'],['IN','','Nhập chuyển kho','Nhập chuyển kho'],['ADJUST','','','Kiểm kho'],['TRANSFER','','','Điều chuyển kho']].forEach(function(c){const a=coreBusinessReasonV105_(c[0],c[1],c[2]);add('Reason '+c.slice(0,3).join('|'),c[3],a,a===c[3]);});

  [[0,2,'HẾT HÀNG'],[1,2,'SẮP HẾT'],[2,2,'SẮP HẾT'],[3,2,'OK'],[1,0,'OK']].forEach(function(c){const a=statusOf_(c[0],c[1]);add('Status '+c[0]+'/'+c[1],c[2],a,a===c[2]);});
  [['Máy in Brother HL-2361DN','Máy'],['Hộp mực 12A','Hộp'],['Mực nạp chai 12A PCS','Chai'],['Dây cáp máy in 1.8m','Sợi'],['Cụm Drum DR-B022','Cụm'],['Mực gói Ricoh 1KG','Gói'],['Xấp giấy A4','Xấp']].forEach(function(c){const a=inferUnitFromName_(c[0]);add('ĐVT '+c[0],c[1],a,a===c[1]);});

  const goodPlan={slips:[{slip_no:'1',operation:'OUT',actor_hint:'Thanh',lines:[{item_text:'12A TOPZON',source_excerpt:'12A TOPZON SL 2',quantity:2,target_quantity:-1}]}]};
  let vr=coreValidateActionPlanV105_(goodPlan,{actor:'Thanh'}); add('Plan hợp lệ','OK',vr.ok?'OK':'BLOCK',vr.ok);
  const badActor={slips:[{slip_no:'1',operation:'OUT',actor_hint:'',lines:[{item_text:'12A TOPZON',quantity:2,target_quantity:-1}]}]};
  vr=coreValidateActionPlanV105_(badActor,{actor:''}); add('Plan thiếu người thực hiện','R20',vr.failures.map(function(x){return x.ruleId;}).join(','),vr.failures.some(function(x){return x.ruleId==='R20';}));
  const badOp={slips:[{slip_no:'1',operation:'UNKNOWN',actor_hint:'Thanh',lines:[{item_text:'12A TOPZON',quantity:2,target_quantity:-1}]}]};
  vr=coreValidateActionPlanV105_(badOp,{actor:'Thanh'}); add('Plan sai operation','R49',vr.failures.map(function(x){return x.ruleId;}).join(','),vr.failures.some(function(x){return x.ruleId==='R49';}));
  const dupSlip={slips:[{slip_no:'1',operation:'IN',actor_hint:'Thanh',lines:[{item_text:'12A TOPZON',quantity:1,target_quantity:-1}]},{slip_no:'1',operation:'OUT',actor_hint:'Thanh',lines:[{item_text:'12A TOPZON',quantity:1,target_quantity:-1}]}]};
  vr=coreValidateActionPlanV105_(dupSlip,{actor:'Thanh'}); add('Trùng số phiếu logic','R03',vr.failures.map(function(x){return x.ruleId;}).join(','),vr.failures.some(function(x){return x.ruleId==='R03';}));
  const negAdj={slips:[{slip_no:'1',operation:'ADJUST',actor_hint:'Thanh',lines:[{item_text:'12A TOPZON',quantity:0,target_quantity:-2}]}]};
  vr=coreValidateActionPlanV105_(negAdj,{actor:'Thanh'}); add('Điều chỉnh âm','R08',vr.failures.map(function(x){return x.ruleId;}).join(','),vr.failures.some(function(x){return x.ruleId==='R08';}));

  return {appVersion:APP_VERSION,ruleset:CORE_V105_CONFIG.RULESET_VERSION,total:results.length,passed:results.filter(function(x){return x.pass;}).length,failed:results.filter(function(x){return !x.pass;}).length,pass:results.every(function(x){return x.pass;}),results:results};
}

function aiResolverV2SelfTest_() {
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

function runRegressionTestsV107() {
  const base=runRegressionTestsV106(),extra=[];
  function add(name,pass,detail){extra.push({name:name,pass:Boolean(pass),detail:detail||{}});}
  add('Parse PXK suffix',coreParseVoucherSuffix_('PXK-20260910-008','20260910')===8,{});
  add('Parse dotted suffix keeps base',coreParseVoucherSuffix_('PXK-20260910-008.1','20260910')===8,{});
  add('Wrong date not parsed',coreParseVoucherSuffix_('PNK-20260909-099','20260910')===0,{});
  add('Build PNK',coreBuildVoucher_('IN','20260910',12)==='PNK-20260910-012',{});
  add('Build PXK',coreBuildVoucher_('OUT','20260910',7)==='PXK-20260910-007',{});
  add('Build KK',coreBuildVoucher_('ADJUST','20260910',3)==='KK-20260910-003',{});
  add('Build DCK',coreBuildVoucher_('TRANSFER','20260910',4)==='DCK-20260910-004',{});
  add('PREPARED is open',coreIsOpenTxStatus_('PREPARED')===true,{});
  add('COMMITTING is open',coreIsOpenTxStatus_('COMMITTING')===true,{});
  add('COMMITTED is final',coreIsFinalTxStatus_('COMMITTED')===true,{});
  add('NEEDS_RECONCILIATION is final',coreIsFinalTxStatus_('NEEDS_RECONCILIATION')===true,{});
  const line=coreBuildTransactionLine_('TX1','PV1','2',1,'PXK-20260910-011','58','OUT','TD-0248','12A TOPZON','Hộp',2,10,8,{reason:'Xuất bán'});
  add('Transaction line preserves before/after',line[10]===2&&line[11]===10&&line[12]===8&&line[13]==='VALIDATED',line);
  const merged=base.results.concat(extra);
  return {appVersion:APP_VERSION,transactionVersion:TRANSACTION_V107_CONFIG.VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,ruleset:CORE_V105_CONFIG.RULESET_VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,transactionTests:extra.length,results:merged};
}

function aiResolverSelfTestV104() {
  const catalog=aiBuildCatalog_(),tests=[
    {q:'Máy in Brother HL-2361DN - đã qua sử dụng',mustNot:['TD-0117','TD-0277'],expectReason:'MODEL_NOT_FOUND'},
    {q:'Máy in Brother HL-2321D - CH',expect:'TD-0117'},
    {q:'Máy in Canon MF 241D - đã qua sử dụng',expect:'TD-0277'},
    {q:'Hộp mực in 12A/303/FX9 - TOPZON',expect:'TD-0248'},
    {q:'Hộp mực in 12A/303/FX9 - WB',expect:'TD-0019'},
    {q:'Mực nạp chai Brother Gold 4 - PCS',expect:'TD-0132'},
    {q:'Mực in Brother BTD60BK - CH',expect:'TD-0087'},
    {q:'Mực in Canon GI-71C ( Nobox)',expect:'TD-0274'}
  ];
  const results=tests.map(function(t){const r=aiResolveItem_(t.q,catalog),code=r.resolved?r.item.code:'';let pass=true;if(t.expect)pass=normalize_(code)===normalize_(t.expect);if(t.mustNot)pass=pass&&t.mustNot.map(normalize_).indexOf(normalize_(code))<0;if(t.expectReason)pass=pass&&r.reason===t.expectReason;return {query:t.q,resolved:r.resolved,code:code,reason:r.reason||'',pass:pass};});

  const msg='NHẬP KHO 1 Máy in Brother HL-2361DN - đã qua sử dụng, tạo mã hàng mới, từ Phòng Thu Mua Thanh Lý vào kho 58, người thực hiện THANH';
  const goodPlan=aiApplyDeterministicPlanGuards_(msg,{transaction_date:'',slips:[{slip_no:'1',operation:'IN',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'THANH',counterparty:'Phòng Thu Mua Thanh Lý',note:'',clarification:'',lines:[{item_text:'Máy in Brother HL-2361DN - đã qua sử dụng',source_excerpt:'Máy in Brother HL-2361DN - đã qua sử dụng',requested_code:'',quantity:1,target_quantity:-1,force_new_sku:true}]}]});
  const badPlan=aiApplyDeterministicPlanGuards_(msg,{transaction_date:'',slips:[{slip_no:'1',operation:'IN',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'THANH',counterparty:'Phòng Thu Mua Thanh Lý',note:'',clarification:'',lines:[{item_text:'Máy in Brother HL-2321D - CH',source_excerpt:'Máy in Brother HL-2321D - CH',requested_code:'TD-0117',quantity:1,target_quantity:-1,force_new_sku:false}]}]});
  const goodGuard=aiCheckActionPlanConsistency_(msg,goodPlan,null),badGuard=aiCheckActionPlanConsistency_(msg,badPlan,null);
  const tokenTest=aiStrongModelTokens_('NHẬP KHO 1 Máy in Brother HL-2361DN vào kho 58, SL 1');
  const pseudoTokens=tokenTest.filter(function(t){return /^(KHO|SL|SO|PHIEU|NGAY|IN)\d+$/.test(t);});
  const tonerTokenTest=aiStrongModelTokens_('Hộp mực in 12A/303/FX9 - TOPZON');
  const guardTests=[
    {name:'GOOD_NEW_SKU_PLAN',pass:goodGuard.ok,detail:goodGuard},
    {name:'MUTATED_MODEL_REJECTED',pass:!badGuard.ok,detail:badGuard},
    {name:'NO_OPERATIONAL_PSEUDO_MODEL',pass:pseudoTokens.length===0,detail:{tokens:tokenTest}},
    {name:'TONER_MODEL_TOKEN_CANONICAL',pass:tonerTokenTest.indexOf('12A')>=0&&tonerTokenTest.indexOf('IN12A')<0,detail:{tokens:tonerTokenTest}},
    {name:'EXPLICIT_NEW_SKU_FORCED',pass:Boolean(goodPlan.slips[0].lines[0].force_new_sku)&&!goodPlan.slips[0].lines[0].requested_code,detail:goodPlan.slips[0].lines[0]}
  ];
  return {appVersion:APP_VERSION,pass:results.every(function(x){return x.pass;})&&guardTests.every(function(x){return x.pass;}),resolver:results,guards:guardTests};
}

function runRegressionTestsV106() {
  const base=runRegressionTestsV105();
  const extra=[];
  function add(name,pass,detail){extra.push({name:name,pass:Boolean(pass),detail:detail||{}});}
  const state=aiNormalizeAgentStateV106_({lastItems:[{code:'TD-0248',name:'Hộp mực in 12A/303/FX9 - TOPZON',unit:'Hộp',qty58:10,qty145:2}],lastWarehouse:'58',lastOperation:'OUT'});
  let plan={transaction_date:'',slips:[{slip_no:'1',operation:'OUT',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'Thanh',counterparty:'Anh Thành',note:'Xuất bán',clarification:'',lines:[{item_text:'cái đó',source_excerpt:'xuất tiếp 2 cái đó',requested_code:'',quantity:2,target_quantity:-1,force_new_sku:false}]}]};
  const bound=aiApplyConversationReferencesV106_('xuất tiếp 2 cái đó',plan,state,null);
  add('Context reference binds exact last SKU',bound.slips[0].lines[0].requested_code==='TD-0248',bound.slips[0].lines[0]);
  const explicit=aiApplyConversationReferencesV106_('xuất 2 Brother HL-2321D',plan,state,null);
  add('Explicit model overrides context',explicit.slips[0].lines[0].requested_code==='',explicit.slips[0].lines[0]);
  add('Reference detection',aiMessageUsesReferenceV106_('lấy tiếp 2 cái đó')===true,{});
  add('Explicit identity detection',aiMessageHasExplicitIdentityV106_('Brother HL-2361DN')===true,{});
  add('No pseudo identity',aiMessageHasExplicitIdentityV106_('xuất tiếp 2 cái đó')===false,{});
  const seen={},rq=[{type:'GET_STOCK',query:'12A TOPZON',code:'',warehouse:'58',from_date:'',to_date:'',limit:0},{type:'GET_STOCK',query:'12A TOPZON',code:'',warehouse:'58',from_date:'',to_date:'',limit:0}];
  add('Tool request dedupe',aiUniqueToolRequestsV106_(rq,seen).length===1,seen);
  const alias=aiTryExplicitAliasCommandV106_('Từ nay 12a top là TD-0248');
  add('Explicit alias command parsed',Boolean(alias&&alias.code==='TD-0248'&&normalize_(alias.alias)==='12a top'),alias||{});
  add('Normal sentence does not auto-learn alias',aiTryExplicitAliasCommandV106_('12a top còn bao nhiêu')===null,{});
  const boundTool=aiApplyToolReferencesV106_([{type:'GET_MOVEMENTS',query:'mã đó',code:'',warehouse:'58',from_date:'2026-09-09',to_date:'2026-09-09',limit:40}],'hôm qua mã đó đã xuất bao nhiêu?',state);
  add('Tool reference binds TD code',boundTool[0].code==='TD-0248'&&boundTool[0].query==='TD-0248',boundTool[0]);
  add('Stock-query fail-safe detected',aiMessageNeedsLiveStockV106_('cái đó còn bao nhiêu?',{intent:'STOCK_QUERY'})===true,{});
  add('Remaining-qty fail-safe detected',aiMessageNeedsLiveStockV106_('xuất hết phần còn lại',{intent:'INVENTORY_ACTION'})===true,{});
  add('ROLLED_BACK is final',coreIsFinalTxStatus_('ROLLED_BACK')===true,{});
  add('VALIDATED is not final',coreIsFinalTxStatus_('VALIDATED')===false,{});
  const merged=base.results.concat(extra);
  return {appVersion:APP_VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,ruleset:CORE_V105_CONFIG.RULESET_VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,agentTests:extra.length,results:merged};
}

// QL KHO THÀNH ĐỨC · V10.9.0
// Modular source generated from deploy/Code.gs. Copy ALL .gs files if using modular deployment.

function runRegressionTestsV108() {
  const base=runRegressionTestsV107(),extra=[];
  function t(name,pass,detail){extra.push({name:name,pass:Boolean(pass),detail:String(detail||'')});}
  try{t('V108 proactive keyword ưu tiên',aiMessageNeedsProactive_('Hôm nay có gì cần làm?'));}catch(e){t('V108 proactive keyword ưu tiên',false,e.message);}
  try{t('V108 proactive keyword điều chuyển',aiMessageNeedsProactive_('Có mã nào nên điều chuyển từ kho 145?'));}catch(e){t('V108 proactive keyword điều chuyển',false,e.message);}
  try{t('V108 proactive keyword tồn chậm',aiMessageNeedsProactive_('Hàng nào tồn lâu 90 ngày?'));}catch(e){t('V108 proactive keyword tồn chậm',false,e.message);}
  try{t('V108 không bắt nhầm lệnh nhập',!aiMessageNeedsProactive_('Nhập 2 hộp 12A TOPZON'));}catch(e){t('V108 không bắt nhầm lệnh nhập',false,e.message);}
  try{const m=proactiveAggregateMovements_([{code:'TD-0001',dateKey:dateKey_(new Date()),output:3,input:0}],dateKey_(new Date()));t('V108 aggregate 30 ngày',m['TD-0001'].out30===3);}catch(e){t('V108 aggregate 30 ngày',false,e.message);}
  try{const x=proactiveCompactItem_({code:'TD-0001',name:'Test',qty58:10,qty145:0,totalQty:10,totalStockValue:100000,actionPriority:9},{out30:30,lastOutDate:dateKey_(new Date())},dateKey_(new Date()));t('V108 days cover',x.daysCover30===10,String(x.daysCover30));}catch(e){t('V108 days cover',false,e.message);}
  const merged=(base.results||[]).concat(extra);
  return {appVersion:APP_VERSION,proactiveVersion:PROACTIVE_V108_CONFIG.VERSION,agentVersion:AI_AGENT_CONFIG.VERSION,total:merged.length,passed:merged.filter(function(x){return x.pass;}).length,failed:merged.filter(function(x){return !x.pass;}).length,pass:merged.every(function(x){return x.pass;}),baseTotal:base.total,proactiveTests:extra.length,results:merged};
}



// ===== END 99_Tests.gs =====
