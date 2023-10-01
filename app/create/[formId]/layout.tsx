import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreateNewFormLayout({ children }) {

  
  return (
    <div className="flex min-h-screen flex-col space-y-2 ">
      <header className="sticky top-0 z-40 border-b bg-background h-[70px]">
        <div className="container flex h-16 items-center justify-between py-4">
          {/* <MainNav  /> */}
          <Link href="/" className=" hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="  hidden font-bold sm:inline-block">Ryform</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      {/* <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] border"> */}
      <main className="relative flex items-start px-8  w-full flex-1 max-w-5xl mx-auto flex-col py-10 h-full ">
        <div className=" flex flex-col  w-full max-w-4xl mx-auto py-4 mt-4 overflow-y-auto h-[600px]">
          {children}
        </div>
      </main>
      {/* </div> */}
    </div>
  );
}
