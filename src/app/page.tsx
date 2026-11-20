"use client";

import { ArtworkModal } from "@/components/artwork-modal/artwork-modal";
import { HeroPoster } from "@/components/home/hero-poster";
import { ScrollProgressRail } from "@/components/scroll-progress-rail/scroll-progress-rail";
import { Artwork } from "@/lib/artworks-data";
import { MotionConfig } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#EAE8E3] text-stone-950 font-sans relative">
        <ScrollProgressRail />

        <main id="main-content" className="grow">
          <HeroPoster
            onSelectArtwork={handleOpenArtwork}
            onExploreClick={() => handleScrollToSection("exhibition-chapters")}
          />
        </main>

        <ArtworkModal
          artwork={selectedArtwork}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
