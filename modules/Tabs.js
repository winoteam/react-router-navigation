/* @flow */

import React, { Component, PropTypes, createElement } from 'react'
import { View, Platform } from 'react-native'
import { TabViewAnimated, TabViewPagerAndroid, TabViewPagerScroll, TabBarTop } from 'react-native-tab-view'
import Provider from './Provider'
import type { NavigationState, Location, Router, Route } from './../types'

type Props = {
  router: Router,
  location: Location,
  children: Array<React$Element<{
    pattern: string,
    component: { title: string, },
  }>>,
  hideNavBar?: boolean,
  tabBarStyle?: StyleSheet,
}

type State = NavigationState

type ContextTypes = {
  router: any,
}

class Tabs extends Component<void, Props, State> {

  state: State

  static contextTypes: ContextTypes = {
    router: PropTypes.object,
  }

  constructor(props: Props): void {
    super(props)
    const { children } = props
    this.state = {
      index: 0,
      routes: children.map((child) => ({
        key: child.props.pattern,
        title: child.props.component.title,
        location: child.props.pattern,
      })),
    }
  }

  componentWillReceiveProps({ location }: Props) {
    const { index } = this.state
    const { pathname } = location
    if (pathname !== this.props.location.pathname) {
      this.state.routes[index].location = pathname
    }
  }

  handleChangeTab = (index: number): void => {
    const { location } = this.state.routes[index]
    this.context.router.transitionTo(location)
    this.setState({ index })
  }

  renderScene = ({ route }: { route: Route }): ?React$Element<any> => {
    const scene = this.props.children
      .find((child) => child.props.pattern === route.key)
    if (!scene) return null
    return createElement(
      scene.props.component,
      { key: route.key },
    )
  }

  renderTabBar = (props): React$Element<any> => (
    <TabBarTop
      {...props}
      style={this.props.tabBarStyle}
    />
  )

  renderPager = (sceneProps): React$Element<any> => (
    Platform.OS === 'ios'
      ? <TabViewPagerScroll {...sceneProps} />
      : <TabViewPagerAndroid {...sceneProps} />
  )

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return this.state.index !== nextState.index
  }

  render(): React$Element<any> {
    return (
      <TabViewAnimated
        style={{ flex: 1, paddingTop: 54 }}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderTabBar}
        renderPager={this.renderPager}
        onRequestChangeTab={this.handleChangeTab}
      />
    )
  }
}

export default (props) => (
  <Provider>
    {({ location }) => (
      <Tabs
        {...props}
        location={location}
      />
    )}
  </Provider>
)
