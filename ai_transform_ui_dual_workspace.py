from pathlib import Path
import re

p=Path('Index.html')
html=p.read_text(encoding='utf-8')

marker='/* ===== V10.10.7 · AI DUAL WORKSPACE UX/UI ===== */'
if marker in html:
    raise SystemExit('Dual workspace already applied')

css=r'''

/* ===== V10.10.7 · AI DUAL WORKSPACE UX/UI ===== */
.ai-dual-workspace{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(360px,.85fr);gap:14px;align-items:start}
.ai-conversation-pane{min-width:0;overflow:hidden;border:1px solid #dfe5ee;border-radius:18px;box-shadow:0 10px 30px rgba(15,23,42,.06)}
.ai-conversation-pane .ai-head{border-bottom:1px solid #eef1f5;background:linear-gradient(180deg,#fff,#fbfdff)}
.ai-pane-eyebrow{font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#1d4ed8;margin-bottom:3px}
.ai-conversation-pane .chat-messages{min-height:420px!important;max-height:calc(100vh - 450px)!important}
.ai-execution-pane{position:sticky;top:82px;min-width:0;min-height:620px;max-height:calc(100vh - 100px);display:flex;flex-direction:column;background:#fff;border:1px solid #dfe5ee;border-radius:18px;box-shadow:0 10px 30px rgba(15,23,42,.07);overflow:hidden}
.ai-execution-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 16px 13px;border-bottom:1px solid #e8edf4;background:linear-gradient(180deg,#f8fbff,#fff)}
.ai-execution-head h3{font-size:18px;margin:0 0 4px;color:#172033}.ai-execution-head p{margin:0;color:#667085;font-size:11px;line-height:1.45}
.execution-status{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;border-radius:999px;padding:6px 9px;font-size:10.5px;font-weight:900;border:1px solid #d0d5dd;background:#f8fafc;color:#475467;white-space:nowrap}
.execution-status::before{content:'';width:7px;height:7px;border-radius:50%;background:#94a3b8}
.execution-status.busy{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.execution-status.busy::before{background:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.execution-status.pending{background:#fff7ed;border-color:#fed7aa;color:#9a3412}.execution-status.pending::before{background:#f59e0b}
.execution-status.blocked{background:#fef2f2;border-color:#fecaca;color:#991b1b}.execution-status.blocked::before{background:#ef4444}
.execution-status.success{background:#ecfdf3;border-color:#abefc6;color:#067647}.execution-status.success::before{background:#22c55e}
.ai-execution-body{flex:1;min-height:0;overflow:auto;padding:14px;background:#fbfcfe}
.ai-execution-pane .ai-preview{display:block;min-height:0!important;padding:0!important;margin:0!important;border:0!important;background:transparent!important;box-shadow:none!important}
.execution-empty{display:flex;min-height:350px;align-items:center;justify-content:center;text-align:center;padding:22px}.execution-empty-inner{max-width:300px}.execution-empty-icon{width:54px;height:54px;border-radius:16px;margin:0 auto 13px;display:grid;place-items:center;background:#eef4ff;color:#1d4ed8;font-size:25px}.execution-empty h4{margin:0 0 6px;font-size:16px;color:#172033}.execution-empty p{margin:0;color:#667085;font-size:11.5px;line-height:1.55}.execution-empty .execution-flow{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:14px}.execution-flow span{border:1px solid #e4e7ec;background:#fff;border-radius:999px;padding:4px 7px;font-size:9.5px;font-weight:800;color:#667085}
.ai-execution-pane .ai-preview.ready,.ai-execution-pane .ai-preview.warn{border:0!important;background:transparent!important}
.ai-execution-pane .ai-preview>h3{margin:1px 0 10px;font-size:16px!important}.ai-execution-pane .ai-batch-summary{border:1px solid #bfdbfe;background:#eff6ff;border-radius:12px;padding:10px 11px;margin-bottom:10px;font-size:11.5px;line-height:1.5;color:#1e3a8a}.ai-execution-pane .ai-slip{background:#fff;border:1px solid #e4e7ec;border-radius:13px;margin-top:9px;padding:11px!important}.ai-execution-pane .ai-line{grid-template-columns:90px minmax(0,1fr) 125px!important;gap:8px!important;padding:9px 0!important}.ai-execution-pane .ai-candidate{background:#fff;border:1px solid #fed7aa;border-radius:12px;padding:11px;margin-top:9px}
.ai-execution-actions{display:flex;gap:8px;padding:12px 14px;border-top:1px solid #e8edf4;background:#fff}.ai-execution-actions .action{flex:1;justify-content:center}.ai-execution-actions .secondary{background:#fff;color:#475467;border-color:#d0d5dd}.ai-execution-actions .secondary:hover{background:#f8fafc}.ai-execution-safety{padding:0 14px 12px;background:#fff;color:#667085;font-size:10px;line-height:1.45}.ai-execution-safety strong{color:#344054}
.execution-success{padding:18px 14px;text-align:center}.execution-success-icon{width:58px;height:58px;border-radius:18px;margin:3px auto 13px;display:grid;place-items:center;background:#dcfce7;color:#15803d;font-size:28px}.execution-success h4{margin:0 0 5px;font-size:17px;color:#166534}.execution-success p{margin:0;color:#667085;font-size:11.5px;line-height:1.55}.execution-success-vouchers{margin-top:13px;border:1px solid #abefc6;background:#f0fdf4;border-radius:11px;padding:9px;color:#166534;font-size:11px;font-weight:800;overflow-wrap:anywhere}
.ai-secondary-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);gap:14px;margin-top:14px}.ai-secondary-grid .ai-side-card{margin:0!important;box-shadow:0 6px 20px rgba(15,23,42,.045)!important}.ai-secondary-grid .ai-brief-list{max-height:260px!important}.ai-secondary-grid .ai-recent-list{max-height:260px!important}
@media(max-width:920px){.ai-dual-workspace{grid-template-columns:1fr}.ai-execution-pane{position:static;top:auto;min-height:460px;max-height:none}.ai-conversation-pane .chat-messages{max-height:56dvh!important}.ai-secondary-grid{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.ai-dual-workspace{gap:10px}.ai-conversation-pane,.ai-execution-pane{border-radius:15px}.ai-execution-head{padding:13px}.ai-execution-body{padding:11px}.ai-execution-actions{padding:10px 11px;position:sticky;bottom:0;z-index:4}.ai-execution-safety{padding:0 11px 10px}.ai-secondary-grid{grid-template-columns:1fr;gap:10px}.execution-empty{min-height:250px}.ai-execution-pane .ai-line{grid-template-columns:1fr!important}.ai-execution-pane .ai-line .move{text-align:left!important}}
'''
html=html.replace('</style>',css+'\n</style>',1)

