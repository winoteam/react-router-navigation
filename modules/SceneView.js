/* @flow */

import React from 'react'
import { matchPath } from 'react-router'
import type { ContextRouter, Location } from 'react-router'
import type { CardProps } from './TypeDefinitions'

type Props = ContextRouter & CardProps

type State = {
  location: Location,
}

class SceneView extends React.Component<void, Props, State> {

  props: Props
  state: State

  unlisten: Function

  constructor(props: Props) {
    super(props)
    // Build current match
    const { location, path, exact, strict } = props
    const match = matchPath(location.pathname, { path, exact, strict })
    this.state = { match }
  }

  componentWillReceiveProps(nextProps: Props): void {
    const { location, path, exact, strict } = nextProps
    if (!this.state.match) {
      const match = matchPath(location.pathname, { path, exact, strict })
      this.setState({ match })
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    // Only update when scene is focused
    return !!nextState.match
  }

  render(): ?React$Element<any> {
    // Get scene component
    const { render, children, component } = this.props
    const { match } = this.state
    const ownProps = { ...this.props, match }
    if (render) return render(ownProps)
    else if (children && typeof children === 'function') return children(ownProps)
    else if (component) return React.createElement(component, ownProps)
    return null
  }

}

export default SceneView
