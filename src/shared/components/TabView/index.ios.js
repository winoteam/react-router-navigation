/* @flow */

import React, { Children } from 'react'
import { View } from 'react-native'

export default (props) => (
  <View>
    {Children.map(props.children, (child) => child)
      .filter((child, index) => index == 0)}
  </View>
)
