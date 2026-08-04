# Referencia de diseño

Fuente: `docs/references/` (4 imágenes provistas por el product owner: `landing-desktop.png`,
`footer.png`, `projects-secction.png`, `perfil.desarrollador.inmobiliario.png`). Este documento
describe únicamente lo observable en esas capturas. Son capturas de página completa a resolución
reducida (salvo `footer.png` y `projects-secction.png`, que son recortes más detallados):
detalles finos de pixel (colores exactos, tipografías, espaciados exactos) **no pueden
confirmarse** desde aquí y se marcan como pendientes.

## `landing-desktop.png` — referencia visual principal (confirmada)

Confirmado por el product owner (2026-08-04) como la **referencia visual principal** de la
landing corporativa. Fuente de verdad para identidad visual, sensación general, paleta,
tipografías, composición, jerarquía visual, espaciado, dirección artística, estilo premium/
arquitectónico/tecnológico, y estructura/apariencia general de las secciones.

No es necesario reproducirla pixel perfect. Se permiten adaptaciones cuando estén justificadas
por: mejor experiencia de usuario, responsive, accesibilidad, rendimiento, carga progresiva de
recursos, o mantenibilidad — pero deben conservar claramente la intención visual de la
referencia. **Las diferencias actuales del código no deben considerarse automáticamente
decisiones aprobadas** — ver [page-structure.md](./page-structure.md) para el detalle sección por
sección de qué difiere y qué debe revisarse.

Coincide en textos y orden general de secciones con esta landing (`app/page.tsx`) — todo indica
que es el mockup/maqueta de referencia para **este** sitio, tal como sugiere el comentario en
`app/globals.css` ("Design tokens — traducidos de los oklch() inline de la maqueta").

### Dirección visual observable

- Tema oscuro (fondo casi negro), texto blanco/gris claro.
- Color de acento naranja/ámbar usado en CTAs, micro-labels (eyebrows) y números destacados.
- Tipografía display de peso ligero para headlines grandes, alto contraste de tamaño entre
  headline y body copy.
- Mucho espacio negativo entre secciones.
- Fotografía arquitectónica de alto contraste (fachadas, interiores, tomas aéreas).
- Layout que alterna secciones full-bleed (imagen a todo el ancho) con contenido centrado a un
  max-width.
- Ritmo de scroll marcadamente cinematográfico (parece pensado para pinning/scroll-driven
  animation, coherente con lo que ya implementa el código vía GSAP + ScrollTrigger).

### Secciones observables (de arriba a abajo)

1. **Header**: logo "ruum" a la izquierda, links de navegación centrados, botón CTA naranja a la
   derecha.
2. **Hero**: imagen de fondo **estática** (arquitectura/atardecer, con textura de grano visible),
   degradado oscuro superpuesto, headline grande alineado a la izquierda, dos CTAs (uno sólido,
   uno de texto/outline).
3. **Statement**: frase centrada de gran tamaño, sin imagen.
4. **Video/About**: reproductor de video con marco redondeado oscuro y botón de play circular,
   CTA debajo.
5. **Stats**: 4 cifras con label corto cada una, separadas por línea horizontal.
6. **Feature rows**: 5 bloques que alternan imagen + texto en columna vertical (cada bloque
   parece ocupar el ancho completo, uno debajo del otro).
7. **Reveal gallery ("Últimos proyectos añadidos")**: fila de tarjetas de proyecto compactas (3
   visibles) con controles de navegación (flechas).
8. **Logos/clientes**: grid de ~8 logos bajo el título "Empresas relacionadas y clientes del
   ecosistema Ruum."
9. **Closing CTA**: headline + botón CTA + bloque de contacto/testimonio con foto de una persona,
   nombre y datos de contacto (teléfono, email).
10. **Footer**: logo + columnas de links. Visible pero con detalle no completamente legible en la
    captura disponible — pendiente de verificación contra el archivo fuente.

## `footer.png` — detalle del Footer (referencia adicional, confirmada)

Recorte de mayor detalle del Footer, a usarse junto con `landing-desktop.png`. Observable:

- **Estructura**: logo "ruum" (icono + wordmark) + tagline a la izquierda; tres columnas de links
  a la derecha; barra inferior con copyright + iconos sociales.
- **Columnas**: "PRODUCTO" (Proyectos, Recorridos 3D, Precios), "COMPAÑÍA" (Nosotros, Contacto),
  "LEGAL" (Privacidad, Términos).
- **Tagline**: "La solución de visualización virtual y gestión en tiempo real para proyectos en
  pre-venta de todo el mundo."
- **Redes sociales**: dos iconos redondeados (Facebook, Instagram) en la barra inferior derecha.
  No hay datos de contacto (email/teléfono/dirección) visibles en esta referencia.
- **Copyright**: "© 2026 ruum. Todos los derechos reservados." alineado a la izquierda de la
  barra inferior.
- **Jerarquía/composición**: fondo oscuro, títulos de columna en mayúsculas y gris tenue, links en
  gris claro, separador horizontal entre el bloque de columnas y la barra de copyright.
- **Comportamiento responsive**: no observable en esta captura (parece ser un recorte desktop) —
  pendiente.

