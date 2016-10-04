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
import type { NavigationLocation, NavigationState, NavigationSceneProps } from './../../types'

type Props = {
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
    const { navigationState, scenes } = this.props
    const WrappedComponent = scenes.props.component
      ? scenes.props.component
      : ({ children}) => <View style={{ flex: 1 }}>{children}</View>
    return (
      <WrappedComponent>
        <StatusBar
          barStyle={this.getStatusBarStyle()}
        />
        <CardStack
          navigationState={navigationState}
          pop={this.props.pop}
          renderScene={this.renderScene}
          renderHeader={(sceneProps) => this.renderNavBar(sceneProps, this.props.pop)}
        />
      </WrappedComponent>
    )
  }

}

export default Navigation
