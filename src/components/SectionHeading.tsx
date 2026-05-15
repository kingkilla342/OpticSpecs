"use client";
import FadeIn from "./FadeIn";

export default function SectionHeading({ subtitle, title, description }: { subtitle: string; title: string; description?: string }) {
  return (
    <div className="text-center mb-16">
      <FadeIn>
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-red-light/30" />
          <p className="text-red-light uppercase tracking-[5px] text-[10px] font-medium">{subtitle}</p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-red-light/30" />
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-semibold red-gold-text mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-gold/20" />
          <div className="red-gold-line w-20" />
          <div className="w-6 h-[1px] bg-gold/20" />
        </div>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="text-white/35 max-w-lg mx-auto text-sm leading-relaxed">{description}</p>
        </FadeIn>
      )}
    </div>
  );
}
