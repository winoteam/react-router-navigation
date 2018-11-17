/* @flow */

import { matchPath, type Location } from 'react-router'
import type { RouteProps, Route } from './TypeDefinitions'

let uniqueBaseId = `id-${Date.now()}`
let uuidCount = 0

export default {
  create(item: RouteProps, location?: ?Location, staleRoute?: ?Route): ?Route {
    if (!item || !item.path) return null
    const routeName = item.path
    const routeMatch = location ? matchPath(location.pathname, item) : null
    const routePath = item.routePath || item.path
    const route = { ...item, path: routePath }
    const match = location && matchPath(location.pathname, route)
    const key = staleRoute ? staleRoute.key : match ? match.url : routeName
    return {
      key: staleRoute ? key : `${key}-${uniqueBaseId}-${uuidCount++}`,
      match: routeMatch,
      name: routeName,
    }
  },

  equal(oldRoute: Route, newRoute: Route): boolean {
    if (!oldRoute || !newRoute) return false
    const { match: oldMatch } = oldRoute
    const { match: newMatch } = newRoute
    return !!(oldMatch && newMatch && oldMatch.url === newMatch.url)
  },
}
