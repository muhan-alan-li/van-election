PORT ?= 8000
DIST ?= dist

.PHONY: help install build dev serve preview check clean

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-8s %s\n", $$1, $$2}'

install: ## Install dependencies (npm ci)
	npm ci

build: ## One-off production build into $(DIST)/
	npm run build

dev: ## Watch-rebuild + serve $(DIST)/ at http://localhost:$(PORT)/
	npm run dev & \
	DEV_PID=$$!; \
	trap 'kill $$DEV_PID' INT TERM EXIT; \
	npx --yes serve $(DIST) -l $(PORT); \
	wait $$DEV_PID

serve: ## Serve existing $(DIST)/ build at http://localhost:$(PORT)/ (no rebuild)
	npx --yes serve $(DIST) -l $(PORT)

preview: serve ## Alias for serve

check: ## Type-check (tsc --noEmit)
	npm run check

clean: ## Remove build output
	rm -rf $(DIST)
