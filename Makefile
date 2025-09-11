.PHONY: setup

setup:
	@echo "🚀 Setting up MyCoachAI development environment..."
	@cd backend && pip3 install -r requirements.txt
	@cd apps/mobile && npm install || true
	@echo "✅ Setup complete!"
