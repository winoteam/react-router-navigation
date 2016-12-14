/* @flow */

import { matchPattern } from 'react-router'
import type { Route, Location, Options } from './../types'

// Get current route from history
type Props = {
  children: Array<React$Element<any>>,
  parent: string,
  location: Location,
}
export function getRoute({ children, parent, location }: Props): ?React$Element<any> {
  return children
    .find((child) => {
      const { pattern, exactly } = child.props
      return matchPattern(pattern, location, exactly, parent)
    })
}

// Get valid options pass to scene
export function getOptions(possibleOptions: Object): Options {
  const AUTHORIZED_KEYS = [
    'hideNavBar', 'navBarStyle', 'titleStyle', 'backButtonStyle',
    'statusBarBackgroundColor', 'tabBarStyle', 'title', 'sceneConfigTransition',
    'statusBarStyle',
  ]
  return Object.keys(possibleOptions)
    .reduce((options, key) => {
      const option = possibleOptions[key]
      if (AUTHORIZED_KEYS.includes(key)) {
        return {
          ...options,
          [key]: option,
        }
      }
      return options
    }, {})
}

// Normalize route
export const normalizeRoute = (route: React$Element): Route => ({
  key: route.props.pattern,
  component: route,
  ...getOptions(route.props.component),
})
