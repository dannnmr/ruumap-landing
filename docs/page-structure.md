# Estructura de la página

Análisis de `app/page.tsx`: orden real de secciones, componente y fuente de contenido de cada
una, y su estado frente a `docs/references/landing-desktop.png` (la referencia visual principal,
confirmada — ver [design-reference.md](./design-reference.md)) y las referencias adicionales
`footer.png` y `projects-secction.png`.

Estados usados:
- **Implementado, coincide con la referencia** — estructura y copy se corresponden con el mockup.
- **Implementado, difiere de la referencia** — la sección existe y funciona, pero su contenido,
  layout o cantidad de elementos no coincide con lo observado en el mockup. Confirmado por el
  product owner (2026-08-04): estas diferencias **no** están aprobadas por defecto — la sección
  debe revisarse contra la referencia cuando se trabaje en ella, conservando lo compatible.
- **No implementado** — la sección existe en la referencia visual pero no hay componente/contenido
  para ella en el código.
- **No verificable** — no hay suficiente detalle en la captura de referencia para confirmar.

| # | Sección (orden en `app/page.tsx`) | Componente | Contenido desde | Estado |
|---|---|---|---|---|
| 1 | Navbar | `components/sections/Navbar.tsx` | `siteContent.nav` | Realineado (change `align-navbar-with-reference`) — código implementado y verificado estáticamente; QA manual en navegador pendiente |
| 2 | Hero | `components/sections/Hero.tsx` | `siteContent.hero` | Media endurecida (change `optimize-hero-aboutus-media`) — implementado y verificado estáticamente; QA manual en navegador pendiente |
| 3 | Statement | `components/sections/Statement.tsx` | `siteContent.statement` | Implementado, coincide con la referencia (re-verificado en el change `complete-remaining-ruum-landing`) |
| 4 | AboutUs (video) | `components/sections/AboutUs.tsx` | `siteContent.about` | Media endurecida (change `optimize-hero-aboutus-media`) — implementado y verificado estáticamente; QA manual en navegador pendiente |
| 5 | RevealGallery / sección de proyectos | `components/sections/RevealGallery.tsx` | `siteContent.revealGallery` | Realineado (change `complete-remaining-ruum-landing`) — implementado y verificado estáticamente; QA visual manual pendiente |
| 6 | Stats | `components/sections/Stats.tsx` | `siteContent.stats` | Realineado (change `complete-remaining-ruum-landing`) — implementado y verificado estáticamente |
| 7 | FeatureSection | `components/sections/FeatureSection.tsx` | `siteContent.features` | Rediseñado a cartas apiladas en scroll (`sticky`, pedido explícito del usuario, 2026-08-05) — implementado y verificado estáticamente; QA visual manual pendiente |
| 8 | HowItWorks | `components/sections/HowItWorks.tsx` | `siteContent.howItWorks` | Realineado (change `complete-remaining-ruum-landing`) — implementado y verificado estáticamente; QA visual manual pendiente |
| — | Logos / clientes | `components/sections/Logos.tsx` | `content/logos.ts` | Implementado (change `complete-remaining-ruum-landing`) — SVGs reales provistos por el product owner |
| 9 | ClosingCTA | `components/sections/ClosingCTA.tsx` | `siteContent.closingCTA` | Realineado (change `complete-remaining-ruum-landing`) — implementado y verificado estáticamente; QA visual manual pendiente |
| 10 | Footer | `components/sections/Footer.tsx` | `siteContent.footer` | Realineado (change `complete-remaining-ruum-landing`) — implementado y verificado estáticamente; QA visual manual pendiente |

`components/SmoothScroll.tsx` no es una sección: envuelve todo `app/layout.tsx` para el smooth
scroll (Lenis + GSAP ticker) y no aparece en `app/page.tsx`.

## Detalle por sección

**Navbar** — Realineado por el change `openspec/changes/align-navbar-with-reference/` (2026-08-05):

- Labels/CTA provisionales, centralizados en `siteContent.nav` (`{label, target}`), leídos de la
  referencia principal: "Proyectos", "Servicios", "Cómo funciona", CTA "Hablemos". "Testimonios"
  queda documentado como pendiente (sin sección construida) — no se renderiza como link roto.
