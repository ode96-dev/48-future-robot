import type { Metadata } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeaderNav } from "@/components/layout/header-nav";
import { FooterSection } from "@/components/layout/footer-section";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "48 — The Futuristic Robot Art Exhibition ©2026",
  description:
    "The Futuristic Robot Art Exhibition ©2026. Explore award-winning cybernetic sculptures, kinetic installations, and post-humanist figurative works across four pavilion wings.",
  openGraph: {
    title: "48 — The Futuristic Robot Art Exhibition ©2026",
    description:
      "Discover the intersection of technology and creativity across 60+ robotic sculptures and kinetic installations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "48 — The Futuristic Robot Art Exhibition ©2026",
    description:
      "Discover the intersection of technology and creativity across 60+ robotic sculptures and kinetic installations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="paper-grain">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-stone-950 focus:text-stone-100 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-stone-950"
        >
          Skip to main exhibition content
        </Link>
        <HeaderNav />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
