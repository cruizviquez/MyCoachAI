# MyCoachAI

### Your Personal AI Trainer

MyCoachAI revolutionizes fitness training by transforming your smartphone into an intelligent personal trainer.
# MyCoachAI

### Your Personal AI Trainer

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![API Status](https://img.shields.io/badge/API-Running-green)](http://localhost:8000/docs)
[![Python](https://img.shields.io/badge/Python-3.12+-blue)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green)](https://fastapi.tiangolo.com/)

---

## 🎯 What is MyCoachAI?

MyCoachAI revolutionizes fitness training by transforming your smartphone into an intelligent personal trainer. Using advanced computer vision and machine learning, it provides **real-time form analysis**, **instant feedback**, and **personalized coaching** for your workouts.

**🔥 No Equipment • 📱 Just Your Phone • 🤖 AI-Powered • 🔒 100% Private**

### ✨ Key Features

- **🎯 Real-Time Form Analysis** - AI tracks 17 key body points for perfect technique
- **🗣️ Instant Audio Coaching** - Get voice feedback without looking at your screen  
- **📊 Smart Rep Counting** - Only quality movements count toward your goals
- **🧠 Adaptive Programming** - Workouts that evolve based on your progress
- **📈 Progress Analytics** - Visual insights into your form improvements
- **🔒 Privacy First** - All AI processing happens on your device

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** (for backend development)
- **Node.js 18+** (for mobile app development)
- **Git** (for version control)

### 1. Backend Setup (FastAPI)
```bash
# Navigate to backend
cd backend

# Install Python dependencies
pip3 install -r requirements.txt

# Start the API server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

2. Test the API

Visit http://localhost:8000/docs to explore the interactive API documentation.

Try the pose analysis endpoint:
curl -X POST "http://localhost:8000/api/v1/pose/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "exercise_type": "squat",
    "keypoints": [{"x": 100, "y": 200, "confidence": 0.9}],
    "timestamp": 1234567890
  }'

  🏗️ Project Structure

  MyCoachAI/
├── 📱 apps/
│   ├── mobile/          # React Native app (iOS/Android)
│   └── web/             # Next.js landing page
├── 🔧 backend/
│   ├── app/
│   │   ├── api/v1/      # FastAPI routes
│   │   │   ├── pose.py      # Pose analysis endpoints
│   │   │   └── workouts.py  # Workout endpoints
│   │   ├── services/    # Business logic
│   │   │   └── pose_analyzer.py  # AI form analysis
│   │   └── main.py      # FastAPI application
│   └── requirements.txt # Python dependencies
├── 🏢 infrastructure/
│   ├── docker/          # Container configurations
│   └── terraform/       # AWS infrastructure as code
├── 📦 packages/
│   └── ui/              # Shared UI components
└── 📚 docs/             # Documentation

Tech Stack
Layer	Technology	Purpose
Mobile	React Native + Expo	Cross-platform mobile app
AI/ML	TensorFlow.js + MoveNet	On-device pose estimation
Backend	FastAPI + Python	REST API and business logic
Infrastructure	AWS + Docker	Scalable cloud deployment

🎯 Supported Exercises
✅ Currently Available
Exercise	Difficulty	Form Checks
Squats	Beginner	Depth, knee alignment, posture
Push-ups	Beginner	Body alignment, range of motion

🔄 Coming Soon

    Lunges - Balance and form analysis
    Deadlifts - Hip hinge pattern recognition
    Planks - Core stability tracking
    Pull-ups - Grip and pulling mechanics

🔬 How It Works
1. Pose Detection

Uses MoveNet Lightning model to detect 17 key body points:

text

nose, left_eye, right_eye, left_ear, right_ear,
left_shoulder, right_shoulder, left_elbow, right_elbow,
left_wrist, right_wrist, left_hip, right_hip,
left_knee, right_knee, left_ankle, right_ankle

2. Form Analysis

python

def analyze_squat(keypoints):
    # Check depth: hip below knee level
    if hip_y > knee_y:
        return "Great depth! 💪"
    else:
        return "Go deeper - hip should be below knee level"

3. Real-Time Feedback

    Form Score: 0-100 based on technique quality
    Audio Cues: "Keep your back straight", "Great form!"
    Visual Analysis: Detailed movement breakdown

🛠️ Development
GitHub Codespaces (Recommended)

Open in GitHub Codespaces

Why Codespaces?

    ✅ All dependencies pre-installed
    ✅ Port forwarding for API testing
    ✅ VS Code with extensions
    ✅ Zero local setup required

API Endpoints
Endpoint	Method	Description
/	GET	API status and info
/health	GET	Health check
/docs	GET	Interactive API documentation
/api/v1/pose/analyze	POST	Analyze pose data
/api/v1/pose/exercises	GET	Supported exercises
/api/v1/workouts/next	GET	Get personalized workout
📱 Mobile App (Coming Soon)
Features in Development

    Camera Integration - Use phone camera for pose detection
    Real-time Overlay - Visual feedback during workouts
    Workout Programs - Curated routines for all fitness levels
    Progress Tracking - See your improvement over time

🤝 Contributing

We welcome contributions from developers, fitness experts, and AI researchers!
Ways to Contribute

    🐛 Report Bugs - Help us improve stability
    💡 Suggest Features - Share your ideas for new exercises
    🔧 Submit PRs - Contribute code improvements
    📝 Improve Docs - Help others understand the project

🚀 Roadmap
Phase 1: MVP (Current)

    ✅ Real-time pose detection API
    ✅ Basic exercise analysis (squats, push-ups)
    ✅ Form scoring algorithm
    🔄 Mobile app development

Phase 2: Enhanced Features

    📱 iOS/Android app release
    🗣️ Real-time audio coaching
    📊 Progress tracking and analytics
    🏋️ Additional exercises (deadlifts, planks)

Phase 3: Advanced AI

    🧠 Personalized workout generation
    🎯 Injury risk prediction
    👥 Social features and challenges

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
📞 Contact & Support

    📧 Email: support@mycoach.ai
    🐛 Report Issues: GitHub Issues
    💬 Discussions: GitHub Discussions

🏋️ Transform Your Training with MyCoachAI

The future of fitness is here - powered by AI, designed for everyone

Built with ❤️ and 🤖 by the MyCoachAI team
