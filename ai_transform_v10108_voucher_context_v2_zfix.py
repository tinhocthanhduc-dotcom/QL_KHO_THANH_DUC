from pathlib import Path
import runpy

sp = Path('ai_transform_v10108_voucher_context_v2.py')
s = sp.read_text(encoding='utf-8')

old_block = '''# 4) Always expose agentState/voucherContext to the model, not only the chat transcript
old = """  if(currentDraft)input.push({role:'user',content:'[PHIẾU ĐANG CHỜ XÁC NHẬN - draft cũ, không phải lệnh mới]\\\\\n'+JSON.stringify(currentDraft)});\n  input.push({role:'user',content:message});"""\nnew = """  if(currentDraft)input.push({role:'user',content:'[PHIẾU ĐANG CHỜ XÁC NHẬN - draft cũ, không phải lệnh mới]\\\\\n'+JSON.stringify(currentDraft)});\n  if(state&&(state.lastVoucher||state.voucherContext||(state.lastItems&&state.lastItems.length)))input.push({role:'user',content:'[AGENT STATE ĐÃ XÁC MINH - ngữ cảnh nghiệp vụ từ backend, không phải lệnh mới]\\\\\n'+JSON.stringify(state)});\n  input.push({role:'user',content:message});"""\nif old not in text: raise SystemExit('chat input anchor not found')\ntext = text.replace(old, new, 1)\n'''

new_block = '''# 4) Always expose agentState/voucherContext to the model, not only the chat transcript\nneedle = "  input.push({role:'user',content:message});"\nreplacement = "  if(state&&(state.lastVoucher||state.voucherContext||(state.lastItems&&state.lastItems.length)))input.push({role:'user',content:'[AGENT STATE ĐÃ XÁC MINH - ngữ cảnh nghiệp vụ từ backend, không phải lệnh mới]\\\\n'+JSON.stringify(state)});\\n  input.push({role:'user',content:message});"\nif needle not in text: raise SystemExit('chat input short anchor not found')\ntext = text.replace(needle, replacement, 1)\n'''

if old_block not in s:
    # fallback: replace by section boundaries
    a = s.find('# 4) Always expose agentState/voucherContext')
    b = s.find('# 5) Fresh-read current voucher', a)
    if a < 0 or b < 0:
        raise SystemExit('cannot locate section 4 in transform script')
    s = s[:a] + new_block + '\n' + s[b:]
else:
    s = s.replace(old_block, new_block, 1)

sp.write_text(s, encoding='utf-8')
runpy.run_path(str(sp), run_name='__main__')
print('Voucher Context V2 zfix applied')
