"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { Trophy, Car, User, Camera, Video, Sparkles, PartyPopper, X, ChevronLeft, ChevronRight } from "lucide-react";

const categoryMeta: Record<string, { label: string; icon: typeof Camera; color: string; desc: string }> = {
  sports: { label: "Sports", icon: Trophy, color: "text-red-400", desc: "Game-day energy captured in every frame" },
  vehicles: { label: "Vehicles", icon: Car, color: "text-gold", desc: "Luxury & exotic cars in their best light" },
  personal: { label: "Personal", icon: User, color: "text-blue-400", desc: "Portraits, proms, birthdays & more" },
  lifestyle: { label: "Lifestyle", icon: Sparkles, color: "text-purple-400", desc: "Fashion, street style & everyday moments" },
  events: { label: "Events", icon: PartyPopper, color: "text-emerald-400", desc: "Parties, concerts & special occasions" },
};

const categoryOrder = ["sports", "vehicles", "personal", "lifestyle", "events"];

export default function ShowcasePage() {
  const [active, setActive] = useState("all");
  const [images, setImages] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; cat: string; idx: number } | null>(null);

  useEffect(() => {
    fetch("/api/showcase")
      .then((r) => r.json())
      .then((data) => { setImages(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allImages = categoryOrder.flatMap((cat) =>
    (images[cat] || []).map((src) => ({ src, cat }))
  );

  const openLightbox = (src: string, cat: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    setLightbox({ src, cat, idx });
  };

  const navigateLightbox = (dir: -1 | 1) => {
    if (!lightbox) return;
    const list = active === "all" ? allImages : allImages.filter((img) => img.cat === active);
    const currentIdx = list.findIndex((img) => img.src === lightbox.src);
    const nextIdx = (currentIdx + dir + list.length) % list.length;
    const next = list[nextIdx];
    setLightbox({ src: next.src, cat: next.cat, idx: nextIdx });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const totalCount = Object.values(images).reduce((sum, arr) => sum + arr.length, 0);

  const visibleCategories = categoryOrder.filter(
    (cat) => active === "all" ? (images[cat]?.length || 0) > 0 : cat === active
  );

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Portfolio"
            title="Our Work"
            description={`${totalCount} photos across ${Object.values(images).filter((a) => a.length > 0).length} categories. Sports. Vehicles. Portraits. Lifestyle. Events.`}
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto flex gap-2 md:gap-3 justify-center flex-wrap">
          <button
            onClick={() => setActive("all")}
            className={`px-4 md:px-5 py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-[2px] transition-all duration-300 flex items-center gap-2 ${
              active === "all" ? "bg-gold/20 text-gold border border-gold/30" : "glass text-white/50 hover:text-gold"
            }`}
          >
            <Camera size={13} /> All ({totalCount})
          </button>
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat];
            const count = images[cat]?.length || 0;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 md:px-5 py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-[2px] transition-all duration-300 flex items-center gap-2 ${
                  active === cat ? "bg-gold/20 text-gold border border-gold/30" : "glass text-white/50 hover:text-gold"
                }`}
              >
                <meta.icon size={13} /> {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && totalCount === 0 && (
        <div className="max-w-md mx-auto text-center py-20 px-6">
          <div className="glass-gold rounded-xl p-8">
            <Camera size={32} className="text-gold mx-auto mb-4" />
            <h3 className="text-xl gold-text font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Gallery Coming Soon</h3>
            <p className="text-white/40 text-sm">Photos are being added. Check back soon.</p>
          </div>
        </div>
      )}

      {/* Category Sections */}
      {!loading && visibleCategories.map((cat) => {
        const meta = categoryMeta[cat];
        const photos = images[cat] || [];
        if (photos.length === 0) return null;

        return (
          <section key={cat} className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-lg glass flex items-center justify-center border border-white/5`}>
                    <meta.icon size={18} className={meta.color} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {meta.label}
                    </h2>
                    <p className="text-white/30 text-xs">{meta.desc} &middot; {photos.length} photos</p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {photos.map((src, i) => (
                  <FadeIn key={src} delay={i * 0.04}>
                    <div
                      className="rounded-xl overflow-hidden relative group cursor-pointer aspect-[3/4]"
                      onClick={() => openLightbox(src, cat)}
                    >
                      <Image
                        src={src}
                        alt={`${meta.label} photo ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className={`${meta.color} text-[10px] uppercase tracking-[2px]`}>{meta.label}</p>
                      </div>
                      {/* Top accent line */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        style={{ background: `linear-gradient(90deg, transparent, currentColor, transparent)` }}
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Video Section */}
      {!loading && (
        <section className="px-6 py-20 border-t border-gold/8">
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
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          {/* Close */}
          <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors" onClick={() => setLightbox(null)}>
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-2 md:left-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Image */}
          <div className="relative w-[90vw] h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt="Showcase photo"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-2 md:right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Category label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2">
            <p className="text-gold text-xs uppercase tracking-[2px]">{categoryMeta[lightbox.cat]?.label}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
