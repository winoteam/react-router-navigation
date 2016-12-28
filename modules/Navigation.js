/* @flow */

import React, { createElement } from 'react'
import { NavigationExperimental } from 'react-native'
import CardStack from './CardStack'
import NavBar from './NavBar'

const { CardStack: NavigationCardStack, } = NavigationExperimental

const Navigation = (props: any): React$Element<any> => (
  <CardStack
    {...props}
    render={({ cards, navigationState, onNavigateBack }) => (
      <NavigationCardStack
        navigationState={navigationState}
        onNavigateBack={onNavigateBack}
        renderHeader={(sceneRendererProps) => (
          <NavBar
            {...sceneRendererProps}
            cards={cards}
            onNavigateBack={onNavigateBack}
          />
        )}
        renderScene={({ scene }) => {
          const currentCard = cards.find((card) => scene.route.key === card.key)
          return createElement(currentCard.component || null)
        }}
      />
    )}
  />
)

export default Navigation
