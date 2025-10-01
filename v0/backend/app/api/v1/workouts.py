from fastapi import APIRouter

router = APIRouter()

@router.get("/next")
async def get_next_workout():
    return {
        "workout": {
            "name": "Beginner Full Body",
            "exercises": [
                {"name": "squat", "reps": 10, "sets": 3},
                {"name": "pushup", "reps": 8, "sets": 3},
            ]
        }
    }
