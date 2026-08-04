# Guía de performance

Reglas concretas derivadas de las prioridades del proyecto (ver
[product-context.md](./product-context.md)). Algunas ya se cumplen en el código actual (se marcan
como "patrón existente — mantener"); otras son reglas a aplicar cuando se toque ese código, con
autorización, porque hoy no se cumplen (se marcan como "pendiente").

## Imágenes

- Usar siempre `next/image` con un `sizes` ajustado al ancho real renderizado por breakpoint.
  *Patrón existente — mantener* (ya es así en `FeatureSection`, `RevealGallery`, `HowItWorks`).
- Marcar `priority` únicamente en el asset realmente above-the-fold (hoy: el logo del `Navbar`).
  No agregar `priority` a imágenes de secciones inferiores.
- Mantener siempre un `alt` descriptivo (ya es el patrón vía `SiteImage.alt` en
  `content/site.ts`).
- Al reemplazar los placeholders de Unsplash por assets finales, servir tamaños ya optimizados
  (no la resolución original completa) y declarar el dominio final en
  `next.config.ts` → `images.remotePatterns` antes de usarlo.

## Videos

- Todo `<video>` debe declarar `poster` con un frame liviano (jpg/webp) para evitar salto de
  layout y mostrar algo antes de que el video cargue. *Pendiente*: `siteContent.about.video.poster`
  existe como campo pero está vacío, y el `<video>` del `Hero` no declara `poster` en absoluto.
- Video de fondo/autoplay: siempre `muted` + `playsInline`, nunca con audio.
- Mantener el peso del archivo de video lo más bajo posible (validar tamaño real del asset antes
  de usarlo en producción; evaluar recortar duración/resolución para el video del Hero).
- Evaluar diferir la carga del video del Hero hasta después del primer paint, o servir un
  poster/imagen estática en conexiones lentas, en vez de forzar autoplay inmediato siempre (ver
  "Conexiones lentas" abajo).

## Hero — requisitos específicos (confirmado 2026-08-04)

El video se mantiene como dirección definitiva del Hero (ver
[page-structure.md](./page-structure.md)); el video actual es temporal. La implementación final
debe cumplir:

- el video no debe bloquear la primera carga;
- debe usar un poster optimizado;
- debe reservar correctamente su espacio para evitar layout shift (dimensiones/aspect-ratio fijos
  antes de que el video cargue);
- debe tener un fallback estático (poster o imagen) si el video no carga o no se reproduce;
- debe funcionar correctamente en móvil;
- no debe descargar recursos innecesarios (ej. no cargar el video si el fallback ya cumple en
  conexiones lentas o con `saveData`);
- debe respetar `prefers-reduced-motion`;
- el mensaje principal (headline + CTAs) debe seguir siendo comprensible aunque el video no cargue
  o no se reproduzca — nunca depender del video para transmitir el mensaje;
- el reemplazo del recurso de video debe poder hacerse desde una fuente centralizada
  (`siteContent.hero`), sin modificar la estructura del componente `Hero.tsx`.

## About Us — requisitos específicos (confirmado 2026-08-04)

El video se mantiene como elemento principal de esta sección; debe poder reemplazarse fácilmente
cuando llegue el recurso definitivo, sin tocar la estructura interna del componente. El video
debe configurarse desde `siteContent.about.video` (o equivalente centralizado) y contemplar:

- poster (hoy el campo existe pero está vacío — pendiente de un valor real);
- fallback si el video no carga;
- lazy loading cuando corresponda (esta sección no es above-the-fold);
- dimensiones o relación de aspecto estable (ya existe el patrón `before:pt-[56.25%]` para 16:9
  en el componente — mantenerlo/adaptarlo);
- comportamiento responsive;
- reproducción accesible (control de play/pausa visible y operable por teclado);
- buena experiencia en conexiones lentas.

## Recursos 3D / recorridos virtuales

Estos recursos son parte del producto (ver `product-context.md`) pero **no están integrados aún**
en el código de esta landing (hoy solo hay imágenes y video). Cuando se integren:

- Nunca cargar el visor 3D / recorrido automáticamente al entrar la sección en viewport.
- Mostrar siempre un poster/thumbnail estático primero, con un control explícito (ej. "Ver en 3D",
  "Iniciar recorrido") que dispare la carga bajo demanda.
- Cargar la librería/motor 3D con `next/dynamic` (`ssr: false`) para que no forme parte del bundle
  inicial de la página.
