import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import FormItemSkeleton from "@/components/form-item-skeleton";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage forms.">
        <Button size="sm" className="mt-1 hidden md:flex">
          <Icons.add strokeWidth={3} className=" mr-2 h-4 w-4" />
          New Form
        </Button>
        <Button size="icon" className="mt-1 flex md:hidden">
          <Icons.add strokeWidth={3} className=" h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <FormItemSkeleton />
        <FormItemSkeleton />
        <FormItemSkeleton />
        <FormItemSkeleton />
      </div>
    </DashboardShell>
  );
}
