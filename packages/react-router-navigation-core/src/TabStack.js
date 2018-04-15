/* @flow */

import * as React from 'react'
import { matchPath, type RouterHistory, type Location } from 'react-router'
import invariant from 'invariant'
import HistoryUtils from './HistoryUtils'
import StackUtils from './StackUtils'
import RouteUtils from './RouteUtils'
import StateUtils from './StateUtils'
import type { NavigationState, TabsRendererProps, Tab } from './TypeDefinitions'

type Props = {
  history: RouterHistory,
  children?: Array<React$Node>,
  render: (props: TabsRendererProps) => React.Element<any>,
  lazy?: boolean,
  enableHistoryNodes?: boolean,
}

type State = {|
  tabs: Array<Tab>,
  navigationState: NavigationState,
  historyRootIndex?: number,
  historyNodes?: { [key: string]: Array<Location> },
|}

class TabStack extends React.Component<Props, State> {
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
    const tabs = StackUtils.create(children, props)
    const navigationState = StateUtils.initialize(tabs, location)
    invariant(
      navigationState.index !== -1,
      'There is no route defined for path « %s »',
      location.pathname,
    )
    const historyRootIndex = index
    const historyNodes = { [navigationState.index]: entries.slice(index) }
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
    const nextTabs = StackUtils.create(nextChildren, nextProps)
    const nextTab = nextTabs.find(tab => matchPath(location.pathname, tab))
    const nextRoute = nextTab && RouteUtils.create(nextTab, location)
    if (nextRoute && !StackUtils.shallowEqual(tabs, nextTabs)) {
      const nextNavigationState = StateUtils.initialize(nextTabs, location)
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
    const { navigationState, tabs } = this.state
    const currentRoute = navigationState.routes[navigationState.index]
    const nextTab = tabs.find(tab => matchPath(location.pathname, tab))
    const nextRoute = RouteUtils.create(nextTab, location)
    const newHistoryNodes = HistoryUtils.saveNodes()
    if (nextRoute && !RouteUtils.equal(currentRoute, nextRoute)) {
      this.setState(prevState => ({
        historyNodes: newHistoryNodes,
        navigationState: StateUtils.changeIndex(prevState.navigationState, nextRoute),
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
    const nextTab = tabs[index]
    if (index !== navigationState.index) {
      this.setState(
        {
          navigationState: StateUtils.changeIndex(navigationState, index),
        },
        () => {
          if (enableHistoryNodes) {
            HistoryUtils.persistNodes(
              this.props.history,
              historyNodes[index],
              historyRootIndex,
            )
          }
          if (nextTab.onHistoryChange) {
            nextTab.onHistoryChange()
          } else if (!historyNodes[index]) {
            this.props.history.replace(nextTab.path)
          } else {
            const entry = historyNodes[index].slice(-1)[0]
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
        if (nextTab.onReset) nextTab.onReset()
      }
    }
  }

  renderTab = (route: Route) => {
    const children = React.Children.toArray(this.props.children)
    const child = children.find(({ props }) => props.path === route.routeName)
    return React.cloneElement(child, route)
  }

  render() {
    return this.props.render({
      ...this.state,
      onIndexChange: this.onIndexChange,
      renderTab: this.renderTab,
    })
  }
}

export default TabStack
