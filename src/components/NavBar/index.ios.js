/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental } from 'react-native'
import type { NavigationScene } from '@helpers/router/types'

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
    const { scene } = this.props
    return (
      <NavigationHeader.Title>
        {scene.route.title}
      </NavigationHeader.Title>
    )
  }

  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this.renderTitleComponent}
        onNavigateBack={this.props.pop}
      />
    )
  }

}

export default NavBar
