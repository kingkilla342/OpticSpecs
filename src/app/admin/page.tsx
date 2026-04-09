"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Lock, LogOut, Calendar, User, Mail, Phone, MapPin, Car, CheckCircle, XCircle, Clock,
  Trash2, FileText, Search, Download, RefreshCw, ChevronDown, ChevronUp, Edit3, Save,
  X, BarChart3, Users, DollarSign, TrendingUp, Filter, Eye, EyeOff, Settings, Bell
} from "lucide-react";

const ACCESS_CODE = "Optic2026";

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

const pkgPrices: Record<string, number> = {
  standard: 100, deluxe: 150, premium: 200, "cars-package": 400, "cars package": 400,
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "created" | "name">("created");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Appointment>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"appointments" | "analytics" | "settings">("appointments");
  const [showCode, setShowCode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) { setAuth(true); setError(""); }
    else { setError("Invalid access code"); }
  };

  const fetchAppointments = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch { console.error("Failed to fetch"); }
    setRefreshing(false);
  };

  useEffect(() => { if (auth) fetchAppointments(); }, [auth]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/appointments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    fetchAppointments();
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment permanently?")) return;
    await fetch("/api/appointments", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchAppointments();
  };

  const startEdit = (apt: Appointment) => {
    setEditingId(apt.id);
    setEditData({ name: apt.name, email: apt.email, phone: apt.phone, date: apt.date, time: apt.time, package: apt.package, vehicle: apt.vehicle, location: apt.location, notes: apt.notes });
  };

  const saveEdit = async () => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, ...editData }),
    });
    setEditingId(null);
    setEditData({});
    fetchAppointments();
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Date", "Time", "Package", "Vehicle", "Location", "Status", "Notes", "Booked"];
    const rows = appointments.map((a) => [a.name, a.email, a.phone, a.date, a.time, a.package, a.vehicle, a.location, a.status, a.notes, a.createdAt]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `optic-specs-bookings-${new Date().toISOString().split("T")[0]}.csv`; a.click();
  };

  const filtered = useMemo(() => {
    let list = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.phone?.includes(q) || a.package?.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      let va = "", vb = "";
      if (sortBy === "date") { va = a.date || ""; vb = b.date || ""; }
      else if (sortBy === "name") { va = a.name || ""; vb = b.name || ""; }
      else { va = a.createdAt || ""; vb = b.createdAt || ""; }
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return list;
  }, [appointments, filter, search, sortBy, sortDir]);

  const stats = useMemo(() => {
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const cancelled = appointments.filter((a) => a.status === "cancelled").length;
    const revenue = appointments.filter((a) => a.status === "completed" || a.status === "confirmed").reduce((sum, a) => sum + (pkgPrices[a.package?.toLowerCase()] || 0), 0);
    const thisWeek = appointments.filter((a) => { const d = new Date(a.createdAt); const now = new Date(); const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24); return diff <= 7; }).length;
    return { total: appointments.length, pending, confirmed, completed, cancelled, revenue, thisWeek };
  }, [appointments]);

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    confirmed: "text-green-400 bg-green-400/10 border-green-400/20",
    cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
    completed: "text-gold bg-gold/10 border-gold/20",
  };

  // === LOGIN SCREEN ===
  if (!auth) {
    return (
      <main className="relative min-h-screen flex items-center justify-center px-4" style={{ background: "#050505" }}>
        <div className="glass rounded-xl p-8 md:p-10 max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-4"><Lock size={24} className="text-gold" /></div>
            <h1 className="text-2xl gold-text font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Access</h1>
            <p className="text-white/40 text-sm">Enter your access code</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="relative">
              <input type={showCode ? "text" : "password"} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Access Code" className="input-dark text-center tracking-[4px] text-lg mb-4 pr-10" />
              <button type="button" onClick={() => setShowCode(!showCode)} className="absolute right-3 top-3 text-white/30 hover:text-gold transition-colors">
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}
            <button type="submit" className="btn-gold w-full py-3">Enter Dashboard</button>
          </form>
        </div>
      </main>
    );
  }

  // === MAIN DASHBOARD ===
  return (
    <main className="relative min-h-screen" style={{ background: "#050505", fontFamily: "'Outfit', sans-serif" }}>
      {/* Top Bar */}
      <div className="glass-strong sticky top-0 z-50 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-gold flex items-center justify-center"><Settings size={14} className="text-gold" /></div>
            <div>
              <h1 className="gold-text text-lg font-semibold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Optic Specs</h1>
              <p className="text-white/30 text-[10px] uppercase tracking-[2px]">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAppointments} className={`p-2 rounded glass text-gold/50 hover:text-gold transition-all ${refreshing ? "animate-spin" : ""}`}><RefreshCw size={16} /></button>
            <button onClick={() => setAuth(false)} className="p-2 rounded glass text-red-400/50 hover:text-red-400 transition-all"><LogOut size={16} /></button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        <div className="flex gap-1 bg-black/40 rounded-lg p-1 w-fit">
          {([["appointments", "Bookings", Calendar], ["analytics", "Analytics", BarChart3], ["settings", "Settings", Settings]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id as typeof tab)} className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs uppercase tracking-[2px] transition-all ${tab === id ? "bg-gold/15 text-gold" : "text-white/40 hover:text-white/60"}`}>
              <Icon size={14} /> <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* === ANALYTICS TAB === */}
        {tab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: "Total Bookings", value: stats.total, icon: Users, color: "text-white" },
                { label: "This Week", value: stats.thisWeek, icon: TrendingUp, color: "text-blue-400" },
                { label: "Est. Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
                { label: "Conversion", value: stats.total > 0 ? `${Math.round(((stats.confirmed + stats.completed) / stats.total) * 100)}%` : "0%", icon: BarChart3, color: "text-gold" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2"><s.icon size={14} className={`${s.color} opacity-60`} /><span className="text-white/40 text-[10px] uppercase tracking-[2px]">{s.label}</span></div>
                  <p className={`text-2xl md:text-3xl font-bold ${s.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Pending", count: stats.pending, color: "text-yellow-400", bg: "bg-yellow-400/10" },
                { label: "Confirmed", count: stats.confirmed, color: "text-green-400", bg: "bg-green-400/10" },
                { label: "Completed", count: stats.completed, color: "text-gold", bg: "bg-gold/10" },
                { label: "Cancelled", count: stats.cancelled, color: "text-red-400", bg: "bg-red-400/10" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <p className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>{s.count}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-[2px] mt-1">{s.label}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full ${s.bg} ${s.color}`} style={{ width: `${stats.total > 0 ? (s.count / stats.total) * 100 : 0}%`, background: "currentColor", opacity: 0.4 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="text-white/60 text-sm font-medium mb-4">Package Breakdown</h3>
              {["standard", "deluxe", "premium", "cars-package"].map((pkg) => {
                const count = appointments.filter((a) => a.package?.toLowerCase().replace(/\s/g, "-") === pkg).length;
                return (
                  <div key={pkg} className="flex items-center gap-4 mb-3">
                    <span className="text-white/50 text-xs uppercase tracking-[2px] w-28 capitalize">{pkg.replace("-", " ")}</span>
                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden"><div className="h-full rounded-full bg-gold/40" style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }} /></div>
                    <span className="text-gold text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === SETTINGS TAB === */}
        {tab === "settings" && (
          <div className="max-w-lg space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-white/70 text-sm font-medium mb-4 flex items-center gap-2"><Bell size={14} className="text-gold" /> Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={exportCSV} className="btn-outline w-full py-3 flex items-center justify-center gap-2 text-xs"><Download size={14} /> Export All Bookings as CSV</button>
                <button onClick={() => { if (confirm("Mark ALL pending as confirmed?")) { appointments.filter((a) => a.status === "pending").forEach((a) => updateStatus(a.id, "confirmed")); } }} className="btn-outline w-full py-3 flex items-center justify-center gap-2 text-xs"><CheckCircle size={14} /> Confirm All Pending</button>
                <button onClick={fetchAppointments} className="btn-outline w-full py-3 flex items-center justify-center gap-2 text-xs"><RefreshCw size={14} /> Refresh Data</button>
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="text-white/70 text-sm font-medium mb-4 flex items-center gap-2"><Settings size={14} className="text-gold" /> Info</h3>
              <div className="space-y-2 text-sm text-white/40">
                <p>Admin Code: <span className="text-gold">Optic2026</span></p>
                <p>Total Records: <span className="text-white/60">{appointments.length}</span></p>
                <p>Storage: <span className="text-white/60">In-memory (resets on deploy)</span></p>
                <p className="text-white/20 text-xs mt-4">To persist data permanently, connect a database like Supabase or Firebase.</p>
              </div>
            </div>
          </div>
        )}

        {/* === APPOINTMENTS TAB === */}
        {tab === "appointments" && (
          <div className="space-y-4">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Total", count: stats.total, color: "text-white/80" },
                { label: "Pending", count: stats.pending, color: "text-yellow-400" },
                { label: "Confirmed", count: stats.confirmed, color: "text-green-400" },
                { label: "Completed", count: stats.completed, color: "text-gold" },
                { label: "Cancelled", count: stats.cancelled, color: "text-red-400" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-lg p-3 text-center cursor-pointer hover:border-gold/20 transition-all" onClick={() => setFilter(s.label.toLowerCase() === "total" ? "all" : s.label.toLowerCase())}>
                  <p className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>{s.count}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-[2px]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Search + Filters + Actions */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone..." className="input-dark pl-9 py-2.5 text-sm" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-dark py-2.5 text-sm w-auto">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select value={`${sortBy}-${sortDir}`} onChange={(e) => { const [s, d] = e.target.value.split("-"); setSortBy(s as typeof sortBy); setSortDir(d as typeof sortDir); }} className="input-dark py-2.5 text-sm w-auto">
                  <option value="created-desc">Newest First</option>
                  <option value="created-asc">Oldest First</option>
                  <option value="date-asc">Date (Soonest)</option>
                  <option value="date-desc">Date (Latest)</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                </select>
                <button onClick={exportCSV} className="glass px-3 py-2.5 rounded text-gold/60 hover:text-gold transition-all" title="Export CSV"><Download size={16} /></button>
              </div>
            </div>

            {/* Appointments List */}
            {filtered.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center"><p className="text-white/30">No appointments found.</p></div>
            ) : (
              <div className="space-y-3">
                {filtered.map((apt) => (
                  <div key={apt.id} className={`glass rounded-xl overflow-hidden transition-all duration-300 ${expandedId === apt.id ? "border-gold/25" : "hover:border-gold/10"}`}>
                    {/* Collapsed Row */}
                    <div className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${apt.status === "pending" ? "bg-yellow-400" : apt.status === "confirmed" ? "bg-green-400" : apt.status === "completed" ? "bg-gold" : "bg-red-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-medium text-sm truncate">{apt.name}</span>
                          <span className={`text-[10px] uppercase tracking-[2px] px-2 py-0.5 rounded-full border ${statusColors[apt.status] || "text-white/40"}`}>{apt.status}</span>
                        </div>
                        <p className="text-white/30 text-xs mt-0.5">{apt.date} &middot; <span className="capitalize">{apt.package?.replace(/-/g, " ")}</span></p>
                      </div>
                      {expandedId === apt.id ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                    </div>

                    {/* Expanded Details */}
                    {expandedId === apt.id && (
                      <div className="px-4 pb-4 border-t border-white/5 pt-4">
                        {editingId === apt.id ? (
                          // Edit Mode
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Name</label><input className="input-dark text-sm" value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></div>
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Email</label><input className="input-dark text-sm" value={editData.email || ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /></div>
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Phone</label><input className="input-dark text-sm" value={editData.phone || ""} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} /></div>
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Package</label>
                                <select className="input-dark text-sm" value={editData.package || ""} onChange={(e) => setEditData({ ...editData, package: e.target.value })}>
                                  <option value="standard">Standard</option><option value="deluxe">Deluxe</option><option value="premium">Premium</option><option value="cars-package">Cars Package</option>
                                </select>
                              </div>
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Date</label><input type="date" className="input-dark text-sm" value={editData.date || ""} onChange={(e) => setEditData({ ...editData, date: e.target.value })} /></div>
                              <div><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Time</label><input type="time" className="input-dark text-sm" value={editData.time || ""} onChange={(e) => setEditData({ ...editData, time: e.target.value })} /></div>
                              <div className="md:col-span-2"><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Location</label><input className="input-dark text-sm" value={editData.location || ""} onChange={(e) => setEditData({ ...editData, location: e.target.value })} /></div>
                              <div className="md:col-span-2"><label className="text-[10px] text-gold uppercase tracking-[2px] block mb-1">Notes</label><textarea className="input-dark text-sm resize-none" rows={3} value={editData.notes || ""} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} /></div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={saveEdit} className="btn-gold py-2 px-4 text-xs flex items-center gap-1"><Save size={12} /> Save</button>
                              <button onClick={() => { setEditingId(null); setEditData({}); }} className="btn-outline py-2 px-4 text-xs flex items-center gap-1"><X size={12} /> Cancel</button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                              <div className="flex items-center gap-2 text-white/50"><Mail size={13} className="text-gold/50 shrink-0" /> <span className="truncate">{apt.email}</span></div>
                              <div className="flex items-center gap-2 text-white/50"><Phone size={13} className="text-gold/50 shrink-0" /> {apt.phone}</div>
                              <div className="flex items-center gap-2 text-white/50"><Calendar size={13} className="text-gold/50 shrink-0" /> {apt.date} at {apt.time}</div>
                              <div className="flex items-center gap-2 text-white/50"><User size={13} className="text-gold/50 shrink-0" /> <span className="capitalize">{apt.package?.replace(/-/g, " ")}</span></div>
                              {apt.vehicle && <div className="flex items-center gap-2 text-white/50"><Car size={13} className="text-gold/50 shrink-0" /> <span className="capitalize">{apt.vehicle.replace(/-/g, " ")}</span></div>}
                              {apt.location && <div className="flex items-center gap-2 text-white/50"><MapPin size={13} className="text-gold/50 shrink-0" /> {apt.location}</div>}
                            </div>
                            {apt.notes && (
                              <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <p className="text-gold/50 text-[10px] uppercase tracking-[2px] mb-1 flex items-center gap-1"><FileText size={10} /> Client Notes</p>
                                <p className="text-white/50 text-sm">{apt.notes}</p>
                              </div>
                            )}
                            <p className="text-white/20 text-xs mb-4">Booked: {new Date(apt.createdAt).toLocaleString()}</p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => updateStatus(apt.id, "confirmed")} className="flex items-center gap-1.5 px-3 py-1.5 rounded glass text-green-400/70 hover:text-green-400 hover:bg-green-400/10 text-xs transition-all"><CheckCircle size={13} /> Confirm</button>
                              <button onClick={() => updateStatus(apt.id, "completed")} className="flex items-center gap-1.5 px-3 py-1.5 rounded glass text-gold/70 hover:text-gold hover:bg-gold/10 text-xs transition-all"><Clock size={13} /> Complete</button>
                              <button onClick={() => updateStatus(apt.id, "cancelled")} className="flex items-center gap-1.5 px-3 py-1.5 rounded glass text-red-400/70 hover:text-red-400 hover:bg-red-400/10 text-xs transition-all"><XCircle size={13} /> Cancel</button>
                              <button onClick={() => startEdit(apt)} className="flex items-center gap-1.5 px-3 py-1.5 rounded glass text-blue-400/70 hover:text-blue-400 hover:bg-blue-400/10 text-xs transition-all"><Edit3 size={13} /> Edit</button>
                              <button onClick={() => deleteAppointment(apt.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded glass text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all ml-auto"><Trash2 size={13} /> Delete</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