- Los identificadores de sección (`proyectos`/`servicios`/`proceso`/`contacto`) se centralizaron
  en `lib/navigation.ts` (`SECTION_IDS`), consumidos tanto por `siteContent.nav` como por el `id`
  de `RevealGallery`, `FeatureSection`, `HowItWorks` y `ClosingCTA` — ya no hay strings de id
  independientes desincronizables.
- El drawer móvil ganó accesibilidad completa: `aria-expanded`/`aria-controls`/`role="dialog"`/
  `aria-modal`, cierre con Escape, foco contenido (Tab-trap manual) y devuelto al trigger al
  cerrar, scroll del body bloqueado mientras está abierto, y `inert` tanto en el resto de la
  página mientras el drawer está abierto como en el propio drawer mientras está cerrado — todo
  sin dependencias nuevas.
- `HowItWorks` recibió `scroll-mt-24` (mismo patrón que las otras tres secciones destino) para que
  `#proceso` no quede oculto bajo el header fijo.
- Los links y el CTA ahora navegan vía `lenis.scrollTo()` (a través de `useLenis()` en el propio
  `Navbar.tsx`) en vez de depender del salto nativo del navegador — se descubrió, leyendo el
  código fuente de Lenis, que su interceptación automática de anchors está desactivada por
  defecto y `SmoothScroll.tsx` nunca la habilita, así que sin este cambio el scroll no era suave.
- `bg-[#1A1A1C]` y `border-white/5` del header se compararon exactamente (conversión OKLab) contra
  `bg-surface`/`border-border`: ninguno de los dos tokens compartidos resultó visualmente
  equivalente, así que ambos valores se conservaron tal cual, documentados con un comentario en
  `Navbar.tsx`.

**Verificado en esta implementación**: compila sin errores (`npx tsc --noEmit` limpio), el HTML
servido por el dev server confirma los `href`/`id`/labels correctos y la ausencia de "Testimonios".
**Pendiente de verificar** (requiere un navegador real, no disponible en el entorno donde se
implementó — ver `openspec/changes/align-navbar-with-reference/tasks.md` sección 8): navegación
por teclado de punta a punta, comportamiento visual del scroll hacia `#proceso` en interacción con
el pin/scale de `ScrollTrigger`, y revisión visual final contra `landing-desktop.png` a resolución
completa. `npm run lint` tampoco pudo ejecutarse — este repo no tiene ESLint configurado todavía
(condición previa a este cambio, no introducida por él).

**Hero** — Implementado por el change `openspec/changes/optimize-hero-aboutus-media/`
(2026-08-05). El video (`siteContent.hero.video`) se mantiene como dirección definitiva; el
recurso actual (`assets.mixkit.co`) sigue siendo temporal, reemplazable editando solo el contenido.
Lo que cambió respecto al estado anterior:

- El video ya no está hardcodeado en `Hero.tsx` — sale de `siteContent.hero.video`
  (`{ src, poster }`, tipo `SiteVideo` nuevo).
- El poster reutiliza una de las 3 imágenes que antes estaban en `hero.backgroundImages` sin
  usarse (ese array se eliminó — era contenido muerto).
- Con `prefers-reduced-motion: reduce` activo, no se monta ningún `<video>`: se renderiza la
  imagen de poster vía `next/image` (`fill priority`) de forma permanente para esos visitantes.
- Sin reduced-motion, el video (`autoplay loop muted playsInline poster`) se pausa cuando el Hero
  sale del viewport y se reanuda automáticamente al volver a entrar (`hooks/useInViewport.ts`,
  nuevo, genérico).
- El headline/CTAs siguen sin depender del video (ya era así).

No incluye: detección de conexión lenta ni un video alternativo para móvil — ambos evaluados y
descartados explícitamente por el product owner (ver `design.md` del change). Detalle de reglas de
performance asociadas en [performance-guidelines.md](./performance-guidelines.md).

**AboutUs (video)** — Implementado por el mismo change. La sección **conserva el video como
elemento principal**, con el mismo `SiteVideo` centralizado que el Hero (comparten el poster
provisional, ya que ambos usan hoy el mismo video de prueba). Lo que cambió:

