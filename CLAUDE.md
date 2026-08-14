# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run `next lint`

There is no test suite in this repo (no test runner installed, no test files).

## Architecture

Next.js 15 App Router site (single marketing landing page), React 19, TypeScript, Tailwind CSS v4.

- **Single page, section-stacked**: `app/page.tsx` renders one page as a sequence of section components in order: `Navbar`, `Hero`, `Statement`, `AboutUs`, `RevealGallery`, `Stats`, `FeatureSection`, `HowItWorks`, `ClosingCTA`, `Footer`. `app/layout.tsx` sets `lang="es"` and wraps everything in `SmoothScroll`.
- **Content is centralized**: all copy and image/video URLs live in `content/site.ts` (`siteContent` object, typed with `SiteImage`/`Project`/`Feature`/`Step`). Components must not hardcode content strings — pull from `siteContent` instead. Copy is in Spanish.
- **Sections live in `components/sections/`**, one file per section, all `"use client"`. Small reusable primitives (e.g. `Button`, `Eyebrow`) live in `components/ui/` and follow a hand-rolled shadcn-like pattern (`cn()` from `lib/utils.ts`, `forwardRef`, variant maps) — there is no shadcn CLI/registry installed.
- **Animation stack**: GSAP (`gsap` + `@gsap/react`'s `useGSAP`) is the standard for scroll-driven animation. The convention is `gsap.registerPlugin(ScrollTrigger, useGSAP)` at module scope, then `useGSAP(() => {...}, { scope: ref })` inside the component. Reusable animation logic is extracted into `hooks/` (`useHorizontalScroll`, `useParallax`, `useTextReveal`), all client-side GSAP hooks.
- **Smooth scroll gotcha**: `components/SmoothScroll.tsx` wires Lenis into GSAP's ticker (`gsap.ticker.add`, `lagSmoothing(0)`) so Lenis's scroll position and GSAP `ScrollTrigger` (esp. `scrub`) stay in sync. Any new scroll-linked animation needs to be aware Lenis is driving scroll, not native scroll.
- **Styling**: Tailwind v4, configured entirely in CSS via `@theme` in `app/globals.css` — there is no `tailwind.config.ts`. Design tokens (colors as OKLCH, fonts, one custom keyframe `ruum-bounce`) are defined there; extend tokens in that file rather than adding a Tailwind config file.
- **Path alias**: `@/*` maps to the repo root (not `src/`), e.g. `@/components/...`, `@/content/site`, `@/hooks/...`, `@/lib/utils`.
- **Images**: remote images are loaded via `next.config.ts` → `images.remotePatterns` (currently only `images.unsplash.com` is allowlisted); add new domains there before using them in `next/image`.

## Propósito del proyecto

Landing de marketing para **Ruum**: vende los servicios de Ruum (experiencias digitales —
recorridos virtuales, renders, planos 2D/3D, video, amenities — construidas mayormente con
Next.js) a constructoras y desarrolladoras inmobiliarias. Debe sentirse premium, arquitectónica,
tecnológica, visual e inmersiva. Detalle completo en [docs/product-context.md](docs/product-context.md).

## Fuentes de verdad

- **Copy e imágenes de cada sección**: `content/site.ts` (`siteContent`) — ver Architecture arriba.
- **Contexto de negocio y objetivo de la landing**: [docs/product-context.md](docs/product-context.md).
- **Referencia visual**: `docs/references/` (capturas del diseño) + análisis en
  [docs/design-reference.md](docs/design-reference.md).
- **Estado real de cada sección** (qué coincide con el diseño de referencia y qué no):
  [docs/page-structure.md](docs/page-structure.md).
- **Reglas de performance**: [docs/performance-guidelines.md](docs/performance-guidelines.md).
- **SEO técnico, analítica/consentimiento y páginas legales** (qué se implementó, variables de
  entorno, pendientes conocidos):
  [docs/seo-analytics-and-legal.md](docs/seo-analytics-and-legal.md).

## Reglas para preservar el diseño

- `docs/references/landing-desktop.png` es la **referencia visual principal, confirmada**, de la
  landing corporativa: fuente de verdad para identidad visual, paleta, tipografías, composición,
  jerarquía, espaciado, dirección artística y estructura general de las secciones. No hace falta
  pixel-perfect; se permiten adaptaciones justificadas por UX, responsive, accesibilidad,
  rendimiento, carga progresiva o mantenibilidad, siempre conservando la intención visual.
- No rediseñar secciones existentes sin autorización explícita.
- El código actual **no** es automáticamente la referencia visual definitiva ni sus diferencias
  frente al mockup están aprobadas por defecto — hay secciones que ya difieren de
  `docs/references/` (ver `docs/page-structure.md` para el detalle sección por sección). Ante un
  conflicto entre código y mockup, consultar antes de asumir cuál prevalece; no "corregir" una
  sección hacia el mockup por iniciativa propia sin seguir el checklist de
  `docs/page-structure.md`.
- No reemplazar partes funcionales sin explicar la mejora que justifica el cambio.
- El registro de decisiones de producto/diseño ya confirmadas (Hero con video, About Us con
  video, sección de logos tipo marquee, perfiles inmobiliarios, etc.) vive en
  [docs/product-context.md](docs/product-context.md) — consultarlo antes de asumir que algo sigue
  abierto.

## Reglas de arquitectura

- Todo copy/URL de imagen o video nuevo va en `content/site.ts`, nunca hardcodeado en un
  componente (regla ya vigente en el archivo, ver comentario en su cabecera).
- No instalar dependencias nuevas sin justificarlo y recibir aprobación explícita.

## Reglas de reutilización

- Antes de crear un componente nuevo, revisar `components/ui/` y `components/sections/` en busca
  de algo reutilizable.
- Si un patrón se repite en 2+ secciones, extraerlo a `components/ui/`, `hooks/` o `lib/utils.ts`
  (el mismo criterio ya seguido por `Button`, `Eyebrow`, `cn()` y los hooks de GSAP existentes).

## Reglas de imágenes, video y 3D

Ver [docs/performance-guidelines.md](docs/performance-guidelines.md) para el detalle completo.
Resumen: optimizar imágenes servidas vía `next/image`, usar `poster` en todo `<video>`, y cargar
cualquier recurso 3D/recorrido virtual bajo demanda (nunca automáticamente al entrar en viewport).

## Reglas de animación y parallax

Ver [docs/performance-guidelines.md](docs/performance-guidelines.md) para el detalle completo.
Resumen: animar solo `transform`/`opacity`, usar `scrub` de ScrollTrigger para animación ligada a
scroll (patrón ya seguido en el código), y respetar `prefers-reduced-motion` (pendiente hoy — ver
la guía de performance).

## Reglas de validación antes de finalizar un cambio

- Correr `npm run lint`.
- Si el cambio toca una sección con diferencias ya documentadas contra el mockup (ver
  `docs/page-structure.md`), revisarla visualmente contra `docs/references/` antes de darla por
  buena.
- Verificar que no se introdujeron saltos de layout (CLS) y que `prefers-reduced-motion` sigue
  respetado donde ya aplique.
- Confirmar que no se agregó ninguna dependencia nueva sin aprobación previa.
