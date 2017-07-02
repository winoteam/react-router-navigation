/* @flow */
/* eslint no-duplicate-imports: 0 */

import React from 'react'
import { CardStack, Transitioner } from 'react-navigation'
import type { NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type {
  Route,
  NavigationProps,
  CardsRendererProps,
} from './TypeDefinitions'

type SceneRendererProps = CardsRendererProps & NavigationTransitionProps

type NavigationScreen = {
  state: Route,
}

type Props = CardsRendererProps &
  NavigationProps & {
    renderSceneComponent: (props: SceneRendererProps) => ?React$Element<any>,
    renderHeader: (props: SceneRendererProps) => ?React$Element<any>,
  }

class DefaultRenderer extends React.Component<void, Props, void> {
  props: Props

  getScreenOptions = (
    navigationScreen: NavigationScreen,
    sceneProps: SceneRendererProps,
  ): Object => {
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

  getSceenComponent = (
    routeName: string,
    sceneProps: SceneRendererProps,
  ): (() => React$Element<any>) => {
    // Get current scene
    const scene = sceneProps.scenes.find(({ route }) => {
      return route.routeName === routeName
    })
    // Return scene component $FlowFixMe
    return this.props.renderSceneComponent({
      ...this.props,
      ...sceneProps,
      scene,
    })
  }

  renderView = (ownProps: SceneRendererProps): React$Element<any> => {
    // Filter scenes
    // Fix > https://github.com/LeoLeBras/react-router-navigation/issues/23
    const scenes = ownProps.scenes.reduce((acc, scene) => {
      if (acc.find(({ index }) => scene.index === index)) {
        const indexOf = acc.findIndex(({ index }) => scene.index === index)
        return [...acc.slice(0, indexOf), scene]
      }
      return [...acc, scene]
    }, [])
    // Return <ReactNavigation.CardStack />
    return (
      <CardStack
        {...ownProps}
        scenes={scenes}
        cardStyle={this.props.cardStyle}
        navigationState={this.props.navigationState}
        router={{
          getScreenOptions: navigationScreen => {
            return this.getScreenOptions(navigationScreen, {
              ...ownProps,
              scenes,
            })
          },
          getComponentForRouteName: routeName => {
            return this.getSceenComponent(routeName, { ...ownProps, scenes })
          },
        }}
        navigation={{
          goBack: this.props.onNavigateBack,
          state: this.props.navigationState,
          dispatch: action => {
            if (action.type === 'Navigation/BACK') {
              this.props.onNavigateBack()
            }
            return false
          },
        }}
      />
    )
  }

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Transitioner
        navigation={{ state: navigationState }}
        configureTransition={this.props.configureTransition}
        onTransitionStart={this.props.onTransitionStart}
        onTransitionEnd={this.props.onTransitionEnd}
        render={this.renderView}
      />
    )
  }
}

export default DefaultRenderer
