/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import ReactNative, { StyleSheet, View, Text } from 'react-native'
import CardStack from './CardStack'
import NativeRenderer from './NativeRenderer'
import BackButton from './BackButton'
import { getCurrentCard } from './utils'
import type { CardProps, CardRendererProps } from './TypeDefinitions'

const styles = StyleSheet.create({
  customNavBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    backgroundColor: 'transparent',
  },
  defaultNavBar: {
    backgroundColor: '#fafafa',
    borderBottomWidth: .5,
    borderBottomColor: '#b2b2b2',
  },
  title: {
    fontSize: 17,
    marginTop: 11,
    color: '#030303',
    fontWeight: '600',
  },
})

type Scene = {
  key: string,
}

type Props = {
  children: Array<React$Element<CardProps>>,
}

class Navigator extends Component<void, Props, void> {

  props: Props

  renderScene = (props: CardRendererProps & { scene: Scene }): ?React$Element<any> => {
    const { cards, scene } = props
    const currentCard = getCurrentCard(scene, cards)
    if (!currentCard) return null
    return createElement(currentCard.component || currentCard.render)
  }

  renderNavBar = (props: CardRendererProps): ?React$Element<any> => {
    // Get current card
    const { navigationState, onNavigateBack, cards } = props
    const route = navigationState.routes[navigationState.index]
    const currentCard = getCurrentCard(route, cards)
    // Hide <NavBar />
    if (currentCard && currentCard.hideNavBar) return null
    // Custom <Navbar />
    if (currentCard && currentCard.renderNavBar) {
      return (
        <View style={styles.customNavBar}>
          {currentCard && currentCard.renderNavBar(props)}
        </View>
      )
    }
    // Default <NavBar />
    const LeftButton = (scene, navigator, index) => {
      if (index === 0) return null
      const card = getCurrentCard(scene, cards)
      if (card && card.renderLeftComponent) {
        return card.renderLeftComponent(props)
      }
      return (
        <BackButton
          onPress={onNavigateBack}
          style={card && card.backButtonStyle}
        />
      )
    }
    const Title = (scene) => {
      const card = getCurrentCard(scene, cards)
      return (
        <Text style={[styles.title, card && card.titleStyle]}>
          {card && card.title}
        </Text>
      )
    }
    // @TODO
    const RightButton = () => null
    return (
      <ReactNative.Navigator.NavigationBar
        style={[styles.defaultNavBar, currentCard.navBarStyle]}
        routeMapper={{ LeftButton, Title, RightButton }}
      />
    )
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={(cardRendererProps) => {
          const { cards, onNavigateBack, navigationState } = cardRendererProps
          return (
            <NativeRenderer
              navigationState={navigationState}
              cards={cards}
              onNavigateBack={onNavigateBack}
              renderScene={(scene) => this.renderScene({ ...cardRendererProps, scene })}
              renderNavBar={() => this.renderNavBar(cardRendererProps)}
            />
          )
        }}
      />
    )
  }

}

export default Navigator
