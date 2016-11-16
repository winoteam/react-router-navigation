/* @flow */

import { matchPattern } from 'react-router'
import type { Route, Location, Options } from './../types'

type Props = {
  children: Array<React$Element<any>>,
  parent: string,
  location: Location,
}

export function getRoute({ children, parent, location }: Props): ?Route {
  return children
    .find((child) => {
      const { pattern, exactly } = child.props
      return matchPattern(pattern, location, exactly, parent)
    })
}

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
