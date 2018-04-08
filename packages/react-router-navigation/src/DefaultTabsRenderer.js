/* @flow */

import * as React from 'react'
import { StyleSheet } from 'react-native'
import { type TabsRendererProps } from 'react-router-navigation-core'
import { TabViewAnimated } from 'react-native-tab-view'
import { type SceneRendererProps, type Scene } from 'react-native-tab-view/types'
import { type TabsProps, type TabRoute } from './TypeDefinitions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type Props = TabsProps &
  TabsRendererProps & {
    renderTabBar: (
      tabBar: TabsProps &
        TabsRendererProps &
        SceneRendererProps<TabRoute> & {
          onTabPress: (scene: Scene<TabRoute>) => void,
        },
    ) => ?React$Element<*>,
  }

type SceneProps = SceneRendererProps<TabRoute>

class DefaultTabsRenderer extends React.Component<Props> {
  static defaultProps = {
    tabBarPosition: 'top',
  }

  renderTabBar = (position: 'top' | 'bottom', sceneProps: SceneProps) => {
    const { tabs, renderTabBar, tabBarPosition } = this.props
    if (!renderTabBar) return null
    const { navigationState } = sceneProps
    const route = navigationState.routes[navigationState.index]
    const activeTab = tabs.find(tab => tab.path === route.routeName)
    if (!activeTab) return null
    const { path, ...tabProps } = activeTab
    const tabBarProps = { tabs, tabBarPosition, ...sceneProps, ...tabProps }
    if (tabBarProps.tabBarPosition !== position) return null
    if (tabBarProps.hideTabBar) return null
    return React.createElement(renderTabBar, {
      ...tabBarProps,
      ...sceneProps,
      tabs,
      style: tabBarProps.tabBarStyle,
      indicatorStyle: tabBarProps.tabBarIndicatorStyle,
      onTabPress: this.onTabPress,
    })
  }

  renderScene = (sceneProps: SceneProps & Scene<TabRoute>) => {
    const { renderTab } = this.props
    const { route } = sceneProps
    return renderTab(route)
  }

  onTabPress = (scene: Scene<TabRoute>) => {
    const { onIndexChange } = this.props
    if (scene.focused) {
      onIndexChange(scene.index)
    }
  }

  render() {
    return (
      <TabViewAnimated
        {...this.props}
        style={[styles.container, this.props.style]}
        renderHeader={tabBarProps => this.renderTabBar('top', tabBarProps)}
        renderFooter={tabBarProps => this.renderTabBar('bottom', tabBarProps)}
        renderScene={this.renderScene}
      />
    )
  }
}

export default DefaultTabsRenderer
