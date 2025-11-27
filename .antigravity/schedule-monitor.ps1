# AntiGravity Schedule Monitor - PowerShell Notification System
# Firmado por: AntiGravityRichon

param(
    [switch]$StartMonitoring
)

# Configuración de horarios (Hora local UTC-3)
$schedule = @(
    @{Name="Sprint Desarrollo"; Start="14:30"; End="16:00"; Type="WORK"},
    @{Name="Break & Revisión"; Start="16:00"; End="16:15"; Type="BREAK"},
    @{Name="Testing & Debugging"; Start="16:15"; End="18:00"; Type="WORK"},
    @{Name="Break & Documentación"; Start="18:00"; End="18:30"; Type="BREAK"},
    @{Name="Deploy Final"; Start="18:30"; End="20:30"; Type="WORK"},
    @{Name="Testing Final"; Start="20:30"; End="21:00"; Type="CELEBRATION"}
)

function Show-Notification {
    param(
        [string]$Title,
        [string]$Message,
        [string]$Type = "Info"
    )
    
    $icon = switch($Type) {
        "Success" { "[SUCCESS]" }
        "Work" { "[WORK]" }
        "Break" { "[BREAK]" }
        "Alert" { "[ALERT]" }
        default { "[INFO]" }
    }
    
    # Notificación de Windows
    Add-Type -AssemblyName System.Windows.Forms
    $notification = New-Object System.Windows.Forms.NotifyIcon
    $notification.Icon = [System.Drawing.SystemIcons]::Information
    $notification.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
    $notification.BalloonTipText = $Message
    $notification.BalloonTipTitle = "$icon AntiGravity - $Title"
    $notification.Visible = $True
    $notification.ShowBalloonTip(10000)
    
    # Log en consola
    Write-Host "`n$icon [$Type] $Title" -ForegroundColor Cyan
    Write-Host "   $Message" -ForegroundColor White
    Write-Host "   Timestamp: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
}

function Get-CurrentBlock {
    $now = Get-Date
    foreach($block in $schedule) {
        $startTime = [DateTime]::ParseExact($block.Start, "HH:mm", $null)
        $endTime = [DateTime]::ParseExact($block.End, "HH:mm", $null)
        
        if($now.TimeOfDay -ge $startTime.TimeOfDay -and $now.TimeOfDay -lt $endTime.TimeOfDay) {
            return $block
        }
    }
    return $null
}

function Start-ScheduleMonitoring {
    Write-Host "[ANTIGRAVITY] Schedule Monitor ACTIVADO" -ForegroundColor Green
    Write-Host "   Firmado por: AntiGravityRichon" -ForegroundColor Magenta
    Write-Host "   Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
    Write-Host "`n[SCHEDULE] Horarios configurados:" -ForegroundColor Yellow
    
    foreach($block in $schedule) {
        Write-Host "   $($block.Start) - $($block.End): $($block.Name) [$($block.Type)]" -ForegroundColor White
    }
    
    Show-Notification -Title "Sistema Iniciado" -Message "Monitor de productividad AntiGravity activo. Vamos con todo!" -Type "Success"
    
    $lastNotifiedBlock = $null
    $blockStartNotified = @{}
    
    while($true) {
        $currentBlock = Get-CurrentBlock
        
        if($currentBlock -ne $null) {
            $blockKey = "$($currentBlock.Start)-$($currentBlock.Name)"
            
            # Notificar inicio de bloque
            if(-not $blockStartNotified.ContainsKey($blockKey)) {
                $notifType = switch($currentBlock.Type) {
                    "WORK" { "Work" }
                    "BREAK" { "Break" }
                    "CELEBRATION" { "Success" }
                    default { "Info" }
                }
                
                Show-Notification -Title "Bloque Iniciado" -Message "$($currentBlock.Name) ($($currentBlock.Start) - $($currentBlock.End))" -Type $notifType
                $blockStartNotified[$blockKey] = $true
            }
            
            # Notificar 5 minutos antes del final
            $now = Get-Date
            $endTime = [DateTime]::ParseExact($currentBlock.End, "HH:mm", $null)
            $timeRemaining = $endTime.TimeOfDay - $now.TimeOfDay
            
            if($timeRemaining.TotalMinutes -le 5 -and $timeRemaining.TotalMinutes -gt 4.5 -and $lastNotifiedBlock -ne $blockKey) {
                Show-Notification -Title "Finalizando Bloque" -Message "$($currentBlock.Name) termina en 5 minutos" -Type "Alert"
                $lastNotifiedBlock = $blockKey
            }
        }
        
        # Verificar cada 30 segundos
        Start-Sleep -Seconds 30
    }
}

# Función de test manual
function Test-Notification {
    Show-Notification -Title "Test de Sistema" -Message "Sistema de notificaciones funcionando correctamente [OK]" -Type "Success"
}

# Ejecución
if($StartMonitoring) {
    Start-ScheduleMonitoring
} else {
    Write-Host "[ANTIGRAVITY] Schedule Monitor" -ForegroundColor Cyan
    Write-Host "   Firmado por: AntiGravityRichon`n" -ForegroundColor Magenta
    Write-Host "Uso:" -ForegroundColor Yellow
    Write-Host "   .\schedule-monitor.ps1 -StartMonitoring    # Iniciar monitoreo" -ForegroundColor White
    Write-Host "   Test-Notification                          # Probar notificación`n" -ForegroundColor White
    
    # Mostrar bloque actual
    $current = Get-CurrentBlock
    if($current) {
        Write-Host "[CURRENT] Bloque Actual:" -ForegroundColor Green
        Write-Host "   $($current.Name) ($($current.Start) - $($current.End))" -ForegroundColor White
    } else {
        Write-Host "[PAUSED] Fuera de horario de trabajo" -ForegroundColor Gray
    }
}
