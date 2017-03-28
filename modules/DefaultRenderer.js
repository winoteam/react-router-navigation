/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component } from 'react'
import { NativeModules, StyleSheet, Platform, View } from 'react-native'
import { Transitioner } from 'react-navigation'
import Card from 'react-navigation/src/views/Card'
import CardStackPanResponder from 'react-navigation/src/views/CardStackPanResponder'
import TransitionConfigs from 'react-navigation/src/views/TransitionConfigs'
import type { TransitionConfig } from 'react-navigation/src/views/TransitionConfigs'
import type { NavigationScene, NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type { NavigationProps, CardsRendererProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

const NativeAnimatedModule = NativeModules && NativeModules.NativeAnimatedModule

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    overflow: 'hidden',
  },
  scenes: {
    flex: 1,
  },
})

type SceneRendererProps =
  & CardsRendererProps
  & NavigationTransitionProps

type Props =
  & CardsRendererProps
  & NavigationProps
  & {
  renderScene: (props: SceneRendererProps) => ?React$Element<any>,
  renderHeader: (props: SceneRendererProps) => ?React$Element<any>,
}


class Navigation extends Component<void, Props, void> {

  props: Props

  configureTransition = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps,
  ) => {
    return {
      ...this.getTransitionConfig(
        transitionProps,
        prevTransitionProps,
      ).transitionSpec,
      useNativeDriver: !!NativeAnimatedModule,
    }
  }

  getTransitionConfig = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps,
  ): TransitionConfig => {
    return TransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps,
      false,
    )
  }

  renderInnerCard = (props: SceneRendererProps): ?React$Element<any> => {
    // Build scene view
    const SceneView = this.props.renderScene(props)
    if (!SceneView) return null
    // Render card
    if (Platform.OS === 'android') {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'android' && this.props.renderHeader(props)}
          {SceneView}
        </View>
      )
    }
    return SceneView
  }

  renderCard = (props: SceneRendererProps & { scene: NavigationScene }): React$Element<any> => {
    // Build pan handlers $FlowFixMe
    const { screenInterpolator } = this.getTransitionConfig()
    const style = screenInterpolator && screenInterpolator(props)
    const panHandlersProps = {
      ...props,
      onNavigateBack: props.onNavigateBack,
    }
    const panHandlers = Platform.OS === 'ios'
      ? CardStackPanResponder.forHorizontal(panHandlersProps)
      : null
    // Get cardStyle prop
    const ownProps = StackUtils.get(
      props.cards,
      props.scene.route,
    )
    // Render <Card /> component with current scene
    return (
      <Card
        {...props}
        key={`card_${props.scene.key}`}
        panHandlers={panHandlers}
        renderScene={() => this.renderInnerCard(props)}
        style={[
          style,
          this.props.cardStyle,
          ownProps && ownProps.cardStyle,
        ]}
      />
    )
  }

  renderView = (props: SceneRendererProps): React$Element<any> => {
    // Build floatingHeader
    const floatingHeader = Platform.OS === 'ios'
      ? this.props.renderHeader(props)
      : null
    // Render all scenes with floatingHeader
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
        onTransitionStart={this.props.onTransitionStart}
        onTransitionEnd={this.props.onTransitionEnd}
        render={ownProps => this.renderView({ ...this.props, ...ownProps })}
      />
    )
  }

}

export default Navigation
