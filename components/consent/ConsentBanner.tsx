"use client";

import Link from "next/link";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useConsent } from "@/components/consent/ConsentProvider";

const { banner } = siteContent.consent;

/**
 * Banner de consentimiento: "Aceptar analíticas" / "Rechazar" / "Más
 * información" (→ /privacidad#cookies), más la barra fija inferior estándar
 * de cookie-banner. Se muestra vía `ConsentProvider.bannerOpen` — sin
 * decisión vigente, o reabierto desde la entrada "Preferencias de cookies"
 * del footer. No es un modal bloqueante: el resto de la página sigue siendo
 * navegable e interactiva mientras el banner está visible.
 */
export function ConsentBanner() {
  const { bannerOpen, accept, reject } = useConsent();

  if (!bannerOpen) return null;

  return (
    <div
      role="region"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-70 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex w-full max-w-300 flex-col gap-4 rounded-2xl border border-border bg-[#1A1A1C] p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <p className="font-sans text-[13.5px] font-light leading-relaxed text-gray-300 sm:text-sm">
          {banner.message}{" "}
          <Link
            href={banner.moreInfoHref}
            className="text-[#D78951] underline underline-offset-4 hover:text-white"
          >
            {banner.moreInfoLabel}
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={reject}
            className="flex-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:flex-none"
          >
            {banner.rejectLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={accept}
            className="flex-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:flex-none"
          >
            {banner.acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
