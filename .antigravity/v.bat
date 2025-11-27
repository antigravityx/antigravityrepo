@echo off
REM Verix Quick Launcher
REM Solo para Richon

cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -File "verix.ps1" -Command %1 -Message %2
