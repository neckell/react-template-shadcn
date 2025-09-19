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
          sidebarOpen ? "ml-64" : "ml-16"
        )}>
          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
