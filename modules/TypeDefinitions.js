/* @flow */
/* eslint no-use-before-define: 0 */

import type { ContextRouter } from 'react-router'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'

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

/**
 * Navigation
 */

export type CardState = {
  isFocused: boolean,
  isTransitioning: boolean
}

export type NavBarProps = {
  // General
  hideNavBar?: boolean,
  renderNavBar: (
    props: CardRendererProps & NavigationSceneRendererProps
  ) => React$Element<any>,
  navBarStyle?: StyleSheet,
  // Left button
  hideBackButton?: boolean,
  backButtonStyle: "default" | "light" | "dark",
  renderLeftButton: (
    props: CardRendererProps & NavigationSceneRendererProps
  ) => React$Element<any>,
  // Title
  title?: string,
  titleStyle?: StyleSheet,
  renderTitle: (
    props: CardRendererProps & NavigationSceneRendererProps
  ) => React$Element<any>,
  // Right button
  renderRightButton: (
    props: CardRendererProps & NavigationSceneRendererProps
  ) => React$Element<any>
}

export type CardProps = RouteProps & NavBarProps

export type Card =
  & RouteProps
  & NavBarProps
  & {
    key: string
  }

export type Cards = Array<Card>

export type CardRendererProps = {
  +onNavigateBack: Function,
  +navigationState: NavigationState,
  +cards: Cards
}

export type TabBarProps = {
  renderTabBar: (
    props: TabBarProps & SceneRendererProps & TabRendererProps
  ) => React$Element<any>,
  label?: string,
  labelStyle?: ((props: Tab & { isActive: boolean, pathname: string, }) => StyleSheet) | StyleSheet,
  // <BottomNavigation /> only
  renderTabIcon?: (
    props: TabBarProps & SceneRendererProps & TabRendererProps,
  ) => React$Element<any>,
  // <Tabs /> only
  tabBarIndicatorStyle?: StyleSheet,
}

export type TabProps = RouteProps & TabBarProps

export type Tab = TabProps & {
  key: string,
}

export type Tabs = Array<Tab>

export type TabRendererProps = {
  onRequestChangeTab: (index: number) => void,
  navigationState: NavigationState,
  tabs: Tabs,
  tab: Tab,
}
