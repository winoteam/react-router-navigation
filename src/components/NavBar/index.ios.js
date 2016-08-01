/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental } from 'react-native'
import BackButton from './../BackButton'
import type { NavigationScene } from './../../types'

const {
  Header: NavigationHeader,
} = NavigationExperimental

type Props = {
  pop: () => void,
  scene: NavigationScene,
}

class NavBar extends Component {

  props: Props

  renderTitleComponent = (): React$Element<any> => {
    const { component } = this.props.scene.route
    if (component.title) {
      return (
        <NavigationHeader.Title textStyle={component.titleStyle}>
        {component.title}
        </NavigationHeader.Title>
      )
    }
    return null
  }

  renderBackButton = (): React$Element<any> => {
    const { index, route } = this.props.scene
    const { hideBackButton } = route.component
    if (this.props.scene.index === 0 || !this.props.pop || hideBackButton) {
      return null
    }
    return (
      <BackButton
        {...this.props}
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
        style={component.navBarStyle}
      />
    )
  }

}

export default NavBar
