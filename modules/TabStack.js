/* @flow */
/* eslint no-lonely-if: 0 */

import React, { PropTypes, Component } from 'react'
import { Dimensions } from 'react-native'
import { TabViewTransitioner } from 'react-native-tab-view'
import _ from 'lodash'
import type { SceneRendererProps, NavigationState } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tabs, TabProps } from './TabTypeDefinitions'
import type { Match, History, Entries } from './HistoryTypeDefinitions'
import { getCurrentRoute, buildTabs, getCleanedHistory } from './utils'

type Props = {
  style?: StyleSheet | Array<?StyleSheet>,
  children: Array<React$Element<TabProps>>,
  render: (
    props: SceneRendererProps & {
      tabs: Tabs,
      onRequestChangeTab: (index: number) => void,
    }) => React$Element<any>,
}

type DefaultProps = {}

type Context = {
  match: Match,
  history: History,
}

type State = {
  navigationState: NavigationState,
  tabs: Tabs,
  tabsEntries: {
    [key: number]: Entries,
  },
  firstEntryIndex: number,
}

class TabStack extends Component<DefaultProps, Props, State> {

  props: Props
  state: State
  context: Context

  static defaultProps: DefaultProps = {
    syncHistoryEntries: false,
  }

  static contextTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  }

  unlistenHistory: Function

  // Initialyze navigation state with
  // initial history
  constructor(props: Props, context: Context): void {
    super(props, context)
    // Build the tab stack
    const { children } = props
    const tabs = buildTabs(children)
    // Get initial route
    const { match, history } = context
    const { location, entries } = history
    const parent = match && match.parent
    const currentRoute = getCurrentRoute(tabs, parent, location)
    // Build navigation state
    const routes = tabs.map(({ key }) => ({ key }))
    const index = routes.findIndex((route) => {
      if (!currentRoute) return false
      return currentRoute.key === route.key
    })
    const navigationState = { index, routes }
    // Link history entries to current tab
    const tabsEntries = {}
    tabsEntries[index] = [...entries]
    const firstEntryIndex = entries.length - 1
    // Save everything in state
    this.state = { navigationState, tabs, tabsEntries, firstEntryIndex }
  }

  // Listen history from <MemoryRouter />
  componentDidMount(): void {
    const { history } = this.context
    // @TODO $FlowFixMe
    this.unlistenHistory = history.listen(this.onListenHistory)
  }

  // Remove all listeners
  componentWillUnmount(): void {
    this.unlistenHistory()
  }

  // Listen all history events
  onListenHistory = (): void => {
    // Get current route
    const { navigationState, tabs, firstEntryIndex, tabsEntries } = this.state
    const route = navigationState.routes[navigationState.index]
    const currentTab = tabs.find((tab) => route && tab.key === route.key)
    // Get next route
    const { history, match } = this.context
    const { action, location } = history
    const parent = match && match.parent
    const nextRoute = getCurrentRoute(tabs, parent, location)
    const currentTabIndex = navigationState.routes
      .findIndex(({ key }) => nextRoute && key === nextRoute.key)
    if (nextRoute) {
      // Save tab entries
      const nextHistory = getCleanedHistory(
        history,
        { tabs, tabsEntries, currentTabIndex, firstEntryIndex }
      )
      this.state.tabsEntries = {
        ...tabsEntries,
        [currentTabIndex]: [...nextHistory.entries],
      }
      // Local state must be updated ?
      if ((currentTab && currentTab.key !== nextRoute.key) || !currentTab) {
        if (action === 'REPLACE') {
          // Sync history entries
          Object.assign(this.context.history, nextHistory)
          // Update navigation state and tabsEntries
          this.setState({
            navigationState: {
              ...navigationState,
              index: currentTabIndex,
            },
          })
        }
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
