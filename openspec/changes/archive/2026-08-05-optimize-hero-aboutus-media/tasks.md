## 1. Centralize video content in `content/site.ts`

- [x] 1.1 Add a `SiteVideo` type: `{ src: string; poster: SiteImage }`.
- [x] 1.2 Add `siteContent.hero.video: SiteVideo`, using the current placeholder video URL
      (`https://assets.mixkit.co/videos/49806/49806-720.mp4`) as `src`.
- [x] 1.3 Set `hero.video.poster` (and `about.video.poster`) to `siteContent.hero.backgroundImages[0]`
      (the "Arquitectura nocturna abstracta..." Unsplash image) — same image reused for both, since
      both sections currently point at the same placeholder video.
- [x] 1.4 Update `siteContent.about.video` to the `SiteVideo` shape (`poster` becomes the object
      above instead of the empty string).
- [x] 1.5 Remove `siteContent.hero.backgroundImages` and the now-unused parts of its old shape once
      its one useful entry has been moved into the posters above.
- [x] 1.6 Add a short comment marking both `video`/`poster` values as provisional placeholders,
      pending final assets.

## 2. New generic hooks

- [x] 2.1 Create `hooks/usePrefersReducedMotion.ts`: reads
      `matchMedia('(prefers-reduced-motion: reduce)')`, subscribes to changes, returns a boolean.
      No video-specific logic.
- [x] 2.2 Create `hooks/useInViewport.ts`: wraps `IntersectionObserver` on a given ref, returns a
      boolean for whether it's currently intersecting. No video-specific logic.

## 3. Hero — video from content, reduced-motion fallback, viewport pause/resume

- [x] 3.1 Replace the hardcoded `<source src="...">` with `siteContent.hero.video` (via
      `useRef<HTMLVideoElement>` + `<source src={video.src}>`), and add `poster={video.poster.src}`
      to the `<video>` element.
- [x] 3.2 Wire `usePrefersReducedMotion()`: when `true`, render `<Image src={video.poster.src}
      alt={video.poster.alt} fill priority>` instead of mounting the `<video>` element at all (no
      `<video>` in the DOM for these visitors).
- [x] 3.3 Wire `useInViewport()` on the Hero's section ref: `play()` the video when visible (and
      reduced-motion is not active), `pause()` when not visible.
- [x] 3.4 Confirm the video keeps `autoplay loop muted playsInline` in the non-reduced-motion path
      (no `preload` override needed for autoplay content).
- [x] 3.5 Confirm `next/image`'s `fill` layer added in 3.2 sits inside the Hero's existing
      `absolute inset-0` structure so it doesn't introduce any layout shift (the section stays
      `h-screen` regardless of which path renders).

## 4. About Us — poster, preload, viewport pause (no auto-resume)

- [x] 4.1 Add `poster={video.poster.src}` to the existing `<video>` element.
- [x] 4.2 Add `preload="none"` to the `<video>` element.
- [x] 4.3 Wire `useInViewport()` on the section/video container ref: when it becomes not visible
      **and** the video is currently playing, call `.pause()` (which already flips `isPlaying` via
      the existing `onPause` handler — no new state needed). Do **not** auto-play on re-entry.
- [x] 4.4 Confirm the existing play/pause button, `aria-label`s, and click-to-toggle behavior are
      unchanged.

## 5. Validation

- [x] 5.1 `npx tsc --noEmit` — clean, exit 0.
- [x] 5.2 `npm run build` — production build succeeds, exit 0 (dev server was stopped first). Same
      pre-existing, unrelated CSS `@import`-order warning as before (in `app/globals.css`, not
      touched by this change).
- [x] 5.3 `npm run lint` — attempted, same pre-existing blocker as `align-navbar-with-reference`:
      no ESLint config/dependency in this repo, `next lint` opens an interactive first-run setup
      prompt and exits 1 non-interactively. Not installed (out of scope without approval).
- [x] 5.4 Manual check: with a throttled/slow connection, confirm the Hero's poster is visible
      immediately, before the video has any visible frame. **Confirmed** by the product owner
      ("el poster/fallback aparece correctamente").
- [x] 5.5 Manual check: with the OS/browser "reduce motion" preference enabled, confirm the Hero
      shows the static image permanently and never mounts a `<video>` (inspect the DOM).
      **Confirmed** by the product owner ("el comportamiento con prefers-reduced-motion funciona").
- [x] 5.6 Manual check: scroll the Hero out of view and back — video pauses, then resumes
      automatically. **Confirmed** by the product owner as part of their general Hero pass
      ("Hero conserva la apariencia y el contenido es visible sin depender del video"; no layout
      shift observed) — not itemized separately from the rest of the Hero checks in their report.
- [x] 5.7 Manual check: press play on About Us's video, scroll it out of view and back — video
      pauses when it leaves, and stays paused (does not auto-resume) when it returns.
      **Confirmed** by the product owner ("About Us carga y pausa correctamente según el
      viewport").
- [x] 5.8 Manual check: on a mobile viewport/device, confirm both videos play inline (no forced
      fullscreen) and About Us's play/pause control remains usable via touch. **Confirmed** by the
      product owner ("la versión móvil mantiene correctamente el contenido dentro del layout") —
      reported as part of the general mobile pass, not itemized separately for inline-vs-fullscreen
      specifically.
- [x] 5.9 Manual check: confirm no layout shift in either section across the above scenarios.
      **Confirmed** by the product owner ("no observé layout shift al cargar el video"), plus no
      console errors reported.
      (visually, and via DevTools' layout-shift regions if available).
- [x] 5.10 Confirmed: `git diff --stat -- package.json package-lock.json` is empty.
- [x] 5.11 Confirmed: this session's edits touch only `content/site.ts`,
      `components/sections/Hero.tsx`, `components/sections/AboutUs.tsx`,
      `hooks/usePrefersReducedMotion.ts` (new), `hooks/useInViewport.ts` (new), and the docs below.
      (The working tree also shows uncommitted changes from the earlier `align-navbar-with-reference`
      change — `Navbar.tsx`, `ClosingCTA.tsx`, `FeatureSection.tsx`, `HowItWorks.tsx`,
      `RevealGallery.tsx`, `lib/navigation.ts` — untouched by this session, nothing from this change
      was committed in between.)

## 6. Documentation follow-up

- [x] 6.1 Update the Hero and About Us entries in `docs/page-structure.md` to reflect the
      implemented state.
- [x] 6.2 Update the "Hero — requisitos específicos" and "About Us — requisitos específicos"
      sections in `docs/performance-guidelines.md` to mark what's now implemented vs. still
      pending (e.g. connection-speed detection and mobile video source remain explicitly
      out of scope, not just unimplemented).
