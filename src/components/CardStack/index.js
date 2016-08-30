/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental } from 'react-native'
import type { NavigationState, NavigationSceneProps } from './../../types'
import DefaultRenderer from './../DefaultRenderer'
import styles from './styles'

const {
  Transitioner: NavigationTransitioner,
} = NavigationExperimental

type Props = {
  navigationState: NavigationState,
  renderScene: (sceneProps: NavigationSceneProps) => React$Element<any>,
  renderHeader?: (sceneProps: NavigationSceneProps) => React$Element<any> | null,
}

class CardStack extends Component {

  props: Props

  renderScene = (sceneProps: NavigationSceneProps): React$Element<any> => {
    return (
      <DefaultRenderer
        {...this.props}
        {...sceneProps}
        renderScene={this.props.renderScene}
        renderHeader={this.props.renderHeader}
      />
    )
  }

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.navigationState.index !== nextProps.navigationState.index ||
      this.props.navigationState.key !== nextProps.navigationState.key
    )
  }

  render() {
    return (
      <NavigationTransitioner
        style={styles.container}
        navigationState={this.props.navigationState}
        render={this.renderScene}
      />
    )
  }

}

export default CardStack
