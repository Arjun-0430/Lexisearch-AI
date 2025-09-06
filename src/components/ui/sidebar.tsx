
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { useSidebar } from "@/hooks/use-sidebar"

const sidebarVariants = cva(
  "z-40 flex h-full flex-col bg-background data-[collapsed=false]:w-56 data-[collapsed=true]:w-16 shrink-0",
  {
    variants: {
      side: {
        left: "left-0",
        right: "right-0",
      },
      collapsible: {
        true: "transition-all duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      side: "left",
      collapsible: false,
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const SidebarContext = React.createContext<SidebarProps | undefined>(undefined)

function useSidebarContext() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a Sidebar component"
    )
  }

  return context
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false)

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsible: collapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side, collapsible, ...props }, ref) => {
    const { collapsed, isMobile } = useSidebar()
    const isCollapsed = isMobile ? true : collapsible && collapsed

    return (
      <aside
        ref={ref}
        data-collapsed={isCollapsed}
        className={cn(
          isMobile && "hidden",
          sidebarVariants({ side, collapsible }),
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full flex-1 flex-col gap-4 overflow-y-auto py-4",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  const { isMobile, collapsed } = useSidebar()
  const isCollapsed = isMobile ? true : collapsed

  return (
    <ul
      ref={ref}
      data-collapsed={isCollapsed}
      className={cn(
        "flex flex-col gap-2 data-[collapsed=false]:px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps
  extends Omit<ButtonProps, "asChild">,
    React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: {
    children: React.ReactNode
    props?: Omit<
      React.ComponentPropsWithoutRef<typeof TooltipContent>,
      "children"
    >
  }
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, asChild = false, isActive, tooltip, ...props },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, collapsed } = useSidebar()
    const isCollapsed = isMobile ? true : collapsed

    const button = (
      <Button
        ref={forwardedRef}
        variant={isActive ? "secondary" : "ghost"}
        data-collapsed={isCollapsed}
        className={cn(
          "h-10 w-full justify-start data-[collapsed=true]:justify-center",
          className
        )}
        asChild
      >
        <Comp {...props} />
      </Button>
    )

    if (isCollapsed && tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" {...tooltip.props}>
              {tooltip.children}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-auto flex h-14 items-center border-t", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

export {
  SidebarProvider,
  useSidebarContext,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
}
