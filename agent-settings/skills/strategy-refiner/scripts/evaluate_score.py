# /// script
# dependencies = [
#   "pandas",
#   "matplotlib",
#   "optuna",
#   "lightgbm",
#   "scikit-learn",
#   "japanize_matplotlib",
#   "statsmodels",
#   "tqdm",
#   "setuptools<70",
#   "mlbacktester",
# ]
# [tool.uv.sources]
# mlbacktester = { path = "../../../../week5/mlbacktester-0.0.12-py3-none-any.whl" }
# ///

import os
import sys
import datetime
import pandas as pd
import argparse
import importlib.util

# Add the competition directory to path
BASE_PATH = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
COMPETITION_PATH = os.path.join(BASE_PATH, "competition")
sys.path.append(COMPETITION_PATH)

from mlbacktester import Scoring

def evaluate_strategy(strategy_file, limit=6000):
    # Convert file path to module path
    # e.g., competition/strategies/strategy_ver0.py -> strategies.strategy_ver0
    rel_path = os.path.relpath(strategy_file, COMPETITION_PATH)
    module_path = rel_path.replace(os.path.sep, ".").replace(".py", "")
    
    # Import the strategy class
    module = importlib.import_module(module_path)
    StrategyClass = module.Strategy

    cfg = {
        "trade_config": {
            "warmup_period": 1000,
            "initial_margin_balance": "100000USDT",
            "strategy_timeframe": "60min",
            "max_leverage": 2,
            "min_margin_rate": 0.1
        },
        "backtester_config": {
            "ohlcv_data_path": os.path.join(COMPETITION_PATH, "data", "public.pkl"),
            "external_data_paths": [os.path.join(COMPETITION_PATH, "data", "public_froi.pkl")],
            "time_zone": "Asia/Tokyo",
            "start_date": datetime.date(2021, 2, 1),
            "end_date": datetime.date(2023, 4, 30),
            "exchange": "binance",
            "symbol": ["BTCUSDT", "ETHUSDT", "XRPUSDT"],
            "backtest_timeframe": "60min",
            "slippage": 0.01,
            "delay": 0,
            "use_wandb": False,
            "save_model": True,
            "logging": False,
            "position_in_fiat": True,
            "daily_position": False,
            "backtest_num_worker": "max",
            "get_model_num_worker": "max",
            "compounding_strategy": False
        },
        "exchange_config": {
            "BTCUSDT": {},
            "ETHUSDT": {},
            "XRPUSDT": {}
        },
        "cv": {
            "type": "cpcv", 
            "n_purge": 10, 
            "n_path": 4 
        },
    }

    df = pd.read_pickle(cfg["backtester_config"]["ohlcv_data_path"])
    if limit:
        df = df.iloc[:limit]

    scoring = Scoring(
        config=cfg,
        Strategy=StrategyClass,
        raw_df=df,
    )
    score = scoring.run()
    scoring.finish()
    return score

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("strategy_file", help="Path to the strategy python file")
    parser.add_argument("--limit", type=int, default=6000, help="Limit the number of bars for faster evaluation")
    args = parser.parse_args()

    score = evaluate_strategy(args.strategy_file, args.limit)
    print(f"SCORE:{score}")
