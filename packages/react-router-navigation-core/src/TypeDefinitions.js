/* @flow */

import type { ContextRouter } from 'react-router'

export type Route = {
  key: string,
  routeName: string,
}

export type NavigationState<OwnRout e> = {
  index: number,
  routes: Array<Route & OwnRoute>,
}

export type RouteProps = {
  component?: React$ComponentType<*>,
  render?: (contextRouter: ContextRouter) => React$Node,
  children?: React$ComponentType<ContextRouter> | React$Node,
    | React$ComponentType<ContextRouter>
    | React$Node
    | ((contextRouter: ContextRouter) => React$Node),
  path?: string,
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
}

export type Card = RouteProps & {
  key: string,
}

export type CardsRendererProps = {
  onNavigateBack: () => boolean,
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
