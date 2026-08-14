import type { LegalContentItem, LegalDocument } from "@/content/site";

/**
 * Renderer compartido para `/privacy` y `/terms` — ver
 * openspec/changes/adopt-legal-terms-and-privacy-content. Ambas páginas son
 * wrappers finos alrededor de este componente, pasándole su propio
 * `LegalDocument` (content/site.ts). Cada `LegalContentItem.kind` mapea a
 * un elemento visual reutilizando los tokens ya establecidos por la propia
 * página de Términos (caja con borde para el callout, acento naranja para
 * destacados) — no se introduce ningún token nuevo.
 */

function LegalContentBlock({ item }: { item: LegalContentItem }) {
  switch (item.kind) {
    case "p":
      return <p className="text-justify">{item.text}</p>;
    case "subheading":
      return <p className="font-medium text-white">{item.text}</p>;
    case "list":
      return (
        <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
          {item.items.map((entry) => (
            <li key={entry.slice(0, 60)}>{entry}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-200 text-justify">
          {item.title && (
            <strong className="text-[#D78951] block mb-1">{item.title}</strong>
          )}
          {item.text}
        </div>
      );
  }
}

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <main className="mx-auto w-full max-w-[900px] px-6 py-16 sm:py-24 lg:px-12">
      <div className="mb-12">
        <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.28em] text-[#D78951]">
          DOCUMENTO LEGAL
        </p>
        <h1 className="font-display text-[32px] font-light tracking-tight text-white sm:text-[44px]">
          {document.documentTitle}
        </h1>
        <p className="mt-4 font-sans text-sm font-light text-muted-7">
          {document.subtitle} · {document.versionLine}
        </p>
      </div>

      <div className="space-y-10 font-sans text-[15px] font-light leading-relaxed text-gray-300 sm:text-[16px]">
        {document.sections.map((section) => (
          <section
            key={section.heading}
            id={section.id}
            className={section.id ? "scroll-mt-24 space-y-4" : "space-y-4"}
          >
            <h2 className="font-display text-xl font-normal text-white">
              {section.heading}
            </h2>
            {section.content.map((item, i) => (
              <LegalContentBlock key={i} item={item} />
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
