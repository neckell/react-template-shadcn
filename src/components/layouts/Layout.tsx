import { Outlet } from '@tanstack/react-router'
import { useThemeInitializer } from '../../hooks/useThemeInitializer'
import { cn } from '../../lib/utils'
import { useAppStore } from '../../store/useAppStore'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen)

  useThemeInitializer()

  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          // Desktop: adjust margin based on sidebar state
          // Mobile: no margin (sidebar is overlay)
          "md:ml-16 md:transition-[margin]",
          sidebarOpen && "md:ml-64"
        )}>
          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
