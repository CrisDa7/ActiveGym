# Fase 2: Tríada CIA y matriz de activos y amenazas

**Semana 2 - del 05 al 09 de octubre de 2026**

## Objetivo
Aplicar la tríada CIA para clasificar los activos de información de ActiveGym y construir una matriz de activos y amenazas.

## Sesión 1: Activos de información y clasificación CIA
**Jueves 08 de octubre, 09h30 a 11h30**

### Actividad 1: Repaso aplicado de la tríada CIA
- **Confidencialidad**: Protección contra acceso no autorizado
- **Integridad**: Protección contra modificación no autorizada
- **Disponibilidad**: Garantía de acceso cuando se necesita

Aplicación a ActiveGym:
- Datos de clientes (confidencialidad alta)
- Registros financieros (integridad alta)
- Sistema de autenticación (disponibilidad alta)

### Actividad 2: Construcción de la matriz de activos
Identificación de activos de información en ActiveGym:
- Datos personales de clientes (nombre, apellido, celular)
- Datos financieros (pagos, mensualidades)
- Credenciales de usuarios (contraseñas hasheadas)
- Información de áreas del gimnasio
- Registros de inscripciones

Clasificación según CIA:
- Nivel de criticidad para cada activo
- Impacto si se compromete cada principio

### Actividad 3: Revisión entre pares
- Intercambio de matrices con compañeros
- Validación de clasificaciones
- Retroalimentación sobre activos identificados

## Sesión 2: Controles y priorización
**Viernes 09 de octubre, 07h30 a 09h30**

### Actividad 1: Defensa en profundidad
Análisis de capas de seguridad en ActiveGym:
- Capa de red (CORS, rate limiting)
- Capa de aplicación (autenticación, autorización)
- Capa de datos (validación, consultas parametrizadas)
- Capa de presentación (sanitización de inputs)

### Actividad 2: Propuesta de controles de mitigación
Para cada activo identificado:
- Controles existentes
- Controles faltantes
- Recomendaciones de mejora

### Actividad 3: Informe de la fase
- Consolidación de la matriz de activos
- Documentación de controles propuestos
- Priorización de mejoras

## Entregables
- [ ] Matriz de activos de información clasificados por CIA
- [ ] Análisis de defensa en profundidad
- [ ] Propuesta de controles de mitigación
- [ ] Informe de la fase

## Evidencias
Colocar en la carpeta `evidencias/`:
- Capturas de la matriz de activos
- Diagramas de defensa en profundidad

## Documentos
Colocar en la carpeta `documentos/`:
- Matriz de activos y amenazas
- Análisis de controles existentes
- Propuesta de mitigaciones
