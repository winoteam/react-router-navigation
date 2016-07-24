/* @flow */

import React, { Component, createElement } from 'react'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import type { NavigationSceneRendererProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationSceneRendererProps): ReactElement<any> | null => {
    return (
      <NavBar
        pop={this.props.pop}
        {...sceneProps}
      />
    )
  }

  renderScene = (sceneProps: NavigationSceneRendererProps): ReactElement<any> => {
    const { route } = sceneProps.scene
    return route.component
      ? createElement(route.component)
      : null
  }

  render() {
    const { navigationState } = this.props
    return (
      <CardStack
        navigationState={navigationState}
        pop={this.props.pop}
        renderScene={this.renderScene}
        renderOverlay={this.renderNavBar}
      />
    )
  }

}

export default Navigation
