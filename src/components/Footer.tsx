"use client";
import Link from "next/link";
import { AtSign, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="gold-text text-2xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Optic Specs</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Professional photography & videography. Capturing moments with cinematic precision and artistic vision.</p>
          </div>
          <div>
            <h4 className="text-gold uppercase tracking-[3px] text-xs font-semibold mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[{ href: "/pricing", label: "Pricing" }, { href: "/photographers", label: "Our Team" }, { href: "/showcase", label: "Showcase" }, { href: "/appointments", label: "Book a Session" }].map((link) => (
                <Link key={link.href} href={link.href} className="text-white/40 hover:text-gold text-sm transition-colors duration-300">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gold uppercase tracking-[3px] text-xs font-semibold mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <a href="https://instagram.com/optic.specs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-gold text-sm transition-colors duration-300"><AtSign size={16} /> @optic.specs</a>
              <a href="mailto: optic.specsphotography@gmail.com" className="flex items-center gap-3 text-white/40 hover:text-gold text-sm transition-colors duration-300"><Mail size={16} /> contact@opticspecs.com</a>
              <a href="tel:6318386393" className="flex items-center gap-3 text-white/40 hover:text-gold text-sm transition-colors duration-300"><Phone size={16} /> 631-838-6393
            </a>
            </div>
          </div>
        </div>
        <div className="gold-line mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider">&copy; {new Date().getFullYear()} OPTIC SPECS. ALL RIGHTS RESERVED.</p>
          <p className="text-white/15 text-xs tracking-wider">NEW YORK &mdash; LUXURY PHOTOGRAPHY</p>
        </div>
      </div>
    </footer>
  );
}
