"use client";

import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";

const { links: NAV_LINKS, cta: NAV_CTA } = siteContent.nav;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
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
          className="hidden flex-1 justify-center gap-8 whitespace-nowrap text-[14px] font-medium tracking-wide
                     text-gray-300 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <Button 
            href="#contacto" 
            variant="primary" 
            className="hidden lg:inline-flex rounded-[8px] px-6 py-2.5 text-[13px]"
          >
            {NAV_CTA}
          </Button>
          
          {/* Botón de Menú Hamburguesa */}
          <button
            type="button"
            className="lg:hidden text-gray-100 p-1"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar para Móviles */}
      <div 
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-background p-6 shadow-xl flex flex-col transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-8">
            <button 
              type="button"
              className="text-gray-100 p-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 text-[16px] font-medium text-gray-100">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <Button
              href="#contacto"
              variant="primary"
              className="mt-4 w-full rounded-[8px] py-3 text-[14px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {NAV_CTA}
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}
