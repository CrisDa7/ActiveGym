# Ficha del Proyecto - ActiveGym

## Nombre del Proyecto
**ActiveGym** - Sistema de Gestión de Gimnasio

## Función del Sistema
Sistema web para la gestión administrativa de un gimnasio que permite:
- Registro y gestión de clientes inscritos en diferentes áreas del gimnasio
- Control de mensualidades y fechas de vencimiento
- Gestión de usuarios del sistema (administradores y entrenadores)
- Alertas automáticas para mensualidades próximas a vencer
- Envío de mensajes de WhatsApp a clientes
- Reportes y listados por área del gimnasio

## Usuarios del Sistema

### Usuarios Externos (Clientes del Gimnasio)
- **Clientes del gimnasio**: Personas que se inscriben en actividades (Musculación, Jumping, Bailoterapia, Baile moderno)
  - No acceden al sistema directamente
  - Reciben notificaciones vía WhatsApp

### Usuarios Internos (Personal del Gimnasio)
- **Administrador**: Usuario con acceso completo al sistema
- **Entrenador**: Usuario con acceso limitado para registro y consulta

## Roles y Permisos

| Funcionalidad | Administrador | Entrenador |
|---------------|---------------|------------|
| Ver lista de clientes | ✅ | ✅ |
| Registrar nuevos clientes | ✅ | ✅ |
| Editar clientes | ✅ | ❌ |
| Eliminar clientes | ✅ | ❌ |
| Ver alertas de vencimiento | ✅ | ✅ |
| Enviar mensajes WhatsApp | ✅ | ✅ |
| Crear usuarios del sistema | ✅ | ❌ |
| Desactivar usuarios | ✅ | ❌ |
| Ver reportes por área | ✅ | ✅ |

## Tecnologías Empleadas

### Backend
- **Runtime**: Node.js (>=18)
- **Framework**: Express.js 4.19.2
- **Base de Datos**: PostgreSQL (>=14)
- **Autenticación**: JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
- **Validación**: Zod 3.23.8
- **Seguridad**: 
  - Helmet 7.1.0 (cabeceras de seguridad)
  - CORS 2.8.5 (control de origen)
  - express-rate-limit 7.4.0 (límite de peticiones)
  - cookie-parser 1.4.6 (sesiones httpOnly)
- **Utilidades**: 
  - date-fns 3.6.0 (manejo de fechas)
  - dotenv 16.4.5 (variables de entorno)
- **Arquitectura**: MVC (Model-View-Controller)

### Frontend
- **Framework**: React 18.3.1
- **Enrutamiento**: React Router DOM 6.26.2
- **Cliente HTTP**: Axios 1.7.7
- **Bundler**: Vite 5.4.8
- **Estilos**: 
  - TailwindCSS 3.4.13
  - PostCSS 8.4.47
  - Autoprefixer 10.4.20
- **Gestión de Estado**: Context API de React

### Base de Datos
- **Motor**: PostgreSQL
- **Esquema relacional** con tablas:
  - `usuarios` (login del sistema)
  - `areas` (actividades del gimnasio)
  - `inscripciones` (clientes y mensualidades)
- **Tipos ENUM personalizados**: `rol_usuario`, `modo_pago`

### Herramientas de Desarrollo
- **Control de versiones**: Git
- **Gestor de paquetes**: npm
- **Entorno de desarrollo**: VS Code

## Características Técnicas Destacadas
- Arquitectura cliente-servidor REST API
- Autenticación basada en tokens JWT con cookies httpOnly
- Validación de datos en backend y frontend
- Consultas SQL parametrizadas (prevención SQL injection)
- Diseño responsivo (mobile-first)
- Tema oscuro con acentos rojos (branding del gimnasio)
- Alertas visuales para vencimientos de mensualidades
- Integración con WhatsApp mediante enlaces `wa.me`

## Requisitos de Despliegue
- **Backend**: Node.js 18+, PostgreSQL 14+
- **Frontend**: Servidor web estático (Vercel, Netlify, o servidor nginx)
- **Base de datos**: PostgreSQL en la nube (Supabase, Railway, Render)
