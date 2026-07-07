@echo off
cd /d "%~dp0.."
start "" powershell -NoProfile -ExecutionPolicy Bypass -File ".claude/serve-car-spec-compare.ps1"
timeout /t 2 /nobreak >nul
start "" http://localhost:8421
