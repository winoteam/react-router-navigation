/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental, StyleSheet, Platform, Dimensions, View } from 'react-native'
import _ from 'lodash'
import BackButton from './BackButton'
import type { SceneProps } from './../types'

const {
  Header: NavigationHeader,
} = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: Dimensions.get('window').width
  },
})

type Props = SceneProps & {
  onNavigateBack: () => void,
}

class NavBar extends Component<void, Props, void> {

  props: Props
  initialProps: ?Props

  constructor(props: Props): void {
    super(props)
    if (Platform.OS === 'android') {
      this.initialProps = _.cloneDeep([props])[0]
    }
  }

  renderLeftComponent = (): ?React$Element<any> => {
    const { scene, onNavigateBack } = this.props
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
    return Platform.OS === 'ios'
  }

  render(): ?React$Element<any> {
    const sceneProps = Platform.OS === 'ios' ? this.props : this.initialProps
    const { route } = sceneProps.scene
    if (route.hideNavBar) return null
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
