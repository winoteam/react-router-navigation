/* @flow */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import type { SceneRendererProps, Scene } from 'react-native-tab-view/types'
import { TabStack, type TabsRendererProps } from 'react-router-navigation-core'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import type { TabsProps, TabRoute } from './TypeDefinitions'

const styles = StyleSheet.create({
  tabLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
})

type Props = TabsProps & {
  children?: React$Node,
}

type TabBarProps = TabsRendererProps & TabsProps & SceneRendererProps<TabRoute>

class Tabs extends React.Component<Props> {
  renderTabBar = (tabBarProps: TabBarProps) => {
    const renderTabBar = tabBarProps.renderTabBar || this.props.renderTabBar
    if (tabBarProps.hideTabBar) return null
    if (renderTabBar) {
      return React.createElement(renderTabBar, {
        ...tabBarProps,
        renderLabel: scene => this.renderTabLabel(tabBarProps, scene),
      })
    }
    return (
      <TabBar
        {...tabBarProps}
        renderLabel={scene => this.renderTabLabel(tabBarProps, scene)}
      />
    )
  }

  renderTabLabel = (tabBarProps: TabBarProps, scene: Scene<TabRoute>) => {
    const { tabs } = tabBarProps
    const { route, focused } = scene
    const tab = tabs.find(({ key }) => key === route.routeName)
    const tabLabelProps = { ...tabBarProps, ...tab }
    const { tabTintColor, tabActiveTintColor } = tabLabelProps
    if (tabLabelProps.renderLabel) return tabLabelProps.renderLabel(tabLabelProps, scene)
    return (
      <Text
        style={[
          styles.tabLabel,
          tabLabelProps.labelStyle,
          !focused && tabTintColor && { color: tabTintColor },
          focused && tabActiveTintColor && { color: tabActiveTintColor },
        ]}
      >
        {tabLabelProps && tabLabelProps.label}
      </Text>
    )
  }

  render() {
    return (
      <TabStack
        {...this.props}
        render={tabsRendererProps => (
          <DefaultTabsRenderer
            {...this.props}
            {...tabsRendererProps}
            renderTabBar={this.renderTabBar}
          />
        )}
      />
    )
  }
}

export default Tabs
