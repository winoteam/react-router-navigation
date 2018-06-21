import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TabView } from 'react-native-tab-view'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class DefaultTabsRenderer extends React.Component {
  static defaultProps = {
    tabBarPosition: 'top',
  }

  renderTabBar = (position, sceneProps) => {
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

  renderScene = sceneProps => {
    const { renderTab } = this.props
    const { route } = sceneProps
    return renderTab(route)
  }

  onTabPress = scene => {
    const { onIndexChange } = this.props
    if (scene.focused) {
      onIndexChange(scene.index)
    }
  }

  render() {
    return (
      <TabView
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
