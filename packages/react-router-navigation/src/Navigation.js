/* @flow */

import * as React from 'react'
import { Route } from 'react-router'
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
    const activeCard = cards.find(card => card.path === route.routeName)
    const navBarProps = { ...headerProps, ...activeCard }
    if (navBarProps.hideNavBar) return null
    if (navBarProps.renderNavBar) {
      return navBarProps.renderNavBar(headerProps)
    }
    return <NavBar {...headerProps} />
  }

  render() {
    return (
      <Route>
        {({ history }) => (
          <CardStack
            {...this.props}
            history={history}
            render={cardsRendererProps => (
              <DefaultNavigationRenderer
                {...this.props}
                {...cardsRendererProps}
                renderHeader={this.renderHeader}
              />
            )}
          />
        )}
      </Route>
    )
  }
}

export default Navigation
