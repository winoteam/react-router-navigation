/* @flow */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { matchPath } from 'react-router'
import type { SceneRendererProps as TabSceneRendererProps, Scene } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { TabBarProps, TabRendererProps, Route } from './TypeDefinitions'
import StackUtils from './StackUtils'
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

type SceneRendererProps =
  & TabSceneRendererProps
  & TabRendererProps

type Props = TabBarProps & {
  children: Array<React$Element<any>>,
}

class Tabs extends Component<void, Props, void> {

  props: Props

  onRequestChangeTab = (props: SceneRendererProps & { route: Route }): void => {
    const index = props.tabs.findIndex(({ path, ...tab }) => {
      return matchPath(props.route.routeName, path, tab)
    })
    if (index) props.onRequestChangeTab(index)
  }

  renderHeader = (props: SceneRendererProps): React$Element<any> => {
    // $FlowFixMe
    const { tabs, navigationState: { routes, index } } = props
    // Get current tab
    const tab = StackUtils.get(tabs, routes[index])
    // Get tab bar props
    const tabBarProps = { ...this.props, ...props, ...tab }
    // Custom tab bar
    if (tabBarProps.renderTabBar) {
      return createElement(
        tabBarProps.renderTabBar,
        tabBarProps,
      )
    }
    // Render default tab bar
    return (
      <TabBar
        {...tabBarProps}
        style={tabBarProps.tabBarStyle}
        indicatorStyle={tabBarProps.tabBarIndicatorStyle}
        onRequestChangeTab={() => true}
        onTabPress={(route) => this.onRequestChangeTab({ ...props, route })}
        renderLabel={({ route }) => {
          const currentTab = StackUtils.get(tabs, route)
          return (
            <Text
              style={[
                styles.tabLabel,
                tabBarProps.labelStyle,
                currentTab && currentTab.labelStyle,
              ]}
            >
              {currentTab && currentTab.label}
            </Text>
          )
        }}
      />
    )
  }

  renderScene = (props: SceneRendererProps & Scene): ?React$Element<any> => {
    // Get tab ($FlowFixMe)
    const { tabs, route } = props
    const tab = StackUtils.get(tabs, route)
    if (!tab) return null
    // Render view
    if (tab.render) return tab.render(props)
    else if (tab.children) return tab.children(props)
    else if (tab.component) return createElement(tab.component, props)
    return null
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        render={(props) => (
          <TabViewAnimated
            {...props}
            style={styles.container}
            initialLayout={Dimensions.get('window')}
            renderHeader={(ownProps) => this.renderHeader({ ...props, ...ownProps })}
            renderScene={({ ...ownProps }) => this.renderScene({ ...props, ...ownProps })}
          />
        )}
      />
    )
  }

}

export default Tabs
