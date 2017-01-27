/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental, Animated, StyleSheet, Platform, Dimensions } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Cards } from './CardTypeDefinitions'
import BackButton from './BackButton'
import { getCurrentCard } from './utils'

const { Header: NavigationHeader } = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: Dimensions.get('window').width,
    backgroundColor: '#fafafa',
    borderBottomColor: '#b2b2b2',
  },
})

// @TODO $FlowFixMe
type Props = NavigationSceneRendererProps & {
  cards: Cards,
  onNavigateBack: Function,
}

class NavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (): ?React$Element<any> => {
    // Remove back button for fist scene
    const { scene, onNavigateBack, cards } = this.props
    if (scene.index === 0 || !onNavigateBack) return null
    // Render custom renderLeftComponent component
    const currentCard = getCurrentCard(scene.route, cards)
    if (currentCard && currentCard.renderLeftComponent) {
      return currentCard.renderLeftComponent(this.props)
    }
    // Else return default back button
    return (
      <BackButton
        {...this.props}
        onPress={onNavigateBack}
      />
    )
  }

  renderTitleComponent = (): ?React$Element<any> => {
    const { cards, scene } = this.props
    const currentCard = getCurrentCard(scene.route, cards)
    if (!currentCard || !currentCard.title) return null
    return (
      <NavigationHeader.Title textStyle={currentCard.titleStyle}>
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

    // Hides the navigation bar if needed
    const { scene, cards } = this.props
    const currentCard = getCurrentCard(scene.route, cards)
    if (!currentCard || currentCard.hideNavBar) return null

    // Return <NavigationHeader /> (NavigationExperimental)
    // with this.props
    return (
      <NavigationHeader
        {...sceneProps}
        style={[
          styles.container,
          currentCard.navBarStyle,
        ]}
        renderLeftComponent={this.renderLeftComponent}
        renderTitleComponent={this.renderTitleComponent}
      />
    )
  }

}

export default NavBar
