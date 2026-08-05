## Context

See `proposal.md` - Why for motivation. Relevant current state:

- `content/site.ts` → `nav.links` stores raw `"#..."` href strings; `nav.cta` is a plain string
  (no href), so `Navbar.tsx` hardcodes `"#contacto"` twice (desktop CTA and mobile CTA).
- Section ids used as navigation targets are declared as independent string literals in four
  files: `RevealGallery.tsx` (`id="proyectos"`), `FeatureSection.tsx` (`id="servicios"`),
  `HowItWorks.tsx` (`id="proceso"`), `ClosingCTA.tsx` (`id="contacto"`) — nothing keeps these in
  sync with the hrefs in `content/site.ts`.
- `RevealGallery`, `FeatureSection`, and `ClosingCTA` already carry a `scroll-mt-24` class on
  their section root to offset the fixed header; `HowItWorks` does not.
- Lenis (`lenis@1.3.25`, via `SmoothScroll.tsx`) drives all scrolling and is wired into GSAP's
  ticker; `ScrollTrigger` scrub animations depend on Lenis staying the single scroll driver
  (see the comment in `SmoothScroll.tsx`).
- `Navbar.tsx`'s mobile drawer (`isMobileMenuOpen` state) has no `aria-expanded`/`aria-controls`,
  no `role="dialog"`/`aria-modal`, no Escape handler, no focus trap, no body scroll lock, and does
  not return focus to the trigger on close. Closing on link/CTA selection already works.
- The project has no `browserslist` field or `.browserslistrc`; the stack (Next 15, React 19)
  already assumes evergreen browsers.
- `app/globals.css` defines `--color-background: oklch(12% 0 0)` and
  `--color-surface: oklch(15% 0 0)` (both near-neutral grays) and `--color-border: oklch(28% 0 0)`
  (opaque). `Navbar.tsx` currently uses `bg-[#1A1A1C]` and `border-white/5` (a 5%-opacity white
  hairline) instead of these tokens.

## Goals / Non-Goals

**Goals:**
- One typed source of truth for section identifiers (and the header-offset value), imported by
  both the navigation config and every section it points to.
- Provisional navigation copy centralized in `content/site.ts`, clearly marked as provisional.
- A mobile drawer that is fully keyboard- and screen-reader-accessible without adding a
  dependency.
- Correct scroll behavior into every nav target, including `#proceso`, without a parallel
  hand-rolled scroll implementation.
- Header background/border pulled from existing design tokens wherever that is visually
  equivalent to the reference; otherwise left as-is and documented.

**Non-Goals:**
- Adding a "Testimonios" section or any new page section.
- Finalizing non-provisional navigation copy.
- Any visual or structural change to Hero, About Us, project cards, Stats, FeatureSection
  (content/layout), the logos section, ClosingCTA content, Footer, or real-estate profiles.
- Introducing a new design token or a third-party focus-trap/animation dependency.
- General site-wide accessibility or performance review (tracked separately).

## Decisions

