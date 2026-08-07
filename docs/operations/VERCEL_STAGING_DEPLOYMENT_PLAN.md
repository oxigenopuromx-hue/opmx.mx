# Plan de despliegue de staging en Vercel

**Estado:** Plan documental — **nada de lo descrito aquí ha sido
ejecutado.**
**Fecha:** 7 de agosto de 2026
**Depende de:** `docs/adr/ADR-001-hosting.md` (`Accepted` — Vercel Pro
elegido como proveedor).
**No depende de:** ninguna cuenta conectada, ninguna credencial, ningún
despliegue previo.

---

## Regla importante

**No se ha desplegado nada. No se ha conectado ninguna cuenta. No se han
solicitado ni usado credenciales. No se ha usado AWS. No se ha modificado
código. No se ha iniciado la Fase 2.** Este documento es exclusivamente
un plan a ejecutar bajo una autorización explícita posterior y separada,
con acceso específico a la cuenta de Vercel destinada a OPMX.

---

## 1. Prerrequisitos de cuenta y acceso

- Cuenta de Vercel controlada por el usuario/propietario de OPMX (no una
  cuenta personal de terceros ni de este proceso de ejecución).
- Verificación de que el correo/organización asociado a la cuenta es el
  correcto para OPMX antes de conectar cualquier repositorio.
- Ningún paso de este documento asume que la cuenta ya existe o ya está
  conectada — su creación/verificación es un prerrequisito, no algo que
  este plan ejecute.

## 2. Conexión segura del repositorio de GitHub

- Conectar `oxigenopuromx-hue/opmx.mx` a Vercel mediante la integración
  oficial de GitHub de Vercel (OAuth/GitHub App), no mediante tokens
  manuales almacenados fuera de los mecanismos de secretos del
  proveedor.
- Limitar el alcance de la GitHub App de Vercel al repositorio de OPMX
  específicamente, no a todos los repositorios de la organización, si
  la interfaz de Vercel lo permite.
- Verificar, antes de completar la conexión, qué colaboradores de
  Vercel tendrán visibilidad del repositorio conectado.

## 3. Plan Vercel Pro

- Contratar el plan **Pro** (no Hobby) para la cuenta/equipo de OPMX,
  conforme a `ADR-001-hosting.md`.
- Reverificar en ese momento el precio y las condiciones comerciales
  vigentes del plan Pro directamente en el sitio de Vercel — el ADR no
  fija un precio como definitivo ni permanente.
- No activar add-ons ni integraciones de terceros del marketplace de
  Vercel sin autorización explícita adicional.

## 4. Configuración de entorno/rama de staging

- Definir una rama de staging estable (por ejemplo, la rama de
  integración previa a producción) que Vercel despliegue
  automáticamente como su propio entorno persistente, distinto de
  Production y de los Preview Deployments efímeros por PR.
- El entorno de staging debe recibir sus propias variables de entorno
  (ver §6), independientes de las de producción.
- No promover automáticamente staging a producción — la promoción a
  producción requiere una decisión y acción explícitas y separadas,
  fuera del alcance de este documento.

## 5. Dominio recomendado

- Dominio recomendado para staging: `staging.opmx.com.mx`.
- La configuración DNS de ese subdominio y su verificación en Vercel es
  parte de la ejecución futura, no de este plan.
- El dominio de staging debe quedar excluido de cualquier lista de
  dominios canónicos usada por `NEXT_PUBLIC_SITE_URL` en producción.

## 6. Variables de entorno

Variables a configurar como secretos del entorno de staging en Vercel
(nunca en el repositorio, consistente con `.env.example` y
`docs/operations/STAGING.md`):

- `STAGING_BASIC_AUTH_USER` — usuario de la barrera Basic Auth ya
  implementada (`src/proxy.ts`, `src/lib/staging-auth.ts`).
- `STAGING_BASIC_AUTH_PASSWORD` — contraseña correspondiente. Debe
  generarse como secreto fuerte al momento del despliegue, no
  reutilizar valores de ejemplo o de desarrollo local.
