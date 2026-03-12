from datetime import date, timedelta
from pathlib import Path
import sys

import pandas as pd
import plotly.express as px
import streamlit as st

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from otc_dashboard.audit import write_audit_log
from otc_dashboard.auth import apply_role_scope, authenticate_user, load_users
from otc_dashboard.config import AUDIT_LOG_CSV, INPUT_CSV, USERS_JSON
from otc_dashboard.exports import dataframe_to_csv_bytes, dataframe_to_excel_bytes, dataframe_to_pdf_bytes
from otc_dashboard.pipeline import build_top_critical, load_dataset


st.set_page_config(page_title="Dashboard OTC", layout="wide")

@st.cache_data(show_spinner=False)
def load_data() -> tuple[pd.DataFrame, dict]:
    df, dq = load_dataset(INPUT_CSV)
    return df, dq.__dict__


def render_login() -> bool:
    users = load_users(USERS_JSON)
    st.title("Dashboard OTC - Acceso")
    with st.form("login_form"):
        username = st.text_input("Usuario")
        password = st.text_input("Contraseña", type="password")
        submit = st.form_submit_button("Ingresar")

    if submit:
        auth = authenticate_user(users, username, password)
        if auth:
            st.session_state["logged_user"] = auth
            write_audit_log(AUDIT_LOG_CSV, "login_success", username, "Acceso exitoso")
            st.rerun()
        write_audit_log(AUDIT_LOG_CSV, "login_failed", username, "Credenciales inválidas")
        st.error("Credenciales inválidas")
    return False


def render_dashboard() -> None:
    user = st.session_state.get("logged_user")
    st.sidebar.success(f"Usuario: {user['username']} ({user['role']})")
    if st.sidebar.button("Cerrar sesión"):
        st.session_state.pop("logged_user", None)
        st.rerun()

    df, dq = load_data()
    df = apply_role_scope(df, user)

    st.title("Dashboard OTC - Estado 360")

    if df.empty:
        st.error("No hay datos disponibles para el alcance de tu rol.")
        return

    last_update = pd.to_datetime(df["fecha"]).max().date()
    lag_days = (date.today() - last_update).days

    if lag_days > 1:
        st.warning(f"Dato con atraso de {lag_days} días. Se aplica último valor válido cuando falta carga diaria.")
    else:
        st.info(f"Dato al día. Última fecha: {last_update}")

    st.caption(
        f"DQ -> filas: {dq.get('total_rows', 0)}, inválidas: {dq.get('invalid_rows', 0)}, frescura(días): {dq.get('freshness_days', 0)}"
    )

    with st.sidebar:
        st.subheader("Filtros")
        fecha_min = pd.to_datetime(df["fecha"]).min().date()
        fecha_max = pd.to_datetime(df["fecha"]).max().date()

        f_ini, f_fin = st.date_input(
            "Rango fecha",
            value=(max(fecha_min, fecha_max - timedelta(days=30)), fecha_max),
            min_value=fecha_min,
            max_value=fecha_max,
        )

        def multi_filter(name: str):
            opts = sorted(df[name].dropna().unique().tolist())
            return st.multiselect(name.capitalize(), opts, default=opts)

        paises = multi_filter("pais")
        regionales = multi_filter("regional")
        zonas = multi_filter("zona")
        aliados = multi_filter("aliado")
        responsables = multi_filter("responsable")
        sitios = multi_filter("sitio")
        top_n = st.slider("Top N críticos", min_value=5, max_value=50, value=20, step=5)

    filtered = df[
        (pd.to_datetime(df["fecha"]).dt.date >= f_ini)
        & (pd.to_datetime(df["fecha"]).dt.date <= f_fin)
        & (df["pais"].isin(paises))
        & (df["regional"].isin(regionales))
        & (df["zona"].isin(zonas))
        & (df["aliado"].isin(aliados))
        & (df["responsable"].isin(responsables))
        & (df["sitio"].isin(sitios))
    ].copy()

    if filtered.empty:
        st.error("No hay datos para los filtros seleccionados")
        return

    latest_date = pd.to_datetime(filtered["fecha"]).max().date()
    latest = filtered[pd.to_datetime(filtered["fecha"]).dt.date == latest_date].copy()

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Salud Red Móvil", f"{latest['sr_movil'].mean() * 100:.2f}%")
    c2.metric("Salud Red Fija", f"{latest['sr_fijo'].mean() * 100:.2f}%")
    c3.metric("Salud OTC 50/50", f"{latest['sr_otc_50_50'].mean() * 100:.2f}%")
    c4.metric("Score OTC", f"{latest['score_otc_pct'].mean():.2f}%")

    trend = (
        filtered.groupby("fecha", as_index=False)[["score_otc_pct", "sr_otc_50_50"]]
        .mean()
        .sort_values("fecha")
    )
    fig = px.line(
        trend,
        x="fecha",
        y=["score_otc_pct", "sr_otc_50_50"],
        title="Tendencia Score OTC y Salud OTC 50/50",
    )
    st.plotly_chart(fig, use_container_width=True)

    top20 = build_top_critical(filtered, top_n=top_n)

    st.subheader("Top 20 críticos")
    cols_show = [
        "fecha",
        "zona",
        "aliado",
        "responsable",
        "sitio",
        "score_otc_pct",
        "sr_otc_50_50",
        "impacto_clientes",
        "estado",
        "is_fallback",
    ]
    st.dataframe(
        top20[cols_show].rename(
            columns={
                "score_otc_pct": "score_otc_%",
                "sr_otc_50_50": "salud_otc_50_50",
            }
        ),
        use_container_width=True,
    )

    st.subheader("Drill-down jerárquico")
    level = st.selectbox("Nivel", ["regional", "zona", "aliado", "responsable", "sitio"])
    grp = (
        latest.groupby(level, as_index=False)[["score_otc_pct", "sr_otc_50_50", "impacto_clientes"]]
        .mean(numeric_only=True)
        .sort_values("score_otc_pct")
    )
    st.dataframe(grp, use_container_width=True)

    st.subheader("Exportación")
    csv_bytes = dataframe_to_csv_bytes(top20)
    excel_bytes = dataframe_to_excel_bytes(top20)
    pdf_bytes = dataframe_to_pdf_bytes(top20, title=f"Top {top_n} Criticos - Dashboard OTC")

    e1, e2, e3 = st.columns(3)
    if e1.download_button("Descargar CSV", data=csv_bytes, file_name="top_otc.csv", mime="text/csv"):
        write_audit_log(AUDIT_LOG_CSV, "export_csv", user["username"], f"top_n={top_n}")
    e2.download_button(
        "Descargar Excel",
        data=excel_bytes,
        file_name="top_otc.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
    e3.download_button("Descargar PDF", data=pdf_bytes, file_name="top_otc.pdf", mime="application/pdf")


def main() -> None:
    if "logged_user" not in st.session_state:
        render_login()
        return
    render_dashboard()


if __name__ == "__main__":
    main()
