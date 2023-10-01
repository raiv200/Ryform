"use client"

import { Icons } from "@/components/icons";
import ThankYou from "@/components/thank-you-page";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React from "react";

export default  function ThankYouPage() {
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
             <ThankYou />
        </div>
      </main>
   
    </div>
  );
}