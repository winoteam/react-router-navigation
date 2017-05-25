/* @flow */
/* eslint no-duplicate-imports: 0 */

import React from 'react'
import { CardStack, Transitioner } from 'react-navigation'
import type { NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type { Route, NavigationProps, CardsRendererProps } from './TypeDefinitions'

type SceneRendererProps =
  & CardsRendererProps
  & NavigationTransitionProps

type NavigationScreen = {
  state: Route,
}

type Props =
  & CardsRendererProps
  & NavigationProps
  & {
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
      header: () => this.props.renderHeader({
        ...this.props,
        ...sceneProps,
        scene,
      }),
    }
  }

  getSceenComponent = (
    routeName: string,
    sceneProps: SceneRendererProps,
  ): () => React$Element<any> => {
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

  renderView = (ownProps: SceneRendererProps): React$Element<any> => (
    <CardStack
      {...ownProps}
      cardStyle={this.props.cardStyle}
      navigationState={this.props.navigationState}
      router={{
        getScreenOptions: navigationScreen => this.getScreenOptions(navigationScreen, ownProps),
        getComponentForRouteName: routeName => this.getSceenComponent(routeName, ownProps),
      }}
      navigation={{
        goBack: this.props.onNavigateBack,
        state: this.props.navigationState,
        dispatch: (action) => {
          if (action.type === 'Navigation/BACK') {
            this.props.onNavigateBack()
          }
          return false
        },
      }}
    />
  )

  render(): React$Element<any> {
    const { navigationState } = this.props
    return (
      <Transitioner
        navigation={{ state: navigationState }}
        onTransitionStart={this.props.onTransitionStart}
        onTransitionEnd={this.props.onTransitionEnd}
        render={this.renderView}
      />
    )
  }

}

export default DefaultRenderer
