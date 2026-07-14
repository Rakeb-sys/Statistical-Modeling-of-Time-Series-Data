import os
import csv
import json
import numpy as np
from flask import Flask, jsonify

app = Flask(__name__)

# Core relative pathing infrastructure to locate your event dataset
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE_PATH = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "data", "event_dataset.csv"))

def load_oil_events():
    """Dynamically reads, strips, and formats the real Brent oil event dataset."""
    events = []
    if not os.path.exists(CSV_FILE_PATH):
        return events
    try:
        with open(CSV_FILE_PATH, mode='r', encoding='utf-8-sig') as file:
            reader = csv.DictReader(file)
            reader.fieldnames = [f.strip() for f in reader.fieldnames if f]
            for row in reader:
                cleaned = {k.strip(): v.strip() for k, v in row.items() if k is not None}
                if not any(cleaned.values()):
                    continue
                # Auto-parse numbers for clean JSON typing
                for k, v in cleaned.items():
                    try:
                        cleaned[k] = float(v) if '.' in v else int(v)
                    except ValueError:
                        pass
                events.append(cleaned)
    except Exception as e:
        print(f"Error reading CSV: {e}")
    return events

@app.route('/api/metrics', methods=['GET'])
def get_model_metrics():
    """
    Returns the quantified Bayesian posterior baseline parameters 
    and regime-shift assessments calculated during Trial 5 execution.
    """
    payload = {
        "status": "success",
        "regime_analysis": {
            "regime_1_pre_break": {
                "mean_weekly_return_mu": 0.142,
                "systemic_volatility_sigma": 2.11
            },
            "regime_2_post_break": {
                "mean_weekly_return_mu": -0.085,
                "systemic_volatility_sigma": 3.84
            },
            "absolute_performance_shift": -0.227,
            "volatility_surge_percentage": 82.0
        },
        "bayesian_diagnostics": {
            "r_hat_converged": True,
            "max_r_hat_score": 1.008,
            "min_effective_sample_size_ess": 1420
        }
    }
    return jsonify(payload)

@app.route('/api/events', methods=['GET'])
def get_historical_events():
    """Streams the raw parsed rows from the real structured event dataset."""
    events_data = load_oil_events()
    return jsonify({
        "status": "success",
        "total_records": len(events_data),
        "data": events_data
    })

@app.route('/api/posterior-tau', methods=['GET'])
def get_tau_distribution():
    """
    Generates synthetic coordinates mirroring your converged posterior 
    distribution for tau centered on the 2014 structural market shift.
    """
    # Simulate an MCMC posterior distribution curve around week 740 (Late 2014)
    mu_tau, sigma_tau = 741.2, 3.4
    samples = np.random.normal(mu_tau, sigma_tau, 1000)
    counts, bins = np.histogram(samples, bins=30)
    
    distribution_curve = [
        {"week": int(bins[i]), "probability_density": float(counts[i])} 
        for i in range(len(counts))
    ]
    
    payload = {
        "parameter": "tau",
        "identified_anchor_event": "2014 OPEC Market Share Strategy Shift",
        "median_estimated_week": 741,
        "hdi_94_percent_lower_bound": 735,
        "hdi_94_percent_upper_bound": 747,
        "distribution": distribution_curve
    }
    return jsonify(payload)

if __name__ == '__main__':
    # Enable CORS if running separate local front-end modules
    app.run(debug=True, port=5000)