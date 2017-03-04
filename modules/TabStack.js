/* @flow */
/* eslint no-duplicate-imports: 0 */

import { Component } from 'react'
import { StateUtils } from 'react-navigation'
import type { ContextRouter, Location } from 'react-router'
import type { NavigationState, TabRendererProps, Tabs, TabRoute, TabProps } from './TypeDefinitions'
import StackUtils from './StackUtils'

type Props = ContextRouter & {
  children?: Array<React$Element<TabProps>>,
  render: (props: TabRendererProps) => React$Element<any>,
  forceSync?: boolean,
}

type State = {
  navigationState: NavigationState<TabRoute>,
  tabs: Tabs,
  rootIndex: number,
  history: { [key: number]: Array<Location> },
}

class TabStack extends Component<void, Props, State> {

  props: Props
  state: State

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the tab stack ($FlowFixMe)
    const { children, history: { entries, location } } = props
    const tabs = StackUtils.build(children)
    // Get initial route
    const currentRoute = StackUtils.getRoute(tabs, location)
    if (!currentRoute) throw new Error('No route found !')
    // Build navigation state
    const routes = tabs.map((tab) => ({
      // $FlowFixMe
      key: StackUtils.createKey({ key: tab.key }),
      routeName: tab.path,
    }))
    const index = routes.findIndex(({ routeName }) => currentRoute.key === routeName)
    const navigationState = { index, routes }
    const rootIndex = props.history.index || 0
    // Initialyze cached history
    const history = {
      [index]: entries.slice(location.index),
    }
    // Save everything
    this.state = { navigationState, tabs, rootIndex, history }
  }

  // Listen all history events
  componentWillReceiveProps(nextProps): void {
    // Get current route ($FlowFixMe)
    const { location, history: { entries } } = nextProps
    const { navigationState: { routes, index }, tabs, rootIndex } = this.state
    // Get current tab
    const currentRoute = routes[index]
    const currentTab = StackUtils.get(tabs, currentRoute)
    // Get next tab
    const nextRoute = StackUtils.getRoute(tabs, location)
    if (!nextRoute) return
    const nextTab = StackUtils.get(tabs, nextRoute)
    const nextIndex = routes.findIndex(({ routeName }) => routeName === nextRoute.key)
    // Update navigation state
    if (
      currentTab && nextTab &&
      StackUtils.shouldUpdate(currentTab, nextTab, this.props, nextProps)
    ) {
      this.setState((state) => ({
        navigationState: StateUtils.jumpToIndex(
          state.navigationState,
          nextIndex,
        ),
      }))
    }
    // Update history
    if (nextRoute) {
      this.state.history[nextIndex] = entries.slice(
        rootIndex,
        nextProps.history.index + 1,
      )
    }
  }

  // Callback for when the current tab changes
  onRequestChangeTab = (index: number): void => {
    const entries = this.state.history[index]
    const tab = this.state.tabs[index]
    if (index !== this.state.navigationState.index) {
      if (tab) {
        if (this.props.forceSync) {
          const n = this.state.rootIndex - (this.props.history.index || 0)
          this.props.history.go(n)
          this.props.history.replace(tab.path)
          if (entries) {
            entries
              .slice(this.state.rootIndex + 1)
              .forEach(({ pathname }) => {
                this.props.history.push(pathname)
              })
            this.props.history.replace(
              entries[Math.max(0, parseInt(entries.length - 1))].pathname
            )
          }
        } else {
          this.props.history.replace(tab.path)
        }
      }
    } else {
      const n = this.state.rootIndex - (this.props.history.index || 0)
      if (n < 0) {
        this.props.history.go(n)
      } else {
        const props = { ...this.props, ...tab }
        if (props.onReset) props.onReset(props)
      }
    }
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      onRequestChangeTab: this.onRequestChangeTab,
    })
  }

}

export default StackUtils.withRouter(TabStack)
