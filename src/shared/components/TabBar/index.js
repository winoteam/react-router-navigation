/* @flow */

import React, { Component } from 'react'
import { TouchableNativeFeedback, View, Text } from 'react-native'
import styles from './styles'

type Props = {
  items: Array<string>,
}

class TabBar extends Component {

  props: Props

  render() {
    const { items } = this.props
    return (
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableNativeFeedback key={index}>
            <View style={styles.item}>
              <Text style={styles.label}>
                {item.toUpperCase()}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>
    )
  }

}

export default TabBar
