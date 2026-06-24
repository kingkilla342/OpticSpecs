import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_REPO = process.env.GITHUB_REPO || "";
const WEB3FORMS_KEY = "9d040882-512d-4d6d-865e-5cb8d5ed471e";
const DATA_PATH = "data/appointments.json";

// Rate limiting: max 3 submissions per IP per 15 minutes
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  rateLimitMap.set(ip, [...recent, now]);
  return true;
}

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
  [key: string]: unknown;
}

async function readFromGitHub(): Promise<{ appointments: Appointment[]; sha: string }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );
    if (res.status === 404) return { appointments: [], sha: "" };
    if (!res.ok) { console.error("GitHub read error:", res.status); return { appointments: [], sha: "" }; }
    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return { appointments: JSON.parse(content), sha: data.sha };
  } catch (err) {
    console.error("GitHub read failed:", err);
    return { appointments: [], sha: "" };
  }
}

async function writeToGitHub(appointments: Appointment[], sha: string): Promise<boolean> {
  try {
    const content = Buffer.from(JSON.stringify(appointments, null, 2)).toString("base64");
    const body: Record<string, string> = {
      message: `Update appointments - ${new Date().toISOString()}`,
      content,
    };
    if (sha) body.sha = sha;
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) { const err = await res.text(); console.error("GitHub write error:", res.status, err); return false; }
    return true;
  } catch (err) {
    console.error("GitHub write failed:", err);
    return false;
  }
}

async function sendWeb3FormsNotification(apt: Appointment) {
  try {
    const pkgPrices: Record<string, number> = { standard: 100, deluxe: 150, premium: 200, "cars-package": 400 };
    const price = pkgPrices[apt.package?.toLowerCase()] || 0;
    const pkg = (apt.package || "").replace(/-/g, " ").toUpperCase();

    const deposit = Math.round(price * 0.3);
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `New Booking: ${apt.name} - ${pkg}`,
      from_name: "Optic Specs Bookings",
      name: apt.name,
      email: apt.email,
      phone: apt.phone,
      package: `${pkg} ($${price})`,
      deposit_required: `$${deposit} (30%)`,
      balance_due: `$${price - deposit} (on shoot day)`,
      date: apt.date,
      time: apt.time,
      location: apt.location || "Not specified",
      message: `New booking from ${apt.name} for ${pkg} on ${apt.date} at ${apt.time}. Deposit required: $${deposit}.`,
    };

    if (apt.vehicle) payload.vehicle = apt.vehicle.replace(/-/g, " ");
    if (apt.notes) payload.notes = apt.notes;

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error("Web3Forms error:", res.status, JSON.stringify(data));
    } else {
      console.log("Web3Forms notification sent:", data.message);
    }
  } catch (err) {
    console.error("Web3Forms notification failed:", err);
  }
}

export async function GET() {
  const { appointments } = await readFromGitHub();
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before submitting again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { appointments, sha } = await readFromGitHub();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      name: body.name || "", email: body.email || "", phone: body.phone || "",
      date: body.date || "", time: body.time || "", package: body.package || "",
      vehicle: body.vehicle || "", location: body.location || "",
      notes: body.notes || "", status: "pending", createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    const saved = await writeToGitHub(appointments, sha);
    if (!saved) return NextResponse.json({ error: "Failed to save to GitHub" }, { status: 500 });
    await sendWeb3FormsNotification(newAppointment);
    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { appointments, sha } = await readFromGitHub();
    const idx = appointments.findIndex((a) => a.id === body.id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const { id, ...updates } = body;
    appointments[idx] = { ...appointments[idx], ...updates };
    const saved = await writeToGitHub(appointments, sha);
    if (!saved) return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { appointments, sha } = await readFromGitHub();
    const filtered = appointments.filter((a) => a.id !== id);
    const saved = await writeToGitHub(filtered, sha);
    if (!saved) return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
