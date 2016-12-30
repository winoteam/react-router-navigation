/* @flow */

import { matchPattern } from 'react-router'
import type { NavigationRoute } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'

// Get current route from history
type Props = {
  children: Array<React$Element<{
    component: React$Element<any>,
    title?: string,
    pattern: string,
    exactly?: boolean,
  }>>,
  parent?: string,
  location: { pathname: string },
}
export function getCurrentRoute({ children, parent, location }: Props): ?NavigationRoute {
  const route = children
    .find(({ props }) => {
      const pattern = props.pattern
      const exactly = props.exactly || false
      return matchPattern(pattern, location, exactly, parent)
    })
  if (!route) return null
  return { key: route.props.pattern }
}
