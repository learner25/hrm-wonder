import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type props = { 
    params: Promise<{ id: string }> 
};

export async function GET(req: Request, { params }:props ) {
  const attendance = await prisma.attendance.findUnique({
    where: { id: parseInt((await params).id) },
    include: { employee: true },
  });
  return NextResponse.json(attendance);
}

export async function PATCH(req: Request, { params }: props) {
  const data = await req.json();
  const updated = await prisma.attendance.update({
    where: { id: parseInt( (await params).id) },
    data: {
      date: new Date(data.date),
      status: data.status,
      employeeId: data.employeeId,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }:props) {
  await prisma.attendance.delete({
    where: { id: parseInt((await params).id) },
  });
  return NextResponse.json({ success: true });
}
