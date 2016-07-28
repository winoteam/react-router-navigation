 /* @flow */

import React, { Component, PropTypes } from 'react'
import navigationState, { INIT, PUSH, POP } from './../../reducer'
import Navigation from './../Navigation'
import extractScenes from './../../utils/extractScenes'
import type { NavigationScenes, NavigationRoute, NavigationState } from './../../types'

type Props = {
  children: Array<React$Element<any>>,
}

class Router extends Component {

  props: Props
  state: NavigationState & {
    scenes: Array<NavigationRoute>,
  }


  // Initilize router at index 0 with
  // first scene pass as props
  componentWillMount() {
    const routes = extractScenes(this.props.children)
    const action = { type: INIT, routes }
    const state = navigationState({}, action)
    this.state = state
  }


  // Indicates a new item was added to
  // the history
  push = (location: string): void => {
    const currentRoute = this.state.routes[this.state.index]
    const siblingRoutes = extractScenes(this.props.children)
    const childrenRoutes = currentRoute.children
      ? extractScenes(currentRoute.children)
      : []
    const route = [...siblingRoutes, ...childrenRoutes]
      .find((scene) => scene.key == location)
    this.dispatch({ type: PUSH, route })
  }


  // Indicates there is a new current item,
  // i.e. the "current pointer" changed
  pop = (): void => {
    this.dispatch({ type: POP })
  }


  // Dispatch an action and update
  // local state
  dispatch = (action: { type: string }): void => {
    const state = navigationState(this.state, action)
    this.setState(state)
  }


  // Provid push and pop action to
  // components tree via react context
  static childContextTypes = { router: PropTypes.object.isRequired }
  getChildContext() {
     return {
       router: {
         push: this.push,
         pop: this.pop,
       },
     }
  }


  // Render navigation state into
  // <Navigation /> component provided
  // by NavigationExperimental API
  render() {
    return (
      <Navigation
        navigationState={this.state}
        push={this.push}
        pop={this.pop}
      />
    )
  }

}

export default Router
