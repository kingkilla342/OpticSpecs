"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { Camera, AtSign, Award, Aperture, Focus, Clapperboard, Instagram } from "lucide-react";

const photographers = [
  {
    name: "Raymond",
    role: "Photographer & Creative Director",
    specialty: "Cinematic Portraits & Brand Photography",
    icon: Aperture,
    image: "/raymond.png",
    accent: "red",
    description: "Raymond brings a cinematic edge to every frame. Specializing in dramatic lighting, high-fashion portraits, and brand campaigns, his work blends editorial precision with raw emotion. He's the vision behind Optic Specs.",
    highlights: ["Editorial & fashion photography", "Brand identity shoots", "Music artist visuals", "Prom & luxury car shoots"],
    instagram: "llrymnd",
    num: "01",
  },
  {
    name: "Isayah",
    role: "Photographer & Cinematic Director",
    specialty: "Photography & Events",
    icon: Focus,
    image: "/isayah.png",
    accent: "gold",
    description: "Isayah does it all, from cinematic direction to high-end event shots. He has a natural eye for candid moments that tell a story. His raw, documentary-style approach gives every shoot an authentic edge.",
    highlights: ["Event & party photography", "Candid street style", "Urban portrait sessions", "Behind-the-scenes content"],
    instagram: "optic.griz",
    num: "02",
  },
  {
    name: "Kav",
    role: "Photographer & Videographer",
    specialty: "Videography & Motion Content",
    icon: Clapperboard,
    image: "/kav.png",
    accent: "red",
    description: "Kav bridges photography and film. Equally skilled behind the camera for stills and video, he crafts cinematic short films, music videos, and promotional content with a sharp creative eye.",
    highlights: ["Music video production", "Short films & promos", "Dynamic portrait photography", "Video editing & post-production"],
    instagram: "kay_2funny",
    num: "03",
  },
];

export default function PhotographersPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] ambient-red-glow rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red to-gold" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="The Team"
            title="Our Photographers"
            description="Three specialists. Three unique styles. One shared commitment to delivering art."
          />
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-6">
          {photographers.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`glass rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-2xl relative ${p.accent === "red" ? "hover:border-red/20 hover:shadow-red/5" : "hover:border-gold/20 hover:shadow-gold/5"}`}>

                {/* Hover accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${p.accent === "red" ? "bg-gradient-to-r from-red to-gold" : "bg-gradient-to-r from-gold to-red"}`} />

                {/* Large faded editorial number */}
                <div className="absolute top-4 right-6 editorial-number opacity-100 pointer-events-none select-none z-0"
                  style={{ color: 'transparent', WebkitTextStroke: `1px rgba(255,255,255,0.03)` }}>
                  {p.num}
                </div>

                <div className="p-8 md:p-12 relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                    {/* Portrait */}
                    <div className={`shrink-0 mx-auto md:mx-0 relative`}>
                      <div className={`w-36 h-48 md:w-52 md:h-68 rounded-xl overflow-hidden relative border transition-all duration-500 ${p.accent === "red" ? "border-red/15 group-hover:border-red/35" : "border-gold/15 group-hover:border-gold/35"}`}
                        style={{ height: 'clamp(192px, 20vw, 272px)', width: 'clamp(144px, 15vw, 208px)' }}>
                        <Image src={p.image} alt={p.name} fill className="object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Instagram overlay */}
                        <a
                          href={`https://instagram.com/${p.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram size={11} className="text-white/60" />
                          <span className="text-white/60 text-[9px] tracking-[1px]">@{p.instagram}</span>
                        </a>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-baseline gap-3 mb-1 justify-center md:justify-start flex-wrap">
                        <h2
                          className={`text-3xl md:text-4xl font-bold ${p.accent === "red" ? "red-gold-text" : "gold-text"}`}
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {p.name}
                        </h2>
                        <a
                          href={`https://instagram.com/${p.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs transition-colors flex items-center gap-1 ${p.accent === "red" ? "text-red-light/35 hover:text-red-light" : "text-gold/35 hover:text-gold"}`}
                        >
                          <AtSign size={13} />
                          <span className="tracking-wide">{p.instagram}</span>
                        </a>
                      </div>

                      <p className={`text-xs uppercase tracking-[3px] mb-1 font-medium ${p.accent === "red" ? "text-red-light/50" : "text-gold/60"}`}>
                        {p.role}
                      </p>

                      <p className="text-white/20 text-[10px] uppercase tracking-[3px] mb-6 flex items-center gap-2 justify-center md:justify-start">
                        <Award size={10} /> {p.specialty}
                      </p>

                      <div className={`w-12 h-[1px] mb-6 hidden md:block ${p.accent === "red" ? "bg-gradient-to-r from-red to-transparent" : "bg-gradient-to-r from-gold to-transparent"}`} />

                      <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-xl">{p.description}</p>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {p.highlights.map((h) => (
                          <span
                            key={h}
                            className={`rounded-full px-3 py-1.5 text-[11px] flex items-center gap-1.5 font-light tracking-wide ${p.accent === "red" ? "glass-red text-red-light/60" : "glass-gold text-gold/70"}`}
                          >
                            <Camera size={9} /> {h}
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

        {/* Bottom CTA */}
        <FadeIn delay={0.4}>
          <div className="max-w-5xl mx-auto mt-16 text-center">
            <p className="text-white/20 text-sm mb-5 tracking-wider">Ready to work with the team?</p>
            <Link href="/appointments" className="btn-red px-10 py-4 text-sm">Book Your Session</Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
