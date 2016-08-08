/* @flow */

import { Animated } from 'react-native'

export type NavigationRoute = {
  key: string,
  component: () => React$Element<any> & {
    title?: string,
  },
  tabs?: boolean,
  children?: any,
  routes?: Array<NavigationRoute>,
}

export type NavigationTabs = Array<NavigationRoute>

export type NavigationScene = {
  component: () => React$Element<any>,
}

export type NavigationState = {
  index: number,
  path: string,
  routes: Array<NavigationRoute>,
}

export type NavigationAction = {
  type: string,
} & any

export type NavigationSceneProps = {}

export type NavigationContext = {
  router: {
    push: (key: string) => void,
    pop: () => void,
  },
}

export type NavigationAnimatedValue = Animated.Value

export type NavigationLayout = {
  height: NavigationAnimatedValue,
  initHeight: number,
  initWidth: number,
  isMeasured: boolean,
  width: NavigationAnimatedValue,
}

export type NavigationSceneProps = {
  layout: NavigationLayout,
  navigationState: NavigationState,
  position: NavigationAnimatedValue,
  progress: NavigationAnimatedValue,
  scenes: Array<NavigationScene>,
  scene: {
    component: () => React$Element<any>,
    index: number,
    isActive: boolean,
    isStale: boolean,
    key: string,
    route: NavigationRoute,
  },
  gestureResponseDistance?: ?number,
}
