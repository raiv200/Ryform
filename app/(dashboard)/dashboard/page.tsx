import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import FormItem from "@/components/form-item";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GenerateFormId from "../generate-form-id";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage Forms.">
        <GenerateFormId />
      </DashboardHeader>
      <div className="px-2">
        <div className="flex flex-col space-y-2 ">
          <FormItem id="001" title="Hackathon Winners" createdAt={new Date()} />
          <FormItem
            id="002"
            title="Product Feedback Form"
            createdAt={new Date()}
          />
          <FormItem
            id="003"
            title="Course Feedback form"
            createdAt={new Date()}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
