/* @flow */

import React, { PureComponent, PropTypes, createElement } from 'react'
import { Platform, TouchableOpacity, TouchableNativeFeedback, View, Text } from 'react-native'
import type { History } from './HistoryTypeDefinitions'

type Props = {
  children?: string | (props: { onPress: () => void }) => React$Element<any>,
  to?: string,
  onPress?: () => void,
  replace?: boolean,
  style?: StyleSheet,
  component?: () => React$Element<any>,
}

type Context = {
  history: History,
}

class Link extends PureComponent<void, Props, void> {

  props: Props
  context: Context

  static contextTypes = {
    history: PropTypes.object,
  }

  onPress = (): void => {
    const { replace, to, onPress } = this.props
    const { history } = this.context
    if (to) {
      if (replace) {
        history.replace(to)
      } else {
        history.push(to)
      }
    } else if (onPress) {
      onPress()
    }
  }

  render(): ?React$Element<any> {
    const { component, style, children } = this.props
    const Touchable = Platform.OS === 'ios'
      ? TouchableOpacity
      : TouchableNativeFeedback
    if (!children) return null
    if (typeof children === 'function') {
      return children({ onPress: this.onPress })
    }
    return createElement(
      component || Touchable,
      { onPress: this.onPress },
      <View style={style}>
        <Text>{children}</Text>
      </View>,
    )
  }

}

export default Link
