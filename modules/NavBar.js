/* @flow */

import React, { Component } from 'react'
import { Platform } from 'react-native'
import Header from 'react-navigation/src/views/Header'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import type { NavigationSceneRendererProps } from 'react-navigation/src/TypeDefinition'
import type { CardRendererProps } from './TypeDefinitions'
import BackButton from './BackButton'
import StackUtils from './StackUtils'

type RendererProps =
  & CardRendererProps
  & NavigationSceneRendererProps

type Props = RendererProps

class NavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (props: RendererProps): ?React$Element<any> => {
    // Get current card
    const { onNavigateBack, cards, scene: { index, route } } = props
    const card = StackUtils.get(cards, route)
    // Get nav bar props
    const navBarProps = { ...props, ...card }
    // Custom left component
    if (navBarProps.renderLeftButton) {
      return navBarProps.renderLeftButton(props)
    }
    // Hide back button
    if (index === 0 || !onNavigateBack || navBarProps.hideBackButton) return null
    // Return default <BackButton /> component
    return (
      <BackButton
        {...navBarProps}
        onPress={onNavigateBack}
      />
    )
  }

  renderTitleComponent= (props: RendererProps): ?React$Element<any> => {
    // Get current card
    const { cards, scene: { route } } = props
    const card = StackUtils.get(cards, route)
    if (!card) return null
    // Get nav bar props
    const navBarProps = { ...props, ...card }
    // Render custom title component
    if (navBarProps.renderTitle) return navBarProps.renderTitle(navBarProps)
    // Return <ReactNavigation.HeaderTitle /> component
    return (
      <HeaderTitle style={navBarProps.titleStyle}>
        {navBarProps.title}
      </HeaderTitle>
    )
  }

  renderRightComponent = (props: RendererProps): ?React$Element<any> => {
    // Get current card
    const { cards, scene: { route } } = props
    const card = StackUtils.get(cards, route)
    if (!card) return null
    // Get nav bar props
    const navBarProps = { ...props, ...card }
    // Render cusqtom right component
    const { renderRightButton } = navBarProps
    if (renderRightButton) return renderRightButton(navBarProps)
    // Else return null =)
    return null
  }

  render(): ?React$Element<any> {
    // Get current card
    const { cards, scene: { route } } = this.props
    const card = StackUtils.get(cards, route)
    if (!card) return null
    // Get nav bar props
    const navBarProps = { ...this.props, ...card }
    // Return <ReactNavigation.Header /> component
    return (
      // $FlowFixMe
      <Header
        {...navBarProps}
        mode={Platform.OS === 'ios' ? 'float' : 'screen'}
        style={navBarProps.navBarStyle}
        renderLeftComponent={(props) => this.renderLeftComponent({ ...navBarProps, ...props })}
        renderTitleComponent={(props) => this.renderTitleComponent({ ...navBarProps, ...props })}
        renderRightComponent={(props) => this.renderRightComponent({ ...navBarProps, ...props })}
      />
    )
  }

}

export default NavBar
