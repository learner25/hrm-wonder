import LeaveForm from "@/app/(main)/leaves/LeaveForm";

export default function CreateLeaveModal() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add New Leave</h2>
        <LeaveForm />
      </div>
    </div>
  );
}
