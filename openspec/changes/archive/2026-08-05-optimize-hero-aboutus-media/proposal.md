## Why

El Hero y About Us usarán video de forma definitiva, pero hoy están construidos de una manera que
no soporta bien esa decisión: el video del Hero está hardcodeado en el componente (no sale de
`content/site.ts`, así que reemplazarlo cuando llegue el recurso final implica tocar código), el
campo `poster` de About Us existe pero nunca se conecta, no hay ningún manejo de
`prefers-reduced-motion` ni de pausa por visibilidad en todo el repo, y `siteContent.hero`
contiene un array de 3 imágenes que ningún componente usa. Resolver esto ahora — antes de que
lleguen los videos definitivos — evita reemplazar un recurso "a las apuradas" tocando la
estructura de los componentes, y cierra brechas de performance/accesibilidad ya documentadas en
`docs/performance-guidelines.md`.

## What Changes

- El video del Hero pasa a `siteContent.hero.video` (mismo patrón que ya usa parcialmente
  `siteContent.about.video`) — deja de estar escrito directamente en `Hero.tsx`.
- `siteContent.hero.backgroundImages` (array de 3 imágenes sin uso) se elimina; una de esas
  imágenes se reutiliza como poster provisional, compartido por Hero y About Us mientras ambos
  usan el mismo video de prueba — no se inventa ningún recurso nuevo.
- Ambos `<video>` (Hero y About Us) declaran `poster` de verdad, usando ese valor centralizado.
- Nuevo tipo `SiteVideo` en `content/site.ts` (mismo criterio que el `SiteImage` ya existente) para
  que video/poster de ambas secciones tengan una forma consistente y reemplazable sin tocar los
  componentes.
- Nuevo hook `usePrefersReducedMotion` (genérico, reutilizable más allá de este cambio) y nuevo
  hook `useVideoViewportAutoplay` (pausa/reanuda video según visibilidad vía
  `IntersectionObserver`), ambos consumidos por `Hero.tsx` y `AboutUs.tsx`. No se crea ningún
  componente de video compartido — el video del Hero (ambiental, autoplay, decorativo) y el de
  About Us (interactivo, click-to-play) son lo bastante distintos como para no forzarlos por una
  misma pieza de UI.
- Con `prefers-reduced-motion: reduce` activo, el Hero no hace autoplay del video.
- Ambos videos se pausan cuando su contenedor sale completamente del viewport.
- Sin detección de velocidad de conexión (`navigator.connection`) — se descartó deliberadamente
  por cubrir de forma desigual a los navegadores (no existe en Safari/Firefox) y sumar complejidad
  para un beneficio parcial.
- Sin campo de video alternativo para móvil — se descarta por ahora, se agrega el día que haga
  falta un recurso real.

## Capabilities

### New Capabilities

- `landing-media`: comportamiento de los videos de fondo/interactivos de la landing (Hero y About
  Us hoy): poster, fallback, reserva de espacio, respeto a `prefers-reduced-motion`, pausa fuera
  de viewport, y reemplazo de recursos desde contenido centralizado sin tocar la estructura de los
  componentes.

### Modified Capabilities

(ninguna — `site-navigation` es la única capacidad existente en `openspec/specs/` y no cambia)

## Impact

**Código afectado**: `content/site.ts` (bloque `hero`, `about`, nuevo tipo `SiteVideo`),
`components/sections/Hero.tsx`, `components/sections/AboutUs.tsx`, nuevos `hooks/usePrefersReducedMotion.ts`
y `hooks/useVideoViewportAutoplay.ts`.

**Sin impacto en**: Navbar, Statement, Stats, FeatureSection, HowItWorks, RevealGallery,
ClosingCTA, la sección de logos, Footer y los perfiles inmobiliarios — ninguno se toca en este
cambio.

**Dependencias**: ninguna dependencia nueva (`package.json`/`package-lock.json` sin cambios). El
video y el poster siguen siendo recursos provisionales (el mismo video de mixkit ya en uso, y una
de las imágenes de Unsplash ya existentes en `content/site.ts`) — no se inventa ninguna URL nueva.
