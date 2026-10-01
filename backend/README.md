# ActiveGym — Backend (API)

Express + PostgreSQL con arquitectura **MVC**:

```
src/
├── config/        Variables de entorno y pool de PostgreSQL (Singleton)
├── models/        Acceso a datos (patrón Repository) — solo SQL
├── services/      Reglas de negocio (fecha fin, alertas, WhatsApp, login)
├── controllers/   Reciben la petición y responden (sin lógica de negocio)
├── routes/        Endpoints + permisos por rol
├── middlewares/   auth (JWT/roles), validate (Zod), errorHandler
├── validators/    Esquemas de validación
└── scripts/       migrate (crea tablas) y seedAdmin (primer admin)
```
