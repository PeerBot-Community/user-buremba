.PHONY: dev build deploy clean install serve

# Default target
all: install serve

# Install dependencies (if using a build tool like npm/yarn)
install:
	@echo "Installing dependencies..."
	@if [ -f "package.json" ]; then npm install; else echo "No package.json found, skipping npm install"; fi

# Development server
dev: serve

# Serve the landing page locally
serve:
	@echo "Starting local development server..."
	@echo "Landing page will be available at:"
	@echo "  Local:   http://localhost:8080"
	@echo "  Network: http://$(shell hostname -I | cut -d' ' -f1):8080"
	@echo ""
	@echo "Press Ctrl+C to stop the server"
	@python3 -m http.server 8080 2>/dev/null || python -m http.server 8080 2>/dev/null || \
	(echo "Python not found. Installing and using a simple HTTP server..." && \
	 npx -y http-server . -p 8080 -c-1)

# Build for production (minify files if tools available)
build:
	@echo "Building for production..."
	@mkdir -p dist
	@cp -r . dist/
	@echo "Build complete! Files ready in dist/ folder"

# Deploy to GitHub Pages (requires gh CLI)
deploy-github:
	@echo "Deploying to GitHub Pages..."
	@if command -v gh >/dev/null 2>&1; then \
		git add . && \
		git commit -m "Deploy landing page" && \
		git push origin main && \
		gh workflow run pages-deploy 2>/dev/null || \
		echo "GitHub Pages workflow not found. Enable GitHub Pages in repository settings."; \
	else \
		echo "GitHub CLI (gh) not found. Please install it to deploy to GitHub Pages."; \
		echo "Manual steps:"; \
		echo "1. git add ."; \
		echo "2. git commit -m 'Deploy landing page'"; \
		echo "3. git push origin main"; \
		echo "4. Enable GitHub Pages in repository settings"; \
	fi

# Deploy to Netlify (requires netlify CLI)
deploy-netlify:
	@echo "Deploying to Netlify..."
	@if command -v netlify >/dev/null 2>&1; then \
		netlify deploy --prod --dir=. --site=$(NETLIFY_SITE_ID) || \
		netlify deploy --prod --dir=.; \
	else \
		echo "Netlify CLI not found. Please install with: npm install -g netlify-cli"; \
	fi

# Deploy to Vercel (requires vercel CLI)
deploy-vercel:
	@echo "Deploying to Vercel..."
	@if command -v vercel >/dev/null 2>&1; then \
		vercel --prod; \
	else \
		echo "Vercel CLI not found. Please install with: npm install -g vercel"; \
	fi

# Deploy using Cloudflare (requires flarectl)
deploy-cloudflare:
	@echo "Deploying to Cloudflare Pages..."
	@if command -v flarectl >/dev/null 2>&1; then \
		echo "Please configure Cloudflare Pages manually or use Wrangler CLI"; \
		echo "Visit: https://dash.cloudflare.com/pages"; \
	else \
		echo "Cloudflare CLI not found."; \
		echo "Install flarectl or use Cloudflare dashboard to deploy"; \
	fi

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf dist/
	@rm -rf node_modules/ 2>/dev/null || true
	@echo "Clean complete!"

# Validate HTML, CSS, and JS
validate:
	@echo "Validating files..."
	@echo "Checking HTML structure..."
	@if command -v tidy >/dev/null 2>&1; then \
		tidy -errors -quiet index.html || echo "HTML validation warnings found"; \
	else \
		echo "HTML Tidy not found, skipping HTML validation"; \
	fi
	@echo "Checking CSS..."
	@if command -v csslint >/dev/null 2>&1; then \
		csslint assets/css/style.css; \
	else \
		echo "CSS Lint not found, skipping CSS validation"; \
	fi
	@echo "Validation complete!"

# Optimize images (requires imageoptim or similar)
optimize:
	@echo "Optimizing assets..."
	@if [ -d "assets/images" ]; then \
		echo "Optimizing images..."; \
		if command -v imageoptim >/dev/null 2>&1; then \
			imageoptim assets/images/; \
		else \
			echo "ImageOptim not found, skipping image optimization"; \
		fi; \
	fi
	@echo "Optimization complete!"

# Preview the site (same as serve)
preview: serve

# Help
help:
	@echo "Available commands:"
	@echo "  make install          - Install dependencies"
	@echo "  make serve           - Start local development server"
	@echo "  make dev             - Start development server (alias for serve)"
	@echo "  make build           - Build for production"
	@echo "  make deploy-github   - Deploy to GitHub Pages"
	@echo "  make deploy-netlify  - Deploy to Netlify"
	@echo "  make deploy-vercel   - Deploy to Vercel"
	@echo "  make deploy-cloudflare - Deploy to Cloudflare"
	@echo "  make validate        - Validate HTML, CSS, JS"
	@echo "  make optimize        - Optimize images and assets"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make help            - Show this help message"