/* @flow */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { matchPath } from 'react-router'
import type { TabSubViewProps, TabBarProps } from './TypeDefinitions'
import * as StackUtils from './StackUtils'
import TabStack from './TabStack'

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

type Props = TabBarProps & {
  children?: Array<React$Element<any>>,
}

type State = {
  key: string,
}

class Tabs extends Component<void, Props, State> {

  props: Props

  state: State = { key: Math.random().toString(10) }

  renderHeader = (props: TabSubViewProps): ?React$Element<any> => {
    // Hide tab bar
    if (props.hideTabBar) return null
    // Custom tab bar
    if (props.renderTabBar) {
      return createElement(
        props.renderTabBar,
        props,
      )
    }
    // Render default tab bar
    return (
      <TabBar
        {...props}
        key={`tabbar_${this.state.key}`}
        style={props.tabBarStyle}
        indicatorStyle={props.tabBarIndicatorStyle}
        onRequestChangeTab={(i: number) => i}
        onTabPress={(route) => {
          const { tabs, onRequestChangeTab } = props
          const index = tabs.findIndex((tab) => {
            return matchPath(route.routeName, tab)
          })
          if (index) onRequestChangeTab(index)
        }}
        renderLabel={({ route }) => {
          const currentTab = StackUtils.get(props.tabs, route)
          const ownProps = { ...props, ...currentTab }
          if (ownProps.renderLabel) return ownProps.renderLabel(ownProps)
          return (
            <Text
              style={[
                styles.tabLabel,
                props.labelStyle,
                ownProps && ownProps.labelStyle,
              ]}
            >
              {ownProps && ownProps.label}
            </Text>
          )
        }}
      />
    )
  }

  renderScene = (props: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = props
    if (render) return render(props)
    else if (children && typeof children === 'function') return children(props)
    else if (component) return createElement(component, props)
    return null
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={styles.container}
        render={(props) => {
          const ownProps = { ...this.props, ...props }
          return (
            <TabViewAnimated
              {...props}
              style={styles.container}
              initialLayout={Dimensions.get('window')}
              renderHeader={StackUtils.renderSubView(this.renderHeader, ownProps)}
              renderScene={StackUtils.renderSubView(this.renderScene, ownProps)}
            />
          )
        }}
      />
    )
  }

}

export default Tabs
