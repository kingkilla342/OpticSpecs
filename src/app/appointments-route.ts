import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "appointments.json");

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]");
  }
}

export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDataFile();
    const body = await request.json();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const appointments = JSON.parse(data);

    const newAppointment = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2));

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureDataFile();
    const { id, status } = await request.json();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const appointments = JSON.parse(data);

    const idx = appointments.findIndex((a: { id: string }) => a.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    appointments[idx].status = status;
    await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureDataFile();
    const { id } = await request.json();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let appointments = JSON.parse(data);

    appointments = appointments.filter((a: { id: string }) => a.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
