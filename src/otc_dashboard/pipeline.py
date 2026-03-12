from __future__ import annotations

from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path

import numpy as np
import pandas as pd

from .config import KEY_COLUMNS, METRIC_COLUMNS, REQUIRED_COLUMNS


@dataclass
class DQResult:
    total_rows: int
    invalid_rows: int
    missing_required_columns: list[str]
    latest_data_date: str
    freshness_days: int


def generate_synthetic_data(days: int = 120) -> pd.DataFrame:
    rng = np.random.default_rng(42)
    today = date.today()

    regiones = ["R3"]
    zonas = ["CALI", "TOLHUCA", "VACANA"]
    aliados = ["ALIADO_A", "ALIADO_B", "ALIADO_C"]
    responsables = {
        "CALI": ["RESP_CAL_1", "RESP_CAL_2"],
        "TOLHUCA": ["RESP_TOL_1", "RESP_TOL_2"],
        "VACANA": ["RESP_VAC_1", "RESP_VAC_2"],
    }

    rows = []
    for delta in range(days):
        f = today - timedelta(days=delta)
        for zona in zonas:
            for aliado in aliados:
                for responsable in responsables[zona]:
                    for i in range(1, 4):
                        sitio = f"{zona[:3]}_{aliado[-1]}_{responsable[-1]}_{i:02d}"
                        base = 0.8 + rng.normal(0, 0.03)
                        rows.append(
                            {
                                "fecha": f,
                                "pais": "COLOMBIA",
                                "regional": regiones[0],
                                "zona": zona,
                                "aliado": aliado,
                                "responsable": responsable,
                                "sitio": sitio,
                                "impacto_clientes": int(np.clip(rng.normal(1200, 500), 50, 5000)),
                                "sr_movil": np.clip(base + rng.normal(0.05, 0.03), 0.2, 0.98),
                                "sr_fijo": np.clip(base + rng.normal(-0.02, 0.03), 0.2, 0.98),
                                "kpi_crt": np.clip(0.05 + rng.normal(0, 0.015), 0.01, 0.20),
                                "kpi_icr": np.clip(0.90 + rng.normal(0, 0.02), 0.60, 1.00),
                                "kpi_ruido": np.clip(0.89 + rng.normal(0, 0.03), 0.50, 1.00),
                                "kpi_trf_fijo": np.clip(0.86 + rng.normal(0, 0.04), 0.40, 1.00),
                                "kpi_dispon": np.clip(0.94 + rng.normal(0, 0.02), 0.50, 1.00),
                                "kpi_q30": np.clip(0.88 + rng.normal(0, 0.03), 0.50, 1.00),
                                "kpi_tr": np.clip(0.90 + rng.normal(0, 0.03), 0.50, 1.00),
                                "kpi_1ag": np.clip(0.87 + rng.normal(0, 0.04), 0.50, 1.00),
                                "kpi_efect_xp": np.clip(0.74 + rng.normal(0, 0.05), 0.30, 1.00),
                            }
                        )

    df = pd.DataFrame(rows)
    drop_idx = df.sample(frac=0.02, random_state=7).index
    return df.drop(drop_idx).copy()


