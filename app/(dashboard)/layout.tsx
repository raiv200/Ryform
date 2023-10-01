import { notFound, redirect } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {cookies} from 'next/headers'
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  
   const supabase = createServerComponentClient({cookies}); 
   const {data: {session}} = await supabase.auth.getSession();

    console.log("Session --> ",session)

  //  console.log(session)
    if(!session?.user){
      redirect('/');
    }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between  py-4">
          <MainNav  />
          <div className="flex  items-center space-x-6">
           <ThemeToggle />
          <UserAccountNav session={session} />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-4 md:grid-cols-[200px_1fr] px-4">
        <aside className="relative hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden mb-6">
          {children}
        </main>
      </div>
    
    </div>
  )
}