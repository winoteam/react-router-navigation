/* @flow */
/* eslint no-use-before-define: 0 */
/* eslint flowtype/generic-spacing: 0 */

import { Animated } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type { SceneRendererProps, Scene } from 'react-native-tab-view/types'
import type { TransitionConfigurator } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type {
  RouteProps,
  CardsRendererProps,
  TabsRendererProps,
  Route,
} from 'react-router-navigation-core'

// https://github.com/react-navigation/react-navigation/blob/214eeb13fba1a26d47165b3cf21958e3e414fef3/flow/react-navigation.js#L209
export type NavigationRouter = *

// https://github.com/react-navigation/react-navigation/blob/214eeb13fba1a26d47165b3cf21958e3e414fef3/flow/react-navigation.js#L472
export type NavigationScreenProp = *

export type NavigationLayout = {
  height: Animated.Value,
  initHeight: number,
  initWidth: number,
  isMeasured: boolean,
  width: Animated.Value,
}

export type NavigationTransitionProps = {
  layout: NavigationLayout,
  navigation: NavigationScreenProp,
  position: Animated.Value,
  progress: Animated.Value,
  scenes: Array<NavigationScene>,
  scene: NavigationScene,
  index: number,
}
export type NavigationTransitionSpec = {
  duration?: number,
  easing?: (t: number) => number,
  timing?: (value: Animated.Value, config: *) => *,
}

export type NavigationScene = {
  index: number,
  isActive: boolean,
  isStale: boolean,
  key: string,
  route: Route,
}

export type NavigationHeaderProps = NavigationTransitionProps & { router: NavigationRouter }

export type CardProps = RouteProps &
  NavBarProps<NavigationProps & CardsRendererProps & NavigationHeaderProps>

export type NavBarProps<T> = {
  // General
  hideNavBar?: boolean,
  renderNavBar?: (props: T) => ?React$Element<*>,
  navBarStyle?: StyleObj,
  // Left button
  hideBackButton?: boolean,
  backButtonTintColor?: string,
  backButtonTitle?: string,
  renderLeftButton?: (props: T) => ?React$Element<*>,
  // Title
  title?: string,
  titleStyle?: StyleObj,
  renderTitle?: (props: T) => ?React$Element<*>,
  // Right button
  renderRightButton?: (props: T) => ?React$Element<*>,
}

export type NavigationProps = NavBarProps<
  NavigationProps & CardsRendererProps & NavigationHeaderProps,
> & {
  mode?: 'card' | 'modal',
  cardStyle?: StyleObj,
  configureTransition?: (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: ?NavigationTransitionProps,
  ) => NavigationTransitionSpec,
  onTransitionStart?: (...args: Array<mixed>) => void,
  onTransitionEnd?: (...args: Array<mixed>) => void,
  gesturesEnabled?: boolean,
}

export type Card = CardProps & { key: string }

export type TabRoute = Route & { title?: string, testID?: string }

export type TabBarProps<T> = {
  hideTabBar?: boolean,
  renderTabBar?: (
    props: T & { onTabPress: (scene: Scene<TabRoute>) => void },
  ) => ?React$Element<*>,
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
  style?: StyleObj,
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
