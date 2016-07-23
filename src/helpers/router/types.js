/* @flow */

export type NavigationRoute = {
  key: string,
}

export type NavigationState = {
  index: number,
  routes: Array<NavigationRoute>,
}

export type NavigatationAction = ({ type: string }) => void

export type Router = {
  push: (location: string) => void,
}
