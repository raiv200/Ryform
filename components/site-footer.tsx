import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-center gap-4  md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <div className=" text-sm text-gray-500 ">
            Coyright &copy; {new Date().getFullYear()}
            <span className="dark:text-gray-100 text-gray-900 font-semibold text-sm px-2">
              {" "}
              TallyForms{" "}
            </span>{" "}
            All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
