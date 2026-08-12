import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "Frak".
 */
export function FrakLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 180 50"
      fill="none"
      className="h-11 w-auto text-[#141414]"
      {...props}
    >
      {/* Hexagonal 3D box icon */}
      <g transform="translate(0, 5)">
        <path
          d="M20 0 L38 10 L38 30 L20 40 L2 30 L2 10 Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M20 0 L20 40 M20 20 L38 10 M20 20 L2 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </g>
      {/* Frak typography */}
      <text
        x="50"
        y="37"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Frak
      </text>
    </svg>
  );
}
