import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function AttendancePage() {
  const attendance = await prisma.attendance.findMany({
    include: { employee: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

      <Link
        href="/attendance/(.)update/new"
        className="mb-4 inline-block px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Attendance
      </Link>

      <table className="w-full border border-gray-200 rounded">
        <thead className="bg-gray-400">
          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{a.employee?.name}</td>
              <td className="p-3">{new Date(a.date).toLocaleDateString()}</td>
              <td className="p-3">{a.status}</td>
              <td className="p-3">
                <Link
                  href={`/attendance/(.)update/${a.id}`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
