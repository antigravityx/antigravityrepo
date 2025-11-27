#!/bin/bash
# AntiGravity Schedule Monitor - Bash Version
# Firmado por: AntiGravityRichon

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Configuración de horarios
declare -A SCHEDULE=(
    ["14:30"]="Sprint Desarrollo|16:00|WORK"
    ["16:00"]="Break & Revisión|16:15|BREAK"
    ["16:15"]="Testing & Debugging|18:00|WORK"
    ["18:00"]="Break & Documentación|18:30|BREAK"
    ["18:30"]="Deploy Final|20:30|WORK"
    ["20:30"]="Testing Final|21:00|CELEBRATION"
)

# Función para mostrar notificaciones
show_notification() {
    local title="$1"
    local message="$2"
    local type="$3"
    
    local icon=""
    case "$type" in
        "Success") icon="[SUCCESS]" ;;
        "Work") icon="[WORK]" ;;
        "Break") icon="[BREAK]" ;;
        "Alert") icon="[ALERT]" ;;
        *) icon="[INFO]" ;;
    esac
    
    echo -e "${CYAN}$icon ${BLUE}$title${NC}"
    echo -e "   $message"
    echo -e "   ${MAGENTA}Timestamp: $(date '+%H:%M:%S')${NC}"
    echo ""
    
    # Intentar notificación del sistema (si está disponible)
    if command -v notify-send &> /dev/null; then
        notify-send "AntiGravity - $title" "$message"
    elif command -v osascript &> /dev/null; then
        # macOS
        osascript -e "display notification \"$message\" with title \"AntiGravity - $title\""
    fi
}

# Función para obtener el bloque actual
get_current_block() {
    local current_time=$(date '+%H:%M')
    local current_seconds=$(date -d "$current_time" +%s 2>/dev/null || date -j -f "%H:%M" "$current_time" +%s 2>/dev/null)
    
    for start_time in "${!SCHEDULE[@]}"; do
        IFS='|' read -r name end_time type <<< "${SCHEDULE[$start_time]}"
        
        local start_seconds=$(date -d "$start_time" +%s 2>/dev/null || date -j -f "%H:%M" "$start_time" +%s 2>/dev/null)
        local end_seconds=$(date -d "$end_time" +%s 2>/dev/null || date -j -f "%H:%M" "$end_time" +%s 2>/dev/null)
        
        if [ "$current_seconds" -ge "$start_seconds" ] && [ "$current_seconds" -lt "$end_seconds" ]; then
            echo "$name|$start_time|$end_time|$type"
            return 0
        fi
    done
    
    return 1
}

# Función principal de monitoreo
start_monitoring() {
    echo -e "${GREEN}[ANTIGRAVITY] Schedule Monitor ACTIVADO${NC}"
    echo -e "${MAGENTA}   Firmado por: AntiGravityRichon${NC}"
    echo -e "   Fecha: $(date '+%Y-%m-%d %H:%M:%S')"
    echo ""
    echo -e "${YELLOW}[SCHEDULE] Horarios configurados:${NC}"
    
    for start_time in $(echo "${!SCHEDULE[@]}" | tr ' ' '\n' | sort); do
        IFS='|' read -r name end_time type <<< "${SCHEDULE[$start_time]}"
        echo "   $start_time - $end_time: $name [$type]"
    done
    echo ""
    
    show_notification "Sistema Iniciado" "Monitor de productividad AntiGravity activo. Vamos con todo!" "Success"
    
    declare -A notified_blocks
    local last_alert=""
    
    while true; do
        if current_block=$(get_current_block); then
            IFS='|' read -r name start_time end_time type <<< "$current_block"
            block_key="${start_time}-${name}"
            
            # Notificar inicio de bloque
            if [ -z "${notified_blocks[$block_key]}" ]; then
                local notif_type="Info"
                case "$type" in
                    "WORK") notif_type="Work" ;;
                    "BREAK") notif_type="Break" ;;
                    "CELEBRATION") notif_type="Success" ;;
                esac
                
                show_notification "Bloque Iniciado" "$name ($start_time - $end_time)" "$notif_type"
                notified_blocks[$block_key]=1
            fi
            
            # Calcular tiempo restante
            local current_seconds=$(date +%s)
            local end_seconds=$(date -d "$end_time" +%s 2>/dev/null || date -j -f "%H:%M" "$end_time" +%s 2>/dev/null)
            local remaining=$((end_seconds - current_seconds))
            local remaining_minutes=$((remaining / 60))
            
            # Notificar 5 minutos antes del final
            if [ "$remaining_minutes" -le 5 ] && [ "$remaining_minutes" -gt 4 ] && [ "$last_alert" != "$block_key" ]; then
                show_notification "Finalizando Bloque" "$name termina en 5 minutos" "Alert"
                last_alert="$block_key"
            fi
        fi
        
        # Verificar cada 30 segundos
        sleep 30
    done
}

# Función de test
test_notification() {
    show_notification "Test de Sistema" "Sistema de notificaciones funcionando correctamente [OK]" "Success"
}

# Ejecución principal
if [ "$1" == "--start" ]; then
    start_monitoring
elif [ "$1" == "--test" ]; then
    test_notification
else
    echo -e "${CYAN}[ANTIGRAVITY] Schedule Monitor${NC}"
    echo -e "${MAGENTA}   Firmado por: AntiGravityRichon${NC}"
    echo ""
    echo -e "${YELLOW}Uso:${NC}"
    echo "   ./schedule-monitor.sh --start    # Iniciar monitoreo"
    echo "   ./schedule-monitor.sh --test     # Probar notificación"
    echo ""
    
    # Mostrar bloque actual
    if current_block=$(get_current_block); then
        IFS='|' read -r name start_time end_time type <<< "$current_block"
        echo -e "${GREEN}[CURRENT] Bloque Actual:${NC}"
        echo "   $name ($start_time - $end_time)"
    else
        echo -e "${YELLOW}[PAUSED] Fuera de horario de trabajo${NC}"
    fi
fi
