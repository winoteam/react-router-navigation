/* @flow */
/* eslint no-use-before-define: 0 */

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type {
  NavigationTransitionProps,
  NavigationTransitionSpec,
} from 'react-navigation/src/TypeDefinition'
import type { RouteProps } from 'react-router-navigation-core'

/**
 * Navigation
 */

export type CardProps = RouteProps & NavBarProps

export type CardSubViewProps = *
//  NavigationSceneRendererProps &
//   CardsRendererProps &
//   CardProps

export type NavBarProps = {
  // General
  hideNavBar?: boolean,
  renderNavBar?: (props: CardSubViewProps) => React$Element<*>,
  navBarStyle?: StyleObj,
  // Left button
  hideBackButton?: boolean,
  backButtonTintColor?: string,
  backButtonTitle?: string,
  renderLeftButton?: (props: CardSubViewProps) => React$Element<*>,
  // Title
  title?: string,
  titleStyle?: StyleObj,
  renderTitle?: (props: CardSubViewProps) => React$Element<*>,
  // Right button
  renderRightButton?: (props: CardSubViewProps) => React$Element<*>,
}

export type NavigationProps = NavBarProps & {
  cardStyle?: StyleObj,
  configureTransition?: (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: ?NavigationTransitionProps,
  ) => NavigationTransitionSpec,
  onTransitionStart?: (...args: Array<mixed>) => void,
  onTransitionEnd?: (...args: Array<mixed>) => void,
}

export type Card = CardProps & { key: string }

/**
 * Tabs
 */

export type TabSubViewProps = *
//  SceneRendererProps &
//   TabsRendererProps &
// TabBarProps

export type TabBarProps = {
  hideTabBar?: boolean,
  renderTabBar?: (props: TabSubViewProps) => ?React$Element<*>,
  tabBarStyle?: StyleObj,
  tabStyle?: StyleObj,
  label?: string,
  labelStyle?: StyleObj,
  renderLabel?: (props: TabSubViewProps) => ?React$Element<*>,
  tabTintColor?: string,
  tabActiveTintColor?: string,
  // <BottomNavigation /> only:
  renderTabIcon?: (props: TabSubViewProps) => ?React$Element<*>,
  // <Tabs /> only:
  tabBarPosition?: 'top' | 'bottom',
  tabBarIndicatorStyle?: StyleObj,
}

export type TabsProps = TabBarProps & {
  // <Tabs /> only:
  initialLayout?: { width?: number, height?: number },
  configureTransition: ?Function,
}

export type TabProps = RouteProps &
  TabBarProps & {
    onReset?: (props: TabBarProps & RouteProps) => void,
    onIndexChange?: (index: number) => void,
  }

export type Tab = TabProps & { key: string }
