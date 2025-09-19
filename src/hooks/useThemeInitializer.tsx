import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useThemeInitializer() {
  const { theme, initializeTheme } = useAppStore()

  useEffect(() => {
    initializeTheme()
  }, [theme, initializeTheme])
}
