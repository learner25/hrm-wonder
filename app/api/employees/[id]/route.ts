import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }>}) {
  const emp = await prisma.employee.findUnique({
    where: { id: Number((await params).id) },
    include: { department: true, attendance: true, leaves: true },
  });
  return NextResponse.json(emp);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const data = await req.json();
  const updated = await prisma.employee.update({
    where: { id: Number((await params).id) },
    data,
  });
  return NextResponse.json(updated);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;  
  const data = await req.json();
  const updated = await prisma.employee.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(updated);
}



export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await prisma.employee.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Deleted successfully" });
}
