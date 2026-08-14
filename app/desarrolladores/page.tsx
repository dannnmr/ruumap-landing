import { redirect } from "next/navigation";

/**
 * /desarrolladores (y su alias público /developers, vía next.config.ts) sin
 * slug no tiene una vista propia (solo existen perfiles individuales en
 * /developers/[slug]) — antes de esta ruta, Next.js caía en el 404 raíz
 * (app/not-found.tsx). Se decidió redirigir a home en vez de mostrar un 404
 * (decisión del usuario, 2026-08-14).
 */
export default function DesarrolladoresIndexPage() {
  redirect("/");
}
