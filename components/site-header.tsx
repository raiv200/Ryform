"use client"

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export function SiteHeader() {


  return (
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
  );
}
