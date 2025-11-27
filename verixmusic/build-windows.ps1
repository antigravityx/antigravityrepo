# VerixMusic - Windows Installer Creator
# Firmado por: VerixRichon Software Factory
# Usa Electron para crear app de Windows

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "    VERIXMUSIC WINDOWS INSTALLER     " -ForegroundColor Magenta
Write-Host "    VerixRichon Software Factory     " -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
$nodeInstalled = Get-Command node -ErrorAction SilentlyContinue

if (-not $nodeInstalled) {
    Write-Host "[ERROR] Node.js no está instalado" -ForegroundColor Red
    Write-Host "[INFO] Descarga Node.js de: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Node.js instalado" -ForegroundColor Green
Write-Host ""

# Crear estructura Electron
Write-Host "[INFO] Creando estructura de proyecto Electron..." -ForegroundColor Cyan

$projectDir = "verixmusic-electron"

if (Test-Path $projectDir) {
    Write-Host "[INFO] Limpiando directorio anterior..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $projectDir
}

New-Item -ItemType Directory -Path $projectDir | Out-Null
Set-Location $projectDir

# Crear package.json
$packageJson = @"
{
  "name": "verixmusic",
  "version": "2.0.0",
  "description": "VerixMusic - Personal Music Player",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  "author": "VerixRichon",
  "license": "MIT",
  "devDependencies": {
    "electron": "^27.0.0",
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "com.verixrichon.verixmusic",
    "productName": "VerixMusic",
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
"@

$packageJson | Out-File -FilePath "package.json" -Encoding UTF8

# Crear main.js
$mainJs = @"
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        backgroundColor: '#000000',
        autoHideMenuBar: true
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
"@

$mainJs | Out-File -FilePath "main.js" -Encoding UTF8

# Copiar index.html
Copy-Item "..\index.html" "index.html"

Write-Host "[OK] Estructura creada" -ForegroundColor Green
Write-Host ""
Write-Host "Pasos siguientes:" -ForegroundColor Yellow
Write-Host "  1. cd $projectDir" -ForegroundColor White
Write-Host "  2. npm install" -ForegroundColor White
Write-Host "  3. npm run build" -ForegroundColor White
Write-Host ""
Write-Host "El instalador se generará en: dist/VerixMusic Setup.exe" -ForegroundColor Cyan
Write-Host ""

Set-Location ..

Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

<#
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Windows Installer Builder
    Verix × Richon
    Proyecto Amistad 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#>
