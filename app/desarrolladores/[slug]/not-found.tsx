import Link from "next/link";

/**
 * Fallback para un slug de desarrollador sin entrada configurada en
 * content/developers.ts — ver specs/developer-profiles "Unknown developer
 * slug shows a not-found fallback". Tema claro, igual que el resto de
 * `components/profile/` y esta ruta.
 */
export default function DeveloperNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[oklch(98%_0_0)] px-5 py-24 text-center font-sans text-[oklch(15%_0_0)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="font-display text-[28px] font-bold sm:text-[36px]">Perfil no encontrado</h1>
      <p className="max-w-[440px] text-[14.5px] text-[oklch(45%_0_0)]">
        No encontramos un perfil de desarrollador para esta dirección. Puede que el enlace esté
        desactualizado o que este perfil todavía no esté configurado.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-[13.5px] font-medium text-accent transition-opacity duration-300 hover:opacity-80"
      >
        Volver a la landing
      </Link>
    </div>
  );
}
