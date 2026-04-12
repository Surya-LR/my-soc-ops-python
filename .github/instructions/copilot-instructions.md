# Soc Ops Project Guidelines

## Development Checklist
- [ ] Lint: uv run ruff check .
- [ ] Test: uv run pytest
- [ ] Install: uv sync (if dependencies changed)

## Code Style
- Python 3.13+, type hints, PEP 8
- Ruff linting (py313 target), config in pyproject.toml

## Architecture
- FastAPI backend, HTMX frontend, Jinja2 templates
- Game logic in pp/game_logic.py, state in pp/game_service.py
- Assets: pp/static/, templates: pp/templates/

## Build & Run
- Dev server: uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## Conventions
- No VS Code Simple Browser; use external browser at http://localhost:8000
- Frontend: Avoid generic AI aesthetics, see .github/instructions/frontend-design.instructions.md
- CSS: Follow .github/instructions/css-utilities.instructions.md
- Test new features, maintain coverage

See workshop/ and docs/ for guides. Copilot Dev Days lab.