/* @flow */

import React, { Component, createElement } from 'react'
import { StatusBar, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabView from './../TabView'
import styles from './styles'
import type { NavigationState, NavigationTransitionProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationTransitionProps): React$Element<any> => {
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
    const { component, children } = sceneProps.scene.route
    return (
      <TabView
        renderContainer={component}
        renderScene={this.renderScene}
        renderOverlay={this.renderNavBar}
        onChange={this.props.changeTab}
        navigationState={this.props.navigationState}
        pop={this.props.pop}
        children={children}
      />
    )
  }

  getStatusBarStyle() {
    // const route = getCurrentRoute(this.props.navigationState)
    // return route.component && route.component.statusBarStyle || 'default'
    return 'default'
  }

  render() {
    const { navigationState } = this.props
    return (
      <View style={styles.container}>
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
