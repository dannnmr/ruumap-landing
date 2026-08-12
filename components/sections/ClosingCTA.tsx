import Image from "next/image";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/navigation";

const { heading, subcopy, primaryCta, backgroundImage } = siteContent.closingCTA;

export default function ClosingCTA() {
  return (
    <section
      id={SECTION_IDS.contacto}
      className="relative flex min-h-[640px] items-center justify-center scroll-mt-24 overflow-hidden bg-background"
    >
      {/* Fondo según especificación de Figma: Imagen 100% + Capa #141414 al 50% de opacidad */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#141414]/50" />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[1312px] flex-col items-center justify-center px-5 py-24 text-center sm:px-10 sm:py-28 lg:py-32">
        <div className="flex max-w-[890px] flex-col items-center gap-7">
          <h2 className="font-display text-[clamp(30px,5vw,46px)] font-light leading-[1.15] tracking-tight text-white">
            {heading}
          </h2>
          <p className="max-w-full font-sans text-[15px] font-light leading-relaxed text-gray-300">
            {subcopy}
          </p>
          <Button
            href={primaryCta.href}
            target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
            rel={primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
            variant="primary"
            className="rounded-[10px] px-9 font-normal py-4 text-sm sm:px-11 sm:py-[18px] sm:text-[15px]"
          >
            {primaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
