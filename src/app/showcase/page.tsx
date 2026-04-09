"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { Trophy, Car, User, Camera, Video } from "lucide-react";

const sportsPhotos = [
  { src: "/sport1.png", label: "Game Day Focus" },
  { src: "/sport2.png", label: "Court Presence" },
  { src: "/sport3.png", label: "Number Zero" },
  { src: "/sport4.png", label: "Battle Under the Rim" },
];

const vehiclePhotos = [
  { src: "/car1.png", label: "Corvette Detail" },
  { src: "/car2.png", label: "Corvette Front" },
  { src: "/car3.png", label: "Corvette Profile" },
  { src: "/car4.png", label: "Infiniti Night Shot" },
];

const personalPhotos = [
  { src: "/isayah.png", label: "Isayah \u2014 Street Session" },
  { src: "/kav.png", label: "Kav \u2014 Urban Portrait" },
  { src: "/raymond.png", label: "Raymond \u2014 Editorial" },
];

const tabs = [
  { id: "all", label: "All Work", icon: Camera },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "personal", label: "Personal", icon: User },
];

export default function ShowcasePage() {
  const [active, setActive] = useState("all");

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading subtitle="Portfolio" title="Our Work" description="Sports. Vehicles. Portraits. Every frame tells a story." />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto flex gap-3 justify-center flex-wrap">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[2px] transition-all duration-300 flex items-center gap-2 ${active === t.id ? "bg-gold/20 text-gold border border-gold/30" : "glass text-white/50 hover:text-gold"}`}>
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* === SPORTS === */}
      {(active === "all" || active === "sports") && (
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Trophy size={18} className="text-red-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Sports Photography</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sportsPhotos.map((p, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="rounded-xl overflow-hidden relative group cursor-pointer aspect-[3/4]">
                    <Image src={p.src} alt={p.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-medium">{p.label}</p>
                      <p className="text-red-400/70 text-[10px] uppercase tracking-[2px]">Sports</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === VEHICLES === */}
      {(active === "all" || active === "vehicles") && (
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center">
                  <Car size={18} className="text-gold" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>Vehicle Shoots</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vehiclePhotos.map((p, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="rounded-xl overflow-hidden relative group cursor-pointer aspect-[3/4]">
                    <Image src={p.src} alt={p.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-medium">{p.label}</p>
                      <p className="text-gold/70 text-[10px] uppercase tracking-[2px]">Vehicle</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === PERSONAL === */}
      {(active === "all" || active === "personal") && (
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <User size={18} className="text-blue-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Personal Sessions</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {personalPhotos.map((p, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="rounded-xl overflow-hidden relative group cursor-pointer aspect-[3/4]">
                    <Image src={p.src} alt={p.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-medium">{p.label}</p>
                      <p className="text-blue-400/70 text-[10px] uppercase tracking-[2px]">Personal</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      <section className="px-6 py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading subtitle="Motion" title="Video Showcase" description="Cinematic videos and behind-the-scenes content. Coming soon." />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-xl aspect-video relative group cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                      <Video size={24} className="text-gold" />
                    </div>
                    <span className="text-white/20 text-xs uppercase tracking-[2px]">Coming Soon</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
