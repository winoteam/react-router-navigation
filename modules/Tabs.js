/* @flow */

import React, { createElement } from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import TabStack from './TabStack'

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  containerStyle?: StyleSheet,
  style?: StyleSheet,
}

const Tabs = (props: any): React$Element<any> => (
  <TabStack
    {...props}
    style={[styles.container, props.containerStyle]}
    render={({ tabs, navigationState, onRequestChangeTab }) => (
      <TabViewAnimated
        style={[styles.container, props.style]}
        initialLayout={Dimensions.get('window')}
        navigationState={navigationState}
        onRequestChangeTab={onRequestChangeTab}
        renderHeader={(sceneProps) => (
          <TabBarTop
            {...sceneProps}
            renderLabel={({ route }) => {
              const scene = tabs.find((tab) => tab.key === route.key)
              if (!scene.title) return null
              return (
                <Text style={styles.tabLabel}>
                  {scene.title}
                </Text>
              )
            }}
          />
        )}
        renderScene={({ route }) => {
          const scene = tabs.find((tab) => tab.key === route.key)
          return scene ? createElement(scene.component) : null
        }}
      />
    )}
  />
)

export default Tabs
