/* @flow */

import { matchPath, type Location } from 'react-router'
import RouteUtils from './RouteUtils'
import StackUtils from './StackUtils'
import type { NavigationState, RouteProps, Route } from './TypeDefinitions'

const StateUtils = {
  initialize(
    nodes: RouteProps[],
    location: Location,
    entries: Location[],
    buildFrom: 'history' | 'nodes',
  ): NavigationState<> {
    const historyEntries = StackUtils.getHistoryEntries(
      nodes,
      entries,
      location,
    )
    if (buildFrom === 'nodes') {
      return nodes.reduce(
        (state, item) => {
          const entry = historyEntries
            .reverse()
            .find(({ pathname }) => matchPath(pathname, item))
          const match = entry ? matchPath(entry.pathname, item) : null
          const route = RouteUtils.create(item, match && entry)
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
        const route = RouteUtils.create(item, entry)
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

  getRouteIndex(state: NavigationState<>, arg: number | Route) {
    if (typeof arg === 'number') {
      if (state.routes[arg]) return arg
      return -1
    }
    // $FlowFixMe
    return state.routes.findIndex(route => route.routeName === arg.routeName)
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
          state.routes.findIndex(route => route.routeName === arg.routeName)
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

export default StateUtils
