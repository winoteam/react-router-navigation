/* @flow */

import { matchPath, type Location } from 'react-router'
import RouteUtils from './RouteUtils'
import StackUtils from './StackUtils'
import type { NavigationState, RouteProps, Route } from './TypeDefinitions'

const StateUtils = {
  initialize(
    stack: ?Array<RouteProps>,
    location: Location,
    entries: Array<Location>,
    buildFrom: 'entries' | 'stack',
  ): NavigationState {
    const historyEntries = StackUtils.getHistoryEntries(stack, entries, location)
    if (buildFrom === 'stack') {
      return stack.reduce(
        (state, item) => {
          const entry = historyEntries.find(({ pathname }) => matchPath(pathname, item))
          const match = entry ? matchPath(entry.pathname, item) : null
          const route = RouteUtils.create(item, match && entry)
          if (!route) return state
          const isCurrentLocation = entry && entry.pathname === location.pathname
          return {
            index: isCurrentLocation ? state.routes.length : state.index,
            routes: [...state.routes, route],
          }
        },
        { index: -1, routes: [] },
      )
    }
    return historyEntries.reduce(
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

  push(state: NavigationState, route: Route): NavigationState {
    const newRoutes = [...state.routes, route]
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  pop(state: NavigationState, n: number = 1): NavigationState {
    if (state.index <= 0) return state
    const newRoutes = state.routes.slice(0, -n)
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  replace(state: NavigationState, index: number, route: Route): NavigationState {
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

  changeIndex(state: NavigationState, arg: number | Route) {
    if (typeof arg === 'number') {
      return { ...state, index: arg }
    }
    const index = state.routes.findIndex(route => route.routeName === arg.routeName)
    const routes = [...state.routes.slice(0, index), arg, ...state.routes.slice(index + 1)]
    return { ...state, routes, index }
  },
}

export default StateUtils
