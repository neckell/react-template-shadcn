import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Users, FileText, TrendingUp, Activity, Bell, CheckCircle, AlertTriangle, XCircle, RefreshCw, Loader2 } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { useDashboardStats, useRecentActivity } from '../hooks/api/useDashboard'
import { useCreateUser, useUsers } from '../hooks/api/useUsers'
import { formatDistanceToNow } from 'date-fns'

export function Dashboard() {
  const { toast } = useToast()

  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats
  } = useDashboardStats()

  const {
    data: recentActivity,
    isLoading: activityLoading,
    error: activityError,
    refetch: refetchActivity
  } = useRecentActivity()

  const {
    data: users,
    isLoading: usersLoading,
    refetch: refetchUsers
  } = useUsers()

  const createUserMutation = useCreateUser()

  const stats = dashboardStats ? [
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers.toLocaleString(),
      description: `+${dashboardStats.userGrowth}% from last month`,
      icon: Users,
    },
    {
      title: 'Active Projects',
      value: dashboardStats.activeProjects.toString(),
      description: `+${dashboardStats.projectGrowth}% from last month`,
      icon: FileText,
    },
    {
      title: 'Revenue',
      value: `$${dashboardStats.revenue.toLocaleString()}`,
      description: `+${dashboardStats.revenueGrowth}% from last month`,
      icon: TrendingUp,
    },
    {
      title: 'Activity',
      value: dashboardStats.activity.toString(),
      description: `+${dashboardStats.activityGrowth}% from last month`,
      icon: Activity,
    },
  ] : []

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "success",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    })
  }

  const showInfoToast = () => {
    toast({
      title: "Information",
      description: "Here's some important information for you.",
    })
  }

  const showWarningToast = () => {
    toast({
      title: "Warning",
      description: "Please review this action before proceeding.",
      variant: "warning",
    })
  }

  const handleCreateUser = () => {
    createUserMutation.mutate({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
    })
  }

  const handleRefreshData = () => {
    refetchStats()
    refetchActivity()
    refetchUsers()
    toast({
      title: "Data Refreshed",
      description: "All dashboard data has been refreshed.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            TanStack Query API Demo
          </CardTitle>
          <CardDescription>
            Interact with API endpoints using TanStack Query. See loading states, error handling, and optimistic updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleRefreshData}
              variant="outline"
              className="flex items-center gap-2"
              disabled={statsLoading || activityLoading}
            >
              {statsLoading || activityLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh Data
            </Button>
            <Button
              onClick={handleCreateUser}
              className="flex items-center gap-2"
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Users className="h-4 w-4" />
              )}
              Create User
            </Button>
            <Button onClick={showSuccessToast} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="h-4 w-4" />
              Success Toast
            </Button>
            <Button onClick={showErrorToast} variant="destructive" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Error Toast
            </Button>
            <Button onClick={showWarningToast} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white">
              <AlertTriangle className="h-4 w-4" />
              Warning Toast
            </Button>
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">API Status:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statsLoading ? 'bg-yellow-500' : statsError ? 'bg-red-500' : 'bg-green-500'}`} />
                Dashboard Stats: {statsLoading ? 'Loading...' : statsError ? 'Error' : 'Ready'}
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activityLoading ? 'bg-yellow-500' : activityError ? 'bg-red-500' : 'bg-green-500'}`} />
                Recent Activity: {activityLoading ? 'Loading...' : activityError ? 'Error' : 'Ready'}
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${usersLoading ? 'bg-yellow-500' : 'bg-green-500'}`} />
                Users: {usersLoading ? 'Loading...' : `${users?.length || 0} loaded`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 w-32 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))
        ) : statsError ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-muted-foreground">Failed to load dashboard stats</p>
                <Button onClick={() => refetchStats()} variant="outline" className="mt-2">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  toast({
                    title: `${stat.title} Updated`,
                    description: `Current value: ${stat.value}. ${stat.description}`,
                  })
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Click for details
                  </p>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - integrate with Recharts
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              {activityLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <CardDescription>
              {recentActivity ? `You have ${recentActivity.length} recent activities.` : 'Loading recent activities...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center p-2">
                    <div className="ml-4 space-y-2 flex-1">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activityError ? (
              <div className="text-center py-8">
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Failed to load recent activity</p>
                <Button onClick={() => refetchActivity()} variant="outline" size="sm" className="mt-2">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            ) : recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => {
                      toast({
                        title: activity.title,
                        description: activity.description,
                      })
                    }}
                  >
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </p>
                      {activity.user && (
                        <p className="text-xs text-blue-600">
                          by {activity.user.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
