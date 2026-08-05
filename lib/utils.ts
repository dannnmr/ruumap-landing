import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deriva iniciales (1-2 letras) de un nombre, para usar como fallback visual
 * cuando una imagen (logo, foto de representante) no está configurada —
 * ver components/profile/. "STTO Group" -> "SG", "SYMPRAX" -> "SY".
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
