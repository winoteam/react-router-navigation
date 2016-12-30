/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental, Animated, StyleSheet, Platform, Dimensions } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card } from './StackTypeDefinitions'
import BackButton from './BackButton'

const { Header: NavigationHeader } = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: Dimensions.get('window').width,
  },
})

type Props = NavigationSceneRendererProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
}

class NavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (): ?React$Element<any> => {
    // Remove back button for fist scene
    const { scene, onNavigateBack } = this.props
    if (scene.index === 0 || !onNavigateBack) return null
    // Else simply return ut
    return (
      <BackButton
        {...this.props}
        onPress={onNavigateBack}
      />
    )
  }

  renderTitleComponent = (): ?React$Element<any> => {
    const { cards, scene } = this.props
    const currentCard = cards.find((card) => card.key === scene.route.key)
    if (!currentCard || !currentCard.title) return null
    return (
      <NavigationHeader.Title>
        {currentCard.title}
      </NavigationHeader.Title>
    )
  }

  // Accept updates only for iOS
  shouldComponentUpdate(): boolean {
    return Platform.OS === 'ios'
  }

  render(): ?React$Element<any> {
    // Build scene props
    const sceneProps = {
      ...this.props,
      position: Platform.OS === 'ios'
        ? this.props.position
        : new Animated.Value(this.props.navigationState.index),
    }

    // Else return <NavigationHeader /> (NavigationExperimental)
    // with this.props
    return (
      <NavigationHeader
        {...sceneProps}
        style={styles.container}
        renderLeftComponent={this.renderLeftComponent}
        renderTitleComponent={this.renderTitleComponent}
      />
    )
  }

}

export default NavBar
