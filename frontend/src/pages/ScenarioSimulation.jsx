import { useState } from "react";

// If backend is running on same domain, keep API_BASE = ""
const API_BASE = "http://localhost:8000";

export default function ScenarioSimulation() {
  const [input, setInput] = useState({
    project_id: "P1",
    region_id: "R1",
    horizon_months: 6,
    demand_change_percent: 0,
    cost_change_percent: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const runScenario = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/scenario/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scenario Simulation</h2>

      <div style={{ marginBottom: 20 }}>
        <label>Project ID:</label>
        <input
          value={input.project_id}
          onChange={(e) => updateField("project_id", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Region ID:</label>
        <input
          value={input.region_id}
          onChange={(e) => updateField("region_id", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Horizon (months):</label>
        <input
          type="number"
          value={input.horizon_months}
          onChange={(e) => updateField("horizon_months", Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Demand Change %:</label>
        <input
          type="number"
          value={input.demand_change_percent}
          onChange={(e) =>
            updateField("demand_change_percent", Number(e.target.value))
          }
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Cost Change %:</label>
        <input
          type="number"
          value={input.cost_change_percent}
          onChange={(e) =>
            updateField("cost_change_percent", Number(e.target.value))
          }
        />
      </div>

      <button onClick={runScenario} disabled={loading}>
        {loading ? "Running..." : "Run Simulation"}
      </button>

      {error && <div style={{ color: "red", marginTop: 20 }}>Error: {error}</div>}

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

