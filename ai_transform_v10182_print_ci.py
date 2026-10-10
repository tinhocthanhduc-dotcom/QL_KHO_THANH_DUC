from pathlib import Path
for name in ('.github/workflows/apply-ai-patch.yml','.github/workflows/deploy-apps-script.yml'):
 p=Path(name)
 data=p.read_text(encoding='utf-8')
 old="V10.18.1"
 assert old in data,name
 p.write_text(data.replace(old,"V10.18.2"),encoding="utf-8")
