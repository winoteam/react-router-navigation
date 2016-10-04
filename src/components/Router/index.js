/* @flow */
/* eslint max-len: 0 */
/* eslint space-infix-ops: 0 */

import React, { Component, PropTypes } from 'react'
import navigationState, { INIT, RESET, PUSH, REPLACE, POP, FOCUS, CHANGE_TAB } from './../../reducer'
import Navigation from './../Navigation'
import { extractScenes, getSiblingScenes, getCurrentRoute } from './../../utils'
import type { NavigationScene, NavigationState, NavigationAction, NavigationContext, NavigationLocation } from './../../types'

type Props = {
  children?: Array<React$Element<NavigationScene>>,
  scenes?: Array<React$Element<NavigationScene>>,
  reducer: (state: NavigationState, action: NavigationAction) => void,
}

type State = NavigationState & {
  key: number,
}

class Router extends Component {

  props: Props
  state: State


  // Initilize navigation state at index 0
  // with first scene pass as props
  componentWillMount() {
    const { children, scenes } = this.props
    const routes = children
      ? extractScenes(children)
      : extractScenes(scenes)
    const action = { type: INIT, routes }
    const state = navigationState({
      index: 0,
      path: '0',
      children: routes,
      routes: [],
    }, action)
    this.state = {
      ...state,
      key: Math.random(),
    }
  }


  // Indicates a new item was added to
  // the history
  push = (location: NavigationLocation, callback: Function): void => {
    const key = typeof location === 'string' ? location : location.key
    const scenes = getSiblingScenes(this.state)
    const route = scenes.find((scene) => scene.key === key)
    if (!route) throw new Error(`No scene is defined for key "${key}".`)
    this.dispatch({ type: PUSH, location, route }, callback)
  }


  // Replace a scene when a new one
  replace = (location: NavigationLocation, callback: Function): void => {
    const key = typeof location === 'string' ? location : location.key
    const scenes = getSiblingScenes(this.state)
    const route = scenes.find((scene) => scene.key === key)
    if (!route) throw new Error(`No scene is defined for key "${key}".`)
    this.dispatch({ type: REPLACE, location, route }, callback)
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


  // Reset all navigation state
  reset = (callback: Function) => {
    const { children, scenes } = this.props
    const routes = children
      ? extractScenes(children)
      : extractScenes(scenes)
    this.dispatch({ type: RESET, routes }, callback)
  }


  // Dispatch an action and update
  // local state + dispatch focus action
  lastDispatch = 0
  dispatch = (action: NavigationAction, callback?: Function = () => true) => {
    if (Date.now() - this.lastDispatch < 250) return // Prevent force push
    this.lastDispatch = Date.now()
    const { reducer } = this.props
    const state = navigationState(this.state, action)
    if (typeof callback === 'function') callback(state)
    if (reducer) {
      reducer(state, action)
      const route = getCurrentRoute(state)
      const key = `scene_${route.key}`
      reducer(state, { type: FOCUS, key })
    }
    if (action.type === RESET) {
      this.setState({ ...state, key: Math.random() } )
    }
    else this.setState(state)
  }


  // Provid push and pop action to components
  // tree via react context
  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }
  getChildContext(): NavigationContext {
    return {
      router: {
        reset: this.reset,
        push: this.push,
        replace: this.replace,
        pop: this.pop,
      },
    }
  }


  // Render navigation state into <Navigation />
  // component provided by NavigationExperimental
  // API
  render() {
    const { key } = this.state // use to re mount <Navigation />
    return (
      <Navigation
        {...this.props}
        key={key}
        navigationState={this.state}
        push={this.push}
        pop={this.pop}
        reset={this.reset}
        replace={this.replace}
        changeTab={this.changeTab}
      />
    )
  }

}

export default Router
