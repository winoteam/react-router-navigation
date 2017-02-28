/* @flow */
/* eslint no-duplicate-imports: 0 */

import { Component } from 'react'
import { withRouter } from 'react-router'
import { StateUtils } from 'react-navigation'
import type { RouterHistory } from 'react-router'
import type { NavigationState, TabRendererProps, Tabs, TabRoute, TabProps } from './TypeDefinitions'
import StackUtils from './StackUtils'

type Props = RouterHistory & {
  children: Array<React$Element<TabProps>>,
  render: (props: TabRendererProps) => React$Element<any>,
}

type State = {
  navigationState: NavigationState<TabRoute>,
  tabs: Tabs,
}

class TabStack extends Component<void, Props, State> {

  props: Props
  state: State

  // Initialyze navigation state with initial history
  constructor(props: Props): void {
    super(props)
    // Build the tab stack ($FlowFixMe)
    const { children, location } = props
    const tabs = StackUtils.build(children)
    // Get initial route
    const currentRoute = StackUtils.getRoute(tabs, location)
    if (!currentRoute) throw new Error('No route found !')
    // Build navigation state
    const routes = tabs.map((route) => ({
      key: StackUtils.createKey(route),
      routeName: route.path,
    }))
    const index = routes.findIndex(({ key }) => currentRoute.key === key)
    const navigationState = { index, routes }
    // Save everything
    this.state = { navigationState, tabs }
  }

  // Listen all history events
  componentWillReceiveProps(nextProps): void {
    // Get current route ($FlowFixMe)
    const { location } = nextProps
    const { navigationState: { routes, index }, tabs } = this.state
    // Get current tab
    const currentRoute = routes[index]
    const currentTab = tabs.find(({ key }) => key === currentRoute.key)
    // Get next tab
    const nextRoute = StackUtils.getRoute(tabs, location)
    if (!nextRoute) return
    const nextTab = tabs.find(({ key }) => key === nextRoute.key)
    // Update navigation state
    if (
      currentTab && nextTab &&
      StackUtils.shouldUpdate(currentTab, nextTab, this.props, nextProps)
    ) {
      const nextIndex = routes.findIndex(({ key }) => key === nextRoute.key)
      this.setState((state) => ({
        navigationState: StateUtils.jumpToIndex(
          state.navigationState,
          nextIndex,
        ),
      }))
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
