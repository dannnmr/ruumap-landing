import { RefObject, useEffect, useState } from "react";

/**
 * Reporta si el elemento referenciado está actualmente visible en el
 * viewport, vía IntersectionObserver. Genérico — no sabe nada de video; cada
 * consumidor decide qué hacer con el booleano (reanudar automáticamente,
 * quedarse pausado, diferir carga de un recurso pesado, etc.).
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options?.threshold, options?.root, options?.rootMargin]);

  return isInViewport;
}
