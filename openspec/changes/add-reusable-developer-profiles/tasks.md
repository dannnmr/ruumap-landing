## 1. Data model

- [x] 1.1 In `content/site.ts`, extend `Project` with `developerSlug?: string` (replacing the
      unused `slug?` field and its outdated comment), `category?: string`, and a required
      `status: "provisional" | "confirmed"`, each documented per `design.md` - Decisions -
      "Data model".
- [x] 1.2 Create `content/developers.ts` exporting the `Developer`, `SocialLink`, `PressNote`,
      `RelatedLink`, `Representative`, and `OtherProjectRef` types plus a `developers: Developer[]`
      collection, per the shape in `design.md` - Decisions - "Data model".
- [x] 1.3 Add a `getInitials(name: string): string` helper to `lib/utils.ts` for the logo/photo
      fallback (design.md - Decisions - "Fallbacks").

## 2. Extract shared presentational primitives

- [x] 2.1 Extract `RevealGallery.tsx`'s inline `ProjectCard` into
      `components/ui/ProjectCard.tsx` (exported, presentational, `{ project, showDeveloper? }`),
      preserving its current markup/classes exactly; update `RevealGallery.tsx` to import and use
      it with no visual change.
- [x] 2.2 Extract `AboutUs.tsx`'s poster/play/pause video logic (built on `useInViewport`) into
      `components/ui/VideoPlayer.tsx` (`{ video, autoPlayInView? }`); update `AboutUs.tsx` to use
      it with no visual or behavioral change (same DOM structure, same `preload="none"`, same
      pause-on-scroll-away behavior).
- [x] 2.3 Verify `AboutUs.tsx` still matches `docs/references/landing-desktop.png` after the
      extraction (markup/classes unchanged) and that `Hero.tsx`'s own video handling is
      unaffected (it keeps its separate reduced-motion/autoplay behavior, per
      `docs/page-structure.md`).

## 3. Profile route

- [x] 3.1 Add `app/desarrolladores/[slug]/page.tsx`: resolve the developer from
      `content/developers.ts` by slug, call `notFound()` when no match exists, and derive that
      developer's "added projects" from `content/site.ts`'s `Project[]` by matching
      `developerSlug`.
- [x] 3.2 Implement `generateStaticParams()` on the route from `content/developers.ts` so every
      configured profile is statically generated at build time (design.md - Decisions -
      "Routing").
- [x] 3.3 Set the route's `generateMetadata`/`Metadata` (title/description) from the resolved
      developer's `name`/`slogan`, with a sane fallback when `slogan` is unset.

## 4. Profile template and section components

- [x] 4.1 Create `components/profile/DeveloperProfileTemplate.tsx`: takes a `Developer` and its
      derived added-projects list, applies the light, profile-scoped theme wrapper (design.md -
      Decisions - "Profile visual theme"), and composes the sections below, each rendered only
      when its underlying data is present (per the `developer-profiles` spec's omission
      requirements).
- [x] 4.2 Create `components/profile/ProfileHeader.tsx`: cover image, logo (with initials
      fallback via `getInitials`), name, slogan, address, website, social row — each optional
      field omitted individually when unset.
- [x] 4.3 Create `components/profile/ProfileInfoBlock.tsx`: description/mission/vision, each
      independently optional.
- [x] 4.4 Create `components/profile/RepresentativeBlock.tsx`: representative name/role/quote,
      photo with initials fallback when absent.
- [x] 4.5 Create `components/profile/PressCard.tsx` and its grid wrapper for `pressNotes`; omit
      the whole section when a developer has none.
- [x] 4.6 Wire "added projects" and "other projects" as two independent, omit-when-empty grid
      sections inside the template, both using `components/ui/ProjectCard.tsx` from group 2 (the
      "other projects" grid uses `OtherProjectRef`, which has no `href`, so its cards never render
      a "Ver proyecto" action).
- [x] 4.7 Create `components/profile/ProfileFooter.tsx` (developer logo/name, short nav, socials,
      "Desarrollado por Ruum" line) and use it at the bottom of
      `DeveloperProfileTemplate.tsx`, per `docs/references/perfil.desarrollador.inmobiliario.png`.
- [x] 4.8 Wrap the video section in `components/ui/VideoPlayer.tsx` from group 2; omit the section
      entirely when the developer has no `video`.

## 5. Content population

- [x] 5.1 Populate STTO Group's entry in `content/developers.ts` richly, matching everything
      observable in `docs/references/perfil.desarrollador.inmobiliario.png` (slogan, description,
      mission, vision, representative, 3 press notes, "otros proyectos"), `status: "confirmed"`
      where the reference confirms a field, `"provisional"` otherwise.
- [x] 5.2 Populate Kohler & Weiss Real Estate Development and SYMPRAX in `content/developers.ts`
      by replicating the same field structure and reference-derived placeholder copy used for
      STTO Group in 5.1 (description/mission/vision/representative/press notes/other-projects
      pattern), adapted per developer name — **user direction 2026-08-05**: reuse the design
      reference's content for every existing project rather than leaving these two mostly empty,
      since it's placeholder content to be swapped for real developer info later. Every field
      populated this way is `status: "provisional"` and documented with a code comment noting it
      is placeholder text copied from the STTO Group reference, not that developer's real content.
