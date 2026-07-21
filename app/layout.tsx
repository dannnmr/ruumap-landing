import type { Metadata } from "next";
import { Space_Grotesk, Public_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  title: "ruum — Recorridos 3D para proyectos en pre-venta",
  description:
    "ruum convierte cada etapa de construcción en un recorrido 3D navegable, con disponibilidad de unidades actualizada en tiempo real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${publicSans.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
