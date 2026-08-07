# OPMX PRODUCT ROADMAP v1.0

## Estrategia de evolución del producto y del ecosistema OPMX

**Organización:** OPMX\
**Dominio principal:** opmx.com.mx\
**Versión:** 1.0\
**Horizonte:** 2026--2030\
**Fecha:** 6 de agosto de 2026\
**Documento rector superior:** `OPMX_VISION_2030.md`\
**Tipo:** Roadmap estratégico de producto

------------------------------------------------------------------------

# 0. PROPÓSITO

Este documento convierte `OPMX_VISION_2030.md` en una secuencia concreta
de productos, capacidades, prioridades, dependencias y criterios de
avance.

`OPMX_VISION_2030.md` define el destino.

`OPMX_PRODUCT_ROADMAP_v1.0.md` define el camino.

`OPMX_MASTER_SPEC` define los requisitos.

`BLUEPRINT` define la arquitectura técnica vigente.

Los planes `PHASE_*` definen la ejecución inmediata.

Este roadmap no es un calendario rígido. Ninguna fecha justifica
construir una capacidad que no esté lista metodológica, jurídica,
operativa o técnicamente.

------------------------------------------------------------------------

# 1. OBJETIVO DE PRODUCTO

Construir OPMX progresivamente como una organización y plataforma capaz
de:

1.  publicar investigación de opinión pública con alta claridad y
    transparencia;
2.  producir estudios mediante procesos metodológicamente controlados;
3.  digitalizar y auditar el trabajo de campo;
4.  preservar resultados y metodología como archivo histórico;
5.  distribuir datos públicos de forma reutilizable;
6.  facilitar comparación, análisis y citación;
7.  convertirse en fuente primaria relevante para ciudadanos, medios,
    academia e instituciones;
8.  facilitar que buscadores y sistemas de IA comprendan y atribuyan
    correctamente los estudios públicos de OPMX.

------------------------------------------------------------------------

# 2. PRINCIPIO DE PRIORIZACIÓN

El orden de construcción será:

**Credibilidad → Publicación → Operación → Auditoría → Datos →
Distribución → Inteligencia → Escala.**

OPMX no debe invertir el orden intentando construir inteligencia
artificial, predicción o infraestructura compleja antes de tener
investigación confiable, datos estructurados y procesos auditables.

------------------------------------------------------------------------

# 3. REGLAS DEL ROADMAP

Toda iniciativa debe cumplir:

-   alineación con `OPMX_VISION_2030.md`;
-   problema real identificado;
-   responsable definido;
-   criterios de aceptación;
-   mantenimiento sostenible;
-   protección de privacidad;
-   revisión jurídica cuando corresponda;
-   métricas de éxito;
-   capacidad de rollback o corrección;
-   documentación.

Regla operativa:

> **No se avanza de etapa porque "toca"; se avanza cuando se cumplen las
> condiciones de entrada de la siguiente etapa.**

------------------------------------------------------------------------

# 4. ARQUITECTURA DEL PORTAFOLIO

El ecosistema se organiza en diez líneas:

1.  **OPMX PORTAL** --- publicación y descubrimiento.
2.  **OPMX RESEARCH** --- metodología y producción de estudios.
3.  **OPMX FIELD** --- levantamiento digital.
4.  **OPMX AUDIT** --- calidad, trazabilidad y supervisión.
5.  **OPMX DATA** --- preservación y distribución de datos.
6.  **OPMX POLL TRACKER** --- series y comparación.
7.  **OPMX API** --- interoperabilidad.
8.  **OPMX PRESS / ACADEMIA** --- reutilización profesional y académica.
9.  **OPMX LAB / INSIGHTS** --- investigación y análisis.
10. **OPMX AI** --- interfaces inteligentes sobre evidencia existente.

------------------------------------------------------------------------

# 5. NIVELES DE MADUREZ

Cada producto puede encontrarse en uno de cinco niveles.

## M0 --- Concepto

Existe definición, pero no producto operativo.

## M1 --- Prototipo

Permite validar UX, arquitectura o flujo sin operación real.

## M2 --- MVP

