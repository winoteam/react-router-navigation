/* @flow */

import React from 'react'
import { NativeModules, Platform } from 'react-native'
import {
  CardStack,
  Transitioner,
  StackRouter,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation'
import TransitionConfigs from 'react-navigation/src/views/CardStack/TransitionConfigs'
import type {
  NavigationTransitionProps,
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation/src/TypeDefinition'
import { type CardsRendererProps } from 'react-router-navigation-core'
import type { NavigationProps } from './TypeDefinitions'

type SceneRendererProps = CardsRendererProps & NavigationTransitionProps

const NativeAnimatedModule = NativeModules && NativeModules.NativeAnimatedModule

type Props = CardsRendererProps &
  NavigationProps & {
    renderSceneComponent: (props: SceneRendererProps) => ?React$Element<*>,
    renderHeader: (props: SceneRendererProps) => ?React$Element<*>,
  }

class DefaultRenderer extends React.Component<Props> {
  static defaultProps = {
    configureTransition: (
      transitionProps: NavigationTransitionProps,
      prevTransitionProps: ?NavigationTransitionProps,
    ) => {
      return {
        ...TransitionConfigs.getTransitionConfig(
          undefined,
          transitionProps,
          prevTransitionProps,
          false,
        ).transitionSpec,
        useNativeDriver: !!NativeAnimatedModule,
      }
    },
  }

  getScreenOptions = (
    navigationScreen: NavigationScreenProp<NavigationRoute>,
    sceneProps: NavigationTransitionProps,
  ) => {
    // Get route name
    const { state: { key } } = navigationScreen
    // Get current scene
    const scene = sceneProps.scenes.find(({ route }) => {
      return route.key === key
    })
    // Return header
    return {
      header: () =>
        this.props.renderHeader({
          ...this.props,
          ...sceneProps,
          scene,
        }),
    }
  }

  getComponentForRouteName = (
    routeName: string,
    sceneProps: NavigationTransitionProps,
  ) => {
    // Get current scene
    const scene = sceneProps.scenes.find(({ route }) => {
      return route.routeName === routeName
    })
    // Return scene component
    return this.props.renderSceneComponent({
      ...this.props,
      ...sceneProps,
      scene,
    })
  }

  getRouter = (transitionProps: NavigationTransitionProps) => {
    // $FlowFixMe
    const { cards, navigationState: { routes, index } } = this.props
    return {
      ...StackRouter(
        cards.reduce(
          (acc, card) => ({
            ...acc,
            [card.key]: {
              screen: this.getComponentForRouteName(card.path, transitionProps),
            },
          }),
          {},
        ),
        {
          initialRouteName: routes[index].routeName,
        },
      ),
      getScreenOptions: navigationScreen => {
        return this.getScreenOptions(navigationScreen, transitionProps)
      },
    }
  }

  getNavigation = () => {
    const { navigationState, onNavigateBack: goBack } = this.props
    const BACK = NavigationActions.back().type
    return addNavigationHelpers({
      state: navigationState,
      dispatch: action => {
        if (action.type === BACK) {
          goBack()
        }
        return false
      },
      goBack,
    })
  }

  renderView = (transitionProps: NavigationTransitionProps) => {
    // Filter scenes
    // Fix > https://github.com/LeoLeBras/react-router-navigation/issues/23
    const scenes = transitionProps.scenes.reduce((acc, scene) => {
      if (acc.find(({ index }) => scene.index === index)) {
        const indexOf = acc.findIndex(({ index }) => scene.index === index)
        return [...acc.slice(0, indexOf), scene]
      }
      return [...acc, scene]
    }, [])
    // Return <ReactNavigation.CardStack />
    return (
      <CardStack
        {...transitionProps}
        scenes={scenes}
        mode="card"
        headerMode={Platform.OS === 'ios' ? 'float' : 'screen'}
        navigationState={this.props.navigationState}
        router={this.getRouter({ ...transitionProps, scenes })}
        navigation={this.getNavigation()}
      />
    )
  }

  render() {
    return (
      <Transitioner
        {...this.props}
        navigation={this.getNavigation()}
        render={this.renderView}
      />
    )
  }
}

export default DefaultRenderer
