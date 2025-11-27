@echo off
REM AntiGravity Schedule Monitor - Quick Start
REM Firmado por: AntiGravityRichon

echo.
echo ========================================
echo   ANTIGRAVITY SCHEDULE MONITOR
echo   Firmado por: AntiGravityRichon
echo ========================================
echo.

cd /d "%~dp0"

echo [*] Iniciando sistema de notificaciones...
echo [*] Presiona Ctrl+C para detener
echo.

powershell.exe -ExecutionPolicy Bypass -File "schedule-monitor.ps1" -StartMonitoring

pause
