# 🚀 AntiGravity Schedule Monitor

**Firmado por:** AntiGravityRichon  
**Fecha:** 25 de Noviembre 2025

---

## 📋 Descripción

Sistema de notificaciones automático para monitorear y optimizar la productividad durante sesiones de programación. Envía notificaciones de Windows en segundo plano para mantener el enfoque y cumplir con los horarios establecidos.

---

## ⚡ Inicio Rápido

### Opción 1: Ejecutar con Batch (Más Fácil)
```bash
# Doble clic en el archivo o ejecutar desde terminal:
.antigravity\start-monitor.bat
```

### Opción 2: Ejecutar con PowerShell
```powershell
# Iniciar monitoreo
powershell.exe -ExecutionPolicy Bypass -File .antigravity\schedule-monitor.ps1 -StartMonitoring

# Ver estado actual sin iniciar monitoreo
powershell.exe -ExecutionPolicy Bypass -File .antigravity\schedule-monitor.ps1
```

### Opción 3: Ejecutar en Segundo Plano (Minimizado)
```powershell
Start-Process powershell.exe -ArgumentList "-ExecutionPolicy Bypass -NoExit -File .antigravity\schedule-monitor.ps1 -StartMonitoring" -WindowStyle Minimized
```

---

## 📅 Horarios Configurados

| Horario | Bloque | Tipo |
|---------|--------|------|
| 14:30 - 16:00 | Sprint de Desarrollo Intensivo | WORK |
| 16:00 - 16:15 | Break & Revisión | BREAK |
| 16:15 - 18:00 | Testing & Debugging | WORK |
| 18:00 - 18:30 | Break & Documentación | BREAK |
| 18:30 - 20:30 | Implementación Final & Deploy | WORK |
| 20:30 - 21:00 | Testing Final & Celebración | CELEBRATION |

---

## 🔔 Notificaciones

El sistema enviará notificaciones automáticas de Windows para:

- ✅ **Inicio de cada bloque** - Te avisa cuando comienza un nuevo bloque de trabajo
- ⚡ **5 minutos antes del final** - Alerta para preparar el cierre del bloque
- 🎉 **Celebración de logros** - Reconoce cuando completas bloques exitosamente

---

## 📊 Funcionalidades

1. **Monitoreo Continuo**: Verifica cada 30 segundos el bloque actual
2. **Notificaciones Windows**: Usa el sistema nativo de notificaciones
3. **Logs en Consola**: Muestra información detallada en tiempo real
4. **Estado Actual**: Muestra qué bloque está activo en este momento
5. **Alertas Tempranas**: Aviso 5 minutos antes de finalizar cada bloque

---

## 🛠️ Archivos del Sistema

```
.antigravity/
├── schedule-monitor.ps1    # Script principal de monitoreo
├── start-monitor.bat        # Launcher rápido
└── README.md               # Este archivo
```

---

## 🎯 Personalización

Para modificar los horarios, edita el array `$schedule` en `schedule-monitor.ps1`:

```powershell
$schedule = @(
    @{Name="Tu Bloque"; Start="HH:MM"; End="HH:MM"; Type="WORK"},
    # Agregar más bloques aquí...
)
```

**Tipos disponibles:**
- `WORK` - Bloques de trabajo intensivo
- `BREAK` - Descansos
- `CELEBRATION` - Bloques de celebración/cierre

---

## 💡 Tips de Uso

1. **Ejecutar al inicio del día**: Inicia el monitor cuando comiences tu jornada
2. **Minimizar ventana**: Usa la opción de segundo plano para no distraerte
3. **Respetar notificaciones**: Cuando recibas una alerta, tómala en serio
4. **Actualizar progreso**: Marca los checkboxes en `productive_schedule.md`
5. **Celebrar logros**: No olvides reconocer cada bloque completado

---

## 🔧 Solución de Problemas

### Las notificaciones no aparecen
- Verifica que las notificaciones de Windows estén habilitadas
- Ejecuta como Administrador si es necesario
- Revisa el Centro de Actividades de Windows

### El script no se ejecuta
- Asegúrate de usar `-ExecutionPolicy Bypass`
- Verifica que PowerShell esté actualizado
- Comprueba que los archivos no estén bloqueados

### Horarios incorrectos
- Verifica la hora del sistema
- Ajusta los horarios en el script según tu zona horaria

---

## 📈 Métricas de Éxito

Al final del día, revisa:
- ✅ Bloques completados vs. planificados
- ⏱️ Tiempo efectivo de trabajo
- 🎯 Objetivos alcanzados
- 📝 Documentación actualizada

---

## 🤝 Soporte

Si encuentras problemas o tienes sugerencias:
1. Revisa los logs en la consola de PowerShell
2. Verifica la configuración de horarios
3. Ajusta según tus necesidades específicas

---

**¡Vamos con todo! 💪🔥**

> "Hoy es un gran día para construir algo increíble"  
> — AntiGravityRichon

---

## 📜 Licencia

Sistema creado por AntiGravityRichon para optimizar la productividad en desarrollo de software.
