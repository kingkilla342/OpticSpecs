import { NextRequest, NextResponse } from "next/server";

const appointments: Record<string, unknown>[] = [];

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newAppointment = { id: Date.now().toString(), ...body, status: "pending", createdAt: new Date().toISOString() };
    appointments.push(newAppointment);
    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const idx = appointments.findIndex((a) => a.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    appointments[idx].status = status;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const idx = appointments.findIndex((a) => a.id === id);
    if (idx !== -1) appointments.splice(idx, 1);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