new_section=r'''<section class="panel" id="panel-ai">
  <div class="ai-tab-wrap">
    <div class="ai-dual-workspace">
      <div class="ai-panel chat-shell ai-conversation-pane">
        <div class="ai-head">
          <div><div class="ai-pane-eyebrow">AI CONVERSATION</div><h2>🤖 Trợ lý AI kho</h2><p>Tra cứu, phân tích và giao việc bằng ngôn ngữ tự nhiên. AI chỉ chuẩn bị nghiệp vụ; ghi sổ nằm ở cửa sổ Thực hiện lệnh.</p></div>
        </div>
        <div class="ai-body" style="padding-bottom:0!important">
          <div class="chat-topbar">
            <div class="chat-context"><input id="aiActor" placeholder="Người thực hiện (ví dụ: Thanh, Phong)"><select id="aiDefaultWarehouse"><option value="58">Kho mặc định: 58</option><option value="145">Kho mặc định: 145</option></select></div>
            <div class="chat-tools"><span class="module-chip" id="aiStatusChip">AI: chưa kiểm tra</span><span class="module-chip" id="aiContextChip">Ngữ cảnh: trống</span><button class="mini" id="aiClear">Cuộc trò chuyện mới</button></div>
          </div>
          <div class="note" id="aiStatusText" style="margin-bottom:8px">--</div>
        </div>
        <div class="chat-messages" id="aiMessages"><div class="chat-empty"><h3>Chào anh 👋</h3><p>Anh cứ nói như đang giao việc cho nhân viên kho. Khi có nghiệp vụ cần ghi, hệ thống sẽ chuyển Action Plan sang cửa sổ bên phải để anh kiểm tra trước.</p></div></div>
        <div class="chat-composer">
          <div class="chat-compose-row"><textarea class="chat-input" id="aiCommand" placeholder="Nhắn cho Trợ lý AI... (Enter để gửi, Shift+Enter xuống dòng)"></textarea><button class="chat-send" id="aiAnalyze">Gửi</button></div>
          <div class="chat-suggestions">
            <button class="chat-suggestion" data-ai-example="Kiểm tra tồn kho của mã hoặc tên hàng: ">🔎 Tra tồn kho</button>
            <button class="chat-suggestion" data-ai-example="Nhập kho: ">📥 Nhập kho</button>
            <button class="chat-suggestion" data-ai-example="Xuất kho: ">📤 Xuất kho</button>
            <button class="chat-suggestion" data-ai-example="Điều chuyển từ Kho 58 sang Kho 145: ">⇄ Điều chuyển kho</button>
            <button class="chat-suggestion" data-ai-example="Kiểm kho và điều chỉnh tồn: ">✓ Kiểm kho</button>
            <button class="chat-suggestion" data-ai-example="Cho tôi xem phiếu ">🧾 Tra / sửa phiếu</button>
          </div>
        </div>
      </div>

      <aside class="ai-execution-pane" aria-label="Thực hiện lệnh kho">
        <div class="ai-execution-head">
          <div><div class="ai-pane-eyebrow">EXECUTION CONSOLE</div><h3>⚙️ Thực hiện lệnh</h3><p>Nguồn sự thật là dữ liệu live và Rule Engine. Chỉ ghi sổ sau khi anh xác nhận.</p></div>
          <span class="execution-status idle" id="aiExecutionStatus">Chưa có lệnh</span>
        </div>
        <div class="ai-execution-body">
          <div class="ai-preview execution-placeholder" id="aiPreview">
            <div class="execution-empty"><div class="execution-empty-inner"><div class="execution-empty-icon">⌁</div><h4>Chưa có Action Plan</h4><p>Hãy giao việc ở cửa sổ Trợ lý AI. Khi AI hiểu được nghiệp vụ, preview nhập/xuất/điều chuyển/kiểm kho sẽ xuất hiện tại đây.</p><div class="execution-flow"><span>AI hiểu ý</span><span>Rule Engine</span><span>Fresh-read tồn</span><span>Anh xác nhận</span></div></div></div>
          </div>
        </div>
        <div class="ai-execution-actions">
          <button class="action secondary" id="aiExecutionCancel" style="display:none">Hủy lệnh</button>
          <button class="action primary" id="aiExecute" disabled style="display:none">Xác nhận & ghi kho</button>
        </div>
        <div class="ai-execution-safety"><strong>Kiểm soát:</strong> AI không ghi trực tiếp. Backend đọc tồn live lần cuối, kiểm tra quyền, chống trùng và rollback nếu hậu kiểm lỗi.</div>
      </aside>
    </div>

    <div class="ai-secondary-grid">
      <div class="ai-side-card">
        <div class="ai-side-head"><h3>📊 Bản tin vận hành</h3><button class="mini" id="aiOpsRefresh">Phân tích live</button></div>
        <div class="note" id="aiOpsMeta">Chưa tải bản tin.</div>
        <div class="ai-brief-grid">
          <div class="ai-signal"><span>Điều chuyển</span><strong class="purple" id="aiOpsTransfer">—</strong></div>
          <div class="ai-signal"><span>Cần mua</span><strong class="red" id="aiOpsPurchase">—</strong></div>
          <div class="ai-signal"><span>Độ phủ thấp</span><strong class="amber" id="aiOpsCoverage">—</strong></div>
          <div class="ai-signal"><span>Không xuất 90 ngày</span><strong id="aiOpsSlow">—</strong></div>
        </div>
        <div class="ai-brief-list" id="aiOpsList"><div class="note">AI sẽ đọc tồn 2 kho và lịch sử 90 ngày khi mở tab này.</div></div>
        <div class="ai-quick-grid">
          <button class="mini primary" data-ai-quick="Hôm nay có gì cần ưu tiên trong 2 kho?">Hỏi AI ưu tiên</button>
          <button class="mini" data-ai-quick="Mã nào nên điều chuyển giữa Kho 58 và Kho 145?">Điều chuyển</button>
          <button class="mini" data-ai-quick="Hàng nào đang có tồn nhưng 90 ngày không xuất?">Tồn lâu</button>
          <button class="mini" data-ai-quick="Hàng nào xuất nhiều nhất 30 ngày và độ phủ tồn thấp?">Bán nhanh</button>
        </div>
        <div class="ai-brief-note">Các chỉ số tốc độ xuất/độ phủ là tín hiệu quản trị. App không tự mua hàng hoặc tự điều chuyển.</div>
      </div>
      <div class="ai-side-card">
        <div class="ai-side-head"><h3>🕘 Lệnh gần đây</h3><button class="mini" id="aiRecentReload">Tải lại</button></div>
        <div class="ai-recent-list" id="aiRecentList"><div class="note">Mở tab AI để tải lịch sử lệnh.</div></div>
        <div class="note" style="margin-top:9px">Bấm một lệnh để đưa vào ô chat và chỉnh lại nếu cần.</div>
      </div>
    </div>
  </div>
</section>

'''
pattern=r'<section class="panel" id="panel-ai">[\s\S]*?(?=\n\s*<section class="panel" id="panel-stock58">)'
html,n=re.subn(pattern,new_section,html,count=1)
if n!=1:
    raise SystemExit(f'AI section replacement failed: {n}')

