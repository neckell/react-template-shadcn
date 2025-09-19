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

export interface DashboardStats {
  totalUsers: number
  activeProjects: number
  revenue: number
  activity: number
  userGrowth: number
  projectGrowth: number
  revenueGrowth: number
  activityGrowth: number
}

export interface RecentActivity {
  id: string
  type: 'user_registered' | 'project_updated' | 'system_maintenance' | 'payment_received'
  title: string
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

export interface ChartData {
  name: string
  value: number
  date: string
}

