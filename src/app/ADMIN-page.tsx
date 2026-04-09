"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import {
  Lock,
  LogOut,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  FileText,
} from "lucide-react";

const ACCESS_CODE = "OPTIC2026";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  package: string;
  vehicle: string;
  location: string;
  notes: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch {
      console.error("Failed to fetch");
    }
  };

  useEffect(() => {
    if (authenticated) fetchAppointments();
  }, [authenticated]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAppointments();
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;
    await fetch("/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAppointments();
  };

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10",
    confirmed: "text-green-400 bg-green-400/10",
    cancelled: "text-red-400 bg-red-400/10",
    completed: "text-gold bg-gold/10",
  };

  if (!authenticated) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <Navbar />
        <FadeIn>
          <div className="glass rounded-xl p-10 max-w-sm w-full mx-4">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-4">
                <Lock size={24} className="text-gold" />
              </div>
              <h1
                className="text-2xl gold-text font-semibold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Admin Access
              </h1>
              <p className="text-white/40 text-sm">Enter your access code to continue</p>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Access Code"
                className="input-dark text-center tracking-[4px] text-lg mb-4"
              />
              {error && (
                <p className="text-red-400 text-xs text-center mb-4">{error}</p>
              )}
              <button type="submit" className="btn-gold w-full py-3">
                Enter
              </button>
            </form>
          </div>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1
                className="text-3xl gold-text font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {appointments.length} total appointments
              </p>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="btn-outline py-2 px-4 text-xs flex items-center gap-2"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Pending", count: appointments.filter((a) => a.status === "pending").length, color: "text-yellow-400" },
              { label: "Confirmed", count: appointments.filter((a) => a.status === "confirmed").length, color: "text-green-400" },
              { label: "Completed", count: appointments.filter((a) => a.status === "completed").length, color: "text-gold" },
              { label: "Cancelled", count: appointments.filter((a) => a.status === "cancelled").length, color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-lg p-5 text-center">
                <p className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.count}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-[2px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded text-xs uppercase tracking-[2px] transition-all duration-200 ${
                  filter === f
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "glass text-white/50 hover:text-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center">
                <p className="text-white/30">No appointments found.</p>
              </div>
            ) : (
              filteredAppointments
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((apt) => (
                  <FadeIn key={apt.id}>
                    <div className="glass rounded-xl p-6 hover:border-gold/20 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg text-white font-medium">{apt.name}</h3>
                            <span
                              className={`text-[10px] uppercase tracking-[2px] px-2 py-0.5 rounded-full ${
                                statusColors[apt.status] || "text-white/40"
                              }`}
                            >
                              {apt.status}
                            </span>
                          </div>
                          <p className="text-white/30 text-xs">
                            Booked {new Date(apt.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(apt.id, "confirmed")}
                            className="p-2 rounded glass hover:bg-green-500/10 text-green-400/60 hover:text-green-400 transition-all"
                            title="Confirm"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, "completed")}
                            className="p-2 rounded glass hover:bg-gold/10 text-gold/60 hover:text-gold transition-all"
                            title="Complete"
                          >
                            <Clock size={16} />
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, "cancelled")}
                            className="p-2 rounded glass hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-all"
                            title="Cancel"
                          >
                            <XCircle size={16} />
                          </button>
                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="p-2 rounded glass hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-white/50">
                          <Mail size={13} className="text-gold/60" />
                          {apt.email}
                        </div>
                        <div className="flex items-center gap-2 text-white/50">
                          <Phone size={13} className="text-gold/60" />
                          {apt.phone}
                        </div>
                        <div className="flex items-center gap-2 text-white/50">
                          <Calendar size={13} className="text-gold/60" />
                          {apt.date} at {apt.time}
                        </div>
                        <div className="flex items-center gap-2 text-white/50">
                          <User size={13} className="text-gold/60" />
                          <span className="capitalize">{apt.package?.replace("-", " ")}</span>
                        </div>
                        {apt.vehicle && (
                          <div className="flex items-center gap-2 text-white/50">
                            <Car size={13} className="text-gold/60" />
                            <span className="capitalize">{apt.vehicle.replace(/-/g, " ")}</span>
                          </div>
                        )}
                        {apt.location && (
                          <div className="flex items-center gap-2 text-white/50">
                            <MapPin size={13} className="text-gold/60" />
                            {apt.location}
                          </div>
                        )}
                      </div>

                      {apt.notes && (
                        <div className="mt-4 p-3 rounded-lg bg-white/3 border border-white/5">
                          <div className="flex items-center gap-2 text-gold/60 text-xs uppercase tracking-[2px] mb-1">
                            <FileText size={11} /> Client Notes
                          </div>
                          <p className="text-white/50 text-sm">{apt.notes}</p>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
