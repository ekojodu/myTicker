from fastapi import APIRouter
from app.services.dashboard_service import build_dashboard
import pandas as pd

router = APIRouter()

@router.get("/export")
def export_dashboard():
    history, future = build_dashboard("2018-01-01", "2023-12-31")

    file_path = "buffett_ai_dashboard.xlsx"
    with pd.ExcelWriter(file_path, engine="xlsxwriter") as writer:
        history.to_excel(writer, sheet_name="Historical_Backtest", index=False)
        future.to_excel(writer, sheet_name="Future_Picks", index=False)

    return {"file": file_path}
