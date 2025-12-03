from fastapi import FastAPI
from scenario.simulation import router as simulation_router

# Create FastAPI app
app = FastAPI()

# Register simulation router
app.include_router(simulation_router, prefix="/api/scenario")

# Home / ping route
@app.get("/")
def home():
    return {"message": "Backend running"}

# Optional: health route
@app.get("/health")
def health():
    return {"status": "ok"}


