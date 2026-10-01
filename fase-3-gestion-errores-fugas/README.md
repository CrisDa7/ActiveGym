# Fase 3: Gestión de errores y fugas de información

**Semana 3 - del 12 al 16 de octubre de 2026**

## Objetivo
Identificar y corregir fugas de información en los mensajes de error de ActiveGym mediante provocación controlada de errores.

## Sesión 1: Provocación controlada de errores
**Jueves 15 de octubre, 09h30 a 11h30**

### Actividad 1: Marco conceptual (20 minutos)
Explicación sobre información sensible en mensajes de error:
- Qué información NO debe exponerse:
  - Rutas de archivos del servidor
  - Detalles de base de datos (tablas, columnas)
  - Stack traces completos
  - Credenciales o tokens
  - Información de terceros

### Actividad 2: Laboratorio de provocación de errores (80 minutos)
Provocar al menos 5 errores en ActiveGym y registrar la información expuesta:

1. **Credenciales inválidas**
   - Intentar login con usuario inexistente
   - Intentar login con contraseña incorrecta
   - Registrar qué información revela el error

2. **Parámetros alterados**
   - Enviar parámetros inválidos en endpoints
   - Modificar IDs en URLs
   - Enviar datos con tipos incorrectos

3. **Recursos inexistentes**
   - Acceder a endpoints que no existen
   - Solicitar recursos con IDs inválidos
   - Verificar respuesta 404

4. **Formularios incompletos**
   - Enviar formularios sin campos requeridos
   - Enviar datos con formatos inválidos
   - Probar límites de longitud

5. **Subida de archivos fallida** (si aplica)
   - Intentar subir archivos no permitidos
   - Enviar archivos con tamaños excesivos
   - Verificar mensajes de error

**Registro**: Capturas de pantalla de cada error y la información expuesta

### Actividad 3: Sistematización de hallazgos (20 minutos)
- Consolidar las fugas detectadas
- Clasificar por tipo de información expuesta
- Preparar para la sesión de corrección

## Sesión 2: Clasificación y corrección
**Viernes 16 de octubre, 07h30 a 09h30**

### Actividad 1: Buenas prácticas de gestión de errores (15 minutos)
Revisión de prácticas de desarrollo seguro:
- Mensajes genéricos para el usuario
- Logs detallados solo en servidor
- Deshabilitar depuración en producción
- No exponer detalles técnicos al cliente

### Actividad 2: Clasificación y corrección de fugas (85 minutos)
Para cada fuga detectada:

1. **Clasificar severidad**:
   - Crítica: expone credenciales o datos sensibles
   - Alta: expone estructura del sistema
   - Media: expone información técnica
   - Baja: información mínima

2. **Redactar versión corregida del mensaje**:
   - Mensaje genérico para el usuario
   - Información técnica solo en logs

3. **Implementar corrección en el código**:
   - Modificar middleware de errores
   - Actualizar validaciones
   - Mejorar mensajes de respuesta

4. **Documentar el cambio**:
   - Archivo modificado
   - Líneas cambiadas
   - Justificación

### Actividad 3: Informe de la fase (20 minutos)
- Redacción del informe de gestión de errores
- Resumen de fugas encontradas y corregidas
- Carga de evidencias en el repositorio

## Entregables
- [ ] Registro de 5+ errores provocados con capturas
- [ ] Clasificación de severidad de cada fuga
- [ ] Mensajes corregidos para cada caso
- [ ] Código corregido implementado
- [ ] Informe de la fase

## Evidencias
Colocar en la carpeta `evidencias/`:
- Capturas de pantalla de los 5 errores provocados
- Capturas de los mensajes corregidos
- Comparativas antes/después

## Documentos
Colocar en la carpeta `documentos/`:
- Tabla de clasificación de fugas
- Propuesta de mensajes corregidos
- Informe final de la fase
- Documentación de cambios en código
