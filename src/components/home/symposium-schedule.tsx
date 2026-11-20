"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, CalendarClock } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import { EXHIBITION_SCHEDULE } from "@/lib/artworks-data";

export function SymposiumSchedule() {
  const [rsvpedIds, setRsvpedIds] = useState<string[]>([]);

  const toggleRsvp = (id: string) => {
    soundFx.playClick();
    setRsvpedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      id="symposium-schedule"
      aria-labelledby="schedule-heading"
      className="py-16 sm:py-24 border-b border-stone-900/20 bg-[#E5E3DD]"
    >
      <div className="max-w-380 mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-900/20 gap-4">
          <div>
            <p className="font-mono-tabular text-xs text-stone-600 mb-2">
              Daily Programme · Symposia &amp; Demonstrations
            </p>
            <h2
              id="schedule-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 text-balance"
            >
              Curatorial Programme
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 max-w-md leading-relaxed">
            Included with any valid exhibition pass. Reserve your seat below to
            hold capacity for today&apos;s walkthroughs and evening soundscape.
          </p>
        </div>

        <div className="divide-y divide-stone-900/20 border-y border-stone-900/20">
          {EXHIBITION_SCHEDULE.map((session, idx) => {
            const isReserved = rsvpedIds.includes(session.id);
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-2 font-mono-tabular text-lg font-bold text-stone-950">
                  {session.time}
                </div>

                <div className="md:col-span-5">
                  <h3 className="font-display text-lg font-bold text-stone-950">
                    {session.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {session.speaker} · {session.role}
                  </p>
                </div>

                <div className="md:col-span-3 text-xs text-stone-700">
                  <span className="block font-medium text-stone-900">
                    {session.location}
                  </span>
                  <span className="font-mono-tabular text-stone-600">
                    {session.capacity}
                  </span>
                </div>

                <div className="md:col-span-2 flex md:justify-end">
                  <button
                    type="button"
                    onClick={() => toggleRsvp(session.id)}
                    aria-pressed={isReserved}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                      isReserved
                        ? "bg-stone-950 text-stone-100 border border-stone-950"
                        : "border border-stone-900/30 text-stone-950 hover:bg-stone-900/5"
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Seat Held</span>
                      </>
                    ) : (
                      <>
                        <CalendarClock className="h-3.5 w-3.5" />
                        <span>Hold Seat</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