Resuelve el problema principal con usuarios reales y controles mínimos
adecuados.

## M3 --- Operación

Cuenta con procesos, observabilidad, seguridad, documentación y soporte.

## M4 --- Escala

Puede crecer en volumen, cobertura y usuarios sin degradar sus garantías
fundamentales.

No debe describirse un prototipo como plataforma productiva.

------------------------------------------------------------------------

# 6. HORIZONTE 2026 --- FUNDACIÓN

## Objetivo

**Construir credibilidad antes de escala.**

El resultado esperado de 2026 es que OPMX pueda publicar estudios reales
de forma profesional, transparente, citable y técnicamente sólida.

------------------------------------------------------------------------

# 7. RELEASE 1.0 --- PORTAL FUNDACIONAL

**Producto principal:** OPMX PORTAL\
**Madurez objetivo:** M2

## Alcance

-   identidad visual;
-   home;
-   sobre OPMX;
-   transparencia;
-   metodología;
-   glosario;
-   navegación;
-   responsive;
-   accesibilidad;
-   SEO técnico;
-   arquitectura de URLs;
-   staging;
-   CI;
-   pruebas;
-   seguridad básica;
-   documentación.

## Estado actual

La implementación local de la Fase 1 cubre gran parte de esta base. El
despliegue y validación de staging debe cerrarse antes de considerar
completamente verificado el release técnico inicial.

## Criterios de salida

-   staging verificable;
-   build reproducible;
-   pruebas automatizadas;
-   accesibilidad;
-   Core Web Vitals adecuados;
-   robots/sitemap correctos;
-   cero datos personales reales;
-   documentación actualizada.

------------------------------------------------------------------------

# 8. RELEASE 1.1 --- SISTEMA DE ESTUDIOS

**Producto:** OPMX PORTAL + OPMX RESEARCH\
**Madurez objetivo:** M2

## Objetivo

Pasar de páginas institucionales a un sistema capaz de representar un
estudio real.

## Capacidades

-   entidad `Study`;
-   ficha técnica;
-   fechas de levantamiento/publicación;
-   población;
-   cobertura;
-   muestra;
-   técnica;
-   marco muestral;
-   diseño;
-   ponderación;
-   margen de error;
-   patrocinador;
-   responsable;
-   metodología;
-   cuestionario;
-   resultados;
-   notas;
-   limitaciones;
-   versión;
-   correcciones;
-   URL canónica.

## Requisito crítico

No publicar un estudio real hasta que el modelo metodológico y editorial
esté aprobado.

## Criterios de salida

Un estudio completo puede representarse sin información inventada y con
su contexto metodológico intacto.

------------------------------------------------------------------------

# 9. RELEASE 1.2 --- CMS EDITORIAL CONTROLADO

**Producto:** OPMX PORTAL\
**Madurez objetivo:** M2/M3

## Objetivo

Permitir publicar y corregir estudios sin editar código.

## Capacidades

-   usuarios administrativos;
-   roles básicos;
-   borrador;
-   revisión;
-   publicación;
-   programación;
-   versionado;
-   correcciones;
-   auditoría editorial;
-   previsualización;
-   assets.

## Flujo mínimo

**Borrador → Revisión → Aprobado → Publicado → Corregido/Archivado**

## Regla

Una corrección relevante no reemplaza silenciosamente la versión
anterior.

------------------------------------------------------------------------

# 10. RELEASE 1.3 --- PRIMER ESTUDIO OPMX NATIVO

**Producto:** OPMX RESEARCH + PORTAL

## Objetivo

Publicar el primer estudio producido bajo estándares OPMX.

## Antes de publicar

Debe existir:

-   metodología aprobada;
-   cuestionario;
-   responsable metodológico;
-   protocolo de campo;
-   política de privacidad;
-   revisión jurídica aplicable;
-   procesamiento documentado;
-   control de calidad;
-   ficha técnica;
-   patrocinio declarado cuando corresponda;
-   revisión editorial.

## Entregables públicos

-   página del estudio;
-   ficha técnica;
-   resultados;
-   metodología;
-   fecha;
-   gráficas;
-   descarga del informe cuando proceda;
-   formato de citación;
-   changelog.

