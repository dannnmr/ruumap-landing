## Why

`docs/product-context.md` and `docs/page-structure.md` ("Perfiles inmobiliarios") confirm that
each real-estate developer needs its own profile page — reached from a project/developer in the
landing's catalog — following `docs/references/perfil.desarrollador.inmobiliario.png`. Today the
landing has no such page: `Project` (`content/site.ts`) already carries an unused `slug?` field
and the catalog's "Ver proyecto" action, but there is nowhere for a slug to lead, and developer
data (logo, mission, representative, press notes, etc.) has no home at all. Without a reusable,
data-driven template, adding a developer today would mean hand-building a one-off page — exactly
what the product owner ruled out.

## What Changes

- Add a centralized **developers** content collection (name, logo, slogan, cover image, social
  links, address, website, video, description, mission, vision, main image, representative,
  added projects, other projects, press notes, related links), fully typed in TypeScript, with
  explicit optional fields and fallbacks for anything not yet confirmed.
- Extend the existing **projects** collection (`content/site.ts`'s `Project`) so every project can
  reference its developer by slug, and carries a slug, category/relation, and a `href` for "Ver
  proyecto" that is provisional-or-absent, never invented.
- Add a Next.js App Router **dynamic route** (`app/desarrolladores/[slug]/page.tsx` or equivalent)
  that renders one reusable profile template per developer slug, with a `not-found` fallback for
  an unknown slug.
- Add a reusable **profile template** and supporting presentational components (profile header,
  video section, info block, project cards, press cards) under `components/profile/` (or
  equivalent), composed from centralized data — no per-developer JSX, no duplicated pages.
- Wire the landing's existing project cards (`RevealGallery`) so selecting a project navigates to
  its developer's profile via the centralized slug relationship, replacing today's dead-end
  `slug?` field.
- Within a profile, "Ver proyecto" reads its destination from the project's `href` in data; when
  absent it renders as a clearly inactive, non-interactive state — the same pattern
  `project-catalog` already established for the landing's catalog card.
- Populate provisional content for the three developers already named in `docs/product-context.md`
  and already present in `content/site.ts` (STTO Group, Kohler & Weiss Real Estate Development,
  SYMPRAX) using only what is observable in `perfil.desarrollador.inmobiliario.png` (which is
  itself STTO Group's profile — its content maps directly) and `projects-secction.png`. **Per
  explicit user direction**: all three developers reuse that same reference content structure and
  copy (description, mission, vision, representative, press notes, other projects), adapted per
  developer name, rather than leaving Kohler & Weiss and SYMPRAX mostly empty — this is
  placeholder content, marked `status: "provisional"` and commented as such in
  `content/developers.ts`, to be replaced with each developer's real information later. No new
  developer, press outlet, or URL is invented beyond what these sources show.
- Update `docs/page-structure.md` ("Perfiles inmobiliarios" section) to reflect the implemented
  route, data shape, and remaining pending content once this change lands.

## Capabilities

### New Capabilities

- `developer-profiles`: centralized developer/project data model, the dynamic profile route, the
  reusable profile template and its sub-components, and the profile-specific "Ver proyecto"
  linking rules.

### Modified Capabilities

- `project-catalog`: the catalog's project cards gain a real navigation destination (the
  developer's profile, via the existing `slug` field) instead of being inert; the project data
  model gains fields (`developerSlug`, `category`, provisional/confirmed status) needed to drive
  that link and to populate a profile's "added projects" and "other projects" lists.

## Impact

- **Content**: `content/site.ts` (`Project` type gains developer-linking/status fields) and a new
  `content/developers.ts` (or equivalent) module for the developers collection — both remain the
  single source of truth per `CLAUDE.md`; no component hardcodes copy or media URLs.
- **Routing**: one new dynamic route under `app/`, additive only — no existing route changes.
- **Components**: new reusable components under `components/profile/` (or equivalent); existing
  `RevealGallery` project card gains a link to the profile route; no other landing section
  changes.
- **Design system**: reuses existing tokens (`app/globals.css` `@theme`), `components/ui/`
  primitives (`Button`, `Eyebrow`), and GSAP/Lenis conventions where relevant — no new
  dependencies, per `CLAUDE.md`.
- **Docs**: `docs/page-structure.md` gains an implemented-state entry for the profile route,
  replacing its current "explicitly pending" note.
