"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/photographers", label: "Photographers" },
  { href: "/showcase", label: "Showcase" },
  { href: "/appointments", label: "Book Now" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3 shadow-lg shadow-black/30" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 overflow-hidden rounded-full border border-gold/30 group-hover:border-gold/60 transition-all duration-300 bg-white">
              <Image src="/logo.png" alt="Optic Specs" fill className="object-contain p-0.5" priority />
            </div>
            <div>
              <span className="gold-text text-xl font-semibold tracking-wide block leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Optic Specs</span>
              <span className="text-[10px] uppercase tracking-[3px] text-gold/50">Photography</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.label === "Book Now" ? (
                <Link key={link.href} href={link.href} className="btn-gold text-xs px-6 py-2.5">{link.label}</Link>
              ) : (
                <Link key={link.href} href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors duration-300 uppercase tracking-wider font-light">{link.label}</Link>
              )
            )}
          </div>
          <button className="md:hidden text-gold" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-40 glass-strong transition-all duration-500 flex flex-col items-center justify-center gap-8 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((link, i) => (
          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`text-2xl uppercase tracking-[4px] font-light transition-all duration-300 ${link.label === "Book Now" ? "gold-text font-semibold" : "text-white/80 hover:text-gold"}`}
            style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms", transform: mobileOpen ? "translateY(0)" : "translateY(20px)", opacity: mobileOpen ? 1 : 0 }}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
