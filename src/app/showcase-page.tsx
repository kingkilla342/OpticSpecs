"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Camera, Video, Image as ImageIcon, Play } from "lucide-react";

const categories = ["All", "Portraits", "Events", "Cars", "Fashion", "Music"];

const placeholders = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: ["Portraits", "Events", "Cars", "Fashion", "Music", "Portraits"][i % 6],
  type: i % 4 === 0 ? "video" : "photo",
}));

export default function ShowcasePage() {
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
            description="A curated showcase of our finest photography, videography, and creative productions. Gallery coming soon."
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex gap-3 justify-center flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-5 py-2 rounded-full glass text-xs uppercase tracking-[2px] text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placeholders.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <div className="glass rounded-lg aspect-[3/4] relative group cursor-pointer overflow-hidden hover:border-gold/30 transition-all duration-500">
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-gold/5 to-transparent">
                    {item.type === "video" ? (
                      <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Play size={22} className="text-gold ml-1" />
                      </div>
                    ) : (
                      <ImageIcon size={32} className="text-gold/20 group-hover:text-gold/40 transition-colors duration-500" />
                    )}
                    <span className="text-white/20 text-xs uppercase tracking-[2px]">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-6 pb-28">
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
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
