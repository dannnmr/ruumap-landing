/**
 * Carga directa de GA4 (`gtag.js`), sin Google Tag Manager. Todo acá es
 * consciente de `NEXT_PUBLIC_GA_MEASUREMENT_ID`: si no está configurada,
 * cada función es un no-op — nunca se inyecta el script ni se llama a
 * `gtag` (ver openspec/changes/establish-seo-and-basic-analytics/specs/
 * analytics-consent, "Missing measurement ID disables analytics without
 * errors").
 *
 * Consent Mode v2: `setDefaultConsentState()` debe correr antes de que el
 * script de GA4 pueda estar presente (contrato de Consent Mode de Google).
 * `loadGA4()`/`unloadGA4()` inyectan/retiran el propio `<script>` — la
 * revocación no solo dispara `consent update`, también saca el script del
 * DOM, así que un `gtag` colgado no puede seguir despachando nada (ver
 * design.md, "Revocation tears down the client, not just future calls").
 */

const GA_SCRIPT_ID = "ga4-gtag-script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureDataLayer(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

/** ID de medición configurado, o `undefined` si está ausente/vacío. */
export function getMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return id && id.length > 0 ? id : undefined;
}

/**
 * Fija los defaults de Consent Mode v2 en "denied" antes de cualquier carga
 * de GA4. No-op si no hay measurement ID configurado (no crea `dataLayer` ni
 * llama a `gtag` en ese caso).
 */
export function setDefaultConsentState(): void {
  if (typeof window === "undefined" || !getMeasurementId()) return;
  ensureDataLayer();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

/** Actualiza la señal de Consent Mode. No-op si no hay measurement ID configurado. */
export function updateConsentState(decision: "granted" | "denied"): void {
  if (typeof window === "undefined" || !getMeasurementId()) return;
  ensureDataLayer();
  window.gtag?.("consent", "update", { analytics_storage: decision });
}

/** Si el `<script>` de gtag.js está actualmente inyectado en el documento. */
export function isGA4Loaded(): boolean {
  return typeof document !== "undefined" && document.getElementById(GA_SCRIPT_ID) !== null;
}

/**
 * Inyecta el script de GA4 y configura la propiedad. No-op si no hay
 * measurement ID o si ya está cargado (evita duplicar el `<script>`).
 */
export function loadGA4(): void {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof document === "undefined" || isGA4Loaded()) return;

  ensureDataLayer();
  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Retira el script de GA4 del documento y actualiza Consent Mode a
 * "denied". Después de esto, `isGA4Loaded()` vuelve a `false` — el guard de
 * disponibilidad que usa el helper de eventos (`lib/analytics/track.ts`)
 * para bloquear cualquier evento posterior a la revocación.
 */
export function unloadGA4(): void {
  if (typeof document === "undefined") return;
  document.getElementById(GA_SCRIPT_ID)?.remove();
  updateConsentState("denied");
}
