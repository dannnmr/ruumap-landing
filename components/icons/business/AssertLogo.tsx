import type { SVGProps } from "react";

/**
 * Componente para el logotipo SVG de "assert".
 */
export function AssertLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 210 60" 
      fill="currentColor" 
      className="h-10 w-auto text-[#141414]" 
      {...props}
    >
      <g fill="currentColor">
        {/* Isometric 3D layers stack */}
        <path d="M24 6 L44 16 L24 26 L4 16 Z" />
        <path d="M4 19 L24 29 L44 19 L44 23 L24 33 L4 23 Z" />
        <path d="M4 26 L24 36 L44 26 L44 30 L24 40 L4 30 Z" />
        <path d="M4 33 L24 43 L44 33 L44 37 L24 47 L4 37 Z" />
        <path d="M4 40 L24 50 L44 40 L44 44 L24 54 L4 44 Z" />
        {/* assert typography */}
        <text 
          x="54" 
          y="44" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontSize="38" 
          fontWeight="800" 
          letterSpacing="-1.5"
        >
          assert
        </text>
      </g>
    </svg>
  );
}