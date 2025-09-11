from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import pose, workouts

# Create FastAPI app
app = FastAPI(
    title="MyCoachAI API",
    description="Personal AI trainer with real-time form analysis",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pose.router, prefix="/api/v1/pose", tags=["pose-analysis"])
app.include_router(workouts.router, prefix="/api/v1/workouts", tags=["workouts"])

@app.get("/")
def root():
    return {
        "message": "MyCoachAI API",
        "version": "0.1.0",
        "docs": "/docs",
        "status": "🏋️ Ready to coach!"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "mycoach-ai-api"}
