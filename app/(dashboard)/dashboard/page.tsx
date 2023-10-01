import GenerateFormId from "../generate-form-id";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import FormItem from "@/components/form-item";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createCipheriv } from "crypto";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data: formSchema } = await supabase
    .from("formSchema")
    .select()
    .eq("user_id", userId);

  console.log("Form Schema --> ", formSchema);

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage Forms.">
        {/* <GenerateFormId /> */}
        <Link href={`/create/${nanoid(10)}`}>
          <Button size="sm" className="mt-1 hidden md:flex">
            <Icons.add strokeWidth={3} className=" mr-2 h-4 w-4" />
            New Form
          </Button>
          <Button size="icon" className="mt-1 flex md:hidden">
            <Icons.add strokeWidth={3} className=" h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </Link>
      </DashboardHeader>
      <div className="px-2">
        <ScrollArea className="h-[565px]">
          <div className="flex flex-col space-y-2 pb-8 md:pr-6 md:pb-2">
            {formSchema?.map((form) => (
              <FormItem
                formId={form.formId}
                title={form.formTitle}
                createdAt={new Date(form.created_at)}
              />
            ))}

            {formSchema?.length === 0 && (
              <div className="flex flex-col space-y-4 h-[250px] items-center justify-center   border-2 border-accent border-dashed">
                  <Icons.form strokeWidth={2} className=" h-10 w-10 md:h-20 md:w-20" />
                 <p className="text-xl font-bold md:text-2xl">No forms Created Yet!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </DashboardShell>
  );
}