- `about.video.poster` ya no está vacío — se conecta al `<video poster=...>`, que antes no lo
  usaba pese a que el campo existía.
- `preload="none"` explícito (la sección no está above-the-fold y la reproducción sigue siendo
  100% iniciada por el usuario con el botón de play existente, sin cambios).
- El video se pausa si el usuario lo dejó reproduciendo y hace scroll fuera de la sección — pero
  a diferencia del Hero, **no se reanuda solo por volver a estar en viewport**; queda pausado
  hasta que el usuario lo reactive a propósito (mismo hook `useInViewport`, distinta reacción en
  cada componente).
- El botón de play/pause, sus `aria-label`, y el 16:9 con `before:pt-[56.25%]` que ya evitaba CLS,
  quedan sin cambios.

**Verificado en Hero/AboutUs**: `npx tsc --noEmit` y `npm run build` limpios. **Pendiente de
verificar** (requiere navegador real, no disponible en el entorno donde se implementó — ver
`openspec/changes/optimize-hero-aboutus-media/tasks.md` sección 5): que el poster se vea antes del
primer frame en conexión lenta, que con reduced-motion activo nunca se monte el `<video>` del
Hero, el comportamiento de pausa/reanudación al hacer scroll en ambas secciones, y reproducción
inline en móvil. Sin detección de conexión lenta ni video alternativo para móvil — descartados a
propósito, no pendientes.

**RevealGallery / sección de proyectos** — Realineado por el change
`openspec/changes/complete-remaining-ruum-landing/` (2026-08-04): reemplaza los paneles verticales
full-bleed anteriores por un carrusel de tarjetas compactas (imagen, nombre, desarrollador,
ubicación, "Ver proyecto") con flechas de navegación, alineado con
`docs/references/projects-secction.png` (eyebrow "CATÁLOGO ACTIVO", heading "Últimos proyectos
añadidos"). `Project` (`content/site.ts`) ganó `developer`, `location`, `slug?` (perfil futuro,
sin uso todavía) y `href?` (URL futura de "Ver proyecto"; mientras no exista, la acción se
renderiza `aria-disabled`, sin destino inventado — ver sección "Perfiles inmobiliarios" más
abajo). El catálogo quedó en 3 proyectos (Itaguá—STTO Group, Buen Retiro—Kohler & Weiss Real
Estate Development, Artemis—SYMPRAX): son los únicos con desarrollador/ubicación observables en
la referencia — la asociación proyecto↔desarrollador sigue sin confirmación oficial del product
owner, se usa aquí solo por ser observable en la imagen. "PV Norte" (el 4to proyecto que existía
antes) se retiró de esta sección por no tener esos datos observables en ninguna referencia; su
imagen se reutilizó en `FeatureSection` en vez de descartarse.

**Stats** — Realineado: 4 métricas (`+50` proyectos diseñados, `15` desarrolladores
inmobiliarios, `+20` países servicios prestados, `+100` unidades vendidas usando Ruum), leídas de
`landing-desktop.png`. Mismo layout que antes (fila con `border-y`), compatible con 4 ítems sin
cambios estructurales.

**FeatureSection** — Realineado (change `complete-remaining-ruum-landing`): reemplazó el carrusel
horizontal pineado original (scroll-driven, 3 tarjetas) por 5 bloques verticales de la referencia
(imagen + eyebrow/heading/descripción, apilados, sin pin ni scroll horizontal). `Feature` ganó
`eyebrow: string`. Dos de las cinco imágenes reutilizan assets que quedaron sin uso en el repo tras
otros cambios de ese mismo change (la imagen de "PV Norte", retirada de la sección de proyectos) —
no se agregó ningún dominio de imagen nuevo.

