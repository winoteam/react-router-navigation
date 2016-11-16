/* @flow */
/* eslint global-require: 0 */

import React from 'react'
import { StyleSheet, Platform, View, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native'
import type { SceneProps } from './../types'

type Props = SceneProps & {
  onPress: () => void,
  style?: StyleSheet,
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

const BackButton = ({ onPress, style, ...sceneProps }: Props): React$Element<any> => {
  const source = sceneProps.scene.route.backButtonStyle === 'light'
    ? require('./assets/back-light.png')
    : require('./assets/back-dark.png')
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={styles.main}
          source={source}
        />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableNativeFeedback
      style={styles.container}
      background={TouchableNativeFeedback.Ripple('white', true)}
      onPress={onPress}
    >
      <View>
        <Image
          style={styles.main}
          source={source}
        />
      </View>
    </TouchableNativeFeedback>
  )
}

export default BackButton
