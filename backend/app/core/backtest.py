import yfinance as yf
import pandas as pd
import numpy as np

def simulate_portfolio_history(
    tickers,
    fetch_fundamentals,
    model,
    feature_cols,
    start_date,
    end_date,
    top_n=10,
    freq="W"
):
    dates = pd.date_range(start=start_date, end=end_date, freq=freq)
    history = []

    for date in dates:
        rows = []
        for t in tickers:
            f = fetch_fundamentals(t)
            if f:
                rows.append(f)

        df = pd.DataFrame(rows).dropna()
        if df.empty:
            continue

        X = df[feature_cols]
        df["Score"] = model.predict_proba(X)[:, 1]
        picks = df.sort_values("Score", ascending=False).head(top_n)

        returns = []
        for s in picks["Ticker"]:
            hist = yf.Ticker(s).history(start=date, end=date + pd.Timedelta(days=7))
            if len(hist) >= 2:
                r = (hist["Close"][-1] - hist["Close"][0]) / hist["Close"][0]
                returns.append(r)

        history.append({
            "Date": date,
            "Return": np.mean(returns) if returns else 0
        })

    df_port = pd.DataFrame(history)
    df_port["Cumulative"] = (1 + df_port["Return"]).cumprod()

    sp = yf.Ticker("^GSPC").history(start=start_date, end=end_date, interval="1wk")
    sp = sp["Close"].pct_change().fillna(0).reset_index()
    sp["Cumulative_SP500"] = (1 + sp["Close"]).cumprod()

    return df_port.merge(
        sp[["Date", "Cumulative_SP500"]],
        on="Date",
        how="left"
    )
