/* @flow */
/* eslint no-duplicate-imports: 0 */

import React from 'react'
import { matchPath } from 'react-router'
import type { RouterHistory, Location, Match } from 'react-router'
import type { CardProps } from './TypeDefinitions'

type Props = CardProps & {
  history: RouterHistory,
  type: 'card' | 'tab',
}

type State = {
  location: Location,
  match: ?Match,
}

class SceneView extends React.Component<void, Props, State> {

  props: Props
  state: State

  unlisten: Function

  constructor(props: Props) {
    super(props)
    // Build current match
    const { path, exact, strict, history: { location } } = props
    const match = matchPath(location.pathname, { path, exact, strict })
    this.state = { match, location }
  }

  componentWillMount(): void {
    // Listen history events
    const { history } = this.props
    this.unlisten = history.listen(this.onListenHistory)
  }

  componentWillUnmount(): void {
    // Remove history listenner
    this.unlisten()
  }

  onListenHistory = (location: Location): void => {
    // Build match
    const { path, exact, strict } = this.props
    if (!this.state.match) {
      const match = matchPath(location.pathname, { path, exact, strict })
      this.setState({ match, location })
    } else {
      this.setState({ location })
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    // Only update when scene is focused
    return !!nextState.match
  }

  render(): ?React$Element<any> {
    // Get scene component $FlowFixMe
    const { render, children, component, type } = this.props
    const { match, location } = this.state
    // Special case
    if (type === 'card' && !match) return null
    // Return scene component
    const ownProps = { ...this.props, match, location }
    if (render) return render(ownProps)
    else if (children && typeof children === 'function') return children(ownProps)
    else if (component) return React.createElement(component, ownProps)
    return null
  }

}

export default SceneView
