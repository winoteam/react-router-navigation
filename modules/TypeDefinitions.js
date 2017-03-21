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
  backButtonTitle?: string,
  renderLeftButton?: (props: CardSubViewProps) => React$Element<any>,
  // Title
  title?: string,
  titleStyle?: StyleSheet,
  renderTitle?: (props: CardSubViewProps) => React$Element<any>,
  // Right button
  renderRightButton?: (props: CardSubViewProps) => React$Element<any>,
}

export type NavigationCardProps = {
  cardStyle?: StyleSheet,
}

export type NavigationProps =
  & NavBarProps
  & NavigationCardProps
  & {
  onTransitionStart?: Function,
  onTransitionEnd?: Function,
}

export type CardProps =
  & RouteProps
  & NavBarProps
  & NavigationCardProps

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
  hideTabBar?: boolean,
  renderTabBar?: (props: TabSubViewProps) => ?React$Element<any>,
  tabBarStyle?: StyleSheet,
  label?: string,
  labelStyle?: StyleSheet,
  renderLabel?: (props: TabSubViewProps) => ?React$Element<any>,
  tabTintColor?: string,
  tabActiveTintColor?: string,
  // <BottomNavigation /> only:
  renderTabIcon?: (props: TabSubViewProps) => ?React$Element<any>,
  // <Tabs /> only:
  tabBarPosition?: 'top' | 'bottom',
  tabBarIndicatorStyle?: StyleSheet,
}

export type TabsProps = TabBarProps & {
  // <Tabs /> only:
  initialLayout?: { width?: number, height?: number },
  renderPager?: (props: TabSubViewProps) => ?React$Element<any>,
  configureTransition: ?Function,
}

export type TabProps =
  & RouteProps
  & TabBarProps
  & { onReset?: Function }

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
