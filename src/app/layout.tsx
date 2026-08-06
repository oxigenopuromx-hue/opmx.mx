import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OPMX — Opinión Pública de México",
    template: "%s — OPMX",
  },
  description:
    "OPMX investiga, mide y documenta la opinión pública de México mediante metodología científica y tecnología aplicada al trabajo de campo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
