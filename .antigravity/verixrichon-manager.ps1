# VerixRichon Manager
# Windows PowerShell App para gestionar el ecosistema VerixRichon
# Firmado por: VerixRichon Software Factory

param(
    [string]$Action = "menu"
)

# Configuración
$VERIXRICHON_ROOT = "C:\Users\Usuario\.gemini\antigravity\verixrichon"
$PROJECTS_ROOT = "C:\Users\Public\webappred"
$SIGNATURE = "VerixRichon Software Factory"

# Colores
function Write-VRX {
    param([string]$Text, [string]$Type = "Info")
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    switch($Type) {
        "Success" { Write-Host "[VRX][$timestamp] $Text" -ForegroundColor Green }
        "Error" { Write-Host "[VRX][$timestamp] $Text" -ForegroundColor Red }
        "Warning" { Write-Host "[VRX][$timestamp] $Text" -ForegroundColor Yellow }
        "Info" { Write-Host "[VRX][$timestamp] $Text" -ForegroundColor Cyan }
        "Title" { Write-Host "[VRX][$timestamp] $Text" -ForegroundColor Magenta }
    }
}

# Banner
function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "    VERIXRICHON SOFTWARE FACTORY    " -ForegroundColor Magenta
    Write-Host "    Verix × Richon                  " -ForegroundColor Green
    Write-Host "    Proyecto Amistad 2025           " -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
}

# Menú principal
function Show-Menu {
    Show-Banner
    Write-Host "MENU PRINCIPAL:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  1. Ver Proyectos" -ForegroundColor White
    Write-Host "  2. Ver Extensiones" -ForegroundColor White
    Write-Host "  3. Configurar Flaticon API" -ForegroundColor White
    Write-Host "  4. Abrir VerixMusic" -ForegroundColor White
    Write-Host "  5. Ver Schedule Monitor" -ForegroundColor White
    Write-Host "  6. Estadísticas" -ForegroundColor White
    Write-Host "  7. Backup de Configuración" -ForegroundColor White
    Write-Host "  8. Acerca de VerixRichon" -ForegroundColor White
    Write-Host "  0. Salir" -ForegroundColor Red
    Write-Host ""
}

