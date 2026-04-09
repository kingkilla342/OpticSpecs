"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { Check, Car, Crown, ArrowRight } from "lucide-react";

const packages = [
  { name: "Standard", price: 100, popular: false, features: ["Up to 1 hour of shooting", "1 location of your choice (within 25 miles)", "10\u201315 edited photos", "Delivery via online gallery (5\u20137 business days)", "Great for portraits, birthdays, or casual shoots"] },
  { name: "Deluxe", price: 150, popular: true, features: ["Up to 2 hours of shooting", "Up to 2 locations (within 25 miles)", "20\u201325 edited photos", "Posing guidance & creative direction", "Ideal for couples, fashion, or professional portraits"] },
  { name: "Premium", price: 200, popular: false, features: ["Up to 3 hours of shooting", "Multiple locations of your choice", "30\u201340 edited photos", "Outfit changes, props & concept planning", "Priority editing (3\u20134 business days)", "Perfect for brand shoots, music artists, or cinematic portraits"] },
  { name: "Cars Package", price: 400, popular: false, icon: Car, features: ["Multiple locations of your choice", "Car of your choosing from our fleet", "50\u201370 edited photos", "Outfit changes, props & concept planning", "Priority editing (3\u20134 business days)", "Perfect for brand shoots, music artists, or cinematic portraits"] },
];

const vehicles = [
  { name: "2024 Mercedes G63 \u2013 China Blue", price: 600 }, { name: "2022 Bentley Flying Spur \u2013 Black", price: 850 },
  { name: "2022 Bentley Bentayga \u2013 Silver", price: 600 }, { name: "2021 Lamborghini Urus \u2013 Blue", price: 850 },
  { name: "2023 Mercedes S580 \u2013 Silver", price: 400 }, { name: "2024 Cadillac Escalade \u2013 Black", price: 400 },
  { name: "2024 Rolls Royce Ghost \u2013 White", price: 1200 }, { name: "Lamborghini Huracan Evo \u2013 Pink", price: 1200 },
  { name: "2025 McLaren Artura \u2013 White", price: 1200 }, { name: "2019 Lamborghini Urus 1 \u2013 White", price: 850 },
  { name: "2019 Ferrari Portofino \u2013 Black", price: 850 }, { name: "2019 Lamborghini Urus 2 \u2013 White/Green", price: 850 },
  { name: "2023 Rolls Royce Cullinan \u2013 White", price: 1200 }, { name: "2017 Ferrari California \u2013 Grey", price: 500 },
  { name: "2022 Mercedes G63 \u2013 White", price: 600 }, { name: "RR Dawn Black Badge \u2013 Orange", price: 1200 },
  { name: "2021 Mercedes G63 \u2013 Black", price: 600 }, { name: "22 MB S580 Maybach \u2013 Black/White", price: 800 },
  { name: "2019 Lamborghini Urus \u2013 Orange", price: 800 }, { name: "2019 Rolls Royce Dawn \u2013 Black", price: 750 },
  { name: "2020 McLaren 765LT \u2013 Blue", price: 2000 }, { name: "2024 Mercedes GLE 53 \u2013 Grey", price: 350 },
  { name: "2022 Rolls Royce Cullinan \u2013 White", price: 1200 }, { name: "2022 Ferrari F8 \u2013 Red", price: 1600 },
  { name: "2022 McLaren Artura \u2013 Grey", price: 1200 }, { name: "Rolls Royce Cullinan \u2013 Grey", price: 1200 },
  { name: "2022 Ferrari SF90 \u2013 Grey", price: 1800 }, { name: "Armored B6 Bulletproof Escalade", price: 800 },
  { name: "2024 Rolls Royce Ghost \u2013 Blue", price: 1300 }, { name: "2022 Lamborghini Urus \u2013 Orange", price: 900 },
];

export default function PricingPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading subtitle="Investment" title="Pricing & Packages" description="Choose the perfect package for your vision. Every session includes professional editing, creative direction, and an unforgettable experience." />
        </div>
      </section>
      <section className="relative px-6 pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <div className={`glass rounded-xl p-7 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:border-gold/25 ${pkg.popular ? "border-gold/25 gold-glow" : ""}`}>
                {pkg.popular && <div className="absolute top-4 right-4"><span className="bg-gold/15 text-gold text-[10px] uppercase tracking-[2px] font-semibold px-3 py-1 rounded-full flex items-center gap-1"><Crown size={10} /> Popular</span></div>}
                {pkg.icon && <div className="w-10 h-10 glass-gold rounded-lg flex items-center justify-center mb-4"><pkg.icon size={18} className="text-gold" /></div>}
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-6"><span className="gold-text text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>${pkg.price}</span><span className="text-white/25 text-sm">/session</span></div>
                <div className="gold-line mb-6" />
                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features.map((f) => (<li key={f} className="flex items-start gap-3 text-sm text-white/50"><Check size={14} className="text-gold mt-0.5 shrink-0" />{f}</li>))}
                </ul>
                <Link href={`/appointments?package=${pkg.name.toLowerCase().replace(/\s/g, "-")}`} className={pkg.popular ? "btn-gold w-full text-center py-3" : "btn-outline w-full text-center py-3"}>Select Package</Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section className="relative py-28 px-6 border-t border-gold/8">
        <div className="max-w-5xl mx-auto">
          <SectionHeading subtitle="Exotic Fleet" title="Vehicle Add-Ons" description="Elevate your shoot with a luxury or exotic vehicle. In partnership with @nogrmchris_ \u2014 30+ vehicles available." />
          <FadeIn>
            <div className="glass rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 border-b border-gold/12 bg-gold/5">
                <span className="text-gold text-xs uppercase tracking-[3px] font-semibold">Vehicle</span>
                <span className="text-gold text-xs uppercase tracking-[3px] font-semibold text-right">Day Rate</span>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {vehicles.map((v, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-4 px-6 py-3.5 border-b border-white/[0.03] hover:bg-gold/[0.03] transition-colors duration-200">
                    <span className="text-white/60 text-sm">{v.name}</span>
                    <span className="text-gold font-semibold text-sm text-right">${v.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-center mt-8">
              <p className="text-white/25 text-sm mb-4">Vehicle prices are in addition to your photography package.</p>
              <Link href="/appointments" className="btn-gold inline-flex items-center gap-2">Book With a Vehicle <ArrowRight size={14} /></Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </main>
  );
}
