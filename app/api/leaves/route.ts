import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leaves = await prisma.leave.findMany({
    include: { employee: true },
  });
  return NextResponse.json(leaves);
}

export async function POST(req: Request) {
  const data = await req.json();
  const leave = await prisma.leave.create({ data });
  return NextResponse.json(leave);
}