old_reset='function resetAiPreview(clearCommand=false){aiPreviewData=null;$("aiExecute").disabled=true;$("aiExecute").style.display=\'none\';$("aiPreview").style.display=\'none\';if(clearCommand)$("aiCommand").value=""}'
new_reset=r'''function setAiExecutionStatus(state,text){const el=$("aiExecutionStatus");if(!el)return;el.className="execution-status "+String(state||"idle");el.textContent=text||"Chưa có lệnh"}
function resetAiPreview(clearCommand=false){
  aiPreviewData=null;
  $("aiExecute").disabled=true;$("aiExecute").style.display='none';
  const cancel=$("aiExecutionCancel");if(cancel)cancel.style.display='none';
  const preview=$("aiPreview");preview.style.display='block';preview.className='ai-preview execution-placeholder';
  preview.innerHTML='<div class="execution-empty"><div class="execution-empty-inner"><div class="execution-empty-icon">⌁</div><h4>Chưa có Action Plan</h4><p>Hãy giao việc ở cửa sổ Trợ lý AI. Khi AI hiểu được nghiệp vụ, preview sẽ xuất hiện tại đây để kiểm tra trước khi ghi.</p><div class="execution-flow"><span>AI hiểu ý</span><span>Rule Engine</span><span>Fresh-read tồn</span><span>Anh xác nhận</span></div></div></div>';
  setAiExecutionStatus('idle','Chưa có lệnh');
  if(clearCommand)$("aiCommand").value="";
}
function cancelAiExecution(){if(!aiPreviewData)return toast('Không có lệnh đang chờ');resetAiPreview(false);toast('Đã hủy Action Plan, chưa ghi dữ liệu')}
function renderAiExecutionSuccess(res){
  aiPreviewData=null;const b=$("aiExecute");b.disabled=true;b.style.display='none';const cancel=$("aiExecutionCancel");if(cancel)cancel.style.display='none';
  const vouchers=(res?.vouchers||[]).map(v=>v.voucher||v.transferId||'').filter(Boolean);const preview=$("aiPreview");preview.style.display='block';preview.className='ai-preview execution-success-state';
  preview.innerHTML=`<div class="execution-success"><div class="execution-success-icon">✓</div><h4>Đã thực hiện & hậu kiểm đạt</h4><p>${fmt(res?.slipCount||0)} phiếu · ${fmt(res?.lineCount||0)} dòng đã ghi sổ an toàn.</p>${vouchers.length?`<div class="execution-success-vouchers">${vouchers.map(esc).join(' · ')}</div>`:''}</div>`;
  setAiExecutionStatus('success','Đã thực hiện');
}'''
if old_reset not in html:
    raise SystemExit('resetAiPreview anchor missing')
