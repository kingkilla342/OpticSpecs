"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import { Trophy, Car, User, Camera, Video, Sparkles, PartyPopper, X, ChevronLeft, ChevronRight } from "lucide-react";

const categoryMeta: Record<string, { label: string; icon: typeof Camera; color: string; desc: string }> = {
  sports:    { label: "Sports",    icon: Trophy,      color: "text-red-light", desc: "Game-day energy captured in every frame" },
  vehicles:  { label: "Vehicles",  icon: Car,         color: "text-gold",      desc: "Luxury & exotic cars in their best light" },
  personal:  { label: "Personal",  icon: User,        color: "text-red-light", desc: "Portraits, proms, birthdays & more" },
  lifestyle: { label: "Lifestyle", icon: Sparkles,    color: "text-gold",      desc: "Fashion, street style & everyday moments" },
  events:    { label: "Events",    icon: PartyPopper, color: "text-red-light", desc: "Parties, concerts & special occasions" },
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

      {/* Header */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] ambient-red-glow rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-gold" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Portfolio"
            title="Our Work"
            description={`${totalCount > 0 ? `${totalCount} photos` : "Photos"} across Sports, Vehicles, Portraits, Lifestyle & Events.`}
          />
        </div>
      </section>

      {/* Editorial underline tab filters */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-8 md:gap-10 justify-center flex-wrap border-b border-white/[0.05] pb-0">
            <button
              onClick={() => setActive("all")}
              className={`tab-filter pb-3 flex items-center gap-2 ${active === "all" ? "active" : ""}`}
            >
              <Camera size={12} /> All {totalCount > 0 && <span className="text-white/20 text-[9px]">({totalCount})</span>}
            </button>
            {categoryOrder.map((cat) => {
              const meta = categoryMeta[cat];
              const count = images[cat]?.length || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`tab-filter pb-3 flex items-center gap-2 ${active === cat ? "active" : ""}`}
                >
                  <meta.icon size={12} /> {meta.label}
                  {count > 0 && <span className="text-white/20 text-[9px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border border-red/20 border-t-red rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && totalCount === 0 && (
        <div className="max-w-sm mx-auto text-center py-24 px-6">
          <div className="glass-red rounded-2xl p-10">
            <Camera size={28} className="text-red-light/50 mx-auto mb-5" />
            <h3 className="text-xl red-gold-text font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gallery Coming Soon
            </h3>
            <p className="text-white/30 text-sm leading-relaxed">Photos are being added. Check back soon.</p>
          </div>
        </div>
      )}

      {/* Gallery sections */}
      {!loading && visibleCategories.map((cat) => {
        const meta = categoryMeta[cat];
        const photos = images[cat] || [];
        if (photos.length === 0) return null;

        return (
          <section key={cat} className="px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-1 h-8 rounded-full ${meta.color === "text-red-light" ? "bg-gradient-to-b from-red to-transparent" : "bg-gradient-to-b from-gold to-transparent"}`} />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {meta.label}
                    </h2>
                    <p className="text-white/25 text-[10px] uppercase tracking-[2px] mt-0.5">{meta.desc} · {photos.length} photos</p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {photos.map((src, i) => (
                  <FadeIn key={src} delay={i * 0.03}>
                    <div
                      className="rounded-xl overflow-hidden relative group cursor-pointer aspect-[3/4] photo-frame"
                      onClick={() => openLightbox(src, cat)}
                    >
                      <Image
                        src={src}
                        alt={`${meta.label} photo ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <p className={`${meta.color} text-[9px] uppercase tracking-[3px]`}>{meta.label}</p>
                      </div>
                      <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${meta.color === "text-red-light" ? "bg-gradient-to-r from-red to-gold" : "bg-gradient-to-r from-gold to-red"}`} />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Video showcase */}
      {!loading && (
        <section className="px-6 py-24 border-t border-white/[0.04]">
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/15 to-transparent" style={{ marginTop: "-96px" }} />
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              subtitle="Motion"
              title="Video Showcase"
              description="Cinematic videos and behind-the-scenes content. Coming soon."
            />
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`glass rounded-2xl aspect-video relative group cursor-pointer overflow-hidden transition-all duration-500 ${i === 1 ? "hover:border-red/20" : "hover:border-gold/20"}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${i === 1 ? "glass-red" : "glass-gold"}`}>
                        <Video size={22} className={i === 1 ? "text-red-light" : "text-gold"} />
                      </div>
                      <span className="text-white/15 text-[10px] uppercase tracking-[3px]">Coming Soon</span>
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
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(3,3,3,0.97)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full glass-red flex items-center justify-center text-red-light/50 hover:text-red-light transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-8 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
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
            className="absolute right-3 md:right-8 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Category label */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2">
            <p className={`text-[10px] uppercase tracking-[3px] ${categoryMeta[lightbox.cat]?.color || "text-gold"}`}>
              {categoryMeta[lightbox.cat]?.label}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
