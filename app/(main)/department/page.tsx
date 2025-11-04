"use client";

import { useEffect, useState, useOptimistic } from "react";
import Link from "next/link";

type Department = {
  id: number;
  name: string;
};

export default function DepartmentsPage() {
  const [initialDepartments, setInitialDepartments] = useState<Department[]>([]);
  const [departments, updateDepartment] = useOptimistic<Department[], Department>(
    initialDepartments,
    (prev, updated) => prev.map((d) => (d.id === updated.id ? updated : d))
  );

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/department");
      const data = await res.json();
      setInitialDepartments(data);
    })();
  }, []);

  async function handleDelete(id: number) {
    await fetch(`/api/department/${id}`, { method: "DELETE" });
    setInitialDepartments((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get("name") as string;
          const res = await fetch("/api/department", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          const newDept = await res.json();
          setInitialDepartments((prev) => [...prev, newDept]);
          e.currentTarget.reset();
        }}
        className="flex gap-3 mb-6"
      >
        <input
          name="name"
          placeholder="New department name"
          className="flex-grow border rounded p-2"
          required
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <table className="w-full border border-gray-200 rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3">{d.id}</td>
              <td className="p-3">{d.name}</td>
              <td className="p-3 flex gap-3">
                <Link
                  href={`/department/(.)update/${d.id}`}
                  state={{ onUpdate: updateDepartment }}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
