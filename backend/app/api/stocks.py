from fastapi import APIRouter
from app.core.fundamentals import fetch_fundamentals

router = APIRouter()

@router.get("/stock/{ticker}")
def stock_detail(ticker: str):
    return fetch_fundamentals(ticker.upper())
