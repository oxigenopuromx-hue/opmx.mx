import type { ReactNode } from "react";

type CalloutProps = {
  title: string;
  children: ReactNode;
};

/**
 * Aviso visible y permanente para advertencias de calidad de datos o de
 * naturaleza demostrativa de un contenido (nunca oculto en tooltip).
 */
export function Callout({ title, children }: CalloutProps) {
  return (
    <div
      role="note"
      className="bg-notice-bg border-notice-border rounded-lg border px-5 py-4 text-sm leading-relaxed"
    >
      <p className="text-notice mb-1 font-semibold">{title}</p>
      <div className="text-ink-2">{children}</div>
    </div>
  );
}
