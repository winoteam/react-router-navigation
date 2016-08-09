/* @flow */
/* eslint consistent-return: 0 */
/* eslint no-mixed-operators: 0 */

import React, { Component, createElement } from 'react'
import { BackAndroid, StatusBar, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabsStack from './../TabsStack'
import { getCurrentRoute } from './../../helpers/utils'
import type { NavigationState, NavigationSceneProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
  changeTab: (index: number) => void,
}

class Navigation extends Component {

  props: Props

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.pop()
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  renderScene = (sceneProps: NavigationSceneProps): React$Element<any> => {
    const { component, tabs } = sceneProps.scene.route
    const renderScene = () => (
      <View style={{ flex: 1 }}>
        {createElement(this.renderNavBar, sceneProps)}
        {createElement(component)}
      </View>
    )
    return tabs
      ? this.renderTabsStack(sceneProps)
      : renderScene()
  }

  renderNavBar = (sceneProps: NavigationSceneProps): React$Element<any> | null => {
    const { navigationState } = this.props
    if (navigationState.path.length > 1 && sceneProps.scenes.length < 2) {
      return null
    }
    return (
      <NavBar
        pop={this.props.pop}
        {...sceneProps}
      />
    )
  }

  renderTabsStack = (sceneProps: NavigationSceneProps): React$Element<any> => {
    return (
      <TabsStack
        renderScene={this.renderScene}
        renderHeader={this.renderNavBar}
        {...sceneProps}
        {...this.props}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    const route = getCurrentRoute(nextProps.navigationState)
    if (!route) return '#e0e0e0'
    const backButtonIcon = route && route.component && route.component.statusBarStyle || '#e0e0e0'
    setTimeout(() => {
      StatusBar.setBackgroundColor(backButtonIcon)
    }, 200)
  }

  render() {
    const { navigationState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#e0e0e0"
        />
        <CardStack
          navigationState={navigationState}
          pop={this.props.pop}
          renderScene={this.renderScene}
        />
      </View>
    )
  }

}

export default Navigation
