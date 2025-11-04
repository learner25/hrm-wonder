import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
      const id = (await params).id;  
    const leave = await prisma.leave.findUnique({
    where: { id: parseInt(id) },
    include: { employee: true },
  });
  return NextResponse.json(leave);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
   const id = (await params).id;  
  const data = await req.json();
  const leave = await prisma.leave.update({
    where: { id: parseInt(id) },
    data,
  });
  return NextResponse.json(leave);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;  
  await prisma.leave.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
