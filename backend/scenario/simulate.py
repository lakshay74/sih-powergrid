from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class ScenarioInput(BaseModel):
    project_region: str
    project_type: str
    timeline_months: int
    budget_adjustment: float
    demand_projection: float
    material_cost_variance: float


class ScenarioOutput(BaseModel):
    demand: List[float]
    supply: List[float]
    cost_projection: List[float]
    comparison_matrix: Dict[str, Dict]
    summary: Dict[str, float]


@router.post("/run", response_model=ScenarioOutput)
def run_scenario(data: ScenarioInput):
    BASE_DEMAND = [420, 560, 490, 610, 670, 700]
    BASE_SUPPLY = [400, 540, 500, 600, 680, 690]
    BASE_COST   = [2400, 2600, 2500, 3000, 2800, 3200]

    demand_factor = data.demand_projection / 100.0
    cost_factor   = 1 + (data.material_cost_variance / 100.0)

    scenario_demand = [round(x * demand_factor, 2) for x in BASE_DEMAND]
    scenario_supply = BASE_SUPPLY
    scenario_cost   = [round(x * cost_factor, 2) for x in BASE_COST]

    matrix = {
        "Current":    {"cost": BASE_COST[-1],           "eff": 75, "fulfillment": 82},
        "Optimistic": {"cost": BASE_COST[-1] * 0.9,     "eff": 80, "fulfillment": 90},
        "Pessimistic":{"cost": BASE_COST[-1] * 1.2,     "eff": 60, "fulfillment": 70},
        "Realistic":  {"cost": scenario_cost[-1],       "eff": 72, "fulfillment": 85},
    }

    summary = {
        "additional_cost": scenario_cost[-1] - BASE_COST[-1],
        "demand_change_factor": demand_factor,
        "cost_variance_factor": cost_factor,
    }

    return ScenarioOutput(
        demand=scenario_demand,
        supply=scenario_supply,
        cost_projection=scenario_cost,
        comparison_matrix=matrix,
        summary=summary,
    )
