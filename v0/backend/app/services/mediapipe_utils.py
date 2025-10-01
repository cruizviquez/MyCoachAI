import cv2
import numpy as np
import mediapipe as mp
from typing import Tuple, List

def extract_keypoints_from_image(image: np.ndarray) -> List[dict]:
    mp_pose = mp.solutions.pose
    with mp_pose.Pose(static_image_mode=True) as pose:
        results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        if not results.pose_landmarks:
            return []
        keypoints = []
        for idx, lm in enumerate(results.pose_landmarks.landmark):
            keypoints.append({
                'x': lm.x,
                'y': lm.y,
                'confidence': lm.visibility,
                'index': idx
            })
        return keypoints

def mediapipe_keypoints_to_numpy(keypoints: List[dict]) -> np.ndarray:
    arr = np.zeros((33, 3))
    for kp in keypoints:
        arr[kp['index']] = [kp['x'], kp['y'], kp['confidence']]
    return arr
