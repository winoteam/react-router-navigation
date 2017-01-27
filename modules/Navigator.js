/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import CardStack from './CardStack'
import NativeRenderer from './NativeRenderer'
import NavBar from './NavBar'
import { getCurrentCard } from './utils'
import type { CardProps, Cards } from './CardTypeDefinitions'

type Scene = {
  key: string,
}

type SceneRendererProps = NavigationSceneRendererProps & {
  cards: Cards,
  onNavigateBack: Function,
}

type Props = {
  children: Array<React$Element<CardProps>>,
}

class Navigator extends Component<void, Props, void> {

  props: Props

  renderScene = (props: SceneRendererProps & { navigatorScene: Scene }): ?React$Element<any> => {
    const { cards, scenes, navigatorScene } = props
    const scene = scenes.find(({ route }) => route.key === navigatorScene.key)
    if (!scene) return null
    const currentCard = getCurrentCard(scene.route, cards)
    if (!currentCard) return null
    return createElement(currentCard.component || currentCard.render)
  }

  renderNavBar = (props: SceneRendererProps): ?React$Element<any> => {
    const { scenes, navigationState } = props
    const scene = scenes[navigationState.index]
    return (
      <NavBar
        {...props}
        scene={scene}
      />
    )
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={({ cards, onNavigateBack, ...props }) => (
          <NativeRenderer
            navigationState={props.navigationState}
            onNavigateBack={props.onNavigateBack}
            renderScene={(navigatorScene) => {
              return this.renderScene({ ...props, navigatorScene, cards, onNavigateBack })
            }}
            renderNavBar={(position) => {
              return this.renderNavBar({ ...props, position, cards, onNavigateBack })
            }}
          />
        )}
      />
    )
  }

}

export default Navigator
