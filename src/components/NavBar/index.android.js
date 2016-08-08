/* @flow */

import React from 'react'
import { View, Text } from 'react-native'
import type { NavigationSceneProps, NavigateState } from '@helpers/router/types'
import BackButton from './../BackButton'
import styles from './styles'

type Props = NavigationSceneProps & {
  pop: () => void,
}

const NavBar = (props: Props): React$Element<any> => {
  const { index, route } = props.scene
  const { component } = route
  return (
    <View style={[styles.container, component.navBarStyle]}>
      {index > 0 &&
        <BackButton
          {...props}
          onPress={props.pop}
        />
      }
      {component.title &&
        <Text style={[styles.title, component.titleStyle]}>
          {component.title}
        </Text>
      }
    </View>
  )
}

export default NavBar
