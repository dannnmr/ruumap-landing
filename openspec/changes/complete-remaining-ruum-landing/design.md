## Context

`docs/page-structure.md` and `docs/design-reference.md` already establish which sections diverge
from `docs/references/landing-desktop.png` and why (see proposal.md - Why). This design covers the
sections still open: `Statement` (verify only), `Stats`, `FeatureSection`, `RevealGallery`
(projects), `HowItWorks`, a new Logos/clients section, `ClosingCTA`, `Footer`. Navbar, Hero, About
Us, `lib/navigation.ts`, and `SmoothScroll.tsx` are out of scope and untouched except where a
section needs their existing exports (`SECTION_IDS`, `Button`, `Eyebrow`).

Pixel-level detail not visible in the reference screenshots (`docs/references/*.png`) was extracted
by cropping `landing-desktop.png` at full resolution (2160×13877) section by section — this is how
the exact Stats values, the 5 FeatureSection rows, the 3-step HowItWorks copy, the 10 logo names,
and the ClosingCTA contact block (name/phone/email) were confirmed as "observable in the
reference," consistent with the propose command's brief ("puedes utilizar textos, imágenes y
asociaciones visibles en las referencias").

## Goals / Non-Goals

**Goals:**
- Every section in scope visually and structurally matches `landing-desktop.png` /
  `projects-secction.png` / `footer.png`, with adaptations only where justified by UX, responsive,
  accessibility, performance, or maintainability (per CLAUDE.md).
- All new/changed copy, images, and associations live in `content/site.ts` (or a small sibling data
  file for logos), typed, with provisional entries clearly commented as such.
- No new npm dependencies; reuse `Button`, `Eyebrow`, `cn()`, and the existing GSAP/Lenis/
  `usePrefersReducedMotion`/`useInViewport` patterns.

**Non-Goals:**
- Real estate developer profile pages/routes (explicitly deferred, per product-context.md).
- Real logo SVGs, final ClosingCTA contact data/photo, or final "Ver proyecto" URLs — these stay
  provisional until the product owner supplies them.
- Any change to Navbar, Hero, About Us, or centralized navigation beyond reading their existing
  exports.
- A generic/shared "Carousel" UI primitive — the projects section carousel is used exactly once,
  so per the reuse rule (extract only when a pattern repeats 2+ times) it stays local to
  `RevealGallery.tsx` unless a second carousel need appears later.

## Decisions

