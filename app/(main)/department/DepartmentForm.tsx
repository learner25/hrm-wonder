"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Department = {
  id: number;
  name: string;
};

export default function DepartmentForm({ department }: { department: Department }) {
  const router = useRouter();
  const [name, setName] = useState(department.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/department/${department.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setLoading(false);
    router.back();
    router.refresh();
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-600">Edit Department</h2>
      <form onSubmit={handleSubmit} className="space-y-3  text-gray-700">
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name"
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
    </>
  );
}
