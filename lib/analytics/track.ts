/**
 * Único punto de envío de eventos a GA4. La unión discriminada de abajo es
 * el guard estructural anti-PII: cada variante solo admite campos no
 * personales (id de sección, label/target de CTA, nombre/slug de proyecto,
 * slug de desarrollador) — no existe una forma genérica
 * `track(name, payload: Record<string, unknown>)` por la que un caller
 * pueda colar un `email`/`phone`/`message`. Ver openspec/changes/
 * establish-seo-and-basic-analytics/specs/analytics-consent, "Tracked
 * events are limited to an explicit, PII-free set".
 *
 * `track()` no requiere que el caller verifique el estado de analítica:
 * revisa disponibilidad (measurement ID configurado + script de GA4
 * cargado) y no-opea en silencio si no está lista — incluye el caso de
 * consentimiento revocado, que retira el script (`unloadGA4()`) y por lo
 * tanto hace que `isGA4Loaded()` pase a `false`.
 */

import { getMeasurementId, isGA4Loaded } from "./ga4";

export type SectionViewId = "projects" | "features" | "how_it_works" | "contact";

export type AnalyticsEvent =
  | { name: "section_view"; section: SectionViewId }
  | { name: "cta_click"; label: string; target: string }
  | { name: "project_open"; project: string; developerSlug?: string }
  | { name: "profile_open"; developerSlug: string }
  | { name: "contact_click"; channel: "whatsapp" };

/** Measurement ID configurado y script de GA4 efectivamente cargado en el documento. */
export function isAnalyticsReady(): boolean {
  return typeof window !== "undefined" && Boolean(getMeasurementId()) && isGA4Loaded();
}

export function track(event: AnalyticsEvent): void {
  if (!isAnalyticsReady()) return;

  const { name, ...payload } = event;
  window.gtag?.("event", name, payload);
}
