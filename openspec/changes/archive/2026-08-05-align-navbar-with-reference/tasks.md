## 1. Centralized navigation module

- [x] 1.1 Create `lib/navigation.ts` exporting a typed `SECTION_IDS` registry (`proyectos`,
      `servicios`, `proceso`, `contacto`) and its derived id type.
- [x] 1.2 Add a single shared header-offset constant in `lib/navigation.ts`, to back both the
      scroll-margin value used in task 4 and Lenis's `offset` option if task 4 ends up needing it.
- [x] 1.3 Document "Testimonios" as pending in `lib/navigation.ts` (comment only) — no id entry,
      since no section exists for it yet.

## 2. Centralize navigation content in `content/site.ts`

- [x] 2.1 Update `siteContent.nav.links` to reference `SECTION_IDS` instead of raw `"#..."`
      strings, with labels "Proyectos" → `proyectos`, "Servicios" → `servicios`, "Cómo funciona" →
      `proceso`.
- [x] 2.2 Change `nav.cta` from a plain string to `{ label, target }`, set to `{ label: "Hablemos",
      target: SECTION_IDS.contacto }`.
- [x] 2.3 Add a code comment marking the nav labels and CTA text as provisional, pending confirmed
      copy from the visual reference.

## 3. Wire section ids to the centralized source

- [x] 3.1 `RevealGallery.tsx`: replace `id="proyectos"` with `id={SECTION_IDS.proyectos}`.
- [x] 3.2 `FeatureSection.tsx`: replace `id="servicios"` with `id={SECTION_IDS.servicios}`.
- [x] 3.3 `HowItWorks.tsx`: replace `id="proceso"` with `id={SECTION_IDS.proceso}`.
- [x] 3.4 `ClosingCTA.tsx`: replace `id="contacto"` with `id={SECTION_IDS.contacto}`.
- [x] 3.5 Confirm no `id="..."` string literal for these four sections remains anywhere outside
      `lib/navigation.ts`.

## 4. `HowItWorks` scroll offset

- [x] 4.1 Add the same scroll-margin-top offset treatment already used by `RevealGallery`,
      `FeatureSection`, and `ClosingCTA` to `HowItWorks`'s section root, sized from the shared
      offset constant from task 1.2.
- [x] 4.2 Verified by reading Lenis's source (`node_modules/lenis/dist/lenis.js`) rather than a
      live click — no headless-browser tool is available in this environment (see session notes).
      Finding: Lenis's own anchor-click interception is **off by default** (`anchors: false`) and
      `SmoothScroll.tsx` never enables it, so today a nav link click produces an instant native
      jump, not a smooth scroll — the "smooth scroll to target" spec requirement was not actually
      met before this change. Separately, `lenis.scrollTo()` itself *does* read the target's
      computed `scroll-margin-top` automatically (confirmed in source), so the offset question
      from the original design is moot once `scrollTo` is used directly.
- [x] 4.3 Implemented via `useLenis()` (from `lenis/react`, already available — no new dependency)
      inside `Navbar.tsx`: a shared `handleNavClick` calls `lenis.scrollTo(hash)` on every nav
      link/CTA click (ignoring modifier-key/non-left clicks so new-tab etc. still work), with
      `history.pushState` to keep the URL hash in sync since `preventDefault` stops the browser
      from doing it natively. No manual offset is passed — `scrollTo` already reads
      `scroll-margin-top`, so `NAV_OFFSET_PX` stays as a documentation/consistency anchor only, not
      a second hardcoded number actually read at runtime. **Scope note**: this touches only
      `Navbar.tsx`, not `SmoothScroll.tsx`, so it stays within the file list in `proposal.md` -
      Impact.

## 5. Navbar: links, CTA, and rendering

- [x] 5.1 Update `Navbar.tsx`'s desktop nav to render `siteContent.nav.links` with the confirmed
      labels and centralized targets.
- [x] 5.2 Update both the desktop and mobile CTA buttons to consume `{label, target}` from
      `siteContent.nav.cta` — remove both hardcoded `"#contacto"` occurrences.
- [x] 5.3 Confirm "Testimonios" does not render anywhere in the nav (desktop or mobile).

## 6. Navbar: mobile drawer accessibility

- [x] 6.1 Add `aria-expanded` to the hamburger trigger, bound to `isMobileMenuOpen`.
- [x] 6.2 Add `aria-controls` on the trigger pointing to the drawer panel's `id`; add that `id` to
      the panel.
- [x] 6.3 Add `role="dialog"` and `aria-modal="true"` to the drawer panel.
- [x] 6.4 Add a `keydown` handler, scoped to the open panel, that closes the drawer on Escape.
- [x] 6.5 Add Tab/Shift+Tab cycling across the panel's focusable elements so focus cannot leave it
      while open.
