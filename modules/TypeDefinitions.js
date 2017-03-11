/* @flow */
/* eslint no-use-before-define: 0 */

import type { ContextRouter, Match } from 'react-router'

export type Route = {
  key: string,
  routeName: string,
  match: ?Match,
}

export type NavigationState<OwnRoute> = {
  index: number, // $FlowFixMe
  routes: Array<Route & OwnRoute>,
}

export type RouteProps = {
  component?: ReactClass<ContextRouter>,
  render?: (props: ContextRouter) => React$Element<any>,
  children?: (props: ContextRouter) => React$Element<any>,
  path: string,
  exact?: boolean,
  strict?: boolean
}


/**
 * Navigation
 */

export type NavBarProps = {
  // General
  hideNavBar?: boolean,
  renderNavBar?: (props: CardSubViewProps) => React$Element<any>,
  navBarStyle?: StyleSheet,
  // Left button
  hideBackButton?: boolean,
  backButtonTintColor?: string,
  renderLeftButton?: (props: CardSubViewProps) => React$Element<any>,
  // Title
  title?: string,
  titleStyle?: StyleSheet,
  renderTitle?: (props: CardSubViewProps) => React$Element<any>,
  // Right button
  renderRightButton?: (props: CardSubViewProps) => React$Element<any>,
}

export type CardProps =
  & RouteProps
  & NavBarProps

export type Card =
  & CardProps
  & { key: string }

export type CardsRendererProps = {
  onNavigateBack: Function,
  navigationState: NavigationState<{
    path?: string,
    params?: Object,
  }>,
  cards: Array<Card>,
}

export type CardSubViewProps = any
  // & NavigationSceneRendererProps
  // & CardsRendererProps
  // & CardProps


/**
 * Tabs
 */

export type TabBarProps = {
  onReset?: Function,
  hideTabBar?: boolean,
  renderTabBar?: (props: TabSubViewProps) => React$Element<any>,
  label?: string,
  labelStyle?: StyleSheet,
  renderLabel?: (props: TabSubViewProps) => React$Element<any>,
  // <BottomNavigation /> only
  renderTabIcon?: (props: TabSubViewProps) => React$Element<any>,
  // <Tabs /> only
  tabBarStyle?: StyleSheet,
  tabBarIndicatorStyle?: StyleSheet
}

export type TabProps =
  & RouteProps
  & TabBarProps

export type Tab =
  & TabProps
  & { key: string }

export type TabsRendererProps = {
  onRequestChangeTab: (index: number) => void,
  navigationState: NavigationState<{
    title?: string,
    testID?: string,
  }>,
  tabs: Array<Tab>,
}

export type TabSubViewProps = any
  // & SceneRendererProps
  // & TabsRendererProps
  // & TabBarProps
