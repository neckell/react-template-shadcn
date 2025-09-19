import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AppState {
  // Theme state
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  initializeTheme: () => void
  
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Loading states
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Sidebar state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  
  // Mobile sidebar state
  mobileSidebarOpen: boolean
  setMobileSidebarOpen: (open: boolean) => void
  toggleMobileSidebar: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: 'light',
        setTheme: (theme) => {
          console.log('Store: Setting theme to', theme)
          set({ theme })
          // Apply theme to HTML element
          document.documentElement.classList.toggle('dark', theme === 'dark')
          console.log('Store: HTML classes after setTheme:', document.documentElement.className)
        },
        initializeTheme: () => {
          const { theme } = get()
          // Apply theme to HTML element on initialization
          document.documentElement.classList.toggle('dark', theme === 'dark')
        },
        
        // User
        user: null,
        setUser: (user) => set({ user }),
        
        // Loading
        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),
        
        // Sidebar
        sidebarOpen: true,
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        // Mobile sidebar
        mobileSidebarOpen: false,
        setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
        toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
      }),
      {
        name: 'app-store',
        // Only persist theme and sidebar state
        partialize: (state) => ({ 
          theme: state.theme,
          sidebarOpen: state.sidebarOpen 
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
)