**Rediseño posterior (2026-08-05, pedido explícito del usuario)** — las 5 tarjetas ahora se apilan
en scroll ("cartas apiladas"/"papeles en un escritorio"): cada tarjeta es `position: sticky` y se
pega debajo del Navbar mientras la siguiente sube por detrás y la cubre por completo. Es un
mecanismo distinto al carrusel horizontal pineado que este mismo change había removido (aquel
traducía el scroll a desplazamiento horizontal de un track; este apila en vertical con `sticky`,
sin `pin` de GSAP) — la reautorización para volver a tocar esta sección la dio el usuario
directamente en esa conversación, no es una reversión de la decisión anterior. El apilado en sí es
CSS puro; `hooks/useStackedCards.ts` (nuevo) solo agrega un `scrub` de escala sobre la tarjeta
saliente para dar sensación de profundidad — gateado por `usePrefersReducedMotion()`, y además la
propiedad `sticky` se apaga con el variant `motion-reduce:` de Tailwind, así que con
`prefers-reduced-motion` activo las 5 tarjetas vuelven al flujo normal (comportamiento previo, sin
apilado). `hooks/useHorizontalScroll.ts` no se tocó ni se reutilizó — sigue siendo la hook del
carrusel horizontal (mecánica distinta), no aplicable a un stack vertical.

**HowItWorks** — Realineado: reemplaza el efecto anterior de stacking/pin por columna (con imagen)
por la fila de 3 columnas sin pin que muestra la referencia (número, título, descripción,
separador superior). Copy actualizado a "Creamos tu experiencia digital" / "Publicamos tu
proyecto" / "Impulsa tus ventas". `Step.image` quedó opcional en el tipo (sin consumidores hoy).

**Logos / clientes** — Implementado por el mismo change: `components/sections/Logos.tsx` +
`components/ui/Marquee.tsx` (ticker continuo en CSS puro, dos filas en direcciones opuestas,
pausado con `prefers-reduced-motion`), datos en `content/logos.ts`. Reproduce la composición de
la referencia ("Empresas relacionadas y clientes del ecosistema Ruum.", 10 empresas en 2 filas de
5). **Los 10 SVG son placeholders provisionales** construidos para este change (marcas
monocromáticas simples con el nombre de cada empresa) — el product owner todavía no proveyó los
logos reales ni su clasificación; reemplazar cada archivo en `public/assets/logos/` es un cambio
de datos, sin tocar componentes. Detalle de reglas de performance/accesibilidad para el marquee en
[performance-guidelines.md](./performance-guidelines.md).

