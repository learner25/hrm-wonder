"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  name: string;
};

type AttendanceInput = {
  employeeId: number;
  date: string;
  status: string;
};

type Attendance = {
  id: number;
  employeeId: number;
  date: string | Date;
  status: string;
  employee?: Employee;
};

export default function AttendanceForm({ attendance, employees = [] }: { attendance?: Attendance; employees?: Employee[] }) {
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

  const [form, setForm] = useState<AttendanceInput>({
    employeeId: attendance?.employeeId ?? (employees[0]?.id ?? 1),
    date: toDateInputString(attendance?.date) || "",
    status: attendance?.status || "Present",
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

    if (!form.employeeId || !form.date || !form.status) {
      setError("Please fill employee, date and status.");
      return;
    }

    setLoading(true);

    const payload = {
      employeeId: form.employeeId,
      date: new Date(form.date).toISOString(),
      status: form.status,
    };

    try {
      const method = attendance ? "PATCH" : "POST";
      const url = attendance ? `/api/attendance/${attendance.id}` : "/api/attendance";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save attendance");
      }

      router.push("/attendance");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
      {error && <div className="text-sm text-red-600 p-2 bg-red-50 rounded">{error}</div>}

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

      <label className="block">
        <span className="text-sm font-medium">Date</span>
        <input
          name="date"
          type="date"
          value={form.date}
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
          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>
        </select>
      </label>

      <div className="flex justify-end gap-3">
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
