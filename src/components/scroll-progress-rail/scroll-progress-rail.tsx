"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-stone-900/10 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-stone-950 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