- [x] 6.6 Apply `inert` to the main page content while the drawer is open, as a secondary
      reinforcement (confirmed acceptable per design.md — no `browserslist`/`engines` restricting
      it). Also applied `inert` to the drawer's own subtree while it is closed, so its off-screen
      links aren't reachable by Tab.
- [x] 6.7 Lock `<html>`/`<body>` scroll while the drawer is open; restore it on close/unmount.
- [x] 6.8 Return focus to the trigger button on every close path (Escape, overlay click, close
      button, link/CTA selection).
- [x] 6.9 Confirm closing on link/CTA selection (already implemented today) still works correctly
      after the above changes.

## 7. Navbar: visual tokens

- [x] 7.1 Compare `bg-[#1A1A1C]` vs. `bg-surface`. Done via exact sRGB→OKLab conversion (no
      headless-browser screenshot tool is available in this environment — see session notes below)
      rather than a rendered side-by-side: `#1A1A1C` ≈ 22% OKLab lightness vs. `bg-surface`'s 15%
      (`#0b0b0b`) — a clearly perceptible difference, not a match. **Kept `bg-[#1A1A1C]` as-is.**
- [x] 7.2 Compare `border-white/5` vs. `border-border` the same way: `border-white/5` composited
      over the background renders ≈`#121212`, while `border-border` renders as an opaque ≈`#292929`
      — clearly more prominent. **Kept `border-white/5` as-is.** Both outcomes documented with a
      comment in `Navbar.tsx` above the `<header>`.
- [x] 7.3 Confirmed no new color token was introduced in `app/globals.css` (unchanged).

## 8. Validation

> **Session note**: this environment has no headless-browser tool (`chromium-cli` isn't
> installed; installing Playwright/Puppeteer would mean adding new tooling without approval, which
> the project's "no dependencias nuevas" rule gates). 8.1–8.6 and 8.9 needed an actual browser and
> could not be run from this session directly — the product owner ran them manually against the
> dev server this session started, and reported the results below (2026-08-05). What *could* be
> verified without a browser (dev server boot, SSR output, `tsc`, Lenis's source) was verified
> separately and is noted in the tasks themselves.

- [x] 8.1 Manually tested navigation to `#proceso` on desktop (cold load with `#proceso` in the
      URL, and via a click from another section) — **confirmed working** by the product owner.
- [x] 8.2 Repeated 8.1 on a mobile viewport — **confirmed working** by the product owner.
- [x] 8.3 Manually tested opening the mobile menu, clicking "Cómo funciona", the menu closing, and
      the resulting scroll landing correctly — **confirmed working** by the product owner.
- [x] 8.4 Verified: the section is not hidden under the Navbar, `HowItWorks`'s animation and
      `ScrollTrigger` continue working correctly after navigating directly into the section, and
      no console errors were observed — **confirmed** by the product owner.
- [x] 8.5 Not needed — no issue surfaced in 8.1–8.4, so no `ScrollTrigger` fix was added.
- [x] 8.6 Full keyboard-only pass — **confirmed working** by the product owner: drawer opens/closes
      correctly, closes on link selection, Escape closes it, focus returns to the trigger button,
      background scroll is locked while open, and keyboard navigation works throughout.
- [x] 8.7 `npm run lint` re-confirmed blocked by a pre-existing repo condition (re-ran on
      2026-08-05, same result): no ESLint config or dependency exists in this repo at all —
      `next lint` opens an interactive "how would you like to configure ESLint?" first-run setup
      prompt and exits 1 non-interactively. Installing/scaffolding ESLint now would be a new
      dependency, out of scope for this change without explicit approval — not done. Ran instead,
      both clean with exit 0: `npx tsc --noEmit`, and `npm run build` (production build succeeds,
      compiles, type-checks, and statically generates all routes with no errors). `next build`'s
      own "Linting and checking validity of types" step also completed without error. One
      pre-existing warning surfaced during the build, unrelated to this change: `app/globals.css`
      has `@import url('...fonts.cdnfonts.com...')` after other rules, which CSS requires to
      precede all rules besides `@charset`/`@layer` — `app/globals.css` is not part of this
      change's file list and was not modified.
- [x] 8.8 Confirmed: `git diff --stat -- package.json package-lock.json` is empty.
- [x] 8.9 Visual review of the full Navbar (desktop and mobile) against
      `docs/references/landing-desktop.png` — **confirmed** by the product owner: the Navbar's
      appearance matches the reference correctly.
- [x] 8.10 Confirmed via `git status`/`git diff --stat`: only `components/sections/Navbar.tsx`,
      `content/site.ts`, `lib/navigation.ts` (new), and the `id` line of `RevealGallery.tsx`,
      `FeatureSection.tsx`, `HowItWorks.tsx` (id + scroll-mt), `ClosingCTA.tsx` changed — exactly
      the file list in `proposal.md` - Impact, nothing else.

## 9. Documentation follow-up

- [x] 9.1 Updated the Navbar row/detail in `docs/page-structure.md` to reflect the aligned state.
