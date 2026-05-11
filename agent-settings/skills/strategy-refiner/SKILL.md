# 📈 Strategy Refiner Skill

## 🎯 Goal

The goal of this skill is to iteratively improve financial trading strategies by automating the process of evaluation and refinement. It ensures that every new strategy iteration is backed by empirical performance data like the Sharpe Ratio.

## 🗣️ Language Rule

Technical terms are followed by their Japanese translation in parentheses.

## 📝 Instructions

### 1. 📊 Performance Evaluation

- Use the `scripts/evaluate_score.py` tool to calculate the current strategy's evaluation value.
- Focus on the **Sharpe Ratio** as the primary metric for risk-adjusted returns.
- Document the baseline performance before making changes.

### 2. 💡 Strategy Refinement

- Analyze the existing signal generation logic.
- Consider the following improvements:
  - **Indicator Combination**: Combine RSI with Trend indicators like Moving Averages or Volatility indicators like Bollinger Bands.
  - **Parameter Optimization**: Use techniques like Grid Search or Bayesian Optimization to find better window sizes.
  - **Regime Detection**: Implement logic to distinguish between Trending and Ranging markets.
  - **Risk Management**: Refine the `get_orders` logic to better handle position sizing based on volatility.

### 3. 🆕 Code Generation

- Create a new version of the strategy (e.g., `strategy_ver1.py`).
- Maintain compatibility with the `BaseStrategy` interface.
- Ensure all necessary imports and helper functions are included in the single file.

### 4. 🔄 Validation Loop

- Re-run the evaluation on the new code.
- Compare the new score with the previous one.
- Only promote the strategy if it shows a statistically significant improvement.

## 🛡️ Best Practices

- **Avoid Overfitting**: Use Cross-Validation, specifically CPCV (Combinatorial Purged Cross-Validation), to ensure robustness.
- **Seed Consistency**: Always set a random seed for reproducibility.
- **Look-ahead Bias**: Never use future data for signal calculation.
- **Complexity Trade-off**: Favor simpler models unless complexity significantly improves performance.
