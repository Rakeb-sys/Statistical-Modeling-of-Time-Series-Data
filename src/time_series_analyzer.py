"""
Birhan Energies Time Series Analysis Module
Engineered for modular, production-grade change point and stationarity testing.
"""

import logging
from typing import Tuple
import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller

# Configure structured logging for production traceability
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


class TimeSeriesDataError(Exception):
    """Custom exception thrown when time series processing violates data integrity constraints."""
    pass


def compute_log_returns(df: pd.DataFrame, price_col: str = "Price") -> pd.Series:
    """
    Transforms raw price data into a clean, stationary log returns series.
    
    Args:
        df: Target pandas DataFrame.
        price_col: Token name of the source price column.
        
    Returns:
        A cleaned pd.Series of log returns with NaNs and Infs removed.
    """
    if price_col not in df.columns:
        raise KeyError(f"Target price column '{price_col}' not found in the provided DataFrame.")
    
    try:
        # Cast to numeric, forcing corrupted strings to NaN
        numeric_prices = pd.to_numeric(df[price_col], errors='coerce')
        
        if numeric_prices.isna().all():
            raise TimeSeriesDataError(f"Column '{price_col}' contains no valid numerical records.")
            
        # Calculate log returns: ln(P_t) - ln(P_{t-1})
        log_returns = np.log(numeric_prices) - np.log(numeric_prices.shift(1))
        
        # Clean infinite remnants (e.g., division by zero) and strip empty rows
        clean_returns = log_returns.replace([np.inf, -np.inf], np.nan).dropna()
        
        if len(clean_returns) < 10:  # Minimum sample constraint for downstream models
            raise TimeSeriesDataError("Insufficient valid observations remaining after data cleaning steps.")
            
        logger.info(f"Successfully computed log returns. Total active records: {len(clean_returns)}")
        return clean_returns
        
    except Exception as e:
        logger.error(f"Failed to calculate log returns: {str(e)}")
        raise


def execute_adf_test(series: pd.Series, series_name: str) -> dict:
    """
    Executes an Augmented Dickey-Fuller unit root test with strict input safeguards.
    
    Args:
        series: Cleaned, one-dimensional time-series data array.
        series_name: Label used for logging and tracking.
        
    Returns:
        A dictionary containing critical thresholds, test statistics, and stationarity results.
    """
    if not isinstance(series, pd.Series):
        raise TypeError("Input must be a valid pandas Series object.")
        
    # Final production safeguard against unexpected NaN or infinite values
    sanitized_series = series.replace([np.inf, -np.inf], np.nan).dropna()
    
    if len(sanitized_series) == 0:
        raise TimeSeriesDataError(f"Cannot run ADF test on '{series_name}'. Series is empty.")

    try:
        logger.info(f"Initiating ADF test routine for: {series_name}")
        adf_stat, p_value, _, _, critical_values, _ = adfuller(sanitized_series, autolag='AIC')
        
        is_stationary = bool(p_value <= 0.05)
        
        results = {
            "series_name": series_name,
            "adf_statistic": float(adf_stat),
            "p_value": float(p_value),
            "critical_values": {k: float(v) for k, v in critical_values.items()},
            "is_stationary": is_stationary
        }

        # Interpret the p-value (alpha = 0.05)
        if results['p_value'] <= 0.05:
            print(f"Result: Reject Null Hypothesis. The {series_name} series is STATIONARY. (Safe to model)\n")
        else:
            print(f"Result: Fail to Reject Null Hypothesis. The {series_name} series is NON-STATIONARY. (Do not model raw!)\n")
            
        logger.info(f"ADF execution completed for {series_name}. Stationary status: {is_stationary}")
        return results
        
    except Exception as e:
        logger.error(f"Critical execution error during ADF testing on '{series_name}': {str(e)}")
        raise