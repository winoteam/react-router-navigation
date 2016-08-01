/* @flow */

import _ from 'lodash'
import type { NavigationState, NavigationRoute, NavigationScene } from './../types'

export function getSiblingScenes(state: NavigationState) {
  let normalizedPath = state.path.slice(0, -2)
    .split('.')
    .filter((path) => path)
    .map((path) => `routes[${path}]`)
    .join('.')
  normalizedPath = normalizedPath
    ? normalizedPath + '.children'
    : 'children'
  const sceneChildren = _.get(state, normalizedPath)
  return extractScenes(sceneChildren)
}

export function getCurrentRoute(state: NavigationState): NavigationRoute {
  const normalizedPath = state.path
    .split('.')
    .map((path) => `routes[${path}]`)
    .join('.')
  return _.get(state, normalizedPath)
}

export function extractScenes(
  children: Array<React$Element<NavigationScene>>
): Array<NavigationRoute> {
  return children.map((child) => ({
    ...child.props,
    key: child.key,
  }))
}
