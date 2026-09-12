from pathlib import Path
import runpy

sp = Path('ai_transform_v10108_voucher_context_v2.py')
s = sp.read_text(encoding='utf-8')

marker = "# 7) Explicit policy for correction follow-ups\n"
extra = r'''# 6b) For a verified voucher, field-only patches are authorized by original voucher identity, not model tokens parsed from phrases like "từ 1 thành 2".
consistency_needle = """  if (!allLines.length) return {ok:false,reason:'AI chưa tạo action_plan có dòng hàng.',searchQuery:''};

  const contextText = [String(message||''), JSON.stringify(currentDraft || {}), JSON.stringify((aiNormalizeAgentStateV106_(agentState).voucherContext)||{})].join(' ');"""
consistency_replacement = """  if (!allLines.length) return {ok:false,reason:'AI chưa tạo action_plan có dòng hàng.',searchQuery:''};

  const voucherStateV2=aiNormalizeAgentStateV106_(agentState);
  const patchTextV2=normalize_(message);
  const fieldOnlyVoucherPatchV2=Boolean(voucherStateV2.voucherContext&&voucherStateV2.lastVoucher&&aiVoucherContextNeedsRefreshV2_(message,voucherStateV2)&&!/(ma hang|sku|model|san pham|mat hang|hang hoa|doi ma|thay ma)/.test(patchTextV2));
  if(fieldOnlyVoucherPatchV2){
    const allowedCodesV2={},allowedNamesV2={};
    (voucherStateV2.voucherContext.rows||[]).forEach(function(r){if(r&&r.code)allowedCodesV2[normalize_(r.code)]=true;if(r&&r.name)allowedNamesV2[normalize_(r.name)]=true;});
    const sameIdentityV2=allLines.every(function(x){const l=x.line||{};const c=normalize_(l.requested_code||'');const n=normalize_(l.item_text||'');return (c&&allowedCodesV2[c])||(!c&&n&&allowedNamesV2[n]);});
    if(sameIdentityV2)return {ok:true,reason:'VERIFIED_VOUCHER_FIELD_PATCH',searchQuery:''};
  }

  const contextText = [String(message||''), JSON.stringify(currentDraft || {}), JSON.stringify((aiNormalizeAgentStateV106_(agentState).voucherContext)||{})].join(' ');"""
if consistency_needle not in text: raise SystemExit('voucher field patch guard anchor not found')
text = text.replace(consistency_needle, consistency_replacement, 1)

'''
if marker not in s:
    raise SystemExit('cannot find insertion marker in base transform')
s = s.replace(marker, extra + marker, 1)
sp.write_text(s, encoding='utf-8')

# First patch the brittle chat-input section, then execute full transform.
z = Path('ai_transform_v10108_voucher_context_v2_zfix.py')
runpy.run_path(str(z), run_name='__main__')
print('Voucher Context V2 zzfix applied')
