/* @flow */

import { matchPath, type Location } from 'react-router'
import RouteUtils from './RouteUtils'
import type { NavigationState, RouteProps, Route } from './TypeDefinitions'

const StateUtils = {
  initialize<NavigationRoute>(
    stack?: Array<RouteProps>,
    location: Location,
    entries?: Array<Location>,
  ): NavigationState<NavigationRoute> {
    if (!entries) {
      return stack.reduce(
        (state, item) => {
          const match = matchPath(location.pathname, item)
          const route = RouteUtils.create(item, match && location)
          if (!route) return state
          return {
            index: match ? state.routes.length : state.index,
            routes: [...state.routes, route],
          }
        },
        { index: -1, routes: [] },
      )
    }
    const lastRouteIndex = entries.findIndex(entry => entry.pathname === location.pathname)
    const initialEntries = entries.slice(0, lastRouteIndex + 1)
    return initialEntries.reduce(
      (state, entry) => {
        const item = stack.find(({ path, exact, strict }) => {
          return matchPath(entry.pathname, {
            path,
            exact,
            strict,
          })
        })
        if (!item || !item.path) return state
        const route = RouteUtils.create(item, entry)
        if (!route) return state
        return {
          index: matchPath(location.pathname, item) ? state.routes.length : state.index,
          routes: [...state.routes, route],
        }
      },
      { index: -1, routes: [] },
    )
  },

  push<NavigationRoute>(
    state: NavigationState<NavigationRoute>,
    route: Route & NavigationRoute,
  ): NavigationState<NavigationRoute> {
    const newRoutes = [...state.routes, route]
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  pop<NavigationRoute>(
    state: NavigationState<NavigationRoute>,
    n: number = 1,
  ): NavigationState<NavigationRoute> {
    if (state.index <= 0) return state
    const newRoutes = state.routes.slice(0, -n)
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  replace<NavigationRoute>(
    state: NavigationState<NavigationRoute>,
    index: number,
    route: Route & NavigationRoute,
  ): NavigationState<NavigationRoute> {
    if (state.routes[index] === route || index > state.routes.length) {
      return state
    }
    const newRoutes = [
      ...state.routes.slice(0, index),
      route,
      ...state.routes.slice(index + 1),
    ]
    return {
      ...state,
      index,
      routes: newRoutes,
    }
  },

  changeIndex<NavigationRoute>(
    state: NavigationState<NavigationRoute>,
    arg: number | Route,
  ) {
    if (typeof arg === 'number') {
      return { ...state, index: arg }
    }
    const index = state.routes.findIndex(route => route.routeName === arg.routeName)
    return { ...state, index }
  },
}

export default StateUtils
