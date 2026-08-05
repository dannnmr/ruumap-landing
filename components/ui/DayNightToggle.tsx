"use client";

import { cn } from "@/lib/utils";

export type DayNightToggleProps = {
  mode: "day" | "night";
  onChange: (mode: "day" | "night") => void;
  className?: string;
};

/**
 * Pill switch sol/luna para alternar entre el render diurno y nocturno de
 * un `Feature` (ver `content/site.ts` -> `imageNight`). Controlado: el padre
 * (`FeatureSection`) guarda el estado y hace el crossfade de las imágenes;
 * este componente solo dibuja el switch y dispara `onChange`. Íconos SVG
 * hand-rolled, mismo patrón que el ícono de play/pause de
 * `components/ui/VideoPlayer.tsx` (sin agregar ninguna librería de íconos).
 */
export function DayNightToggle({
  mode,
  onChange,
  className,
}: DayNightToggleProps) {
  const isNight = mode === "night";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNight}
      aria-label={isNight ? "Ver render diurno" : "Ver render nocturno"}
      onClick={() => onChange(isNight ? "day" : "night")}
      className={cn(
        "relative flex h-7 w-14 shrink-0 items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-colors duration-500 hover:border-white/40",
        className,
      )}
    >
      <span className="flex w-full items-center justify-between px-2 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "size-4 shrink-0 transition-all duration-500",
            isNight ? "scale-90 opacity-40" : "scale-100 opacity-100",
          )}
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn(
            "size-4 shrink-0 transition-all duration-500",
            isNight ? "scale-100 opacity-100" : "scale-90 opacity-40",
          )}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute left-1 top-1/2 size-5 -translate-y-1/2 rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out motion-reduce:transition-none",
          isNight ? "translate-x-7" : "translate-x-0",
        )}
      />
    </button>
  );
}
