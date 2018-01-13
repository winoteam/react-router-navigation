/* @flow */

import type { ContextRouter } from 'react-router'

export type Route = {
  key: string,
  routeName: string,
}

export type NavigationState<OwnRoute> = {
  index: number,
  routes: Array<Route & OwnRoute>,
}

export type RouteProps = {
  component?: Class<React$Component<ContextRouter>>,
  render?: (props: ContextRouter) => React$Node,
  children?: ((props: ContextRouter) => React$Node) | React$Node,
  path?: string,
  exact?: boolean,
  strict?: boolean,
}

export type Card = RouteProps & {
  key: string,
}

export type CardsRendererProps = {
  onNavigateBack: (routeKey?: ?string) => boolean,
  navigationState: NavigationState<{
    path?: string,
    params?: Object,
  }>,
  cards: Array<Card>,
}

export type Tab = RouteProps & {
  key: string,
  onIndexChange?: (index: number) => void,
}

export type TabsRendererProps = {
  onIndexChange: (index: number) => void,
  navigationState: NavigationState<{
    title?: string,
    testID?: string,
  }>,
  loadedTabs: Array<string>,
  tabs: Array<Tab>,
}
