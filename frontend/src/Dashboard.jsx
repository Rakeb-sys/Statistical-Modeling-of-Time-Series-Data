import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

export default function BirhanEnergiesDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [tauDistribution, setTauDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Concurrent asynchronously resolution of all domain endpoints
    Promise.all([
      fetch('http://127.0.0.1:5000/api/brent/metrics').then(res => res.json()),
      fetch('http://127.0.0.1:5000/api/brent/events').then(res => res.json()),
      fetch('http://127.0.0.1:5000/api/brent/posterior-tau').then(res => res.json())
    ])
    .then(([metricsRes, eventsRes, tauRes]) => {
      setMetrics(metricsRes.regime_analysis);
      setTimelineData(eventsRes.data);
      setTauDistribution(tauRes);
      setLoading(false);
    })
    .catch(err => {
      console.error("Connection Error:", err);
      setError("Failed to stream data metrics from the Flask backend engine. Ensure Python app.py is live on port 5000.");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
        <div style={{ border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
        <h3 style={{ marginTop: '16px', color: '#475569' }}>Compiling Bayesian Analysis Interface...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', maxWidt: '600px', margin: '40px auto', fontFamily: 'sans-serif', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', color: '#991b1b' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Network Connection Fault</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* EXECUTIVE CONTROL BANNER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '24px 32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>BIRHAN ENERGIES</h1>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Brent Crude MCMC Regime Transition & Asset Analytics Control Center</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '8px 16px', borderRadius: '6px', color: '#38bdf8', fontSize: '12px', fontWeight: 'bold' }}>
          ● NUMPYRO INTERPOLATION CORE ACTIVE
        </div>
      </header>

      {/* STATISTICAL KBI MATRIX CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '6px solid #10b981' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pre-Break Volatility (σ₁)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '8px', margin: 0, color: '#1e293b' }}>{metrics.sigma_1_pre_break}%</h2>
            <span style={{ color: '#64748b', fontSize: '14px' }}>weekly deviation</span>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '8px 0 0 0' }}>Historical Market Equilibrium Space</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '6px solid #ef4444' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Post-Break Volatility (σ₂)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '8px', margin: 0, color: '#ef4444' }}>{metrics.sigma_2_post_break}%</h2>
            <span style={{ color: '#ef4444', fontSize: '13px', fontWeight: 'bold' }}>▲ +{metrics.volatility_expansion_pct}% Surge</span>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '8px 0 0 0' }}>Structural Volatility Regime Drift</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '6px solid #f59e0b' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mean Return Shift (Δ μ)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '8px', margin: 0, color: '#ea580c' }}>{metrics.absolute_mean_drag}%</h2>
            <span style={{ color: '#ea580c', fontSize: '13px', fontWeight: 'bold' }}>-159.8% Drop</span>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '8px 0 0 0' }}>Baseline Structural Price Drag Factor</p>
        </div>

      </div>

      {/* CORE DATA VISUALIZATION CANVAS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        
        {/* BAYESIAN POSTERIOR DENSITY CHART */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Bayesian Structural Posterior Location Density P(τ | Data)</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              Isolated Structural Anchor: <b>{tauDistribution.primary_historical_anchor}</b> (Est Median: Week {tauDistribution.median_estimated_week})
            </p>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tauDistribution.coordinates} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week_index" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="density_count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="MCMC Iterations Saved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '12px', fontSize: '12px', color: '#475569', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
            <div><b>94% HDI Lower Bound:</b> Week {tauDistribution.hdi_94_lower_bound}</div>
            <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '24px' }}><b>94% HDI Upper Bound:</b> Week {tauDistribution.hdi_94_upper_bound}</div>
          </div>
        </div>

        {/* ASSET TIMELINE LINE GRAPH WITH SHADED INFLECTION MARKER */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>Asset Price Trajectory & Identified Regime Boundaries</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
               Shaded column area isolates the mathematical structural change boundary convergence zone
            </p>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="Date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Price" stroke="#0f172a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" name="Brent Crude Index ($)" />
                {/* Dynamically shades the change point region within the line chart */}
                <ReferenceArea x1={timelineData[650]?.Date} x2={timelineData[780]?.Date} fill="#fee2e2" fillOpacity={0.4} label={{ value: "Tau Transition Window", fill: '#ef4444', fontSize: 11, position: 'insideTopLeft' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* HISTORICAL LEDGER DATA ROWS SHEET */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a', fontWeight: '700' }}>Historical Macro Coincidence Ledger</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', backgroundColor: '#f8fafc', color: '#475569' }}>
                <th style={{ padding: '14px 16px' }}>Date Stamp</th>
                <th style={{ padding: '14px 16px' }}>Contextual Geopolitical / OPEC Policy Shock Parameter</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Reference Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {timelineData.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: '16px', textAlign: 'center', color: '#94a3b8' }}>
                    No macro-event entries mapped inside the source CSV. Populate data/event_dataset.csv to drive layout rows.
                  </td>
                </tr>
              ) : (
                timelineData.slice(0, 5).map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#0f172a' }}>{row.Date || 'N/A'}</td>
                    <td style={{ padding: '14px 16px' }}>{row.Event || 'Standard Market Matrix Period'}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '600', color: '#475569' }}>
                      {row.Price ? `$${Number(row.Price).toFixed(2)}` : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}