"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import { EXHIBITION_ARTWORKS, Artwork } from "@/lib/artworks-data";
import { HeroPixelTypography } from "./hero-pixel-typography";

interface HeroPosterProps {
  onSelectArtwork: (artwork: Artwork) => void;
  onExploreClick: () => void;
}

export function HeroPoster({
  onSelectArtwork,
  onExploreClick,
}: HeroPosterProps) {
  const [featuredIndex, setFeaturedIndex] = useState(1);
  const heroRef = useRef<HTMLElement>(null);

  const heroArtwork = EXHIBITION_ARTWORKS[0];
  const currentFeatured = EXHIBITION_ARTWORKS[featuredIndex];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const handleNextFeatured = () => {
    soundFx.playClick();
    setFeaturedIndex((prev) => (prev + 1) % EXHIBITION_ARTWORKS.length);
  };

  const handlePrevFeatured = () => {
    soundFx.playClick();
    setFeaturedIndex(
      (prev) =>
        (prev - 1 + EXHIBITION_ARTWORKS.length) % EXHIBITION_ARTWORKS.length,
    );
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative pt-14 w-full border-b border-stone-900/20 bg-[#EAE8E3]"
      aria-labelledby="exhibition-hero-title"
    >
      <div className="w-full max-w-380 mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-56px)] border-x border-stone-900/15">
        <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-900/20">
          <div className="p-6 sm:p-8 lg:p-10 border-b border-stone-900/20 flex flex-col justify-between min-h-62.5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-right lg:pl-4"
            >
              <h1
                id="exhibition-hero-title"
                className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-950 leading-[1.12] text-balance"
              >
                The Futuristic Robot
                <br />
                Art Exhibition
                <br />
                <span className="font-mono-tabular font-semibold">©2026</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 text-xs sm:text-[13px] text-stone-700 leading-relaxed max-w-57.5"
            >
              Discover the intersection of technology and creativity at this
              cutting-edge exhibition.
            </motion.p>
          </div>

          <div className="px-6 sm:px-8 lg:px-10 py-6 border-b border-stone-900/20 flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="flex items-baseline gap-3.5"
            >
              <span className="font-display text-4xl sm:text-[44px] font-extrabold tracking-tight text-stone-950 tabular-nums leading-none">
                60+
              </span>
              <span className="text-xs font-medium text-stone-700 leading-snug">
                artworks and installations
              </span>
            </motion.div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between grow min-h-60">
            <div className="flex justify-end">
              <Plus
                className="h-4 w-4 text-stone-800 stroke-[1.5]"
                aria-hidden="true"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="my-6"
            >
              <h2 className="font-display text-3xl sm:text-[34px] font-extrabold tracking-tight text-stone-950 leading-[1.06] text-balance">
                Step into the
                <br />
                future of art
              </h2>
            </motion.div>

            <div className="flex items-center justify-between">
              <Plus
                className="h-4 w-4 text-stone-800 stroke-[1.5]"
                aria-hidden="true"
              />
              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreClick();
                }}
                className="text-xs font-semibold tracking-wide text-stone-900 hover:underline underline-offset-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
              >
                Explore Pavilion Wings
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex flex-col justify-between items-center overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-900/20 min-h-135 lg:min-h-175 p-5 sm:p-8">
          <div className="relative z-10 w-full grow flex items-center justify-center my-auto">
            <HeroPixelTypography
              imageSrc={heroArtwork.image}
              scrollProgress={scrollYProgress}
              label="Inspect Specimen 48: The Synthetic Oracle"
              onInspect={() => {
                soundFx.playFocusChime();
                onSelectArtwork(heroArtwork);
              }}
            />
          </div>

          <div className="w-full flex items-center justify-between z-10 pt-3">
            <div className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-full border-[1.5px] border-stone-950 flex items-center justify-center font-display text-sm font-bold text-stone-950 select-none"
                aria-hidden="true"
              >
                R
              </span>
              <span className="font-mono-tabular text-[11px] text-stone-600 hidden sm:inline">
                {heroArtwork.accessionNumber}
              </span>
            </div>

            <span className="text-xs text-stone-600">
              Zirconia Ceramic · Grade 5 Titanium
            </span>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-between">
          <div className="p-6 sm:p-8 border-b border-stone-900/20 flex flex-col items-center justify-center min-h-72.5">
            <div className="w-full flex items-center justify-between gap-2">
              <button
                onClick={handlePrevFeatured}
                aria-label="Previous featured sculpture"
                className="flex h-10 w-10 items-center justify-center text-stone-900 hover:bg-stone-900/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950"
              >
                <ArrowLeft className="h-4 w-4 stroke-[1.5]" />
              </button>

              <button
                onClick={() => {
                  soundFx.playFocusChime();
                  onSelectArtwork(currentFeatured);
                }}
                aria-label={`Inspect ${currentFeatured.title}`}
                className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border border-stone-900/20 bg-stone-300/60 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeatured.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentFeatured.image}
                      alt={currentFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="180px"
                    />
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={handleNextFeatured}
                aria-label="Next featured sculpture"
                className="flex h-10 w-10 items-center justify-center text-stone-900 hover:bg-stone-900/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950"
              >
                <ArrowRight className="h-4 w-4 stroke-[1.5]" />
              </button>
            </div>

            <div className="mt-5 text-center" aria-live="polite">
              <p className="text-xs font-medium text-stone-900">
                Explore Futuristic Robotic Art
              </p>
              <p className="mt-1 font-mono-tabular text-[11px] text-stone-600">
                {String(featuredIndex + 1).padStart(2, "0")} /{" "}
                {String(EXHIBITION_ARTWORKS.length).padStart(2, "0")} ·{" "}
                {currentFeatured.title}
              </p>
            </div>
          </div>

          <div
            className="px-6 py-6 border-b border-stone-900/20 flex items-center justify-start gap-2.5 sm:px-8"
            aria-hidden="true"
          >
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className="w-9 h-9 rounded-full border border-stone-900/25 flex items-center justify-center text-stone-900 text-xs select-none"
              >
                ✦
              </span>
            ))}
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between grow">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-950 leading-[1.15] text-balance">
                Award-Winning
                <br />
                Robotic Creations
              </h3>
              <p className="mt-4 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                Our showcased pieces have earned accolades for their innovation
                and vision, offering an unparalleled journey into the next
                generation of artistic expression.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-900/15 flex items-center justify-between text-xs">
              <span className="font-mono-tabular text-stone-600">
                Venice &amp; Tokyo Laureates
              </span>
              <a
                href="#collection-gallery"
                onClick={() => soundFx.playClick()}
                className="font-semibold text-stone-950 hover:underline underline-offset-4"
              >
                View Catalog →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
