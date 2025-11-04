import AttendanceForm from "../../AttendanceForm";
import { prisma } from "@/app/lib/prisma";

export default async function UpdateAttendanceModal({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);

  // fetch attendance if editing
  const attendance = id ? await prisma.attendance.findUnique({
    where: { id },
    include: { employee: true },
  }) : null;

  // fetch all employees for dropdown
  const employees = await prisma.employee.findMany();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{attendance ? "Edit" : "Add"} Attendance</h2>
        <AttendanceForm attendance={attendance} employees={employees} />
      </div>
    </div>
  );
}
