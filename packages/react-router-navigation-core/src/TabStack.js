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
  children: Array<React$Node>,
  render: (props: TabsRendererProps<>) => React$Node,
  lazy?: boolean,
  enableHistoryNodes?: boolean,
  onReset?: () => void,
}

type State = {|
  tabs: Array<Tab>,
  navigationState: NavigationState<>,
  historyRootIndex: HistoryRootIndex,
  historyNodes: HistoryNodes,
|}

class TabStack extends React.Component<Props, State> {
  unlistenHistory: ?Function = null

  static defaultProps = {
    enableHistoryNodes: false,
  }

  constructor(props: Props) {
    super(props)
    const { children, history } = props
    const { entries, index, location } = history
    invariant(
      children || React.Children.count(children) > 0,
      'A <TabStack /> must have child elements',
    )
    const tabs = children && StackUtils.create(children, props)
    const navigationState = StateUtils.initialize(
      tabs,
      location,
      entries,
      'stack',
    )
    invariant(
      navigationState.index !== -1,
      'There is no route defined for path « %s »',
      location.pathname,
    )
    const initialRoute = navigationState.routes[navigationState.index]
    const historyRootIndex = index
    const historyNodes = { [initialRoute.routeName]: entries.slice(index) }
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
    const { location, entries } = history
    const nextTabs = StackUtils.create(nextChildren, nextProps)
    const nextTab = nextTabs.find(tab => matchPath(location.pathname, tab))
    const nextRoute = nextTab && RouteUtils.create(nextTab, location)
    if (nextRoute && !StackUtils.shallowEqual(tabs, nextTabs)) {
      const nextNavigationState = StateUtils.initialize(
        nextTabs,
        location,
        entries,
        'stack',
      )
      invariant(
        nextNavigationState.index !== -1,
        'There is no route defined for path « %s »',
        location.pathname,
      )
      this.setState({ tabs: nextTabs, navigationState: nextNavigationState })
    }
  }

  onHistoryChange = (history: RouterHistory, nextHistory: RouterHistory) => {
    const { location } = nextHistory
    const { navigationState, tabs, historyNodes } = this.state
    const currentRoute = navigationState.routes[navigationState.index]
    const nextTab = tabs.find(tab => matchPath(location.pathname, tab))
    const nextRoute = nextTab ? RouteUtils.create(nextTab, location) : null
    const newHistoryNodes = HistoryUtils.saveNodes(historyNodes)
    if (nextRoute && !RouteUtils.equal(currentRoute, nextRoute)) {
      this.setState(prevState => ({
        historyNodes: newHistoryNodes,
        navigationState: StateUtils.changeIndex(
          prevState.navigationState,
          nextRoute,
        ),
      }))
    } else {
      this.setState({
        historyNodes: newHistoryNodes,
      })
    }
  }

  onIndexChange = (index: number) => {
    const { enableHistoryNodes, history } = this.props
    const { tabs, navigationState, historyNodes, historyRootIndex } = this.state
    const nextRoute = navigationState.routes[index]
    const nextTab = tabs.find(tab => tab.path === nextRoute.routeName)
    if (index !== navigationState.index) {
      this.setState(
        {
          navigationState: StateUtils.changeIndex(navigationState, index),
        },
        () => {
          if (enableHistoryNodes) {
            HistoryUtils.persistNodes(
              this.props.history,
              historyNodes[nextRoute.routeName],
              historyRootIndex,
            )
          }
          if (nextTab && nextTab.onRequestChangeTab) {
            nextTab.onRequestChangeTab()
          } else if (!historyNodes[nextRoute.routeName]) {
            this.props.history.replace(nextRoute.routeName)
          } else {
            const entry = historyNodes[nextRoute.routeName].slice(-1)[0]
            this.props.history.replace(entry.pathname, entry.state)
          }
        },
      )
    } else {
      const n = historyRootIndex - history.index
      if (n < 0) {
        this.props.history.go(n)
      } else {
        if (this.props.onReset) this.props.onReset()
        if (nextTab && nextTab.onReset) nextTab.onReset()
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
    if (lazy && !historyNodes[route.routeName]) return null
    const children = React.Children.toArray(this.props.children)
    const child = children.find(({ props }) => props.path === route.routeName)
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