**ClosingCTA** — Realineado: heading/subcopy/CTA actualizados al copy de la referencia ("Sumá tu
proyecto a la experiencia más inmersiva..." / "Contáctanos"). Se agregó el bloque de
contacto/testimonio (`closingCTA.contact`: nombre, teléfono, email, foto) con los valores
observables en `landing-desktop.png` ("Guillermo Castillo", "+591 780 00000",
"atencion@ruumap.com") — son datos del mockup, no confirmados como definitivos por el product
owner; la foto es un placeholder de Unsplash. **Hallazgo durante la implementación**: la
referencia para esta sección no muestra ninguna imagen de fondo a pantalla completa (era fondo
oscuro sólido + retrato sangrando a la derecha), así que el `backgroundImage`/parallax que tenía
la implementación anterior se retiró — no correspondía a ningún elemento observable en la
referencia para este bloque en particular.

**Footer** — Realineado con el detalle de `docs/references/footer.png`:

- **Estructura**: logo "ruum" + tagline a la izquierda, tres columnas de links, barra inferior
  con copyright + iconos sociales — sin cambios respecto a lo ya implementado.
- **Columnas actualizadas**: "PRODUCTO" (Proyectos, Recorridos 3D, Precios), "COMPAÑÍA" (Nosotros,
  Contacto), "LEGAL" (Privacidad, Términos) — antes tenía 4 items distintos en "Producto".
- **Tagline actualizada**: "La solución de visualización virtual y gestión en tiempo real para
  proyectos en pre-venta de todo el mundo."
- **Redes sociales**: iconos de Facebook e Instagram agregados en la barra inferior
  (`siteContent.footer.social`, `href: "#"` provisional — no hay URLs reales confirmadas).
- **Copyright**: dinámico (`{footer año actual} {brand.name}`) — se mantuvo dinámico en vez de
  hardcodear "2026" como en la referencia (adaptación de mantenibilidad menor).

No hay datos de contacto (email/teléfono/dirección) del Footer visibles en ninguna referencia —
no se inventaron. Nota: `brand.name` sigue siendo "Ruumap" en el código pese a que las
referencias muestran el wordmark "ruum" — es una discrepancia de identidad de marca preexistente
que toca a Navbar/branding (fuera de alcance del change `complete-remaining-ruum-landing`), no
resuelta aquí.

**Modelo de padding lateral (corrección, change `complete-remaining-ruum-landing`, grupo 12)** —
Stats, FeatureSection, HowItWorks, RevealGallery, Logos, ClosingCTA y Footer usan **padding fijo
en píxeles, sin `max-w` + `mx-auto` centrando el contenido**: el padding lateral de cada sección
es una cantidad constante (ej. 64px en la mayoría, 240px en Stats) que no crece ni se combina con
un margen de centrado adicional en pantallas anchas. Esto reemplaza el modelo anterior (una banda
centrada con `max-w-[1300–1400px] mx-auto` que el grupo 11 había introducido): en pantallas reales
de 1440–1920px+, ese `max-w` sumaba un margen de centrado mucho mayor que el padding pretendido
(ej. `max-w-[960px] mx-auto` en Stats sumaba hasta 480px de margen por lado en un viewport de
1920px, además de su propio padding). El product owner confirmó el requisito: el padding lateral
debe ser el mismo valor constante sin importar el tamaño de pantalla. Donde el contenido interno
(un heading, por ejemplo) podía volverse demasiado ancho al quedar la fila realmente a pantalla
completa, se le agregó su propio `max-w` puntual (no a la sección) — ese es el único uso de
`max-w` que se conserva.

## Perfiles inmobiliarios (fuera de la landing corporativa)

Confirmado por el product owner (2026-08-04): `docs/references/perfil.desarrollador.inmobiliario.png`
representa la estructura base de un **perfil inmobiliario** que deberá existir dentro de la
experiencia, como una página/vista relacionada con los proyectos y desarrolladores que muestra la
landing (no una sección de la landing corporativa en sí). Al seleccionar un desarrollador o un
proyecto en la sección correspondiente, debe poder abrirse su perfil.

**Implementado** por el change `openspec/changes/add-reusable-developer-profiles/` (2026-08-05):

- **Ruta**: `app/desarrolladores/[slug]/page.tsx` — dinámica, pre-renderizada en build
  (`generateStaticParams`) para cada desarrollador configurado. Un slug sin desarrollador
  configurado muestra `app/desarrolladores/[slug]/not-found.tsx` en vez de un perfil roto o
  inventado. **URL pública (2026-08-14)**: `/developers/[slug]` — la carpeta sigue en español,
  pero se sirve en inglés vía `rewrites()`/`redirects()` en `next.config.ts` (ver
  `docs/seo-analytics-and-legal.md`).
- **Datos**: colección centralizada `content/developers.ts` (`developers: Developer[]`,
  `getDeveloperBySlug`) — nombre, logo, slogan, portada, redes, dirección, sitio web, video,
  descripción, misión, visión, imagen principal, representante, notas de prensa, "otros
  proyectos". `Project` (`content/site.ts`) ganó `developerSlug` (reemplaza el viejo `slug?` sin
  uso), `category?` (sin uso visual todavía) y `status: "provisional" | "confirmed"`. La lista de
  "proyectos añadidos" de un perfil se deriva filtrando `content/site.ts` por `developerSlug` —no
  se duplica en `Developer`.
- **Plantilla**: `components/profile/DeveloperProfileTemplate.tsx`, compuesta de
  `ProfileHeader`, `ProfileInfoBlock`, `RepresentativeBlock`, `AddedProjectsSection`/
  `OtherProjectsSection` (`components/profile/ProjectsGrid.tsx`), `PressSection`
  (`components/profile/PressCard.tsx`) y `ProfileFooter` — una sola plantilla para todo perfil,
  cada sección omitida por completo cuando su dato no está configurado (nunca contenido
  fabricado). Reutiliza `components/ui/ProjectCard.tsx` (extraído de `RevealGallery`, ahora
  también usado por el catálogo de la landing) y `components/ui/VideoPlayer.tsx` (extraído de
  `AboutUs`, mismo comportamiento poster/play/pause sin autoplay).
