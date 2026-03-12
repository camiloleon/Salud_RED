from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path

WORKBOOK = Path(r"d:/Hotmail/OneDrive/GIT/Salud_RED/fuentes_dashboard/Base KPI O&M _ TRF Fijo - DATOS.xlsx")
OUT_JSON = Path(r"d:/Hotmail/OneDrive/GIT/Salud_RED/fuentes_dashboard/connections_report.json")
OUT_TXT = Path(r"d:/Hotmail/OneDrive/GIT/Salud_RED/fuentes_dashboard/connections_report.txt")


def _extract_attr(block: str, attr: str) -> str:
    match = re.search(rf'{attr}="([^"]*)"', block)
    return match.group(1) if match else ""


def _clean_mso_text(value: str) -> str:
    return (
        value.replace("_x000d__x000a_", "\n")
        .replace("_x0009_", "\t")
        .replace("&quot;", '"')
    )


def analyze_workbook(path: Path) -> dict:
    report: dict = {
        "workbook": str(path),
        "exists": path.exists(),
        "connections": [],
        "query_tables": [],
        "risks": [],
    }

    if not path.exists():
        report["risks"].append("Workbook not found")
        return report

    with zipfile.ZipFile(path) as zf:
        names = zf.namelist()

        if "xl/connections.xml" in names:
            xml = zf.read("xl/connections.xml").decode("utf-8", errors="ignore")
            blocks = re.findall(r"<connection\s+.*?</connection>", xml)
            for b in blocks:
                connection_str = _extract_attr(b, "connection")
                command = _clean_mso_text(_extract_attr(b, "command"))

                rec = {
                    "id": _extract_attr(b, "id"),
                    "name": _extract_attr(b, "name"),
                    "type": _extract_attr(b, "type"),
                    "refreshOnLoad": _extract_attr(b, "refreshOnLoad"),
                    "background": _extract_attr(b, "background"),
                    "provider": "MSOLAP" if "MSOLAP" in connection_str.upper() else "UNKNOWN",
                    "data_source": "pbiazure://api.powerbi.com" if "pbiazure://api.powerbi.com" in connection_str else "OTHER",
                    "integrated_security": "ClaimsToken" if "Integrated Security=ClaimsToken" in connection_str else "OTHER",
                    "initial_catalog": re.search(r"Initial Catalog=([^;]+)", connection_str).group(1)
                    if re.search(r"Initial Catalog=([^;]+)", connection_str)
                    else "",
                    "identity_provider": re.search(r"Identity Provider=([^;]+)", connection_str).group(1)
                    if re.search(r"Identity Provider=([^;]+)", connection_str)
                    else "",
                    "command_preview": command[:1200],
                }
                report["connections"].append(rec)

        for qt in [n for n in names if n.startswith("xl/queryTables/") and n.endswith(".xml")]:
            qxml = zf.read(qt).decode("utf-8", errors="ignore")
            query_name = _extract_attr(qxml, "name")
            connection_id = _extract_attr(qxml, "connectionId")
            fields = re.findall(r"<queryTableField\s+[^>]*name=\"([^\"]+)\"", qxml)
            report["query_tables"].append(
                {
                    "file": qt,
                    "name": query_name,
                    "connectionId": connection_id,
                    "field_count": len(fields),
                    "field_samples": fields[:25],
                }
            )

    if any(c.get("integrated_security") == "ClaimsToken" for c in report["connections"]):
        report["risks"].append("Uses ClaimsToken (interactive auth), fragile for unattended desktop refresh")
    if any(c.get("data_source") == "pbiazure://api.powerbi.com" for c in report["connections"]):
        report["risks"].append("Power BI cloud endpoint detected (Azure/Entra auth lifecycle applies)")

    return report


def write_outputs(report: dict) -> None:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = []
    lines.append(f"Workbook: {report.get('workbook')}")
    lines.append(f"Connections: {len(report.get('connections', []))}")
    lines.append(f"Query tables: {len(report.get('query_tables', []))}")
    lines.append("")

    for c in report.get("connections", []):
        lines.append(f"- Connection {c.get('id')}: {c.get('name')}")
        lines.append(f"  Provider: {c.get('provider')}")
        lines.append(f"  DataSource: {c.get('data_source')}")
        lines.append(f"  IntegratedSecurity: {c.get('integrated_security')}")
        lines.append(f"  InitialCatalog: {c.get('initial_catalog')}")
        lines.append(f"  RefreshOnLoad: {c.get('refreshOnLoad')}")
        lines.append("")

    if report.get("risks"):
        lines.append("Risks:")
        for risk in report["risks"]:
            lines.append(f"- {risk}")

    OUT_TXT.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    result = analyze_workbook(WORKBOOK)
    write_outputs(result)
    print(f"written {OUT_JSON}")
    print(f"written {OUT_TXT}")