- `NEXT_PUBLIC_SITE_URL` — apuntando al dominio de staging
  (`https://staging.opmx.com.mx`) en el entorno de staging,
  específicamente para no contaminar `sitemap.xml`, `robots.txt` ni las
  URLs canónicas generadas para ese entorno con el dominio de
  producción.

Sin `STAGING_BASIC_AUTH_USER` y `STAGING_BASIC_AUTH_PASSWORD` configuradas
ambas, el proxy ya implementado deja el sitio abierto (comportamiento
documentado en `STAGING.md`) — por lo tanto, ambas variables son
obligatorias antes de considerar el entorno de staging protegido.

## 7. Protección anti-indexación

- Confirmar que el entorno de staging sirve `robots.txt` con
  `Disallow: /` o el mecanismo `noindex` ya implementado en Fase 1
  (`src/app/robots.ts` y metadatos de página), sin necesitar cambios de
  código adicionales.
- Verificar adicionalmente, a nivel de Vercel, si existe una opción de
  protección de despliegue (deployment protection) complementaria a la
  barrera Basic Auth ya implementada — evaluar si activarla sin que
  sustituya la barrera existente, no como reemplazo de ella.

## 8. Preview Deployments por PR

- Confirmar que cada pull request contra la rama principal genera
  automáticamente un Preview Deployment de Vercel.
- Los Preview Deployments deben heredar la misma protección anti-
  indexación que staging (§7) y, si es viable técnicamente, la misma
  barrera Basic Auth, para no exponer contenido en revisión.
- No se espera que los Preview Deployments requieran una configuración
  de variables de entorno distinta a la de staging, salvo que se
  detecte lo contrario durante la ejecución futura.

## 9. Límites de gasto y alertas

- Configurar, si Vercel lo permite en el plan Pro, un límite de gasto
  (spend limit) o alertas de facturación antes de generar ningún tráfico
  significativo, para evitar sorpresas de costo.
- Registrar el límite elegido y su justificación en el momento de la
  ejecución — este documento no fija un número porque depende de las
  condiciones comerciales vigentes al contratar (§3).

## 10. Permisos mínimos del equipo

- Otorgar acceso a la cuenta/equipo de Vercel únicamente a las personas
  que efectivamente necesiten administrar despliegues o variables de
  entorno.
- Preferir el rol con menor privilegio suficiente para cada persona
  (por ejemplo, acceso de solo lectura a logs para quien solo necesite
  diagnosticar, sin permisos de administración de variables de entorno
  o facturación).

## 11. Logs

- Verificar acceso a los logs de build y de runtime del entorno de
  staging desde el panel de Vercel.
- No se requiere integración con un sistema externo de logging para el
  alcance de Release 1.0 — evaluar esa necesidad únicamente si aparece
  un requisito concreto en fases posteriores.

## 12. Rollback

- Confirmar el mecanismo de rollback de Vercel (reversión a un
  despliegue anterior) antes de considerar productivo el flujo de
  staging, para poder revertir un despliegue problemático sin depender
  de un nuevo build.
- Documentar, al momento de la primera ejecución real, el procedimiento
  exacto de rollback verificado (pasos de la interfaz o comando de CLI
  usado).

## 13. Procedimiento de eliminación completa

Para poder revertir por completo esta integración si fuera necesario:

1. Eliminar el proyecto de Vercel asociado a OPMX desde el panel de
   Vercel.
2. Revocar el acceso de la GitHub App/integración de Vercel al
   repositorio `oxigenopuromx-hue/opmx.mx` desde la configuración de
   GitHub del repositorio o de la organización.
3. Eliminar cualquier registro DNS creado para `staging.opmx.com.mx` (o
   el dominio que se haya usado) apuntando a Vercel.
4. Confirmar que no quedan variables de entorno ni secretos
   residuales asociados a OPMX en la cuenta de Vercel tras la
   eliminación del proyecto.
5. Verificar que ningún colaborador conserva acceso a un proyecto de
   Vercel para OPMX que ya debería estar eliminado.

## 14. Verificaciones posteriores al despliegue

Antes de considerar el despliegue de staging exitoso:

