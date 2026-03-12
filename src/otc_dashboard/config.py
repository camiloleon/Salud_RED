from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
LOG_DIR = BASE_DIR / "logs"

INPUT_CSV = DATA_DIR / "input_otc.csv"
PROCESSED_CSV = DATA_DIR / "processed_otc.csv"
DQ_REPORT_CSV = DATA_DIR / "dq_report.csv"
USERS_JSON = DATA_DIR / "users.json"
AUDIT_LOG_CSV = LOG_DIR / "audit_log.csv"

REQUIRED_COLUMNS = [
    "fecha",
    "pais",
    "regional",
    "zona",
    "aliado",
    "responsable",
    "sitio",
    "impacto_clientes",
    "sr_movil",
    "sr_fijo",
    "kpi_crt",
    "kpi_icr",
    "kpi_ruido",
    "kpi_trf_fijo",
    "kpi_dispon",
    "kpi_q30",
    "kpi_tr",
    "kpi_1ag",
    "kpi_efect_xp",
]

KEY_COLUMNS = ["pais", "regional", "zona", "aliado", "responsable", "sitio"]
METRIC_COLUMNS = [
    "impacto_clientes",
    "sr_movil",
    "sr_fijo",
    "kpi_crt",
    "kpi_icr",
    "kpi_ruido",
    "kpi_trf_fijo",
    "kpi_dispon",
    "kpi_q30",
    "kpi_tr",
    "kpi_1ag",
    "kpi_efect_xp",
]
