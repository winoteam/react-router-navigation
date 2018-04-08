/* @flow */

import { matchPath, type Location } from 'react-router'
import type { RouteProps, Route } from './TypeDefinitions'

const RouteUtils = {
  create: (item: RouteProps, location?: Location): ?Route => {
    if (!item || !item.path) return null
    const routeName = item.path
    return {
      key: location ? location.pathname : routeName,
      routeMatch: location && matchPath(location.pathname, item),
      routeName,
    }
  },

  equal(oldRoute: Route, newRoute: Route): boolean {
    const { routeMatch: oldRouteMatch } = oldRoute
    const { routeMatch: newRouteMatch } = newRoute
    return !!(oldRouteMatch && newRouteMatch && oldRouteMatch.url === newRouteMatch.url)
  },
}

export default RouteUtils
