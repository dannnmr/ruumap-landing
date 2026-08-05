## 1. Statement (verify only)

- [x] 1.1 Compare `Statement.tsx` against `docs/references/landing-desktop.png` at full resolution;
      confirm copy, layout, and absence of an image still match.
- [x] 1.2 If a real drift is found, fix only that drift (do not restyle otherwise) and note it in
      `docs/page-structure.md`. — No drift found: main line and subcopy match the reference
      verbatim at full resolution. No change made.

## 2. Stats

- [x] 2.1 Update `siteContent.stats` in `content/site.ts` to the 4 confirmed entries: `+50` /
      "proyectos diseñados", `15` / "desarrolladores inmobiliarios", `+20` / "países servicios
      prestados", `+100` / "unidades vendidas usando Ruum" (comment as provisional, sourced from
      the reference).
- [x] 2.2 Confirm `Stats.tsx`'s existing flex/`border-y` layout reads correctly with 4 items at all
      breakpoints; adjust spacing only if needed (no structural rewrite). — `justify-between`
      flex row scales to 4 items without changes; kept as-is.

## 3. FeatureSection

- [x] 3.1 Extend the `Feature` type in `content/site.ts` with `eyebrow: string`; add the 2 missing
      rows' provisional Unsplash images following the existing placeholder pattern. — Reused the
      orphaned PV Norte image (dropped from the projects catalog) instead of a brand-new URL.
- [x] 3.2 Update `siteContent.features` to the 5 reference rows and copy: "Renders diurno |
      nocturno" → "Visualiza tu proyecto en cualquier momento del día"; "Vistas 360°" → "Explora
      cada espacio desde todos los ángulos"; "Video orbital" → "Una perspectiva completa del
      proyecto"; "Ambientes humanizados" → "Espacios que cobran vida"; "Panel de control" →
      "Gestiona tu proyecto con información en tiempo real" (plus each row's description from the
      reference).
- [x] 3.3 Rebuild `FeatureSection.tsx` as a vertical stack of 5 rows (rounded image + eyebrow/
      heading/description), removing the pinned `ScrollTrigger` horizontal-scroll implementation;
      keep `id={SECTION_IDS.servicios}` and `scroll-mt-24`.
- [x] 3.4 Add a subtle scroll-in reveal (opacity/transform only, `scrub` or a simple `scrollTrigger`
      per row) consistent with the rest of the site; gate it behind
      `usePrefersReducedMotion()` per `landing-marketing-sections` spec.

## 4. RevealGallery → projects catalog

- [x] 4.1 Extend the `Project` type in `content/site.ts` with `developer: string`,
      `location: string`, `slug?: string`, `href?: string`.
- [x] 4.2 Replace `siteContent.revealGallery.projects` with the 3 confirmed entries (Itaguá/STTO
      Group, Buen Retiro/Kohler & Weiss Real Estate Development, Artemis/SYMPRAX), each with
      location "Santa Cruz de la Sierra, Bolivia.", no `href`/`slug` set yet; comment the
      project↔developer pairing as provisional/unconfirmed per `docs/product-context.md`; do not
      carry PV Norte over (no confirmed developer/location).
- [x] 4.3 Update `siteContent.revealGallery` eyebrow/heading to "CATÁLOGO ACTIVO" / "Últimos
      proyectos añadidos".
- [x] 4.4 Rebuild `RevealGallery.tsx` as a compact-card horizontal carousel (image, name, developer,
      location, "Ver proyecto") using native scroll + `scroll-snap`, replacing the full-bleed
      reveal-panel implementation; keep `id={SECTION_IDS.proyectos}` and `scroll-mt-24`.
- [x] 4.5 Add prev/next controls that scroll the track and disable at each end based on scroll
      position (`aria-label`s, `disabled` attribute — see `project-catalog` spec). — Kept always
      visible (not hidden on mobile) so keyboard/screen-reader users retain explicit controls;
      header wraps on narrow viewports instead.
