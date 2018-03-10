/* @flow */
/* eslint no-use-before-define: 0 */

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type {
  NavigationTransitionProps,
  NavigationTransitionSpec,
  HeaderProps,
} from 'react-navigation'
import type { SceneRendererProps, Scene } from 'react-native-tab-view/types'
import type { TransitionConfigurator } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type {
  RouteProps,
  CardsRendererProps,
  TabsRendererProps,
  Route,
} from 'react-router-navigation-core'

export type CardProps = RouteProps &
  NavBarProps<NavigationProps & CardsRendererProps & HeaderProps>

export type NavBarProps<T> = {
  // General
  headerMode?: 'float' | 'screen' | 'none',
  hideNavBar?: boolean,
  renderNavBar?: (props: T) => ?React$Element<*>,
  navBarStyle?: StyleObj, // Left button
  hideBackButton?: boolean,
  backButtonTintColor?: string,
  backButtonTitle?: string,
  renderLeftButton?: (props: T) => ?React$Element<*>, // Title
  title?: string,
  titleStyle?: StyleObj,
  renderTitle?: (props: T) => ?React$Element<*>, // Right button
  renderRightButton?: (props: T) => ?React$Element<*>,
}

export type NavigationProps = NavBarProps<
  NavigationProps & CardsRendererProps & HeaderProps,
> & {
  cardStyle?: StyleObj,
  configureTransition?: (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: ?NavigationTransitionProps,
  ) => NavigationTransitionSpec,
  onTransitionStart?: (...args: Array<mixed>) => void,
  onTransitionEnd?: (...args: Array<mixed>) => void,
  mode?: 'card' | 'modal',
}

export type Card = CardProps & { key: string }

export type TabRoute = Route & { title?: string, testID?: string }

export type TabBarProps<T> = {
  hideTabBar?: boolean,
  renderTabBar?: (props: T) => ?React$Element<*>,
  tabBarStyle?: StyleObj,
  tabStyle?: StyleObj,
  label?: string,
  labelStyle?: StyleObj,
  renderLabel?: (props: T, scene: Scene<TabRoute>) => ?React$Element<*>,
  tabTintColor?: string,
  tabActiveTintColor?: string, // <BottomNavigation /> only:
  renderTabIcon?: (props: T) => ?React$Element<*>, // <Tabs /> only:
  tabBarPosition?: 'top' | 'bottom',
  tabBarIndicatorStyle?: StyleObj,
}

export type TabsProps = TabBarProps<
  TabsProps & TabsRendererProps & SceneRendererProps<TabRoute>,
> & {
  // <Tabs /> only:
  initialLayout?: { width: number, height: number },
  configureTransition?: TransitionConfigurator,
  lazy?: boolean,
}

export type TabProps = RouteProps &
  TabBarProps<TabsProps & TabsRendererProps & SceneRendererProps<TabRoute>> & {
    onReset?: () => void,
    onIndexChange?: (index: number) => void,
  }

export type Tab = { ...TabProps, key: string }
