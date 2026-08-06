/**
 * Verificación de la barrera Basic Auth temporal de staging. Función pura
 * y aislada del runtime de Next.js para poder probarla sin un
 * `NextRequest` real (ver proxy.ts, que es donde se aplica de verdad).
 *
 * Esto NO es el sistema de identidad definitivo de OPMX (usuarios, roles,
 * MFA, dispositivos, revocación — BLUEPRINT_v1.1.md §5). Es únicamente
 * una barrera de despliegue para que staging no quede abierto al público
 * mientras no hay autorización para producción indexable.
 */
export function isBasicAuthAuthorized(
  authorizationHeader: string | null,
  expectedUser: string,
  expectedPassword: string,
): boolean {
  if (!authorizationHeader) return false;

  const [scheme, encoded] = authorizationHeader.split(" ");
  if (scheme !== "Basic" || !encoded) return false;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const providedUser = decoded.slice(0, separatorIndex);
  const providedPassword = decoded.slice(separatorIndex + 1);

  return providedUser === expectedUser && providedPassword === expectedPassword;
}