def _validate_columns(df: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        return pd.DataFrame(), missing
    return df[REQUIRED_COLUMNS].copy(), []


def _coerce_types(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    out["fecha"] = pd.to_datetime(out["fecha"], errors="coerce").dt.date
    for col in METRIC_COLUMNS:
        out[col] = pd.to_numeric(out[col], errors="coerce")
    return out


def _apply_fallback(df: pd.DataFrame, max_gap_days: int = 3) -> pd.DataFrame:
    min_date = df["fecha"].min()
    max_date = df["fecha"].max()
    all_dates = pd.date_range(min_date, max_date, freq="D").date

    chunks = []
    for key, group in df.groupby(KEY_COLUMNS, dropna=False):
        g = group.set_index("fecha").sort_index().reindex(all_dates)
        for i, col in enumerate(KEY_COLUMNS):
            g[col] = key[i]

        missing_before = g[METRIC_COLUMNS].isna().any(axis=1)
        g[METRIC_COLUMNS] = g[METRIC_COLUMNS].ffill(limit=max_gap_days)
        missing_after = g[METRIC_COLUMNS].isna().any(axis=1)

        g["is_fallback"] = missing_before & ~missing_after
        g["staleness_days"] = (
            g[METRIC_COLUMNS]
            .isna()
            .all(axis=1)
            .astype(int)
            .groupby((~g[METRIC_COLUMNS].isna().all(axis=1)).cumsum())
            .cumsum()
        )
        chunks.append(g.reset_index().rename(columns={"index": "fecha"}))

    return pd.concat(chunks, ignore_index=True)


def _compute_kpis(df: pd.DataFrame) -> pd.DataFrame:
    out = df.dropna(subset=["sr_movil", "sr_fijo"]).copy()
    out["sr_otc_50_50"] = (out["sr_movil"] * 0.5) + (out["sr_fijo"] * 0.5)
    out["kpi_efectividad_xp"] = out["kpi_efect_xp"]

    out["score_otc"] = (
        (1 - out["kpi_crt"]) * 0.30
        + out["kpi_icr"] * 0.20
        + out["kpi_ruido"] * 0.15
        + out["kpi_trf_fijo"] * 0.15
        + out["kpi_dispon"] * 0.10
        + ((out["kpi_q30"] + out["kpi_tr"] + out["kpi_1ag"] + out["kpi_efect_xp"]) / 4) * 0.10
    )

    out["score_otc_pct"] = out["score_otc"] * 100
    out["estado"] = pd.cut(out["score_otc_pct"], bins=[-1, 80, 90, 101], labels=["ROJO", "AMARILLO", "VERDE"])
    return out


def process_dataframe(df: pd.DataFrame) -> tuple[pd.DataFrame, DQResult]:
    raw_rows = len(df)
    df_valid, missing = _validate_columns(df)
    if missing:
        return (
            pd.DataFrame(),
            DQResult(
                total_rows=raw_rows,
                invalid_rows=raw_rows,
                missing_required_columns=missing,
                latest_data_date="",
                freshness_days=999,
            ),
        )

    typed = _coerce_types(df_valid)
    invalid_mask = typed[["fecha", *METRIC_COLUMNS]].isna().any(axis=1)
    clean = typed[~invalid_mask].copy()
    invalid_rows = int(invalid_mask.sum())

    fallback = _apply_fallback(clean)
    final = _compute_kpis(fallback)

    latest_data_date = str(pd.to_datetime(final["fecha"]).max().date()) if not final.empty else ""
    freshness_days = (date.today() - pd.to_datetime(final["fecha"]).max().date()).days if not final.empty else 999

    dq = DQResult(
        total_rows=raw_rows,
        invalid_rows=invalid_rows,
        missing_required_columns=[],
        latest_data_date=latest_data_date,
        freshness_days=freshness_days,
    )
    return final, dq


def load_dataset(input_path: Path) -> tuple[pd.DataFrame, DQResult]:
    if input_path.exists():
        incoming = pd.read_csv(input_path)
    else:
        incoming = generate_synthetic_data()
    return process_dataframe(incoming)


def build_top_critical(df: pd.DataFrame, top_n: int = 20) -> pd.DataFrame:
    if df.empty:
        return df
    latest_date = pd.to_datetime(df["fecha"]).max().date()
    latest = df[pd.to_datetime(df["fecha"]).dt.date == latest_date].copy()
    return latest.sort_values(["score_otc_pct", "impacto_clientes"], ascending=[True, False]).head(top_n)


def run_daily_processing(input_path: Path, processed_path: Path, dq_report_path: Path) -> tuple[pd.DataFrame, DQResult]:
    processed, dq = load_dataset(input_path)
    processed_path.parent.mkdir(parents=True, exist_ok=True)
    dq_report_path.parent.mkdir(parents=True, exist_ok=True)

    processed.to_csv(processed_path, index=False)
    pd.DataFrame([dq.__dict__]).to_csv(dq_report_path, index=False)
    return processed, dq
