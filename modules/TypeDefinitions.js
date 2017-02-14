/* @flow */
/* eslint no-use-before-define: 0 */

import type { ContextRouter } from 'react-router'

export type Route = {
  key: string,
}

export type NavigationState = {
  index: number,
  routes: Array<Route>,
}

export type RouteProps = {
  component?: ReactClass<any>,
  render?: (router: ContextRouter) => React$Element<any>,
  children?: (router: ContextRouter) => React$Element<any>,
  path: string,
  exact?: bool,
  strict?: bool,
}

export type CardState = {
  isFocused: boolean,
  isTransitioning: boolean,
}

export type NavBarProps = {
  hideNavBar?: boolean,
  renderNavBar: (props: CardRendererProps) => React$Element<any>,
  navBarStyle?: StyleSheet,
  backButtonStyle: 'default' | 'light' | 'dark',
  renderLeftComponent: (props: CardRendererProps) => React$Element<any>,
  title?: string,
  titleStyle?: StyleSheet,
}

export type CardProps = RouteProps & NavBarProps & {
  onResetCard?: () => void, // @TODO
}

export type Card = CardProps & {
  key: string,
}

export type Cards = Array<Card>

export type CardRendererProps = {
  onNavigateBack: Function,
  navigationState: NavigationState,
  cards: Cards,
  card: Card,
}

export type TabProps = RouteProps & {
  label?: string,
  labelStyle?: (props: Tab & { isActive: boolean, pathname: string, }) => StyleSheet | StyleSheet,
  tabBarIndicatorStyle?: StyleSheet, // <Tabs /> only @TODO
  renderTabIcon?: () => React$Element<any>, // <BottomNavigation /> only @TODO
}

export type Tab = TabProps & {
  key: string,
}

export type Tabs = Array<Tab>

export type TabRendererProps = {
  navigationState: NavigationState,
  tabs: Tabs,
  onRequestChangeTab: (index: number) => void,
}
