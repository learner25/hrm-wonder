import { prisma } from "@/app/lib/prisma";

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>; // Next 16 App Router
}) {
  const { id } = await params;

  // Fetch employee
  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
    include: { department: true, attendance: true, leaves: true },
  });

  if (!employee) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Employee not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{employee.name}</h1>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Department:</strong> {employee.department.name}
      </p>
      <p>
        <strong>Salary:</strong> ${employee.salary}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Attendance</h2>
        <ul className="list-disc list-inside">
          {employee.attendance.map((att) => (
            <li key={att.id}>
              {att.date.toISOString().split("T")[0]} — {att.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Leaves</h2>
        <ul className="list-disc list-inside">
          {employee.leaves.map((leave) => (
            <li key={leave.id}>
              {leave.startDate.toISOString().split("T")[0]} to{" "}
              {leave.endDate.toISOString().split("T")[0]} — {leave.status} ({leave.reason})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
