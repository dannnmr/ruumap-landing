## Why

El Navbar actual no coincide con la referencia visual principal
(`docs/references/landing-desktop.png`, confirmada como fuente de verdad — ver
`docs/design-reference.md` y `docs/page-structure.md`): los labels de navegación difieren de la
referencia, el CTA de contacto está hardcodeado dos veces dentro de `Navbar.tsx`, y los
identificadores de sección que usan los links viven como strings independientes duplicados entre
`content/site.ts` y cada componente de sección, sin nada que impida que se desincronicen. El
drawer móvil, además, no cumple hoy los requisitos de accesibilidad por teclado del proyecto
(sin `aria-expanded`/`aria-controls`, sin cierre por Escape, sin bloqueo de scroll, sin
contención de foco). Resolver esto ahora — antes de avanzar con el resto de la landing — evita
seguir construyendo secciones nuevas sobre una navegación fragmentada y no accesible.

## What Changes

- Nueva fuente única y tipada de identificadores de sección (`lib/navigation.ts`), consumida tanto
  por `content/site.ts` como por cada sección destino, para que un `id` de sección nunca vuelva a
  existir como string independiente en más de un lugar.
- Labels y CTA del Navbar alineados provisionalmente con lo observable en la referencia visual
  principal (Proyectos, Servicios, "Cómo funciona", Contacto; CTA "Hablemos"), centralizados en
  `content/site.ts` y marcados explícitamente como provisionales.
- "Testimonios" (visible en la referencia, sin sección construida todavía) queda documentado como
  pendiente — no se renderiza como link roto ni deshabilitado.
- `nav.cta` pasa de string plano a `{label, target}` (mismo patrón que el resto de CTAs en
  `siteContent`); ningún `"#contacto"` queda escrito a mano dentro de `Navbar.tsx`.
- El drawer móvil gana accesibilidad completa por teclado, sin dependencias nuevas:
  `aria-expanded`/`aria-controls` en el trigger, `role="dialog"` + `aria-modal="true"` en el
  panel, cierre con Escape, devolución de foco al trigger al cerrar, bloqueo de scroll del body
  mientras está abierto, y contención de foco (con `inert` como refuerzo si el target de
  navegadores del proyecto lo cubre, nunca como único mecanismo).
- `HowItWorks` recibe el mismo tratamiento de scroll-offset que ya usan las demás secciones
  destino (`scroll-mt-*`, o el offset oficialmente soportado por Lenis si una prueba en ejecución
  demuestra que la solución CSS no alcanza), para que `#proceso` no quede oculto bajo el header
  fijo.
- `bg-[#1A1A1C]` y `border-white/5` del Navbar se reemplazan por los tokens existentes
  (`bg-surface`, `border-border`) únicamente donde una comparación visual confirme equivalencia
  con la referencia; donde no la haya, se conservan y se documenta el motivo. No se crea ningún
  token nuevo en este cambio.

## Capabilities

### New Capabilities

- `site-navigation`: comportamiento del Navbar (header fijo, links, CTA, drawer móvil) y de los
  destinos de navegación interna (identificadores de sección centralizados, offset de scroll) de
  la landing.

### Modified Capabilities

(ninguna — es el primer spec de este repo, no hay capacidades existentes en `openspec/specs/`)

## Impact

**Código afectado**: `components/sections/Navbar.tsx`, `content/site.ts` (bloque `nav`), nuevo
módulo `lib/navigation.ts`, el atributo `id` de `RevealGallery.tsx`, `FeatureSection.tsx`,
`HowItWorks.tsx` y `ClosingCTA.tsx` (solo ese atributo), y la clase de scroll-offset de
`HowItWorks.tsx`.

**Sin impacto en**: Hero, About Us, contenido de la sección de proyectos, Stats, FeatureSection
(contenido/layout interno), sección de logos, ClosingCTA (contenido) y Footer — ninguno cambia
visual ni estructuralmente en este change. Perfiles inmobiliarios no se implementan en este
cambio.

**Dependencias**: ninguna dependencia nueva (`package.json`/`package-lock.json` sin cambios).
