## Why

Eight of the landing's ten sections (`Statement`, `Stats`, `FeatureSection`, `RevealGallery`/proyectos,
`HowItWorks`, `ClosingCTA`, `Footer`) either diverge from the confirmed visual reference
(`docs/references/landing-desktop.png`, `projects-secction.png`, `footer.png`) or don't exist yet
(the logos/clients marquee), per the audit in `docs/page-structure.md`. Navbar, Hero, About Us,
centralized navigation, and media optimization are already aligned and out of scope. This change
closes the remaining gap so the whole landing matches the confirmed reference, using the
provisional content the references make observable, centralized the same way the rest of the site
already is.

## What Changes

- **Statement**: no structural change — already matches the reference; re-verify only.
- **Stats**: replace the 3 provisional metrics with the reference's 4 (`+50` proyectos diseñados,
  `15` desarrolladores inmobiliarios, `+20` países servicios prestados, `+100` unidades vendidas
  usando Ruum).
- **FeatureSection**: **BREAKING** (internal) — replace the horizontal pinned/scrubbed carousel (3
  cards) with the reference's non-pinned, vertically stacked layout (5 rows, image + copy,
  eyebrow/heading/description), matching the 5 rows observed in the reference (renders diurno/
  nocturno, vistas 360°, video orbital, ambientes humanizados, panel de control). Two rows need new
  provisional Unsplash placeholder images (the current content only has 3).
- **RevealGallery / sección de proyectos**: **BREAKING** (internal) — replace the full-bleed
  vertical reveal panels with the reference's compact card carousel (image, name, developer,
  location, "Ver proyecto" action, prev/next arrows). `Project` gains `developer`, `location`,
  `slug` (future profile, unused for now), and an optional `href` (future "Ver proyecto" URL, kept
  absent/pending — never invented). Catalog trimmed to the 3 projects whose developer/location are
  actually observable in `projects-secction.png` (Itaguá, Buen Retiro, Artemis); PV Norte is
  dropped from this section pending real data, not deleted from the repo's history.
- **HowItWorks**: **BREAKING** (internal) — replace the pinned, per-step full-viewport stacking
  effect (with images) with the reference's simpler non-pinned 3-column row (numbered steps, title,
  description, no images), matching copy: "Creamos tu experiencia digital" / "Publicamos tu
  proyecto" / "Impulsa tus ventas".
- **Logos / clientes** (new section): reusable CSS-driven marquee (`components/ui/Marquee.tsx`),
  centralized logo data, placed between HowItWorks and ClosingCTA per the reference. Real company
  SVGs aren't provided yet, so this ships with provisional placeholder SVGs for the 10 companies
  named in the reference (STTO Group, GuiArte Studio, Castillo Arquitectura, Itaguá Condominio,
  Stratto Vind, Buen Retiro, PV Norte, Artemis Tower, Frak, Kohler & Weiss), clearly marked for
  replacement.
- **ClosingCTA**: update heading/subcopy/CTA label to the reference's copy, and add the
  contact/testimonial block observed in the reference (name, phone, email, portrait) — using the
  name/phone/email actually visible in the reference and a provisional placeholder portrait, all
  marked as provisional mockup content pending the product owner's real data.
- **Footer**: update tagline and column labels/links to match `footer.png`, add the missing social
  icons row (Facebook, Instagram); logo asset and brand name untouched (Navbar/branding are out of
  scope).
- Responsive behavior and accessibility (semantics, `aria-*`, focus, alt text) reviewed for every
  section touched above.
- Images optimized per `docs/performance-guidelines.md` (`next/image`, `sizes`, no unwarranted
  `priority`); every new/changed scroll or marquee animation respects `prefers-reduced-motion`.

## Capabilities

### New Capabilities
- `project-catalog`: the projects/portfolio section — configurable project entries (name,
  developer, location, image, future slug, future "Ver proyecto" link) and their carousel
  presentation.
- `logo-marquee`: the reusable logo-ticker/marquee primitive and the clients/logos section built on
  it — centralized data, one or two rows, opposite directions, continuous loop, reduced-motion
  behavior.
- `landing-marketing-sections`: the informational/content sections between the hero and the footer
  (Statement, Stats, FeatureSection, HowItWorks, ClosingCTA, Footer) — centralized provisional
  content, structural alignment with the confirmed reference, and shared responsive/reduced-motion/
  no-invented-data rules.

### Modified Capabilities
_None._ `landing-media` (Hero/About Us video) and `site-navigation` (Navbar) are out of scope for
this change; their requirements are unchanged.

## Impact

- **Components changed**: `components/sections/Stats.tsx`, `FeatureSection.tsx`,
  `RevealGallery.tsx`, `HowItWorks.tsx`, `ClosingCTA.tsx`, `Footer.tsx`. `Statement.tsx` reviewed,
  not expected to change.
- **Components added**: `components/sections/Logos.tsx` (or similar) and
  `components/ui/Marquee.tsx`; a small carousel/nav-arrows primitive for the projects section (new,
  under `components/ui/` if reused, otherwise local to `RevealGallery.tsx` — see `design.md`).
- **Content**: `content/site.ts` gains/changes `stats`, `features`, `revealGallery.projects`,
  `howItWorks`, `closingCTA`, `footer`, plus a new `logos` collection — all typed, no hardcoded
  copy in components.
- **`app/page.tsx`**: one new `<Logos />` section inserted between `<HowItWorks />` and
  `<ClosingCTA />`.
- **No new dependencies**; no changes to `next.config.ts` (all placeholder images stay on the
  already-allowlisted `images.unsplash.com`).
- **Out of scope, unaffected**: `Navbar.tsx`, `Hero.tsx`, `AboutUs.tsx`, `lib/navigation.ts`,
  `SmoothScroll.tsx`, real estate developer profile pages/routes.
