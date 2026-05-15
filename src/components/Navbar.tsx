"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3 shadow-lg shadow-black/40" : "bg-transparent py-5"}`}>
        {scrolled && <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/60 to-gold/40" />}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-red/25 group-hover:border-red/50 transition-all duration-300 bg-white shrink-0">
              <Image src="/logo.png" alt="Optic Specs" fill className="object-contain p-0.5" priority />
            </div>
            <div>
              <span className="red-gold-text text-[18px] font-semibold tracking-wide block leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Optic Specs
              </span>
              <span className="text-[8px] uppercase tracking-[3px] text-white/20">Photography</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.label === "Book Now" ? (
                <Link key={link.href} href={link.href} className="btn-red text-[11px] px-6 py-2.5">
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[2px] font-light transition-all duration-300 relative group ${pathname === link.href ? "text-gold" : "text-white/50 hover:text-gold"}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-red to-gold transition-opacity duration-300 ${pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`} />
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-red-light transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 glass-strong transition-all duration-500 flex flex-col items-center justify-center gap-10 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/40 to-transparent" />
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={`text-2xl uppercase tracking-[5px] font-light transition-all duration-300 ${link.label === "Book Now" ? "red-gold-text font-semibold" : "text-white/70 hover:text-gold"}`}
            style={{
              transitionDelay: mobileOpen ? `${i * 70}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            {link.label}
          </Link>
        ))}
        <div className="absolute bottom-10 text-white/10 text-[9px] tracking-[3px] uppercase">
          New York · Luxury Photography
        </div>
      </div>
    </>
  );
}
