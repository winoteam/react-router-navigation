/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint react/no-unused-prop-types:0 */

import React from 'react'
import type { HistoryRouter, Location } from 'react-router'
import isEqual from 'lodash.isequal'
import type { NavigationState, TabsRendererProps, Tab, TabProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'

type Props = {
  history: HistoryRouter,
  // eslint-disable-next-line
  children?: Array<React$Element<TabProps>>,
  render: (props: TabsRendererProps) => React$Element<any>,
  // eslint-disable-next-line
  lazy?: boolean,
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
  location: Location,
  history: { [key: number]: Array<Location> },
}

class TabStack extends React.Component<DefaultProps, Props, State> {

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
    this.state = { navigationState, tabs, rootIndex, history, location }
  }

  componentDidMount(): void {
    this.unlisten = this.props.history.listen(this.onChangeHistory)
  }

  componentWillUnmount(): void {
    this.unlisten()
  }

  // Listen history events
  onChangeHistory = (location: Location): void => {
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
      StackUtils.shouldUpdate(currentTab, nextTab, this.state.location, location)
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
    // Save location
    this.state.location = location
  }

  // Callback for when the current tab changes
  onRequestChangeTab = (index: number): void => {
    if (index < 0) return
    // 1) Set index directly
    this.setState(prevState => ({
      navigationState: {
        ...prevState.navigationState,
        index,
      },
    }))
    // 2) Resync history if needed
    if (this.props.forceSync) {
      // Get entries
      const entries = this.state.history[index]
      // Update index + length + entries properties
      const newHistoryIndex = 2
      this.props.history.index = newHistoryIndex
      this.props.history.entries = [
        ...this.props.history.entries,
        ...entries,
      ]
      this.props.history.length = this.props.history.entries.length
    }
    // 3) Prevent history of changes
    // Warning: we must deal with this king of thing:
    // const App = () => (
    //   <Tabs>
    //     <Tab
    //       path="/hello"
    //     />
    //     <Tab
    //       path="/:one"
    //       onRequestChangeTab={({ history }) => history.push('/one')}
    //     />
    //   </Tabs>
    // )
    const entry = this.state.tabs[index] // $FlowFixMe
    if (entry.path.includes(':')) {
      if (entry.onRequestChangeTab) {
        entry.onRequestChangeTab()
      }
    } else {
      this.props.history.replace(entry.path, entry.state)
    }
  }

  // Diff navigation state
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !isEqual(this.state.navigationState, nextState.navigationState)
  }

  // Render view
  render(): React$Element<any> {
    return this.props.render({
      ...this.state,
      history: this.props.history,
      onRequestChangeTab: this.onRequestChangeTab,
    })
  }

}

export default TabStack