**1. Centralized navigation module lives at `lib/navigation.ts`.**
`lib/` is the existing home for small shared non-content modules (`lib/utils.ts` already holds
`cn()`); the repo has no `config/` folder today. `lib/navigation.ts` exports a typed `SECTION_IDS`
registry, the derived id type, and the single header-offset value used for scroll-margin (and,
conditionally, Lenis's offset). `content/site.ts`'s `nav.links`/`nav.cta` reference `SECTION_IDS`
instead of raw `"#..."` strings; `RevealGallery`, `FeatureSection`, `HowItWorks`, and `ClosingCTA`
import the same registry for their `id` prop. *Alternative considered*: a `config/navigation.ts`
module as suggested in the proposal discussion — rejected only for not matching the existing
`lib/` convention, not for any functional reason; equally acceptable if preferred later.
*Alternative considered*: folding ids into `content/site.ts` directly — rejected because ids are
structural (needed by section components that shouldn't need to import the full content schema),
not copy.

**2. Scroll-offset for `#proceso`, and smooth scroll for nav links: resolved by reading Lenis's
source, not by guessing.**
`HowItWorks` gets the same `scroll-mt-24` treatment already used by the other three target
sections. Reading Lenis's source (`node_modules/lenis/dist/lenis.js`) during implementation
surfaced two facts the original design didn't anticipate: (a) Lenis's own anchor-click
interception is off by default (`anchors: false`) and `SmoothScroll.tsx` never opts in, so a nav
link click was producing an instant native jump rather than a smooth scroll — the spec's "smooth
scroll to target" requirement wasn't actually satisfied before this change; (b) `lenis.scrollTo()`
itself already reads the target's computed `scroll-margin-top` and subtracts it, regardless of how
it's invoked — so the CSS-vs-offset fork the original design anticipated doesn't apply once
`scrollTo` is used directly, no manual offset needed. Resolution: `Navbar.tsx` calls `useLenis()`
(exported by the already-installed `lenis/react`, no new dependency) and every nav link/CTA click
runs `lenis.scrollTo(hash)` (modifier-key and non-left clicks are left alone so new-tab etc. keep
working; `history.pushState` keeps the URL hash in sync since `preventDefault` stops the browser
doing it natively). This stays entirely inside `Navbar.tsx` — `SmoothScroll.tsx` is not touched,
keeping the change inside the file list in `proposal.md` - Impact. `NAV_OFFSET_PX` in
`lib/navigation.ts` remains as a documentation/consistency anchor (it must still match the
`scroll-mt-*` value used by the four target sections) but is not read at runtime, since
`scrollTo`'s own `scroll-margin-top` handling makes a second, manually-passed offset unnecessary.
*Alternative considered*: a hand-rolled `window.scrollTo`/`getBoundingClientRect` click handler —
rejected because it would run a second scroll mechanism alongside Lenis, risking exactly the
desync `SmoothScroll.tsx`'s own comment warns about. *Alternative considered*: enabling
`anchors: true` globally in `SmoothScroll.tsx` — rejected in favor of a scoped handler in
`Navbar.tsx`, since it would change scroll behavior for any other anchor link on the site, not
just navigation, and would touch a file outside this change's declared scope.

**3. Drawer accessibility is hand-rolled; no focus-trap dependency.**
- `aria-expanded` bound to the existing `isMobileMenuOpen` state; `aria-controls` pointing at the
  panel's `id`.
- Panel gets `role="dialog"` and `aria-modal="true"`.
- A `keydown` listener scoped to the open panel closes on Escape and cycles Tab/Shift+Tab across
  the panel's focusable elements (queried at open time), so focus can't leave the panel.
- `inert` is applied to the main content while the drawer is open, as a second, reinforcing layer
  — justified because the project has no declared browser floor and Next 15/React 19 already
  assume evergreen browsers, where `inert` is Baseline-supported. It is not the only mechanism:
  the keydown-based containment above works independent of `inert` support.
- Body scroll lock via toggling `overflow: hidden` on `<html>`/`<body>` in an effect tied to
  `isMobileMenuOpen`, reverted on close/unmount.
- Focus returns to the trigger button on every close path (Escape, overlay click, close button,
  link/CTA selection — the last already closes the drawer today, it just needs to also restore
  focus).
*Alternative considered*: a focus-trap library (e.g. `focus-trap-react`) — rejected, no new
dependencies allowed.

**4. Token substitution decided by exact color comparison, not assumed — outcome: keep both
current values.**
At implementation time, an exact sRGB→OKLab conversion (not the rough manual estimate from the
original exploration) was run for `bg-[#1A1A1C]` against `--color-surface` (`oklch(15% 0 0)`),
and for `border-white/5` composited over `--color-background` against `--color-border`
(`oklch(28% 0 0)`). Result: `#1A1A1C` has an OKLab lightness of ≈22%, clearly lighter than
`--color-surface`'s ≈15% (renders as `#0b0b0b` vs. the header's current `#1a1a1c` — roughly 2.4×
the RGB value per channel, a perceptible difference, not the near-match the original exploration
assumed from a less precise manual calculation). `border-white/5` composited over the background
renders as a barely-there `~#121212`, while `border-border` renders as a solidly opaque
`~#292929` — clearly more prominent. Neither shared token is visually equivalent, so both current
values are kept as-is, with a code comment in `Navbar.tsx` recording the comparison and the
reasoning. No new token is created.

**5. Provisional content is marked with a code comment, not a UI badge.**
`content/site.ts`'s `nav` block gets a comment noting the labels/CTA text are provisional pending
confirmed copy from the reference, and that "Testimonios" is intentionally absent pending a built
section. No visible "draft" indicator is added to the rendered page.

## Risks / Trade-offs

- **Lenis's anchor scroll may not honor `scroll-margin-top`** → Resolved by reading Lenis's
  source: `scrollTo()` reads it automatically. The bigger finding was that Lenis wasn't
  intercepting anchor clicks at all (`anchors: false` by default) — `Navbar.tsx` now calls
  `lenis.scrollTo()` directly via `useLenis()` for every nav link/CTA.
- **`HowItWorks`'s pinned/scaled `ScrollTrigger` sequence may behave unexpectedly when reached by
  a direct anchor jump instead of incremental scroll** → Manual QA matrix (desktop + mobile, cold
  load + from another section, via the mobile menu) before closing the change; a targeted
  `ScrollTrigger` fix (e.g. a refresh call) is added only if the matrix surfaces a real issue.
- **`inert` browser support** → No `browserslist`/`engines` configured; Next 15 + React 19 already
  assume evergreen browsers, where `inert` is Baseline. Used only as a reinforcing layer — the
  keydown-based focus containment is the primary mechanism and doesn't depend on `inert`.
- **Token swap could introduce a subtle visual regression** → Resolved: an exact OKLab comparison
  showed neither `bg-surface` nor `border-border` is visually equivalent to the header's current
  values, so no swap was made; both current values are kept and documented in `Navbar.tsx`.
- **Centralizing section ids touches four files beyond `Navbar.tsx`** → Scope is limited strictly
  to the `id` attribute in those files; no other prop, layout, or animation logic is touched.
