/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { Component } from 'react'
import { Route, matchPath } from 'react-router'
import type { ContextRouter, Location } from 'react-router'
import type { NavigationState, TabsRendererProps, Tab, TabProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type Props = {
  children?: Array<React$Element<TabProps>>,
  render: (props: TabsRendererProps) => React$Element<any>,
  forceSync?: boolean,
}

type State = {
  navigationState: NavigationState<{
    title?: string,
    testID?: string,
  }>,
  tabs: Array<Tab>,
  rootIndex: number,
  history: { [key: number]: Array<Location> },
}

class TabStack extends Component<void, (Props & ContextRouter), State> {

  props: (Props & ContextRouter)
  state: State

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the tab stack $FlowFixMe
    const { children, history: { entries, location } } = props
    const tabs = children && StackUtils.build(children)
    if (!tabs) throw new Error('No childre found')
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
    // Save everything
    this.state = { navigationState, tabs, rootIndex, history }
  }

  // Listen all history events
  componentWillReceiveProps(nextProps): void {
    // Get current route $FlowFixMe
    const { history: { entries }, location } = nextProps
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
      match: this.props.match,
      location: this.props.location,
      history: this.props.history,
      onRequestChangeTab: this.onRequestChangeTab,
    })
  }

}

export default (props: Props) => (
  <Route>
    {(ownProps) => (
      <TabStack
        {...props}
        {...ownProps}
      />
    )}
  </Route>
)
