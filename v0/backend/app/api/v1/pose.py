
from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List
import numpy as np
import cv2
from tempfile import NamedTemporaryFile
from app.services.pose_analyzer import analyze_pose, calculate_form_score
from app.services.mediapipe_utils import extract_keypoints_from_image, mediapipe_keypoints_to_numpy

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


# New: Accept image upload, run Mediapipe, and analyze pose
@router.post("/analyze/image")
async def analyze_pose_image(exercise_type: str, file: UploadFile = File(...)):
    try:
        with NamedTemporaryFile(delete=False, suffix=".jpg") as temp:
            temp.write(await file.read())
            temp_path = temp.name
        image = cv2.imread(temp_path)
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image upload")
        keypoints = extract_keypoints_from_image(image)
        if not keypoints:
            return {"feedback": "No person detected", "corrections": [], "rep_count": 0, "is_good_rep": False, "form_score": 0.0}
        keypoints_array = mediapipe_keypoints_to_numpy(keypoints)
        analysis = analyze_pose(exercise_type, keypoints_array)
        form_score = calculate_form_score(exercise_type, keypoints_array)
        return {
            "form_score": form_score,
            "feedback_text": analysis["feedback"],
            "corrections": analysis["corrections"],
            "rep_count": analysis["rep_count"],
            "is_good_rep": analysis["is_good_rep"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error analyzing pose from image: {str(e)}")

@router.get("/exercises")
async def get_supported_exercises():
    """Get list of supported exercises"""
    return {
        "exercises": [
            {"name": "squat", "display_name": "Squats", "difficulty": "beginner"},
            {"name": "pushup", "display_name": "Push-ups", "difficulty": "beginner"},
        ]
    }
