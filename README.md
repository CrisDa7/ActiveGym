# ActiveGym 🏋️

Sistema para registrar clientes y mensualidades del gimnasio Active Gym
(Musculación, Jumping, Bailoterapia y Baile moderno).

Este proyecto es parte del **Componente Práctico Experimental (APE)** de seguridad,
donde se realiza un análisis de seguridad estructurado en 4 fases.

## Estructura del Proyecto

### Código Fuente
- **frontend/** → React + Vite + Tailwind (tema oscuro, rojo del logo)
- **backend/** → Node.js + Express + PostgreSQL, arquitectura MVC

### Fases del Análisis de Seguridad
- **fase-1-encuadre-seleccion-aplicacion/** - Encuadre y selección de la aplicación objetivo
- **fase-2-triada-cia-matrix-activos/** - Tríada CIA y matriz de activos y amenazas
- **fase-3-gestion-errores-fugas/** - Gestión de errores y fugas de información
- **fase-4-mapeo-owasp-priorizacion/** - Mapeo OWASP Top 10 y priorización

### Documentación General
- **FICHA_PROYECTO.md** - Ficha completa del proyecto (nombre, función, usuarios, roles, tecnologías)
- **FASES.md** - Índice detallado de las 4 fases del componente APE

## Requisitos
- Node.js 18 o superior
- PostgreSQL 14 o superior

## Ejecutar en local

### 1. Crear la base de datos
```bash
psql -U postgres -c "CREATE DATABASE activegym;"
```

### 2. Backend
```bash
cd backend
npm install
```
Abre `backend/.env` y cambia **DATABASE_URL** con tu usuario y contraseña de PostgreSQL
(`postgresql://USUARIO:CLAVE@localhost:5432/activegym`). Luego:
```bash
npm run db:setup   # crea tablas, las 4 áreas y el primer administrador
npm run dev        # API en http://localhost:4000
```

### 3. Frontend (otra terminal)
```bash
cd frontend
npm install
npm run dev        # App en http://localhost:5173
```

Entra a http://localhost:5173 con el correo y la contraseña del administrador definidos en `backend/.env` (`ADMIN_*`).

## Roles
| Acción | Administrador | Entrenador |
|---|:-:|:-:|
| Ver y registrar clientes | ✅ | ✅ |
| Enviar WhatsApp | ✅ | ✅ |
| Editar / eliminar clientes | ✅ | ❌ |
| Crear y desactivar usuarios | ✅ | ❌ |

## Alertas y WhatsApp
- Un panel rojo en la pantalla principal lista las mensualidades que vencen en `ALERT_DAYS_BEFORE` días o menos (por defecto 2) y las vencidas recientes.
- WhatsApp usa enlaces `wa.me`: se abre WhatsApp con el mensaje listo y solo presionas enviar.

## Seguridad aplicada
Contraseñas con bcrypt · sesión en cookie httpOnly (JWT) · roles verificados en el servidor · validación con Zod · consultas parametrizadas · Helmet · CORS restringido · límite de intentos de login · errores sin detalles internos.

## Antes de desplegar
1. Cambia `JWT_SECRET` por uno largo y aleatorio.
2. Cambia la contraseña del administrador y no subas `.env` a GitHub (ya está en `.gitignore`).
3. `NODE_ENV=production`, `CLIENT_ORIGIN` = URL real del frontend, `DB_SSL=true` si tu hosting lo pide.
4. En el frontend crea `.env` con `VITE_API_URL=https://tu-backend/api` y ejecuta `npm run build`.
5. Si frontend y backend están en dominios distintos: `COOKIE_SAMESITE=none` (requiere HTTPS).
