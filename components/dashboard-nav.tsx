"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type SidebarNavItem = {
  title: string
  href:string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons 
}

 const sideBarNavItems : SidebarNavItem[]  = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "post",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
]

export function DashboardNav() {
  const path = usePathname()

  if (!sideBarNavItems?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {sideBarNavItems.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}