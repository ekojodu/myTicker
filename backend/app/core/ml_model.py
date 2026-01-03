import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

FEATURES = [
    "PE",
    "EPS_Annual_Growth_%",
    "PEG",
    "ROE",
    "Debt_to_Equity",
    "Profit_Margin"
]

def generate_training_data(tickers, fetch_fundamentals, period="5y", threshold_return=0.1):
    import yfinance as yf

    rows = []
    for t in tickers:
        try:
            hist = yf.Ticker(t).history(period=period)
            if hist.empty:
                continue
            ret = (hist["Close"].iloc[-1] - hist["Close"].iloc[0]) / hist["Close"].iloc[0]
            target = 1 if ret >= threshold_return else 0

            fundamentals = fetch_fundamentals(t)
            if fundamentals:
                fundamentals["Target"] = target
                rows.append(fundamentals)
        except Exception:
            continue

    return pd.DataFrame(rows)

def train_ml_model(df: pd.DataFrame):
    df = df.dropna()
    X = df[FEATURES]
    y = df["Target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
    model.fit(X_train, y_train)

    print("ML accuracy:", round(model.score(X_test, y_test), 2))
    return model
