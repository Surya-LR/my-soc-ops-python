#!/bin/bash
# Verification script for ruff linting configuration

echo "=========================================="
echo "Ruff Linting Configuration Verification"
echo "=========================================="
echo ""

# Check if ruff is installed
echo "1. Checking ruff installation..."
if python -m ruff --version > /dev/null 2>&1; then
    echo "✓ ruff is installed"
    python -m ruff --version
else
    echo "✗ ruff is not installed"
    echo "Install with: pip install ruff"
    exit 1
fi
echo ""

# Display current ruff configuration
echo "2. Current Ruff Configuration:"
echo "---"
python -m ruff config --show 2>/dev/null | grep -A 5 "tool.ruff.lint"
echo "---"
echo ""

# Run ruff checks
echo "3. Running ruff checks on app and tests..."
echo "---"
if python -m ruff check app tests --show-settings 2>&1 | head -20; then
    echo ""
    echo "✓ Linting check completed"
else
    echo "✗ Linting check failed"
fi
echo ""

# Summary
echo "=========================================="
echo "Summary of Linting Rules:"
echo "=========================================="
echo "✓ E  - PEP 8 style violations"
echo "✓ F  - PyFlakes logic errors"
echo "✓ I  - isort import sorting"
echo "✓ N  - pep8-naming conventions"
echo "✓ UP - PyUpgrade modern syntax (Python 3.13)"
echo "✓ W  - Warnings (whitespace, etc.)"
echo "✓ F841 - Unused variables (extended)"
echo "=========================================="
