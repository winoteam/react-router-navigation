/* @flow */

import React, { Component } from 'react'
import { TouchableNativeFeedback, View, Image } from 'react-native'
import type { NavigationAction, NavigateState } from '@helpers/router/types'
import styles from './styles'

type Props = {
  onNavigate: NavigationAction,
  navigationState: NavigateState,
}

class NavBar extends Component {

  props: Props

  onBack = (): void => {
    this.props.pop()
  }

  render() {
    const { index } = this.props.scene
    return (
      <View style={styles.container}>
        {index > 0 &&
          <TouchableNativeFeedback
            onPress={() => this.onBack()}
            background={TouchableNativeFeedback.Ripple('white', true)}>
            <View style={styles.back}>
              <Image
                source={require('./img/back-android.png')}
              />
            </View>
          </TouchableNativeFeedback>
        }
      </View>
    )
  }

}

export default NavBar
