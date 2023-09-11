import FormItemSkeleton from "@/components/form-item-skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <Button>
           <Icons.add  className="mr-2 h-4 w-4" />
           New Form
        </Button>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
      <FormItemSkeleton />
      <FormItemSkeleton />
      <FormItemSkeleton />
      <FormItemSkeleton />
      </div>
    </DashboardShell>
  )
}