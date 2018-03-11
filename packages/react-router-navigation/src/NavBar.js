/* @flow */

import React from 'react'
import { Header, HeaderTitle, HeaderBackButton } from 'react-navigation'
import type { CardsRendererProps, Route } from 'react-router-navigation-core'
import type {
  NavBarProps,
  Card,
  NavigationHeaderProps,
  NavigationScene,
} from './TypeDefinitions'

type Props = NavBarProps<CardsRendererProps & NavigationHeaderProps> &
  CardsRendererProps &
  NavigationHeaderProps

type SceneProps = Props &
  Card &
  Route & {
    scene: NavigationScene,
  }

class NavBar extends React.Component<Props> {
  renderLeftComponent = (sceneProps: SceneProps) => {
    const { scenes, cards } = sceneProps
    if (sceneProps.renderLeftButton) {
      return sceneProps.renderLeftButton(sceneProps)
    }
    if (
      sceneProps.scene.index === 0 ||
      !sceneProps.onNavigateBack ||
      sceneProps.hideBackButton
    ) {
      return null
    }
    const previousScene = scenes[Math.max(0, sceneProps.scene.index - 1)]
    const { routeName: previousRouteName } = previousScene.route
    const previousCard = cards.find(card => card.key === previousRouteName)
    const previousSceneProps = { ...previousScene, ...previousCard }
    return (
      <HeaderBackButton
        title={previousSceneProps.backButtonTitle || previousSceneProps.title}
        tintColor={sceneProps.backButtonTintColor}
        onPress={sceneProps.onNavigateBack}
      />
    )
  }

  renderTitleComponent = (sceneProps: SceneProps) => {
    if (sceneProps.renderTitle) {
      return sceneProps.renderTitle(sceneProps)
    }
    return <HeaderTitle style={sceneProps.titleStyle}>{sceneProps.title}</HeaderTitle>
  }

  renderRightComponent = (sceneProps: SceneProps) => {
    if (sceneProps.renderRightButton) {
      return sceneProps.renderRightButton(sceneProps)
    }
    return null
  }

  render() {
    return (
      <Header
        {...this.props}
        getScreenDetails={scene => {
          const { route: { routeName } } = scene
          const card = this.props.cards.find(({ key }) => key === routeName)
          const sceneProps = { ...this.props, ...card, ...scene.route, scene }
          return {
            options: {
              headerStyle: sceneProps.navBarStyle,
              headerLeft: this.renderLeftComponent(sceneProps),
              headerTitle: this.renderTitleComponent(sceneProps),
              headerRight: this.renderRightComponent(sceneProps),
            },
          }
        }}
      />
    )
  }
}

export default NavBar
