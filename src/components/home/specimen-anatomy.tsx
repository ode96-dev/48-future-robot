"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { RotateCcw, Eye, Layers } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { soundFx } from "@/lib/audio-synth";
import {
  EXHIBITION_ARTWORKS,
  SPECIMEN_ANATOMY_PLATES,
  Artwork,
} from "@/lib/artworks-data";

interface SpecimenAnatomyProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export function SpecimenAnatomy({ onSelectArtwork }: SpecimenAnatomyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(true);
  const [studyMode, setStudyMode] = useState<"plate" | "monochrome">("plate");
  const [plinthAngle, setPlinthAngle] = useState<number[]>([0]);

  const specimen = EXHIBITION_ARTWORKS[0];
  const activePlate = SPECIMEN_ANATOMY_PLATES[activeIndex];

  const handleManualSelect = (idx: number) => {
    soundFx.playClick();
    setScrollSyncEnabled(false);
    setActiveIndex(idx);
  };

  return (
    <section
      id="specimen-anatomy"
      aria-labelledby="anatomy-heading"
      className="border-b border-stone-900/20 bg-[#EAE8E3] py-16 sm:py-24"
    >
      <div className="max-w-380 mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-900/20">
          <div>
            <p className="font-mono-tabular text-xs text-stone-600 mb-2">
              Curatorial Monograph · {specimen.accessionNumber}
            </p>
            <h2
              id="anatomy-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 text-balance"
            >
              Anatomy of Specimen 48
            </h2>
          </div>

          <p className="font-serif-editorial italic text-base sm:text-lg text-stone-700 max-w-md leading-relaxed">
            Scroll through the four structural plates below, or select any
            callout marker to examine material joinery at close range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            {SPECIMEN_ANATOMY_PLATES.map((plate, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.article
                  key={plate.id}
                  onViewportEnter={() => {
                    if (scrollSyncEnabled) {
                      setActiveIndex(idx);
                    }
                  }}
                  viewport={{ amount: 0.6 }}
                  initial={{ opacity: 0.75, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => handleManualSelect(idx)}
                    aria-pressed={isActive}
                    className={`w-full text-left p-6 border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                      isActive
                        ? "border-stone-950 bg-[#F2F0EC] shadow-sm"
                        : "border-stone-900/15 bg-transparent hover:border-stone-900/40 hover:bg-[#E5E3DD]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="font-mono-tabular text-xs font-semibold text-stone-950">
                        {plate.index} · {plate.region}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full transition-colors ${
                          isActive ? "bg-stone-950" : "bg-stone-400"
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-950">
                      {plate.title}
                    </h3>

                    <p className="mt-2 font-mono-tabular text-xs text-stone-600">
                      {plate.material}
                    </p>

                    <p className="mt-4 text-sm text-stone-800 leading-relaxed">
                      {plate.summary}
                    </p>

                    <p className="mt-3 pt-3 border-t border-stone-900/10 text-xs text-stone-600">
                      {plate.craftDetail}
                    </p>
                  </button>
                </motion.article>
              );
            })}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  soundFx.playClick();
                  setScrollSyncEnabled((prev) => !prev);
                }}
                className="rounded-none text-xs"
              >
                {scrollSyncEnabled
                  ? "Scroll Focus: Active"
                  : "Resume Scroll Focus"}
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  soundFx.playFocusChime();
                  onSelectArtwork(specimen);
                }}
                className="rounded-none gap-2 text-xs"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Open Full Dossier</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-20 border border-stone-900/25 bg-[#E1DFD9] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-900/15">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-stone-700">
                <span className="font-semibold text-stone-950">
                  {activePlate.index}
                </span>
                <span>·</span>
                <span>{activePlate.title}</span>
              </div>

              <div className="flex items-center gap-1 border border-stone-900/20 bg-[#EAE8E3] p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setStudyMode("plate");
                  }}
                  className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    studyMode === "plate"
                      ? "bg-stone-950 text-stone-100"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                >
                  Archival Plate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setStudyMode("monochrome");
                  }}
                  className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    studyMode === "monochrome"
                      ? "bg-stone-950 text-stone-100"
                      : "text-stone-700 hover:text-stone-950"
                  }`}
                >
                  High Contrast
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-4/3 my-6 overflow-hidden border border-stone-900/15 bg-[#EAE8E3]">
              <motion.div
                animate={{
                  scale: activePlate.focusScale,
                  rotate: plinthAngle[0],
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: activePlate.focusOrigin }}
                className={`relative w-full h-full will-change-transform ${
                  studyMode === "monochrome"
                    ? "grayscale contrast-150 brightness-105"
                    : ""
                }`}
              >
                <Image
                  src={specimen.image}
                  alt={`Architectural study of ${specimen.title} highlighting ${activePlate.title}`}
                  fill
                  className="object-contain p-4 select-none"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {SPECIMEN_ANATOMY_PLATES.map((pin, idx) => {
                  const isCurrent = activeIndex === idx;
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => handleManualSelect(idx)}
                      style={{ left: `${pin.pinX}%`, top: `${pin.pinY}%` }}
                      aria-label={`Select ${pin.index}: ${pin.title}`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full font-mono-tabular text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                        isCurrent
                          ? "bg-stone-950 text-stone-100 scale-110 ring-4 ring-stone-950/20"
                          : "bg-[#F2F0EC]/90 text-stone-950 border border-stone-900/50 hover:bg-stone-950 hover:text-stone-100"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </motion.div>
            </div>

            <div className="pt-4 border-t border-stone-900/15 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-900">
                  <Layers className="h-3.5 w-3.5 text-stone-600" />
                  <span>Plinth Study Tilt</span>
                </div>
                <p className="font-mono-tabular text-[11px] text-stone-600 mt-0.5">
                  {plinthAngle[0] > 0
                    ? `+${plinthAngle[0]}°`
                    : `${plinthAngle[0]}°`}{" "}
                  axis offset
                </p>
              </div>

              <div className="sm:col-span-6">
                <Slider
                  value={plinthAngle}
                  onValueChange={setPlinthAngle}
                  min={-12}
                  max={12}
                  step={1}
                  aria-label="Adjust specimen plinth tilt angle"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPlinthAngle([0]);
                    setActiveIndex(0);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer py-1 px-2 border border-stone-900/20 hover:border-stone-900/50 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
