import { prisma } from "@/app/lib/prisma";
import DepartmentForm from "../../DepartmentForm";

export default async function UpdateDepartmentModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id,10);
  const department = await prisma.department.findUnique({
    where: { id: id },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <DepartmentForm department={department!} />
      </div>
    </div>
  );
}
