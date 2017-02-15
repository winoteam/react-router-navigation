/* @flow */
/* eslint no-duplicate-imports: 0 */

import { matchPath } from 'react-router'
import type { Location } from 'react-router'
import type { Route } from './TypeDefinitions'

export default function getCurrentRoute(
  stack: Array<Object>,
  location: Location,
): ?Route {
  const item = stack.find((stackItem) => {
    if (!stackItem.path) return false
    return matchPath(location.pathname, stackItem.path, stackItem)
  })
  if (!item || !item.key || typeof item.key !== 'string') return null
  return { key: item.key }
}
