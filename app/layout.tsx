import type { Metadata } from "next";
import { Syne, Public_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ruum — Experiencias inmersivas que venden desarrollos antes de construirlos",
  description:
    "ruum es la plataforma de visualización digital para inmobiliarias: recorridos virtuales de alta fidelidad, planos 2D/3D interactivos y exploración de amenidades para que agentes y desarrolladores cierren ventas más rápido.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${publicSans.variable}`}>
      <body className="bg-background font-sans font-medium text-gray-100 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
