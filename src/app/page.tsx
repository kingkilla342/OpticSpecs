"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { Camera, Video, Palette, Film, Car, Sparkles, ArrowRight, Star } from "lucide-react";

const services = [
  { icon: Camera, title: "Photography", desc: "Professional portrait, event, and brand photography with cinematic lighting and creative direction." },
  { icon: Video, title: "Videography", desc: "Full video production from concept to final cut \u2014 music videos, promos, events, and more." },
  { icon: Palette, title: "Photo Editing", desc: "High-end retouching, color grading, and post-processing that transforms every frame." },
  { icon: Film, title: "Video Editing", desc: "Professional editing with motion graphics, color correction, and sound design." },
  { icon: Car, title: "Exotic Car Packages", desc: "30+ luxury vehicles available for your shoot \u2014 Rolls Royce, Lamborghini, Ferrari, and more." },
  { icon: Sparkles, title: "Creative Direction", desc: "Full concept planning, styling guidance, and artistic direction for unforgettable results." },
];

const featuredWork = [
  { src: "/sport1.png", label: "Sports" },
  { src: "/car3.png", label: "Vehicles" },
  { src: "/raymond.png", label: "Portraits" },
  { src: "/sport2.png", label: "Sports" },
];

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <FadeIn delay={0.2}><p className="text-gold uppercase tracking-[6px] text-xs md:text-sm font-medium mb-6">New York&apos;s Premier Photography Studio</p></FadeIn>
          <FadeIn delay={0.35}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="gold-text">Cinematic Vision.</span><br /><span className="text-white/90">Timeless Frames.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}><p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-light">Professional photography, videography, and full creative production. Luxury car packages available. Every frame, a masterpiece.</p></FadeIn>
          <FadeIn delay={0.65}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/appointments" className="btn-gold px-10 py-4 text-sm">Book Your Session</Link>
              <Link href="/pricing" className="btn-outline px-10 py-4 text-sm">View Pricing</Link>
            </div>
          </FadeIn>
          <FadeIn delay={1}>
            <div className="mt-20 flex flex-col items-center gap-2 opacity-30">
              <span className="text-[10px] uppercase tracking-[4px] text-gold/50">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-gold/30 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-8 border-y border-gold/8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ value: "500+", label: "Sessions Shot" }, { value: "30+", label: "Luxury Vehicles" }, { value: "3", label: "Expert Photographers" }, { value: "100%", label: "Client Satisfaction" }].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="gold-text text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-white/30 text-xs uppercase tracking-[3px]">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="Featured" title="Recent Work" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredWork.map((w, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link href="/showcase" className="block rounded-xl overflow-hidden relative group aspect-[3/4]">
                  <Image src={w.src} alt={w.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3"><p className="text-white/80 text-xs uppercase tracking-[2px]">{w.label}</p></div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="What We Offer" title="Our Services" description="From concept to final delivery, we handle every detail with precision and artistry." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="glass rounded-lg p-7 h-full group hover:border-gold/25 transition-all duration-500">
                  <div className="w-11 h-11 rounded-lg glass-gold flex items-center justify-center mb-5"><s.icon size={20} className="text-gold" /></div>
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
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
            <div className="glass-gold rounded-xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="gold-shimmer absolute inset-0 rounded-xl" />
              <div className="relative z-10">
                <p className="text-gold uppercase tracking-[5px] text-xs font-medium mb-4">Limited Time</p>
                <h2 className="text-3xl md:text-5xl font-bold gold-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Prom Season 2026</h2>
                <p className="text-white/40 mb-2 text-sm tracking-wider">CLASS OF 2026</p>
                <p className="text-gold-light/70 text-lg md:text-xl mb-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury cars. Cinematic photos. One unforgettable night.</p>
                <p className="text-white/30 text-sm mb-8 max-w-lg mx-auto">In collaboration with <span className="text-gold">@nogrmchris_</span> \u2014 30+ luxury & exotic vehicles including Rolls Royce, Bentley, Lamborghini, Ferrari, McLaren, and more.</p>
                <Link href="/appointments" className="btn-gold px-10 py-4">Book Your Prom Package</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading subtitle="The Difference" title="Why Optic Specs" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Cinematic Quality", desc: "Every photo and video is treated like a film production \u2014 professional lighting, creative angles, and magazine-worthy editing." },
              { icon: Car, title: "Luxury Fleet Access", desc: "Choose from 30+ exotic cars for your shoot \u2014 Rolls Royces, Lamborghinis, Ferraris, and more. No other studio offers this." },
              { icon: Sparkles, title: "Full Creative Team", desc: "Three specialist photographers bring unique styles \u2014 from editorial fashion to raw street photography to polished portraits." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-6"><item.icon size={24} className="text-gold" /></div>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/3 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn><p className="text-gold uppercase tracking-[5px] text-xs font-medium mb-4">Ready?</p></FadeIn>
          <FadeIn delay={0.1}><h2 className="text-4xl md:text-6xl font-bold gold-text mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Let&apos;s Create Something Iconic</h2></FadeIn>
          <FadeIn delay={0.2}><p className="text-white/40 mb-10 max-w-lg mx-auto">Book your session today and experience photography elevated to art.</p></FadeIn>
          <FadeIn delay={0.3}><Link href="/appointments" className="btn-gold px-12 py-4 text-sm inline-flex items-center gap-2">Book Now <ArrowRight size={16} /></Link></FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
