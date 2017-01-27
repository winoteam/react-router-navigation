/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { NavigationExperimental, StyleSheet, Platform, NativeModules, View } from 'react-native'
import type { NavigationSceneRendererProps, NavigationAnimatedValue } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Cards, CardProps } from './CardTypeDefinitions'
import CardStack from './CardStack'
import NavBar from './NavBar'
import NavigationCardStackStyleInterpolator from './NavigationCardStackStyleInterpolator'
import { getCurrentCard } from './utils'

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental

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
  cards: Cards,
  onNavigateBack: Function,
}

type Props = {
  style?: StyleSheet,
  cardStyle?: StyleSheet,
  children: Array<React$Element<CardProps>>,
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

  static defaultProps: DefaultProps = {
    configureTransition: () => ({
      duration: Platform.OS === 'ios' ? 250 : 100,
      useNativeDriver: !!NativeModules.NativeAnimatedModule && Platform.OS === 'android',
    }),
  }

  props: Props

  state: State = {
    isTransitioning: false,
    index: 0,
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
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
    if (!currentCard.component && !currentCard.render) return null
    return (
      <NavigationCard
        {...props}
        key={scene.key}
        panHandlers={panHandlers}
        renderScene={() => (
          <View style={styles.scene}>
            {/* @TODO $FlowFixMe */createElement(
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

  renderView = (props: SceneRendererProps): React$Element<any> => (
    <View style={styles.container}>
      <View style={styles.scenes}>
        {props.scenes.map((scene, index) => {
          return this.renderScene(
            { ...props, scene },
            index,
          )
        })}
      </View>
      {Platform.OS === 'ios' && this.renderNavBar(props)}
    </View>
  )

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={({ navigationState, cards }) => (
          <NavigationTransitioner
            navigationState={navigationState}
            configureTransition={this.props.configureTransition}
            onTransitionEnd={this.onTransitionEnd}
            render={(props) => this.renderView({ ...props, cards })}
          />
        )}
      />
    )
  }

}

export default Navigation
