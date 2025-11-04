"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
  department: { id: number; name: string };
};

export default function UpdateEmployeeForm({
  employee,
  onUpdate, // pass optimistic callback directly
}: {
  employee: Employee;
  onUpdate?: (e: Employee) => void;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: employee.name,
    email: employee.email,
    position: employee.position,
    salary: employee.salary.toString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = { ...form, salary: parseFloat(form.salary) };

    // Update DB
    await fetch(`/api/employees/${employee.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    // Optimistic update
    onUpdate?.({ ...employee, ...updatedData });

    setLoading(false);
    router.back();  
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-gray-700">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        className="w-full border p-2 rounded"
      />
      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        type="number"
        className="w-full border p-2 rounded"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
