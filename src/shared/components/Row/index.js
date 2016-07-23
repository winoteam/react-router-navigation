/* @flow */

import React from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import { withRouter } from '@helpers/router'
import type { Router } from '@helpers/router/types'
import styles from './styles'

type Props = {
  onPress?: () => void,
  to?: string,
  router: Router,
  children: string,
}

const Row = (props: Props) => {
  const { router, children } = props
  const onPress = props.to
    ? () => router.push(props.to)
    : props.onPress
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default withRouter(Row)
