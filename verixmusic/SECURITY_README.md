# VerixMusic Security System - README

**Firmado por:** VerixRichon Software Factory  
**Fecha:** 25 de Noviembre 2025

---

## 🛡️ Sistema de Seguridad

### Componentes:

1. **Certificado AntiGravity AI** (`SECURITY_CERTIFICATE.txt`)
2. **Base de Datos GitHub** (`database/db.json`)
3. **Microservicio de Seguridad** (`api/security.js`)
4. **Página de Descarga Segura** (`download.html`)

---

## 🚀 Setup

### 1. Crear Repo en GitHub

```bash
# Crear repo: verixmusic-db (puede ser privado)
# Subir database/db.json
```

### 2. Deploy Microservicio

**Opción A: Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd verixmusic/api
vercel --prod

# Copiar URL: https://tu-proyecto.vercel.app
```

**Opción B: Netlify**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
cd verixmusic/api
netlify deploy --prod

# Copiar URL
```

### 3. Configurar URLs

Editar `download.html`:
```javascript
const API_URL = 'https://TU_VERCEL_URL/api/security';
```

Editar `api/security.js`:
```javascript
const dbUrl = 'https://raw.githubusercontent.com/TU_USER/verixmusic-db/main/db.json';
```

---

## 🔐 Cómo Funciona

### Flujo de Descarga:

1. Usuario visita `download.html`
2. Página llama a microservicio: `/api/security?action=verify`
3. Microservicio consulta `db.json` en GitHub
4. Verifica último scan de seguridad (< 30 días)
5. Si está limpio, habilita descarga
6. Usuario descarga instalador
7. Microservicio trackea descarga anónimamente

### Verificación de Seguridad:

- ✅ Scan debe ser reciente (< 30 días)
- ✅ Estado debe ser "CLEAN"
- ✅ Certificado válido
- ✅ Firmado por AntiGravity AI

---

## 📊 Base de Datos

### Estructura `db.json`:

```json
{
  "security_scans": [
    {
      "scan_id": "VRX-SCAN-001",
      "timestamp": "2025-11-25T15:43:21-03:00",
      "status": "CLEAN",
      "scanned_by": "AntiGravity AI"
    }
  ],
  "downloads": [
    {
      "id": "DL-123456",
      "timestamp": "2025-11-25T16:00:00-03:00",
      "platform": "windows",
      "country": "AR"
    }
  ]
}
```

### Actualizar Scan:

Cada mes, agregar nuevo scan a `security_scans`:

```json
{
  "scan_id": "VRX-SCAN-002",
  "timestamp": "2025-12-25T15:43:21-03:00",
  "status": "CLEAN",
  "scanned_by": "AntiGravity AI",
  "certificate_id": "VRX-SEC-VERIXMUSIC-20251225-154321"
}
```

---

## 🌐 Endpoints del Microservicio

### Verificar Seguridad:
```
GET /api/security?action=verify&platform=windows&version=2.0.0
```

**Response:**
```json
{
  "verified": true,
  "scan": {
    "id": "VRX-SCAN-001",
    "status": "CLEAN",
    "scanned_by": "AntiGravity AI"
  },
  "download_safe": true,
  "message": "Instalador verificado por AntiGravity AI"
}
```

### Trackear Descarga:
```
GET /api/security?action=download&platform=windows&country=AR
```

### Obtener Último Scan:
```
GET /api/security?action=scan
```

---

## 🔒 Privacidad

- ✅ Sin datos personales
- ✅ IPs hasheadas (anónimas)
- ✅ Solo estadísticas agregadas
- ✅ Sin tracking de terceros
- ✅ Datos en GitHub (controlados por ti)

---

## 💰 Costos

**TODO GRATIS:**
- GitHub: Ilimitado (repos públicos)
- Vercel: 100GB/mes bandwidth
- Netlify: 100GB/mes bandwidth
- ipapi.co: 30,000 requests/mes

**Total: $0/mes** 🎉

---

## 📝 Mantenimiento

### Mensual:

1. Ejecutar scan de seguridad (manual o automático)
2. Actualizar `db.json` con nuevo scan
3. Commit y push a GitHub
4. Verificar que microservicio funciona

### Anual:

1. Renovar certificado AntiGravity AI
2. Actualizar versión del software
3. Revisar estadísticas de descargas

---

## 🛠️ Troubleshooting

**Problema:** Verificación falla

**Solución:**
1. Verificar que `db.json` esté en GitHub
2. Verificar URL en `security.js`
3. Verificar que scan sea reciente

**Problema:** Microservicio no responde

**Solución:**
1. Verificar deploy en Vercel/Netlify
2. Verificar logs de errores
3. Verificar CORS headers

---

## 📜 Certificado

El certificado `SECURITY_CERTIFICATE.txt` debe:
- Incluirse en el instalador
- Mostrarse durante instalación
- Estar disponible en la web
- Actualizarse anualmente

---

**VerixRichon Software Factory**  
**Seguridad garantizada por AntiGravity AI** 🛡️
