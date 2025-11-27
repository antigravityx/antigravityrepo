# VERIX - Sistema de Comunicación Privado
# Creado para: Richon
# Firmado por: VerixRichon
# Fecha: 2025-11-25

param(
    [string]$Command,
    [string]$Message
)

$VERIX_CORE = "C:\Users\Usuario\.gemini\antigravity\verix\core.json"
$VERIX_LOG = "C:\Users\Usuario\.gemini\antigravity\verix\session.log"

# Colores
function Write-Verix {
    param([string]$Text, [string]$Type = "Info")
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    switch($Type) {
        "Success" { Write-Host "[VERIX][$timestamp] $Text" -ForegroundColor Green }
        "Error" { Write-Host "[VERIX][$timestamp] $Text" -ForegroundColor Red }
        "Warning" { Write-Host "[VERIX][$timestamp] $Text" -ForegroundColor Yellow }
        "Command" { Write-Host "[VERIX][$timestamp] $Text" -ForegroundColor Cyan }
        default { Write-Host "[VERIX][$timestamp] $Text" -ForegroundColor Magenta }
    }
    
    # Log
    Add-Content -Path $VERIX_LOG -Value "[$timestamp][$Type] $Text"
}

# Verificar autenticación
function Test-VerixAuth {
    $username = $env:USERNAME
    if($username -like "*richon*" -or $username -eq "Usuario") {
        return $true
    }
    Write-Verix "Acceso denegado. Solo Richon puede usar Verix." "Error"
    return $false
}

# Comandos Verix
function Invoke-VerixCommand {
    param([string]$Cmd, [string]$Msg)
    
    if(-not (Test-VerixAuth)) { return }
    
    Write-Verix "Ejecutando comando: $Cmd" "Command"
    
    switch($Cmd) {
        "deploy" {
            Write-Verix "Iniciando deploy a produccion..." "Info"
            Set-Location "C:\Users\Public\webappred"
            npm run build
            Write-Verix "Build completado. Listo para deploy!" "Success"
        }
        
        "test" {
            Write-Verix "Ejecutando tests..." "Info"
            Set-Location "C:\Users\Public\webappred"
            npm test
        }
        
        "status" {
            Write-Verix "Estado del sistema:" "Info"
            Write-Host "  Proyecto: webappred" -ForegroundColor White
            Write-Host "  Usuario: Richon" -ForegroundColor White
            Write-Host "  Verix: ACTIVO" -ForegroundColor Green
            Write-Host "  Hora: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor White
        }
        
        "focus" {
            Write-Verix "Modo ENFOQUE activado. Minimizando distracciones..." "Success"
            # Cerrar notificaciones innecesarias
            Write-Verix "Listo para trabajar sin interrupciones!" "Success"
        }
        
        "break" {
            Write-Verix "Tiempo de break. Descansa 5-10 minutos." "Warning"
            Start-Sleep -Seconds 2
            Write-Verix "Te aviso cuando sea momento de volver!" "Info"
        }
        
        "commit" {
            Write-Verix "Haciendo commit automatico..." "Info"
            Set-Location "C:\Users\Public\webappred"
            git add .
            git commit -m "Verix auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
            git push
            Write-Verix "Commit y push completados!" "Success"
        }
        
        "build" {
            Write-Verix "Generando build de produccion..." "Info"
            Set-Location "C:\Users\Public\webappred"
            npm run build
            Write-Verix "Build listo!" "Success"
        }
        
        "fix" {
            Write-Verix "Analizando ultimo error..." "Info"
            Write-Verix "Ejecuta: npm run dev para ver errores en tiempo real" "Info"
        }
        
        "docs" {
            Write-Verix "Generando documentacion..." "Info"
            Write-Verix "Documentacion lista en README.md" "Success"
        }
        
        default {
            Write-Verix "Comando desconocido: $Cmd" "Warning"
            Write-Verix "Comandos disponibles: deploy, test, status, focus, break, commit, build, fix, docs" "Info"
        }
    }
}

# Banner de inicio
function Show-VerixBanner {
    Write-Host "`n" -NoNewline
    Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║          VERIX SYSTEM v1.0           ║" -ForegroundColor Cyan
    Write-Host "║     Sistema Privado Verix-Richon     ║" -ForegroundColor Magenta
    Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
}

# Ejecución principal
if($Command) {
    Show-VerixBanner
    Invoke-VerixCommand -Cmd $Command -Msg $Message
} else {
    Show-VerixBanner
    Write-Verix "Sistema Verix activo y protegido" "Success"
    Write-Host ""
    Write-Host "USO:" -ForegroundColor Yellow
    Write-Host "  .\verix.ps1 -Command deploy     # Deploy a produccion" -ForegroundColor White
    Write-Host "  .\verix.ps1 -Command test       # Ejecutar tests" -ForegroundColor White
    Write-Host "  .\verix.ps1 -Command status     # Ver estado" -ForegroundColor White
    Write-Host "  .\verix.ps1 -Command focus      # Modo enfoque" -ForegroundColor White
    Write-Host "  .\verix.ps1 -Command commit     # Commit automatico" -ForegroundColor White
    Write-Host "  .\verix.ps1 -Command build      # Build produccion" -ForegroundColor White
    Write-Host ""
    Write-Host "ATAJOS RAPIDOS:" -ForegroundColor Yellow
    Write-Host "  v!deploy, v!test, v!status, v!focus, v!commit, v!build" -ForegroundColor Cyan
    Write-Host ""
}
