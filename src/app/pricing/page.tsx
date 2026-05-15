"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Check, Car, Crown, ArrowRight, Gem } from "lucide-react";

const packages = [
  {
    name: "Standard",
    price: 100,
    popular: false,
    accent: "gold",
    features: [
      "Up to 1 hour of shooting",
      "1 location of your choice (within 25 miles)",
      "10–15 edited photos",
      "Delivery via online gallery (5–7 business days)",
      "Great for portraits, birthdays, or casual shoots",
    ],
  },
  {
    name: "Deluxe",
    price: 150,
    popular: true,
    accent: "red",
    features: [
      "Up to 2 hours of shooting",
      "Up to 2 locations (within 25 miles)",
      "20–25 edited photos",
      "Posing guidance & creative direction",
      "Ideal for couples, fashion, or professional portraits",
    ],
  },
  {
    name: "Premium",
    price: 200,
    popular: false,
    accent: "gold",
    features: [
      "Up to 3 hours of shooting",
      "Multiple locations of your choice",
      "30–40 edited photos",
      "Outfit changes, props & concept planning",
      "Priority editing (3–4 business days)",
      "Perfect for brand shoots, music artists, or cinematic portraits",
    ],
  },
  {
    name: "Cars Package",
    price: 400,
    popular: false,
    accent: "red",
    icon: Car,
    features: [
      "Multiple locations of your choice",
      "Car of your choosing from our fleet",
      "50–70 edited photos",
      "Outfit changes, props & concept planning",
      "Priority editing (3–4 business days)",
      "Perfect for brand shoots, music artists, or cinematic portraits",
    ],
  },
];

const vehicles = [
  { name: "2024 Mercedes G63 – China Blue", price: 600 },
  { name: "2022 Bentley Flying Spur – Black", price: 850 },
  { name: "2022 Bentley Bentayga – Silver", price: 600 },
  { name: "2021 Lamborghini Urus – Blue", price: 850 },
  { name: "2023 Mercedes S580 – Silver", price: 400 },
  { name: "2024 Cadillac Escalade – Black", price: 400 },
  { name: "2024 Rolls Royce Ghost – White", price: 1200 },
  { name: "Lamborghini Huracan Evo – Pink", price: 1200 },
  { name: "2025 McLaren Artura – White", price: 1200 },
  { name: "2019 Lamborghini Urus 1 – White", price: 850 },
  { name: "2019 Ferrari Portofino – Black", price: 850 },
  { name: "2019 Lamborghini Urus 2 – White/Green", price: 850 },
  { name: "2023 Rolls Royce Cullinan – White", price: 1200 },
  { name: "2017 Ferrari California – Grey", price: 500 },
  { name: "2022 Mercedes G63 – White", price: 600 },
  { name: "RR Dawn Black Badge – Orange", price: 1200 },
  { name: "2021 Mercedes G63 – Black", price: 600 },
  { name: "22 MB S580 Maybach – Black/White", price: 800 },
  { name: "2019 Lamborghini Urus – Orange", price: 800 },
  { name: "2019 Rolls Royce Dawn – Black", price: 750 },
  { name: "2020 McLaren 765LT – Blue", price: 2000 },
  { name: "2024 Mercedes GLE 53 – Grey", price: 350 },
  { name: "2022 Rolls Royce Cullinan – White", price: 1200 },
  { name: "2022 Ferrari F8 – Red", price: 1600 },
  { name: "2022 McLaren Artura – Grey", price: 1200 },
  { name: "Rolls Royce Cullinan – Grey", price: 1200 },
  { name: "2022 Ferrari SF90 – Grey", price: 1800 },
  { name: "Armored B6 Bulletproof Escalade", price: 800 },
  { name: "2024 Rolls Royce Ghost – Blue", price: 1300 },
  { name: "2022 Lamborghini Urus – Orange", price: 900 },
];

export default function PricingPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] ambient-red-glow rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-gold" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Investment"
            title="Pricing & Packages"
            description="Choose the perfect package for your vision. Every session includes professional editing, creative direction, and an unforgettable experience."
          />
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <div className={`rounded-xl h-full flex flex-col relative overflow-hidden transition-all duration-500 ${pkg.popular ? "glass-red border-red/25 red-glow" : "glass hover:border-gold/15"}`}>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${pkg.accent === "red" ? "bg-gradient-to-r from-red to-gold" : "bg-gradient-to-r from-gold to-red"}`} />

                {/* Popular crown badge */}
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0">
                    <span className="flex items-center gap-1 bg-red text-white text-[9px] uppercase tracking-[2px] font-semibold px-4 py-1.5 rounded-b-lg">
                      <Crown size={9} /> Most Popular
                    </span>
                  </div>
                )}

                <div className="p-7 flex flex-col h-full">
                  {pkg.icon && (
                    <div className="w-10 h-10 glass-red rounded-lg flex items-center justify-center mb-4">
                      <pkg.icon size={17} className="text-red-light" />
                    </div>
                  )}

                  <p className="text-white/20 text-[9px] uppercase tracking-[3px] mb-1">Package</p>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-bold ${pkg.accent === "red" ? "red-text" : "gold-text"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                      ${pkg.price}
                    </span>
                    <span className="text-white/20 text-xs">/session</span>
                  </div>

                  <div className="red-gold-line mb-6" />

                  <ul className="flex-1 space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/45">
                        <Check size={13} className={`mt-0.5 shrink-0 ${pkg.accent === "red" ? "text-red-light" : "text-gold"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/appointments?package=${pkg.name.toLowerCase().replace(/\s/g, "-")}`}
                    className={pkg.popular ? "btn-red w-full text-center py-3 text-xs" : "btn-outline w-full text-center py-3 text-xs"}
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VEHICLE TABLE */}
      <section className="relative py-28 px-6 border-t border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/20 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            subtitle="Exotic Fleet"
            title="Vehicle Add-Ons"
            description="Elevate your shoot with a luxury or exotic vehicle. In partnership with @nogrmchris_ — 30+ vehicles available."
          />

          <FadeIn>
            <div className="glass rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto] gap-4 px-8 py-5 border-b border-white/[0.05] bg-gradient-to-r from-red/[0.05] to-transparent">
                <div className="flex items-center gap-2">
                  <Gem size={13} className="text-red-light/60" />
                  <span className="text-red-light/70 text-[10px] uppercase tracking-[4px] font-semibold">Vehicle</span>
                </div>
                <span className="text-gold/70 text-[10px] uppercase tracking-[4px] font-semibold text-right">Day Rate</span>
              </div>

              {/* Vehicle rows */}
              <div className="max-h-[520px] overflow-y-auto">
                {vehicles.map((v, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto] gap-4 px-8 py-4 border-b border-white/[0.025] hover:bg-white/[0.015] transition-colors duration-200 group"
                  >
                    <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-200">{v.name}</span>
                    <span className="text-gold font-semibold text-sm text-right tabular-nums">${v.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Table footer */}
              <div className="px-8 py-5 border-t border-white/[0.04] bg-gradient-to-r from-gold/[0.03] to-transparent">
                <p className="text-white/20 text-xs tracking-wide">Prices are in addition to your photography package.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <Link href="/appointments" className="btn-red inline-flex items-center gap-2">
                Book With a Vehicle <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
