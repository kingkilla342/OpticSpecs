"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, Clock, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

const packageOptions = [
  { value: "standard", label: "Standard – $100", price: 100 },
  { value: "deluxe", label: "Deluxe – $150", price: 150 },
  { value: "premium", label: "Premium – $200", price: 200 },
  { value: "cars-package", label: "Cars Package – $400", price: 400 },
];

const vehicleOptions = [
  { value: "", label: "No vehicle needed" },
  { value: "mercedes-g63-blue", label: "2024 Mercedes G63 – China Blue ($600)" },
  { value: "bentley-flying-spur", label: "2022 Bentley Flying Spur – Black ($850)" },
  { value: "lambo-urus-blue", label: "2021 Lamborghini Urus – Blue ($850)" },
  { value: "rr-ghost-white", label: "2024 Rolls Royce Ghost – White ($1,200)" },
  { value: "lambo-huracan-pink", label: "Lamborghini Huracan Evo – Pink ($1,200)" },
  { value: "ferrari-f8-red", label: "2022 Ferrari F8 – Red ($1,600)" },
  { value: "mclaren-765lt", label: "2020 McLaren 765LT – Blue ($2,000)" },
  { value: "rr-cullinan-white", label: "2023 Rolls Royce Cullinan – White ($1,200)" },
  { value: "ferrari-sf90", label: "2022 Ferrari SF90 – Grey ($1,800)" },
  { value: "other", label: "Other – I'll specify in notes" },
];

function AppointmentForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("package") || "standard";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    package: preselected,
    vehicle: "",
    location: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg) setForm((prev) => ({ ...prev, package: pkg }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <FadeIn>
        <div className="glass-gold rounded-xl p-12 text-center max-w-lg mx-auto">
          <CheckCircle size={56} className="text-gold mx-auto mb-6" />
          <h2
            className="text-3xl gold-text font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Booking Confirmed
          </h2>
          <p className="text-white/50 mb-2">
            Thank you, <span className="text-gold">{form.name}</span>!
          </p>
          <p className="text-white/40 text-sm">
            We&apos;ll reach out within 24 hours to finalize your session details.
            Check your email for a confirmation.
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit} className="glass rounded-xl p-8 md:p-10 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input-dark"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input-dark"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(347) 555-0123"
              className="input-dark"
            />
          </div>

          {/* Package */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Package *
            </label>
            <select
              name="package"
              value={form.package}
              onChange={handleChange}
              className="input-dark"
            >
              {packageOptions.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              <Calendar size={12} className="inline mr-1" /> Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className="input-dark"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              <Clock size={12} className="inline mr-1" /> Preferred Time *
            </label>
            <input
              type="time"
              name="time"
              required
              value={form.time}
              onChange={handleChange}
              className="input-dark"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              <MapPin size={12} className="inline mr-1" /> Shoot Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Address or general area"
              className="input-dark"
            />
          </div>

          {/* Vehicle */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Vehicle Add-On (Optional)
            </label>
            <select
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              className="input-dark"
            >
              {vehicleOptions.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gold uppercase tracking-[2px] mb-2 font-medium">
              Special Requests / Modify Your Plan
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your vision, outfit ideas, concept plans, or any modifications to your selected package..."
              className="input-dark resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full mt-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Send size={14} /> Confirm Booking
            </>
          )}
        </button>
      </form>
    </FadeIn>
  );
}

export default function AppointmentsPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-28 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            subtitle="Schedule"
            title="Book Your Session"
            description="Fill out the form below and we'll confirm your session within 24 hours. Select your package, choose an optional vehicle, and let us know your vision."
          />

          <Suspense fallback={<div className="text-center text-white/30">Loading...</div>}>
            <AppointmentForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
