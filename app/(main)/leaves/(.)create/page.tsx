import LeaveForm from "@/app/(main)/leaves/LeaveForm";
import { prisma } from "@/app/lib/prisma";

export default async function CreateLeaveModal() {
  const employees = await prisma.employee.findMany();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add New Leave</h2>
        <LeaveForm employees={employees} />
      </div>
    </div>
  );
}