html=html.replace(old_reset,new_reset,1)

html=html.replace("resetAiPreview(false);aiChatBusy=true;const b=$(\"aiAnalyze\");", "resetAiPreview(false);setAiExecutionStatus('busy','Đang phân tích');aiChatBusy=true;const b=$(\"aiAnalyze\");",1)

old_start='function renderAiPreview(data){\n  $("aiPreview").style.display=\'block\';'
new_start='function renderAiPreview(data){\n  $("aiPreview").style.display=\'block\';\n  const execCancel=$("aiExecutionCancel");if(execCancel)execCancel.style.display=data?\'inline-flex\':\'none\';\n  setAiExecutionStatus(data&&data.ready?\'pending\':\'blocked\',data&&data.ready?\'Chờ xác nhận\':\'Bị chặn\');'
if old_start not in html:
    raise SystemExit('renderAiPreview start anchor missing')
html=html.replace(old_start,new_start,1)

old_success="addChat('assistant',`✅ Đã ghi ${res.slipCount||0} phiếu${voucherText?' · '+voucherText:''}, ${res.lineCount||0} dòng. Hậu kiểm tồn và chứng từ đã đạt.`);resetAiPreview(false);refreshAfterDataChange(\"Giao dịch AI vừa được ghi\");"
new_success="addChat('assistant',`✅ Đã ghi ${res.slipCount||0} phiếu${voucherText?' · '+voucherText:''}, ${res.lineCount||0} dòng. Hậu kiểm tồn và chứng từ đã đạt.`);renderAiExecutionSuccess(res);refreshAfterDataChange(\"Giao dịch AI vừa được ghi\");"
if old_success not in html:
    raise SystemExit('execute success anchor missing')
