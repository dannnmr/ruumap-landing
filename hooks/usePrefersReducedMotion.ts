import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Lee la preferencia `prefers-reduced-motion` del sistema/navegador y se
 * suscribe a cambios (el usuario puede togglearla sin recargar la página).
 * Genérico — no sabe nada de video ni de ninguna sección en particular.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(mediaQueryList.matches);

    function onChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
