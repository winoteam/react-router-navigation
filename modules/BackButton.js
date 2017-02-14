/* @flow */
/* eslint global-require: 0 */
/* eslint new-cap: 0 */

import React from 'react'
import { StyleSheet, Platform, View, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native'

type Props = {
  onPress: Function,
  style?: StyleSheet,
  color?: 'default' | 'light' | 'dark',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Platform.OS === 'ios' ? 10 : 16,
  },
  img: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
})

const isAndroid = Platform.OS === 'android'

const Touchable = isAndroid
  ? TouchableNativeFeedback
  : TouchableOpacity

const arrows = {
  default: isAndroid
    ? require('./assets/back-dark.png')
    : require('./assets/back-default.png'),
  light: isAndroid
    ? require('./assets/back-light.png')
    : require('./assets/back-light.png'),
  dark: isAndroid
    ? require('./assets/back-dark.png')
    : require('./assets/back-dark.png'),
}

const BackButton = ({ onPress, style, color = 'default' }: Props): React$Element<any> => {
  const Arrow = arrows[color]
  const background = isAndroid && TouchableNativeFeedback.Ripple('white', true)
  return (
    <Touchable
      style={style}
      background={background}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          style={styles.main}
          source={Arrow}
        />
      </View>
    </Touchable>
  )
}

export default BackButton
