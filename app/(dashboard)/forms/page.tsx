import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import {cookies} from 'next/headers';
import React from 'react'

export const metadata = {
    title: "Forms",
  }

export default async function FormsPage() {

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Your Forms"
        text="Manage all your created forms"
      />
      <div className="flex flex-col px-2">
        Show All Forms Page
      </div>
    </DashboardShell>
  )
}
