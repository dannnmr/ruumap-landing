# Contexto de negocio — Ruum

> Fuente: contexto de negocio provisto directamente por el product owner (chat, 2026-08-04). No inferido del código.

## Qué es Ruum

Ruum ofrece servicios a **constructoras y desarrolladoras inmobiliarias**. Transforma proyectos
inmobiliarios en **experiencias digitales que ayudan a venderlos**, integrando:

- renders
- planos 2D
- visualizaciones 3D
- videos
- recorridos virtuales
- amenities
- información comercial
- otros recursos interactivos

Estas experiencias se desarrollan **principalmente con Next.js**.

## Objetivo de esta landing

Presentar y vender los servicios de Ruum a constructoras y desarrolladoras inmobiliarias. Debe
sentirse **premium, arquitectónica, tecnológica, visual e inmersiva**.

## Estado del proyecto

La landing ya fue iniciada siguiendo un diseño definido. **El código actual no debe considerarse
automáticamente la única referencia visual**: existen secciones completas, otras incompletas y
recursos temporales (p. ej. imágenes de Unsplash y video de stock usados como placeholders — ver
`content/site.ts`). Ver [design-reference.md](./design-reference.md) y
[page-structure.md](./page-structure.md) para el detalle de qué coincide con el diseño de
referencia y qué no.

## Decisiones confirmadas (2026-08-04)

El product owner confirmó las siguientes decisiones. Se consideran contexto definitivo del
proyecto hasta nueva indicación — ver el detalle técnico/visual de cada una en
[design-reference.md](./design-reference.md) y [page-structure.md](./page-structure.md).

- `docs/references/landing-desktop.png` es la **referencia visual principal** de la landing
  corporativa: fuente de verdad para identidad visual, sensación general, paleta, tipografías,
  composición, jerarquía visual, espaciado, dirección artística, estilo premium/arquitectónico/
  tecnológico, y estructura/apariencia general de las secciones. No hace falta reproducirla pixel
  perfect; se permiten adaptaciones justificadas por UX, responsive, accesibilidad, rendimiento,
  carga progresiva o mantenibilidad — pero deben conservar la intención visual de la referencia.
  **Las diferencias actuales del código frente a esa referencia no deben considerarse
  automáticamente aprobadas.**
- El **Navbar** debe alinearse posteriormente con la referencia visual principal, con sus enlaces
  apuntando a las secciones correctas.
- El **Hero final usará video** — es la dirección definitiva porque comunica mejor el carácter
  visual e inmersivo de Ruum. El video actual es temporal y se reemplazará cuando llegue el
  recurso oficial.
- **About Us** conservará el video como elemento principal, preparado para reemplazo fácil del
  recurso sin tocar la estructura del componente.
- Las demás secciones (Statement, RevealGallery/proyectos, Stats, FeatureSection, HowItWorks,
  ClosingCTA, Footer) deben aproximarse visual y estructuralmente a la referencia principal y a
  las referencias adicionales en `docs/references/`; lo ya implementado se reutiliza solo cuando
  es compatible, no por inercia.
- La **sección de logos/clientes** de la referencia sí se implementará. Los SVG de cada empresa y
  su clasificación llegarán después — no deben inventarse logos, empresas ni relaciones
  comerciales. Usará una animación tipo marquee/logo-ticker continuo.
- `docs/references/footer.png` es una referencia adicional para documentar el Footer con más
  detalle, junto a `landing-desktop.png`.
- `docs/references/perfil.desarrollador.inmobiliario.png` **sí corresponde al producto**: es la
  estructura base de un **perfil inmobiliario** reutilizable (una vista distinta de la landing
  corporativa) al que se llega al seleccionar un proyecto/desarrollador. Ejemplos mencionados:
  STTO Group, Buen Retiro, Artemis, SYMPRAX — la relación exacta proyecto↔desarrollador todavía
  debe confirmarse, no debe asumirse a partir de lo que se vea en las referencias.
- Cada perfil inmobiliario tendrá una acción **"Ver proyecto"** que apunta a una URL específica
  por proyecto, provista más adelante; no debe hardcodearse ni inventarse ninguna URL mientras
  tanto.

## Pendiente (actualizado 2026-08-04)

- Videos definitivos (Hero y About Us) y sus posters definitivos.
- Archivos SVG de los logos de la sección de clientes/aliados, y su clasificación.
- Contenido definitivo del Footer (más allá de lo observable en `footer.png` /
  `landing-desktop.png`).
- Relación exacta entre cada proyecto y su desarrollador (no debe inventarse; ver nota sobre
  `projects-secction.png` en [design-reference.md](./design-reference.md)).
- Información completa de cada perfil inmobiliario.
- URLs de la acción "Ver proyecto" por proyecto.
- Comportamiento exacto de navegación entre la landing corporativa y los perfiles inmobiliarios.
- Mercado/alcance geográfico de Ruum como empresa (los proyectos de ejemplo en las referencias
  están en Santa Cruz de la Sierra, Bolivia — no debe asumirse que ese es el mercado objetivo
  general sin confirmación).
- Tamaño/segmento de cliente objetivo (constructoras boutique vs. grandes desarrolladoras, etc.).

## Prioridades del proyecto (dadas por el product owner)

- Mantener el diseño existente.
- No rediseñar secciones sin autorización.
- Buena experiencia en conexiones lentas.
- Optimización de imágenes, videos y recursos 3D.
- Carga progresiva de recursos pesados.
- Evitar saltos de layout.
- Utilizar posters o fallbacks antes de videos y experiencias 3D.
- Animaciones y parallax eficientes.
- Respetar `prefers-reduced-motion`.
- Evitar componentes repetidos; crear componentes reutilizables cuando exista repetición real.
- Centralizar colores, tipografías, espaciados y otros tokens.
- Mantener el contenido separado de los componentes visuales.
- No instalar dependencias sin justificarlo y recibir aprobación.
- No reemplazar partes funcionales sin explicar la mejora.

Estas prioridades se traducen en reglas concretas en
[performance-guidelines.md](./performance-guidelines.md) y en las reglas agregadas a
[CLAUDE.md](../CLAUDE.md).

Ver la sección "Pendiente (actualizado 2026-08-04)" más arriba para el listado vigente de lo que
todavía falta confirmar.
