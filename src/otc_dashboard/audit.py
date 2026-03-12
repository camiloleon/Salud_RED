from __future__ import annotations

from datetime import datetime
from pathlib import Path

import pandas as pd


def write_audit_log(log_path: Path, event: str, username: str, details: str) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    row = {
        "timestamp": datetime.utcnow().isoformat(),
        "event": event,
        "username": username,
        "details": details,
    }
    if log_path.exists():
        df = pd.read_csv(log_path)
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)
    else:
        df = pd.DataFrame([row])
    df.to_csv(log_path, index=False)
