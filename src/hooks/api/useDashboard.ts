import { useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import { DashboardStats, RecentActivity, ChartData } from '@/domain'

const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/activity'),
  getChartData: (period: '7d' | '30d' | '90d' = '30d') =>
    api.get(`/dashboard/charts?period=${period}`),
}

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  activity: () => [...dashboardKeys.all, 'activity'] as const,
  charts: (period: string) => [...dashboardKeys.all, 'charts', period] as const,
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await dashboardApi.getStats()
      return response.data as DashboardStats
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
  })
}

export const useRecentActivity = () => {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: async () => {
      const response = await dashboardApi.getRecentActivity()
      return response.data as RecentActivity[]
    },
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  })
}

export const useChartData = (period: '7d' | '30d' | '90d' = '30d') => {
  return useQuery({
    queryKey: dashboardKeys.charts(period),
    queryFn: async () => {
      const response = await dashboardApi.getChartData(period)
      return response.data as ChartData[]
    },
    staleTime: 1000 * 60 * 10,
  })
}