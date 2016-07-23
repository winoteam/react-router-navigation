/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental } from 'react-native'
import type {
  NavigationAction, NavigateState, NavigationRoute
} from '@helpers/router/types'

const {
  Header: NavigationHeader,
} = NavigationExperimental

type Props = {
  onNavigate: Navigate,
  navigationState: NavigateState,
  scenes: NavigationRoute,
}

class NavBar extends Component {

  props: Props

  onBack = (): void => {
    this.props.onNavigate({ type: 'pop' })
  }

  renderTitleComponent = (): React$Element<any> => {
    return (
      <NavigationHeader.Title>
        {this.props.scene.route.key}
      </NavigationHeader.Title>
    )
  }

  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={() => this.renderTitleComponent()}
        onNavigateBack={() => this.onBack()}
      />
    )
  }

}

export default NavBar
