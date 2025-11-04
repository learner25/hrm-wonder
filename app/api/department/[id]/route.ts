import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET one department
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await params).id, 10);
    const department = await prisma.department.findUnique({
      where: { id },
      include: { employees: true },
    });

    if (!department) return NextResponse.json({ error: "Department not found" }, { status: 404 });

    return NextResponse.json(department);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH update department
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = parseInt((await params).id, 10);
    const data = await req.json();

    const department = await prisma.department.update({
      where: { id },
      data,
    });

    return NextResponse.json(department);
  } catch (error: any) {
    console.error("Error updating department:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE department
export async function DELETE(req: Request, { params }: { params:  Promise<{id: string}>  }) {
  try {
    const id = parseInt((await params).id, 10);
    await prisma.department.delete({ where: { id } });
    return NextResponse.json({ message: "Department deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting department:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
