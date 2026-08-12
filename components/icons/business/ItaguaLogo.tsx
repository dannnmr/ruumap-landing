import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "Itaguá".
 */
export function ItaguaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 220 54"
      fill="none"
      className="h-12 w-auto text-[#141414]"
      {...props}
    >
      {/* Drop/leaf emblem */}
      <g transform="translate(0, 5)">
        <path
          d="M 24 0 C 10 10, 0 24, 0 34 C 0 44, 10 48, 22 48 C 36 48, 44 36, 44 24 C 44 10, 32 0, 24 0 Z M 22 42 C 14 42, 6 38, 6 32 C 6 24, 14 14, 22 6 C 28 14, 38 22, 38 32 C 38 38, 30 42, 22 42 Z"
          fill="currentColor"
        />
        <path
          d="M 18 16 C 18 16, 26 24, 26 32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* Itaguá cursive typography */}
      <text
        x="56"
        y="38"
        fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', cursive, Georgia, serif"
        fontSize="38"
        fontStyle="italic"
        fill="currentColor"
      >
        Itaguá
      </text>
    </svg>
  );
}