Este release representa el paso de "plataforma en construcción" a
"fuente primaria de investigación propia".

------------------------------------------------------------------------

# 11. RELEASE 1.4 --- SEO, CITABILIDAD Y AI DISCOVERY

**Producto:** OPMX PORTAL

## Objetivo

Maximizar la capacidad de descubrir, comprender y citar correctamente
estudios reales.

## Capacidades

-   canonical;
-   structured data válido;
-   metadata social;
-   breadcrumbs;
-   hubs geográficos;
-   hubs temáticos;
-   enlaces internos;
-   autores/responsables;
-   fecha y versión;
-   formatos de cita;
-   páginas de metodología;
-   feeds/sitemaps;
-   contenido HTML accesible;
-   documentación para crawlers cuando sea apropiado.

## Principio

No se optimizará para una afirmación como "número 1 garantizado".

Se optimizará para autoridad, claridad, fuente primaria, rendimiento y
citabilidad.

------------------------------------------------------------------------

# 12. RELEASE 1.5 --- PRENSA Y ACADEMIA

**Productos:** OPMX PRESS + OPMX ACADEMIA\
**Madurez objetivo:** M1/M2

## OPMX PRESS

-   press kit;
-   contacto;
-   gráficas descargables;
-   metodología resumida;
-   citas;
-   comunicados;
-   FAQs.

## OPMX ACADEMIA

-   glosario ampliado;
-   documentación;
-   cuestionarios;
-   bibliografía metodológica;
-   formatos de citación;
-   datasets anonimizados cuando proceda.

## Criterio de éxito

Terceros pueden utilizar OPMX sin tener que reconstruir manualmente el
contexto del estudio.

------------------------------------------------------------------------

# 13. GATE 2026 → 2027

No iniciar operación de campo digital a escala hasta cumplir:

-   al menos un flujo real de publicación validado;
-   metodología institucional documentada;
-   política de privacidad;
-   revisión jurídica para datos, ubicación, audio y video;
-   modelo de consentimiento;
-   identidad y roles;
-   estrategia de dispositivos;
-   política de retención;
-   threat model;
-   proveedor de infraestructura decidido mediante ADR;
-   backups y recuperación definidos.

------------------------------------------------------------------------

# 14. HORIZONTE 2027 --- OPERACIÓN

## Objetivo

**Digitalizar y controlar el ciclo completo de investigación.**

------------------------------------------------------------------------

# 15. RELEASE 2.0 --- OPMX FIELD MVP

**Producto:** OPMX FIELD\
**Madurez objetivo:** M2

## Capacidades

-   autenticación;
-   dispositivos autorizados;
-   asignaciones;
-   cuestionarios;
-   entrevista;
-   modo offline;
-   cola local;
-   sincronización;
-   reintentos;
-   idempotencia;
-   estado de entrevista;
-   incidencias.

## Fuera del primer MVP salvo aprobación específica

-   reconocimiento facial;
-   biometría;
-   vigilancia continua;
-   tracking permanente;
-   IA tomando decisiones automáticas sobre encuestadores.

------------------------------------------------------------------------

# 16. RELEASE 2.1 --- CONSENTIMIENTO Y EVIDENCIA

## Capacidades

-   versión de consentimiento;
-   idioma;
-   fecha/hora;
-   aceptación de encuesta;
-   consentimiento separado para audio;
-   consentimiento separado para video;
-   negativa parcial;
-   revocación;
-   retención;
-   eliminación;
-   evidencia técnica autorizada.

## Regla

La captura de evidencia debe ser proporcional al objetivo y
jurídicamente revisada.

------------------------------------------------------------------------

# 17. RELEASE 2.2 --- GEOREFERENCIACIÓN SEGURA

## Objetivo

Validar trabajo de campo sin convertir el portal en un sistema de
exposición de ubicaciones personales.

## Capacidades

-   GPS durante eventos autorizados;
-   precisión;
-   timestamp;
-   sección/manzana derivada;
-   validación territorial;
-   visualización agregada;
-   controles de acceso.

## Prohibición

