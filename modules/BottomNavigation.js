/* @flow */

import React, { Component, PropTypes, createElement } from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { TabViewAnimated, TabBar, TabViewPagerPan } from 'react-native-tab-view'
import Provider from './Provider'
import TabViewPagerNavigator from './TabViewPagerNavigator'
import type { NavigationState, Location, Router, Route } from './../types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    opacity: 1,
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  label: {
    fontSize: 12,
    margin: 2,
  },
})

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

class BottomNavigation extends Component<void, Props, State> {

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
    const { renderedTabsIndex, routes } = this.state
    const { location } = routes[index]
    this.context.router.transitionTo(location)
    this.setState({ index })
  }

  renderScene = ({ route }: { route: Route }): ?React$Element<any> => {
    const scene = this.props.children
      .find((child) => child.props.pattern === route.key)
    if (!scene) return null
    return createElement(
      scene.props.component,
      { key: route.key, ...scene },
    )
  }

  renderTabBar = (props): React$Element<any> => (
    <TabBar
      {...props}
      renderLabel={({ route, index }) => (
        <Text style={styles.label}>
          {route.title}
        </Text>
      )}
      activeOpacity={1}
      style={styles.tabbar}
      tabStyle={styles.tab}
    />
  )

  renderPager = (props): React$Element<any> => {
    if (Platform.OS === 'android') {
      return  (
        <TabViewPagerNavigator
          {...props}
          renderScene={this.renderScene}
        />
      )
    }
    return (
      <TabViewPagerPan
        {...props}
        swipeEnabled={false}
      />
    )
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return this.state.index !== nextState.index
  }

  render(): React$Element<any> {
    return (
      <TabViewAnimated
        style={styles.container}
        configureTransition={() => null}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderFooter={this.renderTabBar}
        renderPager={this.renderPager}
        onRequestChangeTab={this.handleChangeTab}
      />
    )
  }
}

export default (props) => (
  <Provider>
    {({ location }) => (
      <BottomNavigation
        {...props}
        location={location}
      />
    )}
  </Provider>
)
