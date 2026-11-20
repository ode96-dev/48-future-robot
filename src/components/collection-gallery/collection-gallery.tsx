"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowUpRight, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { soundFx } from "@/lib/audio-synth";
import { EXHIBITION_ARTWORKS, Artwork } from "@/lib/artworks-data";

interface CollectionGalleryProps {
  onSelectArtwork: (artwork: Artwork) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CATEGORIES = [
  "All Specimens",
  "Cyborg Sculptures",
  "Biomechanical",
  "Android Figuratives",
  "Kinetic Installations",
] as const;

export function CollectionGallery({
  onSelectArtwork,
  selectedCategory: controlledCategory,
  onCategoryChange,
}: CollectionGalleryProps) {
  const [internalCategory, setInternalCategory] =
    useState<string>("All Specimens");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = controlledCategory ?? internalCategory;

  const handleCategoryChange = (cat: string) => {
    soundFx.playClick();
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const filteredArtworks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return EXHIBITION_ARTWORKS.filter((art) => {
      const matchesCategory =
        activeCategory === "All Specimens" || art.category === activeCategory;
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.artist.toLowerCase().includes(query) ||
        art.accessionNumber.toLowerCase().includes(query) ||
        art.medium.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="collection-gallery"
      aria-labelledby="collection-heading"
      className="py-16 sm:py-24 border-b border-stone-900/20 bg-[#EAE8E3]"
    >
      <div className="max-w-380 mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-900/20 gap-4">
          <div>
            <p className="font-mono-tabular text-xs text-stone-600 mb-2">
              Permanent &amp; Loan Archive · Featured Acquisitions
            </p>
            <h2
              id="collection-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 text-balance"
            >
              The Robotic Collection
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 max-w-md leading-relaxed">
            Selected anchor works from the 60+ sculptures and kinetic
            installations on view across the 2026 season.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-900/15">
          <div
            role="tablist"
            aria-label="Filter collection by medium"
            className="flex flex-wrap items-center gap-1 bg-[#E1DFD9] p-1 border border-stone-900/20"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950 ${
                    isActive
                      ? "bg-stone-950 text-stone-100"
                      : "text-stone-700 hover:text-stone-950 hover:bg-stone-900/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-500 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artist, alloy, accession..."
              aria-label="Search collection works"
              className="pl-9 font-mono-tabular text-xs"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filteredArtworks.length} artworks in {activeCategory}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, idx) => (
              <motion.article
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border border-stone-900/20 bg-[#F2F0EC] flex flex-col justify-between hover:border-stone-950 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playFocusChime();
                    onSelectArtwork(artwork);
                  }}
                  aria-label={`Inspect ${artwork.title} by ${artwork.artist}`}
                  className="text-left flex flex-col grow cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-950"
                >
                  <div className="relative w-full aspect-[4/4.2] bg-[#E1DFD9] overflow-hidden border-b border-stone-900/15">
                    <Image
                      src={artwork.image}
                      alt={`${artwork.title} — ${artwork.subtitle}`}
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect Work</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between grow w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-stone-600 mb-2">
                        <span>{artwork.accessionNumber}</span>
                        <span>{artwork.year}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold tracking-tight text-stone-950 group-hover:underline underline-offset-4 leading-snug">
                        {artwork.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-stone-600 line-clamp-2">
                        {artwork.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-900/10 flex items-center justify-between text-xs text-stone-700 w-full">
                      <span className="truncate max-w-47.5">
                        {artwork.artist}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-stone-950 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredArtworks.length === 0 && (
          <div className="py-16 text-center border border-dashed border-stone-900/30">
            <p className="text-sm text-stone-700">
              No exhibited works match your current filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategoryChange("All Specimens");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 bg-stone-950 text-stone-100 text-xs font-semibold cursor-pointer hover:bg-stone-800 transition-colors"
            >
              Reset Collection Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
