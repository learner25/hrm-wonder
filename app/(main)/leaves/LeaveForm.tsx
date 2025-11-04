"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
};

type LeaveInput = {
  reason: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
  status: string;
  employeeId: number;
};

type LeaveFormProps = {
  leave?: any;
  employees: { id: number; name: string }[];
};

export default function LeaveForm({ leave, employees }: LeaveFormProps) {
  const router = useRouter();

  const toDateInputString = (d: any) => {
    if (!d) return "";
    try {
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return "";
      return date.toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  const [form, setForm] = useState<LeaveInput>({
    reason: leave?.reason || "",
    startDate: toDateInputString(leave?.startDate) || "",
    endDate: toDateInputString(leave?.endDate) || "",
    status: leave?.status || "Pending",
    employeeId: typeof leave?.employeeId === "number" 
      ? leave.employeeId 
      : (leave?.employee?.id ?? employees[0]?.id ?? 1),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: name === "employeeId" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.reason || !form.startDate || !form.endDate) {
      setError("Please fill reason, start date and end date.");
      return;
    }

    const payload = {
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
    };

    setLoading(true);
    try {
      const method = leave ? "PATCH" : "POST";
      const url = leave ? `/api/leaves/${leave.id}` : "/api/leaves";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save leave");
      }

      router.back();
      router.refresh();
    } catch (err: any) {
      console.error("Leave save error:", err);
      setError(err?.message || "Failed to save leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-gray-800">
      {error && <div className="text-sm text-red-600 p-2 bg-red-50 rounded">{error}</div>}

      <label className="block">
        <span className="text-sm font-medium">Reason</span>
        <input
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason for leave"
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Start date</span>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">End date</span>
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Status</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </label>

     <label className="block">
  <span className="text-sm font-medium">Employee</span>
  <select
    name="employeeId"
    value={form.employeeId}
    onChange={handleChange}
    className="w-full border p-2 rounded mt-1"
  >
    {employees.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.name}
      </option>
    ))}
  </select>
</label>


      <div className="flex gap-3 justify-end mt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded"
          disabled={loading}
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
