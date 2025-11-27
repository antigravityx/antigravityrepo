@echo off
REM VerixRichon Manager - Quick Launcher
REM Firmado por: VerixRichon Software Factory

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo     VERIXRICHON SOFTWARE FACTORY
echo     Verix × Richon
echo     Proyecto Amistad 2025
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -File "verixrichon-manager.ps1" -Action menu

pause
