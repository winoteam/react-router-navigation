/* @flow */

export type NavigationRoute = {
  key: string,
  title?: string,
  component: React$Element<any>,
}

export type NavigationScene = {
  index: number,
  isActive: boolean,
  isStale: boolean,
  key: string,
  route: NavigationRoute,
};

export type NavigationState = {
  index: number,
  routes: Array<NavigationRoute>,
}

export type NavigatationAction = ({
  type: string,
}) => void

export type NavigationRouter = {
  push: (location: string) => void,
  pop: () => void,
}

export type NavigationTransitionProps = {
  navigationState: NavigationState,
  scene: NavigationScene,
}

export type NavigationScenes = Array<NavigationRoute>