html=html.replace(old_success,new_success,1)

html=html.replace("const b=$(\"aiExecute\");b.disabled=true;b.textContent='Đang kiểm tra tồn live & ghi...';", "setAiExecutionStatus('busy','Đang ghi sổ');const b=$(\"aiExecute\");b.disabled=true;b.textContent='Đang kiểm tra tồn live & ghi...';",1)
html=html.replace("withFailureHandler(e=>{b.disabled=false;b.textContent='Xác nhận & ghi kho';addChat('assistant','⚠️ Chưa ghi được kho: '+errMsg(e))})", "withFailureHandler(e=>{b.disabled=false;b.textContent='Xác nhận & ghi kho';setAiExecutionStatus('blocked','Ghi sổ thất bại');addChat('assistant','⚠️ Chưa ghi được kho: '+errMsg(e))})",1)

bind_anchor='$("aiAnalyze").onclick=sendAiChat;$("aiExecute").onclick=executeAiPreview;$("aiClear").onclick=newAiChat;'
if bind_anchor not in html:
    raise SystemExit('bind AI anchor missing')
html=html.replace(bind_anchor,'$("aiAnalyze").onclick=sendAiChat;$("aiExecute").onclick=executeAiPreview;$("aiExecutionCancel").onclick=cancelAiExecution;$("aiClear").onclick=newAiChat;',1)

fail_anchor="withFailureHandler(e=>{aiChatBusy=false;b.disabled=false;b.textContent='Gửi';$(\"aiThinking\")?.remove();resetAiPreview(false);addChat('assistant','Mình gặp lỗi khi xử lý: '+errMsg(e))})"
if fail_anchor in html:
    html=html.replace(fail_anchor,"withFailureHandler(e=>{aiChatBusy=false;b.disabled=false;b.textContent='Gửi';$(\"aiThinking\")?.remove();resetAiPreview(false);setAiExecutionStatus('blocked','Lỗi phân tích');addChat('assistant','Mình gặp lỗi khi xử lý: '+errMsg(e))})",1)

p.write_text(html,encoding='utf-8')
print('AI dual workspace UX/UI applied')
