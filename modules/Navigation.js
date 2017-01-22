/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { NavigationExperimental, StyleSheet, Platform, NativeModules, View } from 'react-native'
import type { NavigationSceneRendererProps, NavigationAnimatedValue } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps } from './StackTypeDefinitions'
import CardStack from './CardStack'
import NavBar from './NavBar'
import NavigationCardStackStyleInterpolator from './NavigationCardStackStyleInterpolator'
import { getCurrentCard } from './utils'

const { Card: NavigationCard } = NavigationExperimental
const { CardStackPanResponder: NavigationCardStackPanResponder } = NavigationCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    overflow: 'hidden',
  },
  scenes: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
})

type SceneRendererProps = NavigationSceneRendererProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
}

type Props = {
  style?: StyleSheet,
  children: Array<React$Element<MatchCardProps>>,
  configureTransition?: Object,
  renderNavBar?: (props: SceneRendererProps) => React$Element<any>
}

type DefaultProps = {
  configureTransition: () => ({
    duration?: number,
    easing?: () => any,
    timing?: (value: NavigationAnimatedValue, config: any) => any,
    useNativeDriver?: boolean,
  }),
}

type State = {
  isTransitioning: boolean,
  index: number,
}

class Navigation extends Component<DefaultProps, Props, State> {

  props: Props
  state: State = {
    isTransitioning: false,
    index: 0,
  }

  static defaultProps: DefaultProps = {
    configureTransition: () => ({
      duration: Platform.OS === 'ios' ? 250 : 100,
      useNativeDriver: !!NativeModules.NativeAnimatedModule && Platform.OS === 'android',
    }),
  }

  renderNavBar = (props: SceneRendererProps): React$Element<any> => {
    const { renderNavBar } = this.props
    const { cards, onNavigateBack, ...sceneProps } = props
    return renderNavBar
      ? renderNavBar({ cards, onNavigateBack, ...sceneProps })
      : <NavBar {...{ cards, onNavigateBack, ...sceneProps }} />
  }

  renderScene = (props: SceneRendererProps, index: number): ?React$Element<any> => {
    const { cards, scene } = props
    // Get card state
    if (scene && scene.isActive && index !== this.state.index) {
      this.state.index = index
      this.state.isTransitioning = true
    }
    const cardState = {
      isFocused: scene.isActive,
      isTransitioning: this.state.isTransitioning,
    }
    // Get style and pan handlers
    const styleInterpolator = Platform.OS === 'android'
      ? NavigationCardStackStyleInterpolator.forAndroid(props)
      : NavigationCardStackStyleInterpolator.forIOS(props)
    const panHandlers = Platform.OS === 'ios'
      ? NavigationCardStackPanResponder.forVertical(props)
      : null
    // Render card
    const currentCard = getCurrentCard(scene.route, cards)
    if (!currentCard) return null
    return (
      <NavigationCard
        {...props}
        key={scene.key}
        panHandlers={panHandlers}
        renderScene={() => (
          <View style={styles.scene}>
            {createElement(
              currentCard.component || currentCard.render,
              cardState
            )}
            {Platform.OS === 'android' && this.renderNavBar(props)}
          </View>
        )}
        style={[styleInterpolator, this.props.cardStyle]}
      />
    )
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        configureTransition={this.props.configureTransition}
        onTransitionStart={this.onTransitionStart}
        onTransitionEnd={this.onTransitionEnd}
        render={(props) => (
          <View style={styles.container}>
            <View style={styles.scenes}>
              {props.scenes.map((scene) => this.renderScene({
                ...props,
                scene,
              }))}
            </View>
            {Platform.OS === 'ios' && this.renderNavBar(props)}
          </View>
        )}
      />
    )
  }

}

export default Navigation
