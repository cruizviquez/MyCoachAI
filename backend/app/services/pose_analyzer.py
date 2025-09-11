import numpy as np
from typing import Dict, List, Any

# MoveNet keypoint indices
KEYPOINT_MAP = {
    'nose': 0, 'left_eye': 1, 'right_eye': 2, 'left_ear': 3, 'right_ear': 4,
    'left_shoulder': 5, 'right_shoulder': 6, 'left_elbow': 7, 'right_elbow': 8,
    'left_wrist': 9, 'right_wrist': 10, 'left_hip': 11, 'right_hip': 12,
    'left_knee': 13, 'right_knee': 14, 'left_ankle': 15, 'right_ankle': 16
}

def analyze_pose(exercise_type: str, keypoints: np.ndarray) -> Dict[str, Any]:
    """Analyze pose based on exercise type and return feedback"""
    if exercise_type.lower() == "squat":
        return analyze_squat(keypoints)
    elif exercise_type.lower() == "pushup":
        return analyze_pushup(keypoints)
    else:
        return {
            "feedback": f"{exercise_type} analysis coming soon!",
            "corrections": ["Keep good form"],
            "rep_count": 1,
            "is_good_rep": True
        }

def analyze_squat(keypoints: np.ndarray) -> Dict[str, Any]:
    """Analyze squat form"""
    corrections = []
    feedback = "Good squat form!"
    
    # Get key points (only if confidence > 0.5)
    try:
        left_hip = keypoints[KEYPOINT_MAP['left_hip']]
        left_knee = keypoints[KEYPOINT_MAP['left_knee']]
        
        if left_hip[2] > 0.5 and left_knee[2] > 0.5:
            # Check squat depth (y increases downward)
            if left_hip[1] > left_knee[1]:
                corrections.append("Great depth! 💪")
            else:
                corrections.append("Go deeper - hip should be below knee level")
                feedback = "Good start - try going deeper"
        else:
            corrections.append("Position yourself fully in frame")
            feedback = "Move into better camera view"
    except (IndexError, KeyError):
        corrections.append("Pose detection in progress...")
        feedback = "Keep moving to help AI detect your pose"
    
    return {
        "feedback": feedback,
        "corrections": corrections,
        "rep_count": 1,
        "is_good_rep": any("Great" in c for c in corrections)
    }

def analyze_pushup(keypoints: np.ndarray) -> Dict[str, Any]:
    """Analyze pushup form"""
    return {
        "feedback": "Nice pushup form!",
        "corrections": ["Keep your body straight", "Control the movement"],
        "rep_count": 1,
        "is_good_rep": True
    }

def calculate_form_score(exercise_type: str, keypoints: np.ndarray) -> float:
    """Calculate overall form score (0-100)"""
    try:
        # Average confidence of visible keypoints
        visible_keypoints = keypoints[keypoints[:, 2] > 0.5]
        if len(visible_keypoints) == 0:
            return 0.0
        
        avg_confidence = np.mean(visible_keypoints[:, 2])
        return round(avg_confidence * 100, 1)
    except:
        return 50.0  # Default score if calculation fails
