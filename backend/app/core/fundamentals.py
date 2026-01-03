import yfinance as yf
import numpy as np
import requests
from bs4 import BeautifulSoup

def get_sp500_tickers():
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    table = soup.find("table", {"id": "constituents"})
    return [row.find_all("td")[0].text.strip()
            for row in table.tbody.find_all("tr")[1:]]

def fetch_fundamentals(ticker: str):
    try:
        info = yf.Ticker(ticker).info
        pe = info.get("trailingPE") or info.get("forwardPE")
        eps_growth_q = info.get("earningsQuarterlyGrowth")
        roe = info.get("returnOnEquity")
        d_to_e = info.get("debtToEquity")
        pm = info.get("profitMargins")

        eps_annual = ((1 + eps_growth_q) ** 4 - 1) * 100 if eps_growth_q else np.nan
        peg = pe / eps_annual if pe and eps_annual else np.nan

        return {
            "Ticker": ticker,
            "PE": pe,
            "EPS_Annual_Growth_%": eps_annual,
            "PEG": peg,
            "ROE": roe,
            "Debt_to_Equity": d_to_e,
            "Profit_Margin": pm
        }
    except Exception:
        return None
