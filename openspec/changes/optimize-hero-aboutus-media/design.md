## Context

See `proposal.md` - Why for motivation. Relevant current state:

- `Hero.tsx` hardcodes `<source src="https://assets.mixkit.co/videos/49806/49806-720.mp4">`
  directly in JSX — not sourced from `content/site.ts` at all.
- `siteContent.about.video` already has `{ src, poster }`, but `poster` is `""` and `AboutUs.tsx`
  never reads it — the `<video>` has no `poster` attribute.
- Both sections currently point at the exact same 4.5MB placeholder video file.
- `siteContent.hero.backgroundImages` (3 Unsplash images, typed `SiteImage[]`) is declared but
  consumed by no component (confirmed by repo-wide search) — dead content.
- Neither section has any layout-shift risk today: the Hero is `h-screen` with the video
  `absolute inset-0`; About Us already reserves its 16:9 box via `before:pt-[56.25%]`. Both are
  preserved as-is.
- No `prefers-reduced-motion` handling and no `IntersectionObserver` usage exist anywhere in the
  repo (confirmed by repo-wide search) — this change introduces the first instances of both.
- `Hero.tsx`'s only animation (`useTextReveal`) touches the headline/CTAs, not the video — no
  coupling to unwind.
- `next.config.ts` only allowlists `images.unsplash.com` for `next/image`; the reused poster
  image is already an `images.unsplash.com` URL, so no config change is needed.
- The product owner explicitly declined connection-speed detection (uneven browser support — the
  `navigator.connection` API doesn't exist in Safari/Firefox) and a mobile-specific video source
  (no real asset for it yet) for this change.

## Goals / Non-Goals

**Goals:**
- Video and its fallback image, for both sections, come from one centralized, typed content shape
  — replacing either later is a content edit, not a component change.
- A real fallback is visible before the video renders its first frame, in both sections.
- The Hero does not autoplay video when `prefers-reduced-motion: reduce` is set.
- Both videos pause when their section leaves the viewport; the Hero resumes automatically on
  return (ambient, always-on), About Us does not (playback stays user-initiated only).
- No dead content left in `content/site.ts`.
- Zero new dependencies.

**Non-Goals:**
- A shared video UI component for Hero and About Us (see Decision 1).
- Connection-speed-based video skipping (declined by the product owner).
- A mobile-specific video source field (declined by the product owner).
- A pixel-accurate poster (e.g. an extracted first frame of the actual video) — the reused
  Unsplash image is a deliberate placeholder, matching the video itself being provisional.
- Any change to Navbar, Statement, Stats, FeatureSection, HowItWorks, RevealGallery, ClosingCTA,
  logos, Footer, or real-estate profiles.

## Decisions

**1. No shared video component — a shared content type plus two generic hooks.**
The Hero's video is ambient background (autoplay, loop, no visible controls, LCP-relevant); About
Us's is an interactive foreground player (click-to-play, custom play/pause button, not
LCP-relevant). Forcing both through one component would need enough conditional props
(`isBackground`, `showControls`, `autoplay`, `fullBleed`...) to effectively rebuild two components
behind a confusing shared interface. Instead:
- A `SiteVideo` type in `content/site.ts` (data shape only, no behavior) — see Decision 2.
- `hooks/usePrefersReducedMotion.ts` — a generic hook with zero video awareness, reading
  `matchMedia('(prefers-reduced-motion: reduce)')` and subscribing to changes. Reusable beyond
  this change for the reduced-motion gap already tracked as pending in
  `docs/performance-guidelines.md` for other sections' GSAP animations.