Las coordenadas exactas de entrevistas no son datos públicos.

------------------------------------------------------------------------

# 18. RELEASE 2.3 --- OPMX AUDIT

**Producto:** OPMX AUDIT\
**Madurez objetivo:** M2/M3

## Capacidades

-   bitácora append-only;
-   hashes;
-   timeline;
-   revisión;
-   incidencias;
-   anomalías;
-   supervisión;
-   exportación de evidencia;
-   acceso por roles.

## Detecciones potenciales

-   velocidad atípica;
-   patrones repetitivos;
-   GPS improbable;
-   sincronización anómala;
-   duplicados;
-   inconsistencias temporales.

## Regla

Una anomalía es una señal de revisión, no una acusación automática.

------------------------------------------------------------------------

# 19. RELEASE 2.4 --- PIPELINE ESTADÍSTICO REPRODUCIBLE

**Producto:** OPMX RESEARCH

## Capacidades

-   importación;
-   validación;
-   limpieza documentada;
-   factores muestrales;
-   raking/IPF;
-   tablas;
-   márgenes;
-   exportación;
-   reproducibilidad;
-   versionado.

## Requisito

Los cálculos críticos deben poder reproducirse desde datos y
configuración versionados.

------------------------------------------------------------------------

# 20. RELEASE 2.5 --- DASHBOARD OPERATIVO

## Usuarios

-   coordinación;
-   supervisión;
-   metodología;
-   administración.

## Capacidades

-   avance;
-   cuotas;
-   cobertura;
-   incidencias;
-   sincronización;
-   calidad;
-   alertas;
-   revisión.

El dashboard interno no debe confundirse con el portal público.

------------------------------------------------------------------------

# 21. GATE 2027 → 2028

Para avanzar a infraestructura abierta de datos:

-   FIELD operando de forma estable;
-   pipeline estadístico reproducible;
-   auditoría activa;
-   política de anonimización;
-   clasificación de datos;
-   política de licencias;
-   política de retención;
-   revisión de seguridad;
-   experiencia con varios estudios reales.

------------------------------------------------------------------------

# 22. HORIZONTE 2028 --- DATOS

## Objetivo

**Convertir estudios aislados en infraestructura de conocimiento.**

------------------------------------------------------------------------

# 23. RELEASE 3.0 --- OPMX DATA

**Madurez objetivo:** M2/M3

## Capacidades

-   catálogo de datasets;
-   metadatos;
-   diccionario de variables;
-   cuestionarios;
-   metodología;
-   formatos CSV/JSON cuando proceda;
-   licencias;
-   versiones;
-   checksums;
-   DOI u otros identificadores persistentes cuando sea viable.

## Regla

Solo datos públicos o adecuadamente anonimizados.

------------------------------------------------------------------------

# 24. RELEASE 3.1 --- SERIES HISTÓRICAS

## Objetivo

Relacionar estudios a través del tiempo.

## Capacidades

-   series;
-   indicadores;
-   territorios;
-   elecciones;
-   personas;
-   candidaturas;
-   partidos;
-   temas;
-   preguntas comparables.

## Precaución

No unir series metodológicamente incompatibles sin advertencias claras.

------------------------------------------------------------------------

# 25. RELEASE 3.2 --- OPMX POLL TRACKER

**Madurez objetivo:** M2

## Capacidades

-   agregación de encuestas;
-   filtros;
-   series;
-   comparación;
-   fichas de casas encuestadoras;
-   metodología de agregación;
-   procedencia.

## Regla fundamental

Distinguir visual y semánticamente:

**Encuestas OPMX**\
vs.\
**Encuestas de terceros**

Nunca presentar datos de terceros como investigación propia.

------------------------------------------------------------------------

# 26. RELEASE 3.3 --- OPMX API

## Primera versión

API pública de lectura.

### Recursos posibles

-   studies;
-   results;
-   elections;
-   persons;
-   candidacies;
-   parties;
-   geography;
-   methodology.

## Capacidades

-   documentación;
-   versionado;
-   rate limiting;
-   claves cuando proceda;
-   caché;
-   changelog.

No exponer datos personales ni evidencia sensible.

