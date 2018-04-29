/* @flow */

import type { Location, ContextRouter, Match } from 'react-router'

export type Route = {
  key: string,
  routeName: string,
  routeMatch: ?Match,
}

export type NavigationState<NavigationRoute = {}> = {
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
  children?: (router: ContextRouter) => React$Node | React$Node,
  path?: string,
  routePath?: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
}

export type Card = RouteProps

export type CardsRendererProps = {
  renderCard: (route: Route) => React$Node,
  onNavigateBack: () => boolean,
  navigationState: NavigationState<>,
  cards: Array<Card>,
}

export type Tab = RouteProps & {
  onRequestChangeTab?: () => void,
  onReset?: () => void,
}

export type TabsRendererProps<TabRoute = {}> = {
  renderTab: (route: Route) => React$Node,
  onIndexChange: (index: number) => void,
  navigationState: NavigationState<TabRoute>,
  tabs: Array<Tab>,
}

export type HistoryNode = Array<Location>

export type HistoryNodes = { [routeName: string]: HistoryNode }

export type HistoryRootIndex = number
