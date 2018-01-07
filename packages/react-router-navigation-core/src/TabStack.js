/* @flow */

import React from 'react'
import { type RouterHistory, type Location, withRouter } from 'react-router'
import type { NavigationState, TabsRendererProps, Tab } from './TypeDefinitions'
import * as StackUtils from './StackUtils'
import * as HistoryUtils from './HistoryUtils'

type Props = {
  history: RouterHistory, // eslint-disable-next-line
  children?: Array<React$Element<*>>,
  render: (props: TabsRendererProps) => React$Element<*>, // eslint-disable-next-line
  lazy?: boolean,
  forceSync?: boolean,
}

type State = {
  navigationState: NavigationState<{
    title?: string,
    testID?: string,
  }>,
  tabs: Array<Tab>,
  loadedTabs: Array<string>,
  rootIndex: number,
  tabsHistory: { [key: number]: Array<Location> },
}

class TabStack extends React.PureComponent<Props, State> {
  static defaultProps = {
    forceSync: false,
  }

  unlistenHistory: ?Function

  constructor(props: Props) {
    super(props)
    // Build the tab stack
    const { children, history: { location, entries } } = props
    const tabs = children && StackUtils.build(children)
    if (!tabs) throw new Error('No children found')
    // Get initial route
    const currentRoute = StackUtils.getRoute(tabs, location)
    if (!currentRoute) throw new Error('No initial route found !')
    // Build navigation state
    const routes = tabs.map(tab => {
      const route = {
        key: tab.key,
        routeName: tab.path || '',
      }
      return {
        ...route,
        key: StackUtils.createKey(route),
      }
    })
    const index = routes.findIndex(
      ({ routeName }) => currentRoute.routeName === routeName,
    )
    const navigationState = { index, routes }
    const rootIndex = props.history.index || 0
    // Initialyze cached history
    if (!entries) throw new Error('No history entries found')
    const tabsHistory = {
      [index]: entries.slice(props.history.index),
    }
    // Initialize loaded tabs
    const loadedTabs = [currentRoute.routeName]
    // Save everything
    this.state = { navigationState, tabs, rootIndex, tabsHistory, loadedTabs }
  }

  componentDidMount() {
    const { history } = this.props
    this.unlistenHistory = HistoryUtils.runHistoryListenner(
      history,
      this.onListenHistory,
    )
  }

  componentWillUnmount() {
    if (this.unlistenHistory) this.unlistenHistory()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { children } = nextProps
    const { tabs } = this.state
    const nextTabs = children && StackUtils.build(children, tabs)
    this.setState({ tabs: nextTabs })
  }

  onListenHistory = (history: RouterHistory, nextHistory: RouterHistory) => {
    // Extract props
    const { location } = history
    const { location: nextLocation, entries, index } = nextHistory
    const { navigationState, tabs, rootIndex } = this.state
    // Get current tab
    const currentRoute = navigationState.routes[navigationState.index]
    const currentTab = StackUtils.get(tabs, currentRoute)
    // Get next tab
    const nextRoute = StackUtils.getRoute(tabs, nextLocation)
    if (!nextRoute) return
    const nextTab = StackUtils.get(tabs, nextRoute)
    const nextIndex = navigationState.routes.findIndex(({ routeName }) => {
      return routeName === nextRoute.routeName
    })
    // Update navigation state
    if (
      currentTab &&
      nextTab &&
      StackUtils.shouldUpdate(currentTab, nextTab, location, nextLocation)
    ) {
      this.setState(prevState => ({
        navigationState: {
          index: nextIndex,
          routes: prevState.navigationState.routes,
        },
        loadedTabs: prevState.loadedTabs.includes(nextRoute.routeName)
          ? prevState.loadedTabs
          : [...prevState.loadedTabs, nextRoute.routeName],
      }))
    }
    // Save history
    if (
      nextRoute &&
      entries &&
      index !== undefined &&
      entries[index] &&
      nextLocation.pathname === entries[index].pathname
    ) {
      this.state.tabsHistory[nextIndex] = entries.slice(rootIndex, index + 1)
    }
  }

  onIndexChange = (index: number) => {
    if (index < 0) return
    const {
      lazy,
      forceSync,
      history: { entries, index: historyIndex },
    } = this.props
    const { navigationState, tabsHistory, tabs, rootIndex } = this.state
    if (index !== navigationState.index) {
      // 1) Set index directly
      if (!lazy || tabsHistory[index]) {
        this.setState(prevState => ({
          navigationState: {
            ...prevState.navigationState,
            index,
          },
        }))
      }
      // 2) Resync history if needed
      if (forceSync && entries) {
        // Re-build hisstory
        const newEntries = tabsHistory[index]
          ? [...entries.slice(0, rootIndex), ...tabsHistory[index]]
          : entries.slice(0, rootIndex + 1)
        const newIndex = tabsHistory[index] ? newEntries.length - 1 : rootIndex
        // Save it
        this.props.history.entries = [...newEntries]
        this.props.history.location = { ...newEntries[newIndex] }
        this.props.history.index = newIndex
        this.props.history.length = newEntries.length
      }
      // 3) Prevent history of changes
      // Warning: we must deal with this king of thing:
      // const App = () => (
      //   <Tabs>
      //     <Tab
      //       path="/hello"
      //     />
      //     <Tab
      //       path="/:params"
      //       onIndexChange={({ history }) => history.push('/one')}
      //     />
      //   </Tabs>
      // )
      if (!tabsHistory[index]) {
        const entry = tabs[index]
        if (entry.onIndexChange) {
          entry.onIndexChange(index)
        } else if (entry.path) {
          this.props.history.replace(entry.path)
        }
      } else {
        const entry = tabsHistory[index].slice(-1)[0]
        this.props.history.replace(entry.pathname, entry.state)
      }
    } else {
      // 4) Reset tab
      const tab = tabs[index]
      const n = rootIndex - (historyIndex || 0)
      if (n < 0) {
        this.props.history.go(n)
      } else {
        const props = { ...this.props, ...tab }
        if (props.onReset) props.onReset(props)
      }
    }
  }

  // Render view
  render() {
    return this.props.render({
      ...this.state,
      history: this.props.history,
      onIndexChange: this.onIndexChange,
    })
  }
}

const TabStackWithHistory = withRouter(TabStack)

export default TabStackWithHistory
