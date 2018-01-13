/* @flow */

import React from 'react'
import { Platform } from 'react-native'
import { Header, HeaderTitle, HeaderBackButton } from 'react-navigation'
import { renderSubView, get } from 'react-router-navigation-core'
import type { CardSubViewProps } from './TypeDefinitions'

const StackUtils = { get }

type Props = CardSubViewProps

class NavBar extends React.Component<Props> {
  renderLeftComponent = (sceneProps: CardSubViewProps) => {
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

  renderTitleComponent = (sceneProps: CardSubViewProps) => {
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

  renderRightComponent = (sceneProps: CardSubViewProps) => {
    // Render cusqtom right component
    if (sceneProps.renderRightButton) {
      return sceneProps.renderRightButton(sceneProps)
    }
    // Else return null =)
    return null
  }

  render() {
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
              headerLeft: renderSubView(this.renderLeftComponent, props)(),
              headerTitle: renderSubView(this.renderTitleComponent, props)(),
              headerRight: renderSubView(this.renderRightComponent, props)(),
            },
          }
        }}
      />
    )
  }
}

export default NavBar
