import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default async function FormForUserLayout({ children }) {

  return (
    <div className="flex min-h-screen flex-col space-y-2 ">
      <header className="sticky top-0 z-40 border-b bg-background h-[70px]">
        <div className="container flex h-16 items-center justify-between py-4">
       
          <Link href="/" className=" hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="  hidden font-bold sm:inline-block">Ryform</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
     
      <main className="relative flex items-start px-8  w-full flex-1 max-w-5xl mx-auto border flex-col py-2 h-full ">
        <div className=" flex flex-col  w-full max-w-4xl mx-auto py-4 mt-4 overflow-y-auto h-full">
          {children}
        </div>
      </main>
      
    </div>
  );
}
