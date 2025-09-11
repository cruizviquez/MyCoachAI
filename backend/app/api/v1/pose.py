from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
from app.services.pose_analyzer import analyze_pose, calculate_form_score

router = APIRouter()

class Keypoint(BaseModel):
    x: float
    y: float
    confidence: float

class PoseData(BaseModel):
    exercise_type: str
    keypoints: List[Keypoint]
    timestamp: float

class FormFeedback(BaseModel):
    form_score: float
    feedback_text: str
    corrections: List[str]
    rep_count: int
    is_good_rep: bool

@router.post("/analyze", response_model=FormFeedback)
async def analyze_form(pose_data: PoseData):
    """Analyze pose data and return real-time form feedback"""
    try:
        # Convert keypoints to numpy array
        keypoints_array = np.array([
            [kp.x, kp.y, kp.confidence] 
            for kp in pose_data.keypoints
        ])
        
        # Analyze the pose
        analysis = analyze_pose(pose_data.exercise_type, keypoints_array)
        form_score = calculate_form_score(pose_data.exercise_type, keypoints_array)
        
        return FormFeedback(
            form_score=form_score,
            feedback_text=analysis["feedback"],
            corrections=analysis["corrections"],
            rep_count=analysis["rep_count"],
            is_good_rep=analysis["is_good_rep"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error analyzing pose: {str(e)}")

@router.get("/exercises")
async def get_supported_exercises():
    """Get list of supported exercises"""
    return {
        "exercises": [
            {"name": "squat", "display_name": "Squats", "difficulty": "beginner"},
            {"name": "pushup", "display_name": "Push-ups", "difficulty": "beginner"},
        ]
    }
