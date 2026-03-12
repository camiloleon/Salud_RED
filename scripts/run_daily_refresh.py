from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from otc_dashboard.config import DQ_REPORT_CSV, INPUT_CSV, PROCESSED_CSV
from otc_dashboard.pipeline import run_daily_processing


if __name__ == "__main__":
    processed, dq = run_daily_processing(INPUT_CSV, PROCESSED_CSV, DQ_REPORT_CSV)
    print(f"processed_rows={len(processed)}")
    print(f"dq={dq}")
