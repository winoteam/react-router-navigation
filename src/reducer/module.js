/* @flow */

import _ from 'lodash'
import { INIT, PUSH, POP, CHANGE_TAB } from './actionTypes'
import { extractScenes } from './../helpers/utils'
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
      const newState = { ...state }
      const route = action.route

      // Update path
      const newPath = `${state.path.slice(0, -1)}${parseInt(state.path.slice(-1)) + 1}`
      _.update(newState, 'path', () => newPath)

      // Update index
      const pathToNewIndex = newPath.length > 1
        ? newPath
            .split('.')
            .slice(0, -1)
            .filter((path) => path)
            .map((path) => `routes[${path}]`)
            .join('.')
          + '.index'
        : 'index'
      _.update(newState, pathToNewIndex, () =>  parseInt(newPath.slice(-1)))

      // Set tabs
      if (route.tabs) {
        route.index = 0
        route.routes = extractScenes(route.children)
          .map((child) => {
            const { children } = child
            const component = children[0]
              ? children[0].props.component
              : children.props.component
            return {
              ...child,
              index: 0,
              routes: [{
                key: child.key,
                component,
              }],
            }
          })
        _.update(newState, 'path', () => `${newPath}.0.0`)
      }

      // Add new route to state
      const pathToNewRoute = newPath.split('.')
        .map((path) => `routes[${path}]`)
        .join('.')
      _.update(newState, pathToNewRoute, () => action.route)

      return newState
    }

    case POP: {
      const newState = {...state}
      const newPath = `${state.path.slice(0, -1)}${parseInt(state.path.slice(-1)) - 1}`
      const pathToNewIndex = newPath.length > 1
        ? newPath
            .split('.')
            .slice(0, -1)
            .filter((path) => path)
            .map((path) => `routes[${path}]`)
            .join('.')
          + '.index'
        : 'index'
      _.update(newState, pathToNewIndex, () =>  parseInt(newPath.slice(-1)))
      _.update(newState, 'path', () => newPath)
      _.omit(newState, state.path)
      return newState
    }

    case CHANGE_TAB: {
      return state
    }

    default: {
      return state
    }

  }
}
