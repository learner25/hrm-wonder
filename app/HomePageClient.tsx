"use client";

import { useRouter } from "next/navigation";
import { signOut } from "./lib/actions/auth-action";
import Link from "next/link";
import { useState } from "react";

type Session = {
  user: {
    name: string;
    email: string;
  };
};

type Post = {
  id: number;               
  title: string;
  content: string | null;   
  createdAt?: Date;
  updatedAt?: Date;
};


export default function HomePageClient({
  session,
  initialPosts = [],
}: {
  session: Session | null;
  initialPosts: Post[];
}) {
  const router = useRouter();
  const [posts] = useState<Post[]>(initialPosts);

  // 🚫 No session → prompt login
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>
          Please{" "}
          <Link href="/login" className="text-green-500 underline">
            sign in
          </Link>{" "}
          to access blog.
        </p>
      </div>
    );
  }

  // ✅ Logged in view
  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Welcome, {session.user.name || "User"}
        </h2>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-4 overflow-y-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="mb-2 text-gray-700">{post.content}</p>
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
}