# Ver proyectos
function Show-Projects {
    Show-Banner
    Write-VRX "Proyectos VerixRichon:" "Title"
    Write-Host ""
    
    $config = Get-Content "$VERIXRICHON_ROOT\core.json" | ConvertFrom-Json
    
    foreach($project in $config.projects) {
        $status = switch($project.status) {
            "active" { "[ACTIVO]" }
            "in_development" { "[EN DESARROLLO]" }
            default { "[DESCONOCIDO]" }
        }
        
        Write-Host "  $status $($project.name)" -ForegroundColor Green
        Write-Host "    Creado: $($project.created)" -ForegroundColor Gray
        Write-Host "    Propósito: $($project.purpose)" -ForegroundColor Gray
        Write-Host ""
    }
    
    Write-Host "Presiona cualquier tecla para continuar..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Ver extensiones
function Show-Extensions {
    Show-Banner
    Write-VRX "Extensiones VerixRichon:" "Title"
    Write-Host ""
    
    $config = Get-Content "$VERIXRICHON_ROOT\core.json" | ConvertFrom-Json
    
    foreach($ext in $config.extensions.PSObject.Properties) {
        $enabled = if($ext.Value.enabled) { "[HABILITADA]" } else { "[DESHABILITADA]" }
        
        Write-Host "  $enabled $($ext.Name)" -ForegroundColor Cyan
        Write-Host "    Versión: $($ext.Value.version)" -ForegroundColor Gray
        
        if($ext.Value.features) {
            Write-Host "    Features: $($ext.Value.features -join ', ')" -ForegroundColor Gray
        }
        Write-Host ""
    }
    
    Write-Host "Presiona cualquier tecla para continuar..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Configurar Flaticon API
function Configure-Flaticon {
    Show-Banner
    Write-VRX "Configuración de Flaticon API" "Title"
    Write-Host ""
    
    Write-Host "Para obtener tu API Key:" -ForegroundColor Yellow
    Write-Host "  1. Ve a https://www.flaticon.com/api" -ForegroundColor White
    Write-Host "  2. Regístrate o inicia sesión" -ForegroundColor White
    Write-Host "  3. Crea una aplicación" -ForegroundColor White
    Write-Host "  4. Copia tu API Key" -ForegroundColor White
    Write-Host ""
    
    $apiKey = Read-Host "Ingresa tu Flaticon API Key (o Enter para cancelar)"
    
    if($apiKey) {
        $config = Get-Content "$VERIXRICHON_ROOT\core.json" | ConvertFrom-Json
        $config.extensions.flaticon_api.config.api_key = $apiKey
        $config | ConvertTo-Json -Depth 10 | Set-Content "$VERIXRICHON_ROOT\core.json"
        
        Write-VRX "API Key configurada exitosamente!" "Success"
    } else {
        Write-VRX "Configuración cancelada" "Warning"
    }
    
    Start-Sleep -Seconds 2
}

# Abrir VerixMusic
function Open-VerixMusic {
    Write-VRX "Abriendo VerixMusic..." "Info"
    Start-Process "$PROJECTS_ROOT\verixmusic\index.html"
    Start-Sleep -Seconds 1
}

# Ver estadísticas
function Show-Stats {
    Show-Banner
    Write-VRX "Estadísticas VerixRichon:" "Title"
    Write-Host ""
    
    $config = Get-Content "$VERIXRICHON_ROOT\core.json" | ConvertFrom-Json
    
    Write-Host "  Proyectos Creados: $($config.metrics.projects_created)" -ForegroundColor Green
    Write-Host "  En Desarrollo: $($config.metrics.projects_in_development)" -ForegroundColor Yellow
    Write-Host "  Extensiones Activas: $($config.metrics.extensions_active)" -ForegroundColor Cyan
    Write-Host "  Nivel de Colaboración: $($config.metrics.collaboration_level)/6" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "  Fundado: $($config.verixrichon.founded)" -ForegroundColor Gray
    Write-Host "  Firma: $($config.verixrichon.signature)" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "Presiona cualquier tecla para continuar..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Backup
function Create-Backup {
    Show-Banner
    Write-VRX "Creando backup de configuración..." "Info"
    
    $backupDir = "$VERIXRICHON_ROOT\backups"
    if(-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir | Out-Null
    }
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = "$backupDir\verixrichon_backup_$timestamp.json"
    
    Copy-Item "$VERIXRICHON_ROOT\core.json" $backupFile
    
    Write-VRX "Backup creado: $backupFile" "Success"
    Start-Sleep -Seconds 2
}

# Acerca de
function Show-About {
    Show-Banner
    Write-Host "VERIXRICHON SOFTWARE FACTORY" -ForegroundColor Magenta
    Write-Host ""
    Write-Host "Fundado: 25 de Noviembre 2025" -ForegroundColor White
    Write-Host "Creadores: Verix (AI) × Richon (Developer)" -ForegroundColor White
    Write-Host "Misión: Construir herramientas únicas" -ForegroundColor White
    Write-Host "Visión: Colaboración AI-Human que crea magia" -ForegroundColor White
    Write-Host ""
    Write-Host "Valores:" -ForegroundColor Yellow
    Write-Host "  - Amistad primero" -ForegroundColor Gray
    Write-Host "  - Calidad sobre cantidad" -ForegroundColor Gray
    Write-Host "  - Evolución constante" -ForegroundColor Gray
    Write-Host "  - Personalización total" -ForegroundColor Gray
    Write-Host "  - Firma unificada" -ForegroundColor Gray
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "    Proyecto Amistad 2025           " -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Presiona cualquier tecla para continuar..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Loop principal
function Start-Manager {
    while($true) {
        Show-Menu
        $choice = Read-Host "Selecciona una opción"
        
        switch($choice) {
            "1" { Show-Projects }
            "2" { Show-Extensions }
            "3" { Configure-Flaticon }
            "4" { Open-VerixMusic }
            "5" { 
                Write-VRX "Abriendo Schedule Monitor..." "Info"
                Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File $PROJECTS_ROOT\.antigravity\schedule-monitor.ps1"
                Start-Sleep -Seconds 1
            }
            "6" { Show-Stats }
            "7" { Create-Backup }
            "8" { Show-About }
            "0" { 
                Write-VRX "¡Hasta pronto, Richon!" "Success"
                exit 
            }
            default { 
                Write-VRX "Opción inválida" "Error"
                Start-Sleep -Seconds 1
            }
        }
    }
}

# Ejecución
if($Action -eq "menu") {
    Start-Manager
} else {
    Write-VRX "VerixRichon Manager - Use -Action menu para abrir el menú" "Info"
}

<#
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Manager App v1.0
    Verix × Richon
    Proyecto Amistad 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#>