### 1. FeatureSection: replace the pinned horizontal carousel with the reference's vertical stack
The reference shows 5 full-width rows (image + eyebrow/heading/description), plain vertical
scroll, no pin. The current implementation is a `ScrollTrigger`-pinned horizontal carousel with 3
cards. Kept as horizontal-scroll, it would need either dropping 2 of the 5 reference rows or
growing the pin/scrub distance — both move further from the reference. Switching to a vertical
stack (same row shape already used by `HowItWorks`'s image+text grid) matches the reference
directly, removes a pinned `ScrollTrigger` (one less thing to keep in sync with Lenis), and is
mobile-friendlier (no horizontal-drag ambiguity on touch). `Feature` gains an `eyebrow: string`
field (replacing the visible use of `index` as a number badge; `index` stays on the type as a
stable React key / potential future use, e.g. `aria-label` ordinal). Two of the five reference rows
("video orbital", "panel de control") don't have an existing image in `content/site.ts` — new
provisional Unsplash placeholders are added for them, following the exact pattern already used for
every other placeholder image in the file.

Alternative considered: keep the pinned horizontal carousel and just expand it to 5 cards. Rejected
— it's a bigger visual departure from the confirmed reference than the proposal's mandate allows
without being asked to preserve it, and the reference gives no indication a carousel was intended
here (unlike the projects section, which explicitly shows carousel arrows).

### 2. HowItWorks: replace the pinned stacking effect with the reference's plain 3-column row
The reference shows a simple 3-column row (number, title, description, thin top rule per column),
scrolling normally — no images, no pin, no per-card scale/overlay effect. The current
implementation pins each of 3 full-viewport steps and animates scale/opacity as the next one rises.
Matching the reference here is a simplification: drop the per-step `ScrollTrigger.create({ pin:
true, ... })` and the scale/overlay tweens, drop the per-step image, and lay out the 3 steps as a
CSS grid row with a `border-t` divider (same visual device the reference uses). `Step.image`
becomes unused for this section; the field stays on the shared `Step` type as optional since
nothing else currently consumes `Step` outside `HowItWorks`. This is a significant reduction in
motion/complexity for this section, justified purely by reference alignment (not a performance or
UX rationale invented after the fact) — flagged explicitly here because CLAUDE.md requires any
divergence-reducing rewrite to explain the improvement it's justified by, and in this case the
justification is "the current implementation was never confirmed as an intentional adaptation, and
the reference is unambiguous" (`docs/page-structure.md` already flags this exact gap).

### 3. RevealGallery → projects catalog: compact cards + carousel, replacing full-bleed reveal panels
`projects-secction.png` shows 3 fixed-size cards in a row (image, name, developer, location, "Ver
proyecto") with prev/next arrows — not full-viewport reveal panels. New `Project` fields:
`developer: string`, `location: string`, `slug?: string` (future profile route, unused until
developer profiles ship), `href?: string` (future "Ver proyecto" destination). The catalog is
trimmed from 4 projects to the 3 whose developer/location are actually visible in the reference
(Itaguá/STTO Group, Buen Retiro/Kohler & Weiss Real Estate Development, Artemis/SYMPRAX); PV Norte
has no confirmed developer/location anywhere in the references, and per the propose command's rule
("no inventes datos que no aparezcan"), it is left out of `content/site.ts` for this section rather
than shipped with an invented or blank developer. It can be re-added the moment real data exists —
nothing else in the repo depends on it being 4 projects.

"Ver proyecto" renders as a real `<a>` only when `project.href` is set; otherwise it renders as a
visually identical but `aria-disabled` span, per `project-catalog` spec — this directly satisfies
`page-structure.md`'s standing rule that the action must stay pending, never point to an invented
URL.

The carousel itself: a horizontal `flex` track with `scroll-snap-type: x mandatory` and native
scroll, plus two button controls that call `scrollBy()` on the track — no GSAP, no new dependency,
works with touch/trackpad for free, and needs no coordination with Lenis (it's element-level
scroll, not page scroll). Buttons get `disabled` at each end (per the "communicates it has no
further effect" scenario in the spec) computed from `scrollLeft`/`scrollWidth` on `scroll`.

### 4. Logos/clients: new `Marquee` UI primitive
`components/ui/Marquee.tsx`, parametrized by `direction: "left" | "right"` and `speed`/`duration`,
rendering `children` (or a `items` prop) twice in sequence inside a `flex` track animated with a
CSS `@keyframes` `translateX(0 → -50%)` — the standard duplicate-the-track technique so the loop
seam is invisible (both halves are identical, so the moment the first half has fully scrolled off,
the second half is in exactly its start position). `animation-play-state: paused` when
`usePrefersReducedMotion()` is true. This is CSS-driven (per performance-guidelines.md's marquee
section: "animar con CSS ... en vez de JS atado a scroll/rAF"), so it never touches Lenis/GSAP/the
main thread's rAF budget.

Logo data lives in a new `content/logos.ts` (kept separate from `site.ts` because it's a flat list
of `{ name, src, row }` rather than page copy, and because the SVG assets it references are
provisional placeholders slated for wholesale replacement — isolating that churn from `site.ts`
keeps the copy file stable). Each logo's `src` points to a static SVG under
`public/assets/logos/*.svg`. Per the propose command's instruction ("no conviertas SVG a TSX salvo
que exista una necesidad técnica concreta"), logos are referenced as file paths and rendered via
plain `<img>` (SVG has no meaningful `next/image` optimization benefit and `next/image` adds
layout-shift-prevention machinery this doesn't need for small fixed-size marks), not inlined as
JSX/TSX components. The 10 provisional SVGs (one per company name visible in the reference: STTO
Group, GuiArte Studio, Castillo Arquitectura, Itaguá Condominio, Stratto Vind, Buen Retiro, PV
Norte, Artemis Tower, Frak, Kohler & Weiss) are simple monochrome wordmark/placeholder marks built
for this change, explicitly not the companies' real logos — commented as provisional in
`content/logos.ts`, ready to be swapped file-for-file when real SVGs arrive.

Two rows (`row: 1 | 2`), opposite default directions, split 5/5 to match the reference's 2×5 grid
impression while still reading as a flowing ticker rather than a static grid.

### 5. ClosingCTA: reference copy + contact block
Heading/subcopy/CTA label updated to the reference's copy ("Sumá tu proyecto a la experiencia más
inmersiva y mejorá la experiencia de tus ventas." / "Contáctanos y conversemos acerca de tu próximo
proyecto inmobiliario." / "Contáctanos"). The contact block adds `closingCTA.contact = { name,
phone, email, photo }` to `content/site.ts`. Name/phone/email are the literal values visible in the
reference ("Guillermo Castillo", "+591 780 00000", "atencion@ruumap.com") — used as-is per the
propose command's brief, but commented as provisional mockup content (the phone number's
`00000` suffix reads as a placeholder in the source mockup itself, not a real number). `photo` is a
new provisional Unsplash portrait (no real photo asset exists) — same placeholder pattern as every
other image in `content/site.ts`, clearly commented pending the real asset. This resolves the
"pending decision" `page-structure.md` had flagged for this block.

### 6. Footer: copy alignment + social icons
Tagline and column labels/links updated to `footer.png`'s exact text. Two small inline social icon
SVGs (Facebook, Instagram — simple glyphs, not brand asset files) render in a new bottom-bar row
next to the copyright line, each wrapped in an `<a>` sourced from a new `footer.social` array in
`content/site.ts` (`{ label, href, icon }`) so icons aren't hardcoded JSX either. Real social URLs
aren't in any reference — `href` stays `"#"` with a code comment marking it provisional, consistent
with how the existing column links already behave (also `href="#"` today).

### 7. Stats
Pure content change: 3 → 4 entries, new values/labels from the reference. Existing layout
(flex row, `border-y`, centered value+label) is visually compatible with the reference and is kept.

### 8. Statement
No implementation change expected — `docs/page-structure.md` already marks it as matching. This
change only re-verifies it against the reference at QA time (see tasks.md).

## Risks / Trade-offs

- **[Risk] Dropping PV Norte from the projects catalog removes existing content** → Mitigation:
  it's not deleted from the repo's history (git), only from the rendered set, and the `Project`
  type/UI support re-adding it the moment developer/location are confirmed — no rework needed.
- **[Risk] Simplifying HowItWorks and FeatureSection removes GSAP scroll effects a reviewer might
  read as "regression"** → Mitigation: both are explicit, reasoned realignments to the confirmed
  reference (see Decisions #1–2), not accidental drops; `docs/page-structure.md` already flagged
  both as unconfirmed deviations, not approved adaptations.
- **[Risk] Placeholder logo SVGs and the ClosingCTA portrait are provisional assets built for this
  change, not real brand/photo assets** → Mitigation: isolated in `content/logos.ts` and clearly
  commented in `content/site.ts`, so replacing them later is a data-only edit with no component
  changes.
- **[Risk] Marquee CSS animation duplicating the full logo track doubles the DOM nodes for that row**
  → Mitigation: 10 small SVGs total: negligible DOM/paint cost, and it's the standard technique
  performance-guidelines.md already prescribes for this exact section.
- **[Risk] Native scroll-snap carousel for projects behaves slightly differently across browsers
  (snap easing, momentum)** → Mitigation: only 3 cards today; acceptable given no new dependency
  and it satisfies every scenario in the `project-catalog` spec. Revisit only if a future project
  count makes native snap feel wrong.

## Migration Plan

Single-branch, no data migration and no feature flag needed — all changes are presentational/
content and land together. Rollback is a plain revert. Manual QA against `docs/references/` (per
`docs/page-structure.md`'s checklist) happens once per section as it's implemented, tracked in
tasks.md; a final full-page pass closes the change.
