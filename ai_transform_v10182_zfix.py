from pathlib import Path
for n in ('.github/workflows/apply-ai-patch.yml','.github/workflows/deploy-apps-script.yml'):
 p=Path(n); s=p.read_text(encoding='utf8'); assert 'V10.18.1' in s; p.write_text(s.replace('V10.18.1','V10.18.2'),encoding='utf8')
for n in ('Index.html','code.js'):
 p=Path(n); s=p.read_text(encoding='utf8'); assert 'V10.18.2' in s; p.write_text(s.replace('V10.18.2','V10.18.1'),encoding='utf8')
