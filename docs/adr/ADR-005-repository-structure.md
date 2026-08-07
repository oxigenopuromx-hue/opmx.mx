# ADR-005 — Estructura del repositorio (monorepo vs. paquete único)

**Estado:** `Accepted` (de facto, formalizado retroactivamente en este documento)
**Fecha de la decisión de facto:** Fase 1 (agosto de 2026), primer commit de estructura
**Fecha de este documento:** 7 de agosto de 2026
**Bloquea:** nada actualmente.

---

## Contexto

`BLUEPRINT_v1.1.md` §14 listaba como pendiente: _"¿Herramienta de gestión del monorepo? Turborepo, Nx, npm/pnpm workspaces simples sin herramienta adicional"_, con nota de que debía resolverse _"antes de que crezca el número de paquetes compartidos"_.

Durante la Fase 1, esa decisión se tomó **de facto, por evidencia, no por deliberación separada**: el repositorio se construyó como un único paquete Next.js (`package.json` en la raíz), sin herramienta de monorepo, consistente con la decisión de "modular monolith" de `BLUEPRINT_v1.1.md` §1 (un solo proceso, un solo repositorio de código). `ARCHITECTURE.md` documenta la separación en módulos lógicos dentro de `src/` (`app/`, `components/`, `content/`, `lib/`), no en paquetes npm separados.

## Decisión

**Repositorio como paquete único, sin herramienta de monorepo** (ni Turborepo, ni Nx, ni npm/pnpm workspaces).

## Evidencia que sostiene esta decisión

- Un solo `package.json` en la raíz del repositorio.
- Un solo `tsconfig.json`, un solo `next.config.ts`, una sola configuración de ESLint/Prettier/Vitest/Playwright.
- `ARCHITECTURE.md` §"Un solo runtime": _"Next.js (App Router) es la única aplicación desplegable"_.
- Ningún directorio `packages/` ni `apps/` — la separación de responsabilidades vive dentro de `src/` como convención de carpetas (`components/ui` vs. `components/layout` vs. `content` vs. `lib`), no como paquetes independientes con su propio versionado.

## Razones para mantenerla

- El tamaño actual del código (un portal público + páginas de contenido, sin backend separado, sin app móvil, sin servicio estadístico) no genera necesidad real de compartir código entre paquetes independientes — la condición que `BLUEPRINT_v1.1.md` §14 puso como disparador ("antes de que crezca el número de paquetes compartidos") no se ha cumplido.
- Consistente con el principio general de "modular monolith" (`BLUEPRINT_v1.1.md` §1): la separación física prematura es la sobre-ingeniería que ese documento ya rechazó explícitamente para servicios; lo mismo aplica a paquetes.
- Un paquete único simplifica CI (`.github/workflows/ci.yml` ya corre lint/typecheck/test/build sin lógica de filtrado por paquete).

## Cuándo revisar esta decisión

Reabrir este ADR cuando ocurra cualquiera de estas señales concretas (no antes, por preferencia):

- Se introduce OPMX FIELD (Release 2.0) como una segunda aplicación desplegable (React Native/Expo) que necesite compartir tipos o lógica de validación con el portal — en ese punto, un paquete `packages/types` o `packages/shared` compartido empieza a tener sentido.
- El servicio estadístico (Python) se extrae como servicio propio (`BLUEPRINT_v1.1.md` §1, condición de extracción) y necesita contratos de datos compartidos con el monolito TypeScript — normalmente vía esquema/OpenAPI, no necesariamente vía herramienta de monorepo.
- El equipo crece lo suficiente para que builds/tests de todo el repo en cada cambio se vuelvan un cuello de botella de CI, y se necesite build incremental por paquete (razón típica para adoptar Turborepo/Nx).

Ninguna de estas señales está presente en Fase 2 (Sistema de Estudios + Modelo Metodológico Público), que se mantiene dentro del mismo paquete único.

## Consecuencias

- Positivas: cero complejidad de tooling adicional, CI simple, una sola fuente de verdad de dependencias (`package-lock.json`).
- Negativas/asumidas: si el proyecto creciera de forma abrupta hacia múltiples aplicaciones desplegables sin pasar por esta revisión, se acumularía deuda de reestructuración — mitigado por la condición de revisión explícita arriba.
