/* @flow */

import React, { Component, createElement } from 'react'
import { StatusBar, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabView from './../TabView'
import { getCurrentRoute } from './../../helpers/utils'
import type { NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    if (sceneProps.scene.route.tabs) {
      return null
    }
    return (
      <NavBar
        pop={this.props.pop}
        {...sceneProps}
      />
    )
  }

  renderScene = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    const { component, tabs } = sceneProps.scene.route
    return tabs
      ? this.renderTabs(sceneProps)
      : createElement(component)
  }

  renderTabs = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    const { component, routes } = sceneProps.scene.route
    return (
      <TabView
        renderTab={(index) => this.renderTab(index, sceneProps)}
        renderTabsContainer={component}
        onChange={this.props.changeTab}
        children={routes}
        {...sceneProps}
      />
    )
  }

  renderTab = (index: number, sceneProps: NavigationTransitionProps): React$Element<any> => {
    const navigationState = sceneProps.scene.route.routes[index]
    return (
      <CardStack
        navigationState={navigationState}
        pop={this.props.pop}s
        renderScene={this.renderScene}
        renderOverlay={this.renderNavBar}
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
          renderOverlay={this.renderNavBar}
        />
      </View>
    )
  }

}

export default Navigation
