from pathlib import Path

path = Path('Index.html')
html = path.read_text(encoding='utf-8')

old = '''    <div class="chat-suggestions">
      <button class="chat-suggestion" data-ai-example="12A TOPZON còn bao nhiêu ở 2 kho?">Hỏi tồn kho</button>
      <button class="chat-suggestion" data-ai-example="Nhập 1 máy in Canon MF241D cũ từ kho thu mua">Nhập kho</button>
      <button class="chat-suggestion" data-ai-example="Xuất 2 hộp mực 85A TOPZON cho khách cửa hàng">Xuất kho</button>
      <button class="chat-suggestion" data-ai-example="Hôm nay Kho 58 đã nhập xuất những gì?">Hỏi phát sinh hôm nay</button>
      <button class="chat-suggestion" data-ai-example="Hôm nay có gì cần ưu tiên trong 2 kho?">AI quản trị hôm nay</button>
    </div>'''

new = '''    <div class="chat-suggestions">
      <button class="chat-suggestion" data-ai-example="Kiểm tra tồn kho của mã hoặc tên hàng: ">🔎 Tra tồn kho</button>
      <button class="chat-suggestion" data-ai-example="Nhập kho: ">📥 Nhập kho</button>
      <button class="chat-suggestion" data-ai-example="Xuất kho: ">📤 Xuất kho</button>
      <button class="chat-suggestion" data-ai-example="Điều chuyển từ Kho 58 sang Kho 145: ">⇄ Điều chuyển kho</button>
      <button class="chat-suggestion" data-ai-example="Kiểm kho và điều chỉnh tồn: ">✓ Kiểm kho</button>
      <button class="chat-suggestion" data-ai-example="Cho tôi xem phiếu ">🧾 Tra / sửa phiếu</button>
    </div>'''

if old not in html:
    raise SystemExit('Không tìm thấy block chat-suggestions hiện tại.')

html = html.replace(old, new, 1)
path.write_text(html, encoding='utf-8')
print('Updated warehouse quick actions in Index.html')
