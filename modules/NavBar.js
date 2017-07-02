/* @flow */

import React from 'react'
import { Platform } from 'react-native'
import Header from 'react-navigation/src/views/Header'
import HeaderTitle from 'react-navigation/src/views/HeaderTitle'
import HeaderBackButton from 'react-navigation/src/views/HeaderBackButton'
import type { CardSubViewProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type Props = CardSubViewProps

class NavBar extends React.Component<void, Props, void> {
  props: Props

  renderLeftComponent = (sceneProps: CardSubViewProps): ?React$Element<any> => {
    // Custom left component
    if (sceneProps.renderLeftButton) {
      return sceneProps.renderLeftButton(sceneProps)
    }
    // Hide back button
    if (
      sceneProps.scene.index === 0 ||
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
    const previousTitle =
      sceneProps.backButtonTitle || (previousRoute && previousRoute.title)
    // Return default <BackButton /> component
    return (
      <HeaderBackButton
        title={previousTitle}
        tintColor={sceneProps.backButtonTintColor}
        onPress={sceneProps.onNavigateBack}
      />
    )
  }

  renderTitleComponent = (
    sceneProps: CardSubViewProps,
  ): ?React$Element<any> => {
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

  renderRightComponent = (
    sceneProps: CardSubViewProps,
  ): ?React$Element<any> => {
    // Render cusqtom right component
    if (sceneProps.renderRightButton) {
      return sceneProps.renderRightButton(sceneProps)
    }
    // Else return null =)
    return null
  }

  render(): ?React$Element<any> {
    return (
      <Header
        {...this.props}
        mode={Platform.OS === 'ios' ? 'float' : 'screen'}
        getScreenDetails={scene => {
          const sceneProps = StackUtils.get(this.props.cards, scene.route)
          const props = { ...this.props, scene }
          return {
            options: {
              headerStyle:
                (sceneProps && sceneProps.navBarStyle) ||
                this.props.navBarStyle,
              headerLeft: StackUtils.renderSubView(
                this.renderLeftComponent,
                props,
              )(),
              headerTitle: StackUtils.renderSubView(
                this.renderTitleComponent,
                props,
              )(),
              headerRight: StackUtils.renderSubView(
                this.renderRightComponent,
                props,
              )(),
            },
          }
        }}
      />
    )
  }
}

export default NavBar
