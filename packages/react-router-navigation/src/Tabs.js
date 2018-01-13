/* @flow */

import React from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { TabStack, renderSubView, get } from 'react-router-navigation-core'
import { matchPath } from 'react-router'
import type { TabSubViewProps, TabBarProps, TabProps } from './TypeDefinitions'

const StackUtils = { get }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
})

type Props = TabBarProps & { children?: Array<React$Element<TabProps>> }

type State = {
  key: string,
}

class Tabs extends React.Component<Props, State> {
  state = { key: Math.random().toString(10) }

  renderHeader = (sceneProps: TabSubViewProps) => {
    if (sceneProps.tabBarPosition !== 'bottom') {
      return this.renderTabBar(sceneProps)
    }
    return null
  }

  renderFooter = (sceneProps: TabSubViewProps) => {
    if (sceneProps.tabBarPosition === 'bottom') {
      return this.renderTabBar(sceneProps)
    }
    return null
  }

  renderTabBar = (sceneProps: TabSubViewProps, props: TabSubViewProps) => {
    // Hide tab bar
    if (sceneProps.hideTabBar) return null
    // Custom tab bar
    if (sceneProps.renderTabBar) {
      return React.createElement(sceneProps.renderTabBar, sceneProps)
    }
    // Render default tab bar
    return (
      <TabBar
        {...sceneProps}
        key={`tabbar_${this.state.key}`}
        style={sceneProps.tabBarStyle}
        tabStyle={sceneProps.tabStyle}
        indicatorStyle={sceneProps.tabBarIndicatorStyle}
        onIndexChange={(i: number) => i}
        onTabPress={route => {
          const { tabs, onIndexChange } = sceneProps
          const index = tabs.findIndex(tab => {
            return matchPath(route.routeName, tab)
          })
          if (index) onIndexChange(index)
        }}
        renderLabel={({ route, focused }) => {
          const currentTab = StackUtils.get(sceneProps.tabs, route)
          const labelProps = { ...this.props, ...props, ...currentTab }
          const { tabTintColor, tabActiveTintColor } = labelProps
          if (labelProps.renderLabel) return labelProps.renderLabel(labelProps)
          return (
            <Text
              style={[
                styles.tabLabel,
                labelProps.labelStyle,
                !focused && tabTintColor && { color: tabTintColor },
                focused && tabActiveTintColor && { color: tabActiveTintColor },
              ]}
            >
              {labelProps && labelProps.label}
            </Text>
          )
        }}
      />
    )
  }

  renderScene = (sceneProps: TabSubViewProps) => {
    const { render, children, component } = sceneProps
    if (render) {
      return render(sceneProps)
    } else if (children && typeof children === 'function') {
      return children(sceneProps)
    } else if (component) {
      return React.createElement(component, sceneProps)
    }
    return null
  }

  render() {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        render={props => {
          const ownProps = { ...this.props, ...props }
          return (
            <TabViewAnimated
              {...ownProps}
              style={styles.container}
              initialLayout={Dimensions.get('window')}
              renderHeader={renderSubView(this.renderHeader, ownProps)}
              renderFooter={renderSubView(this.renderFooter, ownProps)}
              renderScene={renderSubView(this.renderScene, ownProps)}
            />
          )
        }}
      />
    )
  }
}

export default Tabs