------------------------------------------------------------------------

# 27. RELEASE 3.4 --- OPMX ACADEMIA 2.0

## Capacidades

-   biblioteca metodológica;
-   datasets;
-   notebooks/ejemplos cuando proceda;
-   citación;
-   documentación;
-   series;
-   recursos docentes.

------------------------------------------------------------------------

# 28. HORIZONTE 2029 --- INTELIGENCIA

## Objetivo

**Construir herramientas de análisis sobre un corpus ya confiable y
estructurado.**

------------------------------------------------------------------------

# 29. RELEASE 4.0 --- OPMX INSIGHTS

## Capacidades

-   análisis longitudinal;
-   comparaciones territoriales;
-   tendencias;
-   dashboards;
-   informes;
-   alertas analíticas.

Debe distinguir siempre:

-   dato;
-   cálculo;
-   inferencia;
-   interpretación.

------------------------------------------------------------------------

# 30. RELEASE 4.1 --- OPMX LAB

## Objetivo

Crear un espacio formal de experimentación.

## Líneas potenciales

-   metodología digital;
-   calidad de encuestas;
-   visualización;
-   detección de anomalías;
-   muestreo;
-   nuevas técnicas;
-   evaluación de IA.

Los experimentos no se incorporan automáticamente a producción.

------------------------------------------------------------------------

# 31. RELEASE 4.2 --- BÚSQUEDA SEMÁNTICA

## Objetivo

Permitir consultas sobre el archivo OPMX.

Ejemplos:

-   "estudios sobre seguridad en Hidalgo";
-   "aprobación presidencial 2027";
-   "metodología de la encuesta X".

La respuesta debe enlazar a fuentes originales.

------------------------------------------------------------------------

# 32. RELEASE 4.3 --- OPMX AI BETA

## Principio

**IA sobre evidencia, no IA como fuente de evidencia.**

## Capacidades

-   preguntas sobre estudios;
-   explicación metodológica;
-   comparación;
-   descubrimiento;
-   generación de resúmenes con fuentes;
-   ayuda para localizar datasets.

## Guardrails

-   citas;
-   fechas;
-   versión;
-   límites;
-   no inventar;
-   separación entre datos e interpretación.

------------------------------------------------------------------------

# 33. HORIZONTE 2030 --- REFERENCIA

## Objetivo

**Consolidar OPMX como infraestructura mexicana de referencia en opinión
pública.**

------------------------------------------------------------------------

# 34. RELEASE 5.0 --- ECOSISTEMA INTEGRADO

Para 2030, los componentes deberán interoperar:

**FIELD → AUDIT → RESEARCH → PORTAL → DATA → API → TRACKER → INSIGHTS →
AI**

Sin duplicar innecesariamente fuentes de verdad.

------------------------------------------------------------------------

# 35. EXPERIENCIA OBJETIVO 2030

Un ciudadano podrá:

-   consultar una encuesta;
-   entenderla;
-   ver metodología;
-   conocer incertidumbre;
-   revisar quién la financió.

Un periodista podrá:

-   citar;
-   descargar;
-   obtener gráficas;
-   comprobar fechas.

Un investigador podrá:

-   acceder a documentación;
-   obtener datos permitidos;
-   comparar series.

Un sistema de IA podrá:

-   descubrir;
-   atribuir;
-   enlazar;
-   explicar sin perder la fuente.

Un equipo OPMX podrá:

-   diseñar;
-   levantar;
-   supervisar;
-   procesar;
-   publicar;
-   corregir;
-   preservar.

------------------------------------------------------------------------

# 36. ROADMAP DE GOBERNANZA

## 2026

-   política editorial;
-   política de correcciones;
-   responsables;
-   Consejo Editorial y Metodológico inicial.

## 2027

-   estándares FIELD;
-   privacidad;
-   seguridad;
-   conflictos de interés;
-   auditoría.

## 2028

-   open data;
-   licencias;
-   API;
-   reutilización.

## 2029

-   política de IA;
-   evaluación de modelos;
-   revisión de automatizaciones.

## 2030

