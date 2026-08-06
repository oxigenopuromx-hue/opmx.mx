import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBasicAuthAuthorized } from "@/lib/staging-auth";

/**
 * Barrera temporal y documentada de staging (Basic Auth), NO la
 * autenticación definitiva de OPMX (BLUEPRINT_v1.1.md §5, decisión
 * preliminar de Fase 1). Se activa solo si STAGING_BASIC_AUTH_USER y
 * STAGING_BASIC_AUTH_PASSWORD están definidas en el entorno de
 * despliegue; sin esas variables (desarrollo local, o si nunca se
 * configuran) no bloquea nada.
 */
export function proxy(request: NextRequest) {
  const expectedUser = process.env.STAGING_BASIC_AUTH_USER;
  const expectedPassword = process.env.STAGING_BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return NextResponse.next();
  }

  const authorized = isBasicAuthAuthorized(
    request.headers.get("authorization"),
    expectedUser,
    expectedPassword,
  );

  if (authorized) {
    return NextResponse.next();
  }

  return new NextResponse("Autenticación requerida.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="OPMX staging"' },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)",
  ],
};
