/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint max-len: 0 */
/* eslint object-property-newline: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { PropTypes, Component, createElement } from 'react'
import { StyleSheet, Dimensions, Platform, View, Text } from 'react-native'
import { TabViewAnimated, TabViewPagerPan, TabBarTop } from 'react-native-tab-view'
import type { Scene, SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { TabBarProps, TabRendererProps } from './TypeDefinitions'
import TabStack from './TabStack'
import BottomNavigationBar from './BottomNavigationBar'

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { flex: 1 },
})

type Props = TabBarProps & {
  children: Array<React$Element<any>>,
  containerStyle?: StyleSheet,
  style?: StyleSheet,
}

type State = {
  scenesRendered: Array<string>,
}

class BottomNavigation extends Component<void, Props, State> {

  props: Props
  state: State = { scenesRendered: [] }

  static contextTypes = {
    history: PropTypes.object,
  }

  onResetTab = (index: number): void => {
    const { history } = this.context
    const { params, pathname } = history.location
    history.replace(pathname, { ...params, reset: true })
  }

  renderPager = (sceneRendererProps: SceneRendererProps): React$Element<any> => {
    return (
      <TabViewPagerPan
        {...sceneRendererProps}
        swipeEnabled={false}
      />
    )
  }

  renderNavigationBar = (props: TabBarProps & SceneRendererProps & TabRendererProps): React$Element<any> => {
    const { tabs, navigationState: { routes, index }, ...sceneRendererProps } = props
    const route = routes[index]
    const tab = tabs.find(({ key }) => key === route.key)
    // Custom tab bar
    if (props.renderTabBar || tab.renderTabBar) {
      return createElement(
        props.renderTabBar || tab.renderTabBar,
        props,
      )
    }
    // Default tab bar
    return (
      <BottomNavigationBar
        {...props}
        onResetTab={this.onResetTab}
      />
    )
  }

  renderScene = (props: TabBarProps & SceneRendererProps & TabRendererProps & Scene): ?React$Element<any> => {
    const { tabs, navigationState, route } = props
    const { scenesRendered } = this.state
    const currentRoute = navigationState.routes[navigationState.index]
    if (!scenesRendered.includes(currentRoute.key)) {
      scenesRendered.push(currentRoute.key)
    }
    const currentTab = tabs.find((tab) => tab.key === route.key)
    if (!currentTab || !scenesRendered.includes(route.key)) return null
    return createElement(currentTab.component || currentTab.render)
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={[styles.container, this.props.containerStyle]}
        render={(props) => (
          <TabViewAnimated
            style={[styles.container, this.props.style]}
            initialLayout={Dimensions.get('window')}
            configureTransition={() => null}
            navigationState={props.navigationState}
            onRequestChangeTab={props.onRequestChangeTab}
            renderPager={(ownProps) => this.renderPager({ ...this.props, ...props, ...ownProps })}
            renderFooter={(ownProps) => this.renderNavigationBar({ ...this.props, ...props, ...ownProps })}
            renderScene={(ownProps) => this.renderScene({ ...this.props, ...props, ...ownProps })}
          />
        )}
      />
    )
  }

}

export default BottomNavigation