- El sitio responde en el dominio de staging con la barrera Basic Auth
  activa (§19).
- `robots.txt` y los metadatos `noindex` bloquean la indexación (§16,
  §18).
- El build desplegado corresponde al commit esperado de la rama de
  staging.
- Las variables de entorno de staging (§6) están efectivamente activas
  (verificable indirectamente por el comportamiento del sitio, sin
  necesidad de exponer sus valores).

## 15. Lighthouse / Core Web Vitals

- Ejecutar Lighthouse (o una herramienta equivalente) contra el dominio
  de staging real, no solo contra el build local, replicando las
  mediciones ya documentadas en `docs/phases/phase-1/PHASE_1_REPORT.md`
  §6 para `/` y `/metodologia`.
- Registrar los resultados junto a los ya existentes de Fase 1 para
  poder comparar condiciones locales vs. condiciones de red reales.
- Un resultado significativamente peor que el local (por ejemplo, por
  latencia de red real o por la propia barrera Basic Auth) debe
  investigarse antes de declarar el despliegue validado.

## 16. Accesibilidad

- Re-ejecutar las pruebas de accesibilidad automatizadas (axe, vía
  Playwright) apuntando al dominio de staging, no solo contra el
  servidor local, para descartar diferencias de comportamiento entre
  entornos.
- Cualquier hallazgo nuevo respecto a los resultados ya documentados en
  `PHASE_1_REPORT.md` debe tratarse como una regresión a investigar, no
  descartarse como ruido del entorno sin verificación.

## 17. SEO técnico

- Verificar que las URLs canónicas generadas en staging usan el dominio
  de staging (`NEXT_PUBLIC_SITE_URL`, §6), no el de producción, para no
  contaminar señales de SEO reales durante las pruebas.
- Confirmar que el comportamiento de `noindex` de staging no afecta
  accidentalmente la configuración prevista para producción (son
  entornos con variables independientes, §4).

## 18. Robots y sitemap

- Confirmar que `robots.txt` en staging desalienta el rastreo (§7).
- Confirmar que `sitemap.xml` en staging, si se genera, no se somete a
  ningún motor de búsqueda ni se enlaza públicamente desde ningún lugar
  indexable.

## 19. Validación de Basic Auth

- Confirmar que el acceso al dominio de staging sin credenciales
  correctas resulta en un rechazo (401 o equivalente), replicando el
  comportamiento ya cubierto por las pruebas unitarias de
  `src/lib/staging-auth.ts` pero contra el entorno real desplegado.
- Confirmar que las rutas excluidas del matcher de `src/proxy.ts`
  (`_next/static`, `_next/image`, `favicon.ico`, `robots.txt`,
  `sitemap.xml`, `opengraph-image`) se comportan igual en staging que en
  local — es decir, que la exclusión no genera una fuga de contenido
  protegido a través de esas rutas.

## 20. Criterios para cerrar formalmente Release 1.0

Release 1.0 ("Portal Fundacional") podrá considerarse formalmente
cerrado únicamente cuando, además de lo ya documentado en
`PHASE_1_REPORT.md`:

1. El despliegue de staging descrito en este plan esté ejecutado y
   verificado (§14).
2. Las mediciones de Lighthouse/Core Web Vitals sobre staging (§15)
   sean consistentes con los resultados locales ya documentados, o
   cualquier diferencia esté explicada y no oculte una regresión real.
3. Las pruebas de accesibilidad sobre staging (§16) no muestren
   hallazgos nuevos sin investigar.
4. La barrera Basic Auth esté validada en el entorno real (§19).
5. `robots.txt`/`sitemap.xml`/`noindex` estén confirmados como
   efectivos en staging (§17, §18).
6. El cierre se registre explícitamente en
   `docs/strategy/OPMX_PRODUCT_ROADMAP_v1.0.md` §7 y en
   `docs/phases/phase-1/PHASE_1_REPORT.md`.

Solo después de cumplirse estos seis criterios, y de una autorización
explícita separada, podrá iniciarse la **implementación** de Fase 2
(`docs/phases/phase-2/PHASE_2_PLAN.md` §3, §22, §26).
