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
| 1 | Navbar | `components/sections/Navbar.tsx` | `siteContent.nav` | Implementado, difiere de la referencia — realineación confirmada, pendiente de ejecutar |
| 2 | Hero | `components/sections/Hero.tsx` | `siteContent.hero` | Implementado, difiere de la referencia — dirección con video confirmada, recurso actual temporal |
| 3 | Statement | `components/sections/Statement.tsx` | `siteContent.statement` | Implementado, coincide con la referencia |
| 4 | AboutUs (video) | `components/sections/AboutUs.tsx` | `siteContent.about` | Implementado, coincide con la referencia — video confirmado como elemento permanente, recurso actual temporal |
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

**Navbar** — Confirmado: debe actualizarse para alinearse con la referencia visual principal, y
sus enlaces deben revisarse para apuntar a la sección correcta de la landing. Hoy los links del
código (`Portafolio`, `Servicios`, `Proceso`, `Contacto`) difieren de los de la referencia
(`Cómo Funciona`, `Proyectos`, `Testimonios`, `Contacto`). Requisitos documentados para cuando se
implemente:

- los nombres de navegación deben corresponder a las secciones finales de la landing;
- los enlaces internos deben usar los identificadores (`href="#..."`) correctos de cada sección;
- debe existir una adaptación responsive para móvil (el código ya tiene un drawer móvil — evaluar
  si se conserva o se ajusta al alinear con la referencia);
- el diseño y comportamiento deben mantenerse centralizados y reutilizables (copy en
  `siteContent.nav`, como ya es el patrón).

No modificar todavía — solo queda documentado como decisión confirmada y pendiente de ejecución.

**Hero** — Confirmado: el uso de **video se mantiene como dirección definitiva** del Hero, porque
comunica mejor el carácter visual e inmersivo de Ruum. El video actual (`assets.mixkit.co`) es
**temporal** y se reemplazará cuando llegue el recurso oficial. La implementación final deberá
cumplir:

- el video no debe bloquear la primera carga;
- debe usar un poster optimizado;
- debe reservar correctamente su espacio para evitar layout shift (CLS);
- debe tener un fallback estático;
- debe funcionar correctamente en móvil;
- no debe descargar recursos innecesarios;
- debe respetar `prefers-reduced-motion`;
- el mensaje principal (headline + CTAs) debe seguir siendo comprensible aunque el video no cargue
  o no se reproduzca;
- el reemplazo del video debe poder hacerse fácilmente desde una fuente centralizada
  (`siteContent.hero`), sin modificar la estructura del componente.

No modificar todavía — solo queda documentado como decisión confirmada y pendiente de ejecución.
Detalle de reglas de performance asociadas en
[performance-guidelines.md](./performance-guidelines.md).

**AboutUs (video)** — Confirmado: la sección **conserva el video como elemento principal**. Debe
prepararse para que el recurso se pueda reemplazar fácilmente cuando llegue el video definitivo,
sin modificar la estructura interna del componente. El video deberá configurarse desde contenido/
configuración centralizada (`siteContent.about.video`, como ya es el patrón) y contemplar:

- poster;
- fallback;
- lazy loading cuando corresponda;
- dimensiones o relación de aspecto estable;
- comportamiento responsive;
- reproducción accesible;
- buena experiencia en conexiones lentas.

Nota técnica actual: `siteContent.about.video.poster` ya existe como campo pero está vacío (`""`)
y el componente no lo usa — no hay poster real configurado todavía. No modificar todavía — solo
queda documentado como decisión confirmada y pendiente de ejecución.

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
