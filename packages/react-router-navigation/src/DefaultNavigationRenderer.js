/* @flow */

import React from 'react'
import { NativeModules } from 'react-native'
import {
  Transitioner,
  CardStack,
  StackRouter,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import TransitionConfigs from 'react-navigation/src/views/CardStack/TransitionConfigs'
import type { CardsRendererProps, Card } from 'react-router-navigation-core'
import type {
  NavigationProps,
  NavBarProps,
  NavigationHeaderProps,
  NavigationRouter,
  NavigationTransitionProps,
} from './TypeDefinitions'

const NativeAnimatedModule = NativeModules && NativeModules.NativeAnimatedModule

type Props = NavigationProps &
  CardsRendererProps & {
    renderHeader: (
      NavBarProps<CardsRendererProps & NavigationHeaderProps> &
        CardsRendererProps &
        NavigationHeaderProps,
    ) => ?React$Element<any>,
  }

type State = {
  router: NavigationRouter,
}

class DefaultNavigationRenderer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { renderHeader, cards } = props
    const routeConfigMap = cards.reduce((acc, card) => {
      return {
        ...acc,
        [card.key]: {
          screen: this.getScreenComponent(card),
          navigationOptions: {
            ...props,
            ...card,
            header: sceneProps => renderHeader({ ...props, ...sceneProps }),
          },
        },
      }
    }, {})
    const router = StackRouter(routeConfigMap)
    this.state = { router }
  }

  getScreenComponent = (card: Card) => {
    const { render, children, component } = card
    if (render) return render
    else if (children && typeof children === 'function') return children
    else if (component) return component
    return null
  }

  configureTransition = (
    transitionProps: NavigationTransitionProps,
    prevTransitionProps: NavigationTransitionProps,
  ) => {
    const isModal = this.props.mode === 'modal'
    const transitionSpec = {
      ...TransitionConfigs.getTransitionConfig(
        undefined,
        transitionProps,
        prevTransitionProps,
        isModal,
      ).transitionSpec,
    }
    if (!!NativeAnimatedModule && CardStackStyleInterpolator.canUseNativeDriver()) {
      transitionSpec.useNativeDriver = true
    }
    return transitionSpec
  }

  renderStack = (
    props: Props & NavigationTransitionProps,
    prevProps: Props & NavigationTransitionProps,
  ) => {
    const { cards } = this.props
    const { router } = this.state
    const { scene: { route } } = props
    const card = cards.find(({ key }) => key === route.routeName)
    const cardStackProps = { ...this.props, ...card }
    const {
      screenProps,
      headerMode,
      headerTransitionPreset,
      mode,
      cardStyle,
      transitionConfig,
    } = cardStackProps
    return (
      <CardStack
        screenProps={screenProps}
        headerMode={headerMode}
        headerTransitionPreset={headerTransitionPreset}
        mode={mode}
        router={router}
        cardStyle={cardStyle}
        transitionConfig={transitionConfig}
        transitionProps={props}
        prevTransitionProps={prevProps}
      />
    )
  }

  render() {
    const { cards, navigationState, onNavigateBack } = this.props
    const route = navigationState.routes[navigationState.index]
    const card = cards.find(({ key }) => key === route.routeName)
    const transitionerProps = { ...this.props, ...card }
    const { configureTransition, onTransitionStart, onTransitionEnd } = transitionerProps
    return (
      <Transitioner
        render={this.renderStack}
        configureTransition={configureTransition || this.configureTransition}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
        navigation={addNavigationHelpers({
          state: navigationState,
          addListener: () => ({}),
          dispatch: action => {
            if (action.type === NavigationActions.back().type) {
              onNavigateBack()
            }
          },
        })}
      />
    )
  }
}

export default DefaultNavigationRenderer
