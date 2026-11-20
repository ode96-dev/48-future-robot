"use client";

import React from "react";
import { Volume2, VolumeX, Ticket, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { soundFx } from "@/lib/audio-synth";

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onOpenTickets: () => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

const MENU_ITEMS = [
  { num: "01", id: "hero", label: "Exhibition Overview" },
  { num: "02", id: "specimen-anatomy", label: "Anatomy of Specimen 48" },
  { num: "03", id: "exhibition-chapters", label: "Pavilion Wings" },
  { num: "04", id: "collection-gallery", label: "Curated Collection" },
  { num: "05", id: "symposium-schedule", label: "Daily Programme" },
  { num: "06", id: "visitor-info", label: "Passes & Floor Plan" },
];

export function MenuSheet({
  isOpen,
  onClose,
  onNavigate,
  onOpenTickets,
  isAudioActive,
  onToggleAudio,
}: MenuSheetProps) {
  const handleLinkClick = (id: string) => {
    soundFx.playClick();
    onClose();
    setTimeout(() => onNavigate(id), 150);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="justify-between overflow-y-auto">
        <div>
          <div className="border-b border-stone-900/20 pb-5 pr-12">
            <SheetTitle className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold tracking-tighter">
                48
              </span>
              <span className="text-xs font-medium tracking-wide text-stone-600">
                Exhibition Index
              </span>
            </SheetTitle>
            <SheetDescription className="mt-1">
              The Futuristic Robot Art Exhibition ©2026 · West Pavilion
            </SheetDescription>
          </div>

          <nav aria-label="Full exhibition index" className="my-8">
            <ul className="divide-y divide-stone-900/15 border-y border-stone-900/15">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className="group flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-stone-900/5 px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 cursor-pointer"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono-tabular text-xs text-stone-500">
                        {item.num}.
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-950 group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-stone-400 group-hover:text-stone-950 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-900/20">
          <div className="grid grid-cols-1 gap-2.5">
            <Button
              onClick={() => {
                soundFx.playClick();
                onOpenTickets();
              }}
              size="lg"
              className="w-full justify-center gap-2 rounded-none"
            >
              <Ticket className="h-4 w-4" />
              <span>Reserve Timed Pass</span>
            </Button>

            <Button
              variant="outline"
              onClick={onToggleAudio}
              className="w-full justify-center gap-2 rounded-none border-stone-900/30"
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Gallery Soundscape: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-stone-600" />
                  <span>Enable Gallery Soundscape</span>
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-600 pt-2">
            <span>Open Daily 10:00 – 22:00</span>
            <span>Gate 4 · Zurich</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
