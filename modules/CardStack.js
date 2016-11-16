/* @flow */

import React, { Component } from 'react'
import { BackAndroid, NavigationExperimental, StyleSheet } from 'react-native'
import Provider from './Provider'
import { getRoute, getOptions } from './utils'
import type { NavigationState, SceneProps, Match, Location, History } from './../types'

const {
  Transitioner: NavigationTransitioner,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type ProviderProps = {
  children: Array<React$Element<any>>,
  render: (props: SceneProps & { onNavigateBack: Function }) => React$Element<any>,
}

type Props = ProviderProps & {
  match: Match,
  location: Location,
  history: History,
}

type State = NavigationState

class CardStack extends Component<void, Props, State> {

  props: Props
  state: State

  // Initialyze state with a first route
  constructor(props: Props): void {
    super(props)
    const { match, location, children } = props
    const parent = match && match.parent
    const route = getRoute({ children, parent, location })
    this.state = {
      index: 0,
      routes: [{
        key: route.props.pattern,
        component: route,
        ...getOptions(route.props.component),
      }],
    }
  }

  // Listen hardwareBackPress evennt
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack)
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onNavigateBack)
  }

  // When a new route is pushed, update the
  // navigtion state with NavigationStateUtils
  componentWillReceiveProps(nextProps: Props): void {
    const { routes } = this.state
    const { match, location, children } = nextProps
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    if (nextRoute) {
      const key = nextRoute.props.pattern
      if (routes.slice(-1)[0].key !== key) {
        this.setState(
          NavigationStateUtils.push(
            this.state,
            {
              key,
              component: nextRoute,
              ...getOptions(nextRoute.props.component),
            }
          )
        )
      }
    }
  }

  // Pop to previous scene
  // @TODO: use NavigationStateUtils
  onNavigateBack = (): boolean => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
        routes: this.state.routes.slice(0, -1),
      })
      return true
    }
    return false
  }

  // Render <CardStack /> when navigation state
  // index is updated
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return this.state.index !== nextState.index
  }

  // Render with <NavigationTransitioner />
  // (from NavigationExperimental)
  render(): React$Element<any> {
    return (
      <NavigationTransitioner
        style={styles.container}
        navigationState={this.state}
        render={(props) => this.props.render({
          ...props,
          onNavigateBack: this.onNavigateBack,
        })}
      />
    )
  }

}

export default (props): React$Element<any> => (
  <Provider>
    {({ location, history, match }) => (
      <CardStack
        {...props}
        location={location}
        history={history}
        match={match}
      />
    )}
  </Provider>
)
