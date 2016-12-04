/* @flow */
/* eslint no-unneeded-ternary: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { Platform, StatusBar, Navigator, View } from 'react-native'
import NavBar from './NavBar'
import { getOptions } from './utils'
import type { SceneProps } from './../types'

type Props = SceneProps

class NativeRenderer extends Component<void, Props, void> {

  navigator: any
  props: Props

  componentWillReceiveProps(nextProps: Props): void {
    // Get current scene
    const scene = this.props.scenes.slice(-1)[0]
    // Get next scene to focus
    const nextScene = nextProps.scenes.slice(-1)[0]
    if (scene.key !== nextScene.key) {
      // Push new scene
      if (this.props.scenes.length < nextProps.scenes.length) {
        this.navigator.push(nextScene)
      }
      // Pop a previous scene (n-1)
      else {
        this.navigator.pop()
      }
    }
  }

  renderNavBar = (): React$Element<any> => (
    <NavBar {...this.props} />
  )

  renderScene = ({ route }): React$Element<any> => {
    return (
      <View style={{ flex: 1 }}>
        {/* Update status bar */}
        <StatusBar
          backgroundColor={route.statusBarBackgroundColor}
          barStyle={route.statusBarStyle}
        />
        {/* Render component scene */}
        {createElement(
          route.component.props.component,
          { ...getOptions(route), key: route.key },
        )}
        {Platform.OS === 'android' && this.renderNavBar()}
      </View>
    )
  }

  getConfigureScene = ({ sceneConfigTransition }): Object => {
    if (sceneConfigTransition) return sceneConfigTransition
    // Return scene config depended on each guideline
    return Platform.OS === 'android'
      ? Navigator.SceneConfigs.FloatFromBottomAndroid
      : Navigator.SceneConfigs.PushFromRight
  }

  render(): React$Element<any> {
    // Display scenes in native <Navigator />
    return (
      <Navigator
        ref={(c) => this.navigator = c}
        configureScene={(route) => ({
          ...this.getConfigureScene(route),
          gestures: null, // @TODO enable gestures for iOS
        })}
        initialRoute={this.props.scenes[0]}
        renderScene={this.renderScene}
        navigationBar={Platform.OS === 'ios' && this.renderNavBar()}
      />
    )
  }

}

export default NativeRenderer
