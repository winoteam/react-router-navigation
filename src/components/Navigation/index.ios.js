/* @flow */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint no-mixed-operators: 0 */

import React, { Component, createElement } from 'react'
import { StatusBar, View } from 'react-native'
import StaticContainer from 'react-static-container'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabStack from './../TabStack'
import { getCurrentRoute } from './../../utils'
import type { NavigationScene, NavigationLocation, NavigationState, NavigationSceneProps } from './../../types'

type Props = {
  children?: Array<React$Element<NavigationScene>>,
  scenes?: Array<React$Element<NavigationScene>>,
  navigationState: NavigationState,
  push: (location: NavigationLocation, callback: Function) => void,
  pop: (callback: Function) => void,
  replace: (location: NavigationLocation, callback: Function) => void,
  reset: (callback: Function) => void,
  changeTab: (index: number, callback: Function) => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationSceneProps, pop: (callback?: Function) => void): React$Element<any> | null => {
    if (!sceneProps.scene.route.tabs && !sceneProps.scene.route.component.hideNavBar) {
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
    const currentRoute = getCurrentRoute(this.props.navigationState)
    const isActive = sceneProps.scene.route.key === currentRoute.key
    return tabs
      ? this.renderTabStack(sceneProps)
      : <StaticContainer shouldUpdate={isActive}>
          {createElement(component, { ...sceneProps, isActive })}
        </StaticContainer>
  }

  renderTabStack = (sceneProps: NavigationSceneProps): React$Element<any> => {
    return (
      <TabStack
        {...sceneProps}
        {...this.props}
        renderScene={this.renderScene}
        renderHeader={this.renderNavBar}
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
    const style = { flex: 1 }
    const WrapperComponent = this.props.children
      ? this.props.children.props.component
      : this.props.scenes.props.component
    return createElement(
      WrapperComponent || View,
      { style },
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={this.getStatusBarStyle()}
        />
        <CardStack
          navigationState={navigationState}
          pop={this.props.pop}
          renderScene={this.renderScene}
          renderHeader={(sceneProps) => this.renderNavBar(sceneProps, this.props.pop)}
        />
      </View>
    )
  }

}

export default Navigation
