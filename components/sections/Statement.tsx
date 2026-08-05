"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const mainWords = siteContent.statement.text.split(" ");
const subWords = siteContent.statement.second_text.split(" ");

/**
 * Statement a pantalla completa: cada palabra arranca en opacity 0.15 y
 * sube a opacity 1 individualmente, con un tween scrub -> el "avance" de
 * la revelación está atado 1:1 a la posición del scroll (no al tiempo).
 * 
 * Se animan el título y el subtítulo secuencialmente al apuntar todos los
 * spans al mismo arreglo de wordRefs.
 */
export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        ".reveal-word",
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.3, // Reducimos el tiempo entre palabras para que fluya más rápido
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%", // Empieza cuando la sección ya está bien entrada en la pantalla
            end: "bottom 75%", // Termina ANTES de que pases a la siguiente sección
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-center justify-center bg-background px-5 py-24 sm:px-10 lg:px-16"
    >
      <div className="flex flex-col items-center gap-8">
        <p className="max-w-[1200px] text-center font-display text-[clamp(28px,4vw,48px)] font-light leading-[1.25] tracking-tight text-white">
          {mainWords.map((word, i) => (
            <span key={`main-${word}-${i}`} className="reveal-word inline-block">
              {word}
              {i < mainWords.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <p className="max-w-[800px] text-center font-sans text-[18px] font-light leading-[1.6] text-gray-400">
          {subWords.map((word, i) => (
            <span key={`sub-${word}-${i}`} className="reveal-word inline-block">
              {word}
              {i < subWords.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
