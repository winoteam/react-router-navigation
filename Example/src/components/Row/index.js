import React, { PropTypes } from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import styles from './styles'

const Row = (props) => {
  const { onPress, children } = props
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

Row.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element,
}

export default Row