-   estructura institucional madura;
-   revisiones periódicas;
-   transparencia de gobernanza.

------------------------------------------------------------------------

# 37. ROADMAP DE SEGURIDAD

Seguridad no es una fase final.

## Fundación

-   secretos;
-   CI;
-   dependencias;
-   headers;
-   staging;
-   mínimo privilegio.

## Operación

-   MFA;
-   dispositivos;
-   RBAC;
-   cifrado;
-   backups;
-   logs;
-   incident response.

## Datos

-   anonimización;
-   clasificación;
-   DLP cuando proceda;
-   API security.

## Inteligencia

-   seguridad de modelos;
-   prompt injection;
-   control de fuentes;
-   evaluación de respuestas.

## Escala

-   pentest periódico;
-   hardening;
-   DR;
-   ejercicios de incidentes.

------------------------------------------------------------------------

# 38. ROADMAP DE PRIVACIDAD

## Antes de FIELD

-   inventario de datos;
-   bases de tratamiento;
-   avisos;
-   consentimiento;
-   retención;
-   eliminación;
-   transferencias.

## FIELD

-   minimización;
-   captura proporcional;
-   acceso restringido;
-   cifrado.

## DATA/API

-   anonimización;
-   agregación;
-   revisión de reidentificación.

## AI

-   evitar exposición accidental;
-   filtrar fuentes restringidas;
-   no entrenar o reutilizar datos sensibles sin fundamento y
    autorización aplicables.

------------------------------------------------------------------------

# 39. ROADMAP SEO Y AI DISCOVERY

## 2026

-   fundamentos técnicos;
-   arquitectura semántica;
-   estudios canónicos;
-   metodología;
-   citabilidad.

## 2027

-   autoridad temática;
-   cobertura geográfica;
-   series iniciales;
-   backlinks editoriales legítimos.

## 2028

-   datasets;
-   API;
-   hubs;
-   archivo histórico.

## 2029

-   búsqueda semántica;
-   corpus estructurado;
-   respuestas con fuentes.

## 2030

-   máxima consistencia entre portal, datos, API y AI.

La estrategia se basa en utilidad y autoridad, no manipulación.

------------------------------------------------------------------------

# 40. ROADMAP DE MODELO ECONÓMICO

## Etapa 1

Prioridad: reputación y producto.

Ingresos posibles:

-   estudios por encargo;
-   investigación institucional.

## Etapa 2

-   dashboards;
-   estudios recurrentes;
-   servicios tecnológicos.

## Etapa 3

-   API profesional;
-   datasets/licencias compatibles;
-   inteligencia sectorial.

## Etapa 4

-   herramientas avanzadas;
-   servicios analíticos;
-   capacitación.

## Regla

Ningún ingreso justifica alterar resultados o degradar transparencia.

------------------------------------------------------------------------

# 41. MÉTRICAS POR ETAPA

## Fundación

-   releases estables;
-   Core Web Vitals;
-   accesibilidad;
-   estudios completos;
-   fichas técnicas completas;
-   errores/correcciones.

## Operación

-   entrevistas válidas;
-   sincronización;
-   incidencias;
-   tiempo de supervisión;
-   anomalías revisadas.

## Datos

-   datasets;
-   descargas;
-   reutilización;
-   API calls;
-   citaciones.

## Inteligencia

-   consultas resueltas;
-   tasa de respuestas con fuentes;
-   errores factuales;
-   feedback de usuarios.

## Autoridad

-   citas de medios;
-   citas académicas;
-   backlinks editoriales;
-   uso institucional;
-   reconocimiento espontáneo.

------------------------------------------------------------------------

# 42. ANTI-MÉTRICAS

No optimizar exclusivamente por:

-   encuestas publicadas;
-   seguidores;
-   tráfico;
-   leads;
-   ranking;
-   volumen de datos;
-   minutos de video;
-   cantidad de features;
-   número de endpoints;
-   número de modelos de IA.

Más no significa mejor.

------------------------------------------------------------------------

# 43. DEPENDENCIAS CRÍTICAS

## FIELD depende de

-   metodología;
-   privacidad;
-   identidad;
-   infraestructura;
-   revisión jurídica.

