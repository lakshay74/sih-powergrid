from scenario.simulation import router as simulation_router
app.include_router(simulation_router, prefix="/api/scenario")
