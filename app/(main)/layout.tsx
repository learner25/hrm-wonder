import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Nav from "@/app/components/Nav";
import Spinner from "@/app/components/Spinner";
import { Suspense } from "react";

import { redirect } from "next/navigation";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Employee Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  const currentUrl = (await headers()).get("x-url") || "";
  const isLoginPage = currentUrl.includes("/login");

  // ✅ If not logged in and not on login page → redirect
  if (!session && !isLoginPage) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
         
        {session && <Nav session={session} />}
        <main className="flex-1 p-6">
          <Suspense fallback={<Spinner />}>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
