# VerixMusic - Build APK Script
# Firmado por: VerixRichon Software Factory

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "    VERIXMUSIC APK BUILDER           " -ForegroundColor Magenta
Write-Host "    VerixRichon Software Factory     " -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe Apache Cordova
$cordovaInstalled = Get-Command cordova -ErrorAction SilentlyContinue

if (-not $cordovaInstalled) {
    Write-Host "[INFO] Apache Cordova no está instalado" -ForegroundColor Yellow
    Write-Host "[INFO] Para crear APK, necesitas:" -ForegroundColor Yellow
    Write-Host "  1. Node.js instalado" -ForegroundColor White
    Write-Host "  2. Ejecutar: npm install -g cordova" -ForegroundColor White
    Write-Host "  3. Android SDK instalado" -ForegroundColor White
    Write-Host ""
    Write-Host "[ALTERNATIVA] Usa un servicio online:" -ForegroundColor Cyan
    Write-Host "  - https://www.pwabuilder.com/" -ForegroundColor White
    Write-Host "  - Sube index.html y manifest.json" -ForegroundColor White
    Write-Host "  - Genera APK automáticamente" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "[OK] Cordova instalado" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pasos para crear APK:" -ForegroundColor Yellow
    Write-Host "  1. cordova create verixmusic-app com.verixrichon.verixmusic VerixMusic" -ForegroundColor White
    Write-Host "  2. cd verixmusic-app" -ForegroundColor White
    Write-Host "  3. cordova platform add android" -ForegroundColor White
    Write-Host "  4. Copiar archivos a www/" -ForegroundColor White
    Write-Host "  5. cordova build android" -ForegroundColor White
    Write-Host ""
}

Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

<#
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    APK Builder Script
    Verix × Richon
    Proyecto Amistad 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#>
