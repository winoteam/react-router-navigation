 /* @flow */

import React, { Component, PropTypes } from 'react'
import navigationState, { POP, PUSH } from './../../reducer'
import Navigation from './../Navigation'
import type { NavigationScenes, NavigationState } from './../../types'

type Props = {
  scenes: React$Element<any>,
  children: React$Element<any>,
}

class Router extends Component {

  props: Props
  state: NavigationState


  // Initilize router at index 0 with
  // first scene pass as props
  componentWillMount() {
    const scenes = this.props.scenes
      ? this.props.scenes
      : this.props.children
    this.state = {
      index: 0,
      routes: [this.props.scenes[0]],
    }
  }


  // Indicates a new item was added to
  // the history
  push = (location: string): void => {
    const { scenes } = this.props
    const route = scenes.find((scene) => scene.key == location)
    this.dispatch({ type: PUSH, route })
  }


  // Indicates there is a new current item,
  // i.e. the "current pointer" changed
  pop = (): void => {
    this.dispatch({ type: POP })
  }


  // Dispatch an action and update local
  // state
  dispatch = (action: { type: string }): void => {
    const state = navigationState(this.state, action)
    this.setState(state)
  }


  // Provid push and pop action to components
  // tree via react context
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
