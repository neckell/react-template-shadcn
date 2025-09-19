import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AppState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  initializeTheme: () => void

  user: User | null
  setUser: (user: User | null) => void

  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  mobileSidebarOpen: boolean
  setMobileSidebarOpen: (open: boolean) => void
  toggleMobileSidebar: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        setTheme: (theme) => {
          console.log('Store: Setting theme to', theme)
          set({ theme })
          document.documentElement.classList.toggle('dark', theme === 'dark')
          console.log('Store: HTML classes after setTheme:', document.documentElement.className)
        },
        initializeTheme: () => {
          const { theme } = get()
          document.documentElement.classList.toggle('dark', theme === 'dark')
        },

        user: null,
        setUser: (user) => set({ user }),

        isLoading: false,
        setIsLoading: (isLoading) => set({ isLoading }),

        sidebarOpen: true,
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        mobileSidebarOpen: false,
        setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
        toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
      }),
      {
        name: 'app-store',
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
