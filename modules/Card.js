/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, createElement } from 'react'
import { Route } from 'react-router'
import type { ContextRouter, Match } from 'react-router'
import type { CardProps } from './TypeDefinitions'

type Props = CardProps

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

  renderView = (props: ContextRouter): ?React$Element<any> => {
    const { location: { pathname }, match } = props
    if (!this.state.pathname) this.state.pathname = pathname
    if (this.state.pathname === pathname || !this.state.match) {
      this.state.match = match
    }
    const { render, children, component } = this.props
    const routeProps = {
      ...this.props,
      ...props,
      match: this.state.match,
    }
    // Render view
    if (render) return render(routeProps)
    else if (children && typeof children === 'function') return children(routeProps)
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
