/* @flow */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { Route, matchPath } from 'react-router'
import type { ContextRouter } from 'react-router'
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

  renderHeader = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    if (sceneProps.tabBarPosition !== 'bottom') {
      return this.renderTabBar(sceneProps)
    }
    return null
  }

  renderFooter = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    if (sceneProps.tabBarPosition === 'bottom') {
      return this.renderTabBar(sceneProps)
    }
    return null
  }

  renderTabBar = (sceneProps: TabSubViewProps, props: TabSubViewProps): ?React$Element<any> => {
    // Hide tab bar
    if (sceneProps.hideTabBar) return null
    // Custom tab bar
    if (sceneProps.renderTabBar) {
      return createElement(
        sceneProps.renderTabBar,
        sceneProps,
      )
    }
    // Render default tab bar
    return (
      <TabBar
        {...sceneProps}
        key={`tabbar_${this.state.key}`}
        style={sceneProps.tabBarStyle}
        tabStyle={sceneProps.tabStyle}
        indicatorStyle={sceneProps.tabBarIndicatorStyle}
        onRequestChangeTab={(i: number) => i}
        onTabPress={(route) => {
          const { tabs, onRequestChangeTab } = sceneProps
          const index = tabs.findIndex((tab) => {
            return matchPath(route.routeName, tab)
          })
          if (index) onRequestChangeTab(index)
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
                (!focused && tabTintColor) && { color: tabTintColor },
                (focused && tabActiveTintColor) && { color: tabActiveTintColor },
              ]}
            >
              {labelProps && labelProps.label}
            </Text>
          )
        }}
      />
    )
  }

  renderScene = (sceneProps: TabSubViewProps): ?React$Element<any> => {
    const { render, children, component } = sceneProps
    if (render) return render(sceneProps)
    else if (children && typeof children === 'function') return children(sceneProps)
    else if (component) return createElement(component, sceneProps)
    return null
  }

  render(): React$Element<any> {
    return (
      <Route>
        {({ history, location, match }: ContextRouter) => (
          <TabStack
            {...this.props}
            history={history}
            location={location}
            match={match}
            style={styles.container}
            render={(props) => {
              const ownProps = { ...this.props, ...props }
              console.log('<Tabs />', ownProps)
              return (
                <TabViewAnimated
                  {...ownProps}
                  style={styles.container}
                  initialLayout={Dimensions.get('window')}
                  renderHeader={StackUtils.renderSubView(this.renderHeader, ownProps)}
                  renderFooter={StackUtils.renderSubView(this.renderFooter, ownProps)}
                  renderScene={StackUtils.renderSubView(this.renderScene, ownProps)}
                />
              )
            }}
          />
        )}
      </Route>
    )
  }

}

export default Tabs
