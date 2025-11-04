import { prisma } from "@/app/lib/prisma";
import UpdateEmployeeForm from "./form";

 

export default async function UpdateEmployeeModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;  

  const employee = await prisma.employee.findUnique({
    where: { id:parseInt(id,10) },
    include: { department: true },
  });

  if (!employee) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Employee not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <UpdateEmployeeForm employee={employee} />
      </div>
    </div>
  );
}
