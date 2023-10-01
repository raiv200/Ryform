"use client";

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col space-y-2 ">
     <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />

            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Login
              <Icons.login
                strokeWidth={3}
                className=" h-[15px] w-[15px] ml-2 "
              />
            </Link>
          </nav>
        </div>
      </div>
    </header>
      {/* <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] border"> */}
      <main className="relative flex items-start px-8  w-full flex-1 max-w-5xl mx-auto flex-col py-10 h-full ">
        <div className=" flex flex-col space-y-6  w-full max-w-4xl mx-auto py-4 mt-4 overflow-y-auto h-[600px]">
          <h2 className="font-bold text-primary text-3xl text-center md:text-7xl text-rose-600">
            Pricing Page
          </h2>
          <p className="font-sembold text-primary text-3xl text-center md:text-5xl text-rose-400" >Coming Soon!</p>
        </div>
      </main>
      {/* </div> */}
    </div>
  );
}