- `hooks/useInViewport.ts` — a generic `IntersectionObserver` wrapper returning a boolean, with no
  video awareness either (takes a ref, returns whether it's intersecting). Each component decides
  what to do with that boolean, which is what lets Hero and About Us have different resume
  behavior without a shared "video hook" needing a resume-policy flag. This hook's genericness also
  matches the existing pending guidance in `docs/performance-guidelines.md` about deferring heavy
  resources (3D/tours) until near-viewport — future work there can reuse it.
*Alternative considered*: a single `<VideoBackground>`/`<VideoPlayer>` component parametrized by
props — rejected for the reasons above.
*Alternative considered*: one combined `useVideoViewportAutoplay` hook that directly calls
`.play()`/`.pause()` — rejected in favor of the plain boolean-returning `useInViewport`, because
baking a specific resume policy into the hook would require a parameter anyway once Hero and
About Us need different behavior, and a plain boolean is easier to reason about at each call site.

**2. `SiteVideo` content shape reuses the existing `SiteImage` type for its poster.**
```
export type SiteVideo = {
  src: string;
  poster: SiteImage; // { src, alt } — same shape already used everywhere else for images
};
```
`siteContent.hero.video` and `siteContent.about.video` both become `SiteVideo`. This matches the
file's existing convention (`Project`, `Feature`, `Step` all nest a `SiteImage` for their image)
instead of inventing parallel `posterSrc`/`posterAlt` fields.

**3. Poster source: reuse one of the three existing (now-dead) Hero images, shared by both
sections.**
`siteContent.hero.backgroundImages[0]` (the "Arquitectura nocturna abstracta..." Unsplash image)
becomes the `poster` for both `hero.video` and `about.video`. The other two entries, and the
`backgroundImages` field itself, are removed — nothing is invented, and since both sections
currently show the identical placeholder video, sharing one placeholder poster is more consistent
than arbitrarily assigning two different images to the same footage.
*Alternative considered*: extract a real first frame from the current video file (e.g. via
`ffmpeg`) for a pixel-accurate poster — explicitly declined by the product owner for this
provisional phase; revisit once real video assets arrive.

**4. Reduced-motion behavior: the Hero renders a plain optimized image instead of mounting
`<video>` at all — not a paused/muted video with a hidden play control.**
When `usePrefersReducedMotion()` is `true`, `Hero.tsx` renders `<Image src={poster.src}
alt={poster.alt} fill priority>` and never mounts the `<video>` element — zero network/decode cost
for those visitors, and it directly satisfies the spec's "static fallback image... shown instead."
*Alternative considered*: mount the video with `autoplay={false}` and add a manual play control —
rejected as new UI scope; the Hero has no playback control today and adding one solely for this
edge case wasn't requested.

**5. Poster wiring differs by how long it's likely to be the only thing visible.**
- **Hero, normal path** (video mounted): native `<video poster={poster.src}>` — the poster only
  needs to bridge the brief gap before the first frame paints, so the native attribute is
  sufficient without extra markup.
- **Hero, reduced-motion path** (no video mounted): `next/image` with `priority` (Decision 4) —
  this could be the only thing that visitor ever sees in the Hero, so it deserves full image
  optimization and LCP treatment.
- **About Us**: always the native `<video poster={poster.src}>` attribute — it's below the fold,
  never LCP-relevant, and reduced-motion doesn't change its behavior (it never autoplayed anyway).
*Alternative considered*: always render a `next/image` layer behind the video regardless of state
— rejected as unneeded complexity (extra DOM layer, crossfade/z-index bookkeeping) for a gap that,
in the common case, is brief.

**6. `preload` set explicitly instead of left at the browser default.**
- Hero (when video is mounted): default browser handling for `autoplay` content is left as-is
  (no explicit `preload` override) — autoplay already drives loading behavior across browsers.
- About Us: `preload="none"` — it's click-to-play and below the fold, so nothing should be
  fetched until the visitor presses play.

## Risks / Trade-offs

- **The reused placeholder image doesn't visually match the current placeholder video's actual
  first frame** → Accepted deliberately for this provisional phase (frame extraction was
  considered and declined). Limited exposure in practice: a mid-playback stall freezes the last
  decoded frame rather than reverting to the poster, so the only visible mismatch window is the
  brief moment before the video's first frame ever paints — and both video and poster get replaced
  together later.
- **No connection-speed detection** → Accepted trade-off; the underlying API doesn't exist in
  Safari/Firefox, so any implementation would help only Chromium-based browsers unevenly. Declined
  rather than partially solved.
- **`IntersectionObserver` threshold choice could cause premature pause/resume right at a
  section's boundary** → Mitigate with a modest threshold/rootMargin and manual testing during
  implementation; not over-engineered with hysteresis or debouncing unless testing shows it's
  actually needed.
- **Reduced-motion visitors permanently lose the Hero video with no way to opt back in** →
  Accepted; consistent with there being no playback control in the Hero today (Decision 4).
- **Same poster image in two sections could read as repetitive** to a visitor who scrolls past
  both → Minor, accepted; both are provisional and get replaced together later.
