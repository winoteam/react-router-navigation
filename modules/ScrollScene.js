/* @flow */

import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

type Props = {
  children: React$Element<any>,
  style?: StyleSheet,
}

const ScrollScene = ({ style, children }: Props): React$Element<any> => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={[styles.content, style]}
  >
    {children}
  </ScrollView>
)

export default ScrollScene
