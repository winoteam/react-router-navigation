/* @flow */

import React, { PropTypes, Component } from 'react'
import { BackAndroid, NavigationExperimental } from 'react-native'
import _ from 'lodash'
import type { NavigationTransitionProps } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Action, NavigationState } from './StackTypeDefinitions'
import { getRoute, normalizeRoute } from './utils'

// @TODO need to import this from react-router / History
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
  render: (props: NavigationTransitionProps & { onNavigateBack: Function }) => React$Element<any>,
}

type Context = {
  match: Match,
  history: History,
}

type State = {
  navigationState: NavigationState,
  action: Action,
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
    const { action, entries, location } = history
    const parent = match && match.parent
    const currentRoute = normalizeRoute(getRoute({ children, parent, location }))
    const index = entries.findIndex(({ pathname }) => {
      return currentRoute && pathname === currentRoute.key
    })
    const routes = entries
      .map(({ pathname }) => {
        const entry = children
          .map((route) => normalizeRoute(route))
          .find((route) => route && route.key === pathname)
        return entry || { key: '', component: null } // @TODO remove || operator
      })
      .filter((route) => route && route.key)
    this.state = { navigationState: { index, routes }, action }
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

  onListenHistory = (): void => {
    // Get current route
    const { navigationState } = this.state
    const route = navigationState.routes[navigationState.index].component
    // Get next route
    const { children } = this.props
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    // Local state must be updated ?
    if (nextRoute && route && route.props.pattern !== nextRoute.props.pattern) {
      if (action === 'PUSH') {
        this.setState({
          navigationState: NavigationStateUtils.push(
            navigationState,
            normalizeRoute(nextRoute),
          ),
          action,
        })
      } else if (action === 'POP') {
        this.setState({
          navigationState: NavigationStateUtils.pop(navigationState),
          action,
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
    const { navigationState } = this.state
    const nextNavigationState = nextState.navigationState
    return (
      navigationState.index !== nextNavigationState.index ||
      !_.isEqual(
        navigationState.routes.map(({ key }) => key),
        nextNavigationState.routes.map(({ key }) => key),
      )
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
