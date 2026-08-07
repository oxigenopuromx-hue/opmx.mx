# Staging — OPMX Fase 1

## Barrera de acceso (temporal, no es la autenticación definitiva)

El despliegue de staging se protege con **HTTP Basic Auth** implementado en
`src/proxy.ts` (convención `proxy` de Next.js 16 — ver también
`src/lib/staging-auth.ts`, que contiene la verificación pura y probada por
unidad en `src/lib/__tests__/staging-auth.test.ts`).

Esto es explícitamente **una barrera de despliegue temporal**, no el sistema
de identidad de OPMX descrito en `BLUEPRINT_v1.1.md` §5 (usuarios, roles,
MFA, dispositivos, revocación, auditoría). No debe evolucionar hacia esa
autenticación definitiva ni reutilizarse como tal.

### Activación

La barrera solo se activa si **ambas** variables de entorno están definidas
en el entorno de despliegue:

```
STAGING_BASIC_AUTH_USER=<usuario>
STAGING_BASIC_AUTH_PASSWORD=<contraseña>
```

Sin ambas variables (por ejemplo, en desarrollo local o si nunca se
configuran), el proxy no bloquea nada — comportamiento verificado en
`src/lib/__tests__/staging-auth.test.ts` y manualmente:

```bash
# Sin variables definidas: 200 (abierto, esperado en dev/CI)
npm run build && npm run start -- -p 3300 &
curl -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3300/

# Con variables definidas: 401 sin credenciales, 200 con las correctas
STAGING_BASIC_AUTH_USER=opmx STAGING_BASIC_AUTH_PASSWORD=<contraseña> \
  npm run start -- -p 3300 &
curl -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3300/            # 401
curl -o /dev/null -w "%{http_code}\n" -u opmx:<contraseña> http://127.0.0.1:3300/  # 200
```

Rutas excluidas de la barrera (`config.matcher` en `src/proxy.ts`):
`_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`,
`opengraph-image` — necesarias para que build/health-checks internos de la
plataforma de hosting no queden bloqueados.

## Estado del despliegue en esta sesión

**No se aprovisionó infraestructura real de staging en esta sesión.**

Este entorno de ejecución tiene credenciales de AWS preexistentes, pero
deliberadamente no se usaron para crear recursos reales (S3, CloudFront,
etc.): habría significado crear infraestructura con costo y persistencia en
una cuenta no verificada explícitamente para este propósito, y el proveedor
de hosting sigue sin decidirse (ADR-001, `BLUEPRINT_v1.1.md` §14). Se le
preguntó al usuario cómo proceder y no se recibió respuesta antes de
continuar con el resto de la Fase 1; se optó por la opción no destructiva
(preparar el pipeline, no aprovisionar).

Lo que **sí** está listo para desplegar en cuanto se resuelva el hosting:

- `npm run build` produce un build de producción funcional (Next.js
  standalone/Node server).
- `npm run start` sirve ese build.
- La barrera Basic Auth descrita arriba, lista para activarse con dos
  variables de entorno.
- CI (`.github/workflows/ci.yml`) ya verifica lint, typecheck, formato,
  pruebas unitarias, build y E2E en cada push/PR.

## Pendiente para tener una URL de staging real

1. Resolver ADR-001 (proveedor de hosting) — ver `BLUEPRINT_v1.1.md` §14.
2. Configurar `STAGING_BASIC_AUTH_USER` / `STAGING_BASIC_AUTH_PASSWORD` como
   secretos en ese proveedor (nunca en el repositorio).
3. Configurar `NEXT_PUBLIC_SITE_URL` con la URL real de staging (afecta
   `sitemap.xml`, `robots.txt` y las URLs canónicas — ver `.env.example`).
4. Añadir el job de despliegue correspondiente al proveedor elegido en
   `.github/workflows/ci.yml` (no se agrega todavía porque agregar un job
   de deploy sin proveedor decidido implicaría inventar credenciales o
   apuntar a un servicio no autorizado).
