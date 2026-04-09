"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Camera, Video, Trophy, Car, User, Play, Image as ImageIcon } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Camera },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "personal", label: "Personal", icon: User },
];

const galleryItems = [
  // Sports
  { id: 1, category: "sports", type: "photo", label: "Game Day Action" },
  { id: 2, category: "sports", type: "photo", label: "Courtside Moment" },
  { id: 3, category: "sports", type: "photo", label: "Victory Celebration" },
  { id: 4, category: "sports", type: "video", label: "Highlight Reel" },
  { id: 5, category: "sports", type: "photo", label: "Athlete Portrait" },
  { id: 6, category: "sports", type: "photo", label: "Championship Night" },
  // Vehicles
  { id: 7, category: "vehicles", type: "photo", label: "Rolls Royce Ghost" },
  { id: 8, category: "vehicles", type: "photo", label: "Lamborghini Urus" },
  { id: 9, category: "vehicles", type: "video", label: "Exotic Fleet Promo" },
  { id: 10, category: "vehicles", type: "photo", label: "Ferrari Portofino" },
  { id: 11, category: "vehicles", type: "photo", label: "Mercedes G63" },
  { id: 12, category: "vehicles", type: "photo", label: "McLaren 765LT" },
  // Personal
  { id: 13, category: "personal", type: "photo", label: "Street Portrait" },
  { id: 14, category: "personal", type: "photo", label: "Urban Fashion" },
  { id: 15, category: "personal", type: "video", label: "Birthday Shoot" },
  { id: 16, category: "personal", type: "photo", label: "Couple Session" },
  { id: 17, category: "personal", type: "photo", label: "Prom Night" },
  { id: 18, category: "personal", type: "photo", label: "Graduation" },
];

export default function ShowcasePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Portfolio"
            title="Our Work"
            description="A curated showcase of our finest photography, videography, and creative productions across sports, vehicles, and personal sessions."
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex gap-3 justify-center flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[2px] transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === cat.id
                      ? "bg-gold/20 text-gold border border-gold/30 shadow-lg shadow-gold/10"
                      : "glass text-white/50 hover:text-gold hover:border-gold/20"
                  }`}
                >
                  <cat.icon size={13} />
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.04}>
                <div className="glass rounded-lg aspect-[3/4] relative group cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-500">
                  {/* Category color accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] ${
                      item.category === "sports"
                        ? "bg-gradient-to-r from-red-500/60 to-orange-500/60"
                        : item.category === "vehicles"
                        ? "bg-gradient-to-r from-gold/60 to-gold-light/60"
                        : "bg-gradient-to-r from-blue-400/60 to-purple-400/60"
                    }`}
                  />

                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-gold/3 to-transparent p-4">
                    {item.type === "video" ? (
                      <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Play size={22} className="text-gold ml-1" />
                      </div>
                    ) : (
                      <ImageIcon
                        size={32}
                        className="text-gold/15 group-hover:text-gold/30 transition-colors duration-500"
                      />
                    )}
                    <span className="text-white/25 text-[10px] uppercase tracking-[2px] text-center">
                      {item.label}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/70 text-xs font-medium">{item.label}</p>
                    <p className="text-gold/50 text-[10px] uppercase tracking-[2px] capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* === SPORTS SECTION === */}
      <section className="px-6 py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Trophy size={22} className="text-red-400" />
              </div>
              <div>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sports Photography
                </h2>
                <p className="text-white/40 text-sm">
                  Game-day energy captured in every frame
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="glass rounded-xl aspect-[4/3] relative group cursor-pointer overflow-hidden hover:border-red-500/20 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy
                      size={28}
                      className="text-red-400/15 group-hover:text-red-400/30 transition-colors duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/40 to-orange-500/40" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* === VEHICLES SECTION === */}
      <section className="px-6 py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-lg glass-gold flex items-center justify-center">
                <Car size={22} className="text-gold" />
              </div>
              <div>
                <h2
                  className="text-2xl md:text-3xl font-semibold gold-text"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Vehicle Shoots
                </h2>
                <p className="text-white/40 text-sm">
                  Luxury & exotic cars in their best light
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="glass rounded-xl aspect-video relative group cursor-pointer overflow-hidden hover:border-gold/25 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car
                      size={32}
                      className="text-gold/15 group-hover:text-gold/30 transition-colors duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 to-gold-light/40" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* === PERSONAL SECTION === */}
      <section className="px-6 py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <User size={22} className="text-blue-400" />
              </div>
              <div>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Personal Sessions
                </h2>
                <p className="text-white/40 text-sm">
                  Portraits, proms, birthdays & more
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="glass rounded-xl aspect-[3/4] relative group cursor-pointer overflow-hidden hover:border-blue-400/20 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User
                      size={28}
                      className="text-blue-400/15 group-hover:text-blue-400/30 transition-colors duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400/40 to-purple-400/40" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="px-6 py-20 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            subtitle="Motion"
            title="Video Showcase"
            description="Cinematic videos, music productions, and behind-the-scenes footage. Content coming soon."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-xl aspect-video relative group cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/20 transition-all duration-500">
                      <Video size={24} className="text-gold" />
                    </div>
                    <span className="text-white/20 text-xs uppercase tracking-[2px]">
                      Video Coming Soon
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <div className="glass-gold rounded-xl p-8 max-w-md mx-auto">
                <Camera size={28} className="text-gold mx-auto mb-4" />
                <h3
                  className="text-xl gold-text font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Gallery Under Construction
                </h3>
                <p className="text-white/40 text-sm">
                  We&apos;re curating our best work. Check back soon for a full showcase
                  of our photography and video portfolio.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
