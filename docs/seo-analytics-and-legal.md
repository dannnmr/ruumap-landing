# SEO técnico, analítica/consentimiento y páginas legales

Resumen de dos cambios implementados el 2026-08-14. El detalle completo (decisiones, specs,
escenarios verificables) quedó archivado en OpenSpec — este documento es el resumen de "qué se
construyó y qué queda pendiente" para no tener que releer los changes archivados cada vez.

- Detalle completo: `openspec/changes/archive/2026-08-14-establish-seo-and-basic-analytics/` y
  `openspec/changes/archive/2026-08-14-adopt-legal-terms-and-privacy-content/`.
- Contrato de comportamiento vigente (specs activas): `openspec/specs/seo-foundations/spec.md`,
  `openspec/specs/analytics-consent/spec.md`, `openspec/specs/legal-pages-content/spec.md`, y el
  requirement agregado a `openspec/specs/landing-marketing-sections/spec.md` ("FeatureSection
  exposes a section-level heading").

## 1. Base SEO técnica (`seo-foundations`)

- `lib/site-config.ts`: `getSiteUrl()` (lee `SITE_URL`, **lanza** si falta — nunca cae a un host
  de Vercel/localhost) e `isSiteIndexable()` (`SITE_INDEXABLE === "true"` estricto, fail-closed).
- `app/layout.tsx`: `metadataBase`, `robots` (noindex,nofollow salvo `SITE_INDEXABLE=true`),
  Open Graph/Twitter, JSON-LD `Organization`+`WebSite` (solo datos reales del repo — sin
  dirección/redes/premios inventados).
- `app/robots.ts` / `app/sitemap.ts`: `robots.txt` **siempre** permite crawl completo (nunca
  `Disallow: /`); el sitemap solo lista rutas cuando `SITE_INDEXABLE=true` (home + perfiles de
  desarrollador; `/privacidad`/`/terminos` quedan fuera a propósito).
- Canonical + OG propios en cada ruta (`/`, `/privacidad`, `/terminos`,
  `/desarrolladores/[slug]`).
- Copy SEO (`siteContent.meta` en `content/site.ts`) sigue el posicionamiento aprobado:
  "showrooms digitales/experiencias interactivas" como propuesta principal, "plataforma" solo como
  descriptor técnico — nunca protagonista del title/description.
- **FeatureSection** ganó un `<h2>` semántico (`sr-only`, invisible) para cerrar el salto de
  jerarquía de encabezados — el stack `sticky` de esa sección no tiene espacio para un heading
  visible sin correr el layout.

## 2. Analítica y consentimiento (`analytics-consent`)

- GA4 directo (`gtag.js`), **sin GTM**. Gateado por `NEXT_PUBLIC_GA_MEASUREMENT_ID` — si falta,
  todo el módulo queda inerte (sin script, sin llamadas a `gtag`, sin errores).
- Consent Mode v2: default `denied` antes de cualquier carga; solo se inyecta el script tras
  aceptación explícita.
- Consentimiento persistido en `localStorage` (`lib/consent/storage.ts`) como
  `{ version, decision, expiresAt }` — vencimiento real de 180 días evaluado en cada lectura;
  valor corrupto, incompleto o de versión distinta se trata como "no decidido" (vuelve a mostrar
  el banner).
- Banner (`components/consent/`) + entrada permanente "Preferencias de cookies" en el footer.
- 5 eventos, tipados con guard estructural anti-PII (`lib/analytics/track.ts`): `section_view`
  (una vez por sección/carga, ≥50% visible ≥1s — `hooks/useSectionViewTracking.ts`), `cta_click`,
  `project_open`, `profile_open`, `contact_click`. **No existe `form_submit`** — no hay ningún
  formulario en el sitio.
- Revocar consentimiento retira el script de GA4 del DOM (no solo dispara `consent update`),
  bloqueando eventos posteriores realmente.

### Variables de entorno (ver `.env.example`)
| Variable | Dónde se usa | Nota |
|---|---|---|
| `SITE_URL` | server-side, `lib/site-config.ts` | Sin default — build falla si falta. Local: `.env.local` (gitignored) con `http://localhost:3000`. |
| `SITE_INDEXABLE` | server-side | `"true"` solo en producción real. Cualquier otro valor (o ausente) = no indexable. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | client-side | Vacío = Analytics inerte. Ya configurada en Vercel (Production+Preview) con `G-3D9LNK534N`. |

## 3. Páginas legales (`legal-pages-content`)

`/privacidad` y `/terminos` fueron reemplazadas por completo con los documentos aprobados por el
equipo legal (`content/site.ts` → `legal.privacidad.document` / `legal.terminos.document`,
tipo `LegalDocument`, renderizados por `components/legal/LegalPage.tsx`).

- Transcripción **literal** de los PDFs aprobados (15 secciones Privacidad, 18 Términos), con solo
  un puñado de desviaciones autorizadas documentadas en el spec (`legal-pages-content`): 3 frases
  con calificador "(cuando se encuentren habilitados)" porque no existe ningún formulario en el
  sitio; el párrafo de consentimiento de Privacidad §1; dos párrafos nuevos sobre WhatsApp; y el
  contenido de Privacidad §11 "Cookies y tecnologías similares" (GA4/consentimiento).
- **La marca en estas dos páginas es "RUUM", no "Ruumap"** — decisión explícita y acotada del
  usuario, distinta del resto del sitio (que sigue en "Ruumap": `siteContent.brand.name`,
  `<title>`/OG/JSON-LD, dominio `ruumap.com`). Es una inconsistencia de marca intencional, no un
  bug — no "corregir" sin volver a confirmar con el usuario.
- **8 placeholders `{{...}}` siguen sin resolver a propósito**: `{{FECHA DE VIGENCIA}}`,
  `{{RAZÓN SOCIAL DE RUUM}}`, `{{NIT DE RUUM}}`, `{{DOMICILIO LEGAL DE RUUM}}`,
  `{{EMAIL DE PRIVACIDAD}}`, `{{EMAIL DE CONTACTO}}`, `{{CIUDAD}}`,
  `{{PROVEEDOR DE HOSTING / NUBE}}`. No hay ningún gate de build que dependa de ellos — el usuario
  los reemplaza manualmente cuando el equipo le entregue los datos, antes de migrar a Cloudflare.
- La caja "Sobre este documento" de los PDFs (nota interna sobre placeholders pendientes) **no**
  se transcribió — las páginas deben leerse como contenido terminado, no como borrador.
- `/privacidad#cookies` sigue siendo el destino del banner; el ancla ahora vive en la sección 11.

## 4. Pendientes conocidos (no resueltos en este trabajo)

- **`npm run lint` no corre**: el repo nunca tuvo ESLint instalado (ni en `package.json` ni en el
  lockfile — preexistente, no introducido por estos cambios). `next lint` pide instalarlo
  interactivamente; no se instaló sin aprobación explícita. Sustituto usado en su lugar:
  `npx tsc --noEmit` (0 errores en ambos cambios).
- **QA interactiva de navegador no completada**: aceptar/rechazar/reabrir el banner, revocación,
  y los 3 casos de `localStorage` (vencido/corrupto/versión distinta) están implementados y
  verificados por código + por el HTML generado en build, pero no se ejercitaron en un navegador
  real dentro de la sesión (no había `chromium-cli`/Playwright disponible, y no se instaló sin
  aprobación). Recomendado: probarlo manualmente contra `npm run dev` antes de dar por cerrado el
  cambio de analítica.
- **Imagen de Open Graph provisional**: se reutiliza el poster del video del Hero
  (`cdn.ruumap.com/fotograma_1_dec780ddbc.webp`) — no es un asset social 1200×630 dedicado.
  Reemplazar en `content/site.ts` → `siteContent.meta.ogImage` cuando exista uno aprobado (no
  requiere cambios de código).
- **GA4 real end-to-end**: la propiedad ya existe (`G-3D9LNK534N`, configurada en Vercel), pero no
  se verificó que los eventos lleguen efectivamente a GA4 (solo se verificó la lógica de carga/
  gating en código y build).
- **Cambio `add-reusable-developer-profiles`**: sigue activo en `openspec/changes/` (marcado
  "Complete" pero no archivado) — es anterior a esta sesión, no se tocó; si querés que también se
  archive, decilo explícitamente.
