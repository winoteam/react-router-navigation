/* @flow */

import React from 'react'
import { CardStack, type CardsRendererProps } from 'react-router-navigation-core'
import type { NavigationProps, NavBarProps, NavigationHeaderProps } from './TypeDefinitions'
import DefaultNavigationRenderer from './DefaultNavigationRenderer'
import NavBar from './NavBar'

type Props = NavigationProps & {
  children?: React$Node,
}

class Navigation extends React.Component<Props> {
  renderHeader = (
    headerProps: NavBarProps<CardsRendererProps & NavigationHeaderProps> &
      CardsRendererProps &
      NavigationHeaderProps,
  ) => {
    const { cards, scene: { route } } = headerProps
    const card = cards.find(({ key }) => key === route.routeName)
    const navBarProps = { ...headerProps, ...card }
    if (navBarProps.hideNavBar) return null
    if (navBarProps.renderNavBar) {
      return navBarProps.renderNavBar(headerProps)
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
