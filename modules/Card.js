/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-duplicate-imports: 0 */

import React, { Component, createElement } from 'react'
import { Route } from 'react-router'
import type { RouterHistory, Match } from 'react-router'
import type { CardProps, CardState } from './TypeDefinitions'

type Props = CardProps & CardState

type State = {
  match: ?Match,
  pathname: ?string,
}

class Card extends Component<void, Props, State> {

  props: Props

  state: State = {
    pathname: null,
    match: null,
  }

  static displayName = 'Card'

  renderView = (props: Props & RouterHistory & { match: Match }): ?React$Element<any> => {
    const { match, location: { pathname } } = props
    // Set match props
    if (!this.state.pathname) this.state.pathname = pathname
    if (this.state.pathname === pathname || !this.state.match) {
      this.state.match = match
    }
    // Build props
    const { render, children, component, isTransitioning, isFocused } = this.props
    const routeProps = {
      ...props,
      match: this.state.match,
      isTransitioning,
      isFocused,
    }
    // Render view
    if (render) return render(routeProps)
    else if (render) return children(routeProps)
    else if (component) return createElement(component, routeProps)
    return null
  }

  render(): React$Element<any> {
    const { path, exact, strict } = this.props
    return (
      <Route path={path} exact={exact} strict={strict}>
        {this.renderView}
      </Route>
    )
  }

}

export default Card
