"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import { EXHIBITION_CHAPTERS, ArtworkCategory } from "@/lib/artworks-data";
import { Button } from "../ui/button";

interface ExhibitionChaptersProps {
  onFilterByChapter?: (category: ArtworkCategory) => void;
}

const CHAPTER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ExhibitionChapters({
  onFilterByChapter,
}: ExhibitionChaptersProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleChapter = useCallback((index: number) => {
    soundFx.playClick();
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFilterChapter = useCallback(
    (category: ArtworkCategory) => {
      soundFx.playClick();
      if (onFilterByChapter) {
        onFilterByChapter(category);
        return;
      }

      const galleryEl = document.getElementById("collection-gallery");
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onFilterByChapter],
  );

  return (
    <section
      id="exhibition-chapters"
      aria-labelledby="chapters-heading"
      className="border-b border-stone-900/20 bg-[#EAE8E3] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-380 px-4 sm:px-8">
        <header className="mb-12 flex flex-col justify-between gap-4 border-b border-stone-900/20 pb-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-tabular mb-2 text-xs text-stone-600">
              Curatorial Framework · Four Pavilion Wings
            </p>
            <h2
              id="chapters-heading"
              className="font-display text-balance text-3xl font-extrabold tracking-tight text-stone-950 sm:text-4xl lg:text-5xl"
            >
              Exhibition Chapters
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-stone-700 sm:text-sm">
            Spanning four architectural wings, each chapter examines a distinct
            dialogue between synthetic engineering and figurative form.
          </p>
        </header>

        <div className="divide-y divide-stone-900/20 border-y border-stone-900/20">
          {EXHIBITION_CHAPTERS.map((chapter, idx) => {
            const isExpanded = expandedIndex === idx;
            const panelId = `chapter-panel-${chapter.number}`;

            return (
              <motion.article
                key={chapter.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: CHAPTER_EASE,
                }}
                className={`transition-colors ${
                  isExpanded ? "bg-[#E3E1DB]" : "hover:bg-[#E6E4DE]"
                }`}
              >
                <h3 className="m-0">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => toggleChapter(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="h-auto w-full cursor-pointer justify-between gap-4 rounded-none px-3 py-7 text-left hover:bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-950 sm:px-6 md:flex-row md:items-center"
                  >
                    <span className="flex items-baseline gap-6 sm:gap-10">
                      <span className="font-mono-tabular shrink-0 text-2xl font-bold text-stone-900 sm:text-3xl">
                        {chapter.number}
                      </span>
                      <span className="block">
                        <span className="font-display block text-xl font-bold tracking-tight text-stone-950 sm:text-2xl lg:text-3xl">
                          {chapter.title}
                        </span>
                        <span className="mt-1 block text-xs font-normal text-stone-600 sm:text-sm">
                          {chapter.tagline}
                        </span>
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-6 self-end md:self-center">
                      <span className="hidden text-right sm:block">
                        <span className="font-mono-tabular block text-xs font-semibold text-stone-900">
                          {chapter.count}
                        </span>
                        <span className="block text-xs font-normal text-stone-600">
                          {chapter.wing}
                        </span>
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border border-stone-900/25 transition-transform duration-300 ${
                          isExpanded
                            ? "rotate-180 border-stone-950 bg-stone-950 text-stone-100"
                            : "text-stone-900"
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </span>
                  </Button>
                </h3>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={panelId}
                      initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                      animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                      exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                      transition={{ duration: 0.28, ease: CHAPTER_EASE }}
                      className="grid"
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 items-end gap-6 border-t border-stone-900/10 px-3 pt-4 pb-8 sm:px-6 sm:pl-20 md:grid-cols-12">
                          <div className="md:col-span-8">
                            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-stone-800 sm:text-base">
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

                          <div className="flex md:col-span-4 md:justify-end">
                            <Button
                              type="button"
                              onClick={() =>
                                handleFilterChapter(chapter.categoryFilter)
                              }
                              className="inline-flex cursor-pointer items-center gap-2 rounded-none bg-stone-950 px-5 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap text-stone-100 transition-colors hover:bg-stone-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-950"
                            >
                              <span>View {chapter.categoryFilter}</span>
                              <ArrowRight
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