- No permitir que la carga del visor bloquee el hilo principal ni degrade el LCP de la sección.

## Animaciones y parallax (GSAP + ScrollTrigger + Lenis)

- Animar solo `transform`/`opacity`, nunca propiedades que disparen layout (`top`, `left`,
  `width`, `height`). *Patrón existente — mantener*, ya es así en todos los hooks y secciones
  actuales.
- Usar `scrub` de ScrollTrigger para animación ligada a scroll en vez de timelines basadas en
  tiempo fijo. *Patrón existente — mantener*.
- No agregar listeners de scroll nativos propios que dupliquen lo que ya maneja Lenis/GSAP.
- Respetar `prefers-reduced-motion`. *Pendiente*: ninguna sección del código actual lo hace hoy.
  Cualquier animación nueva debe verificar
  `window.matchMedia("(prefers-reduced-motion: reduce)")` y, si está activo, mostrar el estado
  final sin transición (o con una transición mínima) en vez del efecto completo. Aplicar el mismo
  criterio a las secciones existentes solo con autorización explícita, ya que implica tocar
  código funcional.
- No usar pinning/parallax donde el efecto no sea perceptible o genere saltos (validar en
  viewports angostos).

## Logos / clientes — marquee (confirmado 2026-08-04)

Sección confirmada para implementación futura (pendiente de recibir los SVG — ver
[page-structure.md](./page-structure.md)). Cuando se construya:

- animar con CSS (`transform: translateX`, `@keyframes`) en vez de JS atado a scroll/rAF cuando
  sea posible, para que el movimiento no compita con el hilo principal ni con Lenis/GSAP;
- el loop debe ser continuo y sin saltos al reiniciarse (técnica típica: duplicar el track
  completo una vez para que el segundo tramo continúe exactamente donde termina el primero — la
  duplicación es del track completo generado desde datos, no de cada logo copiado a mano en el
  markup);
- los logos deben salir de una colección de datos centralizada (ej. array en `content/site.ts` o
  archivo dedicado), nunca hardcodeados uno por uno en JSX;
- si se usan dos filas con direcciones opuestas, cada una es una instancia del mismo componente
  parametrizado por dirección/velocidad, no una copia manual;
- debe pausarse (o mostrarse estática) cuando `prefers-reduced-motion` esté activo;
- los SVG deben servirse optimizados (sin metadata innecesaria) y con `alt`/`title` con el nombre
  de la empresa para accesibilidad;
- evitar que el marquee dispare reflow continuo — animar solo `transform`, con `will-change`
  puntual si hace falta.

## Conexiones lentas y carga progresiva

- Todo recurso pesado (video, 3D, recorrido virtual) necesita un fallback liviano (imagen
  estática/poster) que se muestre primero; el recurso completo se carga de forma progresiva o
  bajo interacción del usuario.
- Evaluar detectar conexión lenta (`navigator.connection?.effectiveType`, `navigator.connection?.saveData`)
  para decidir si el autoplay de video de fondo se reemplaza por un poster estático. *Pendiente*
  — no implementado hoy.
- Priorizar que el contenido above-the-fold (texto del Hero, CTAs) sea legible e interactivo antes
  de que el video de fondo termine de cargar.

## Responsive

- Mantener `sizes` de `next/image` ajustado por breakpoint. *Patrón existente — mantener*.
- Las secciones con pinning/scroll horizontal (`FeatureSection`, `HowItWorks`, `RevealGallery`)
  usan unidades `vw`/`vh` que escalan, pero no hay evidencia de testing en dispositivos reales —
  *pendiente de verificación* antes de dar por buena la experiencia en móvil.

## Fallbacks

- Video: `poster` obligatorio; sin JS o antes de cargar, debe verse el poster, no una caja negra.
- 3D / recorridos: thumbnail + botón explícito, nunca un visor vacío cargando en silencio.
- Imágenes remotas: `alt` siempre presente (ya se cumple) para degradar bien si la imagen no
  carga.

## Lazy loading

- `next/image` ya aplica lazy loading por defecto salvo en elementos con `priority` — mantener el
  criterio de que solo el primer elemento visible en el viewport inicial lleve `priority`.
- Diferir la inicialización de cualquier librería pesada (motor 3D, SDK de recorrido virtual)
  hasta que la sección correspondiente esté cerca del viewport (IntersectionObserver) o hasta
  interacción del usuario, no en el mount inicial de la página.
