import json
import os
import numpy as np
from typing import Dict, List, Any, Tuple

# MoveNet keypoint indices
KEYPOINT_MAP = {
    'nose': 0, 'left_eye': 1, 'right_eye': 2, 'left_ear': 3, 'right_ear': 4,
    'left_shoulder': 5, 'right_shoulder': 6, 'left_elbow': 7, 'right_elbow': 8,
    'left_wrist': 9, 'right_wrist': 10, 'left_hip': 11, 'right_hip': 12,
    'left_knee': 13, 'right_knee': 14, 'left_ankle': 15, 'right_ankle': 16
}

# Map generic names to left-side landmarks by default
GENERIC_TO_KEYPOINT = {
    'shoulder': 'left_shoulder',
    'elbow': 'left_elbow',
    'wrist': 'left_wrist',
    'hip': 'left_hip',
    'knee': 'left_knee',
    'ankle': 'left_ankle',
}

def _load_specs() -> Dict[str, Any]:
    here = os.path.dirname(__file__)
    path = os.path.join(here, 'exercise_specs.json')
    try:
        with open(path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print('Failed to load exercise specs:', e)
        return {}

SPECS = _load_specs()

def _point_from_name(name: str, keypoints: np.ndarray) -> Tuple[float, float, float]:
    mapped = GENERIC_TO_KEYPOINT.get(name, name)
    idx = KEYPOINT_MAP.get(mapped)
    if idx is None or idx >= keypoints.shape[0]:
        return (0.0, 0.0, 0.0)
    return tuple(keypoints[idx])  # (x, y, c)

def _angle(a, b, c) -> float:
    # angle at b between ba and bc in degrees
    ba = np.array([a[0]-b[0], a[1]-b[1]])
    bc = np.array([c[0]-b[0], c[1]-b[1]])
    denom = (np.linalg.norm(ba) * np.linalg.norm(bc))
    if denom == 0:
        return 0.0
    cos_val = np.clip(np.dot(ba, bc) / denom, -1.0, 1.0)
    return float(np.degrees(np.arccos(cos_val)))

def _horizontal_deviation(p1, p2) -> float:
    # normalized by image width (assumes x in [0,1])
    return abs(p1[0] - p2[0])

def _vertical_alignment(points: List[Tuple[float, float, float]]) -> float:
    # std dev of x positions as a proxy for vertical alignment; lower is better
    xs = [p[0] for p in points if p[2] > 0.3]
    if len(xs) < 2:
        return 1.0
    return float(np.std(xs))

def analyze_pose(exercise_type: str, keypoints: np.ndarray) -> Dict[str, Any]:
    """Analyze pose based on exercise type and return feedback using JSON-driven rules"""
    et = exercise_type.lower()
    spec = SPECS.get(et)
    if not spec:
        return {
            "feedback": f"{exercise_type} analysis coming soon!",
            "corrections": ["Keep good form"],
            "rep_count": 0,
            "is_good_rep": False
        }

    results = []
    corrections: List[str] = []
    good = True

    for rule in spec.get('rules', []):
        rtype = rule.get('type')
        pts = [ _point_from_name(n, keypoints) for n in rule.get('points', []) ]
        ok = True
        value = None

        if rtype == 'angle' and len(pts) == 3:
            value = _angle(pts[0], pts[1], pts[2])
            min_v = rule.get('min', -9999)
            max_v = rule.get('max', 9999)
            ok = (value >= min_v) and (value <= max_v)
        elif rtype == 'horizontal_distance' and len(pts) == 2:
            value = _horizontal_deviation(pts[0], pts[1])
            max_dev = rule.get('maxDeviation', 0.2)
            ok = value <= max_dev
        elif rtype == 'vertical_alignment' and len(pts) >= 2:
            value = _vertical_alignment(pts)
            max_dev = rule.get('maxDeviation', 0.2)
            ok = value <= max_dev
        else:
            ok = True  # unknown rule types considered pass

        results.append({
            'id': rule.get('id'),
            'type': rtype,
            'value': value,
            'ok': ok,
            'severity': rule.get('severity', 'low')
        })

        if not ok:
            corrections.append(rule.get('errorMessage', 'Adjust your form'))
            if rule.get('severity') == 'high':
                good = False

    # Simple rep position signal
    rep_cfg = spec.get('repDetection', {})
    lm = rep_cfg.get('landmark')
    axis = rep_cfg.get('axis', 'y')
    threshold = rep_cfg.get('threshold', 0.5)
    dirn = rep_cfg.get('direction', 'down_up')
    rep_value = None
    if lm:
        p = _point_from_name(lm, keypoints)
        coord = p[1] if axis == 'y' else p[0]
        rep_value = float(coord)
    is_good_rep = good and all(r['ok'] for r in results)

    feedback = "Excellent form!" if is_good_rep else (corrections[0] if corrections else "Keep steady")

    return {
        'feedback': feedback,
        'corrections': corrections,
        'rules': results,
        'rep_signal': {
            'landmark': lm,
            'axis': axis,
            'value': rep_value,
            'threshold': threshold,
            'direction': dirn,
        },
        'rep_count': 0,
        'is_good_rep': is_good_rep,
    }

def analyze_squat(keypoints: np.ndarray) -> Dict[str, Any]:  # backwards compatibility if used elsewhere
    return analyze_pose('squat', keypoints)

def analyze_pushup(keypoints: np.ndarray) -> Dict[str, Any]:
    return analyze_pose('pushup', keypoints)

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
