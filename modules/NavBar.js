/* @flow */

import React, { Component } from 'react'
import Header from 'react-navigation/src/views/Header'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import type { NavigationTransitionProps } from 'react-navigation/src/TypeDefinition'
import type { CardRendererProps } from './TypeDefinitions'
import BackButton from './BackButton'
import { getCurrentCard } from './utils'

type SceneRendererProps = CardRendererProps & NavigationTransitionProps

type Props = SceneRendererProps & {
  mode: 'float' | 'screen' | 'none',
}

class DefaultNavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (props: SceneRendererProps): ?React$Element<any> => {
    const { cards } = this.props
    const { scene: { route } } = props
    const card = getCurrentCard(route, cards)
    // Custom left component
    if (card && card.renderLeftComponent) {
      return card.renderLeftComponent(props)
    }
    // Hide back button
    if (props.scene.index === 0 || !props.onNavigateBack) {
      return null
    }
    // Default back button
    return (
      <BackButton
        onPress={props.onNavigateBack}
        style={card && card.backButtonStyle}
      />
    )
  }

  renderTitleComponent = (props: SceneRendererProps): React$Element<any> => {
    const { cards } = this.props
    const { scene: { route } } = props
    const card = getCurrentCard(route, cards)
    if (!card || !card.title) return null
    return (
      <HeaderTitle style={card.titleStyle}>
        {card.title}
      </HeaderTitle>
    )
  }

  renderRightComponent = (): ?React$Element<any> => null

  render() {
    const { cards, scene: { route } } = this.props
    const card = getCurrentCard(route, cards)
    return (
      <Header
        {...this.props}
        style={card.navBarStyle}
        renderLeftComponent={this.renderLeftComponent}
        renderTitleComponent={this.renderTitleComponent}
        renderRightComponent={this.renderRightComponent}
      />
    )
  }

}

export default DefaultNavBar
