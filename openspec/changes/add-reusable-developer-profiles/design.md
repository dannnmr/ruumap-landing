## Context

See `proposal.md` - Why. Relevant current state:

- `content/site.ts` is the single content module for the whole landing (`siteContent`), with
  `Project` already carrying an unused `slug?: string` documented as "future project profile
  slug" — a leftover from before the product owner confirmed (`docs/product-context.md`,
  `docs/page-structure.md`) that the profile is **per developer**, not per project.
- `RevealGallery.tsx` has a private, unexported `ProjectCard` that already renders image, name,
  developer, location, and a conditionally-interactive "Ver proyecto" — the exact visual unit the
  profile's project lists also need.
- `AboutUs.tsx` already implements a poster-first, deferred, user-initiated video with a
  play/pause control (`useInViewport`) — the same interaction the profile's video section needs.
- The landing is dark-themed (`--color-background: oklch(12% 0 0)`, light foreground) via global
  tokens in `app/globals.css`. `docs/references/perfil.desarrollador.inmobiliario.png` — confirmed
  by the product owner as the profile's reference — is unambiguously **light**-themed (white/off-
  white background, dark text), and `docs/product-context.md` explicitly calls the profile "una
  vista distinta de la landing corporativa" (a distinct view). The reference's accent color reads
  as the same warm orange/terracotta already defined as `--color-accent`.
- Only three developers currently have any confirmed association with a project in
  `content/site.ts`: STTO Group (Itaguá), Kohler & Weiss Real Estate Development (Buen Retiro),
  SYMPRAX (Artemis). `perfil.desarrollador.inmobiliario.png` is itself STTO Group's own profile
  screenshot — its content (video placeholder, "Construyendo Futuros Sostenibles" copy, "Carlos
  Zamorano Scott" representative, 3 added projects, 3 "otros proyectos", 3 press notes) maps
  directly to STTO Group's data. No comparable reference exists for the other two — **per explicit
  user direction (2026-08-05)**, their profiles reuse that same reference content, adapted per
  developer name, as clearly-marked provisional placeholder copy rather than staying empty; real
  content replaces it later.

## Goals / Non-Goals

**Goals:**
- One dynamic route + one template renders any developer's profile from data.
- Adding a developer or a project-to-developer link is a data-only change.
- Every profile field the product owner listed has a typed, centralized home with a defined
  fallback when unset.
- Reuse the project-card and video-poster patterns that already exist instead of forking them.

**Non-Goals:**
- Redesigning the corporate landing (`docs/references/landing-desktop.png` scope) — out of bounds
  per `CLAUDE.md`.
- Finalizing real "Ver proyecto" URLs, developer press content, or a fourth/fifth developer beyond
  the three already confirmed — those remain pending product-owner input.
- A CMS, admin UI, or remote data source for developers/projects — data stays in versioned
  TypeScript modules, same convention as `content/site.ts`.
- SEO/OG metadata polish for profile pages beyond the `Metadata` Next.js already requires to
  render a valid page.

## Decisions

### Data model: extend `content/site.ts`'s `Project`, add `content/developers.ts`
`Developer` gets its own module (`content/developers.ts`) rather than living inside
`siteContent` in `content/site.ts`, because it's a distinct collection keyed by slug (not a
landing section) — mirrors how `content/logos.ts` was already split out for the same reason
(a collection, not a section's copy). `Project` stays in `content/site.ts` (it's still primarily
landing content) but gains the fields the catalog and profile both need:

```ts
export type Project = {
  // ...existing fields (index, name, tag, developer, location, image, href?)
  /**
   * Slug of the Developer (content/developers.ts) this project belongs to.
   * Drives both the catalog card's profile link and the project's membership
   * in that developer's "added projects" list. Replaces the old, unused
   * `slug?` field — profiles are per-developer, not per-project (confirmed
   * in docs/product-context.md).
   */
  developerSlug?: string;
  /** Optional category/relation label (e.g. "Torre residencial"). Data-only
   *  in this change — not yet rendered anywhere, since no reference shows a
   *  visible category element on a project card or profile list. */
  category?: string;
  /** Editorial marker, not rendered: whether this entry's data is confirmed
   *  or still provisional. Lets content maintainers track what still needs
   *  product-owner confirmation without gating any UI behavior (the existing
   *  project-catalog rule of omitting unconfirmed entries entirely already
   *  covers the behavioral guarantee). */
  status: "provisional" | "confirmed";
};
```

`content/developers.ts`:

