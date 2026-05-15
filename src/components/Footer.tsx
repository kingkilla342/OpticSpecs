"use client";
import Link from "next/link";
import { AtSign, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div>
            <h3 className="red-gold-text text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Optic Specs
            </h3>
            <p className="text-white/15 text-[9px] uppercase tracking-[4px] mb-5">New York · Luxury Photography</p>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Professional photography & videography. Capturing moments with cinematic precision and artistic vision.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-red-light/50 uppercase tracking-[4px] text-[9px] font-semibold mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3.5">
              {[
                { href: "/pricing", label: "Pricing" },
                { href: "/photographers", label: "Our Team" },
                { href: "/showcase", label: "Showcase" },
                { href: "/appointments", label: "Book a Session" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/30 hover:text-gold text-sm transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold/50 uppercase tracking-[4px] text-[9px] font-semibold mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/optic.specs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/30 hover:text-red-light text-sm transition-colors duration-300 group"
              >
                <AtSign size={15} className="shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>@optic.specs</span>
              </a>
              <a
                href="mailto:optic.specsphotography@gmail.com"
                className="flex items-center gap-3 text-white/30 hover:text-gold text-sm transition-colors duration-300 group"
              >
                <Mail size={15} className="shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>optic.specsphotography@gmail.com</span>
              </a>
              <a
                href="tel:6318386393"
                className="flex items-center gap-3 text-white/30 hover:text-gold text-sm transition-colors duration-300 group"
              >
                <Phone size={15} className="shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>631-838-6393</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-[10px] tracking-[2px] uppercase">
            &copy; {new Date().getFullYear()} Optic Specs. All rights reserved.
          </p>
          <Link href="/admin" className="text-white/[0.025] hover:text-white/8 text-xs transition-colors duration-700 select-none">
            &#9679;
          </Link>
          <p className="text-white/10 text-[10px] tracking-[3px] uppercase">
            New York &mdash; Est. 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
