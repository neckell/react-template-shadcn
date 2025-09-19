export const Paths = {
  Home: '/',
  Login: '/login',
  Dashboard: '/',
  Users: '/users',
  Forms: '/forms',
  Settings: '/settings',
} as const

export type PathKeys = keyof typeof Paths
export type PathValues = typeof Paths[PathKeys]
