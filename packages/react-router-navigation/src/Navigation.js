/* @flow */

import React from 'react'
import { type HeaderProps } from 'react-navigation'
import { CardStack, type Card, type CardsRendererProps } from 'react-router-navigation-core'
import { type NavigationProps } from './TypeDefinitions'
import DefaultNavigationRenderer from './DefaultNavigationRenderer'
import NavBar from './NavBar'

type Props = NavigationProps & {
  children?: React$Node,
}

class Navigation extends React.Component<Props> {
  renderHeader = (
    headerProps: NavBarProps<CardsRendererProps & HeaderProps> &
      CardsRendererProps &
      HeaderProps,
  ) => {
    if (headerProps.hideNavBar) return null
    if (headerProps.renderNavBar) {
      return headerProps.renderNavBar(headerProps)
    }
    return <NavBar {...headerProps} />
  }

  render() {
    return (
      <CardStack
        {...this.props}
        render={cardsRendererProps => (
          <DefaultNavigationRenderer
            {...this.props}
            {...cardsRendererProps}
            renderHeader={this.renderHeader}
          />
        )}
      />
    )
  }
}

export default Navigation
