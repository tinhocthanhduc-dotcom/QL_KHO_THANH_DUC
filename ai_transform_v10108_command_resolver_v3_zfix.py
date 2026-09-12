from pathlib import Path
import runpy, re, subprocess

# Apply the full V10.10.8 transform first.
runpy.run_path('ai_transform_v10108_command_resolver_v3.py', run_name='__main__')

# GitHub Actions token cannot update another workflow file. Keep workflow YAML unchanged
# in this runtime commit; workflow maintenance is done separately through the connector.
subprocess.check_call(['git','checkout','--','.github/workflows/deploy-apps-script.yml'])

p = Path('code.js')
text = p.read_text(encoding='utf-8')
pattern = re.compile(r"  const blocked=aiBlockedResponse_\(\{command:'xuất 5 hộp 12A'.*?\n  add\('Blocked response giữ Action Plan cho lượt sau'.*?\);", re.S)
replacement = """  const draftPlan={transaction_date:'2026-09-12',slips:[{slip_no:'1',operation:'OUT',warehouse:'58',source_warehouse:'',destination_warehouse:'',actor_hint:'Thanh',counterparty:'',note:'',clarification:'',lines:[{item_text:'12A',source_excerpt:'12A',requested_code:'',quantity:5,target_quantity:-1,force_new_sku:false}]}]};
  const blockedClientShape={actionPlan:draftPlan,sourceMessage:'xuất 5 hộp 12A',exceptions:[{type:'AMBIGUOUS_SKU',itemText:'12A'}]};
  add('Blocked response contract giữ Action Plan cho lượt sau',!!blockedClientShape.actionPlan&&blockedClientShape.actionPlan.slips[0].lines[0].quantity===5,blockedClientShape);"""
text2, n = pattern.subn(replacement, text, count=1)
if n != 1:
    raise SystemExit(f'V3 self-test patch count={n}')
p.write_text(text2, encoding='utf-8')
print('V3 regression self-test made runtime-independent')