```ts
export type SocialLink = { label: string; href: string }; // same shape as siteContent.footer.social

export type PressNote = {
  outlet: string;
  headline: string;
  href: string;
  image?: SiteImage;
};

export type RelatedLink = { label: string; href: string };

export type Representative = {
  name: string;
  role: string;
  quote?: string;
  photo?: SiteImage;
};

export type Developer = {
  slug: string;
  name: string;
  logo?: SiteImage;
  slogan?: string;
  coverImage?: SiteImage;
  social?: SocialLink[];
  address?: string;
  website?: string;
  video?: SiteVideo;
  description?: string;
  mission?: string;
  vision?: string;
  mainImage?: SiteImage;
  representative?: Representative;
  pressNotes?: PressNote[];
  relatedLinks?: RelatedLink[];
  otherProjects?: OtherProjectRef[]; // see below
  status: "provisional" | "confirmed";
};
```

"Added projects" are derived, not stored on `Developer`: any `Project` in `content/site.ts` whose
`developerSlug` matches a developer's `slug` is that developer's added project. This avoids two
sources of truth for the same relationship (storing the link on both sides could desync). "Other
projects" (the reference's separate "Otros proyectos"/portfolio grid) is a distinct, smaller,
developer-owned list (`otherProjects: OtherProjectRef[]`, `{ name; location; image }` — no
`href`/"Ver proyecto" observed on that grid in the reference) since it isn't drawn from the
landing's catalog at all.

**Alternative considered**: nest `developers` inside `siteContent`. Rejected — `siteContent` is
documented as "todo el copy e imágenes del sitio" (the landing's own copy); developers are a
separate entity collection referenced *from* the landing, same reasoning that already split
`content/logos.ts` out.

### Routing: `app/desarrolladores/[slug]/page.tsx`, statically generated
Spanish path segment (`desarrolladores`), matching the site's `lang="es"` and existing Spanish
route conventions (section ids like `proyectos`, `servicios`). Uses `generateStaticParams()` over
`content/developers.ts` so every configured profile is prerendered at build time (no client
fetch, no new dependency, fastest path for a slow-connection visitor per the performance
guidelines) and calls `notFound()` for any slug outside that set, per the profile-route spec's
not-found requirement.

**Alternative considered**: `app/perfil/[slug]`. Rejected — "perfil" is singular/generic; the
plural, specific `desarrolladores` matches how the entity is named throughout
`docs/product-context.md` ("perfil inmobiliario" = a developer's profile) and reads better for
multiple profiles.

### Template composition: reusable components under `components/profile/`
One `DeveloperProfileTemplate` component takes a single `Developer` (plus its derived added
projects) and lays out every section; the page component's only job is resolving the slug and
passing data. Sub-components, one per repeated pattern named in the proposal:

- `components/profile/ProfileHeader.tsx` — cover image, logo/name fallback, slogan, address,
  website, social row.
- `components/profile/ProfileInfoBlock.tsx` — description/mission/vision, each independently
  optional.
- `components/profile/RepresentativeBlock.tsx` — photo (with initials fallback) + name/role/quote.
- `components/profile/PressCard.tsx` + a simple grid wrapper for press notes.
- `components/profile/ProfileFooter.tsx` — the reference's distinct, developer-branded footer
  (logo, short nav, socials, "Desarrollado por Ruum"), separate from the corporate `Footer.tsx`
  since its content and visual language differ; reused by every profile via the template, so it
  clears the "used in 2+ places" bar even though it doesn't appear on the landing.

A section is only rendered when its underlying data is present (per the developer-profiles spec's
omission-over-fabrication requirements) — the template does the presence checks, not each leaf
component, so leaf components stay simple/presentational.

### Reuse the existing project card and video patterns instead of forking them
- **Project card**: `RevealGallery`'s inline `ProjectCard` becomes `components/ui/ProjectCard.tsx`
  (exported, presentational, takes `{ project, showDeveloper? }`) and is used both by
  `RevealGallery`'s carousel track and by the profile's "added projects" / "other projects" grids
  (static CSS grid there, no carousel — the reference shows a fixed 3-up row, not a scroller).
  The card has two independent link targets, **per explicit user direction (2026-08-05)**: the
  image/heading and "Ver proyecto" all navigate to the project's own `href` (its microsite —
  `https://<project>.ruumap.com/`, provided by the user for the 3 existing projects); the
  developer label navigates separately to `/desarrolladores/[developerSlug]` when that developer
  is configured. Each link only renders when its target data is present — no link to a
  fabricated destination.
- **Video**: `AboutUs.tsx`'s poster/play/pause logic (built on `useInViewport`) is extracted into
  `components/ui/VideoPlayer.tsx` (`{ video, autoPlayInView? }`) so `AboutUs` and the profile's
  video section share one implementation instead of the profile re-deriving the same behavior.
  `AboutUs` is refactored to use it (behavior-preserving) as part of this change, since the
  alternative — copy-pasting the same poster/play logic into a new section — is exactly the
  duplication `CLAUDE.md`'s reuse rule forbids once a second consumer exists.

**Alternative considered**: leave `AboutUs` untouched and duplicate its logic in the profile.
Rejected — the reuse rule in `CLAUDE.md`/`docs/product-context.md` triggers at "2+ sections", and
extracting is a small, behavior-preserving move confined to `AboutUs.tsx` + the new hook/component
files (no visual change to the landing).

### Profile visual theme is light, scoped to `components/profile/` and the new route only
**Confirmed by user (2026-08-05)**: light theme and the `/desarrolladores/[slug]` route shape are
both approved as proposed. The profile route renders inside its own root wrapper with light background/foreground utility
classes (e.g. `bg-[oklch(98%_0_0)] text-[oklch(15%_0_0)]`, reusing the existing accent token,
`--font-display`/`--font-sans`), rather than inheriting `body`'s dark `bg-background`/
`text-foreground` from `app/layout.tsx`. This is scoped to the new route's subtree — no change to
the global `@theme` tokens or to `app/layout.tsx`'s body classes, so the corporate landing is
visually untouched.

**Alternative considered**: force the profile into the landing's dark theme for visual
consistency. Rejected — the confirmed profile reference is unambiguously light-themed and
`docs/product-context.md` already frames the profile as a distinct view, not a section of the
corporate landing; matching a different, non-landing reference is exactly what
`docs/page-structure.md`'s "no redesign without authorization" rule is scoped to (it covers
landing sections) and does not block building a new, separately-referenced view to its own
reference.

