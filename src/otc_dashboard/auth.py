from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any

import pandas as pd

DEFAULT_USERS = {
    "director": {
        "password_hash": "cf7b81093102330847e3e4f66619b980ab5b856d1ceb4e47cd4af637e9e26527",
        "role": "director",
        "scope": {},
    },
    "jefe_cali": {
        "password_hash": "cf7b81093102330847e3e4f66619b980ab5b856d1ceb4e47cd4af637e9e26527",
        "role": "jefe",
        "scope": {"zona": ["CALI"]},
    },
    "owner_tol": {
        "password_hash": "cf7b81093102330847e3e4f66619b980ab5b856d1ceb4e47cd4af637e9e26527",
        "role": "owner",
        "scope": {"aliado": ["ALIADO_A"], "responsable": ["RESP_TOL_1"]},
    },
}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def load_users(users_path: Path) -> dict[str, dict[str, Any]]:
    if users_path.exists():
        with users_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    users_path.parent.mkdir(parents=True, exist_ok=True)
    with users_path.open("w", encoding="utf-8") as f:
        json.dump(DEFAULT_USERS, f, indent=2, ensure_ascii=False)
    return DEFAULT_USERS


def authenticate_user(users: dict[str, dict[str, Any]], username: str, password: str) -> dict[str, Any] | None:
    user = users.get(username)
    if not user:
        return None
    if user.get("password_hash") != hash_password(password):
        return None
    return {"username": username, "role": user.get("role"), "scope": user.get("scope", {})}


def apply_role_scope(df: pd.DataFrame, user: dict[str, Any]) -> pd.DataFrame:
    scoped = df.copy()
    for col, allowed in user.get("scope", {}).items():
        if col in scoped.columns:
            scoped = scoped[scoped[col].isin(allowed)]
    return scoped
