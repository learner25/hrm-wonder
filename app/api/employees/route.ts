import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const employees = await prisma.employee.findMany({
    include: { department: true, attendance: true, leaves: true },
  });
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newEmployee = await prisma.employee.create({ data });
  return NextResponse.json(newEmployee);
}
