import Image from "next/image";
import type { Developer, PressNote } from "@/content/developers";

function PressCard({ note }: { note: PressNote }) {
  return (
    <a href={note.href} className="group block">
      {note.image && (
        // 420×240 en el diseño Figma (proporción 7/4 exacta).
        <div className="relative aspect-[7/4] w-full overflow-hidden rounded-xl bg-[oklch(90%_0_0)]">
          <Image
            src={note.image.src}
            alt={note.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="pt-4">
        <h3 className="font-display text-[22px] font-normal leading-snug text-[oklch(18%_0_0)]">
          {note.headline}
        </h3>
        <p className="mt-1.5 text-[12px] font-normal uppercase tracking-[0.12em] text-[#515151]">
          {note.outlet}
        </p>
        <span className="mt-2 inline-block text-[13px] font-normal text-accent transition-opacity duration-300 group-hover:opacity-80 uppercase border-b border-[#D78951] pb-0.5">
          Nota completa
        </span>
      </div>
    </a>
  );
}

/**
 * Grilla de notas de prensa — sección completa omitida cuando el
 * desarrollador no tiene ninguna configurada (ver specs/developer-profiles
 * "Press notes are centrally configured and optional").
 */
export function PressSection({ developer }: { developer: Developer }) {
  const notes = developer.pressNotes;
  if (!notes || notes.length === 0) return null;

  return (
    <section
      id="prensa"
      className="scroll-mt-10 border-t border-[oklch(15%_0_0)]/10 px-5 py-14 sm:px-10 lg:px-24 lg:pb-32 lg:pt-16"
    >
      <p className="mb-2 text-[12px] font-normal uppercase tracking-[0.28em] text-accent">PRENSA</p>
      <h2 className="mb-10 font-display text-[36px] font-normal text-[oklch(15%_0_0)] sm:text-[40px]">
        Notas de Prensa
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
        {notes.map((note, index) => (
          <PressCard key={`${note.outlet}-${index}`} note={note} />
        ))}
      </div>
    </section>
  );
}
