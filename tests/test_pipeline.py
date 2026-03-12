from datetime import date
from pathlib import Path
import sys

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from otc_dashboard.pipeline import process_dataframe


BASE_ROW = {
    "fecha": "2026-03-01",
    "pais": "COLOMBIA",
    "regional": "R3",
    "zona": "CALI",
    "aliado": "ALIADO_A",
    "responsable": "RESP_CAL_1",
    "sitio": "CAL_A_1_01",
    "impacto_clientes": 1000,
    "sr_movil": 0.88,
    "sr_fijo": 0.82,
    "kpi_crt": 0.06,
    "kpi_icr": 0.92,
    "kpi_ruido": 0.90,
    "kpi_trf_fijo": 0.86,
    "kpi_dispon": 0.95,
    "kpi_q30": 0.89,
    "kpi_tr": 0.90,
    "kpi_1ag": 0.87,
    "kpi_efect_xp": 0.74,
}


def test_score_is_in_valid_range():
    df = pd.DataFrame([BASE_ROW])
    out, dq = process_dataframe(df)
    assert dq.invalid_rows == 0
    assert not out.empty
    assert float(out["score_otc_pct"].iloc[0]) >= 0
    assert float(out["score_otc_pct"].iloc[0]) <= 100


def test_fallback_marks_missing_day():
    rows = [BASE_ROW.copy(), BASE_ROW.copy()]
    rows[1]["fecha"] = "2026-03-03"
    df = pd.DataFrame(rows)
    out, _ = process_dataframe(df)
    fallback_day = out[pd.to_datetime(out["fecha"]).dt.date == date(2026, 3, 2)]
    assert not fallback_day.empty
    assert bool(fallback_day["is_fallback"].iloc[0]) is True
