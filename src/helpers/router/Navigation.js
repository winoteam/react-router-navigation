/* @flow */

import React, { Component, createElement } from 'react'
import { NavigationExperimental, BackAndroid, Platform, View } from 'react-native'
import NavBar from '@components/NavBar'
import CardStack from './CardStack'

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental

class Navigation extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.back()
      return true
    })
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress')
  }

  back = (): void => {
    this.props.onNavigate({ type: 'pop' })
  }

  renderNavBar = (sceneProps: Object): ReactElement<any> | null => {
    if (Platform.OS == 'ios') {
      return (
        <NavBar
          onNavigate={this.props.onNavigate}
          {...sceneProps}
        />
      )
    }
    return null
  }

  renderScene = (sceneProps: Object): ReactElement<any> => {
    const scene = sceneProps.scene
    const route = scene.route
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS == 'android' &&
          <NavBar
            onNavigate={(action) => this.props.onNavigate(action)}
            {...sceneProps}
          />
        }
        {route.component
           ? createElement(route.component)
           : null
        }
      </View>
    )
  }

  render() {
    const { appNavigationState } = this.props
    const scenes = appNavigationState
    return (
      <View style={{ flex: 1 }}>
        <CardStack
          direction={Platform.OS == 'android' ? 'vertical' : 'horizontal'}
          navigationState={scenes}
          onNavigateBack={this.back}
          renderOverlay={(sceneProps) => this.renderNavBar(sceneProps)}
          renderScene={(sceneProps) => this.renderScene(sceneProps)}
        />
      </View>
    )
  }

}

export default Navigation
