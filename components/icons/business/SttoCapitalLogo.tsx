import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "STTO CAPITAL".
 */
export function SttoCapitalLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 210 50"
      fill="none"
      className="h-11 w-auto text-[#141414]"
      {...props}
    >
      {/* House/Roof icon in box */}
      <g transform="translate(0, 3)">
        <rect x="0" y="0" width="44" height="44" stroke="currentColor" strokeWidth="2.5" fill="none" rx="3" />
        <path d="M22 10 L34 22 L10 22 Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <rect x="16" y="24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
      {/* STTO CAPITAL stacked typography */}
      <text
        x="54"
        y="24"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="2"
        fill="currentColor"
      >
        STTO
      </text>
      <text
        x="54"
        y="42"
        fontFamily="var(--font-sans), 'Inter', system-ui, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="4"
        fill="currentColor"
      >
        CAPITAL
      </text>
    </svg>
  );
}
