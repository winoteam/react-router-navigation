/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint object-property-newline: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { PropTypes, Component, createElement } from 'react'
import { StyleSheet, Dimensions, Platform, View, Text } from 'react-native'
import { TabViewAnimated, TabViewPagerPan, TabBarTop } from 'react-native-tab-view'
import type { Scene, SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tabs } from './TabTypeDefinitions'
import TabStack from './TabStack'
import TabViewPagerNavigator from './TabViewPagerNavigator'
import BottomNavigationBar from './BottomNavigationBar'

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { flex: 1 },
})

type Props = {
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
    return Platform.OS === 'android'
      ? <TabViewPagerNavigator {...sceneRendererProps} />
      : <TabViewPagerPan {...sceneRendererProps} swipeEnabled={false} />
  }

  renderNavigationBar = (props: SceneRendererProps & { tabs: Tabs }): React$Element<any> => {
    const { tabs, ...sceneRendererProps } = props
    return (
      <BottomNavigationBar
        {...sceneRendererProps}
        tabs={tabs}
        onResetTab={this.onResetTab}
      />
    )
  }

  // @TODO $FlowFixMe
  renderScene = (props: SceneRendererProps & Scene & { tabs: Tabs }): ?React$Element<any> => {
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
        render={({ navigationState, tabs, onRequestChangeTab }) => (
          <TabViewAnimated
            style={[styles.container, this.props.style]}
            initialLayout={Dimensions.get('window')}
            configureTransition={() => null}
            navigationState={navigationState}
            onRequestChangeTab={onRequestChangeTab}
            renderPager={this.renderPager}
            renderFooter={(props) => this.renderNavigationBar({ ...props, tabs })}
            renderScene={(sceneProps) => this.renderScene({ ...sceneProps, tabs })}
          />
        )}
      />
    )
  }

}

export default BottomNavigation
