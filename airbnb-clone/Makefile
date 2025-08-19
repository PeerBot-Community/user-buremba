.PHONY: install dev start build test lint format clean deploy

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	bun install

# Development server with hot reload
dev:
	@echo "🚀 Starting development server..."
	bun run dev

# Production server
start:
	@echo "🌐 Starting production server..."
	bun run start

# Build (no build step needed for Node.js, but kept for consistency)
build:
	@echo "🔨 Building application..."
	bun run build

# Run tests
test:
	@echo "🧪 Running tests..."
	bun run test

# Lint code
lint:
	@echo "🔍 Linting code..."
	bun run lint

# Format code
format:
	@echo "💅 Formatting code..."
	bun run format

# Clean node_modules and reinstall
clean:
	@echo "🧹 Cleaning dependencies..."
	rm -rf node_modules
	bun install

# Deploy to production (customize based on your deployment target)
deploy:
	@echo "🚀 Deploying to production..."
	@echo "⚠️  Configure your deployment commands here"
	@echo "Examples:"
	@echo "  - Docker: docker build -t airbnb-clone . && docker push airbnb-clone"
	@echo "  - Heroku: git push heroku main"
	@echo "  - PM2: pm2 restart airbnb-clone"

# Quick setup for new environment
setup: install
	@echo "⚙️  Setting up environment..."
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env file..."; \
		cp .env.example .env; \
		echo "⚠️  Please update .env with your configuration"; \
	fi
	@echo "✅ Setup complete! Run 'make dev' to start development"

# Show available commands
help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make dev      - Start development server"
	@echo "  make start    - Start production server"
	@echo "  make build    - Build application"
	@echo "  make test     - Run tests"
	@echo "  make lint     - Lint code"
	@echo "  make format   - Format code"
	@echo "  make clean    - Clean and reinstall dependencies"
	@echo "  make deploy   - Deploy to production"
	@echo "  make setup    - Quick setup for new environment"
	@echo "  make help     - Show this help message"