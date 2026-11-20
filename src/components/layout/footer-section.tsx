"use client";

import React, { useState } from "react";
import { ArrowUp, Check } from "lucide-react";
import { soundFx } from "@/lib/audio-synth";
import Link from "next/link";
import { Button } from "../ui/button";

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    soundFx.playClick();
    setIsSubscribed(true);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111110] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-380 mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold tracking-[-0.06em] text-white">
                48
              </span>
              <span className="text-xs text-stone-400">
                Pavilion 48 · Zurich
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              The Futuristic Robot Art Exhibition ©2026 presents an
              international survey of ceramic exoskeletons, biomechanical rigs,
              and figurative robotics.
            </p>
            <p className="font-mono-tabular text-xs text-stone-500">
              West Arts District · Gate 4 · Open Daily 10:00 – 22:00
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white">
              Exhibition Directory
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-white transition-colors"
                >
                  Exhibition Poster
                </Link>
              </li>
              <li>
                <Link
                  href="#specimen-anatomy"
                  className="hover:text-white transition-colors"
                >
                  Anatomy of Specimen 48
                </Link>
              </li>
              <li>
                <Link
                  href="#exhibition-chapters"
                  className="hover:text-white transition-colors"
                >
                  Pavilion Wings
                </Link>
              </li>
              <li>
                <Link
                  href="#collection-gallery"
                  className="hover:text-white transition-colors"
                >
                  Curated Collection
                </Link>
              </li>
              <li>
                <Link
                  href="#symposium-schedule"
                  className="hover:text-white transition-colors"
                >
                  Curatorial Programme
                </Link>
              </li>
              <li>
                <Link
                  href="#visitor-info"
                  className="hover:text-white transition-colors"
                >
                  Admission &amp; Floor Plan
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold text-white">
              Curatorial Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive seasonal monograph essays, symposium schedules, and
              private exhibition previews.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-stretch">
                <label htmlFor="footer-email" className="sr-only">
                  Email address for curatorial dispatch
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="bg-stone-900 border border-stone-800 px-3 py-2 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-stone-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-white text-stone-950 px-5 py-2 text-xs font-semibold hover:bg-stone-200 transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div
                aria-live="polite"
                className="flex items-center gap-2 text-xs text-stone-200 bg-stone-900 p-3 border border-stone-800"
              >
                <Check className="h-4 w-4 text-white shrink-0" />
                <span>Added {email} to the seasonal curatorial dispatch.</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>The Futuristic Robot Art Exhibition ©2026.</p>

          <Button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Return to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
