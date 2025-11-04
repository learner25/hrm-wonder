import LeaveForm from "../../LeaveForm";
import { prisma } from "@/app/lib/prisma";

export default async function UpdateLeaveModal({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id);

  // fetch the leave
  const leave = await prisma.leave.findUnique({
    where: { id },
    include: { employee: true }, // optional, if you want the employee info
  });

  // fetch all employees for the dropdown
  const employees = await prisma.employee.findMany();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Edit Leave</h2>
        <LeaveForm leave={leave} employees={employees} />
      </div>
    </div>
  );
}
