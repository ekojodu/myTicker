import pandas as pd

BUFFETT_FILTERS = {
    "PEG": 1,
    "ROE": 0.15,
    "Debt_to_Equity": 0.5,
    "Profit_Margin": 0.1
}

def apply_buffett_filters(df: pd.DataFrame):
    return df[
        (df["PEG"] < BUFFETT_FILTERS["PEG"]) &
        (df["ROE"] > BUFFETT_FILTERS["ROE"]) &
        (df["Debt_to_Equity"] < BUFFETT_FILTERS["Debt_to_Equity"]) &
        (df["Profit_Margin"] > BUFFETT_FILTERS["Profit_Margin"])
    ]

def get_future_picks(df_features, model, feature_cols, top_n=10):
    df_filtered = apply_buffett_filters(df_features)
    if df_filtered.empty:
        return df_filtered

    X = df_filtered[feature_cols]
    df_filtered["Score"] = model.predict_proba(X)[:, 1]

    return df_filtered.sort_values("Score", ascending=False).head(top_n)
