/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, createElement } from 'react'
import { Platform } from 'react-native'
import type { NavigationTransitionProps, NavigationScene } from 'react-navigation/src/TypeDefinitions'
import type { NavigationProps, CardRendererProps } from './TypeDefinitions'
import CardStack from './CardStack'
import DefaultRenderer from './DefaultRenderer'
import NavBar from './NavBar'
import getCurrentCard from './getCurrentCard'

type SceneRendererProps = CardRendererProps & NavigationTransitionProps

type Props = NavigationProps

class Navigation extends Component<void, Props, void> {

  props: Props

  renderNavBar = (props: SceneRendererProps): ?React$Element<any> => {
    const { cards, scene: { route } } = props
    const card = getCurrentCard(cards, route)
    // Custom nav bar
    if (card && card.renderNavBar) {
      return card.renderNavBar(props)
    }
    // Hide nav bar
    if (card && card.hideNavBar) return null
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
    const card = getCurrentCard(cards, route)
    if (!card) return null
    return createElement(
      card.component || card.render,
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
