"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Check, Car, Crown, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Standard",
    price: 100,
    popular: false,
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
    price: 120,
    popular: true,
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
    price: 150,
    popular: false,
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
    price: 200,
    popular: false,
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

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Investment"
            title="Pricing & Packages"
            description="Choose the perfect package for your vision. Every session includes professional editing, creative direction, and an unforgettable experience."
          />
        </div>
      </section>

      {/* Packages */}
      <section className="relative px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 0.1}>
                <div
                  className={`glass rounded-xl p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 ${
                    pkg.popular ? "border-gold/30 gold-glow" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gold/20 text-gold text-[10px] uppercase tracking-[2px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Crown size={10} /> Popular
                      </span>
                    </div>
                  )}

                  {pkg.icon && (
                    <div className="w-10 h-10 glass-gold rounded-lg flex items-center justify-center mb-4">
                      <pkg.icon size={18} className="text-gold" />
                    </div>
                  )}

                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="gold-text text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      ${pkg.price}
                    </span>
                    <span className="text-white/30 text-sm">/session</span>
                  </div>

                  <div className="gold-line mb-6" />

                  <ul className="flex-1 space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                        <Check size={14} className="text-gold mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/appointments?package=${pkg.name.toLowerCase().replace(/\s/g, "-")}`}
                    className={pkg.popular ? "btn-gold w-full text-center py-3" : "btn-outline w-full text-center py-3"}
                  >
                    Select Package
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="relative py-28 px-6 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            subtitle="Exotic Fleet"
            title="Vehicle Add-Ons"
            description="Elevate your shoot with a luxury or exotic vehicle. In partnership with @nogrmchris_ — 30+ vehicles available for your session."
          />

          <FadeIn>
            <div className="glass rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 border-b border-gold/15 bg-gold/5">
                <span className="text-gold text-xs uppercase tracking-[3px] font-semibold">Vehicle</span>
                <span className="text-gold text-xs uppercase tracking-[3px] font-semibold text-right">Day Rate</span>
              </div>

              {/* Table Rows */}
              <div className="max-h-[500px] overflow-y-auto">
                {vehicles.map((v, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto] gap-4 px-6 py-3.5 border-b border-white/5 hover:bg-gold/5 transition-colors duration-200"
                  >
                    <span className="text-white/70 text-sm">{v.name}</span>
                    <span className="text-gold font-semibold text-sm text-right">
                      ${v.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-center mt-8">
              <p className="text-white/30 text-sm mb-4">
                Vehicle prices are in addition to your photography package.
                Contact us for custom fleet arrangements.
              </p>
              <Link href="/appointments" className="btn-gold inline-flex items-center gap-2">
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
