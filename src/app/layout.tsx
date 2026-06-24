import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optic Specs | Professional Photography & Videography",
  description: "Luxury photography and videography services. Professional prom shoots, brand photography, and cinematic videos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-bg" style={{ fontFamily: "'Outfit', sans-serif" }}>{children}</body>
    </html>
  );
}