Comparado con `content/site.ts` actual: los labels de la columna "Producto" difieren (código:
"Recorridos virtuales, Planos 2D/3D, Amenidades, Precios" — 4 items; referencia: "Proyectos,
Recorridos 3D, Precios" — 3 items), la tagline difiere, y el componente `Footer.tsx` actual **no**
renderiza iconos de redes sociales. Detalle completo del estado en
[page-structure.md](./page-structure.md).

## `projects-secction.png` — detalle de la sección de proyectos (referencia adicional, confirmada)

Recorte de mayor detalle de la sección "Últimos proyectos añadidos" (la misma que aparece de forma
más comprimida en `landing-desktop.png`). Observable:

- **Eyebrow**: "CATÁLOGO ACTIVO".
- **Heading**: "Últimos proyectos añadidos".
- **Tarjetas**: 3 visibles, cada una con: imagen del proyecto, nombre del proyecto, nombre del
  desarrollador (en mayúsculas, tamaño menor), ubicación ("Santa Cruz de la Sierra, Bolivia."), y
  un link "Ver proyecto" en color de acento.
- **Navegación**: flechas de carrusel (anterior/siguiente) en la esquina inferior derecha.
- **Proyectos y desarrolladores observados en la imagen**: Itaguá — STTO GROUP; Buen Retiro —
  KOHLER & WEISS REAL ESTATE DEVELOPMENT; Artemis — SYMPRAX. Esto es lo que se **observa** en la
  captura; el product owner indicó explícitamente que la relación exacta proyecto↔desarrollador
  todavía debe confirmarse oficialmente antes de tratarse como definitiva — no usar estos pares
  como dato confirmado sin esa confirmación.

Comparado con la implementación actual (`RevealGallery.tsx`): la referencia usa tarjetas
compactas en fila con carrusel, con desarrollador/ubicación/CTA por tarjeta; el código actual usa
paneles verticales full-bleed (uno por proyecto, 4 proyectos: Artemis, Itagua, PV Norte, Buen
Retiro) sin desarrollador, ubicación ni "Ver proyecto". Detalle completo en
[page-structure.md](./page-structure.md).

## `perfil.desarrollador.inmobiliario.png` — perfil inmobiliario (confirmado, fuera de la landing)

Es el mockup de una **página/vista distinta** de la landing corporativa: un perfil público de un
"desarrollador inmobiliario" (ejemplo mostrado: "STTO Group"). Tema **claro** (fondo blanco/gris
claro), a diferencia del tema oscuro de la landing.

Secciones observables: header con logo + redes sociales + dirección; video; sección "Construyendo
Futuros Sostenibles" (about con imagen); bloque de liderazgo con foto y cita de una persona;
"Proyectos añadidos" (grid de 3 columnas); "Otros proyectos" (portafolio); "Notas de Prensa" (3
cards de prensa); footer oscuro con columnas.

**Confirmado por el product owner (2026-08-04)**: esta referencia es la estructura base de un
**perfil inmobiliario** reutilizable — una vista relacionada con los proyectos y desarrolladores
que muestra la landing, a la que se llega al seleccionar un proyecto/desarrollador (p. ej. desde
la sección de proyectos). No es una sección de la landing corporativa en sí, sino una plantilla
que se reutilizará con contenido distinto por desarrollador/proyecto (ejemplos mencionados: STTO
Group, Buen Retiro, Artemis, SYMPRAX). Requerimiento de producto detallado en
[page-structure.md](./page-structure.md) — la arquitectura técnica (rutas, etc.) queda
explícitamente pendiente de una especificación posterior.

**Pendiente**: relación exacta proyecto↔desarrollador (no debe inventarse — ver nota sobre
`projects-secction.png` arriba), contenido completo de cada perfil, y comportamiento exacto de
navegación entre la landing y los perfiles.

## Elementos a preservar (según todas las referencias y las prioridades del proyecto)

- Paleta oscura + acento naranja de la landing principal (ya reflejada en los tokens de
  `app/globals.css`).
- Tipografía display ligera para headlines grandes.
- Ritmo de scroll cinematográfico (secciones full-bleed, pinning) — ya presente en la
  implementación actual y parece intencional/coherente con "premium, arquitectónica, inmersiva".
- Uso de fotografía arquitectónica de alto contraste.
- Estructura de tarjeta de proyecto con desarrollador, ubicación y CTA "Ver proyecto"
  (`projects-secction.png`).
- Estructura del Footer (logo + tagline + tres columnas + barra de copyright con iconos sociales)
  observada en `footer.png`.

## Pendiente — no debe inventarse

- Colores exactos (hex/oklch) del mockup más allá de lo ya tokenizado en `app/globals.css`.
- Tipografía exacta usada en el mockup (el código usa "Satoshi" vía CDN — no confirmado contra el
  mockup fuente).
- Especificaciones exactas de espaciado/grid.
- Copy final para Stats, Feature rows, Reveal gallery, sección de Logos/clientes, y el bloque de
  contacto/testimonio del Closing CTA — el código actual tiene copy propio que difiere del mockup
  en varias secciones (ver [page-structure.md](./page-structure.md) para el detalle sección por
  sección).
- SVG y clasificación de los logos de clientes/aliados.
- Datos de contacto del Footer (no hay email/teléfono/dirección visibles en `footer.png`).
- Relación exacta proyecto↔desarrollador (ver nota sobre `projects-secction.png` arriba) y
  contenido completo de cada perfil inmobiliario.
