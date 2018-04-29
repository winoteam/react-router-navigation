/* @flow */

import { matchPath, type Location } from 'react-router'
import type { RouteProps, Route } from './TypeDefinitions'

const RouteUtils = {
  create: (item: RouteProps, location?: ?Location): ?Route => {
    if (!item || !item.path) return null
    const routeName = item.path
    const routeMatch = location ? matchPath(location.pathname, item) : null
    const routePath = item.routePath || item.path
    const route = { ...item, path: routePath }
    const match = location && matchPath(location.pathname, route)
    const key = match ? match.url : routeName
    return { key, routeMatch, routeName }
  },

  equal(oldRoute: Route, newRoute: Route): boolean {
    if (!oldRoute || !newRoute) return false
    const { routeMatch: oldRouteMatch } = oldRoute
    const { routeMatch: newRouteMatch } = newRoute
    return !!(
      oldRouteMatch &&
      newRouteMatch &&
      oldRouteMatch.url === newRouteMatch.url
    )
  },
}

export default RouteUtils
