.PHONY: setup dev dev-mobile clean

setup:
	@echo "🚀 Setting up MyCoachAI development environment..."
	@echo "📦 Installing backend dependencies..."
	@cd backend && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
	@echo "📱 Installing mobile app dependencies..."
	@if [ -f apps/mobile/package.json ]; then cd apps/mobile && npm install; else echo "Mobile app not initialized yet"; fi
	@echo "✅ Setup complete!"

dev:
	@echo "🏋️ Starting MyCoachAI backend API..."
	@cd backend && ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

dev-mobile:
	@echo "📱 Starting Expo development server..."
	@cd apps/mobile && npx expo start

clean:
	@pkill -f uvicorn || true
	@echo "🧹 Development servers stopped"
