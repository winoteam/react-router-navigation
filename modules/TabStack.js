/* @flow */

import React, { PropTypes, Component } from 'react'
import { TabViewTransitioner } from 'react-native-tab-view'
import _ from 'lodash'
import type { SceneRendererProps, NavigationState } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tab } from './StackTypeDefinitions'
import { getRoute } from './utils'

// @TODO react-router and history need to have official flow types
import type { Match, History } from './../types'

type Props = {
  children: Array<React$Element<{
    pattern: string,
    component: React$Element<any>,
  }>>,
  render: (
    props: SceneRendererProps & {
      tabs: Array<Tab>,
    }) => React$Element<any>,
}

type Context = {
  match: Match,
  history: History,
}

type State = {
  navigationState: NavigationState,
  tabs: Array<Tab>,
}

class TabStack extends Component<void, Props, State> {

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
    const { location } = history
    const parent = match && match.parent
    const currentRoute = getRoute({ children, parent, location })
    const routes = children.map((child) => ({ key: child.props.pattern }))
    const index = routes.findIndex(({ key }) => {
      return currentRoute && currentRoute.props.pattern === key
    })
    const tabs = children.map((child) => ({
      key: child.props.pattern,
      component: child.props.component,
    }))
    this.state = {
      navigationState: { index, routes },
      tabs,
    }
  }

  // Listen history from <MemoryRouter />
  componentDidMount() {
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
  }

  // Remove all listeners
  componentWillUnmount() {
    this.unlistenHistory()
  }

  // Listen all history events
  onListenHistory = (): void => {
    // Get current route
    const { navigationState } = this.state
    const { children } = this.props
    const route = navigationState.routes[navigationState.index]
    const tab = children.find((child) => child.props.pattern === route.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getRoute({ children, parent, location })
    // Local state must be updated ?
    if (nextRoute && tab && tab.props.pattern !== nextRoute.props.pattern) {
      if (action === 'REPLACE') {
        const index = navigationState.routes
          .findIndex(({ key }) => key === nextRoute.props.pattern)
        this.setState({
          navigationState: {
            ...navigationState,
            index,
          },
        })
      }
    }
  }

  onRequestChangeTab = () => {
    this.setState({
      tabs: this.state.tabs,
    })
  }

  // Render when index is updated or when
  // one route is updated
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !_.isEqual(
      this.state.navigationState,
      nextState.navigationState,
    )
  }

  // Render into <TabViewTransitioner /> with
  // custom render() prop
  // !! Warning: transitions are disabled by default !!
  render(): React$Element<any> {
    return (
      <TabViewTransitioner
        navigationState={this.state.navigationState}
        configureTransition={() => null}
        onRequestChangeTab={this.onRequestChangeTab}
        render={(props: SceneRendererProps) => this.props.render({
          ...this.state,
          ...props,
        })}
      />
    )
  }

}

export default TabStack
