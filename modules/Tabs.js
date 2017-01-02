/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import type { SceneRendererProps } from 'react-native-tab-view/src/TabViewTypeDefinitions'
import type { Tab } from './StackTypeDefinitions'
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

type Props = {
  children: Array<React$Element<any>>,
  containerStyle?: StyleSheet,
  style?: StyleSheet,
  tabBarStyle?: StyleSheet,
  renderHeader: () => React$Element<any>,
}

class Tabs extends Component<void, Props, void> {

  props: Props

  renderHeader = (props: SceneRendererProps & { tabs: Array<Tab> }): React$Element<any> => {
    const { tabs, ...sceneProps } = props
    if (this.props.renderHeader) {
      return createElement(
        this.props.renderHeader,
        props,
      )
    }
    return (
      <TabBarTop
        {...sceneProps}
        style={this.props.tabBarStyle}
        renderLabel={({ route }) => {
          const scene = tabs.find((tab) => tab.key === route.key)
          return (
            <Text style={styles.tabLabel}>
              {scene && scene.label}
            </Text>
          )
        }}
      />
    )
  }

  render(): React$Element<any> {
    return (
      <TabStack
        {...this.props}
        style={[styles.container, this.props.containerStyle]}
        render={({ navigationState, tabs, onRequestChangeTab }) => (
          <TabViewAnimated
            style={[styles.container, this.props.style]}
            initialLayout={Dimensions.get('window')}
            navigationState={navigationState}
            onRequestChangeTab={onRequestChangeTab}
            renderHeader={(sceneProps) => this.renderHeader({ ...sceneProps, tabs })}
            renderScene={({ route }) => {
              const currentTab = tabs.find((tab) => tab.key === route.key)
              if (!currentTab) return null
              return createElement(currentTab.component || currentTab.render)
            }}
          />
        )}
      />
    )
  }

}

export default Tabs
