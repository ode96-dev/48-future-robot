"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, Square, Share2, Check, BookmarkCheck } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import { Artwork } from "@/lib/artworks-data";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  const [plateTone, setPlateTone] = useState<"color" | "monochrome">("color");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    return () => {
      soundFx.stopNarration();
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      soundFx.stopNarration();
      setIsSpeaking(false);
      onClose();
    }
  };

  if (!artwork) return null;

  const toggleNarration = () => {
    soundFx.playClick();
    if (isSpeaking) {
      soundFx.stopNarration();
      setIsSpeaking(false);
    } else {
      const started = soundFx.speakNarration(artwork.audioTranscript, () => {
        setIsSpeaking(false);
      });
      setIsSpeaking(started);
    }
  };

  const handleShare = () => {
    soundFx.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRequestViewing = () => {
    soundFx.playFocusChime();
    setIsSaved(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 bg-[#EAE8E3] border border-stone-900 rounded-none">
        <div className="p-5 sm:p-6 pr-14 border-b border-stone-900/20 flex flex-wrap items-center justify-between gap-4 bg-[#E3E1DB]">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono-tabular text-xs text-stone-600">
              <span className="font-semibold text-stone-950">
                {artwork.accessionNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>{artwork.category}</span>
              <span aria-hidden="true">·</span>
              <span>{artwork.wing}</span>
            </div>
            <DialogTitle className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 mt-1">
              {artwork.title}
            </DialogTitle>
            <DialogDescription className="font-serif-editorial italic text-sm text-stone-700 mt-0.5">
              {artwork.subtitle}
            </DialogDescription>
          </div>

          <div className="flex items-center gap-1 border border-stone-900/20 bg-[#EAE8E3] p-0.5">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setPlateTone("color");
              }}
              className={`px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                plateTone === "color"
                  ? "bg-stone-950 text-stone-100"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              Color Plate
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setPlateTone("monochrome");
              }}
              className={`px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
                plateTone === "monochrome"
                  ? "bg-stone-950 text-stone-100"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              Monochrome
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-[#E1DFD9] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-900/20">
            <div className="relative w-full aspect-4/5 bg-[#EAE8E3] border border-stone-900/15 overflow-hidden">
              <Image
                src={artwork.image}
                alt={`${artwork.title} — ${artwork.subtitle}`}
                fill
                className={`object-cover transition-all duration-300 ${
                  plateTone === "monochrome" ? "grayscale contrast-125" : ""
                }`}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            <p className="mt-4 font-serif-editorial italic text-xs text-stone-600">
              Fig. {artwork.accessionNumber} — {artwork.artist}, {artwork.year}.
            </p>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <Tabs defaultValue="provenance" className="w-full">
              <TabsList className="rounded-none bg-[#E1DFD9] border border-stone-900/20">
                <TabsTrigger
                  value="provenance"
                  className="rounded-none normal-case text-xs"
                >
                  Curatorial Note &amp; Provenance
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-none normal-case text-xs"
                >
                  Material Specifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="provenance" className="space-y-5 mt-5">
                {artwork.award && (
                  <p className="text-xs font-medium text-stone-700 border-l-2 border-stone-950 pl-3">
                    {artwork.award}
                  </p>
                )}

                <p className="text-sm text-stone-800 leading-relaxed">
                  {artwork.curatorNote}
                </p>

                <div className="p-4 bg-[#E1DFD9] border border-stone-900/20 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-950">
                      <Volume2 className="h-4 w-4" />
                      <span>
                        Curator Audio Commentary ({artwork.audioDuration})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={toggleNarration}
                      className="rounded-none gap-1.5 text-xs h-8"
                    >
                      {isSpeaking ? (
                        <>
                          <Square className="h-3 w-3" />
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3.5 w-3.5" />
                          <span>Listen</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="font-serif-editorial italic text-sm text-stone-700 leading-relaxed">
                    &ldquo;{artwork.audioTranscript}&rdquo;
                  </p>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-900/15 text-xs">
                  <div>
                    <dt className="text-stone-500">Artist / Studio</dt>
                    <dd className="font-semibold text-stone-950 mt-0.5">
                      {artwork.artist} ({artwork.artistOrigin})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Provenance</dt>
                    <dd className="font-semibold text-stone-950 mt-0.5">
                      {artwork.provenance}
                    </dd>
                  </div>
                </dl>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4 mt-5">
                <dl className="divide-y divide-stone-900/15 border-y border-stone-900/15 text-xs">
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Medium</dt>
                    <dd className="col-span-2 font-medium text-stone-950">
                      {artwork.medium}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Dimensions</dt>
                    <dd className="col-span-2 font-mono-tabular font-medium text-stone-950">
                      {artwork.dimensions}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Structural Alloy</dt>
                    <dd className="col-span-2 font-medium text-stone-950">
                      {artwork.specs.structuralAlloy}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Articulation</dt>
                    <dd className="col-span-2 font-mono-tabular font-medium text-stone-950">
                      {artwork.specs.actuatorCount} internal micro-actuators
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Sensing System</dt>
                    <dd className="col-span-2 font-medium text-stone-950">
                      {artwork.specs.sensorSystem}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3 gap-3">
                    <dt className="text-stone-500">Total Mass</dt>
                    <dd className="col-span-2 font-mono-tabular font-medium text-stone-950">
                      {artwork.specs.totalMass}
                    </dd>
                  </div>
                </dl>
              </TabsContent>
            </Tabs>

            <div className="pt-4 border-t border-stone-900/15 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-stone-950" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share Accession Link</span>
                  </>
                )}
              </button>

              <Button
                onClick={handleRequestViewing}
                disabled={isSaved}
                className="rounded-none gap-2 text-xs"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    <span>Viewing Request Logged</span>
                  </>
                ) : (
                  <span>Request Study Room Viewing</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
