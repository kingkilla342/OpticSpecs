"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Camera, AtSign, Award, Aperture, Focus, Clapperboard } from "lucide-react";

const photographers = [
  {
    name: "Chris",
    role: "Lead Photographer & Creative Director",
    specialty: "Cinematic Portraits & Brand Photography",
    icon: Aperture,
    description:
      "Chris brings a cinematic edge to every frame. Specializing in dramatic lighting, high-fashion portraits, and brand campaigns, his work blends editorial precision with raw emotion. He's the vision behind Optic Specs.",
    highlights: [
      "Editorial & fashion photography",
      "Brand identity shoots",
      "Music artist visuals",
      "Prom & luxury car shoots",
    ],
    instagram: "optic.specs",
    gradient: "from-gold/20 to-gold/5",
  },
  {
    name: "Marcus",
    role: "Senior Photographer",
    specialty: "Street Photography & Events",
    icon: Focus,
    description:
      "Marcus captures life in motion. From street-style fashion to high-energy events, he has a natural eye for candid moments that tell a story. His raw, documentary-style approach gives every shoot an authentic edge.",
    highlights: [
      "Event & party photography",
      "Candid street style",
      "Urban portrait sessions",
      "Behind-the-scenes content",
    ],
    instagram: "optic.specs",
    gradient: "from-white/10 to-white/3",
  },
  {
    name: "Jaylen",
    role: "Photographer & Videographer",
    specialty: "Videography & Motion Content",
    icon: Clapperboard,
    description:
      "Jaylen bridges photography and film. Equally skilled behind the camera for stills and video, he crafts cinematic short films, music videos, and promotional content with a sharp creative eye.",
    highlights: [
      "Music video production",
      "Short films & promos",
      "Dynamic portrait photography",
      "Video editing & post-production",
    ],
    instagram: "optic.specs",
    gradient: "from-gold/15 to-transparent",
  },
];

export default function PhotographersPage() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="The Team"
            title="Our Photographers"
            description="Three specialists. Three unique styles. One shared commitment to delivering art."
          />
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative px-6 pb-28">
        <div className="max-w-5xl mx-auto space-y-8">
          {photographers.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="glass rounded-xl overflow-hidden group hover:border-gold/25 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5">
                <div className={`bg-gradient-to-r ${p.gradient} p-8 md:p-10`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Photo placeholder */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl glass-gold flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-500">
                      <p.icon size={48} className="text-gold/60 group-hover:text-gold transition-colors duration-500" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h2
                          className="text-2xl md:text-3xl gold-text font-semibold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {p.name}
                        </h2>
                        <a
                          href={`https://instagram.com/${p.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold/40 hover:text-gold transition-colors"
                        >
                          <AtSign size={16} />
                        </a>
                      </div>
                      <p className="text-gold/70 text-sm uppercase tracking-[2px] mb-1">
                        {p.role}
                      </p>
                      <p className="text-white/30 text-xs uppercase tracking-[3px] mb-5 flex items-center gap-2">
                        <Award size={12} /> {p.specialty}
                      </p>

                      <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xl">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {p.highlights.map((h) => (
                          <span
                            key={h}
                            className="glass-gold rounded-full px-3 py-1.5 text-xs text-gold/80 flex items-center gap-1.5"
                          >
                            <Camera size={10} /> {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
