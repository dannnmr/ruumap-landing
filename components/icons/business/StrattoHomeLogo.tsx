import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "STRATTO HOME".
 */
export function StrattoHomeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 310 48"
      fill="none"
      className="h-11 w-auto text-[#141414]"
      {...props}
    >
      <text
        x="0"
        y="36"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="34"
        fontWeight="200"
        letterSpacing="7"
        fill="currentColor"
      >
        STRATTO
      </text>
      <g transform="translate(196, 4)">
        <rect x="0" y="0" width="108" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" rx="2" />
        <text
          x="54"
          y="27"
          fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
          fontSize="20"
          fontWeight="200"
          letterSpacing="4"
          fill="currentColor"
          textAnchor="middle"
        >
          HOME
        </text>
      </g>
    </svg>
  );
}
