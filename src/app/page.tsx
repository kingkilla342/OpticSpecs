"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { Camera, Video, Palette, Film, Car, Sparkles, ArrowRight, Star, MapPin } from "lucide-react";

const services = [
  { icon: Camera, title: "Photography", desc: "Professional portrait, event, and brand photography with cinematic lighting and creative direction.", accent: "red" },
  { icon: Video, title: "Videography", desc: "Full video production from concept to final cut — music videos, promos, events, and more.", accent: "gold" },
  { icon: Palette, title: "Photo Editing", desc: "High-end retouching, color grading, and post-processing that transforms every frame.", accent: "red" },
  { icon: Film, title: "Video Editing", desc: "Professional editing with motion graphics, color correction, and sound design.", accent: "gold" },
  { icon: Sparkles, title: "Creative Direction", desc: "Full concept planning, styling guidance, and artistic direction for unforgettable results.", accent: "gold" },
];

const featuredWork = [
  { src: "/showcase/sports/IMG_3954.jpeg", label: "Sports", cat: "red" },
  { src: "/showcase/vehicles/IMG_3388.JPG", label: "Vehicles", cat: "gold" },
  { src: "/showcase/personal/_MG_6453.JPG", label: "Portraits", cat: "red" },
  { src: "/showcase/lifestyle/01-escalade-night.jpeg", label: "Lifestyle", cat: "gold" },
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

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/showcase/events/IMG_3950.JPG"
            alt="Optic Specs Photography"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-red/8 via-transparent to-gold/4" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-gold z-20" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-red mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-red pulse-dot" />
              <p className="text-red-light uppercase tracking-[4px] text-[10px] font-medium">Now Booking 2026</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-bold mb-4 leading-[0.92] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="red-gold-text">Cinematic Vision.</span><br />
              <span className="text-white/90">Timeless Frames.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.48}>
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin size={11} className="text-gold/50" />
              <p className="text-gold/50 text-[10px] uppercase tracking-[4px]">New York City · Est. 2024</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.55}>
            <p className="text-white/45 max-w-xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-light">
              Professional photography, videography, and full creative production. Every frame, a masterpiece.
            </p>
          </FadeIn>

          <FadeIn delay={0.68}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments" className="btn-red px-10 py-4 text-sm">Book Your Session</Link>
              <Link href="/pricing" className="btn-outline px-10 py-4 text-sm">View Pricing</Link>
            </div>
          </FadeIn>

          <FadeIn delay={1.1}>
            <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
              <span className="text-[9px] uppercase tracking-[5px] text-red-light/60">Scroll</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-red/50 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-b border-white/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red/30 to-gold/20" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className={`text-center py-12 px-6 ${i > 0 ? "stat-divider" : ""}`}>
                <p
                  className={`text-4xl md:text-5xl font-bold mb-2 ${i % 2 === 0 ? "red-text" : "gold-text"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-white/25 text-[10px] uppercase tracking-[3px] font-light">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="Featured" title="Recent Work" />

          {/* Editorial bento grid */}
          <div className="grid gap-4" style={{ gridTemplateColumns: '1.6fr 1fr 1fr', gridTemplateRows: 'auto auto' }}>
            {/* Featured large image — left column, spans 2 rows */}
            <FadeIn delay={0}>
              <Link
                href="/showcase"
                className="photo-frame block rounded-xl overflow-hidden relative group"
                style={{ gridColumn: '1', gridRow: '1 / span 2', minHeight: '480px' }}
              >
                <Image
                  src={featuredWork[0].src}
                  alt={featuredWork[0].label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-red" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{featuredWork[0].label}</p>
                  <p className="text-red-light/60 text-[9px] uppercase tracking-[3px] mt-0.5">Featured</p>
                </div>
              </Link>
            </FadeIn>

            {/* Top-right two images */}
            {[featuredWork[1], featuredWork[2]].map((w, i) => (
              <FadeIn key={i} delay={(i + 1) * 0.1}>
                <Link
                  href="/showcase"
                  className="photo-frame block rounded-xl overflow-hidden relative group aspect-[4/3]"
                  style={{ gridColumn: i === 0 ? '2' : '3', gridRow: '1' }}
                >
                  <Image src={w.src} alt={w.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${w.cat === "red" ? "bg-red" : "bg-gold"}`} />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <div className={`w-1 h-1 rounded-full ${w.cat === "red" ? "bg-red" : "bg-gold"}`} />
                    <p className="text-white/70 text-[9px] uppercase tracking-[2px]">{w.label}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}

            {/* Bottom-right spanning both cols */}
            <FadeIn delay={0.3}>
              <Link
                href="/showcase"
                className="photo-frame block rounded-xl overflow-hidden relative group aspect-[16/9]"
                style={{ gridColumn: '2 / span 2', gridRow: '2' }}
              >
                <Image src={featuredWork[3].src} alt={featuredWork[3].label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <p className="text-white/70 text-[9px] uppercase tracking-[2px]">{featuredWork[3].label}</p>
                </div>
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Link href="/showcase" className="btn-outline-red px-8 py-3 text-xs inline-flex items-center gap-2">
                View Full Gallery <ArrowRight size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red/[0.015] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading subtitle="What We Offer" title="Our Services" description="From concept to final delivery, we handle every detail with precision and artistry." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07}>
                <div className="glass rounded-lg p-7 h-full group hover:border-gold/20 transition-all duration-500 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${s.accent === "red" ? "bg-gradient-to-r from-red via-red-light to-transparent" : "bg-gradient-to-r from-gold via-gold-light to-transparent"}`} />
                  <span className="service-num">{`0${i + 1}`}</span>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${s.accent === "red" ? "glass-red" : "glass-gold"}`}>
                    <s.icon size={18} className={s.accent === "red" ? "text-red-light" : "text-gold"} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROM BANNER */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="glass-red rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="red-shimmer absolute inset-0 rounded-2xl" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-gold" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="relative z-10">
                <p className="text-red-light/70 uppercase tracking-[6px] text-[10px] font-medium mb-5">Limited Time</p>
                <h2 className="text-3xl md:text-5xl font-bold red-gold-text mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Prom Season 2026</h2>
                <p className="text-white/30 mb-2 text-[10px] tracking-[5px] uppercase">Class of 2026</p>
                <p className="text-gold-light/60 text-lg md:text-xl mb-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury cars. Cinematic photos. One unforgettable night.</p>
                <p className="text-white/25 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
                  In collaboration with <span className="text-gold">@nogrmchris_</span> — 30+ luxury & exotic vehicles including Rolls Royce, Bentley, Lamborghini, Ferrari, McLaren, and more.
                </p>
                <Link href="/appointments" className="btn-red px-10 py-4">Book Your Prom Package</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="The Difference" title="Why Optic Specs" />
          <div className="grid md:grid-cols-3">
            {[
              { icon: Star, title: "Cinematic Quality", desc: "Every photo and video is treated like a film production — professional lighting, creative angles, and magazine-worthy editing.", accent: "red" },
              { icon: Car, title: "Luxury Fleet Access", desc: "Choose from 30+ exotic cars for your shoot — Rolls Royces, Lamborghinis, Ferraris, and more. No other studio offers this.", accent: "gold" },
              { icon: Sparkles, title: "Full Creative Team", desc: "Three specialist photographers bring unique styles — from editorial fashion to raw street photography to polished portraits.", accent: "red" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className={`why-us-item text-center py-10 px-10`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${item.accent === "red" ? "glass-red" : "glass-gold"}`}>
                    <item.icon size={22} className={item.accent === "red" ? "text-red-light" : "text-gold"} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-red/[0.03] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/20 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-light/30" />
              <p className="text-red-light/70 uppercase tracking-[5px] text-[10px] font-medium">Ready?</p>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-light/30" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold red-gold-text mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let&apos;s Create Something Iconic
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/35 mb-10 max-w-lg mx-auto leading-relaxed">
              Book your session today and experience photography elevated to art.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments" className="btn-red px-12 py-4 text-sm inline-flex items-center gap-2">
                Book Now <ArrowRight size={15} />
              </Link>
              <Link href="/showcase" className="btn-outline px-12 py-4 text-sm">
                View Our Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
