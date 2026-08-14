"use client";

import { useEffect, useRef } from "react";
import { track, type SectionViewId } from "@/lib/analytics/track";

/**
 * Dispara `section_view` como máximo una vez por sección y por carga de
 * página, solo después de que al menos el 50% de la sección permaneció
 * visible de forma continua durante al menos 1 segundo (ver
 * openspec/changes/establish-seo-and-basic-analytics/design.md, "section_view
 * dedup mechanism"). `track()` ya no-opea si analítica no está lista
 * (measurement ID ausente o consentimiento no otorgado), así que este hook
 * no necesita conocer el estado de consentimiento — solo observa
 * visibilidad y llama a `track()` sin condición adicional.
 */
export function useSectionViewTracking(
  sectionRef: React.RefObject<Element | null>,
  section: SectionViewId
) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasFiredRef.current || typeof IntersectionObserver === "undefined") return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (timer === null) {
            timer = setTimeout(() => {
              if (!hasFiredRef.current) {
                hasFiredRef.current = true;
                track({ name: "section_view", section });
              }
              observer.disconnect();
            }, 1000);
          }
        } else if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      if (timer !== null) clearTimeout(timer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);
}