### Fallbacks
- Missing logo or representative photo → a shared `getInitials(name)` helper (`lib/utils.ts`,
  alongside `cn()`) drives a plain initials badge instead of a broken `<Image>`.
- Missing optional section (video, mission/vision, other-projects, press, related links) → the
  template omits the section's block entirely (no empty heading, no placeholder copy).
- Missing developer for a project's `developerSlug` (typo or not-yet-added developer) → the
  catalog card renders without a profile link (plain, non-navigating card), never a link to a 404.
- Every image/video container reserves its aspect ratio via existing CLS-safe patterns already
  used elsewhere in the repo (`aspect-[…]`, `before:pt-[…]`), per `performance-guidelines.md`.

## Risks / Trade-offs

- **[Risk]** Extracting `AboutUs`'s video logic touches a section already verified against the
  reference (`docs/page-structure.md` marks it "implementado, verificado estáticamente").
  → **Mitigation**: the extraction is behavior-preserving (same props, same DOM/classes,
  `AboutUs.tsx` markup unchanged beyond calling the new component); re-run the existing
  verification steps (`tsc --noEmit`, `npm run build`) plus a visual diff of `AboutUs` against
  `landing-desktop.png` before considering the change done.
- **[Risk]** A light-themed route inside an otherwise all-dark app can leak dark assumptions
  (e.g. an SVG icon authored `currentColor` against a dark background, or a shared component that
  assumes `--color-foreground` is light). → **Mitigation**: profile-only components set their own
  explicit colors rather than depending on inherited dark-mode tokens; `ProjectCard`/`VideoPlayer`
  (used in both themes) are checked visually in both contexts before considering them done.
- **[Risk]** Two developers (Kohler & Weiss, SYMPRAX) reuse STTO Group's reference-derived copy
  (description/mission/vision/representative/press/other-projects) verbatim-in-structure, adapted
  only per developer name — **per explicit user direction (2026-08-05)**, replacing the original
  plan of leaving them mostly empty. Reused placeholder text could be mistaken for real,
  developer-specific content. → **Mitigation**: every reused field is marked
  `status: "provisional"` and carries a code comment in `content/developers.ts` stating it is
  placeholder copy borrowed from the STTO Group reference, not that developer's real content;
  `docs/page-structure.md` documents the same explicitly, so it reads as intentional, temporary
  scaffolding rather than fabricated developer facts.
- **[Trade-off]** Static generation (`generateStaticParams`) means adding a developer requires a
  rebuild/redeploy to appear, not an instant content update. → Accepted: matches how every other
  content change in this repo already ships (edit `content/site.ts`, redeploy) — no new
  data-fetching infrastructure is justified for three developers.

## Migration Plan

Purely additive: new route, new content module, new components, and non-breaking additions to
`Project`'s type (`developerSlug?`, `category?`, `status` — existing project entries need `status`
backfilled since it's non-optional, but that's a data edit, not a breaking API change). No
existing route, page, or exported component signature is removed. Rollback is a plain revert
(delete the new route/content/components, drop the `Project` field additions) with no data
migration to undo. `AboutUs.tsx`'s refactor to use the extracted `VideoPlayer` is the only touch
to already-shipped code; it can be reverted independently of the rest of the change if it ever
regresses the landing.
