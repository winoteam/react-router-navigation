import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { DefaultTabsRendererPropTypes } from './PropTypes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class DefaultTabsRenderer extends React.Component {
  static propTypes = DefaultTabsRendererPropTypes

  static defaultProps = {
    tabBarPosition: 'top',
  }

  renderTabBar = sceneProps => {
    const { tabs, renderTabBar, tabBarPosition } = this.props
    if (!renderTabBar) return null
    const { navigationState } = sceneProps
    const route = navigationState.routes[navigationState.index]
    const activeTab = tabs.find(tab => tab.path === route.name)
    if (!activeTab) return null
    const { path, ...tabProps } = activeTab
    const tabBarProps = { tabs, tabBarPosition, ...sceneProps, ...tabProps }
    if (tabBarProps.hideTabBar) return null
    return React.createElement(renderTabBar, {
      ...tabBarProps,
      ...sceneProps,
      style: tabBarProps.tabBarStyle,
      indicatorStyle: tabBarProps.tabBarIndicatorStyle,
    })
  }

  renderScene = sceneProps => {
    const { renderTab } = this.props
    const { route } = sceneProps
    return renderTab(route)
  }

  render() {
    return (
      <TabView
        {...this.props}
        style={[styles.container, this.props.style]}
        renderHeader={this.renderTabBar}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
      />
    )
  }
}
