/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental, Animated, StyleSheet, Platform, Dimensions } from 'react-native'
import BackButton from './BackButton'
import type { SceneProps } from './../types'

const { Header: NavigationHeader } = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: Dimensions.get('window').width,
  },
})

type Props = SceneProps & {
  onNavigateBack: () => void,
}

class NavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (): ?React$Element<any> => {
    const { scene, onNavigateBack } = this.props
    // Remove back button for fist scene
    if (scene.index === 0 || !onNavigateBack) return null
    return (
      <BackButton
        {...this.props}
        onPress={onNavigateBack}
      />
    )
  }

  renderTitleComponent = (): React$Element<any> => {
    const { route } = this.props.scene
    return (
      <NavigationHeader.Title
        textStyle={route.titleStyle}
        children={route.title}
      />
    )
  }

  shouldComponentUpdate(): boolean {
    // Accept updates only for iOS
    return Platform.OS === 'ios'
  }

  render(): ?React$Element<any> {
    // Build scene props
    const sceneProps = {
      ...this.props,
      position: new Animated.Value(0),
    }

    // Extract current route
    const { route } = this.props.scene

    // If route contains hideNavBar option, return null
    if (route.hideNavBar) return null

    // Else return <NavigationHeader /> (NavigationExperimental)
    // with this.props
    return (
      <NavigationHeader
        {...sceneProps}
        style={[styles.container, route.navBarStyle]}
        renderLeftComponent={this.renderLeftComponent}
        renderTitleComponent={this.renderTitleComponent}
      />
    )
  }

}

export default NavBar
