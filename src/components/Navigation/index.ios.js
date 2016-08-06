/* @flow */
/* eslint-disable react/jsx-indent */

import React, { Component, createElement } from 'react'
import { StatusBar, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import { getCurrentRoute } from './../../helpers/utils'
import type { NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationTransitionProps): React$Element<any> | null => {
    if (!sceneProps.scene.route.tabs) {
      return (
        <NavBar
          pop={this.props.pop}
          {...sceneProps}
        />
      )
    }
    return null
  }

  renderScene = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    const { component } = sceneProps.scene.route
    return createElement(component, {})
  }

  getStatusBarStyle() {
    const route = getCurrentRoute(this.props.navigationState)
    if (!route) return 'default'
    return route && route.component && route.component.statusBarStyle || 'default'
  }

  render() {
    const { navigationState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={this.getStatusBarStyle()}
        />
        <CardStack
          navigationState={navigationState}
          pop={this.props.pop}
          renderScene={this.renderScene}
          renderOverlay={this.renderNavBar}
        />
      </View>
    )
  }

}

export default Navigation
