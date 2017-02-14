/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, cloneElement } from 'react'
import { NativeModules, StyleSheet, Platform, View } from 'react-native'
import { Transitioner } from 'react-navigation'
import Card from 'react-navigation/src/views/Card'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import CardStackPanResponder from 'react-navigation/src/views/CardStackPanResponder'
import TransitionConfigs from 'react-navigation/src/views/TransitionConfigs'
import type { TransitionConfig } from 'react-navigation/src/views/TransitionConfigs'
import type { NavigationTransitionProps, NavigationScene } from 'react-navigation/src/TypeDefinitions'
import type { NavigationProps, CardRendererProps } from './TypeDefinitions'

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

type SceneRendererProps = CardRendererProps & NavigationTransitionProps

type Props = NavigationProps & {
  renderScene: (props: SceneRendererProps & { scene: NavigationScene }) => ?React$Element<any>,
  renderNavBar: (props: SceneRendererProps) => ?React$Element<any>,
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
    const transitionSpec = {
      ...this.getTransitionConfig(
        transitionProps,
        prevTransitionProps
      ).transitionSpec,
    }
    if (
       !!NativeAnimatedModule
       && CardStackStyleInterpolator.canUseNativeDriver()
    ) {
      transitionSpec.useNativeDriver = true
    }
    return transitionSpec
  }

  getTransitionConfig = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps
  ): TransitionConfig => {
    return TransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps,
    )
  }

  onTransitionEnd = (): void => {
    this.setState({ isTransitioning: false })
  }

  renderInnerCard = (props: SceneRendererProps): React$Element<any> => {
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
    // Render card
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' && this.props.renderNavBar(props)}
        {cloneElement(this.props.renderScene(props), cardState)}
      </View>
    )
  }

  renderCard = (props: SceneRendererProps): React$Element<any> => {
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
    const floatingHeader = Platform.OS === 'ios'
      ? this.props.renderNavBar(props)
      : null
    return (
      <View style={styles.container}>
        <View style={styles.scenes}>
          {props.scenes.map((scene, index) => this.renderCard({
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
