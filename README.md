
# Brent Crude Oil Price Analytics: Bayesian Change Point Discovery Framework

An end-to-end analytical framework designed to identify structural breaks in Brent crude oil prices using Bayesian inference, map them against a curated registry of macroeconomic/geopolitical events, and expose the findings via a high-performance Flask REST API and an interactive React analytics dashboard.

---

## 🏗️ System Architecture & Workflow


```

[Data Ingestion: Spot Prices] ──> [EDA & Log Returns Diagnostics] ──> [PyMC Bayesian Change Point Model]
│
[React Interactive UI]       <── [Flask REST API Endpoint Layers]   <── [Quantified Regime Metrics]

```

The system is engineered in three distinct layers:
1. **Analytical Pipeline (`pipeline_model.py`):** Ingests raw pricing series, performs mathematical transformations, runs Markov Chain Monte Carlo (MCMC) simulations to isolate structural breaks ($\tau$), and verifies sampler convergence.
2. **Backend Engine (`app.py`):** A robust Flask microservice that transforms serialized model metrics, historical tables, and geopolitical contextual tags into standard RESTful JSON channels.
3. **Frontend Dashboard (`Dashboard.jsx`):** A modern React single-page application built with Recharts for dynamic visual layering, timeline event drills, and temporal range filters.

---

## 📂 Project Repository Structure

```text
├── README.md                  # System orchestration and deployment roadmap
├── app.py                     # Production-ready Flask REST API application
├── pipeline_model.py          # PyMC MCMC structural change point script
├── package.json               # JavaScript package manifest and UI runtime scripts
└── src/
    └── Dashboard.jsx          # Interactive React dashboard view layer

```

---

## 🛠️ Step-by-Step Installation & Deployment

### Prerequisite Environment

Ensure your environment is running **Python 3.10+** and **Node.js 18+**.

### Step 1: Environment Isolation & Python Package Provisioning

Isolate your Python runtime and install the required numerical computing, Bayesian sampling, and backend web-framework packages:

```bash
# Initialize isolated virtual environment container
python -m venv venv

# Activate isolation container (Linux/macOS)
source venv/bin/activate

# Activate isolation container (Windows PowerShell)
# .\venv\Scripts\Activate.ps1

# Upgrade base pip engine and install requirements
pip install --upgrade pip
pip install numpy pandas pymc arviz matplotlib flask

```

### Step 2: Compute Structural Breaks & Generate Plots

Execute the core scientific computing pipeline. This builds the structural change point model, runs the No-U-Turn Sampler (NUTS), evaluates convergence criteria ($R_{hat} \approx 1.0$), and exports visual diagnostics.

```bash
python pipeline_model.py

```

*Output Verification:* Check your directory root for `brent_changepoint_analysis.png`. This graphic displays the historical spot series overlayed with the calculated transition boundary alongside posterior distribution parameters.

### Step 3: Launch the Flask REST API Gateway

Start the backend microservice to expose the operational analytics engine endpoints over local ports:

```bash
python app.py

```

*Verification Check:* Ensure the terminal outputs `* Running on http://127.0.0.1:5000`. You can ping test the live data stream directly via cURL:

```bash
curl [http://127.0.0.1:5000/api/v1/models/changepoints](http://127.0.0.1:5000/api/v1/models/changepoints)

```

### Step 4: Provision & Start the Frontend Web UI

Open a secondary terminal workspace, initialize node packaging definitions, install the data-visualization dependencies, and spawn the development server:

```bash
# Install core React bindings and Recharts visualization package
npm install react react-dom recharts

# Spin up the local development web server
npm start

```

The interface will automatically deploy on `http://localhost:3000/` inside your default browser session.

---

## 📡 Production API Reference Manual

The Flask microservice supports the following endpoints (all outputs are returned in standardized JSON layout with strict Cross-Origin Resource Sharing [CORS] verification protocols active):

### 1. Historical Prices Stream

* **Endpoint:** `GET /api/v1/prices/historical`
* **Query Parameters:** `start_date` (YYYY-MM-DD), `end_date` (YYYY-MM-DD)
* **Description:** Extracts raw daily spot indices alongside derived continuous tracking log-returns.

### 2. Bayesian Change Point Diagnostic Output

* **Endpoint:** `GET /api/v1/models/changepoints`
* **Description:** Pulls exact computed structural split indexes ($\tau$), historical segment means ($\mu_1, \mu_2$), standard deviations ($\sigma_1, \sigma_2$), net percent shifts, and $R_{hat}$ convergence health flags.

### 3. Geopolitical Event Registry Matrix

* **Endpoint:** `GET /api/v1/events/registry`
* **Description:** Returns a chronological array of verified macroeconomic shocks, OPEC output revisions, and supply-chain blockages to match against structural chart anomalies.

---

## 🔍 Core Analytical Assumptions & Constraints

When reviewing system outputs, note the following structural rules:

* **Correlation vs. Causality:** The underlying model isolates mathematical break indices where data distributions shift significantly. *This does not prove physical causality.* Mapped event matches represent high-probability contextual correlations.
* **Single-Point Break Boundary:** The baseline implementation assumes a single, stark structural jump. Real-world structural changes can sometimes take the form of rolling, multi-point volatility clusters or slow, continuous transitions.
* **Log-Return Adjustments:** Raw asset tracking uses non-stationary values. To ensure reliable statistical inferences, data is processed using transformed daily stationary log returns:

$$\ln(P_t) - \ln(P_{t-1})$$



```

```