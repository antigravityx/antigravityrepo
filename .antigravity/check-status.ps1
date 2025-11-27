# AntiGravity System Status Checker
# Firmado por: AntiGravityRichon

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ANTIGRAVITY SYSTEM STATUS" -ForegroundColor Cyan
Write-Host "  Firmado por: AntiGravityRichon" -ForegroundColor Magenta
Write-Host "========================================`n" -ForegroundColor Cyan

# Verificar archivos del sistema
Write-Host "[1] Verificando archivos del sistema..." -ForegroundColor Yellow

$files = @(
    ".antigravity\schedule-monitor.ps1",
    ".antigravity\schedule-monitor.sh",
    ".antigravity\start-monitor.bat",
    ".antigravity\README.md"
)

$allFilesExist = $true
foreach($file in $files) {
    if(Test-Path $file) {
        Write-Host "   [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "   [FALTA] $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

# Verificar procesos en ejecución
Write-Host "`n[2] Verificando procesos de monitoreo..." -ForegroundColor Yellow

$monitorProcesses = Get-Process powershell -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*schedule-monitor*"
}

if($monitorProcesses) {
    Write-Host "   [OK] Monitor en ejecución (PID: $($monitorProcesses.Id -join ', '))" -ForegroundColor Green
} else {
    Write-Host "   [INFO] Monitor no detectado en ejecución" -ForegroundColor Yellow
    Write-Host "   Ejecuta: .antigravity\start-monitor.bat" -ForegroundColor White
}

# Verificar bloque actual
Write-Host "`n[3] Verificando bloque actual..." -ForegroundColor Yellow

$schedule = @(
    @{Name="Sprint Desarrollo"; Start="14:30"; End="16:00"; Type="WORK"},
    @{Name="Break & Revisión"; Start="16:00"; End="16:15"; Type="BREAK"},
    @{Name="Testing & Debugging"; Start="16:15"; End="18:00"; Type="WORK"},
    @{Name="Break & Documentación"; Start="18:00"; End="18:30"; Type="BREAK"},
    @{Name="Deploy Final"; Start="18:30"; End="20:30"; Type="WORK"},
    @{Name="Testing Final"; Start="20:30"; End="21:00"; Type="CELEBRATION"}
)

$now = Get-Date
$currentBlock = $null

foreach($block in $schedule) {
    $startTime = [DateTime]::ParseExact($block.Start, "HH:mm", $null)
    $endTime = [DateTime]::ParseExact($block.End, "HH:mm", $null)
    
    if($now.TimeOfDay -ge $startTime.TimeOfDay -and $now.TimeOfDay -lt $endTime.TimeOfDay) {
        $currentBlock = $block
        break
    }
}

if($currentBlock) {
    Write-Host "   [ACTIVO] $($currentBlock.Name)" -ForegroundColor Green
    Write-Host "   Horario: $($currentBlock.Start) - $($currentBlock.End)" -ForegroundColor White
    Write-Host "   Tipo: $($currentBlock.Type)" -ForegroundColor White
    
    $endTime = [DateTime]::ParseExact($currentBlock.End, "HH:mm", $null)
    $remaining = $endTime.TimeOfDay - $now.TimeOfDay
    $remainingMinutes = [math]::Floor($remaining.TotalMinutes)
    
    Write-Host "   Tiempo restante: $remainingMinutes minutos" -ForegroundColor Cyan
} else {
    Write-Host "   [PAUSA] Fuera de horario de trabajo" -ForegroundColor Gray
    
    # Buscar próximo bloque
    $nextBlock = $null
    foreach($block in $schedule) {
        $startTime = [DateTime]::ParseExact($block.Start, "HH:mm", $null)
        if($now.TimeOfDay -lt $startTime.TimeOfDay) {
            $nextBlock = $block
            break
        }
    }
    
    if($nextBlock) {
        Write-Host "   Próximo bloque: $($nextBlock.Name) a las $($nextBlock.Start)" -ForegroundColor White
    }
}

# Resumen final
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if($allFilesExist) {
    Write-Host "[OK] Todos los archivos presentes" -ForegroundColor Green
} else {
    Write-Host "[ADVERTENCIA] Faltan algunos archivos" -ForegroundColor Yellow
}

if($monitorProcesses) {
    Write-Host "[OK] Sistema de monitoreo activo" -ForegroundColor Green
} else {
    Write-Host "[INFO] Sistema de monitoreo inactivo" -ForegroundColor Yellow
}

if($currentBlock) {
    Write-Host "[OK] En bloque de trabajo: $($currentBlock.Name)" -ForegroundColor Green
} else {
    Write-Host "[INFO] Fuera de horario de trabajo" -ForegroundColor Gray
}

Write-Host "`n========================================`n" -ForegroundColor Cyan

# Opciones rápidas
Write-Host "ACCIONES RAPIDAS:" -ForegroundColor Yellow
Write-Host "  1. Iniciar monitor: .antigravity\start-monitor.bat" -ForegroundColor White
Write-Host "  2. Ver documentación: .antigravity\README.md" -ForegroundColor White
Write-Host "  3. Ver plan del día: (archivo artifact)" -ForegroundColor White
Write-Host ""
