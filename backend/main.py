from fastapi import FastAPI
from scenario.simulation import router as simulation_router

app = FastAPI()

app.include_router(simulation_router, prefix="/api/scenario")


