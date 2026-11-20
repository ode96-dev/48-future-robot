"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const EXHIBITION_INDEX_TERMS = [
  "Zirconia Bio-Ceramic",
  "Grade 5 Titanium",
  "60+ Kinetic Works",
  "Four Pavilion Wings",
  "Elena Vance",
  "Klaus Richter",
  "Mayumi Sato",
  "Dr. Aris Thorne",
  "Venice & Tokyo Laureates",
];

export function ScrollMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xShift = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-b border-stone-900/20 bg-[#E3E1DB] py-3.5 select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ x: xShift }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {[...EXHIBITION_INDEX_TERMS, ...EXHIBITION_INDEX_TERMS].map(
          (term, i) => (
            <span
              key={`${term}-${i}`}
              className="inline-flex items-center gap-8 text-xs font-medium tracking-wide text-stone-700"
            >
              <span>{term}</span>
              <span className="text-stone-400">·</span>
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}
