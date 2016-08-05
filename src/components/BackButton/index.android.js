/* @flow */
/* eslint-disable global-require */
/* eslint-disable new-cap */

import React from 'react'
import { TouchableNativeFeedback, View, Image } from 'react-native'
import styles from './styles'

type Props = {
  onPress: () => void,
}

const BackButton = (props: Props) => {
  const { onPress } = props
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('white', true)}
    >
      <View style={styles.main}>
        <Image
          source={require('./img/back-default.png')}
        />
      </View>
    </TouchableNativeFeedback>
  )
}

export default BackButton