- **Tema visual**: el perfil usa un **tema claro**, distinto del fondo oscuro del resto de la
  landing — decisión confirmada explícitamente por el product owner (2026-08-05), siguiendo la
  referencia visual (`perfil.desarrollador.inmobiliario.png` es una captura de fondo claro). El
  footer del perfil (`ProfileFooter`) sí reutiliza el fondo oscuro del sitio — así lo muestra esa
  misma referencia para esa franja en particular. Tema aplicado solo dentro de
  `components/profile/` y esta ruta; no toca los tokens globales de `app/globals.css`.
- **Landing → perfil**: la tarjeta de `RevealGallery` navega al perfil del desarrollador vía
  `developerSlug` cuando ese desarrollador existe en `content/developers.ts`; si no, la tarjeta no
  ofrece navegación a un perfil roto.
- **Contenido de los 3 desarrolladores** (STTO Group, Kohler & Weiss Real Estate Development,
  SYMPRAX — los únicos con proyecto asociado confirmado en `content/site.ts`): **decisión
  explícita del product owner (2026-08-05)** — los tres reutilizan literalmente el mismo copy
  observado en `perfil.desarrollador.inmobiliario.png` (que es, en rigor, el perfil de STTO
  Group), adaptado solo en el nombre del desarrollador, en vez de dejar a los otros dos con
  campos vacíos. Es contenido de relleno explícitamente marcado (`status: "provisional"` +
  comentarios en `content/developers.ts`), a reemplazar por la información real de cada
  desarrollador cuando esté disponible — no representa hechos reales de Kohler & Weiss ni de
  SYMPRAX.

Requisitos de producto que guiaron la solución (todos cubiertos arriba): estructura reutilizable
basada en la referencia, sin página duplicada por perfil, plantilla única, información
centralizada, slugs únicos, nuevos perfiles solo con datos (sin duplicar componentes), medios/
información/enlaces por perfil, ruta dinámica de App Router, contenido separado de la
presentación.

**Sigue pendiente** (no resuelto por este change): información real de cada desarrollador (más
allá de STTO Group, cuyo copy viene directo de la referencia), logos reales (los tres perfiles
usan el fallback de iniciales), y confirmación oficial de la relación proyecto↔desarrollador más
allá de lo observable en `projects-secction.png`.

### Acción "Ver proyecto"

Cada perfil inmobiliario tiene una acción "Ver proyecto" que dirige a un enlace específico por
proyecto (`Project.href`, `content/site.ts`), provisto por el product owner más adelante. Reglas
implementadas (mismo componente, `components/ui/ProjectCard.tsx`, usado en el catálogo de la
landing y en la lista de "proyectos añadidos" del perfil):

- cada enlace es distinto según el proyecto, configurado desde los datos, nunca hardcodeado en el
  componente visual;
- soporta enlaces internos o externos según corresponda;
- no se usan URLs temporales inventadas;
- mientras no exista una URL confirmada, la acción se renderiza `aria-disabled`, sin destino
  inventado — hoy es el caso de los 3 proyectos existentes (`href` sin definir en
  `content/site.ts`).

La grilla "Otros proyectos" del perfil no tiene esta acción — no es observable en la referencia
para esa grilla en particular.

## Checklist antes de modificar una sección para alinearla con la referencia

Para Statement, RevealGallery/proyectos, Stats, FeatureSection, HowItWorks, ClosingCTA y Footer,
antes de tocar la implementación se debe analizar:

1. qué parte de la implementación actual puede conservarse;
2. qué parte debe alinearse con la referencia;
3. qué contenido es temporal (placeholders de Unsplash/mixkit, copy de ejemplo);
4. qué componentes existentes (`components/ui/`, `hooks/`) pueden reutilizarse;
5. qué impacto tendrá el cambio en responsive y rendimiento.

La implementación actual puede reutilizarse cuando sea compatible con la referencia, pero una
diferencia no debe conservarse únicamente porque ya está programada.

## No inventado / pendiente

Este documento describe lo observable comparando `app/page.tsx` + `content/site.ts` contra las
referencias en `docs/references/`, más las decisiones explícitas confirmadas por el product owner
el 2026-08-04. Donde el copy/layout final todavía no está decidido, eso requiere una decisión
puntual del product owner al momento de implementar cada sección, y cualquier cambio de diseño
requiere autorización explícita (ver reglas en [CLAUDE.md](../CLAUDE.md)).
