/* @flow */

import React, { createElement, Component } from 'react'
import { NavigationExperimental } from 'react-native'
import BackButton from './../BackButton'
import type { NavigationSceneProps } from './../../types'
import styles from './styles'

const {
  Header: NavigationHeader,
} = NavigationExperimental

type Props = NavigationSceneProps & {
  pop: (callback?: Function) => void,
}

class NavBar extends Component {

  props: Props

  renderTitleComponent = (): React$Element<any> | null => {
    const { scene, scenes } = this.props
    const { component } = scene.route

    const titleStyle = scenes
      .map(({ route }) => route.component)
      .reduce((sceneA, sceneB) => ({
        ...sceneA.titleStyle,
        ...sceneB.titleStyle,
      }))

    const renderTitle = scenes
      .map(({ route }) => route.component.renderTitle)
      .reverse()
      .find((_renderTitle) => _renderTitle)

    if (component.title) {
      if (renderTitle) {
        return createElement(renderTitle, {
          title: component.title,
          titleStyle,
        })
      }
      return (
        <NavigationHeader.Title textStyle={titleStyle}>
          {component.title}
        </NavigationHeader.Title>
      )
    }

    return null
  }

  renderBackButton = (props: NavigationSceneProps): React$Element<any> | null => {
    const { route } = props.scene
    const { hideBackButton } = route.component
    if (props.scene.index === 0 || !this.props.pop || hideBackButton) {
      return null
    }
    return (
      <BackButton
        {...props}
        onPress={this.props.pop}
      />
    )
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.scene.route.key !== this.props.scene.route.key
  }

  render() {
    const { component } = this.props.scene.route
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this.renderTitleComponent}
        renderLeftComponent={this.renderBackButton}
        style={[styles.container, component.navBarStyle]}
      />
    )
  }

}

export default NavBar
