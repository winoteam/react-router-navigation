/* @flow */
/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react'
import navigationState, { INIT, PUSH, POP, CHANGE_TAB } from './../../reducer'
import Navigation from './../Navigation'
import extractScenes from './../../utils/extractScenes'
import type { NavigationScene, NavigationState, NavigationAction, NavigationContext } from './../../types'

type Props = {
  children: Array<React$Element<NavigationScene>>
}

type State = NavigationState

class Router extends Component {

  props: Props
  state: State


  // Initilize navigation state at
  // index 0 with first scene pass
  // as props
  componentWillMount() {
    const routes = extractScenes(this.props.children)
    const action = { type: INIT, routes }
    const state = navigationState({
      index: 0,
      path: '0',
      routes: Array,
    }, action)
    this.state = state
  }


  // Indicates a new item was added to
  // the historyééé
  push = (key: string): void => {
    const currentRoute = this.state.routes[this.state.index]
    const siblingRoutes = extractScenes(this.props.children)
    const childrenRoutes = currentRoute.children
      ? extractScenes(currentRoute.children)
      : []
    const route = [...siblingRoutes, ...childrenRoutes]
      .find((scene) => scene.key === key)
    this.dispatch({ type: PUSH, route })
  }


  // Indicates there is a new current item,
  // i.e. the "current pointer" changed
  pop = () => {
    this.dispatch({ type: POP })
  }


  // Indicates there is a new targeted
  // tab added to the history
  changeTab = (index: number) => {
    this.dispatch({ type: CHANGE_TAB, index })
  }


  // Dispatch an action and update
  // local state
  dispatch = (action: NavigationAction) => {
    const state = navigationState(this.state, action)
    this.setState(state)
  }


  // Provid push and pop action to
  // components tree via react context
  static childContextTypes = { router: PropTypes.object.isRequired }
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
