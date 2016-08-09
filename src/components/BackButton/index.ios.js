/* @flow */
/* eslint global-require: 0 */
/* eslint import/newline-after-import: 0 */

import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import type { NavigationSceneProps } from './../../types'
import styles from './styles'

type Props = NavigationSceneProps & {
  onPress: Function,
}

const BackButton = (props: Props) => {
  const { onPress, scene } = props
  const { component } = scene.route
  const backButtonStyle = component && (
    component.backButtonStyle || 'default'
  )
  const backButtonIcons = {
    default: require('./img/back-default.png'),
    light: require('./img/back-light.png'),
    dark: require('./img/back-dark.png'),
  }
  const backButtonIcon = backButtonIcons[backButtonStyle]
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <Image source={backButtonIcon} />
    </TouchableOpacity>
  )
}

export default BackButton
