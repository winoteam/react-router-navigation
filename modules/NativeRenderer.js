/* @flow */
/* eslint no-unneeded-ternary: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { Platform, StatusBar, Navigator, View } from 'react-native'
import NavBar from './NavBar'
import type { SceneProps } from './../types'

type Props = SceneProps

class NativeRenderer extends Component<void, Props, void> {

  navigator: any
  props: Props

  componentWillReceiveProps(nextProps: Props): void {
    const scene = this.props.scenes.slice(-1)[0]
    const nextScene = nextProps.scenes.slice(-1)[0]
    if (scene.key !== nextScene.key) {
      if (this.props.scenes.length < nextProps.scenes.length) {
        this.navigator.push(nextScene)
      } else {
        this.navigator.pop()
      }
    }
  }

  renderScene = ({ route }): React$Element<any> => (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={route.statusBarBackgroundColor}
        barStyle={route.statusBarStyle}
      />
      {createElement(
        route.component.props.component,
        { ...route, key: route.key },
      )}
      {Platform.OS === 'android' && <NavBar {...this.props} />}
    </View>
  )

  getConfigureScene = ({ sceneConfigTransition }): Object => {
    if (sceneConfigTransition) return sceneConfigTransition
    return Platform.OS === 'android'
      ? Navigator.SceneConfigs.FloatFromBottomAndroid
      : Navigator.SceneConfigs.PushFromRight
  }

  render(): React$Element<any> {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          ref={(c) => this.navigator = c}
          configureScene={(route) => ({
            ...this.getConfigureScene(route),
            gestures: null,
          })}
          initialRoute={this.props.scenes[0]}
          renderScene={this.renderScene}
        />
        {Platform.OS === 'ios' && <NavBar {...this.props} />}
      </View>
    )
  }

}

export default NativeRenderer
