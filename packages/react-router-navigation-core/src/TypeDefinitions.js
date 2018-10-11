/* @flow */

import type { Location, ContextRouter, Match } from 'react-router'

export type Route = {
  key: string,
  name: string,
  match: ?Match,
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
  initialPath?: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
}

export type Card = RouteProps

export type CardsRendererProps = {
  renderCard: (route: Route) => React$Node,
  onNavigateBack: () => boolean,
  navigationState: NavigationState<>,
  cards: Card[],
}

export type Tab = RouteProps & {
  onReset?: () => void,
}

export type TabsRendererProps<TabRoute = {}> = {
  renderTab: (route: Route) => React$Node,
  onIndexChange: (index: number) => void,
  navigationState: NavigationState<TabRoute>,
  tabs: Tab[],
}

export type HistoryNode = {
  index: number,
  entries: Location[],
}

export type HistoryNodes = { [name: string]: HistoryNode }

export type HistoryRootIndex = number

export type BackHandler = {
  addEventListener: (name: string, callback: Function) => void,
  removeEventListener: (name: string, callback: Function) => void,
}
