# Fase 4: Mapeo OWASP Top 10 y priorización de hallazgos

**Semana 4 - del 19 al 23 de octubre de 2026**

## Objetivo
Mapear las vulnerabilidades de ActiveGym contra el OWASP Top 10 y priorizar los hallazgos de seguridad identificados.

## Sesión 1: Lista de cotejo OWASP
**Jueves 22 de octubre, 09h30 a 11h30**

### Actividad 1: Repaso del OWASP Top 10
Revisión de las 10 vulnerabilidades más críticas según OWASP 2021:

1. **A01: Broken Access Control** - Fallas en control de acceso
2. **A02: Cryptographic Failures** - Fallas criptográficas
3. **A03: Injection** - Inyección (SQL, NoSQL, OS, etc.)
4. **A04: Insecure Design** - Diseño inseguro
5. **A05: Security Misconfiguration** - Configuración incorrecta
6. **A06: Vulnerable and Outdated Components** - Componentes vulnerables
7. **A07: Identification and Authentication Failures** - Fallas de autenticación
8. **A08: Software and Data Integrity Failures** - Fallas de integridad
9. **A09: Security Logging and Monitoring Failures** - Fallas de logging
10. **A10: Server-Side Request Forgery (SSRF)** - SSRF

### Actividad 2: Aplicación de la lista de cotejo
Revisión de ActiveGym contra cada categoría del OWASP Top 10:

Para cada categoría:
- [ ] ¿Aplica a ActiveGym?
- [ ] ¿Hay controles implementados?
- [ ] ¿Se identificaron vulnerabilidades?
- [ ] Nivel de riesgo (Alto/Medio/Bajo)
- [ ] Recomendaciones

### Actividad 3: Registro de evidencias
- Documentar hallazgos por categoría OWASP
- Capturas de evidencias cuando aplique
- Referenciar código específico

## Sesión 2: Priorización y cierre de la guía
**Viernes 23 de octubre, 07h30 a 09h30**

### Actividad 1: Matriz de priorización
Construir matriz de priorización considerando:
- **Severidad**: Impacto potencial (Crítica/Alta/Media/Baja)
- **Probabilidad**: Likelihood de explotación (Alta/Media/Baja)
- **Riesgo**: Severidad × Probabilidad
- **Costo de corrección**: Esfuerzo requerido
- **Prioridad**: Riesgo / Costo

Hallazgos a priorizar (de fases anteriores):
- Fugas de información (Fase 3)
- Vulnerabilidades OWASP identificadas
- Controles faltantes (Fase 2)

### Actividad 2: Preparación del insumo para la guía APE 02
Consolidar todos los hallazgos en un documento unificado:
- Resumen ejecutivo
- Hallazgos por fase
- Matriz de priorización
- Recomendaciones ordenadas por prioridad
- Roadmap de correcciones sugeridas

### Actividad 3: Cierre y socialización
- Presentación de resultados
- Lecciones aprendidas
- Recomendaciones para futuros proyectos

## Entregables
- [ ] Lista de cotejo OWASP Top 10 aplicada
- [ ] Matriz de priorización de hallazgos
- [ ] Documento consolidado para guía APE 02
- [ ] Roadmap de correcciones

## Evidencias
Colocar en la carpeta `evidencias/`:
- Capturas de revisión OWASP
- Evidencias de vulnerabilidades encontradas

## Documentos
Colocar en la carpeta `documentos/`:
- Lista de cotejo OWASP completada
- Matriz de priorización
- Documento consolidado APE 02
- Roadmap de correcciones
