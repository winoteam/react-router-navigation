/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint no-lonely-if: 0 */

import { Component } from 'react'
import { withRouter } from 'react-router'
import type { RouterHistory } from 'react-router'
import type { NavigationState, TabRendererProps, Tabs, TabProps } from './TypeDefinitions'
import { getCurrentRoute, buildStack } from './utils'

type Props = RouterHistory & {
  children: Array<React$Element<TabProps>>,
  render: (props: TabRendererProps) => React$Element<any>,
}

type State = {
  navigationState: NavigationState,
  tabs: Tabs,
}

class TabStack extends Component<void, Props, State> {

  props: Props
  state: State

  static displayName = 'TabStack'

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the tab stack
    const { children, location } = props
    const tabs = buildStack(children)
    // Get initial route
    const currentRoute = getCurrentRoute(tabs, location)
    // Build navigation state
    const routes = tabs.map(({ key, path, strict, exact }) => ({ key, path, strict, exact }))
    const index = routes.findIndex((route) => {
      if (!currentRoute) return false
      return currentRoute.key === route.key
    })
    const navigationState = { index, routes }
    // Save everything
    this.state = { navigationState, tabs }
  }

  // Listen all history events
  componentWillReceiveProps(nextProps): void {
    // Get current route
    const { action, location } = nextProps
    const { navigationState, tabs } = this.state
    const route = navigationState.routes[navigationState.index]
    const currentTab = tabs.find((tab) => route && tab.key === route.key)
    // Get next route
    const nextRoute = getCurrentRoute(tabs, location)
    const currentTabIndex = navigationState.routes.findIndex(({ key }) => {
      return nextRoute && key === nextRoute.key
    })
    // Update navigation state
    if (
      nextRoute &&
      ((currentTab && currentTab.key !== nextRoute.key) || !currentTab) &&
      action === 'REPLACE'
    ) {
      this.setState({
        navigationState: {
          ...navigationState,
          index: currentTabIndex,
        },
      })
    }
  }

  // Callback for when the current tab changes
  onRequestChangeTab = (index: number): void => {
    const tab = this.state.tabs[index]
    if (tab) this.props.replace(tab.path)
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      onRequestChangeTab: this.onRequestChangeTab,
    })
  }

}

export default withRouter(TabStack)
