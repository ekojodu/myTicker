from app.core.fundamentals import get_sp500_tickers, fetch_fundamentals
from app.core.ml_model import generate_training_data, train_ml_model, FEATURES
from app.core.backtest import simulate_portfolio_history
from app.core.portfolio import get_future_picks
import pandas as pd

def build_dashboard(start_date, end_date):
    tickers = get_sp500_tickers()

    train_df = generate_training_data(tickers, fetch_fundamentals)
    model = train_ml_model(train_df)

    history = simulate_portfolio_history(
        tickers,
        fetch_fundamentals,
        model,
        FEATURES,
        start_date,
        end_date
    )

    features = [
        fetch_fundamentals(t) for t in tickers
        if fetch_fundamentals(t)
    ]
    df_features = pd.DataFrame(features).dropna()

    future = get_future_picks(df_features, model, FEATURES)

    return history, future
