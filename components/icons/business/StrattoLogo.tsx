import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "STRATTO".
 */
export function StrattoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="currentColor"
      className="h-11 w-auto text-[#141414]"
      {...props}
    >
      <text
        x="0"
        y="36"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="34"
        fontWeight="200"
        letterSpacing="8"
        fill="currentColor"
      >
        STRATTO
      </text>
    </svg>
  );
}
