/* @flow */

import React, { Component, createElement } from 'react'
import { BackAndroid, View } from 'react-native'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import type { NavigationState, NavigationSceneRendererProps } from './types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
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

  renderScene = (sceneProps: NavigationSceneRendererProps): ReactElement<any> => {
    const { route } = sceneProps.scene
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          pop={this.props.pop}
          {...sceneProps}
        />
        {createElement(route.component)}
      </View>
    )
  }

  render() {
    const { navigationState, pop } = this.props
    return (
      <CardStack
        navigationState={navigationState}
        pop={pop}
        renderScene={this.renderScene}
      />
    )
  }

}

export default Navigation
