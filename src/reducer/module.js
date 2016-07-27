/* @flow */

import { INIT, POP, PUSH } from './actionTypes'
import extractScenes from './../utils/extractScenes'
import type { NavigatationAction, NavigationState } from './../../types'

export default function(state: NavigationState, action: NavigatationAction): NavigationState {
  switch (action.type) {

    case INIT: {
      return {
        index: 0,
        path: '0',
        routes: [action.routes[0]],
      }
    }

    case PUSH: {
      const { route } = action

      // Update path
      const path = route.tabs
        ? `${parseInt(state.path) + 1}`
        : `${state.path.slice(0, -1)}${state.path.slice(-1) + 1}`
      const index = parseInt(path.slice(-1))

      // Set children
      if (route.tabs) {
        route.index = 0
        route.children = extractScenes(route.children)
      }

      return {
        path,
        index,
        routes: [
          ...state.routes,
          route,
        ]
      }
    }

    case POP: {
      const index = state.index - 1
      const path = `${state.path.slice(0, -1)}${state.path.slice(-1) - 1}`
      const routes = state.routes.slice(0, -1)
      return { ...state, index, path, routes }
    }

  }
}
