/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component, createElement } from 'react'
import { Route } from 'react-router'
import type { ContextRouter, Match } from 'react-router'
import type { CardProps } from './TypeDefinitions'

type Props = CardProps

type State = {
  staticMatch: ?Match,
}

class Card extends Component<void, Props, State> {

  props: Props

  state: State = {
    staticMatch: null,
  }

  renderView = (props: ContextRouter): ?React$Element<any> => {
    // Initialyze own props
    if (!this.state.staticMatch && props.match) {
      this.state.staticMatch = props.match
    }
    const ownProps = {
      ...props,
      ...this.state,
    }
    // Render view
    const { render, children, component } = this.props
    if (render) return render(ownProps)
    else if (children && typeof children === 'function') return children(ownProps)
    else if (component) return createElement(component, ownProps)
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
