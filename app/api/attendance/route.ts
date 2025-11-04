import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const attendance = await prisma.attendance.findMany({
    include: { employee: true },
  });
  return NextResponse.json(attendance);
}

export async function POST(req: Request) {
  const data = await req.json();
  const record = await prisma.attendance.create({ data });
  return NextResponse.json(record);
}
