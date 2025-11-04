import { prisma } from "@/app/lib/prisma";
import DepartmentForm from "../DepartmentForm";

type props = {
  params: Promise<{ id: string }>;
}

export default async function UpdateDepartmentModal({
  params,
}: props) {
  const id = (await params).id;
  const department = await prisma.department.findUnique({
    where: { id: parseInt(id) },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <DepartmentForm department={department!} />
      </div>
    </div>
  );
}
