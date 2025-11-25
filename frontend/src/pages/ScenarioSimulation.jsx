import { useState } from "react";

const API_BASE = "http://localhost:8000";

export default function ScenarioSimulation() {
  const [input, setInput] = useState({
    project_region: "All Regions",
    project_type: "Transmission Line",
    timeline_months: 6,
    budget_adjustment: 100,
    demand_projection: 100,
    material_cost_variance: 5,
  });

  const [result, setResult] = useState(null);

  const runScenario = async () => {
    const res = await fetch(`${API_BASE}/api/scenario/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Scenario Simulation</h2>
      <button onClick={runScenario}>Run Simulation</button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
