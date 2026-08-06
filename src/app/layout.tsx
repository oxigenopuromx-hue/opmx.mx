import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPMX — Opinión Pública de México",
  description:
    "OPMX investiga, mide y documenta la opinión pública de México mediante metodología científica y tecnología aplicada al trabajo de campo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
