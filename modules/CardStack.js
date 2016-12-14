/* @flow */

import React, { PropTypes, Component } from 'react'
import { BackAndroid, NavigationExperimental } from 'react-native'
import _ from 'lodash'
import { getRoute, normalizeRoute } from './utils'
import type { NavigationState, SceneProps, Match, History } from './../types'

const {
  Transitioner: NavigationTransitioner,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

type Props = {
  children: Array<React$Element<any>>,
  children: (props: SceneProps & { onNavigateBack: Function }) => React$Element<any>,
}

type Context = {
  match: Match,
  history: History,
}

type State = NavigationState

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State
  context: Context

  static contextTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  constructor(props: Props, context: Context): void {
    super(props, context)
    // Initialyze state with a first route
    const { children } = props
    const { match, history } = context
    const { location } = history
    const parent = match && match.parent
    const route = getRoute({ children, parent, location })
    const routes = children.map(normalizeRoute)
    this.state = {
      index: 0,
      routes: routes.filter(({ key }) => key === route.props.pattern),
    }
  }

  componentDidMount() {
    // Listen history from <MemoryRouter />
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
    // Listen hardware BackAndroid event
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack)
  }

  componentWillUnmount() {
    // Remove listeners
    this.unlistenHistory()
    BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  onListenHistory = (): void => {
    // Get current route
    const navigationState = this.state
    const route = navigationState.routes[navigationState.index].component
    // Get next route
    const { children } = this.props
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    // Local state must be updated ?
    if (nextRoute && route.props.pattern !== nextRoute.props.pattern) {
      // Push a new route
      if (action === 'PUSH') {
        this.setState(
          NavigationStateUtils.push(
            navigationState,
            normalizeRoute(nextRoute),
          ),
        )
      }
      // Pop a route (n-1)
      else if (action === 'POP') {
        this.setState(
          NavigationStateUtils.pop(navigationState),
        )
      }
    }
  }

  onNavigateBack = (): boolean => {
    // Pop to previous scene (n-1)
    if (this.state.index > 0) {
      this.context.history.goBack()
      return true
    }
    return false
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return (
      this.state.index !== nextState.index ||
      !_.isEqual(
        this.state.routes.map(({ key }) => key),
        nextState.routes.map(({ key }) => key),
      )
    )
  }

  render(): React$Element<any> {
    // Render into <NavigationTransitioner /> with
    // custom render prop
    return (
      <NavigationTransitioner
        navigationState={this.state}
        configureTransition={() => null}
        render={(props) => this.props.render({
          ...props,
          onNavigateBack: this.onNavigateBack,
        })}
      />
    )
  }

}

export default CardStack
