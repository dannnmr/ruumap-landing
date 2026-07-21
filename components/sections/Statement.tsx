"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const words = siteContent.statement.text.split(" ");

/**
 * Statement a pantalla completa: cada palabra arranca en opacity 0.15 y
 * sube a opacity 1 individualmente, con un tween scrub -> el "avance" de
 * la revelación está atado 1:1 a la posición del scroll (no al tiempo).
 */
export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const targets = wordRefs.current.filter(Boolean);

      gsap.fromTo(
        targets,
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
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
      className="flex min-h-screen items-center justify-center px-5 py-24 sm:px-10 lg:px-16"
    >
      <p className="max-w-[1400px] text-center font-display text-[clamp(30px,6.5vw,76px)] font-bold leading-[1.15] tracking-tight text-white">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
