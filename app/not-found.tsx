import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Fallback para cualquier URL del sitio sin ruta asociada. Cubre todo lo
 * que no sea /desarrolladores/[slug] (ese segmento tiene su propio
 * not-found, tema claro — ver app/desarrolladores/[slug]/not-found.tsx).
 * Este usa el tema oscuro de la landing corporativa, igual que el resto
 * del sitio.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 py-24 text-center">
      <Image
        src="/assets/ruum_logo_black.png"
        alt="ruum"
        width={90}
        height={22}
        className="h-[22px] w-auto"
      />

      <Eyebrow>404</Eyebrow>

      <h1 className="font-display text-[32px] font-bold tracking-tight text-white sm:text-[40px]">
        Página no encontrada
      </h1>

      <p className="max-w-110 text-[14.5px] leading-relaxed text-gray-300">
        No encontramos la página que buscás. Puede que el enlace esté
        desactualizado o que la dirección tenga un error.
      </p>

      <Button href="/" variant="primary" className="mt-2">
        Volver al inicio
      </Button>
    </div>
  );
}
