/* @flow */

import type { Route } from './TypeDefinitions'

/**
 * Normalize route
 * > ex: "hello@@38902" becomes "hello"
 */

export default function normalizeRoute(route: Route): Route {
  const extraIndex = route.key.indexOf('@@')
  if (extraIndex === -1) return route
  const key = route.key.slice(0, extraIndex)
  return { ...route, key }
}
