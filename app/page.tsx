import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { headers } from "next/headers";
import HomePageClient from "./HomePageClient";

export default async function Page() {
   const session = await auth.api.getSession({
    headers: await headers(),
  });

  const posts = await prisma.post.findMany({});

  return <HomePageClient session={session} initialPosts={posts} />;
}