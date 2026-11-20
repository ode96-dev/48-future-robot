export interface VisitorInfoTicketsProps {
  embedded?: boolean;
  onComplete?: () => void;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  perks: string[];
  recommended?: boolean;
}

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "general",
    name: "General Exhibition Admission",
    price: 24,
    perks: [
      "Timed access to all four pavilion wings (60+ works)",
      "Mobile curatorial audio commentary",
    ],
  },
  {
    id: "patron-vip",
    name: "Patron Pass & Clothbound Monograph",
    price: 58,
    perks: [
      "Flexible arrival within your reserved date",
      "Hardcover 2026 Specimen 48 Exhibition Catalogue",
      "Priority seating for daily curatorial walkthroughs",
    ],
    recommended: true,
  },
  {
    id: "nocturne",
    name: "Nocturne Evening Access",
    price: 36,
    perks: [
      "After-hours gallery entry (19:00 – 22:00)",
      "Live acoustic ensemble in the Hall of Echoes",
    ],
  },
];

export const TIME_SLOTS = [
  "10:00 – 12:00",
  "12:30 – 14:30",
  "15:00 – 17:00",
  "17:30 – 19:30",
  "20:00 – 22:00 (Nocturne)",
];

export const PAVILION_WINGS = [
  {
    id: "north",
    name: "North Wing · Gallery A",
    focus: "Zirconia Exoskeletons & Ceramic Portraiture",
    works: "18 Works",
  },
  {
    id: "central",
    name: "Central Atrium · Gallery B",
    focus: "Suspended Biomechanical Rigs & Looms",
    works: "14 Works",
  },
  {
    id: "south",
    name: "South Wing · Hall of Echoes",
    focus: "Full-Scale Humanoid Works on Limestone Plinths",
    works: "16 Works",
  },
  {
    id: "east",
    name: "East Vault · Chamber IV",
    focus: "Articulated Hands & Photonic Waveguides",
    works: "12 Works",
  },
];
