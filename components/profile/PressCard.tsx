import Image from "next/image";
import type { Developer, PressNote } from "@/content/developers";

function PressCardItem({ note }: { note: PressNote }) {
  return (
    <article className="group flex flex-col justify-between">
      <a href={note.href} target="_blank" rel="noopener noreferrer" className="block">
        {note.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#141414]">
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
          <h3 className="mb-1 font-display text-[18px] font-normal leading-snug text-[#141414] sm:text-[20px]">
            {note.headline}
          </h3>
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8F8F8F] sm:text-[12px]">
            {note.outlet}
          </p>
          {note.excerpt && (
            <p className="mb-3 font-sans text-[13.5px] font-light leading-relaxed text-[#515151]">
              {note.excerpt}
            </p>
          )}
          <span className="inline-block font-sans text-[12px] font-medium uppercase tracking-wider text-[#D78951] transition-opacity duration-300 group-hover:opacity-80">
            NOTA COMPLETA
          </span>
        </div>
      </a>
    </article>
  );
}

/**
 * Grilla de notas de prensa — adaptada 1 a 1 con la especificación de Figma:
 * padding: 48px 64px 128px 64px, max-w-[1312px] mx-auto, eyebrow #D78951, títulos #141414.
 */
export function PressSection({ developer }: { developer: Developer }) {
  const notes = developer.pressNotes;
  if (!notes || notes.length === 0) return null;

  return (
    <section
      id="prensa"
      className="scroll-mt-10 bg-white px-6 pb-24 pt-12 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col">
        <p className="mb-2 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#D78951]">
          PRENSA
        </p>
        <h2 className="mb-8 font-display text-[32px] font-light tracking-tight text-[#141414] sm:mb-10 sm:text-[40px]">
          Notas de Prensa
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {notes.map((note, index) => (
            <PressCardItem key={`${note.outlet}-${index}`} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
