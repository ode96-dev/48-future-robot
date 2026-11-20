"use client";

import { ArtworkModal } from "@/components/artwork-modal/artwork-modal";
import { CollectionGallery } from "@/components/collection-gallery/collection-gallery";
import { ExhibitionChapters } from "@/components/home/exhibition-chapters";
import { HeroPoster } from "@/components/home/hero-poster";
import { SpecimenAnatomy } from "@/components/home/specimen-anatomy";
import { SymposiumSchedule } from "@/components/home/symposium-schedule";
import { ScrollMarquee } from "@/components/scroll-marquee/scroll-marquee";
import { ScrollProgressRail } from "@/components/scroll-progress-rail/scroll-progress-rail";
import { VisitorInfoTickets } from "@/components/visitor-info-tickets/visitor-info-tickets";
import { Artwork, ArtworkCategory } from "@/lib/artworks-data";
import { MotionConfig } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] =
    useState<string>("All Specimens");

  const handleOpenArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterByChapter = (category: ArtworkCategory) => {
    setGalleryCategory(category);
    handleScrollToSection("collection-gallery");
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

          <ScrollMarquee />

          <SpecimenAnatomy onSelectArtwork={handleOpenArtwork} />

          <ExhibitionChapters onFilterByChapter={handleFilterByChapter} />

          <CollectionGallery
            selectedCategory={galleryCategory}
            onCategoryChange={setGalleryCategory}
            onSelectArtwork={handleOpenArtwork}
          />

          <SymposiumSchedule />

          <VisitorInfoTickets />
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
