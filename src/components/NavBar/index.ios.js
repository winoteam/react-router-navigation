/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental } from 'react-native'
import BackButton from './../BackButton'
import type { NavigationSceneProps } from './../../types'

const {
  Header: NavigationHeader,
} = NavigationExperimental

type Props = NavigationSceneProps & {
  pop: () => void,
}

class NavBar extends Component {

  props: Props

  renderTitleComponent = (): React$Element<any> | null => {
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
        style={component.navBarStyle}
      />
    )
  }

}

export default NavBar
