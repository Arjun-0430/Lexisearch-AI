import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const SIDEBAR_CONTEXT_ERROR =
  "useSidebar must be used within a SidebarProvider"

type SidebarContext = {
  collapsed: boolean
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error(SIDEBAR_CONTEXT_ERROR)
  }

  return context
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const isMobile = useIsMobile()

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleSidebar,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}