/**
 * Persistencia del consentimiento de analítica en `localStorage` (no cookie
 * — ver openspec/changes/establish-seo-and-basic-analytics/design.md,
 * "Consent storage mechanism": nada server-rendered depende del
 * consentimiento, así que no hace falta que SSR pueda leerlo).
 *
 * El valor guardado es `{ version, decision, expiresAt }`. La lectura
 * (`readStoredConsent`) hace una comparación real de `expiresAt` contra el
 * reloj actual en cada llamada — no es un campo guardado y nunca revisado —
 * y trata como "sin consentimiento" (retorna `null`) cualquiera de estos
 * casos: clave ausente, valor que no parsea, valor incompleto/mal formado,
 * `version` desactualizada, o `expiresAt` vencido. Ningún de esos casos
 * lanza: todos degradan silenciosamente a "no decidido todavía", que es lo
 * que hace que el banner vuelva a mostrarse.
 */

export const CONSENT_STORAGE_KEY = "ruumap:consent";

/** Bump solo cuando cambia el propio esquema de consentimiento (no en cada edit de copy). */
export const CONSENT_SCHEMA_VERSION = 1;

export const CONSENT_TTL_DAYS = 180;

export type ConsentDecisionValue = "granted" | "denied";

export type StoredConsent = {
  version: number;
  decision: ConsentDecisionValue;
  /** ISO-8601, calculado como `decidedAt + 180 días` en el momento de guardar. */
  expiresAt: string;
};

function isStoredConsent(value: unknown): value is StoredConsent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.version === "number" &&
    (candidate.decision === "granted" || candidate.decision === "denied") &&
    typeof candidate.expiresAt === "string" &&
    !Number.isNaN(Date.parse(candidate.expiresAt))
  );
}

/**
 * Devuelve la decisión vigente, o `null` si no hay ninguna (ausente,
 * corrupta, de una versión anterior, o vencida) — en todos esos casos el
 * llamador debe tratarlo como "no decidido todavía" y volver a mostrar el
 * banner.
 */
export function readStoredConsent(): ConsentDecisionValue | null {
  if (typeof window === "undefined") return null;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null; // localStorage inaccesible (modo privado, cuota, etc.)
  }
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null; // valor corrupto
  }

  if (!isStoredConsent(parsed)) return null; // faltan campos o decision inválida
  if (parsed.version !== CONSENT_SCHEMA_VERSION) return null; // versión desactualizada
  if (Date.now() > Date.parse(parsed.expiresAt)) return null; // vencido (>180 días)

  return parsed.decision;
}

/** Guarda la decisión con un `expiresAt` a 180 días desde ahora. */
export function writeStoredConsent(decision: ConsentDecisionValue): void {
  if (typeof window === "undefined") return;

  const expiresAt = new Date(
    Date.now() + CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const value: StoredConsent = {
    version: CONSENT_SCHEMA_VERSION,
    decision,
    expiresAt,
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage llena/inaccesible: la decisión sigue aplicando en memoria
    // para esta carga de página, simplemente no persiste entre recargas.
  }
}
