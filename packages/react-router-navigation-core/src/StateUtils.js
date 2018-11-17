/* @flow */

import { forEach } from 'iterall'
import { matchPath, type Location, type RouterHistory } from 'react-router'
import RouteUtils from './RouteUtils'
import StackUtils from './StackUtils'
import type { NavigationState, RouteProps, Route } from './TypeDefinitions'

export default {
  initialize(
    nodes: RouteProps[],
    location: Location,
    entries: Location[],
    buildFrom: 'history' | 'nodes',
    staleNavigationState?: ?NavigationState<>,
    index?: number,
  ): NavigationState<> {
    const historyEntries = StackUtils.getHistoryEntries(
      nodes,
      entries,
      location,
      index,
    )
    const staleRoutes = staleNavigationState && staleNavigationState.routes
    if (buildFrom === 'nodes') {
      return nodes.reduce(
        (state, item) => {
          let entry
          forEach(historyEntries, (_entry, index) => {
            if (!entry) {
              const entryIndex = historyEntries.length - 1 - index
              const currentEntry = historyEntries[entryIndex]
              if (currentEntry && matchPath(currentEntry.pathname, item)) {
                entry = currentEntry
              }
            }
          })
          const match = entry ? matchPath(entry.pathname, item) : null
          const staleRoute = staleRoutes && staleRoutes[state.routes.length]
          const route = RouteUtils.create(item, match && entry, staleRoute)
          if (!route) return state
          const isCurrentLocation =
            entry && entry.pathname === location.pathname
          return {
            routes: [...state.routes, route],
            index: isCurrentLocation ? state.routes.length : state.index,
          }
        },
        { routes: [], index: -1 },
      )
    }
    return historyEntries.reduce(
      (state, entry) => {
        const item = nodes.find(route => {
          const routePath = route.routePath || route.path
          return matchPath(entry.pathname, { path: routePath, ...route })
        })
        if (!item || !item.path) return state
        const staleRoute = staleRoutes && staleRoutes[state.routes.length]
        const route = RouteUtils.create(item, entry, staleRoute)
        if (!route) return state
        const itemPath = item.routePath || item.path
        return {
          routes: [...state.routes, route],
          index: matchPath(location.pathname, { ...item, path: itemPath })
            ? state.routes.length
            : state.index,
        }
      },
      { routes: [], index: -1 },
    )
  },

  getRouteIndex(state: NavigationState<>, arg: number | Route): number {
    if (typeof arg === 'number') {
      if (state.routes[arg]) return arg
      return -1
    }
    // $FlowFixMe
    return state.routes.findIndex(route => route.name === arg.name)
  },

  isCorrumped(
    state: NavigationState<>,
    history: RouterHistory,
    historyRootIndex: number,
  ) {
    if (!Array.isArray(history.entries)) return false
    let isCorrumped = false
    forEach(state.routes.slice(0, state.index + 1), (route, index) => {
      const location = history.entries[historyRootIndex + index]
      const match = route ? route.match : null
      if (
        !location ||
        !(match && matchPath(location.pathname, { path: match.path }))
      ) {
        isCorrumped = true
      }
    })
    return isCorrumped
  },

  push(state: NavigationState<>, route: Route): NavigationState<> {
    const newRoutes = [...state.routes, route]
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  pop(state: NavigationState<>, n: number = 1): NavigationState<> {
    if (n <= 0) return state
    const newRoutes = state.routes.slice(0, Math.max(state.index + 1 - n, 1))
    return {
      ...state,
      index: newRoutes.length - 1,
      routes: newRoutes,
    }
  },

  replace(
    state: NavigationState<>,
    index: number,
    route: Route,
  ): NavigationState<> {
    if (state.routes[index] === route || index > state.routes.length - 1) {
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

  changeIndex(state: NavigationState<>, arg: number | Route) {
    const index =
      typeof arg === 'number'
        ? arg
        : // $FlowFixMe
          state.routes.findIndex(route => route.name === arg.name)
    if (index === -1 || index > state.routes.length - 1) return state
    const routes =
      typeof arg === 'number'
        ? state.routes
        : [
            ...state.routes.slice(0, index),
            arg,
            ...state.routes.slice(index + 1),
          ]
    return { ...state, routes, index }
  },
}
