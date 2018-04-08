/* @flow */

import type { ContextRouter, Match } from 'react-router'

export type Route = {
  key: string,
  routeName: string,
  routeMatch: ?Match,
}

export type NavigationState<NavigationRoute> = {
  index: number,
  routes: Array<Route & NavigationRoute>,
}

export type NavigationAction = {
  type: 'PUSH' | 'REPLACE' | 'POP' | 'CHANGE_INDEX',
  payload: { n?: number },
}

export type RouteProps = {
  component?: React$ComponentType<ContextRouter>,
  render?: (router: ContextRouter) => React$Node,
  children?: React$ComponentType<ContextRouter> | React$Node,
  path?: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
  routePath?: string,
}

export type Card = RouteProps & {
  key: string,
}

export type CardsRendererProps = {
  renderCard: (route: Route) => React$Node,
  onNavigateBack: () => boolean,
  navigationState: NavigationState<{
    path?: string,
    params?: Object,
  }>,
  cards: Array<Card>,
}

export type Tab = RouteProps & {
  key: string,
  onIndexChange?: () => void,
}

export type TabsRendererProps = {
  renderTab: (route: Route) => React$Node,
  onIndexChange: (index: number) => void,
  navigationState: NavigationState<{ title?: string, testID?: string }>,
  tabs: Array<Tab>,
}
