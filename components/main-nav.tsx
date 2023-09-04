"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

type MainNavItem = {
  title: string
  href: string
  disabled?: boolean
}

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

const mainNavItems: MainNavItem[] = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
]

export function MainNav({ children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className=" hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="  hidden font-bold sm:inline-block">
          TallyForms
        </span>
      </Link>
      {mainNavItems?.length ? (
        <nav className="hidden gap-6 md:flex">
          {mainNavItems?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <div className="flex items-center space-x-3 justify-center">
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        </button>
        {showMobileMenu && mainNavItems && (
          <MobileNav items={mainNavItems}>{children}</MobileNav>
        )}
        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <span className="font-bold"> TallyForms</span>
        </Link>
      </div>
    </div>
  )
}
