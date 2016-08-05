/* @flow */
/* eslint-disable global-require */

import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import type { NavigationTransitionProps } from './../../types'
import styles from './styles'

type Props = NavigationTransitionProps & {
  onPress: Function,
}

const BackButton = (props: Props) => {
  const { onPress } = props
  const { route } = props.scene
  const backButtonStyle = route.component && (
    route.component.backButtonStyle || 'default'
  )
  const backButtonIcons = {
    default: require('./img/back-default.png'),
    light: require('./img/back-light.png'),
    dark: require('./img/back-dark.png'),
  }
  const backButtonIcon = backButtonIcons[backButtonStyle]
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.button} source={backButtonIcon} />
    </TouchableOpacity>
  )
}

export default BackButton
