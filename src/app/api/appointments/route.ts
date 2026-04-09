import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_REPO = process.env.GITHUB_REPO || "";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";
const DATA_PATH = "data/appointments.json";

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

async function sendDiscordNotification(apt: Appointment) {
  if (!DISCORD_WEBHOOK) return;
  try {
    const pkgPrices: Record<string, number> = { standard: 100, deluxe: 120, premium: 150, "cars-package": 200 };
    const price = pkgPrices[apt.package?.toLowerCase()] || 0;
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Optic Specs Bookings",
        embeds: [{
          title: "\ud83c\udfaf New Booking Received!",
          color: 0xd4a94c,
          fields: [
            { name: "\ud83d\udc64 Client", value: apt.name || "N/A", inline: true },
            { name: "\ud83d\udce7 Email", value: apt.email || "N/A", inline: true },
            { name: "\ud83d\udcf1 Phone", value: apt.phone || "N/A", inline: true },
            { name: "\ud83d\udce6 Package", value: `${(apt.package || "N/A").replace(/-/g, " ").toUpperCase()} ($${price})`, inline: true },
            { name: "\ud83d\udcc5 Date", value: apt.date || "N/A", inline: true },
            { name: "\u23f0 Time", value: apt.time || "N/A", inline: true },
            { name: "\ud83d\udccd Location", value: apt.location || "Not specified", inline: false },
            ...(apt.vehicle ? [{ name: "\ud83d\ude97 Vehicle", value: apt.vehicle.replace(/-/g, " "), inline: false }] : []),
            ...(apt.notes ? [{ name: "\ud83d\udcdd Notes", value: apt.notes, inline: false }] : []),
          ],
          footer: { text: "Optic Specs \u2022 Go to /admin to manage" },
          timestamp: new Date().toISOString(),
        }],
      }),
    });
  } catch (err) {
    console.error("Discord notification failed:", err);
  }
}

export async function GET() {
  const { appointments } = await readFromGitHub();
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
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
    sendDiscordNotification(newAppointment);
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
