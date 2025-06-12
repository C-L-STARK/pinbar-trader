import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const NavigationLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "bg-transparent hover:bg-accent hover:text-accent-foreground",
      "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
      className
    )}
    {...props}
  >
    {children}
  </Link>
))
NavigationLink.displayName = "NavigationLink"

export { NavigationLink }