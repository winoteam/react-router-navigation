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
    const { scenes } = this.props

    const component = scenes
      .find((scene) => scene.isActive)
      .route.component
    const { title, titleStyle, renderTitle } = component

    if (component.title) {
      if (renderTitle) {
        return createElement(renderTitle, {
          title, titleStyle,
        })
      }
      return (
        <NavigationHeader.Title textStyle={titleStyle}>
          {title}
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
    return (
      nextProps.navigationState.index !== this.props.navigationState.index ||
      nextProps.navigationState.key !== this.props.navigationState.key
    )
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