## AUDIT depende de

-   FIELD;
-   eventos confiables;
-   identidad;
-   almacenamiento.

## DATA depende de

-   estudios reales;
-   clasificación;
-   anonimización.

## POLL TRACKER depende de

-   modelo electoral;
-   normalización;
-   fuentes.

## API depende de

-   modelo estable;
-   datos públicos.

## AI depende de

-   corpus;
-   metadatos;
-   fuentes;
-   citabilidad.

No invertir estas dependencias.

------------------------------------------------------------------------

# 44. DECISIONES QUE DEBEN PASAR POR ADR

Entre otras:

-   hosting;
-   base de datos;
-   object storage;
-   identidad;
-   CMS;
-   mapas;
-   observabilidad;
-   cola de trabajos;
-   servicio estadístico;
-   búsqueda;
-   vector store;
-   proveedor/modelo de IA;
-   CDN;
-   estrategia de backups.

------------------------------------------------------------------------

# 45. CRITERIOS DE PAUSA

Detener una iniciativa cuando:

-   aparecen riesgos de privacidad no resueltos;
-   falta autorización jurídica necesaria;
-   el costo cambia materialmente;
-   una dependencia crítica no está lista;
-   la evidencia contradice una hipótesis;
-   no existen criterios de aceptación;
-   el producto amenaza independencia metodológica.

Detenerse no es fracaso.

Es control.

------------------------------------------------------------------------

# 46. CRITERIOS DE CANCELACIÓN

Una funcionalidad puede cancelarse si:

-   no resuelve un problema real;
-   genera deuda desproporcionada;
-   crea riesgo reputacional;
-   requiere vigilancia innecesaria;
-   duplica herramientas existentes sin ventaja;
-   contradice la visión;
-   no puede mantenerse.

------------------------------------------------------------------------

# 47. QUÉ NO CONSTRUIR ANTES DE TIEMPO

No priorizar antes de tener fundamentos:

-   predicción electoral "con IA";
-   chatbot sin fuentes;
-   reconocimiento facial;
-   biometría;
-   microservicios innecesarios;
-   blockchain por marketing;
-   app pública nativa sin necesidad;
-   data lake masivo sin datos;
-   modelos propios de IA sin caso de uso;
-   dashboards decorativos sin decisiones que apoyar.

------------------------------------------------------------------------

# 48. PRÓXIMA SECUENCIA RECOMENDADA

A partir del estado actual:

## Paso 1

Cerrar staging de la Fase 1.

## Paso 2

Aprobar `OPMX_VISION_2030.md`.

## Paso 3

Aprobar este `OPMX_PRODUCT_ROADMAP_v1.0.md`.

## Paso 4

Hacer un **Alignment Review** de: - `OPMX_MASTER_SPEC`; -
`BLUEPRINT_v1.1`; - roadmap; - visión.

## Paso 5

Generar `PHASE_2_PLAN.md`.

## Paso 6

Fase 2 recomendada: **Sistema de estudios + modelo metodológico
público**, no OPMX FIELD todavía.

------------------------------------------------------------------------

# 49. PROPUESTA DE FASE 2

La Fase 2 debería concentrarse en Release 1.1:

## Objetivo

Construir el modelo público de estudios.

## Entregables potenciales

-   schema `Study`;
-   metodología estructurada;
-   resultados;
-   preguntas;
-   fichas técnicas;
-   patrocinio;
-   versiones;
-   correcciones;
-   páginas reales reutilizables;
-   tests;
-   SEO por estudio.

## Fuera de alcance

-   FIELD;
-   GPS;
-   video;
-   audio;
-   datos personales;
-   API pública;
-   IA;
-   Poll Tracker;
-   procesamiento estadístico productivo.

La Fase 2 debe permitir que el primer estudio OPMX futuro tenga un hogar
correcto antes de construir la maquinaria completa de campo.

------------------------------------------------------------------------

