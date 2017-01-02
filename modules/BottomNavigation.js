/* @flow */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-confusing-arrow: 0 */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Platform, View, Text } from 'react-native'
import { TabViewAnimated, TabViewPagerPan, TabBarTop } from 'react-native-tab-view'
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

  render() {
    return (
      <TabStack
        {...this.props}
        style={[styles.container, this.props.containerStyle]}
        render={({ navigationState, tabs, onRequestChangeTab }) => {
          const currentRoute = navigationState.routes[navigationState.index]
          this.state.scenesRendered.push(currentRoute.key)
          return (
            <TabViewAnimated
              style={[styles.container, this.props.style]}
              initialLayout={Dimensions.get('window')}
              configureTransition={() => null}
              navigationState={navigationState}
              onRequestChangeTab={onRequestChangeTab}
              renderPager={(sceneRendererProps) => Platform.OS === 'android'
                ? <TabViewPagerNavigator {...sceneRendererProps} />
                : <TabViewPagerPan {...sceneRendererProps} />
              }
              renderFooter={(sceneRendererProps) => (
                <BottomNavigationBar
                  {...sceneRendererProps}
                  tabs={tabs}
                />
              )}
              renderScene={({ route }) => {
                const { scenesRendered } = this.state
                const currentTab = tabs.find((tab) => tab.key === route.key)
                if (!currentTab || !scenesRendered.includes(route.key)) return null
                return createElement(currentTab.component || currentTab.render)
              }}
            />
          )
        }}
      />
    )
  }

}

export default BottomNavigation
