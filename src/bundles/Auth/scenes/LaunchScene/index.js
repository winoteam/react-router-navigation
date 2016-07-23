/* @flow */

import React from 'react'
import { View, Text } from 'react-native'
import Row from '@components/Row'
import styles from './styles'

const LaunchScene = (props): React$Element<any> => {
  return (
    <View style={styles.container}>
      <Text>LaunchScene !</Text>
      <Row to="feed">Go to feed</Row>
    </View>
  )
}

export default LaunchScene
