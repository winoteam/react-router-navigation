/* @flow */

import React, { PropTypes, createElement } from 'react'
import { Platform, TouchableOpacity, TouchableNativeFeedback, View, Text } from 'react-native'

type Props = {
  children?: string,
  to: string,
  style?: StyleSheet,
  component?: () => React$Element<any>,
}

type Context = {
  history: any,
}

const Link = (props: Props, context: Context): React$Element<any> => {
  const Touchable = Platform.OS === 'ios'
    ? TouchableOpacity
    : TouchableNativeFeedback
  const onPress = () => context.history.push(props.to)
  return createElement(
    props.component || Touchable,
    { onPress },
    <View style={props.style}>
      <Text>{props.children}</Text>
    </View>,
  )
}
Link.contextTypes = {
  history: PropTypes.object,
}

export default Link
