from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import tempfile
import zipfile
from pathlib import Path


PATTERN_PLAIN = re.compile(
    r"(TREATAS\(\s*CALENDAR\(\s*DATE\()(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})(\),\s*DATE\()(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})(\)\s*\),\s*'Calidad Fija'\[M_FECHA_MES\]\))",
    flags=re.IGNORECASE,
)

PATTERN_ENCODED = re.compile(
    r"(TREATAS\(\s*CALENDAR\(_x000d__x000a_\s*DATE\()(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})(\),_x000d__x000a_\s*DATE\()(\d{4}),\s*(\d{1,2}),\s*(\d{1,2})(\)_x000d__x000a_\s*\),\s*'Calidad Fija'\[M_FECHA_MES\]\))",
    flags=re.IGNORECASE,
)


def fmt_date_parts(d: dt.date) -> tuple[str, str, str]:
    return str(d.year), str(d.month), str(d.day)


def patch_connections_xml(xml: str, start_date: dt.date, end_date: dt.date) -> tuple[str, int]:
    sy, sm, sd = fmt_date_parts(start_date)
    ey, em, ed = fmt_date_parts(end_date)

    def repl(m: re.Match[str]) -> str:
        return f"{m.group(1)}{sy}, {sm}, {sd}{m.group(5)}{ey}, {em}, {ed}{m.group(9)}"

    new_xml, count_plain = PATTERN_PLAIN.subn(repl, xml)
    new_xml, count_encoded = PATTERN_ENCODED.subn(repl, new_xml)
    return new_xml, (count_plain + count_encoded)


def patch_workbook(workbook: Path, start_date: dt.date, end_date: dt.date, backup: bool = True) -> int:
    if backup:
        backup_path = workbook.with_suffix(workbook.suffix + ".bak")
        shutil.copy2(workbook, backup_path)

    with tempfile.TemporaryDirectory() as td:
        temp_xlsx = Path(td) / workbook.name

        with zipfile.ZipFile(workbook, "r") as zin:
            with zipfile.ZipFile(temp_xlsx, "w", compression=zipfile.ZIP_DEFLATED) as zout:
                replaced = 0
                for item in zin.infolist():
                    data = zin.read(item.filename)
                    if item.filename == "xl/connections.xml":
                        xml = data.decode("utf-8", errors="ignore")
                        patched, replaced = patch_connections_xml(xml, start_date, end_date)
                        data = patched.encode("utf-8")
                    zout.writestr(item, data)

        shutil.copy2(temp_xlsx, workbook)

    return replaced


def parse_date(value: str) -> dt.date:
    return dt.datetime.strptime(value, "%Y-%m-%d").date()


def main() -> int:
    parser = argparse.ArgumentParser(description="Patch Excel Power BI command date window")
    parser.add_argument("--workbook", required=True)
    parser.add_argument("--start", required=True, help="YYYY-MM-DD")
    parser.add_argument("--end", required=True, help="YYYY-MM-DD")
    parser.add_argument("--no-backup", action="store_true")
    args = parser.parse_args()

    workbook = Path(args.workbook)
    if not workbook.exists():
        raise FileNotFoundError(f"Workbook not found: {workbook}")

    start_date = parse_date(args.start)
    end_date = parse_date(args.end)
    if end_date < start_date:
        raise ValueError("end date must be >= start date")

    replaced = patch_workbook(workbook, start_date, end_date, backup=not args.no_backup)
    print(f"patched_connections={replaced}")
    print(f"window={start_date}..{end_date}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
