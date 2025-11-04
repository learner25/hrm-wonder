import { prisma } from "@/app/lib/prisma";
import EmployeesClient from "./EmployeesClient";
 
export default async function EmployeesWrapper() {
  const employees = await prisma.employee.findMany({
    include: { department: true },
    orderBy: { id: "asc" },
  });

  return <EmployeesClient initialEmployees={employees} />;
}
