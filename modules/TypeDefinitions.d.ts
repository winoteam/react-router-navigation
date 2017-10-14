/* @flow */
/* eslint no-use-before-define: 0 */
import { ComponentClass, ReactElement } from 'react'
import { StyleProp, ViewStyle, TextStyle } from 'react-native'
import { RouteComponentProps } from 'react-router'
import {
  NavigationTransitionProps,
  NavigationTransitionSpec,
} from 'react-navigation'

export type Route = {
  key: string
  routeName: string
}

export type NavigationState<OwnRoute> = {
  index: number // $FlowFixMe
  routes: Array<Route & OwnRoute>
}

export type RouteProps<props = {}> = {
  component?: ComponentClass<RouteComponentProps<props>>
  render?: (props: RouteComponentProps<props>) => ValidReactRenderResult
  children?: (props: RouteComponentProps<props>) => ValidReactRenderResult
  path: string
  exact?: boolean
  strict?: boolean
  state?: Object
}

/**
 * Navigation
 */

type ValidReactRenderResult = JSX.Element | null | false

export type NavBarProps = {
  // General
  hideNavBar?: boolean
  renderNavBar?: (props: CardSubViewProps) => ValidReactRenderResult
  navBarStyle?: StyleProp<ViewStyle>
  // Left button
  hideBackButton?: boolean
  backButtonTintColor?: string
  backButtonTitle?: string
  renderLeftButton?: (props: CardSubViewProps) => ValidReactRenderResult
  // Title
  title?: string
  titleStyle?: StyleProp<TextStyle>
  renderTitle?: (props: CardSubViewProps) => ValidReactRenderResult
  // Right button
  renderRightButton?: (props: CardSubViewProps) => ValidReactRenderResult
}

export type NavigationProps = NavBarProps & {
  cardStyle?: StyleProp<ViewStyle>
  configureTransition?: (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps?: NavigationTransitionProps
  ) => NavigationTransitionSpec
  onTransitionStart?: Function
  onTransitionEnd?: Function
}

export type CardProps = RouteProps & NavBarProps

export type Card = CardProps & { key: string }

export type CardsRendererProps = {
  onNavigateBack: Function
  navigationState: NavigationState<{
    path?: string
    params?: Object
  }>
  cards: Array<Card>
}

export type CardSubViewProps = any
// & NavigationSceneRendererProps
// & CardsRendererProps
// & CardProps

/**
 * Tabs
 */

export type TabBarProps = {
  hideTabBar?: boolean
  renderTabBar?: (props: TabSubViewProps) => ValidReactRenderResult | undefined
  tabBarStyle?: StyleSheet
  tabStyle?: StyleSheet
  label?: string
  labelStyle?: StyleSheet
  renderLabel?: (props: TabSubViewProps) => ValidReactRenderResult | undefined
  tabTintColor?: string
  tabActiveTintColor?: string
  // <BottomNavigation /> only:
  renderTabIcon?: (props: TabSubViewProps) => ValidReactRenderResult | undefined
  // <Tabs /> only:
  tabBarPosition?: 'top' | 'bottom'
  tabBarIndicatorStyle?: StyleSheet
}

export type TabsProps = TabBarProps & {
  // <Tabs /> only:
  initialLayout?: { width?: number; height?: number }
  configureTransition?: Function
}

export type TabProps = RouteProps & TabBarProps & { onReset?: Function }

export type Tab = TabProps & { key: string }

export type TabsRendererProps = {
  onRequestChangeTab: (index: number) => void
  navigationState: NavigationState<{
    title?: string
    testID?: string
  }>
  tabs: Array<Tab>
}

export type TabSubViewProps = any
// & SceneRendererProps
// & TabsRendererProps
// & TabBarProps
