/* @flow */

import React from 'react'
import { Dimensions, View, TouchableNativeFeedback, Text } from 'react-native'
import styles from './styles'

type Props = {
  onPress: (key: string) => void,
  tabs: Array<{
    key: string,
    name: string,
  }>,
}

const TabBar = (props: Props) => {
  const { tabs } = props
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableNativeFeedback key={tab.key}>
          <View style={styles.tab}>
            <Text style={styles.text}>
              {tab.name.toUpperCase()}
            </Text>
          </View>
        </TouchableNativeFeedback>
      ))}
      <View style={[styles.indicator, {
        width: Dimensions / tabs.length,
      }]} />
    </View>
  )
}

export default TabBar
