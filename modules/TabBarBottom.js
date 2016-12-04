/* @flow */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TabBar } from 'react-native-tab-view'

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    opacity: 1,
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  label: {
    fontSize: 12,
    margin: 2,
  },
})

type Props = {}

const TabBarBottom = (props: Props): React$Element<any> => (
  <TabBar
    {...props}
    renderLabel={({ route }) => (
      <Text style={styles.label}>
        {route.title}
      </Text>
    )}
    activeOpacity={1}
    style={styles.tabbar}
    tabStyle={styles.tab}
  />
)

export default TabBarBottom
