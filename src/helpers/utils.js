/* @flow */

import _ from 'lodash'
import type { NavigationState, NavigationRoute, NavigationScene } from './../types'

export function extractScenes(
  children: Array<React$Element<NavigationScene>>
): Array<NavigationRoute> {
  return children.map((child) => ({
    ...child.props,
    key: child.key,
  }))
}

export function normalizePath(path: string): string {
  return path
    .split('.')
    .filter((_path) => _path)
    .map((_path) => `routes[${_path}]`)
    .join('.')
}

export function getSiblingScenes(state: NavigationState) {
  const normalizedPath = normalizePath(state.path.slice(0, -2))
  const path = normalizedPath
    ? `${normalizedPath}.children`
    : 'children'
  const sceneChildren = _.get(state, path)
  return extractScenes(sceneChildren)
}

export function getCurrentRoute(state: NavigationState): NavigationRoute {
  const normalizedPath = normalizePath(state.path)
  return _.get(state, normalizedPath)
}

export function findPathOfClosestTabs(state: NavigationState): string {
  const paths = state.path.split('.')
  const path = paths
    .map((_path, index) => paths.slice(0, index + 1).join('.'))
    .reverse()
    .map((_path) => ({
      path: _path,
      navigationState: _.get(state, normalizePath(_path)),
    }))
    .filter(({ navigationState }) => navigationState.tabs)
    .map((tabState) => tabState.path)
    .join('')
  return path
}
