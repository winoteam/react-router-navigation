/* @flow */
/* eslint max-len: 0 */
/* eslint space-infix-ops: 0 */

import React, { Component, PropTypes } from 'react'
import navigationState, { INIT, PUSH, POP, CHANGE_TAB } from './../../reducer'
import Navigation from './../Navigation'
import { extractScenes, getSiblingScenes } from './../../helpers/utils'
import type { NavigationScene, NavigationState, NavigationAction, NavigationContext } from './../../types'

type Props = {
  children?: Array<React$Element<NavigationScene>>
}

type State = NavigationState

class Router extends Component {

  props: Props
  state: State


  // Initilize navigation state at
  // index 0 with first scene pass
  // as props
  componentWillMount() {
    const { children } = this.props
    const routes = extractScenes(children)
    const action = { type: INIT, routes }
    const state = navigationState({
      index: 0,
      path: '0',
      children,
      routes: [],
    }, action)
    this.state = state
  }


  // Indicates a new item was added to
  // the history
  push = (key: string, callback: Function): void => {
    const scenes = getSiblingScenes(this.state)
    const route = scenes.find((scene) => scene.key === key)
    this.dispatch({ type: PUSH, route }, callback)
  }


  // Indicates there is a new current item,
  // i.e. the "current pointer" changed
  pop = (callback: Function) => {
    this.dispatch({ type: POP }, callback)
  }


  // Indicates there is a new targeted
  // tab added to the history
  changeTab = (index: number, callback: Function) => {
    this.dispatch({ type: CHANGE_TAB, index }, callback)
  }


  // Dispatch an action and update
  // local state
  dispatch = (action: NavigationAction, callback?: Function = () => true) => {
    const state = navigationState(this.state, action)
    if (typeof callback === 'function') callback(state)
    this.setState(state)
  }


  // Provid push and pop action to
  // components tree via react context
  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }
  getChildContext(): NavigationContext {
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
        changeTab={this.changeTab}
      />
    )
  }

}

export default Router
