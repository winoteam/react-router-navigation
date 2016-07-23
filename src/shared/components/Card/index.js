/* @flow */

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

type Props = {
  children?: string,
}

const Card = (props: Props) => {
  const { children } = props
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  )
}

export default Card
