"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import {
  Camera,
  Video,
  Palette,
  Film,
  Car,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Photography",
    desc: "Professional portrait, event, and brand photography with cinematic lighting and creative direction.",
  },
  {
    icon: Video,
    title: "Videography",
    desc: "Full video production from concept to final cut — music videos, promos, events, and more.",
  },
  {
    icon: Palette,
    title: "Photo Editing",
    desc: "High-end retouching, color grading, and post-processing that transforms every frame.",
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "Professional editing with motion graphics, color correction, and sound design.",
  },
  {
    icon: Car,
    title: "Exotic Car Packages",
    desc: "30+ luxury vehicles available for your shoot — Rolls Royce, Lamborghini, Ferrari, and more.",
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    desc: "Full concept planning, styling guidance, and artistic direction for unforgettable results.",
  },
];

const stats = [
  { value: "500+", label: "Sessions Shot" },
  { value: "30+", label: "Luxury Vehicles" },
  { value: "3", label: "Expert Photographers" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <FadeIn delay={0.2}>
            <p className="text-gold uppercase tracking-[6px] text-xs md:text-sm font-medium mb-6">
              New York&apos;s Premier Photography Studio
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="gold-text">Cinematic Vision.</span>
              <br />
              <span className="text-white/90">Timeless Frames.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-light">
              Professional photography, videography, and full creative production.
              Luxury car packages available. Every frame, a masterpiece.
            </p>
          </FadeIn>

          <FadeIn delay={0.65}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments" className="btn-gold px-10 py-4 text-sm">
                Book Your Session
              </Link>
              <Link href="/pricing" className="btn-outline px-10 py-4 text-sm">
                View Pricing
              </Link>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <FadeIn delay={1}>
            <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
              <span className="text-[10px] uppercase tracking-[4px] text-gold/60">
                Scroll
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-gold/40 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-8 border-y border-gold/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p
                    className="gold-text text-3xl md:text-4xl font-bold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-[3px]">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            subtitle="What We Offer"
            title="Our Services"
            description="From concept to final delivery, we handle every detail with precision and artistry."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.08}>
                <div className="glass rounded-lg p-8 h-full group hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5">
                  <div className="w-12 h-12 rounded-lg glass-gold flex items-center justify-center mb-6 group-hover:shadow-md group-hover:shadow-gold/10 transition-all duration-500">
                    <service.icon size={22} className="text-gold" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROM COLLAB BANNER ===== */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="glass-gold rounded-xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="gold-shimmer absolute inset-0 rounded-xl" />
              <div className="relative z-10">
                <p className="text-gold uppercase tracking-[5px] text-xs font-medium mb-4">
                  Limited Time
                </p>
                <h2
                  className="text-3xl md:text-5xl font-bold gold-text mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Prom Season 2026
                </h2>
                <p className="text-white/50 mb-2 text-sm tracking-wider">
                  CLASS OF 2026
                </p>
                <p
                  className="text-gold-light/80 text-lg md:text-xl mb-8 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Luxury cars. Cinematic photos. One unforgettable night.
                </p>
                <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto">
                  In collaboration with <span className="text-gold">@nogrmchris_</span> —
                  30+ luxury & exotic vehicles including Rolls Royce, Bentley, Lamborghini,
                  Ferrari, McLaren, and more. Cars available for the full day.
                </p>
                <Link href="/appointments" className="btn-gold px-10 py-4">
                  Book Your Prom Package
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            subtitle="The Difference"
            title="Why Optic Specs"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Cinematic Quality",
                desc: "Every photo and video is treated like a film production — professional lighting, creative angles, and magazine-worthy editing.",
              },
              {
                icon: Car,
                title: "Luxury Fleet Access",
                desc: "Choose from 30+ exotic cars for your shoot — Rolls Royces, Lamborghinis, Ferraris, and more. No other studio offers this.",
              },
              {
                icon: Sparkles,
                title: "Full Creative Team",
                desc: "Our three specialist photographers bring unique styles — from editorial fashion to raw street photography to polished portraits.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-6">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <p className="text-gold uppercase tracking-[5px] text-xs font-medium mb-4">
              Ready?
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="text-4xl md:text-6xl font-bold gold-text mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let&apos;s Create Something Iconic
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 mb-10 max-w-lg mx-auto">
              Book your session today and experience photography elevated to art.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/appointments" className="btn-gold px-12 py-4 text-sm inline-flex items-center gap-2">
              Book Now <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
