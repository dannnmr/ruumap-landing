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
| 3 | Statement | `components/sections/Statement.tsx` | `siteContent.statement` | Implementado, coincide con la referencia |
| 4 | AboutUs (video) | `components/sections/AboutUs.tsx` | `siteContent.about` | Media endurecida (change `optimize-hero-aboutus-media`) — implementado y verificado estáticamente; QA manual en navegador pendiente |
| 5 | RevealGallery / sección de proyectos | `components/sections/RevealGallery.tsx` | `siteContent.revealGallery` | Implementado, difiere de la referencia |
| 6 | Stats | `components/sections/Stats.tsx` | `siteContent.stats` | Implementado, difiere de la referencia |
| 7 | FeatureSection | `components/sections/FeatureSection.tsx` | `siteContent.features` | Implementado, difiere de la referencia |
| 8 | HowItWorks | `components/sections/HowItWorks.tsx` | `siteContent.howItWorks` | Implementado, difiere de la referencia |
| — | Logos / clientes | *(no existe)* | *(no existe)* | No implementado — confirmado para implementación futura |
| 9 | ClosingCTA | `components/sections/ClosingCTA.tsx` | `siteContent.closingCTA` | Implementado, difiere de la referencia |
| 10 | Footer | `components/sections/Footer.tsx` | `siteContent.footer` | Implementado, difiere de la referencia |

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

**RevealGallery / sección de proyectos** — Debe alinearse visual y estructuralmente con la
referencia principal y, en particular, con el detalle de `docs/references/projects-secction.png`:
eyebrow "CATÁLOGO ACTIVO", heading "Últimos proyectos añadidos", tarjetas compactas en fila
(imagen, nombre de proyecto, nombre de desarrollador, ubicación, link "Ver proyecto") con flechas
de navegación. La implementación actual usa paneles verticales full-bleed, uno por proyecto
(efecto "reveal" a pantalla completa), con 4 proyectos en `content/site.ts` (Artemis, Itagua, PV
Norte, Buen Retiro), sin desarrollador, ubicación ni "Ver proyecto".

Relacionado con esta sección: la referencia muestra asociaciones proyecto↔desarrollador (Itaguá—
STTO Group, Buen Retiro—Kohler & Weiss Real Estate Development, Artemis—SYMPRAX) que son solo una
**observación de la imagen**, no un dato confirmado — el product owner indicó explícitamente que
esa relación todavía debe confirmarse antes de usarse. La acción "Ver proyecto" de cada tarjeta
debe salir de los datos del proyecto (no hardcodeada) y por ahora no tiene URL real — ver sección
"Perfiles inmobiliarios" más abajo.

**Stats** — 3 métricas en el código (`4+`, `3x`, `100%`) contra 4 en la referencia (`+50`, `15`,
`+20`, `+100`, con labels distintos). Debe alinearse con la referencia principal; cantidad y copy
finales pendientes de decisión al momento de implementar.

**FeatureSection** — El código implementa un carrusel horizontal pineado (scroll-driven) con 3
tarjetas. La referencia muestra 5 bloques verticales alternados (imagen + texto), sin carrusel.
Debe alinearse con la referencia principal; layout, cantidad de bloques y copy finales pendientes
de decisión al momento de implementar (evaluar si el carrusel horizontal pineado se conserva como
adaptación justificada por UX/rendimiento, o se reemplaza por el layout vertical de la
referencia).

**HowItWorks** — Misma estructura general (3 pasos numerados, apilados con pin/scale). El copy de
títulos y descripciones del código difiere del de la referencia (p. ej. código:
"Digitalizamos tu desarrollo" / referencia: "Creamos tu experiencia digital"). Debe alinearse con
la referencia principal; copy final pendiente de decisión al momento de implementar.

**Logos / clientes** — Confirmado: esta sección **sí se implementará**. La referencia
(`landing-desktop.png`) muestra una sección "Empresas relacionadas y clientes del ecosistema
Ruum." con ~8 logos, ubicada entre HowItWorks y ClosingCTA. Requisitos confirmados:

- los SVG de cada empresa y su clasificación los proveerá el product owner más adelante — no
  deben inventarse logos, empresas ni relaciones comerciales;
- debe reproducir la composición visual de la referencia;
- debe usar una animación tipo **marquee/logo-ticker/carrusel continuo** (franja de logos que se
  desplaza a velocidad constante y parece infinita);
