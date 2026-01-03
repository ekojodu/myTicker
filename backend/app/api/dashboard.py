from fastapi import APIRouter
from app.services.dashboard_service import build_dashboard
from app.models.dashboard import DashboardResponse

router = APIRouter()

@router.get("/dashboard", response_model=DashboardResponse)
def dashboard():
    history, future = build_dashboard("2018-01-01", "2023-12-31")

    history_items = [
        {
            "date": row["Date"],
            "return_pct": row["Return"],
            "cumulative": row["Cumulative"],
            "cumulative_sp500": row.get("Cumulative_SP500")
        }
        for _, row in history.iterrows()
    ]

    future_items = [
        {
            "ticker": row["Ticker"],
            "peg": row["PEG"],
            "roe": row["ROE"],
            "debt_to_equity": row["Debt_to_Equity"],
            "profit_margin": row["Profit_Margin"],
            "score": row["Score"]
        }
        for _, row in future.iterrows()
    ]

    return {
        "history": history_items,
        "future_picks": future_items
    }
