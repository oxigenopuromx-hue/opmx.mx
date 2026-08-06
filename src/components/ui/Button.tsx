import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-2 dark:bg-paper dark:text-ink dark:hover:bg-fog",
  secondary:
    "border border-line text-ink hover:border-ink-3 dark:border-ink-2 dark:text-paper dark:hover:border-fog",
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
