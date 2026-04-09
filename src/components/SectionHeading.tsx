"use client";
import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ subtitle, title, description }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <FadeIn>
        <p className="text-gold uppercase tracking-[5px] text-xs font-medium mb-4">
          {subtitle}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2
          className="text-4xl md:text-5xl font-semibold gold-text mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="gold-line max-w-[80px] mx-auto mb-6" />
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