- [x] 5.3 Update the three existing project entries in `content/site.ts`'s `revealGallery.projects`
      with `developerSlug` (matching the developers added in 5.1/5.2), `status: "confirmed"`, and
      leave `category` unset (no visible category element observed in any reference, per
      design.md).

## 6. Landing integration

- [x] 6.1 Update `components/ui/ProjectCard.tsx` (or `RevealGallery.tsx`'s usage of it) so the
      card links to `/desarrolladores/[developerSlug]` when the project has a `developerSlug` that
      resolves to a configured developer, and renders as a plain, non-navigating card otherwise —
      per the modified `project-catalog` spec's "Catalog card navigates to the project's developer
      profile" requirement.
- [x] 6.2 Confirm the existing "Ver proyecto" interactive/inactive rule in `ProjectCard` is
      unchanged and applies identically inside the profile's project grids (group 4.6) — no
      per-context special-casing.
- [x] 6.3 **Follow-up, user direction 2026-08-05**: split the card's two link targets — the
      developer label now navigates to the developer's profile (previously the image/heading did);
      the image/heading now join "Ver proyecto" in navigating to the project's own `href` instead.
      Populated the 3 existing projects' real `href` in `content/site.ts`
      (`itagua.ruumap.com`/`buenretiro.ruumap.com`/`artemis.ruumap.com`) — no longer provisional
      placeholders. Updated `specs/project-catalog/spec.md` and `design.md` to match.

## 7. Accessibility and performance

- [x] 7.1 Confirm every image/video container in the new `components/profile/` components
      reserves its aspect ratio before load (same `aspect-[…]`/`before:pt-[…]` pattern used
      elsewhere in the repo) to avoid CLS, per `docs/performance-guidelines.md`.
- [x] 7.2 Confirm `components/ui/VideoPlayer.tsx` never autoplays under any circumstance — same as
      `AboutUs.tsx`'s pre-extraction behavior, it is user-initiated only, so `prefers-reduced-motion`
      is inherently respected without needing `usePrefersReducedMotion` (unlike `Hero.tsx`, which
      autoplays and does need that hook — out of scope here, untouched). Keeps `preload="none"`
      with a poster.
- [x] 7.3 Confirm no new image domain is needed (`next.config.ts`'s `images.remotePatterns`) —
      profile content in this change only reuses `images.unsplash.com` sources already
      allowlisted; add a domain only if a genuinely new source is used and note it here.
      Verified: `git diff` on `next.config.ts` is empty.
- [x] 7.4 Confirm no new dependency was added to `package.json` anywhere in this change.
      Verified: `git diff` on `package.json`/`package-lock.json` is empty.

## 8. Documentation

- [x] 8.1 Update `docs/page-structure.md`'s "Perfiles inmobiliarios" section: replace the
      "explicitly pending" note with the implemented route (`/desarrolladores/[slug]`), the data
      model location (`content/developers.ts`, extended `Project`), and the current state of the
      three populated developers — all three carry the same reference-derived placeholder content
      pattern (adapted from `perfil.desarrollador.inmobiliario.png`), explicitly flagged as
      provisional pending each developer's real info.

## 9. Validation

- [x] 9.1 Run `npm run lint`. `next lint` is not configured in this repo (pre-existing condition,
      documented previously in this same doc for prior changes — confirmed by the interactive
      ESLint setup prompt it shows instead of running); not addressed here, out of this change's
      scope.
- [x] 9.2 Run `npx tsc --noEmit` and `npm run build`. Both clean; `npm run build` statically
      generated all 3 profile routes (`/desarrolladores/stto-group`, `/kohler-weiss`, `/symprax`).
- [x] 9.3 Visually reviewed (headless Edge screenshots via the local dev server) the STTO Group
      and Kohler & Weiss profiles against `docs/references/perfil.desarrollador.inmobiliario.png`
      — header, video, info/mission/vision, representative, added/other projects all match the
      reference's structure; initials fallback ("SG"/"KD") renders correctly since no real logo
      exists. Landing catalog cards verified via rendered HTML (GSAP ScrollTrigger reveal
      animations make a static headless screenshot show them pre-animation, so DOM inspection was
      used instead) — all 3 cards render with correct name/developer/location and a working
      `/desarrolladores/[slug]` link.
- [x] 9.4 Verified: `/desarrolladores/does-not-exist` renders the not-found fallback (fixed a
      `min-h-[60vh]` → `min-h-screen` bug found during this check, where short content left the
      dark site background visible below the fold). All 3 existing projects currently resolve a
      developer, so the "no resolvable `developerSlug`" catalog-card path was verified by code
      review of `RevealGallery.tsx`'s `toCardData` (falls back to `profileHref: undefined`) rather
      than a live example — no project in `content/site.ts` currently exercises it.
