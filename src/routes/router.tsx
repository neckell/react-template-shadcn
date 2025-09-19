import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { Layout } from '../components/layouts/Layout'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/Users'
import { Settings } from '../pages/Settings'
import { Forms } from '../pages/Forms'

// Root route
const rootRoute = createRootRoute({
  component: Layout,
})

// Dashboard route
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
})

// Users route
const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: Users,
})

// Forms route
const formsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forms',
  component: Forms,
})

// Settings route
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  usersRoute,
  formsRoute,
  settingsRoute,
])

// Create the router
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
