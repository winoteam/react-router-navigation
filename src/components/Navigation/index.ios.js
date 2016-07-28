/* @flow */

import React, { Component, createElement } from 'react'
import NavBar from './../NavBar'
import CardStack from './../CardStack'
import TabView from './../TabView'
import type { NavigationState, NavigationSceneRendererProps } from './../../types'

type Props = {
  navigationState: NavigationState,
  pop: () => void,
}

class Navigation extends Component {

  props: Props

  renderNavBar = (sceneProps: NavigationSceneRendererProps): React$Element<any> | null => {
    const { tabs } = sceneProps.scene.route
    return tabs
      ? null
      : <NavBar
          pop={this.props.pop}
          {...sceneProps}
        />
  }

  renderScene = (sceneProps: NavigationSceneRendererProps): React$Element<any> => {
    const { component, tabs } = sceneProps.scene.route
    return tabs
      ? this.renderTabs(sceneProps)
      : createElement(component)
  }

  renderTabs = (sceneProps: NavigationSceneRendererProps): React$Element<any> => {
    const { children } = sceneProps.scene.route
    return (
      <TabView>
        {children}
      </TabView>
    )
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
