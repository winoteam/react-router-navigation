/* @flow */

import * as React from 'react'
import {
  matchPath,
  type RouterHistory,
  type Location,
  type Match,
} from 'react-router'
import type { RouteProps } from './TypeDefinitions'

type Props = RouteProps & {
  history?: RouterHistory,
  match?: ?Match,
}

type State = {|
  location: ?Location,
  match: ?Match,
|}

export default class SceneView extends React.Component<Props, State> {
  unlisten: ?Function

  constructor(props: Props) {
    super(props)
    const { history, match } = props
    this.state = { match: match || null, location: history && history.location }
    this.unlisten = history && history.listen(this.onHistoryChange)
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten()
  }

  onHistoryChange = () => {
    const { history, routePath, path, exact, strict } = this.props
    if (history) {
      const { location } = history
      const { match: oldMatch } = this.state
      const minimalRoute = { path: routePath || path, exact, strict }
      const minimalMatch = matchPath(location.pathname, minimalRoute)
      const route = { path, exact, strict }
      const match = matchPath(location.pathname, route)
      const shouldUpdateLocation = !!match
      let shouldUpdateMatch = false
      if (match && minimalMatch) {
        if (!oldMatch) {
          shouldUpdateMatch = true
        } else if (oldMatch.url !== match.url) {
          if (
            oldMatch.path !== minimalMatch.path &&
            oldMatch.url.includes(minimalMatch.url)
          ) {
            shouldUpdateMatch = true
          } else if (routePath && oldMatch.path === minimalMatch.path) {
            shouldUpdateMatch = true
          }
        }
      }
      if (shouldUpdateMatch) {
        this.setState({ match, location })
      } else if (shouldUpdateLocation) {
        this.setState({ location })
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !!nextState.match
  }

  render() {
    const { render, children, component: Component, history } = this.props
    const { match, location } = this.state
    if (!history || !location) {
      return null
    }
    const contextRouter = { history, match, location }
    if (render) {
      return render(contextRouter)
    } else if (children && typeof children === 'function') {
      return children(contextRouter)
    } else if (children && React.Children.count(children) === 0) {
      return React.cloneElement(children, contextRouter)
    } else if (Component) {
      return <Component match={match} location={location} history={history} />
    }
    return null
  }
}
