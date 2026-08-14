"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { readStoredConsent, writeStoredConsent, type ConsentDecisionValue } from "@/lib/consent/storage";
import { getMeasurementId, loadGA4, setDefaultConsentState, unloadGA4, updateConsentState } from "@/lib/analytics/ga4";

type ConsentContextValue = {
  /** `null` mientras no hay una decisión vigente (nunca decidida, vencida, corrupta o de otra versión). */
  decision: ConsentDecisionValue | null;
  /** Si el banner debe estar visible (sin decisión vigente, o reabierto manualmente). */
  bannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  /** Reabre el banner de preferencias (entrada permanente del footer) sin borrar la decisión actual. */
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Estado de consentimiento de analítica (2 categorías: Necesarias — siempre
 * activas, sin toggle; Analíticas — desactivada por defecto). Monta en
 * `app/layout.tsx`, envolviendo toda la app, para que tanto el banner como
 * cualquier entrada de "Preferencias de cookies" (Footer) puedan leer/
 * modificar la decisión vigente vía `useConsent()`.
 *
 * `bannerOpen` se mantiene en `false` hasta que el efecto de montaje leyó
 * `localStorage` (`hydrated`) — evita un parpadeo del banner en la primera
 * pintura para un visitante que ya tenía una decisión guardada.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [decision, setDecision] = useState<ConsentDecisionValue | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [manuallyOpened, setManuallyOpened] = useState(false);

  useEffect(() => {
    setDefaultConsentState();

    const stored = readStoredConsent();
    setDecision(stored);
    setHydrated(true);

    if (stored === "granted" && getMeasurementId()) {
      loadGA4();
      updateConsentState("granted");
    }
  }, []);

  const accept = useCallback(() => {
    writeStoredConsent("granted");
    setDecision("granted");
    setManuallyOpened(false);
    if (getMeasurementId()) {
      loadGA4();
      updateConsentState("granted");
    }
  }, []);

  const reject = useCallback(() => {
    writeStoredConsent("denied");
    setDecision("denied");
    setManuallyOpened(false);
    if (getMeasurementId()) {
      unloadGA4();
    }
  }, []);

  const reopen = useCallback(() => {
    setManuallyOpened(true);
  }, []);

  const bannerOpen = hydrated && (decision === null || manuallyOpened);

  return (
    <ConsentContext.Provider value={{ decision, bannerOpen, accept, reject, reopen }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent debe usarse dentro de <ConsentProvider>.");
  }
  return ctx;
}
