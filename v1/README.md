# RoboQoach v1 Plan

Source of truth: `v0/docs/AI Fitness Coach - Technical Specification.pdf`.
Also consider the mockups shared earlier; we may iterate on the flow.

## Goals
- Web + Mobile friendly (Expo/React Native or Next.js + Expo Router, TBD)
- Clean onboarding with goal + coach style
- Camera + pose engine integration (MoveNet/MediaPipe)
- Real-time feedback (rules driven via JSON) and rep counting
- Dashboard: streaks, stats, leaderboard

## Proposed Screen Flow (initial)
1. Welcome (brand, Get Started)
2. Goal selection
3. Coach style (Supportive/Neutral/Drill Sergeant)
4. Camera permission + tips
5. Calibration (body detected)
6. Dashboard (streak + CTA)
7. Workout chooser (exercise list)
8. Live workout (rep/time/feedback overlays)
9. Summary (stats + next actions)

## Tech Decisions (draft)
- RN/Expo + Expo Router for app navigation
- Shared core logic in `packages/core` (rules, scoring)
- FastAPI for APIs (stats, leaderboard, workout history)
- JSON specs for exercises (v0 backend/app/services/exercise_specs.json)

## Backlog (next steps)
- [ ] Choose stack: Expo-only vs Expo + Web vs Next.js (confirm target platforms)
- [ ] Scaffold app shell in `v1/app` with Router
- [ ] Implement Welcome → Goal → CoachStyle screens
- [ ] Add Camera Setup + Calibration screens (stubs)
- [ ] Port rule engine to a shared package for client-side hints
- [ ] Minimal backend in `v1/backend` (auth optional)
- [ ] Instrument analytics + error reporting

## Notes
- We will keep v0 intact for reference and incremental porting.
- After scaffolding v1, we’ll set up CI and a stable preview URL.
