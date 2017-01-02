/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { NavigationExperimental, StyleSheet, Platform, View } from 'react-native'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps } from './StackTypeDefinitions'
import CardStack from './CardStack'
import NavBar from './NavBar'
import NavigationCardStackStyleInterpolator from './NavigationCardStackStyleInterpolator'
import { getCurrentCard } from './utils'

const { CardStack: NavigationCardStack } = NavigationExperimental

const styles = StyleSheet.create({
  scene: { flex: 1 },
})

type SceneRendererProps = NavigationSceneRendererProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
}

type Props = {
  style?: StyleSheet,
  children: Array<React$Element<MatchCardProps>>,
  renderNavBar?: (props: SceneRendererProps) => React$Element<any>
}

class Navigation extends Component<void, Props, void> {

  props: Props

  renderNavBar = (props: SceneRendererProps): React$Element<any> => {
    const { renderNavBar } = this.props
    const { cards, onNavigateBack, ...sceneProps } = props
    return renderNavBar
      ? renderNavBar({ cards, onNavigateBack, ...sceneProps })
      : <NavBar {...{ cards, onNavigateBack, ...sceneProps }} />
  }

  renderScene = (props: SceneRendererProps): ?React$Element<any> => {
    const { cards, scene } = props
    const currentCard = getCurrentCard(scene.route, cards)
    if (!currentCard) return null
    return (
      <View style={styles.scene}>
        {createElement(currentCard.component || currentCard.render)}
        {Platform.OS === 'android' && this.renderNavBar(props)}
      </View>
    )
  }

  render() {
    return (
      <CardStack
        {...this.props}
        render={({ cards, navigationState, onNavigateBack }) => (
          <NavigationCardStack
            style={this.props.style}
            navigationState={navigationState}
            enableGestures={Platform.OS !== 'android'}
            onNavigateBack={onNavigateBack}
            configureTransition={{ duration: Platform.OS === 'ios' ? 250 : 100  /* @TODO */ }}
            cardStyleInterpolator={Platform.OS === 'android'
              ? NavigationCardStackStyleInterpolator.forAndroid
              : NavigationCardStackStyleInterpolator.forIOS
            }
            renderHeader={(props) => Platform.OS === 'ios'
              ? this.renderNavBar({ ...props, onNavigateBack, cards })
              : null
            }
            renderScene={(props) => this.renderScene({ ...props, cards, onNavigateBack })}
          />
        )}
      />
    )
  }

}

export default Navigation
