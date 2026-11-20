"use client";

import React, { useState, useEffect } from "react";
import { soundFx } from "@/lib/audio-synth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MenuSheet } from "./menu-sheet";
import { VisitorInfoTickets } from "../visitor-info-tickets/visitor-info-tickets";

export function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    soundFx.playClick();
    const active = soundFx.toggleAmbient();
    setIsAudioActive(active);
  };

  const handleNavClick = (sectionId: string) => {
    soundFx.playClick();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b border-stone-900/20 ${
          hasScrolled ? "bg-[#EAE8E3]/92 backdrop-blur-md" : "bg-[#EAE8E3]"
        }`}
      >
        <div className="max-w-380 mx-auto grid grid-cols-12 items-stretch border-x border-stone-900/15 h-14">
          <div className="col-span-4 lg:col-span-3 flex items-stretch border-r border-stone-900/20">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setIsMenuOpen(true);
              }}
              aria-label="Open exhibition index menu"
              aria-expanded={isMenuOpen}
              className="w-full bg-[#111110] text-[#EAE8E3] hover:bg-stone-800 transition-colors px-4 sm:px-6 flex items-center justify-between lg:justify-end gap-4 text-xs font-semibold tracking-[0.18em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white whitespace-nowrap"
            >
              <span>Menu</span>
              <span className="flex flex-col gap-1 w-5" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-[#EAE8E3]" />
                <span className="h-[1.5px] w-full bg-[#EAE8E3]" />
                <span className="h-[1.5px] w-full bg-[#EAE8E3]" />
              </span>
            </button>
          </div>

          <div className="col-span-4 lg:col-span-6 flex items-center justify-center border-r border-stone-900/20">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("hero");
              }}
              className="inline-flex items-center justify-center px-3 py-1 font-display text-2xl sm:text-[26px] font-extrabold tracking-[-0.09em] text-stone-950 select-none hover:opacity-75 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
              aria-label="48 Exhibition Home"
            >
              48
            </a>
          </div>

          <nav
            aria-label="Primary sections"
            className="col-span-4 lg:col-span-3 flex items-center justify-end lg:justify-between px-3 sm:px-6 gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => handleNavClick("exhibition-chapters")}
              className="hidden sm:inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-stone-900 hover:underline underline-offset-4 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
            >
              Exhibition
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("visitor-info")}
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-stone-900 hover:underline underline-offset-4 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
            >
              Info
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("collection-gallery")}
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-stone-900 hover:underline underline-offset-4 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
            >
              Collection
            </button>
          </nav>
        </div>
      </header>

      <MenuSheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavClick}
        onOpenTickets={() => {
          setIsMenuOpen(false);
          setIsTicketDialogOpen(true);
        }}
        isAudioActive={isAudioActive}
        onToggleAudio={toggleSound}
      />

      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-none border-stone-900">
          <DialogHeader>
            <DialogTitle className="font-display">
              Timed Entry Passes
            </DialogTitle>
            <DialogDescription>
              Reserve timed admission to all four pavilion wings of The
              Futuristic Robot Art Exhibition ©2026.
            </DialogDescription>
          </DialogHeader>
          <VisitorInfoTickets
            embedded
            onComplete={() => setIsTicketDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
