/* @flow */

import React, { PropTypes, Component } from 'react'
import type { NavigationState } from './types'
import routerReducer from './routerReducer'
import Navigation from './Navigation'

class Router extends Component {

  props: NavigationState
  state: NavigationState

  componentWillMount() {
    this.state = {
      index: 0,
      routes: [this.props.scenes[0]],
    }
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
     return {
       router: {
         push: (location) => this.push(location),
       },
     }
  }

  push = (location: string): void => {
    const { scenes } = this.props
    const route = scenes.find((scene) => scene.key == location)
    this.onNavigate({ type: 'push', route })
  }

  pop = (): void => {
    this.onNavigate({ type: 'pop' })
  }

  onNavigate = (action: Object): void => {
    const newState = routerReducer(this.state, action)
    this.setState(newState)
  }

  render() {
    return (
      <Navigation
        {...this.props}
        appNavigationState={this.state}
        onNavigate={(action) => this.onNavigate(action)}
      />
    )
  }

}

export default Router
