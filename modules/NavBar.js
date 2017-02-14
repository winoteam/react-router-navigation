/* @flow */

import React, { Component } from 'react'
import Header from 'react-navigation/src/views/Header'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import type { NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type { CardRendererProps } from './TypeDefinitions'
import BackButton from './BackButton'
import { getCurrentCard } from './utils'

type RendererProps = CardRendererProps & NavigationTransitionProps

type Props = RendererProps & {
  mode: 'float' | 'screen' | 'none',
}

class NavBar extends Component<void, Props, void> {

  props: Props

  static renderLeftComponent = (props: RendererProps, style?: StyleSheet): ?React$Element<any> => {
    const { onNavigateBack, navigationState: { index, routes }, cards } = props
    const route = routes[index]
    const card = getCurrentCard(cards, route)
    // Custom left component
    if (card && card.renderLeftComponent) {
      return card.renderLeftComponent(props)
    }
    // Hide back button
    if (index === 0 || !onNavigateBack) {
      return null
    }
    // Default back button
    return (
      <BackButton
        onPress={onNavigateBack}
        color={card && card.backButtonStyle}
        style={style}
      />
    )
  }

  static renderTitleComponent = (props: RendererProps, style?: StyleSheet): ?React$Element<any> => {
    const { cards, scene: { route } } = props
    const card = getCurrentCard(cards, route)
    if (!card) return null
    return (
      <HeaderTitle style={[style, card.titleStyle]}>
        {card.title}
      </HeaderTitle>
    )
  }

  static renderRightComponent = (): ?React$Element<any> => null

  render() {
    const { cards, scene: { route } } = this.props
    const card = getCurrentCard(cards, route)
    return (
      <Header
        {...this.props}
        style={card && card.navBarStyle}
        renderLeftComponent={(props) => NavBar.renderLeftComponent({ ...this.props, ...props })}
        renderTitleComponent={(props) => NavBar.renderTitleComponent({ ...this.props, ...props })}
        renderRightComponent={(props) => NavBar.renderRightComponent({ ...this.props, ...props })}
      />
    )
  }

}

export default NavBar
