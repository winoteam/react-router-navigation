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

  renderLeftComponent = (props: CardSubViewProps): ?React$Element<any> => {
    // Custom left component
    if (props.renderLeftButton) {
      return props.renderLeftButton(props)
    }
    // Hide back button
    if (
      props.index === 0 ||
      props.navigationState.index === 0 ||
      !props.onNavigateBack ||
      props.hideBackButton
    ) {
      return null
    }
    // Get previous title
    const previousRoute = StackUtils.get(
      props.cards,
      props.scenes[Math.max(0, props.scene.index - 1)].route,
    )
    const previousTitle = props.backButtonTitle || (previousRoute && previousRoute.title)
    // Return default <BackButton /> component
    return (
      <HeaderBackButton
        {...props}
        title={previousTitle}
        tintColor={props.backButtonTintColor}
        onPress={props.onNavigateBack}
      />
    )
  }

  renderTitleComponent= (props: CardSubViewProps): ?React$Element<any> => {
    // Render custom title component
    if (props.renderTitle) {
      return props.renderTitle(props)
    }
    // Return <ReactNavigation.HeaderTitle /> component
    return (
      <HeaderTitle style={props.titleStyle}>
        {props.title}
      </HeaderTitle>
    )
  }

  renderRightComponent = (props: CardSubViewProps): ?React$Element<any> => {
    // Render cusqtom right component
    if (props.renderRightButton) {
      return props.renderRightButton(props)
    }
    // Else return null =)
    return null
  }

  render(): ?React$Element<any> {
    const ownProps = StackUtils.get(this.props.cards, this.props.scene.route)
    return (
      <Header
        {...this.props}
        mode={Platform.OS === 'ios' ? 'float' : 'screen'}
        style={ownProps && ownProps.navBarStyle}
        renderLeftComponent={StackUtils.renderSubView(this.renderLeftComponent, this.props)}
        renderTitleComponent={StackUtils.renderSubView(this.renderTitleComponent, this.props)}
        renderRightComponent={StackUtils.renderSubView(this.renderRightComponent, this.props)}
      />
    )
  }

}

export default NavBar
