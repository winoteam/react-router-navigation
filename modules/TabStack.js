/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types:0 */

import { Component } from 'react'
import { matchPath } from 'react-router'
import type { ContextRouter, Location } from 'react-router'
import type { NavigationState, TabsRendererProps, Tab, TabProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type Props = ContextRouter & {
  // eslint-disable-next-line
  children?: Array<React$Element<TabProps>>,
  render: (props: TabsRendererProps) => React$Element<any>,
  // eslint-disable-next-line
  forceSync?: boolean,
}

type DefaultProps = {
  forceSync: boolean,
}

type State = {
  navigationState: NavigationState<{
    title?: string,
    testID?: string,
  }>,
  tabs: Array<Tab>,
  rootIndex: number,
  isPending: boolean,
  history: { [key: number]: Array<Location> },
}

class TabStack extends Component<DefaultProps, Props, State> {

  props: Props
  state: State

  unlisten: Function

  static defaultProps = {
    forceSync: false,
  }

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the tab stack $FlowFixMe
    const { children, history: { entries, location } } = props
    const tabs = children && StackUtils.build(children)
    if (!tabs) throw new Error('No children found')
    // Get initial route
    const currentRoute = StackUtils.getRoute(tabs, location)
    if (!currentRoute) throw new Error('No route found !')
    // Build navigation state
    const routes = tabs.map((tab) => {
      const route = {
        key: tab.key,
        routeName: tab.path,
        match: matchPath(location.pathname, tab),
      }
      return {
        ...route,
        key: StackUtils.createKey(route),
      }
    })
    const index = routes.findIndex(({ routeName }) => currentRoute.routeName === routeName)
    const navigationState = { index, routes }
    const rootIndex = props.history.index || 0
    // Initialyze cached history
    const history = {
      [index]: entries.slice(location.index),
    }
    // Set isPending
    const isPending = false
    // Save everything
    this.state = { navigationState, tabs, rootIndex, history, isPending }
  }

  componentDidMount(): void {
    this.unlisten = this.props.history.listen(this.onChangeHistory)
  }

  componentWillUnmount(): void {
    this.unlisten()
  }

  // Listen history events
  onChangeHistory = (location: Location): void => {
    if (this.state.isPending) return
    // Get current route $FlowFixMe
    const { history: { entries } } = this.props
    const { navigationState: { routes, index }, tabs, rootIndex } = this.state
    // Get current tab
    const currentRoute = routes[index]
    const currentTab = StackUtils.get(tabs, currentRoute)
    // Get next tab
    const nextRoute = StackUtils.getRoute(tabs, location)
    if (!nextRoute) return
    const nextTab = StackUtils.get(tabs, nextRoute)
    const nextIndex = routes.findIndex(({ routeName }) => routeName === nextRoute.routeName)
    // Update navigation state
    if (
      currentTab && nextTab &&
      StackUtils.shouldUpdate(currentTab, nextTab, this.props.location, location)
    ) {
      this.setState(({ navigationState }) => ({
        navigationState: {
          index: nextIndex,
          routes: navigationState.routes,
        },
      }))
    }
    // Update history
    if (nextRoute) {
      this.state.history[nextIndex] = entries.slice(
        rootIndex,
        this.props.history.index + 1,
      )
    }
  }

  // Callback for when the current tab changes
  onRequestChangeTab = (index: number): void => {
    if (index < 0) return
    this.state.isPending = true
    const entries = this.state.history[index]
    if (index !== this.state.navigationState.index) {
      // Update navigation state
      this.setState(prevState => ({
        navigationState: {
          ...prevState.navigationState,
          index,
        },
      }))
      // Force sync
      if (this.props.forceSync) {
        // Go back to root index
        const n = this.state.rootIndex - (this.props.history.index || 0)
        if (n !== 0) this.props.history.go(n)
        // Replace root entry
        if (entries && entries[0]) {
          const entry = entries[0]
          this.props.history.replace(entry.pathname, entry.state)
        } else {
          const entry = this.state.tabs[index] // $FlowFixMe
          this.props.history.replace(entry.path, entry.state)
        }
        // Push other entries
        if (entries && entries.length > 1) {
          entries
            .slice(this.state.rootIndex + 1)
            .forEach(({ pathname, state }) => {
              this.props.history.push(pathname, state)
            })
          const entry = entries[Math.max(0, parseInt(entries.length - 1, 10))]
          this.props.history.replace(entry.pathname, entry.state)
        }
      } else {
        const entry = this.state.tabs[index] // $FlowFixMe
        this.props.history.replace(entry.path, entry.state)
      }
    } else {
      const tab = this.state.tabs[index]
      const n = this.state.rootIndex - (this.props.history.index || 0)
      if (n < 0) {
        this.props.history.go(n)
      } else {
        const props = { ...this.props, ...tab }
        if (props.onReset) props.onReset(props)
      }
    }
    this.state.isPending = false
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      match: this.props.match,
      location: this.props.location,
      history: this.props.history,
      onRequestChangeTab: this.onRequestChangeTab,
    })
  }

}

export default TabStack
