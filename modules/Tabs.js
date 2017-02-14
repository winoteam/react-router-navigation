/* @flow */
/* eslint max-len: 0 */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import type { SceneRendererProps, Scene } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { TabBarProps, TabRendererProps } from './TypeDefinitions'
import TabStack from './TabStack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  tabLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
})

type Props = TabBarProps & {
  children: Array<React$Element<any>>,
  containerStyle?: StyleSheet,
  style?: StyleSheet,
  tabBarStyle?: StyleSheet,
  tabBarIndicatorStyle?: StyleSheet,
}

class Tabs extends Component<void, Props, void> {

  props: Props

  renderHeader = (props: TabBarProps & SceneRendererProps & TabRendererProps): React$Element<any> => {
    const { tabs, navigationState: { routes, index } } = props
    // Get current tab
    const tab = tabs.find(({ key }) => routes[index].key === key)
    // Custom tab bar
    if (props.renderTabBar || (tab && tab.renderTabBar)) {
      return createElement(
        props.renderTabBar || tab.renderTabBar,
        props,
      )
    }
    return (
      <TabBar
        {...props}
        style={props.tabBarStyle}
        indicatorStyle={props.tabBarIndicatorStyle || (tab && tab.renderTabBar)}
        renderLabel={({ route }) => {
          const currentTab = tabs.find(({ key }) => route.key === key)
          return (
            <Text style={[styles.tabLabel, props.labelStyle, currentTab && currentTab.labelStyle]}>
              {currentTab && currentTab.label}
            </Text>
          )
        }}
      />
    )
  }

  renderScene = (props: TabBarProps & SceneRendererProps & TabRendererProps & { scene: Scene }): ?React$Element<any> => {
    const { tabs, route } = props
    const currentTab = tabs.find((tab) => tab.key === route.key)
    if (!currentTab) return null
    return createElement(currentTab.component || currentTab.render)
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={[styles.container, this.props.containerStyle]}
        render={(props) => (
          <TabViewAnimated
            {...props}
            style={[styles.container, this.props.style]}
            initialLayout={Dimensions.get('window')}
            renderHeader={(ownProps) => this.renderHeader({ ...this.props, ...props, ...ownProps })}
            renderScene={(ownProps) => this.renderScene({ ...this.props, ...props, ...ownProps })}
          />
        )}
      />
    )
  }

}

export default Tabs
