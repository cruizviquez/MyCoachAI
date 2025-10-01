// Ported from v0/backend/app/services/pose_analyzer.py
// TypeScript version for RoboQoach v1
const squatSpecs = require('./exercise_specs.json');

export type Keypoint = [number, number, number]; // [x, y, confidence]
export type Keypoints = Keypoint[];

const KEYPOINT_MAP: { [key: string]: number } = {
  nose: 0, left_eye: 1, right_eye: 2, left_ear: 3, right_ear: 4,
  left_shoulder: 5, right_shoulder: 6, left_elbow: 7, right_elbow: 8,
  left_wrist: 9, right_wrist: 10, left_hip: 11, right_hip: 12,
  left_knee: 13, right_knee: 14, left_ankle: 15, right_ankle: 16
};

const GENERIC_TO_KEYPOINT: { [key: string]: string } = {
  shoulder: 'left_shoulder',
  elbow: 'left_elbow',
  wrist: 'left_wrist',
  hip: 'left_hip',
  knee: 'left_knee',
  ankle: 'left_ankle',
};

function pointFromName(name: string, keypoints: Keypoints): Keypoint {
  const mapped = GENERIC_TO_KEYPOINT[name] || name;
  const idx = KEYPOINT_MAP[mapped];
  if (idx === undefined || idx >= keypoints.length) return [0, 0, 0];
  return keypoints[idx];
}

function angle(a: Keypoint, b: Keypoint, c: Keypoint): number {
  const ba = [a[0] - b[0], a[1] - b[1]];
  const bc = [c[0] - b[0], c[1] - b[1]];
  const denom = Math.hypot(...ba) * Math.hypot(...bc);
  if (denom === 0) return 0;
  const cosVal = Math.max(-1, Math.min(1, (ba[0] * bc[0] + ba[1] * bc[1]) / denom));
  return Math.acos(cosVal) * (180 / Math.PI);
}

function horizontalDeviation(p1: Keypoint, p2: Keypoint): number {
  return Math.abs(p1[0] - p2[0]);
}

function verticalAlignment(points: Keypoint[]): number {
  const xs = points.filter(p => p[2] > 0.3).map(p => p[0]);
  if (xs.length < 2) return 1.0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const variance = xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length;
  return Math.sqrt(variance);
}

export function analyzePose(exerciseType: string, keypoints: Keypoints) {
  const et = exerciseType.toLowerCase();
  const spec = squatSpecs[et];
  if (!spec) {
    return {
      feedback: `${exerciseType} analysis coming soon!`,
      corrections: ['Keep good form'],
      rep_count: 0,
      is_good_rep: false
    };
  }
  const results = [];
  const corrections: string[] = [];
  let good = true;
  for (const rule of spec.rules || []) {
    const rtype = rule.type;
    const pts = rule.points.map((n: string) => pointFromName(n, keypoints));
    let ok = true;
    let value: number | undefined = undefined;
    if (rtype === 'angle' && pts.length === 3) {
      value = angle(pts[0], pts[1], pts[2]);
      const min_v = rule.min ?? -9999;
      const max_v = rule.max ?? 9999;
      ok = value >= min_v && value <= max_v;
    } else if (rtype === 'horizontal_distance' && pts.length === 2) {
      value = horizontalDeviation(pts[0], pts[1]);
      const maxDev = rule.maxDeviation ?? 0.2;
      ok = value <= maxDev;
    } else if (rtype === 'vertical_alignment' && pts.length >= 2) {
      value = verticalAlignment(pts);
      const maxDev = rule.maxDeviation ?? 0.2;
      ok = value <= maxDev;
    }
    results.push({
      id: rule.id,
      type: rtype,
      value,
      ok,
      severity: rule.severity || 'low'
    });
    if (!ok) {
      corrections.push(rule.errorMessage || 'Adjust your form');
      if (rule.severity === 'high') good = false;
    }
  }
  // Rep detection
  const rep_cfg = spec.repDetection || {};
  const lm = rep_cfg.landmark;
  const axis = rep_cfg.axis || 'y';
  const threshold = rep_cfg.threshold || 0.5;
  const dirn = rep_cfg.direction || 'down_up';
  let rep_value: number | undefined = undefined;
  if (lm) {
    const p = pointFromName(lm, keypoints);
    rep_value = axis === 'y' ? p[1] : p[0];
  }
  const is_good_rep = good && results.every(r => r.ok);
  const feedback = is_good_rep ? 'Excellent form!' : corrections[0] || 'Keep steady';
  return {
    feedback,
    corrections,
    rules: results,
    rep_signal: {
      landmark: lm,
      axis,
      value: rep_value,
      threshold,
      direction: dirn
    },
    rep_count: 0,
    is_good_rep
  };
}

export function calculateFormScore(exerciseType: string, keypoints: Keypoints): number {
  const visible = keypoints.filter(kp => kp[2] > 0.5);
  if (visible.length === 0) return 0.0;
  const avgConfidence = visible.reduce((a, b) => a + b[2], 0) / visible.length;
  return Math.round(avgConfidence * 1000) / 10;
}
