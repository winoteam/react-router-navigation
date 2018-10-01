import * as React from 'react'
import { StyleSheet, Platform, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { TabBar } from 'react-native-tab-view'
import { TabBarPropTypes } from './PropTypes'

const TAB_HEIGHT = Platform.OS === 'ios' ? 49 : 56

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_HEIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    ...Platform.select({
      ios: {
        backgroundColor: '#f4f4f4',
      },
      android: {
        backgroundColor: '#ffffff',
      },
    }),
  },
  tab: {
    flex: 1,
    paddingVertical: 4,
    height: TAB_HEIGHT,
  },
  label: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: 10,
      },
      android: {
        fontSize: 13,
        includeFontPadding: false,
      },
    }),
  },
})

export default class TabBarBottom extends React.Component {
  static propTypes = TabBarPropTypes

  static defaultProps = {
    tabTintColor: '#929292',
    tabActiveTintColor: '#3478f6',
  }

  onTabPress = scene => {
    const { navigationState, onIndexChange } = this.props
    const { route } = scene
    const activeRoute = navigationState.routes[navigationState.index]
    if (activeRoute.key === route.key) {
      onIndexChange(route)
    }
  }

  renderIndicator = () => {
    return null
  }

  renderLabel = scene => {
    const { tabs, navigationState } = this.props
    const { route } = scene
    const activeRoute = navigationState.routes[navigationState.index]
    const activeTab = tabs.find(tab => tab.path === route.name)
    const labelprops = { ...activeTab, ...scene }
    const focused = activeRoute.key === route.key
    if (labelprops.renderLabel) return labelprops.renderLabel(labelprops, scene)
    const { label, tabTintColor, tabActiveTintColor } = labelprops
    if (!label) return null
    return (
      <Text
        style={[
          styles.label,
          labelprops.labelStyle,
          !focused && { color: tabTintColor },
          focused && { color: tabActiveTintColor },
        ]}
      >
        {label}
      </Text>
    )
  }

  renderIcon = scene => {
    const { tabs, navigationState } = this.props
    const { route } = scene
    const activeRoute = navigationState.routes[navigationState.index]
    const activeTab = tabs.find(tab => tab.path === route.name)
    const focused = activeRoute.key === route.key
    const iconProps = { ...scene, ...activeTab, focused }
    if (!iconProps.renderTabIcon) return null
    return iconProps.renderTabIcon(iconProps)
  }

  shouldComponentUpdate(nextProps) {
    const { index } = this.props.navigationState
    const { index: nextIndex } = nextProps.navigationState
    return index !== nextIndex
  }

  render() {
    const { label, renderTabIcon, renderLabel, ...props } = this.props
    const tabBarStyle = [
      styles.tabBar,
      { justifyContent: label && renderTabIcon ? 'flex-end' : 'center' },
      this.props.tabBarStyle,
    ]
    const flattenStyle = StyleSheet.flatten(tabBarStyle)
    return (
      <SafeAreaView
        forceInset={{ bottom: 'always', top: 'never' }}
        style={{
          backgroundColor: flattenStyle && flattenStyle.backgroundColor,
        }}
      >
        <TabBar
          onTabPress={this.onTabPress}
          jumpTo={props.jumpTo}
          layout={props.layout}
          navigationState={props.navigationState}
          panX={props.panX}
          offsetX={props.offsetX}
          position={props.position}
          useNativeDriver={props.useNativeDriver}
          style={tabBarStyle}
          tabStyle={[styles.tab, props.tabStyle]}
          pressOpacity={1}
          renderIndicator={this.renderIndicator}
          renderLabel={this.renderLabel}
          renderIcon={this.renderIcon}
        />
      </SafeAreaView>
    )
  }
}
