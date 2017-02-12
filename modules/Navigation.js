/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, createElement } from 'react'
import { Platform } from 'react-native'
import type { NavigationTransitionProps, NavigationScene } from 'react-navigation/src/TypeDefinitions'
import type { NavigationProps, CardRendererProps } from './TypeDefinitions'
import CardStack from './CardStack'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'
import { getCurrentCard } from './utils'

type SceneRendererProps = CardRendererProps & NavigationTransitionProps

type Props = NavigationProps

class Navigation extends Component<void, Props, void> {

  props: Props

  renderNavBar = (props: SceneRendererProps): React$Element<any> => {
    const { cards, navigationState: { routes, index } } = props
    const route = routes[index]
    const currentCard = getCurrentCard(route, cards)
    // Custom nav bar
    if (currentCard && currentCard.renderNavBar) {
      return currentCard.renderNavBar(props)
    }
    // Hide nav bar
    if (currentCard && currentCard.hideNavBar) return null
    // Default nav bar
    return (
      <NavBar
        {...props}
        mode={Platform.OS === 'ios' ? 'float' : 'screen'}
      />
    )
  }

  renderScene = (props: SceneRendererProps & { scene: NavigationScene }): ?React$Element<any> => {
    const { cards, scene: { route } } = props
    const currentCard = getCurrentCard(route, cards)
    if (!currentCard) return null
    return createElement(
      currentCard.component || currentCard.render,
      { key: route.key },
    )
  }

  render(): React$Element<any> {
    return (
      <CardStack
        {...this.props}
        render={(props) => (
          <DefaultRenderer
            {...props}
            renderScene={this.renderScene}
            renderNavBar={this.renderNavBar}
          />
        )}
      />
    )
  }

}

export default Navigation
