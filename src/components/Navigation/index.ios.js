/* @flow */
/* eslint-disable react/jsx-indent */

import React, { Component, createElement } from 'react'
import { StatusBar, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabsStack from './../TabsStack'
import { getCurrentRoute } from './../../helpers/utils'
import type { NavigationState, NavigationSceneProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  push: (location: string) => void,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationSceneProps, pop: () => void): React$Element<any> | null => {
    if (!sceneProps.scene.route.tabs) {
      return (
        <NavBar
          pop={pop}
          {...sceneProps}
        />
      )
    }
    return null
  }

  renderScene = (sceneProps: NavigationSceneProps): React$Element<any> => {
    const { component, tabs } = sceneProps.scene.route
    return tabs
      ? this.renderTabsStack(sceneProps)
      : createElement(component, {})
  }

  renderTabsStack = (sceneProps: NavigationSceneProps): React$Element<any> => {
    return (
      <TabsStack
        renderScene={this.renderScene}
        renderOverlay={this.renderNavBar}
        {...sceneProps}
        {...this.props}
      />
    )
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
          renderOverlay={(sceneProps) => this.renderNavBar(sceneProps, this.props.pop)}
        />
      </View>
    )
  }

}

export default Navigation
