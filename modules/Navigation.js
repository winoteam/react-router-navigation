/* @flow */

import React, { createElement } from 'react'
import { NavigationExperimental, StyleSheet, Platform, View } from 'react-native'
import type { Card } from './StackTypeDefinitions'
import CardStack from './CardStack'
import NavBar from './NavBar'
import NavigationCardStackStyleInterpolator from './NavigationCardStackStyleInterpolator'

const { CardStack: NavigationCardStack, } = NavigationExperimental

const styles = StyleSheet.create({
  scene: { flex: 1 },
})

const Navigation = (props: any): React$Element<any> => (
  <CardStack
    {...props}
    render={({ cards, navigationState, onNavigateBack }) => {
      const renderHeader = (sceneRendererProps) => (
        <NavBar
          {...sceneRendererProps}
          cards={cards}
          onNavigateBack={onNavigateBack}
        />
      )
      return (
        <NavigationCardStack
          navigationState={navigationState}
          enableGestures={Platform.OS !== 'android'}
          onNavigateBack={onNavigateBack}
          configureTransition={{ duration: Platform.OS === 'ios' ? 250 : 100 }}
          cardStyleInterpolator={Platform.OS === 'android'
            ? NavigationCardStackStyleInterpolator.forAndroid
            : NavigationCardStackStyleInterpolator.forIOS
          }
          renderHeader={Platform.OS === 'ios' ? renderHeader : () => null}
          renderScene={(sceneRendererProps) => {
            const { scene } = sceneRendererProps
            const currentCard = cards.find((card) => scene.route.key === card.key)
            if (!currentCard) return null
            return (
              <View style={styles.scene}>
                {createElement(currentCard.component)}
                {Platform.OS === 'android' && renderHeader(sceneRendererProps)}
              </View>
            )
          }}
        />
      )
    }}
  />
)

export default Navigation
