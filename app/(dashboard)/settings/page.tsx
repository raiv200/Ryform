import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import React from 'react'

export const metadata = {
    title: "Settings",
  }

const SettingsPage = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="flex flex-col px-2">
        Setting Page
      </div>
    </DashboardShell>
  )
}

export default SettingsPage