# 50. MATRIZ DE PRIORIDAD

  Producto                Valor institucional   Dependencia                       Prioridad
  ----------------------- --------------------- --------------------------------- -----------
  OPMX Portal             Muy alto              Baja                              P0
  OPMX Research           Muy alto              Portal                            P0
  CMS                     Alto                  Research                          P0
  Primer estudio nativo   Muy alto              Research + gobernanza             P0
  SEO / citabilidad       Muy alto              Estudios                          P0
  Press / Academia        Alto                  Estudios                          P1
  FIELD                   Muy alto              Legal + metodología + identidad   P1
  AUDIT                   Muy alto              FIELD                             P1
  Pipeline estadístico    Muy alto              Estudios/Field                    P1
  DATA                    Alto                  Corpus real                       P2
  Poll Tracker            Alto                  Normalización + fuentes           P2
  API                     Alto                  Modelo estable                    P2
  Insights                Medio/alto            Series                            P3
  LAB                     Estratégico           Operación madura                  P3
  AI                      Estratégico           Corpus + fuentes                  P3

------------------------------------------------------------------------

# 51. DEFINICIÓN DE P0--P3

**P0 --- Fundamental:** necesario para establecer OPMX como producto y
fuente real.

**P1 --- Operacional:** necesario para producir investigación de forma
escalable y auditable.

**P2 --- Expansión:** multiplica el valor de datos ya existentes.

**P3 --- Inteligencia:** construye nuevas capacidades sobre una base
madura.

------------------------------------------------------------------------

# 52. CRITERIO DE ÉXITO 2030

El roadmap habrá cumplido su propósito si OPMX puede demostrar que:

-   produce investigación propia;
-   documenta su metodología;
-   protege a participantes;
-   conserva historial;
-   publica correcciones;
-   opera trabajo de campo auditable;
-   ofrece datos reutilizables cuando corresponde;
-   mantiene series;
-   puede ser citado por terceros;
-   sus sistemas interoperan;
-   utiliza IA sin sustituir evidencia;
-   mantiene independencia metodológica.

------------------------------------------------------------------------

# 53. DOCUMENTOS DERIVADOS

Este roadmap deberá originar o alinear:

-   `OPMX_MASTER_SPEC`;
-   `BLUEPRINT`;
-   `ADR/`;
-   `PHASE_2_PLAN.md`;
-   `METHODOLOGY_STANDARD.md`;
-   `EDITORIAL_POLICY.md`;
-   `CORRECTIONS_POLICY.md`;
-   `PRIVACY_DATA_MAP.md`;
-   `SECURITY_BASELINE.md`;
-   `SEO_AI_PROTOCOL.md`;
-   `FIELD_PROTOCOL.md`;
-   `OPEN_DATA_POLICY.md`;
-   `AI_POLICY.md`.

No todos deben crearse inmediatamente.

Se crearán cuando se aproximen a la etapa que los necesita.

------------------------------------------------------------------------

# 54. CONTROL DE CAMBIOS

Este roadmap debe versionarse.

Cambios menores:

`1.1`, `1.2`, etc.

Cambios de estrategia o secuencia:

`2.0`.

Toda actualización debe registrar:

-   fecha;
-   responsable;
-   motivo;
-   productos afectados;
-   impacto en fases activas.

------------------------------------------------------------------------

# 55. DECLARACIÓN FINAL

OPMX no debe intentar construir todo a la vez.

La secuencia estratégica será:

> **Primero demostrar que podemos publicar con rigor.**

> **Después demostrar que podemos producir con rigor.**

> **Después demostrar que podemos auditar y preservar.**

> **Después abrir y distribuir el conocimiento.**

> **Finalmente construir inteligencia sobre una base confiable.**

El activo más importante de OPMX no será su código.

Será la confianza acumulada en sus procesos, metodología, datos y
capacidad de corregirse.

------------------------------------------------------------------------

# OPMX PRODUCT ROADMAP v1.0

## 2026 --- Fundación

## 2027 --- Operación

## 2028 --- Datos

## 2029 --- Inteligencia

## 2030 --- Referencia

**Credibilidad antes de escala.**\
**Evidencia antes de inteligencia.**\
**Metodología antes de marketing.**

------------------------------------------------------------------------

# FIN --- OPMX PRODUCT ROADMAP v1.0

