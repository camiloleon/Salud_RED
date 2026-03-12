from __future__ import annotations

import io

import pandas as pd
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def dataframe_to_csv_bytes(df: pd.DataFrame) -> bytes:
    return df.to_csv(index=False).encode("utf-8")


def dataframe_to_excel_bytes(df: pd.DataFrame) -> bytes:
    buffer = io.BytesIO()
    df.to_excel(buffer, index=False)
    buffer.seek(0)
    return buffer.getvalue()


def dataframe_to_pdf_bytes(df: pd.DataFrame, title: str = "Top Criticos OTC") -> bytes:
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    _, h = letter

    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, h - 40, title)
    c.setFont("Helvetica", 9)

    columns = [
        col
        for col in ["fecha", "zona", "aliado", "responsable", "sitio", "score_otc_pct", "impacto_clientes"]
        if col in df.columns
    ]
    y = h - 70
    c.drawString(40, y, " | ".join(columns))
    y -= 14

    for _, row in df.iterrows():
        values = []
        for col in columns:
            value = row[col]
            if col == "score_otc_pct":
                values.append(f"{float(value):.2f}")
            else:
                values.append(str(value))
        c.drawString(40, y, " | ".join(values)[:145])
        y -= 12
        if y < 50:
            c.showPage()
            y = h - 40

    c.save()
    buffer.seek(0)
    return buffer.read()
