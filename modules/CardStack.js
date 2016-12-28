/* @flow */

import React, { PropTypes, Component } from 'react'
import { BackAndroid, NavigationExperimental } from 'react-native'
import _ from 'lodash'
import type { NavigationState, NavigationTransitionProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card } from './StackTypeDefinitions'
import { getRoute } from './utils'

// @TODO react-router and history need to have official flow types
import type { Match, History } from './../types'

const {
  Transitioner: NavigationTransitioner,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

type Props = {
  children: Array<React$Element<{
    pattern: string,
    component: React$Element<any>,
  }>>,
  render: (
    props: NavigationTransitionProps & {
      cards: Array<Card>,
      onNavigateBack: Function,
    }) => React$Element<any>,
}

type Context = {
  match: Match,
  history: History,
}

type State = {
  navigationState: NavigationState,
  cards: Array<Card>,
}

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  unlistenHistory: Function

  static contextTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  // Initialyze navigation state with
  // initial history
  constructor(props: Props, context: Context): void {
    super(props, context)
    const { children } = props
    const { match, history } = context
    const { entries, location } = history
    const parent = match && match.parent
    const currentRoute = getRoute({ children, parent, location })
    const index = entries.findIndex(({ pathname }) => {
      return currentRoute && currentRoute.props.pattern === pathname
    })
    const routes = entries
      .map(({ pathname }) => {
        const entry = children
          .map((child) => ({ key: child.props.pattern }))
          .find((route) => route && route.key === pathname)
        return entry || { key: '' }
      })
      .filter(({ key }) => key)
    const navigationState = { index, routes }
    const cards = children.map((child) => ({
      key: child.props.pattern,
      component: child.props.component,
    }))
    this.state = { navigationState, cards }
  }

  // Listen history from <MemoryRouter /> and
  // hardware BackAndroid event
  componentDidMount() {
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Remove all listeners
  componentWillUnmount() {
    this.unlistenHistory()
    BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // Listen all history events
  onListenHistory = (): void => {
    // Get current route
    const { navigationState } = this.state
    const { children } = this.props
    const route = navigationState.routes[navigationState.index]
    const card = children.find((child) => child.props.pattern === route.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    // Local state must be updated ?
    if (nextRoute && card && card.props.pattern !== nextRoute.props.pattern) {
      if (action === 'PUSH') {
        this.setState({
          navigationState: NavigationStateUtils.push(
            navigationState,
            { key: nextRoute.props.pattern },
          ),
        })
      } else if (action === 'POP') {
        this.setState({
          navigationState: NavigationStateUtils.pop(navigationState),
        })
      }
    }
  }

  // Pop to previous scene (n-1)
  onNavigateBack = (): boolean => {
    if (this.state.navigationState.index > 0) {
      this.context.history.goBack()
      return true
    }
    return false
  }

  // Render when index is updated or when
  // one route is updated
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !_.isEqual(
      this.state.navigationState,
      nextState.navigationState,
    )
  }

  // Render into <NavigationTransitioner /> with
  // custom render() prop
  // !! Warning: transitions are disabled by default !!
  render(): React$Element<any> {
    return (
      <NavigationTransitioner
        navigationState={this.state.navigationState}
        configureTransition={() => null}
        render={(props: NavigationTransitionProps) => this.props.render({
          ...this.state,
          ...props,
          onNavigateBack: this.onNavigateBack,
        })}
      />
    )
  }

}

export default CardStack
