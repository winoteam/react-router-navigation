/* @flow */

import React from 'react'
import { View } from 'react-native'
import type { NavigationTransitionProps, NavigateState } from '@helpers/router/types'
import BackButton from './../BackButton'
import styles from './styles'

type Props = NavigationTransitionProps & {
  pop: () => void,
  navigationState: NavigateState,
}

const NavBar = (props: Props): React$Element<any> => {
  const { index } = props.scene
  return (
    <View style={styles.container}>
      {index > 0 &&
        <BackButton
          onPress={props.pop}
        />
      }
    </View>
  )
}

export default NavBar
