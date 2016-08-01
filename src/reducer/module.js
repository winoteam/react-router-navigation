/* @flow */

import { INIT, PUSH, POP, CHANGE_TAB } from './actionTypes'
import extractScenes from './../utils/extractScenes'
import type { NavigationAction, NavigationState } from './../types'

export default function (state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {

    case INIT: {
      return {
        ...state,
        routes: [action.routes[0]],
      }
    }

    case PUSH: {
      const { route } = action

      // Update path
      let path = `${state.path.slice(0, -1)}${parseInt(state.path.slice(-1)) + 1}`
      const index = parseInt(path.slice(-1))

      // Set children
      if (route.tabs) {
        path += '.0'
        route.index = 0
        route.children = extractScenes(route.children)
      }

      // Return new state
      return {
        path,
        index,
        routes: [
          ...state.routes,
          route,
        ],
      }
    }

    case POP: {
      const index = state.index - 1
      const path = `${state.path.slice(0, -1)}${parseInt(state.path.slice(-1)) - 1}`
      const routes = state.routes.slice(0, -1)
      return { ...state, path, index, routes }
    }

    case CHANGE_TAB: {
      return state
    }

    default: {
      return state
    }

  }
}
