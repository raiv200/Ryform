"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";


export default function FormPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { formId: string };
}) {
  const pathname = usePathname();

  return (
    <DashboardShell>
      <DashboardHeader heading="Form Name" text="Manage all your created forms">
        <Button disabled size="sm" className="mt-1">
          <Icons.edit strokeWidth={3} className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DashboardHeader>
      <div className="flex  py-2 space-x-1 w-full border ">
        <Link
          href={`/forms/${params.formId}`}
          className={` ${
            !pathname.includes("submissions") &&
            !pathname.includes("share-link")
              ? "text-primary"
              : ""
          } tab text-sm md:text-md`}
        >
          Summary
        </Link>
        <Link
          href={`/forms/${params.formId}/submissions`}
          className={` ${
            pathname.includes("submissions") ? "text-primary" : ""
          } tab text-sm md:text-md`}
        >
          Submissions
        </Link>
        <Link
          href={`/forms/${params.formId}/share-link`}
          className={` ${
            pathname.includes("share-link") ? "text-primary" : ""
          } tab text-sm md:text-md`}
        >
          Share Link
        </Link>
      </div>
      <main className="relative flex items-start px-1 w-full flex-1 border flex-col h-full overflow-auto">
        {children}
      </main>
    </DashboardShell>
  );
}
