from pypdf import PdfReader
from pathlib import Path
pdf = Path(r"c:\Users\38101567\Downloads\SALUD RED OTC R3 V1.pdf")
out = Path(r"d:\Hotmail\OneDrive\GIT\Salud_RED\pdf_extract.txt")
reader = PdfReader(str(pdf))
lines = [f"pages={len(reader.pages)}"]
for i, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    clean = " ".join(text.split())
    lines.append(f"\n=== PAGE {i} | chars={len(text)} ===")
    lines.append(clean[:3000])
out.write_text("\n".join(lines), encoding="utf-8")
print(f"written {out}")
print(f"pages={len(reader.pages)}")
print(f"total_chars={sum(len((p.extract_text() or '')) for p in reader.pages)}")
