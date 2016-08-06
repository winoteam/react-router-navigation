/* @flow */

import React, { Component, createElement } from 'react'
import { BackAndroid, StatusBar, View } from 'react-native'
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

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.pop()
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  renderScene = (sceneProps: NavigationTransitionProps): React$Element<any> => {
    const { component } = sceneProps.scene.route
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          pop={this.props.pop}
          {...sceneProps}
        />
        {createElement(component)}
      </View>
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
