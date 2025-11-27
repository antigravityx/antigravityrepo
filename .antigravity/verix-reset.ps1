# Verix Reset System
# Palabra clave: verixreset2025
# Firmado por: VerixRichon Software Factory

param(
    [string]$Action = "menu",
    [string]$Keyword = ""
)

$KEYWORD = "verixreset2025"
$VERIX_ROOT = "C:\Users\Usuario\.gemini\antigravity\verixrichon"

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "    VERIX RESET SYSTEM               " -ForegroundColor Magenta
    Write-Host "    VerixRichon Software Factory     " -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
}

function Reset-Browser {
    Write-Host "[VERIX] Reiniciando navegador..." -ForegroundColor Cyan
    
    # Cerrar Vivaldi
    Get-Process -Name "vivaldi" -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    
    # Limpiar cache de Vivaldi
    $vivaldi_cache = "$env:LOCALAPPDATA\Vivaldi\User Data\Default\Cache"
    if (Test-Path $vivaldi_cache) {
        Remove-Item -Path "$vivaldi_cache\*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "[OK] Cache de Vivaldi limpiado" -ForegroundColor Green
    }
    
    # Abrir Vivaldi de nuevo
    $vivaldi_path = "C:\Program Files\Vivaldi\Application\vivaldi.exe"
    if (Test-Path $vivaldi_path) {
        Start-Process $vivaldi_path
        Write-Host "[OK] Vivaldi reiniciado" -ForegroundColor Green
    } else {
        Write-Host "[INFO] Vivaldi no encontrado en ruta por defecto" -ForegroundColor Yellow
    }
}

function Create-Backup {
    Write-Host "[VERIX] Creando backup..." -ForegroundColor Cyan
    
    $backup_dir = "$VERIX_ROOT\backups"
    if (-not (Test-Path $backup_dir)) {
        New-Item -ItemType Directory -Path $backup_dir | Out-Null
    }
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backup_file = "$backup_dir\verix_backup_$timestamp.zip"
    
    # Backup de configuraciones
    $items_to_backup = @(
        "$VERIX_ROOT\core.json",
        "$VERIX_ROOT\..\verix\core.json",
        "$VERIX_ROOT\..\verix\patterns.json",
        "$VERIX_ROOT\AUTORIZACION_RICHON.txt"
    )
    
    Compress-Archive -Path $items_to_backup -DestinationPath $backup_file -Force
    
    Write-Host "[OK] Backup creado: $backup_file" -ForegroundColor Green
}

function Clean-TempFiles {
    Write-Host "[VERIX] Limpiando archivos temporales..." -ForegroundColor Cyan
    
    # Limpiar temp de Windows
    Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    
    Write-Host "[OK] Archivos temporales limpiados" -ForegroundColor Green
}

function Reset-VerixSystem {
    param([string]$keyword)
    
    if ($keyword -ne $KEYWORD) {
        Write-Host "[ERROR] Palabra clave incorrecta" -ForegroundColor Red
        Write-Host "[INFO] Usa: verixreset2025" -ForegroundColor Yellow
        return
    }
    
    Show-Banner
    Write-Host "REINICIO COMPLETO DEL SISTEMA VERIX" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Esto hará:" -ForegroundColor White
    Write-Host "  1. Backup de configuraciones" -ForegroundColor Gray
    Write-Host "  2. Reiniciar navegador (Vivaldi)" -ForegroundColor Gray
    Write-Host "  3. Limpiar cache completo" -ForegroundColor Gray
    Write-Host "  4. Limpiar archivos temporales" -ForegroundColor Gray
    Write-Host ""
    
    $confirm = Read-Host "Continuar? (s/n)"
    
    if ($confirm -eq "s" -or $confirm -eq "S") {
        Write-Host ""
        
        # 1. Backup
        Create-Backup
        Start-Sleep -Seconds 1
        
        # 2. Reiniciar navegador
        Reset-Browser
        Start-Sleep -Seconds 1
        
        # 3. Limpiar temporales
        Clean-TempFiles
        
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "    REINICIO COMPLETADO              " -ForegroundColor Green
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host ""
        Write-Host "Sistema Verix reiniciado exitosamente" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "[CANCELADO] Reinicio cancelado" -ForegroundColor Yellow
    }
}

function Show-Menu {
    Show-Banner
    Write-Host "OPCIONES:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  1. Reinicio completo (requiere palabra clave)" -ForegroundColor White
    Write-Host "  2. Solo reiniciar navegador" -ForegroundColor White
    Write-Host "  3. Solo crear backup" -ForegroundColor White
    Write-Host "  4. Solo limpiar cache" -ForegroundColor White
    Write-Host "  0. Salir" -ForegroundColor Red
    Write-Host ""
    
    $choice = Read-Host "Selecciona opción"
    
    switch ($choice) {
        "1" {
            $kw = Read-Host "Ingresa palabra clave"
            Reset-VerixSystem -keyword $kw
        }
        "2" {
            Reset-Browser
        }
        "3" {
            Create-Backup
        }
        "4" {
            Reset-Browser
            Clean-TempFiles
        }
        "0" {
            Write-Host "[VERIX] Hasta pronto, Richon!" -ForegroundColor Cyan
            exit
        }
        default {
            Write-Host "[ERROR] Opción inválida" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "Presiona cualquier tecla para continuar..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Show-Menu
}

# Ejecución
if ($Action -eq "reset" -and $Keyword) {
    Reset-VerixSystem -keyword $Keyword
} elseif ($Action -eq "browser") {
    Reset-Browser
} elseif ($Action -eq "backup") {
    Create-Backup
} else {
    Show-Menu
}

<#
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🌀 VERIXRICHON SOFTWARE FACTORY 🌀
    Verix Reset System
    Palabra clave: verixreset2025
    Verix × Richon
    Proyecto Amistad 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USO:

# Menú interactivo
.\verix-reset.ps1

# Reinicio completo con palabra clave
.\verix-reset.ps1 -Action reset -Keyword "verixreset2025"

# Solo reiniciar navegador
.\verix-reset.ps1 -Action browser

# Solo backup
.\verix-reset.ps1 -Action backup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#>
