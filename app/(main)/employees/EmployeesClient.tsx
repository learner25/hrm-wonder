"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
  department: { id: number; name: string };
};

export default function EmployeesPage({
  initialEmployees,
}: {
  initialEmployees: Employee[];
}) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees || []);
  const router = useRouter();

  // Optional: revalidate automatically when returning from modal
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees", { cache: "no-store" });
      const data = await res.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Employees</h1>

      <table className="w-full border border-gray-200 rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.department.name}</td>
                <td className="p-3">
                  <Link href={`/employees/(.)update/${e.id}`}>
                    <button className="text-blue-600 underline">Edit</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
