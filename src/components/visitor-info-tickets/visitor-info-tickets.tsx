"use client";

import React, { useState } from "react";
import { Ticket, Check, MapPin, Accessibility, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { soundFx } from "@/lib/audio-synth";
import {
  PAVILION_WINGS,
  TICKET_TIERS,
  TIME_SLOTS,
  VisitorInfoTicketsProps,
} from "./data";

export function VisitorInfoTickets({
  embedded = false,
  onComplete,
}: VisitorInfoTicketsProps) {
  const [selectedTier, setSelectedTier] = useState<string>("patron-vip");
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1]);
  const [quantity, setQuantity] = useState<number>(1);
  const [visitorName, setVisitorName] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [passCode, setPassCode] = useState<string>("");
  const [activeWingId, setActiveWingId] = useState<string>("north");

  const currentTier =
    TICKET_TIERS.find((t) => t.id === selectedTier) || TICKET_TIERS[0];
  const totalPrice = currentTier.price * quantity;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playFocusChime();
    const cleanName = (visitorName.trim() || "GUEST")
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 4)
      .padEnd(4, "X");
    const slotDigits = selectedSlot.slice(0, 2);
    setPassCode(`P48-${cleanName}-${slotDigits}${quantity}26`);
    setIsBooked(true);
    if (onComplete) {
      setTimeout(onComplete, 3000);
    }
  };

  return (
    <section
      id="visitor-info"
      aria-labelledby={embedded ? undefined : "visitor-info-heading"}
      className={
        embedded
          ? "py-2"
          : "py-16 sm:py-24 border-b border-stone-900/20 bg-[#EAE8E3]"
      }
    >
      <div className={embedded ? "" : "max-w-380 mx-auto px-4 sm:px-8"}>
        {!embedded && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-900/20 gap-4">
            <div>
              <p className="font-mono-tabular text-xs text-stone-600 mb-2">
                Visitor Information · West Pavilion Gate 4
              </p>
              <h2
                id="visitor-info-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 text-balance"
              >
                Admission &amp; Floor Plan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 max-w-md leading-relaxed">
              Open daily 10:00 – 22:00. Timed entry ensures unhurried viewing
              across every sculpture gallery.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 border border-stone-900 bg-[#F2F0EC] p-6 sm:p-8">
            <div className="flex items-baseline justify-between border-b border-stone-900/15 pb-3 mb-6">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-950">
                Reserve Timed Entry
              </h3>
              <span className="font-mono-tabular text-xs text-stone-600">
                2026 Season
              </span>
            </div>

            {!isBooked ? (
              <form onSubmit={handleBooking} className="space-y-6">
                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold text-stone-900 mb-2">
                    Select Admission Tier
                  </legend>
                  {TICKET_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedTier(tier.id);
                        }}
                        aria-pressed={isSelected}
                        className={`w-full text-left p-4 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950 ${
                          isSelected
                            ? "bg-[#EAE8E3] border-stone-950 ring-1 ring-stone-950"
                            : "bg-transparent border-stone-900/20 hover:border-stone-900/50"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <span className="font-display text-base font-bold text-stone-950">
                            {tier.name}
                            {tier.recommended && (
                              <span className="ml-2 text-xs font-sans font-normal text-stone-600">
                                · Recommended
                              </span>
                            )}
                          </span>
                          <span className="font-mono-tabular text-lg font-bold text-stone-950 shrink-0">
                            €{tier.price}
                          </span>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-700">
                          {tier.perks.map((perk) => (
                            <li key={perk} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-stone-950 shrink-0" />
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </fieldset>

                <div>
                  <span className="block text-xs font-semibold text-stone-900 mb-2">
                    Timed Entry Window
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedSlot(slot);
                        }}
                        aria-pressed={selectedSlot === slot}
                        className={`py-2 px-3 font-mono-tabular text-xs text-left border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950 ${
                          selectedSlot === slot
                            ? "bg-stone-950 text-stone-100 border-stone-950 font-semibold"
                            : "bg-[#EAE8E3] text-stone-800 border-stone-900/20 hover:border-stone-900/50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-900/15">
                  <div>
                    <label
                      htmlFor="pass-quantity"
                      className="block text-xs font-semibold text-stone-900 mb-1.5"
                    >
                      Visitors
                    </label>
                    <div
                      id="pass-quantity"
                      className="flex items-center h-10 border border-stone-900/25 bg-[#EAE8E3]"
                    >
                      <button
                        type="button"
                        aria-label="Decrease visitors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 h-full text-sm font-semibold text-stone-900 hover:bg-stone-900/10 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-mono-tabular font-semibold text-sm text-stone-950">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase visitors"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="px-4 h-full text-sm font-semibold text-stone-900 hover:bg-stone-900/10 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="visitor-name-input"
                      className="block text-xs font-semibold text-stone-900 mb-1.5"
                    >
                      Pass Holder Name
                    </label>
                    <Input
                      id="visitor-name-input"
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Full name for admission"
                    />
                  </div>
                </div>

                <div className="border-t border-stone-900/20 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-stone-600">
                      Total Due
                    </span>
                    <span className="font-mono-tabular text-2xl font-bold text-stone-950">
                      €{totalPrice}{" "}
                      <span className="text-xs font-sans font-normal text-stone-600">
                        incl. VAT
                      </span>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-none gap-2"
                  >
                    <Ticket className="h-4 w-4" />
                    <span>Issue Timed Pass</span>
                  </Button>
                </div>
              </form>
            ) : (
              <div
                aria-live="polite"
                className="border border-stone-950 bg-[#EAE8E3] p-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-stone-900/20 pb-3">
                  <span className="font-display text-lg font-bold text-stone-950">
                    Admission Pass Issued
                  </span>
                  <span className="font-mono-tabular text-xs font-semibold text-stone-950">
                    {passCode}
                  </span>
                </div>

                <dl className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="text-stone-500">Visitor</dt>
                    <dd className="font-semibold text-stone-950 mt-0.5">
                      {visitorName || "Guest"} ({quantity}{" "}
                      {quantity === 1 ? "Pass" : "Passes"})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Timed Window</dt>
                    <dd className="font-mono-tabular font-semibold text-stone-950 mt-0.5">
                      {selectedSlot}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Tier</dt>
                    <dd className="font-semibold text-stone-950 mt-0.5">
                      {currentTier.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Pavilion Entry</dt>
                    <dd className="font-semibold text-stone-950 mt-0.5">
                      West Plaza · Gate 4
                    </dd>
                  </div>
                </dl>

                <div className="pt-4 border-t border-stone-900/15 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="rounded-none gap-1.5 text-xs"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Pass Stub</span>
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIsBooked(false);
                    }}
                    className="text-xs font-medium underline underline-offset-4 text-stone-800 hover:text-stone-950 cursor-pointer"
                  >
                    Reserve another time slot
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-stone-900/25 bg-[#F2F0EC] p-6">
              <div className="flex items-center justify-between border-b border-stone-900/15 pb-3 mb-4">
                <span className="text-xs font-semibold text-stone-950 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Pavilion Floor Plan</span>
                </span>
                <span className="font-mono-tabular text-[11px] text-stone-600">
                  Scale 1:250
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PAVILION_WINGS.map((wing) => {
                  const isActive = activeWingId === wing.id;
                  return (
                    <button
                      type="button"
                      key={wing.id}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveWingId(wing.id);
                      }}
                      aria-pressed={isActive}
                      className={`p-3.5 border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-950 ${
                        isActive
                          ? "border-stone-950 bg-[#EAE8E3]"
                          : "border-stone-900/15 bg-transparent hover:border-stone-900/40"
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-950">
                        {wing.name}
                      </div>
                      <div className="font-mono-tabular text-[11px] text-stone-500 mt-0.5">
                        {wing.works}
                      </div>
                      <p className="text-xs text-stone-700 mt-2 leading-snug">
                        {wing.focus}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 pt-3 border-t border-stone-900/10 text-xs text-stone-600">
                Main Entrance: West Plaza Gate 4 · Cloakroom &amp; Monograph
                Shop on Lower Level
              </p>
            </div>

            <div className="border border-stone-900/25 bg-[#F2F0EC] p-6 space-y-3 text-xs text-stone-700">
              <div className="flex items-center gap-2 font-semibold text-stone-950 border-b border-stone-900/15 pb-2.5">
                <Accessibility className="h-4 w-4" />
                <span>Accessibility &amp; Visitor Services</span>
              </div>
              <ul className="space-y-2 leading-relaxed">
                <li>
                  Step-free elevator access across all four exhibition wings
                </li>
                <li>
                  Tactile ceramic &amp; titanium handling plates in Gallery A
                </li>
                <li>
                  Spoken audio commentary available in every specimen dossier
                </li>
                <li>Quiet viewing hours Wednesdays 10:00 – 12:00</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
