import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const departments = await prisma.department.findMany({
    include: { employees: true },
  });
  return NextResponse.json(departments);
}

export async function POST(req: Request) {
  const data = await req.json();
  const department = await prisma.department.create({ data });
  return NextResponse.json(department);
}
