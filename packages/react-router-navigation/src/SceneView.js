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
    const { path, exact, strict, history: { location } } = props
    const match = matchPath(location.pathname, { path, exact, strict })
    this.state = { match, location }
  }

  componentWillMount() {
    const { history } = this.props
    this.unlisten = history.listen(this.onListenHistory)
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten()
  }

  onListenHistory = (location: Location) => {
    const { path, exact, strict } = this.props
    const match = matchPath(location.pathname, { path, exact, strict })
    if (!this.state.match) {
      this.setState({ match, location })
    } else {
      this.setState({ location })
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !!nextState.match
  }

  render() {
    // $FlowFixMe
    const { render, children, component: Component, type, history } = this.props
    const { match, location } = this.state
    if (type === 'card' && !match) return null
    const contextRouter = { history, match, location }
    if (render) {
      return render(contextRouter)
    } else if (children && typeof children === 'function') {
      return children(contextRouter)
    } else if (children && React.Children.count(children) === 0) {
      return React.Children.only(children)
    } else if (Component) {
      return <Component {...contextRouter} />
    }
    return null
  }
}

export default SceneView
