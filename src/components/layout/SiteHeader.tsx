import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { primaryCta, primaryNav } from "@/content/nav";

export function SiteHeader() {
  return (
    <header className="border-line dark:border-ink-2 border-b">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          OPMX
        </Link>

        {/* Navegación de escritorio */}
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          <ul className="flex flex-wrap items-center gap-5 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink-2 dark:hover:text-fog">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={primaryCta.href}
            className="bg-ink text-paper hover:bg-ink-2 dark:bg-paper dark:text-ink rounded-full px-5 py-2 text-sm font-medium"
          >
            {primaryCta.label}
          </Link>
        </nav>

        {/* Navegación móvil: <details> nativo, operable por teclado sin JS. */}
        <details className="relative lg:hidden">
          <summary className="border-line dark:border-ink-2 flex cursor-pointer list-none items-center rounded-full border px-4 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <nav
            aria-label="Principal"
            className="border-line dark:border-ink-2 bg-paper dark:bg-ink absolute right-0 z-10 mt-2 w-64 rounded-lg border p-4 shadow-lg"
          >
            <ul className="flex flex-col gap-3 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink-2 dark:hover:text-fog">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={primaryCta.href}
                  className="bg-ink text-paper mt-1 inline-block rounded-full px-4 py-2 font-medium"
                >
                  {primaryCta.label}
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
