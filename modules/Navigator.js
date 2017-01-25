/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import type { NavigationSceneRendererProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import CardStack from './CardStack'
import NativeRenderer from './NativeRenderer'
import NavBar from './NavBar'
import { getCurrentCard } from './utils'
import type { MatchCardProps, Card } from './StackTypeDefinitions'

type Scene = {
  key: string,
}

type SceneRendererProps = NavigationSceneRendererProps & {
  cards: Array<Card>,
  onNavigateBack: Function,
}

type Props = {
  children: Array<React$Element<MatchCardProps>>,
}

class Navigator extends Component<void, Props, void> {

  props: Props

  renderScene = (props: SceneRendererProps & { scene: Scene }): ?React$Element<any> => {
    const { cards, scene } = props
    const currentCard = getCurrentCard(scene, cards)
    if (!currentCard) return null
    return createElement(currentCard.component || currentCard.render)
  }

  renderNavBar = (props: SceneRendererProps): React$Element<any> => {
    const { scenes, navigationState } = props
    const scene = scenes[navigationState.index]
    return <NavBar {...props} scene={scene} />
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={(props) => (
          <NativeRenderer
            navigationState={props.navigationState}
            onNavigateBack={props.onNavigateBack}
            renderScene={(scene) => this.renderScene({ ...props, scene })}
            renderNavBar={(position) => this.renderNavBar({ ...props, position })}
          />
        )}
      />
    )
  }

}

export default Navigator
