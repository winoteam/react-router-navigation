/* @flow */
/* eslint global-require: 0 */
/* eslint new-cap: 0 */

import React from 'react'
import { StyleSheet, Platform, View, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native'

type Props = {
  onPress: Function,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16,
    resizeMode: 'contain',
  },
})

const BackButton = ({ onPress }: Props): React$Element<any> => {
  const Touchable = Platform.OS === 'ios'
    ? TouchableOpacity
    : TouchableNativeFeedback
  const Arrow = Platform.OS === 'android'
    ? require('./assets/back-dark.png')
    : require('./assets/back-default.png')

  return (
    <Touchable
      style={styles.container}
      background={Platform.OS === 'android' && TouchableNativeFeedback.Ripple('white', true)}
      onPress={onPress}
    >
      <View>
        <Image
          style={styles.main}
          source={Arrow}
        />
      </View>
    </Touchable>
  )
}

export default BackButton
