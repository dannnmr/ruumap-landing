"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { siteContent } from "@/content/site";
import { sectionHref } from "@/lib/navigation";

// Botón de CTA quitado a propósito (pedido explícito del usuario,
// 2026-08-05): `nav.cta` sigue definida en content/site.ts (no se borró),
// pero ya no se consume acá — el link a ClosingCTA ahora vive como una
// entrada más de `nav.links` (ver content/site.ts). Para reintroducir el
// botón, volver a desestructurar `cta: NAV_CTA` de `siteContent.nav` acá y
// el import de `Button`.
const { links: NAV_LINKS } = siteContent.nav;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const lenis = useLenis();

  const closeMenu = () => setIsMobileMenuOpen(false);

  /**
   * Lenis no intercepta clicks en anchors por defecto (`anchors` no está
   * habilitado en SmoothScroll.tsx), así que sin esto un click en un link de
   * navegación produce un salto nativo instantáneo en vez de scroll suave.
   * `lenis.scrollTo()` ya lee `scroll-margin-top` del destino por sí solo
   * (ver node_modules/lenis/dist/lenis.js), así que no hace falta pasarle un
   * offset manual además del `scroll-mt-*` que ya llevan las secciones
   * destino. Se ignoran los clicks con modificador (nueva pestaña, etc.) y
   * se sincroniza el hash de la URL con `pushState` ya que `preventDefault`
   * evita que el navegador lo haga por su cuenta.
   */
  function handleNavClick(event: React.MouseEvent<HTMLElement>, hash: string) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(hash);
    window.history.pushState(null, "", hash);
  }

  /**
   * Mientras el drawer está abierto: bloquea el scroll de la página, hace
   * `inert` el resto del contenido (todo lo que no sea del propio Navbar,
   * marcado con data-navbar-root) para que no sea alcanzable por teclado ni
   * lectores de pantalla, mueve el foco dentro del panel, y contiene el Tab
   * dentro de él. Al cerrar (por cualquier vía: Escape, overlay, botón X, o
   * selección de un link/CTA) revierte todo y devuelve el foco al trigger.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;
    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";

    const mainEl = document.querySelector("main");
    const inertedSiblings = mainEl
      ? (Array.from(mainEl.children) as HTMLElement[]).filter(
          (el) => !el.hasAttribute("data-navbar-root"),
        )
      : [];
    inertedSiblings.forEach((el) => {
      el.inert = true;
    });

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
      inertedSiblings.forEach((el) => {
        el.inert = false;
      });
      triggerRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/*
        bg-[#1A1A1C] / border-white/5: comparados contra los tokens compartidos
        (bg-surface = oklch(15% 0 0) ≈ #0b0b0b, border-border = oklch(28% 0 0)
        ≈ #292929) mediante conversión OKLab exacta — #1A1A1C es notablemente
        más claro que bg-surface (L≈22% vs 15%) y border-border es opaco y
        mucho más visible que el hairline translúcido actual. Ninguno de los
        dos tokens es visualmente equivalente, así que se conservan los
        valores actuales tal cual, sin crear un token nuevo.
      */}
      <header
        data-navbar-root
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between
                   px-5 py-4 sm:px-8 sm:py-5 lg:px-12 bg-[#1A1A1C] border-b border-white/5"
      >
        <Image
          src="/assets/ruum_logo_black.png"
          alt="ruum"
          width={90}
          height={22}
          className="h-[20px] w-auto shrink-0 sm:h-[24px]"
          priority
        />

        <nav
          aria-label="Navegación principal"
          className="hidden flex-1 justify-center gap-8 whitespace-nowrap text-[14px] font-light tracking-wide
                     text-[#F2F2F2] lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const href = sectionHref(link.target);
            return (
              <a
                key={link.target}
                href={href}
                onClick={(event) => handleNavClick(event, href)}
                className="transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          {/* Botón de Menú Hamburguesa */}
          <button
            ref={triggerRef}
            type="button"
            className="lg:hidden text-gray-100 p-1"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-expanded={isMobileMenuOpen}
            aria-controls={panelId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar para Móviles — inert cuando está cerrado: su contenido no
          debe quedar en el orden de tabulación mientras está fuera de pantalla. */}
      <div
        data-navbar-root
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-background p-6 shadow-xl flex flex-col transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-8">
            <button
              type="button"
              className="text-gray-100 p-1"
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-[16px] font-medium text-gray-100">
            {NAV_LINKS.map((link) => {
              const href = sectionHref(link.target);
              return (
                <a
                  key={link.target}
                  href={href}
                  className="transition-colors hover:text-white"
                  onClick={(event) => {
                    handleNavClick(event, href);
                    closeMenu();
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