- [x] 4.6 Render "Ver proyecto" as a real link only when `project.href` is set; otherwise render a
      visually matching `aria-disabled` element with no `href` (never invent a URL).

## 5. HowItWorks

- [x] 5.1 Update `siteContent.howItWorks` copy to the reference: heading "Tres pasos para
      transformar la venta de tu proyecto.", steps "Creamos tu experiencia digital" / "Publicamos
      tu proyecto" / "Impulsa tus ventas" with their reference descriptions; keep eyebrow "CÓMO
      FUNCIONA" (already correct). — Note: the previous copy was "Proceso" as the eyebrow, updated
      to the reference's literal "CÓMO FUNCIONA".
- [x] 5.2 Rebuild `HowItWorks.tsx` as a non-pinned 3-column row (number, title, description, thin
      `border-t` per column), removing the per-step `ScrollTrigger` pin/scale/overlay effect and
      the step images; keep `id={SECTION_IDS.proceso}` and `scroll-mt-24`.
- [x] 5.3 Mark `Step.image` optional in the shared type (no longer used by this section).

## 6. Logos / clientes (new section)

- [x] 6.1 Create `components/ui/Marquee.tsx`: CSS `@keyframes`-driven, duplicated-track loop,
      `direction`/`duration` props, pauses via `animation-play-state` when
      `usePrefersReducedMotion()` is true. — Implemented by conditionally applying the animation
      class (equivalent effect to toggling `animation-play-state`, simpler with Tailwind's `cn()`).
- [x] 6.2 Create `content/logos.ts` with a typed `LogoItem[]` (`name`, `src`, `row`) for the 10
      companies named in the reference; comment the whole file as provisional placeholder marks
      pending real SVGs from the product owner.
- [x] 6.3 Add 10 simple provisional monochrome placeholder SVGs under `public/assets/logos/`.
- [x] 6.4 Create `components/sections/Logos.tsx`: eyebrow/heading copy ("PARTNERS | CLIENTES |
      DESARROLLADORES INMOBILIARIOS | CONSTRUCTORAS | SOFTWARE" / "Empresas relacionadas y clientes
      del ecosistema Ruum."), two `Marquee` rows (opposite directions) fed from `content/logos.ts`,
      each logo an `<img>` with `alt`/`title` set to its company name.
- [x] 6.5 Insert `<Logos />` into `app/page.tsx` between `<HowItWorks />` and `<ClosingCTA />`.

## 7. ClosingCTA

- [x] 7.1 Update `siteContent.closingCTA` heading/CTA label to the reference copy ("Sumá tu proyecto
      a la experiencia más inmersiva y mejorá la experiencia de tus ventas." / "Contáctanos") and
      add the subcopy line ("Contáctanos y conversemos acerca de tu próximo proyecto
      inmobiliario.").
- [x] 7.2 Add `closingCTA.contact = { name, phone, email, photo }` with the reference's values
      ("Guillermo Castillo", "+591 780 00000", "atencion@ruumap.com", a new provisional Unsplash
      portrait), commented as provisional mockup content pending real data.
- [x] 7.3 Update `ClosingCTA.tsx` to render the subcopy and the contact block (photo, name, phone
      with tel: link, email with mailto: link) alongside the existing heading/CTA/parallax
      background; keep `id={SECTION_IDS.contacto}` and `scroll-mt-24`. — Finding during
      implementation: the reference for this section has no full-bleed background photo (it's a
      solid dark background + b/w portrait bleeding on the right), so the previous
      `backgroundImage`/parallax was dropped in favor of a two-column layout matching what's
      actually observable in the reference; documented in `ClosingCTA.tsx` and `content/site.ts`.

## 8. Footer

- [x] 8.1 Update `siteContent.footer` tagline and columns to `footer.png`'s text: "Producto"
      (Proyectos, Recorridos 3D, Precios), "Compañía" (Nosotros, Contacto), "Legal" (Privacidad,
      Términos).
- [x] 8.2 Add `siteContent.footer.social = [{ label, href, icon }]` for Facebook and Instagram
      (`href: "#"`, commented provisional, matching how column links already behave). — Icon is
      resolved by `label` via a small lookup map in `Footer.tsx` rather than stored as data (an
      icon is markup, not content); label/href stay data-driven.
- [x] 8.3 Add two small inline social-icon SVGs (or a tiny shared icon component) and render the
      social row in `Footer.tsx`'s bottom bar next to the copyright line.

## 9. Responsive & accessibility pass

- [x] 9.1 Verify every section touched in groups 2–8 at mobile/tablet/desktop breakpoints against
      `docs/references/` (no unintended layout shift, no horizontal page overflow from the
      marquee or the projects carousel). — Verified via responsive Tailwind classes (mobile-first,
      `sm`/`md`/`lg` breakpoints on every rebuilt section) and by rendering the dev server's HTML
      output; the marquee tracks are `w-max` inside `overflow-hidden` parents and the projects
      carousel scrolls inside its own `overflow-x-auto` container, so neither can force page-level
      horizontal scroll. **Pending** (same standing limitation as prior changes — see
      `docs/page-structure.md`): pixel-level visual QA in a real browser/viewport, not available in
      this environment.
- [x] 9.2 Verify keyboard operability and `aria-*` correctness: projects carousel controls, "Ver
      proyecto" disabled state, Footer/ClosingCTA links, Logos marquee `alt`/`title`s. — Confirmed
      in rendered HTML: carousel buttons are real `<button>`s with `aria-label`s and a `disabled`
      attribute driven by scroll position (computed correctly for the current 3-project catalog);
      "Ver proyecto" renders `aria-disabled` (no `href`) for all 3 projects, matching that none has
      a confirmed link yet; every logo `<img>` has `alt`/`title` set to its company name; Footer
      social icons have `aria-label`s.
- [x] 9.3 Confirm every new/changed scroll or marquee animation respects
      `prefers-reduced-motion` (per `landing-marketing-sections` and `logo-marquee` specs). —
      FeatureSection/HowItWorks reveal animations are skipped entirely via
      `usePrefersReducedMotion()`; `Marquee` conditionally omits the animation class under the same
      hook, leaving logos static but visible.

## 10. Final validation

- [x] 10.1 Run `npm run lint` and fix any findings. — `next lint` in this repo requires the
      interactive first-run ESLint setup wizard (Strict/Base prompt); this environment can't answer
      interactive prompts, so it can't run non-interactively — same pre-existing condition already
      documented in `docs/page-structure.md` ("este repo no tiene ESLint configurado todavía"), not
      introduced by this change. `npx tsc --noEmit` is clean, and `npm run build`'s own
      "Linting and checking validity of types" step (Next's built-in checks) passed with no errors.
- [x] 10.2 Run `npm run build` to confirm the added `Logos` section and content changes compile
      cleanly. — Clean build, all 6 routes generated, no errors (one pre-existing, unrelated CSS
      `@import`-order warning).
- [x] 10.3 Full-page visual pass against `docs/references/landing-desktop.png`,
      `projects-secction.png`, and `footer.png`. — Done via rendered-HTML content verification
      (dev server + grep for every expected copy string, project/logo/contact data, and ARIA
      attributes — all present and correctly deduplicated/disabled where expected). **Pending**:
      pixel-level visual comparison in a real browser, not available in this environment (same
      standing limitation already documented for prior changes in this file).
- [x] 10.4 Update `docs/page-structure.md`'s per-section status table/detail to reflect the new
      state ("Implementado, coincide con la referencia") for every section touched by this change.

## 11. Spacing refinement (exact Figma auto-layout values)

After the initial pass, the product owner shared Figma auto-layout screenshots (padding/gap/
resizing) for Stats, FeatureSection, RevealGallery, HowItWorks, Logos, and ClosingCTA, showing the
approximated Tailwind spacing (guessed from the reference PNGs) didn't match the real values —
most visibly, too much unintended side margin on common desktop widths (1440–1920px) because
`max-w-[1300px]`/`max-w-[1200px]` caps were narrower than the design's actual fill-width +
fixed-padding pattern.

- [x] 11.1 Stats: narrow the content band to match Figma exactly (`max-w-[960px]`, was `1200px` —
      Figma: 1440 frame with 240px side padding = 960px content).
- [x] 11.2 FeatureSection: moved padding from the outer section (a guessed gap-based stack) to each
      row individually (`px-16 py-24` at `lg`, i.e. 64/96px, fill width, hug height — matching
      Figma's per-row auto-layout exactly), widened content to `max-w-[1400px]`.
- [x] 11.3 RevealGallery: fixed vertical padding from 128px to 64px at `lg` (Figma: uniform 64/64),
      widened content to `max-w-[1400px]`.
- [x] 11.4 HowItWorks: vertical padding 128px → 130px at `lg` (Figma value), tightened the
      heading-to-grid spacing (Figma shows 0 extra gap there), widened content to `max-w-[1400px]`.
- [x] 11.5 Logos: enlarged each logo mark (`h-6/h-8` → `h-10/h-12/h-14`) and the gap between them,
      matching the generous 240×160 grid-cell pitch shown in Figma (a static grid in the design
      file — still implemented as the confirmed continuous marquee, per the original brief).
- [x] 11.6 ClosingCTA: added the missing 64px gap between the text and photo columns (was 0), and
      increased the text column's padding to match Figma (128px left at `xl`, 96px vertical).
- [x] 11.7 Logos data/assets: `content/logos.ts` now points to the real company SVGs provided at
      `public/images/logos/*.svg` (superseding the provisional placeholders from group 6); removed
      the now-unused placeholder files under `public/assets/logos/` and updated the "provisional"
      framing in `content/logos.ts` and `docs/page-structure.md` accordingly.

## 12. Fixed-edge-padding correction (removing the `max-w` + `mx-auto` anti-pattern)

Group 11 fixed the literal padding *numbers* but introduced (or kept) a `max-w-[1300–1400px]
mx-auto` centering wrapper on several sections. On real desktop widths (1440–1920px+), that
centering margin is far bigger than the intended fixed padding — e.g. Stats' old
`max-w-[960px] mx-auto` added `(1920-960)/2=480px` per side on a 1920px viewport, on top of its own
padding, when the design calls for a flat 240px. The product owner confirmed the requirement:
lateral padding must be a constant pixel value regardless of screen size, not a max-width-driven
proportional margin. This group removes that anti-pattern everywhere it appeared.

- [x] 12.1 Stats: removed `mx-auto`/`max-w-[960px]`; padding ramp is now
      `px-5 sm:px-10 lg:px-16 xl:px-[240px]` (flat 64px from `lg`, flat 240px from `xl` up, holding
      constant at any wider viewport). Bumped the stat value's font size to `lg:text-[64px]`
      (label size left unchanged, as specified).
- [x] 12.2 FeatureSection: removed `mx-auto`/`max-w-[1400px]` from each row (padding was already
      correct at `lg:px-16 lg:py-24` = 64/96px). Added `max-w-[480px]` to the row heading, which had
      no width cap of its own, so it stays readable now that the row is genuinely edge-to-edge.
      Simplified the feature image's `sizes` attribute (dropped the stale `1400px`-cap bucket) so
      `next/image` doesn't serve an undersized/blurry asset at wide viewports.
- [x] 12.3 HowItWorks: removed the inner `<div className="mx-auto max-w-[1400px]">` wrapper
      (no other styling on it); its children are now direct children of the section. Existing
      `max-w-[760px]`/`max-w-[360px]` on the heading/step copy already cover readability.
- [x] 12.4 RevealGallery: removed the same kind of inner `max-w-[1400px]` wrapper; header row and
      cards track are now direct children of the section. Cards are fixed-width and unaffected.
- [x] 12.5 Logos: restructured each logo from a bare height-only `<img>` into a fixed-size slot
      (`aspect-[3/2]`, width ramp `120px → 180px → 240px`) matching the literal 240×160 Figma cell;
      reduced the `Marquee` track gap from `lg:gap-24` (96px) to `lg:gap-20` (80px) to match the
      specified inter-logo spacing. The section's own edge padding (`lg:px-16`) had no wrapper bug
      and was left unchanged.
- [x] 12.6 ClosingCTA: removed `mx-auto`/`max-w-[1400px]` from the two-column grid wrapper. This
      also fixes a related bug: the photo column was capped short of the true right edge,
      contradicting both the reference (portrait bleeding to the browser edge) and this component's
      own code comment about the intended layout.
- [x] 12.7 Footer: removed `mx-auto`/`max-w-[1400px]` from both the columns grid and the bottom
      copyright/social bar (same anti-pattern, not explicitly flagged this round but covered by the
      same standing principle — kept consistent with every other section).
- [x] 12.8 Verified `npx tsc --noEmit` and `npm run build` stay clean, and confirmed via rendered
      dev-server HTML that no `max-w-[1400px]`/`max-w-[960px]` occurrence remains anywhere in the
      page output, and all content/ARIA attributes are unaffected. **Pending**: pixel-level
      confirmation in a real browser at 1024/1280/1440/1920px that the lateral padding is now
      constant from its target breakpoint upward (same standing environment limitation as prior
      groups).
- [x] 12.9 Updated `docs/page-structure.md` to describe the fixed-edge-padding model (superseding
      the "centered max-width band" description written for group 11).

## 13. Two more visual corrections from a live review

- [x] 13.1 ClosingCTA: the text column's padding had gone asymmetric (`lg:pl-16 lg:pr-8 xl:pl-32`
      — 128px only on the left) while the product owner's Figma value applies to both sides.
      Changed to `lg:px-16 xl:px-32`, matching left and right.
- [x] 13.2 RevealGallery: moved the prev/next carousel controls from next to the heading (top of
      the section) to below the cards track, right-aligned — matching the arrows' actual position
      in `docs/references/projects-secction.png` (bottom-right of the section, not top-right).

## 14. ClosingCTA: text/photo split was 50/50, hiding the right padding

Symmetrizing the text column's padding (13.1) wasn't enough — a live screenshot showed the
128px right padding still invisible, because the column was a `grid-cols-2` 50% track, and the
copy (max-width ~520px) is far narrower than 50% of most viewports, leaving hundreds of pixels of
unused column space *before* the last 128px of padding even started. The fix is structural, not
another padding tweak.

- [x] 14.1 Changed the outer wrapper from `grid grid-cols-1 lg:grid-cols-2` to
      `flex flex-col lg:flex-row`. The text column is now `lg:max-w-[780px] lg:shrink-0` (sized to
      its own content + padding, not stretched to a fraction of the viewport), so its `xl:px-32`
      right padding is now the actual, visible gap before the photo. The photo column is now
      `lg:flex-1 min-w-0` (grows to fill whatever width remains) and reaches the true right edge —
      also making the portrait noticeably larger/more prominent, closer to the reference.
- [x] 14.2 Updated the `Image`'s `sizes` from `50vw` to `60vw` at `lg:` to reflect that the photo
      column is no longer a fixed 50% share.
- [x] 14.3 The photo still had zero top inset while the text column's own `py-24` gave it one,
      so the two columns started at different heights and the photo visibly touched the top of the
      section. Added `lg:pt-16 xl:pt-32` directly to the photo's (already `relative`) container —
      `next/image fill` insets from the padding edge, so this opens a real gap above the photo
      without an extra wrapper.
