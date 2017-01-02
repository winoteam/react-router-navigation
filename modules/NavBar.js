/* @flow */

import React, { Component } from 'react'
import { NavigationExperimental, Animated, StyleSheet, Platform, Dimensions } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card } from './StackTypeDefinitions'
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

type Props = NavigationSceneRendererProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
}

type State = {
  isActive: boolean,
}

class NavBar extends Component<void, Props, State> {

  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    const { cards, scene } = props
    const currentCard = getCurrentCard(scene.route, cards)
    const hideNavBar = currentCard && currentCard.hideNavBar
    this.state = { isActive: !hideNavBar }
  }

  renderLeftComponent = (): ?React$Element<any> => {
    // Remove back button for fist scene
    const { scene, onNavigateBack } = this.props
    if (scene.index === 0 || !onNavigateBack) return null
    // Else simply return it
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
      <NavigationHeader.Title>
        {currentCard.title}
      </NavigationHeader.Title>
    )
  }

  componentWillReceiveProps(nextProps: Props): void {
    const { isActive } = this.state
    const { cards, scene, scenes, navigationState } = nextProps
    const currentCard = getCurrentCard(scene.route, cards)
    if (currentCard && currentCard.hideNavBar) {
      if (isActive) this.setState({ isActive: false })
    } else if (!isActive && scenes.length === navigationState.routes.length) {
      this.setState({ isActive: true })
    }
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
    const { isActive } = this.state
    if (!isActive) return null

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
