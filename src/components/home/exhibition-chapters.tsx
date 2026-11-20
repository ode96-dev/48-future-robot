"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import { EXHIBITION_CHAPTERS, ArtworkCategory } from "@/lib/artworks-data";
import { Button } from "../ui/button";

interface ExhibitionChaptersProps {
  onFilterByChapter?: (category: ArtworkCategory) => void;
}

export function ExhibitionChapters({
  onFilterByChapter,
}: ExhibitionChaptersProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleChapter = (index: number) => {
    soundFx.playClick();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="exhibition-chapters"
      aria-labelledby="chapters-heading"
      className="py-16 sm:py-24 border-b border-stone-900/20 bg-[#EAE8E3]"
    >
      <div className="max-w-380 mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-900/20 gap-4">
          <div>
            <p className="font-mono-tabular text-xs text-stone-600 mb-2">
              Curatorial Framework · Four Pavilion Wings
            </p>
            <h2
              id="chapters-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 text-balance"
            >
              Exhibition Chapters
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 max-w-md leading-relaxed">
            Spanning four architectural wings, each chapter examines a distinct
            dialogue between synthetic engineering and figurative form.
          </p>
        </div>

        <div className="divide-y divide-stone-900/20 border-y border-stone-900/20">
          {EXHIBITION_CHAPTERS.map((chapter, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`transition-colors ${
                  isExpanded ? "bg-[#E3E1DB]" : "hover:bg-[#E6E4DE]"
                }`}
              >
                <Button
                  type="button"
                  onClick={() => toggleChapter(idx)}
                  aria-expanded={isExpanded}
                  className="w-full py-7 px-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-950"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono-tabular text-2xl sm:text-3xl font-bold text-stone-900 shrink-0">
                      {chapter.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-950">
                        {chapter.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">
                        {chapter.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end md:self-center shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="block font-mono-tabular text-xs font-semibold text-stone-900">
                        {chapter.count}
                      </span>
                      <span className="block text-xs text-stone-600">
                        {chapter.wing}
                      </span>
                    </div>
                    <span
                      className={`h-9 w-9 rounded-full border border-stone-900/25 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded
                          ? "rotate-180 bg-stone-950 text-stone-100 border-stone-950"
                          : "text-stone-900"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </Button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 sm:px-6 pb-8 pt-4 pl-12 sm:pl-20 border-t border-stone-900/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        <div className="md:col-span-8">
                          <p className="text-sm sm:text-base text-stone-800 leading-relaxed mb-4 max-w-2xl">
                            {chapter.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                            <span className="font-semibold text-stone-950">
                              Curated by {chapter.curator}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{chapter.wing}</span>
                          </div>
                        </div>

                        <div className="md:col-span-4 flex md:justify-end">
                          <Button
                            type="button"
                            onClick={() => {
                              soundFx.playClick();
                              if (onFilterByChapter) {
                                onFilterByChapter(chapter.categoryFilter);
                              } else {
                                document
                                  .getElementById("collection-gallery")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-stone-100 text-xs font-semibold tracking-wide hover:bg-stone-800 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
                          >
                            <span>View {chapter.categoryFilter}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
