/* @flow */

import React from 'react'
import { matchPath } from 'react-router'
import type { RouterHistory, Location, Match } from 'react-router'
import type { RouteProps } from 'react-router-navigation-core'

type Props = RouteProps & {
  type: 'card' | 'tab',
  history: RouterHistory,
}

type State = {
  location: Location,
  match: ?Match,
}

class SceneView extends React.Component<Props, State> {
  unlisten: ?Function

  constructor(props: Props) {
    super(props)
    // Build current match
    const { path, exact, strict, history: { location } } = props
    const match = matchPath(location.pathname, { path, exact, strict })
    this.state = { match, location }
  }

  componentWillMount() {
    // Listen history events
    const { history } = this.props
    this.unlisten = history.listen(this.onListenHistory)
  }

  componentWillUnmount() {
    // Remove history listenner
    if (this.unlisten) this.unlisten()
  }

  onListenHistory = (location: Location) => {
    // Build match
    const { path, exact, strict } = this.props
    const match = matchPath(location.pathname, { path, exact, strict })
    if (!this.state.match) {
      this.setState({ match, location })
    } else {
      this.setState({ location })
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // Only update when scene is focused
    return !!nextState.match
  }

  render() {
    const { render, children, component: Component, type, history } = this.props
    const { match, location } = this.state
    // Special case
    if (type === 'card' && !match) return null
    // Return scene
    const ownProps = { history, match, location }
    if (render) {
      return render(ownProps)
    } else if (children && typeof children === 'function') {
      return children(ownProps)
    } else if (Component) {
      return <Component {...ownProps} />
    }
    return null
  }
}

export default SceneView
