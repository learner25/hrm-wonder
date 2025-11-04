"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leaves").then((r) => r.json()).then(setLeaves);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/leaves/${id}`, { method: "DELETE" });
    setLeaves((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Leaves</h1>
        <Link href="/leaves/(.)create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</button>
        </Link>
      </div>

      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-gray-800">Employee</th>
            <th className="p-3 text-left  text-gray-800">Reason</th>
            <th className="p-3 text-left  text-gray-800">Duration</th>
            <th className="p-3 text-left  text-gray-800">Status</th>
            <th className="p-3 text-left  text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{l.employee?.name}</td>
              <td className="p-3">{l.reason}</td>
              <td className="p-3">
                {new Date(l.startDate).toLocaleDateString()} →{" "}
                {new Date(l.endDate).toLocaleDateString()}
              </td>
              <td className="p-3">{l.status}</td>
              <td className="p-3 flex gap-2">
                <Link href={`/leaves/(.)update/${l.id}`}>
                  <button className="text-blue-600 underline">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(l.id)}
                  className="text-red-600 underline"
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
