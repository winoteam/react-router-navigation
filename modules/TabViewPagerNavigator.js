/* @flow */

import React, { Component } from 'react'
import { Navigator, View } from 'react-native'
import type { NavigationState } from './../types'

type Props = {
  navigationState: NavigationState,
}

class TabViewPagerNavigator extends Component<void, Props, void> {

  navigator: any
  props: Props

  componentWillReceiveProps(nextProps: Props) {
    const { navigationState } = this.props
    const nextNavigationState = nextProps.navigationState
    if (navigationState.index !== nextNavigationState.index) {
      const nextRoute = nextNavigationState.routes[nextNavigationState.index]
      // console.log(nextRoute)
      const currentRoutes = this.navigator.getCurrentRoutes()
      if (currentRoutes.find((route) => route.key === nextRoute.key)) {
        this.navigator.pop()
      } else {
        this.navigator.push(nextRoute)
      }
    }
  }

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        initialRoute={navigationState.routes[navigationState.index]}
        renderScene={(route) => this.props.renderScene({ route })}
      />
    )
  }

}

export default TabViewPagerNavigator
