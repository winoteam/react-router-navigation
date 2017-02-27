/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, cloneElement } from 'react'
import { NativeModules, StyleSheet, Platform, View } from 'react-native'
import { Transitioner } from 'react-navigation'
import Card from 'react-navigation/src/views/Card'
import CardStackPanResponder from 'react-navigation/src/views/CardStackPanResponder'
import TransitionConfigs from 'react-navigation/src/views/TransitionConfigs'
import type { TransitionConfig } from 'react-navigation/src/views/TransitionConfigs'
import type { NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type { CardRendererProps } from './TypeDefinitions'

const NativeAnimatedModule = NativeModules && NativeModules.NativeAnimatedModule

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  scenes: {
    flex: 1,
  },
})

type SceneRendererProps =
  & CardRendererProps
  & NavigationTransitionProps

type Props = CardRendererProps & {
  renderScene: (props: SceneRendererProps) => ?React$Element<any>,
  renderHeader: (props: SceneRendererProps) => ?React$Element<any>,
}

type State = {
  isTransitioning: boolean,
  index: number,
}

class Navigation extends Component<void, Props, State> {

  props: Props

  state: State = {
    isTransitioning: false,
    index: 0,
  }

  configureTransition = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps
  ) => {
    return {
      ...this.getTransitionConfig(
        transitionProps,
        prevTransitionProps
      ).transitionSpec,
      useNativeDriver: !!NativeAnimatedModule,
    }
  }

  getTransitionConfig = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps
  ): TransitionConfig => {
    return TransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps,
      false,
    )
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
  }

  renderInnerCard = (props: SceneRendererProps): ?React$Element<any> => {
    const { scene, index } = props
    // Get card state
    if (scene && scene.isActive && index !== this.state.index) {
      this.state.index = index
      this.state.isTransitioning = true
    }
    const cardState = {
      isFocused: scene.isActive,
      isTransitioning: this.state.isTransitioning,
    }
    // Build scene view
    const SceneView = this.props.renderScene(props)
    if (!SceneView) return null
    // Render card
    if (Platform.OS === 'android') {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'android' && this.props.renderHeader(props)}
          {cloneElement(SceneView, cardState)}
        </View>
      )
    }
    return cloneElement(SceneView, cardState)
  }

  renderCard = (props: SceneRendererProps): React$Element<any> => {
    // @TODO $FlowFixMe
    const { screenInterpolator } = this.getTransitionConfig()
    const style = screenInterpolator && screenInterpolator(props)
    const panHandlersProps = {
      ...props,
      onNavigateBack: props.onNavigateBack,
    }
    const panHandlers = Platform.OS === 'ios'
      ? CardStackPanResponder.forHorizontal(panHandlersProps)
      : null
    return (
      <Card
        {...props}
        key={`card_${props.scene.key}`}
        panHandlers={panHandlers}
        renderScene={() => this.renderInnerCard(props)}
        style={style}
      />
    )
  }

  renderView = (props: SceneRendererProps): React$Element<any> => {
    // Build floatingHeader
    const floatingHeader = Platform.OS === 'ios'
      ? this.props.renderHeader(props)
      : null
    // (perf) Remove scenes with same index or staled scene
    const scenes = props.scenes.filter((scene, i) => {
      return !props.scenes.slice(i + 1).find(({ index }) => {
        return scene.index === index
      })
    })
    // Render all scenes with floatingHeader
    return (
      <View style={styles.container}>
        <View style={styles.scenes}>
          {scenes.map((scene, index) => this.renderCard({
            ...props,
            scene,
            index,
          }))}
        </View>
        {floatingHeader}
      </View>
    )
  }

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Transitioner
        configureTransition={this.configureTransition}
        navigation={{ state: navigationState }}
        onTransitionEnd={this.onTransitionEnd}
        render={(ownProps) => this.renderView({ ...this.props, ...ownProps })}
      />
    )
  }

}

export default Navigation
