import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Users, FileText, TrendingUp, Activity, Bell, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

const stats = [
  {
    title: 'Total Users',
    value: '2,345',
    description: '+20.1% from last month',
    icon: Users,
  },
  {
    title: 'Active Projects',
    value: '145',
    description: '+15% from last month',
    icon: FileText,
  },
  {
    title: 'Revenue',
    value: '$45,231',
    description: '+25% from last month',
    icon: TrendingUp,
  },
  {
    title: 'Activity',
    value: '573',
    description: '+12% from last month',
    icon: Activity,
  },
]

export function Dashboard() {
  const { toast } = useToast()

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Toast Demo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Toast Notifications Demo
          </CardTitle>
          <CardDescription>
            Click the buttons below to see different types of toast notifications in action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={showSuccessToast} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="h-4 w-4" />
              Success Toast
            </Button>
            <Button onClick={showErrorToast} variant="destructive" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Error Toast
            </Button>
            <Button onClick={showInfoToast} variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Info Toast
            </Button>
            <Button onClick={showWarningToast} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white">
              <AlertTriangle className="h-4 w-4" />
              Warning Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
        })}
      </div>

      {/* Charts Section */}
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You have 3 new notifications this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => {
                  toast({
                    title: "New User Registration",
                    description: "John Doe has successfully registered to the platform.",
                  })
                }}
              >
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New user registered
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div 
                className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => {
                  toast({
                    title: "Project Update",
                    description: "React Dashboard project has been successfully updated with new features.",
                  })
                }}
              >
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Project updated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1 hour ago
                  </p>
                </div>
              </div>
              <div 
                className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => {
                  toast({
                    title: "System Maintenance",
                    description: "Scheduled maintenance completed successfully. All systems are operational.",
                  })
                }}
              >
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    System maintenance
                  </p>
                  <p className="text-sm text-muted-foreground">
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
