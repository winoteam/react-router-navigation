/* @flow */
/* eslint-disable global-require */
/* eslint-disable new-cap */

import React from 'react'
import { TouchableNativeFeedback, View, Image } from 'react-native'
import type { NavigationTransitionProps } from './../../types'
import styles from './styles'

type Props = NavigationTransitionProps & {
  onPress: () => void,
}

const BackButton = (props: Props) => {
  const { onPress } = props
  const { component } = props.scene.route
  const backButtonStyle = component && (
    component.backButtonStyle || 'dark'
  )
  const backButtonIcons = {
    light: require('./img/back-light.png'),
    dark: require('./img/back-dark.png'),
  }
  const backButtonIcon = backButtonIcons[backButtonStyle]
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('white', true)}
    >
      <View style={styles.main}>
        <Image source={backButtonIcon} />
      </View>
    </TouchableNativeFeedback>
  )
}

export default BackButton
