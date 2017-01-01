/* @flow */

import React, { PropTypes, Component } from 'react'
import { Dimensions } from 'react-native'
import { TabViewTransitioner } from 'react-native-tab-view'
import _ from 'lodash'
import type { SceneRendererProps, NavigationState } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tab, MatchTabProps } from './StackTypeDefinitions'
import { getCurrentRoute, buildTabs } from './utils'

type Props = {
  style?: StyleSheet | Array<?StyleSheet>,
  children: Array<React$Element<MatchTabProps>>,
  render: (
    props: SceneRendererProps & {
      tabs: Array<Tab>,
      onRequestChangeTab: (index: number) => void,
    }) => React$Element<any>,
}

// @TODO tpye check match and history
type Context = {
  match: any,
  history: any,
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
    // Build the tab stack
    const { children } = props
    const tabs = buildTabs(children)
    // Get initial route
    const { match, history } = context
    const { location } = history
    const parent = match && match.parent
    const currentRoute = getCurrentRoute(tabs, parent, location)
    // Build navigation state
    const routes = tabs.map(({ key }) => ({ key }))
    const index = routes.findIndex((route) => {
      if (!currentRoute) return false
      return currentRoute.key === route.key
    })
    const navigationState = { index, routes }
    // Save everything in state
    this.state = { navigationState, tabs }
  }

  // Listen history from <MemoryRouter />
  componentDidMount(): void {
    const { history } = this.context
    this.unlistenHistory = history.listen(this.onListenHistory)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    this.unlistenHistory()
  }

  // Listen all history events
  onListenHistory = (): void => {
    // Get current route
    const { navigationState, tabs } = this.state
    const route = navigationState.routes[navigationState.index]
    const currentTab = tabs.find((tab) => route && tab.key === route.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getCurrentRoute(tabs, parent, location)
    // Local state must be updated ?
    if (nextRoute && ((currentTab && currentTab.key !== nextRoute.key) || !currentTab)) {
      if (action === 'REPLACE') {
        const index = navigationState.routes
          .findIndex(({ key }) => key === nextRoute.key)
        this.setState({
          navigationState: {
            ...navigationState,
            index,
          },
        })
      }
    }
  }

  // Callback for when the current tab changes
  onRequestChangeTab = (index: number): void => {
    const tab = this.state.tabs[Math.round(index)]
    if (tab) this.context.history.replace(tab.key)
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
    const { width, height } = Dimensions.get('window')
    return (
      <TabViewTransitioner
        style={this.props.style}
        initialLayout={{ width, height }}
        navigationState={this.state.navigationState}
        configureTransition={() => null}
        onRequestChangeTab={this.onRequestChangeTab}
        render={(props: SceneRendererProps) => this.props.render({
          ...this.state,
          ...props,
          onRequestChangeTab: this.onRequestChangeTab,
        })}
      />
    )
  }

}

export default TabStack
