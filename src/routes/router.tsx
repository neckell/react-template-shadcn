import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { Layout } from '../components/layouts/Layout'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/Users'
import { Settings } from '../pages/Settings'
import { Forms } from '../pages/Forms'
import { Paths } from './Paths'

const rootRoute = createRootRoute({
  component: Layout,
})

const routes = [
  { path: Paths.Dashboard, component: Dashboard },
  { path: Paths.Users, component: Users },
  { path: Paths.Forms, component: Forms },
  { path: Paths.Settings, component: Settings },
]

const routeTree = rootRoute.addChildren(
  routes.map(({ path, component }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component,
    })
  )
)

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
