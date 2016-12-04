/* @flow */
/* eslint global-require: 0 */
/* eslint max-len: 0 */
/* eslint new-cap: 0 */

import React from 'react'
import { StyleSheet, Platform, View, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native'
import type { SceneProps } from './../types'

type Props = SceneProps & {
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

const BackButton = ({ onPress, ...sceneProps }: Props): React$Element<any> => {
  const Touchable = Platform.OS === 'ios'
    ? TouchableOpacity
    : TouchableNativeFeedback
  const Arrow = sceneProps.scene.route.backButtonStyle === 'light'
    ? require('./assets/back-light.png')
    : require('./assets/back-dark.png')

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
