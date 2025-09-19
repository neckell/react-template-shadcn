export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  password: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: 'admin' | 'user' | 'manager'
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface TableColumn<T> {
  id: keyof T
  header: string
  accessorKey?: keyof T
  cell?: (value: any) => React.ReactNode
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  key: string
  value: string
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith'
}
