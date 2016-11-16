/* @flow */

import type React from 'react'
import { Animated } from 'react-native'

export type AnimatedValue = Animated.Value

export type Route = {
  key: string,
  title?: string,
}

export type NavigationState = {
  index: number,
  routes: Array<Route>,
}

export type Layout = {
  height: AnimatedValue,
  initHeight: number,
  initWidth: number,
  isMeasured: boolean,
  width: AnimatedValue,
}

export type Scene = {
  index: number,
  isActive: boolean,
  isStale: boolean,
  key: string,
  route: Route,
}

export type TransitionProps = {
  // The layout of the transitioner of the scenes.
  layout: Layout,

  // The navigation state of the transitioner.
  navigationState: NavigationState,

  // The progressive index of the transitioner's navigation state.
  position: AnimatedValue,

  // The value that represents the progress of the transition when navigation
  // state changes from one to another. Its numberic value will range from 0
  // to 1.
  //  progress.__getAnimatedValue() < 1 : transtion is happening.
  //  progress.__getAnimatedValue() == 1 : transtion completes.
  progress: AnimatedValue,

  // All the scenes of the transitioner.
  scenes: Array<Scene>,

  // The active scene, corresponding to the route at
  // `navigationState.routes[navigationState.index]`.
  scene: Scene,

  // The gesture distance for `horizontal` and `vertical` transitions
  gestureResponseDistance?: ?number,
}

// Similar to `TransitionProps`, except that the prop `scene`
// represents the scene for the renderer to render.
export type SceneProps = TransitionProps

export type TransitionSpec = {
  duration?: number,
  // An easing function from `Easing`.
  easing?: () => any,
  // A timing function such as `Animated.timing`.
  timing?: (value: AnimatedValue, config: any) => any,
}

export type AnimationSetter = (
  position: AnimatedValue,
  newState: NavigationState,
  lastState: NavigationState,
) => void

export type SceneRenderer = (
  props: SceneProps,
) => ?React.Element<any>

export type StyleInterpolator = (
  props: SceneProps,
) => Object

export type Location = {
  hash: string,
  key?: string,
  pathname: string,
  search: string,
  state?: string,
}

/* @TODO to complete ... */
export type History = {
  action: 'POP' | 'PUSH',
  block: Function,
  canGo: Function,
  entries: Array<Location>,
  go: (n: number) => void,
  goBack: Function,
  goForward: Function,
  index: number,
  length: number,
  listen: Function,
  location: Location,
  push: (to: string) => void,
  replace: (to: string) => void,
}

/* @TODO to complete ... */
export type Match = {
  addMatch: Function,
  matches: Array<any>,
  parent?: string,
  removeMatch: Function,
  serverRouterIndex?: number,
  subscribe: Function,
}

/* @TODO to complete ... */
export type Router = {
  transitionTo: (pathname: string) => void,
}
