from pathlib import Path

p = Path('Index.html')
s = p.read_text(encoding='utf-8')

old = '''function showTab(tab){const b=document.querySelector(`.tab[data-tab="${tab}"]`);if(!b)return;document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("panel-"+tab).classList.add("active");setRefreshMode("Cập nhật thủ công");if(tab==="journal"){if(!journalLoaded)loadJournal(false)}else{if(tab==="transfer"&&!transferLoaded)loadTransferHistory(false);if(tab==="ai")initAiTab()}}'''
new = '''function showTab(tab){const b=document.querySelector(`.tab[data-tab="${tab}"]`);if(!b)return;document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");const panel=$("panel-"+tab);panel.classList.add("active");setRefreshMode("Cập nhật thủ công");if(tab==="journal"){if(!journalLoaded)loadJournal(false)}else{if(tab==="transfer"&&!transferLoaded)loadTransferHistory(false);if(tab==="ai")initAiTab()}requestAnimationFrame(()=>{const topBar=document.querySelector(".top"),tabs=$("tabs");const offset=(topBar?.offsetHeight||0)+(tabs?.offsetHeight||0)+14;const y=panel.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo({top:Math.max(0,y),behavior:"smooth"})})}'''
if old not in s:
    raise SystemExit('showTab pattern not found')
s = s.replace(old, new, 1)

marker = '</style>'
css = r'''

/* ===== V10.10.7 · AI WORKSPACE OVERLAP FIX ===== */
#panel-ai{scroll-margin-top:126px;overflow:visible!important;padding-top:4px}
#panel-ai .ai-tab-wrap{overflow:visible!important;position:relative;z-index:1}
#panel-ai .ai-dual-workspace{align-items:start!important;position:relative!important;z-index:1!important}
#panel-ai .ai-conversation-pane,
#panel-ai .ai-execution-pane{top:auto!important;z-index:1!important;max-height:none!important}
#panel-ai .ai-conversation-pane{position:relative!important;overflow:hidden!important}
#panel-ai .ai-execution-pane{position:relative!important;overflow:hidden!important}
#panel-ai .ai-head,
#panel-ai .ai-execution-head{position:relative!important;top:auto!important;z-index:2!important}
#panel-ai .chat-messages{max-height:calc(100vh - 455px)!important;min-height:360px!important;overflow-y:auto!important}
#panel-ai .ai-execution-body{min-height:360px!important;overflow:auto!important}
@media(max-width:1100px){
  #panel-ai{scroll-margin-top:118px}
  #panel-ai .chat-messages{max-height:55vh!important;min-height:320px!important}
  #panel-ai .ai-execution-body{min-height:300px!important}
}
@media(max-width:760px){
  #panel-ai{scroll-margin-top:108px;padding-top:2px}
  #panel-ai .chat-messages{max-height:52dvh!important;min-height:300px!important}
  #panel-ai .ai-execution-body{min-height:260px!important}
}
'''
if 'AI WORKSPACE OVERLAP FIX' not in s:
    s = s.replace(marker, css + '\n' + marker, 1)

p.write_text(s, encoding='utf-8')
print('Applied AI workspace overlap fix')
