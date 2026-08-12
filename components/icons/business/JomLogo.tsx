import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "jōm".
 */
export function JomLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 140 50"
      fill="currentColor"
      className="h-11 w-auto text-[#141414]"
      {...props}
    >
      <text
        x="0"
        y="38"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="40"
        fontWeight="800"
        letterSpacing="-1"
      >
        j<tspan letterSpacing="0">ō</tspan>m
      </text>
    </svg>
  );
}
