from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# ---------- Portfolio History ----------

class PortfolioHistoryItem(BaseModel):
    date: date
    return_pct: float
    cumulative: float
    cumulative_sp500: Optional[float]

# ---------- Future Stock Pick ----------

class FuturePick(BaseModel):
    ticker: str
    peg: float
    roe: float
    debt_to_equity: float
    profit_margin: float
    score: float

# ---------- Dashboard Response ----------

class DashboardResponse(BaseModel):
    history: List[PortfolioHistoryItem]
    future_picks: List[FuturePick]
