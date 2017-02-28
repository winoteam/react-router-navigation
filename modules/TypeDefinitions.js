/* @flow */
/* eslint no-use-before-define: 0 */

import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { NavigationParams, NavigationSceneRendererProps } from 'react-navigation/src/TypeDefinition'

export type Route = {
  key: string,
  routeName: string,
}

export type NavigationState<ExtraRoute> = {
  index: number,
  routes: Array<Route & ExtraRoute>
}

export type RouteProps = {
  component?: ReactClass<any>,
  render?: (props: any) => React$Element<any>,
  children?: (props: any) => React$Element<any>,
  path: string,
  exact?: boolean,
  strict?: boolean
}

/**
 * Navigation
 */

export type CardRoute = {
  path?: string,
  params?: NavigationParams,
}

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
  backButtonStyle: 'default' | 'light' | 'dark',
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
    key: string,
    component?: ReactClass<any>,
    render?: (props: NavigationSceneRendererProps & CardRendererProps) => React$Element<any>,
    children?: (props: NavigationSceneRendererProps & CardRendererProps) => React$Element<any>,
  }

export type Cards = Array<Card>

export type CardRendererProps = {
  onNavigateBack: Function,
  navigationState: NavigationState<CardRoute>,
  cards: Cards
}

/**
 * Tabs
 */

export type TabRoute = {
  title?: string,
  testID?: string,
}

export type TabBarProps = {
  renderTabBar?: (
    props: TabBarProps & SceneRendererProps & TabRendererProps
  ) => React$Element<any>,
  label?: string,
  labelStyle?: ((props: Tab & { isActive: boolean }) => StyleSheet) | StyleSheet,
  // <BottomNavigation /> only
  renderTabIcon?: (
    props: TabBarProps & SceneRendererProps & TabRendererProps
  ) => React$Element<any>,
  rippleColor?: string,
  // <Tabs /> only
  tabBarIndicatorStyle?: StyleSheet
}

export type TabProps = RouteProps & TabBarProps

export type Tab =
  & RouteProps
  & TabBarProps
  & TabProps
  & { key: string }

export type Tabs = Array<Tab>

export type TabRendererProps = {
  onRequestChangeTab: (index: number) => void,
  navigationState: NavigationState<TabRoute>,
  tabs: Tabs
}
