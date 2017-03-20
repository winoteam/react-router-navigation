/* @flow */

import React, { Component } from 'react'
import { Platform } from 'react-native'
import Header from 'react-navigation/src/views/Header'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import HeaderBackButton from 'react-navigation/src/views/HeaderBackButton'
import type { CardSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type Props = CardSubViewProps

class NavBar extends Component<void, Props, void> {

  props: Props

  renderLeftComponent = (sceneProps: CardSubViewProps): ?React$Element<any> => {
    // Custom left component
    if (sceneProps.renderLeftButton) {
      return sceneProps.renderLeftButton(sceneProps)
    }
    // Hide back button
    if (
      sceneProps.index === 0 ||
      sceneProps.navigationState.index === 0 ||
      !sceneProps.onNavigateBack ||
      sceneProps.hideBackButton
    ) {
      return null
    }
    // Get previous title
    const previousRoute = StackUtils.get(
      sceneProps.cards,
      sceneProps.scenes[Math.max(0, sceneProps.scene.index - 1)].route,
    )
    const previousTitle = sceneProps.backButtonTitle || (previousRoute && previousRoute.title)
    // Return default <BackButton /> component
    return (
      <HeaderBackButton
        {...sceneProps}
        title={previousTitle}
        tintColor={sceneProps.backButtonTintColor}
        onPress={sceneProps.onNavigateBack}
      />
    )
  }

  renderTitleComponent= (sceneProps: CardSubViewProps): ?React$Element<any> => {
    // Render custom title component
    if (sceneProps.renderTitle) {
      return sceneProps.renderTitle(sceneProps)
    }
    // Return <ReactNavigation.HeaderTitle /> component
    return (
      <HeaderTitle style={sceneProps.titleStyle}>
        {sceneProps.title}
      </HeaderTitle>
    )
  }

  renderRightComponent = (sceneProps: CardSubViewProps): ?React$Element<any> => {
    // Render cusqtom right component
    if (sceneProps.renderRightButton) {
      return sceneProps.renderRightButton(sceneProps)
    }
    // Else return null =)
    return null
  }

  render(): ?React$Element<any> {
    const sceneProps = StackUtils.get(this.props.cards, this.props.scene.route)
    return (
      <Header
        {...this.props}
        mode={Platform.OS === 'ios' ? 'float' : 'screen'}
        style={(sceneProps && sceneProps.navBarStyle) || this.props.navBarStyle}
        renderLeftComponent={StackUtils.renderSubView(this.renderLeftComponent, this.props)}
        renderTitleComponent={StackUtils.renderSubView(this.renderTitleComponent, this.props)}
        renderRightComponent={StackUtils.renderSubView(this.renderRightComponent, this.props)}
      />
    )
  }

}

export default NavBar
