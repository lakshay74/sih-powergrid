from fastapi import FastAPI
from scenario.simulate import router as scenario_router

app = FastAPI(title="POWERGRID Backend")

app.include_router(scenario_router, prefix="/api/scenario")
