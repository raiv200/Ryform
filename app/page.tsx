import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import {cookies} from "next/headers"

export default async function IndexPage() {

  const supabase = createServerComponentClient({cookies}); 
  const {data: {session}} = await supabase.auth.getSession();
   console.log(session)

    if(session?.user){
      redirect('/dashboard');
    }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <section className=" flex-1 space-y-6 pb-8 pt-24 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
            The simplest way to create forms
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create forms for all purposes in seconds. Without knowing how to
            code, and for free!
          </p>
          <div className="flex gap-4">
            <Link href="/create" target="_blank" rel="noreferrer">
              <Button variant={"default"} size="lg">
                Create Forms
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
