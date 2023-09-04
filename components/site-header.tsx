import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="default">
              Login
              <Icons.login strokeWidth={3}  className=" h-[15px] w-[15px] ml-2 "  />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
