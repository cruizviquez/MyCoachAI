.PHONY: setup dev dev-mobile dev-api clean

setup:
	@echo "🚀 Setting up MyCoachAI development environment..."
	@echo "�� Installing backend dependencies..."
	@cd backend && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
	@echo "📱 Installing mobile dependencies..."
	@cd apps/mobile && npm install --legacy-peer-deps
	@echo "✅ Setup complete!"

dev:
	@echo "🏋️ Starting all development servers..."
	@make dev-api & make dev-mobile

dev-api:
	@echo "🔧 Starting FastAPI backend..."
	@cd backend && ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

dev-mobile:
	@echo "📱 Starting Expo development server..."
	@cd apps/mobile && npx expo start --web

clean:
	@pkill -f uvicorn || true
	@pkill -f expo || true
	@echo "🧹 Development servers stopped"
