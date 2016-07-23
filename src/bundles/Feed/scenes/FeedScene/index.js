/* @flow */

import React from 'react'
import { ScrollView } from 'react-native'
import Card from '@components/Card'
import styles from './styles'

const FeedScene = (props): React$Element<any> => {
  return (
    <ScrollView style={styles.container}>
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
    </ScrollView>
  )
}

export default FeedScene