- si se usan dos filas, una puede ir izquierda→derecha y la otra derecha→izquierda;
- el movimiento debe ser fluido y sutil, sin saltos al reiniciarse el loop;
- debe pausarse o adaptarse cuando `prefers-reduced-motion` esté activo;
- los logos deben salir de una colección de datos centralizada (ej. un array en
  `content/site.ts` o similar), **sin duplicar manualmente** la estructura de cada logo en el
  markup;
- debe ser sencillo añadir, retirar o reordenar empresas.

Estado: confirmada para implementación futura, pendiente de recibir los SVG y la clasificación
real de cada empresa. Detalle de reglas de performance/accesibilidad para el marquee en
[performance-guidelines.md](./performance-guidelines.md).

**ClosingCTA** — El heading y el CTA existen en el código, con una imagen de fondo con parallax.
La referencia incluye además un bloque de contacto/testimonio con foto de una persona, nombre y
datos de contacto (teléfono, email) que **no está implementado**. Debe alinearse con la
referencia principal; si se conserva o no ese bloque, y su contenido, queda pendiente de decisión
al momento de implementar (no inventar nombre/foto/datos de contacto).

**Footer** — Debe alinearse con la referencia principal y, en particular, con el detalle de
`docs/references/footer.png`:

- **Estructura**: logo "ruum" + tagline a la izquierda, tres columnas de links, barra inferior
  con copyright + iconos sociales.
- **Columnas observadas**: "PRODUCTO" (Proyectos, Recorridos 3D, Precios), "COMPAÑÍA" (Nosotros,
  Contacto), "LEGAL" (Privacidad, Términos).
- **Tagline observada**: "La solución de visualización virtual y gestión en tiempo real para
  proyectos en pre-venta de todo el mundo."
- **Redes sociales**: iconos de Facebook e Instagram en la barra inferior — el componente actual
  no los renderiza.
- **Copyright**: "© 2026 ruum. Todos los derechos reservados."

El código actual (`siteContent.footer`) tiene una tagline y labels de columna distintos ("Producto":
Recorridos virtuales, Planos 2D/3D, Amenidades, Precios — 4 items vs. 3 en la referencia), y no
tiene fila de iconos sociales. No hay datos de contacto (email/teléfono/dirección) visibles en
ninguna referencia — no deben inventarse.

## Perfiles inmobiliarios (fuera de la landing corporativa)

Confirmado por el product owner (2026-08-04): `docs/references/perfil.desarrollador.inmobiliario.png`
representa la estructura base de un **perfil inmobiliario** que deberá existir dentro de la
experiencia, como una página/vista relacionada con los proyectos y desarrolladores que muestra la
landing (no una sección de la landing corporativa en sí). Al seleccionar un desarrollador o un
proyecto en la sección correspondiente, debe poder abrirse su perfil.

Ejemplos mencionados por el product owner (sin que la relación proyecto↔desarrollador esté
confirmada todavía): STTO Group tendrá su propio perfil de desarrollador; Buen Retiro tendrá el
perfil del desarrollador que se defina; Artemis tendrá su perfil correspondiente; SYMPRAX tendrá
su perfil correspondiente; los proyectos/desarrolladores futuros deben poder añadirse con la
misma estructura.

Requisitos de producto confirmados para la solución:

- estructura reutilizable basada en `perfil.desarrollador.inmobiliario.png`, con contenido
  distinto por perfil;
- solución mantenible y basada en datos — **no** crear una página duplicada manualmente por cada
  perfil;
- usar una plantilla reutilizable;
- centralizar la información de cada desarrollador/proyecto;
- usar identificadores o slugs únicos;
- permitir añadir nuevos perfiles sin duplicar componentes;
- permitir imágenes, videos, información y enlaces específicos por perfil;
- contemplar rutas dinámicas o una solución equivalente apropiada para Next.js (App Router);
- mantener separación entre contenido y presentación (mismo criterio que ya sigue
  `content/site.ts` para la landing).

**Explícitamente pendiente de especificación posterior** (no decidir ni implementar todavía): la
ruta/URL definitiva de los perfiles, y la arquitectura técnica exacta.

### Acción "Ver proyecto"

Cada perfil inmobiliario tendrá una acción "Ver proyecto" que dirige a un enlace específico por
proyecto, provisto por el product owner más adelante. Reglas confirmadas:

- cada enlace será distinto según el proyecto;
- debe configurarse desde los datos del proyecto, no hardcodeado en el componente visual;
- debe soportar enlaces internos o externos según corresponda;
- no deben usarse URLs temporales inventadas;
- mientras no exista una URL confirmada, la acción debe mantenerse pendiente (sin destino
  inventado).

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
