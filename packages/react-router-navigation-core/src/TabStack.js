/* @flow */

import * as React from 'react'
import { matchPath, type RouterHistory } from 'react-router'
import invariant from 'invariant'
import HistoryUtils from './HistoryUtils'
import StackUtils from './StackUtils'
import RouteUtils from './RouteUtils'
import StateUtils from './StateUtils'
import type {
  NavigationState,
  TabsRendererProps,
  Tab,
  Route,
  HistoryRootIndex,
  HistoryNodes,
} from './TypeDefinitions'

type Props = {
  history: RouterHistory,
  children: React$Node[],
  render: (props: TabsRendererProps<>) => React$Node,
  lazy?: boolean,
}

type State = {|
  tabs: Tab[],
  navigationState: NavigationState<>,
  historyRootIndex: HistoryRootIndex,
  historyNodes: HistoryNodes,
|}

class TabStack extends React.Component<Props, State> {
  unlistenHistory: ?Function = null

  constructor(props: Props) {
    super(props)
    const { children, history } = props
    invariant(
      history,
      'The prop `history` is marked as required in `TabStack`, but its value is `undefined` in TabStack',
    )
    invariant(
      children || React.Children.count(children) > 0,
      'A <TabStack /> must have child elements',
    )
    const { index, location } = history
    const entries = history.entries || [location]
    const tabs = children && StackUtils.create(children, props)
    const navigationState = StateUtils.initialize(
      tabs,
      location,
      entries,
      'nodes',
    )
    invariant(
      navigationState.index !== -1,
      'There is no route defined for path « %s »',
      location.pathname,
    )
    const initialRoute = navigationState.routes[navigationState.index]
    const historyRootIndex = index
    const historyNodes = { [initialRoute.name]: entries.slice(index) }
    this.state = { tabs, navigationState, historyRootIndex, historyNodes }
  }

  componentDidMount() {
    const { history } = this.props
    this.unlistenHistory = HistoryUtils.listen(history, this.onHistoryChange)
  }

  componentWillUnmount() {
    if (this.unlistenHistory) this.unlistenHistory()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { tabs } = this.state
    const { children: nextChildren, history } = nextProps
    const { location } = history
    const entries = history.entries || [location]
    const nextTabs = StackUtils.create(nextChildren, nextProps)
    const nextTab = nextTabs.find(tab => matchPath(location.pathname, tab))
    const nextRoute = nextTab && RouteUtils.create(nextTab, location)
    if (nextRoute && !StackUtils.shallowEqual(tabs, nextTabs)) {
      const nextNavigationState = StateUtils.initialize(
        nextTabs,
        location,
        entries,
        'nodes',
      )
      invariant(
        nextNavigationState.index !== -1,
        'There is no route defined for path « %s »',
        location.pathname,
      )
      this.setState({
        tabs: nextTabs,
        navigationState: nextNavigationState,
      })
    }
  }

  onHistoryChange = (history: RouterHistory, nextHistory: RouterHistory) => {
    const { location } = nextHistory
    const { navigationState, tabs } = this.state
    const { routes } = navigationState
    const currentRoute = routes[navigationState.index]
    const nextTab = tabs.find(tab => matchPath(location.pathname, tab))
    if (nextTab) {
      const staleRoute = routes.find(route => route.name === nextTab.path)
      const nextRoute = RouteUtils.create(nextTab, location, staleRoute)
      if (nextRoute && !RouteUtils.equal(currentRoute, nextRoute)) {
        this.setState(prevState => ({
          navigationState: StateUtils.changeIndex(
            prevState.navigationState,
            nextRoute,
          ),
        }))
      }
    }
  }

  onIndexChange = (arg: number | Route) => {
    const { history } = this.props
    const { tabs, navigationState, historyRootIndex } = this.state
    const index = StateUtils.getRouteIndex(navigationState, arg)
    const nextRoute = navigationState.routes[index]
    const nextTab = tabs.find(tab => tab.path === nextRoute.name)
    if (nextTab && index !== navigationState.index) {
      const location = HistoryUtils.createLocation(history, nextTab)
      this.setState(
        {
          navigationState: StateUtils.changeIndex(
            navigationState,
            RouteUtils.create(nextTab, location, nextRoute) || index,
          ),
        },
        () => {
          history.replace(location.pathname, location.state)
        },
      )
    } else {
      const n = historyRootIndex - history.index
      if (n < 0) {
        history.go(n)
      } else if (nextTab) {
        if (typeof nextTab.onReset === 'function') {
          nextTab.onReset()
        } else if (nextTab.initialPath) {
          history.replace(nextTab.initialPath)
        } else if (nextTab.path) {
          history.replace(nextTab.path)
        }
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.state.tabs !== nextState.tabs ||
      this.state.navigationState !== nextState.navigationState
    )
  }

  renderTab = (route: Route) => {
    const { lazy } = this.props
    const { historyNodes } = this.state
    if (lazy && !historyNodes[route.name]) return null
    const children = React.Children.toArray(this.props.children)
    const child = children.find(({ props }) => props.path === route.name)
    if (!child) return null
    return React.cloneElement(child, route)
  }

  render() {
    return this.props.render({
      navigationState: this.state.navigationState,
      tabs: this.state.tabs,
      onIndexChange: this.onIndexChange,
      renderTab: this.renderTab,
    })
  }
}

export default TabStack
