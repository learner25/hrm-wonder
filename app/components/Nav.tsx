"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/app/lib/actions/auth-action";

type Session = {
  user?: {
    name?: string;
    email?: string;
  };
};

export default function Nav({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Hide nav if not logged in
  if (!session) return null;

  const user = session.user;

  // ✅ Define navigation links here
  const links = [
    { name: "Employee", path: "/employees", idx: 1 },
    { name: "Leave", path: "/leaves", idx: 2 },
    { name: "Department", path: "/department", idx: 3 },
    { name: "Attendance", path: "/attendance", idx: 4 },
  ];

  // ✅ Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center px-8 py-3">
      {/* Left side: navigation links */}
      <div className="flex gap-8">
        {links.map((e) => {
          const isActive = pathname === e.path;
          return (
            <Link
              key={e.idx}
              href={e.path}
              className={`px-2 font-medium transition-colors ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {e.name}
            </Link>
          );
        })}
      </div>

      {/* Right side: user info + Sign Out button */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            {user.name || user.email}
          </span>
        )}
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
