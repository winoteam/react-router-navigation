/* @flow */

import React, { Component } from 'react'
import { Navigator } from 'react-native'
import type { NavigationState } from './../types'

type Props = {
  navigationState: NavigationState,
}

type State = {
  currentRouteIndex: number,
}

class TabViewPagerNavigator extends Component<void, Props, State> {

  navigator: any
  props: Props
  state: State

  constructor(props) {
    super(props)
    this.state = { currentRouteIndex: 0 }
  }

  componentWillReceiveProps(nextProps: Props) {
    // Check if navigator must be updated
    const { navigationState } = this.props
    const nextNavigationState = nextProps.navigationState
    if (navigationState.index !== nextNavigationState.index) {
      // Get new route
      const nextRoute = nextNavigationState.routes[nextNavigationState.index]
      const currentRoutes = this.navigator.getCurrentRoutes()
      // Jump without unmounting the current scene
      if (currentRoutes.find((route) => route.key === nextRoute.key)) {
        const { currentRouteIndex } = this.state
        const index = currentRoutes.findIndex((route) => {
          return route.key === nextRoute.key
        })
        // @TODO
        if (currentRouteIndex > index) {
          const nextRouteIndex = currentRouteIndex - index
          this.navigator.jumpBack(nextRouteIndex)
        } else if (currentRouteIndex < index) {
          const nextRouteIndex = index - currentRouteIndex
          this.navigator.jumpForward(nextRouteIndex)
        }
        this.state.currentRouteIndex = index
      } else {
        this.navigator.push(nextRoute)
        this.state.currentRouteIndex += 1
      }
    }
  }

  shouldComponentUpdate(): boolean {
    return false
  }

  render(): React$Element<any> {
    const { routes, index } = this.props.navigationState
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        initialRoute={routes[index]}
        renderScene={(route) => this.props.renderScene({ route })}
      />
    )
  }

}

export default TabViewPagerNavigator
