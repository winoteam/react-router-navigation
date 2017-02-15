/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint no-lonely-if: 0 */

import { Component } from 'react'
import { withRouter } from 'react-router'
import type { RouterHistory } from 'react-router'
import type { NavigationState, TabRendererProps, Tabs, TabProps } from './TypeDefinitions'
import getCurrentRoute from './getCurrentRoute'
import buildStack from './buildStack'
import normalizeRoute from './normalizeRoute'

type Props = {
  children: Array<React$Element<TabProps>>,
  render: (props: TabRendererProps) => React$Element<any>,
} & RouterHistory

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
    if (!currentRoute) throw new Error('No route found !')
    // Build navigation state
    const routes = tabs.map(({ key }) => ({ key }))
    const index = routes.findIndex(({ key }) => currentRoute.key === key)
    const navigationState = { index, routes }
    // Save everything
    this.state = { navigationState, tabs }
  }

  // Listen all history events
  componentWillReceiveProps(nextProps): void {
    // Get current route
    const { action, location } = nextProps
    const { navigationState, tabs } = this.state
    // Get current tab
    const currentRoute = normalizeRoute(navigationState.routes[navigationState.index])
    const currentTab = tabs.find(({ key }) => key === currentRoute.key)
    // Get next tab
    const nextRoute = getCurrentRoute(tabs, location)
    if (!nextRoute) return
    const nextTab = tabs.find(({ key }) => key === nextRoute.key)
    // Update navigation state
    if (currentTab && nextTab && (currentTab.key !== nextTab.key) && action === 'REPLACE') {
      const index = navigationState.routes.findIndex(({ key }) => key === nextRoute.key)
      this.setState({
        navigationState: {
          ...navigationState,
          index,
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
