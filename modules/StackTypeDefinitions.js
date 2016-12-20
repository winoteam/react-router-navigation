/* @flow */

export type Route = {
  key: string,
  component?: ?React$Element<any>,
  title?: string,
}

export type NavigationState = {
  index: number,
  routes: Array<Route>,
}

export type Action = 'REPLACE' | 'POP' | 'PUSH'
