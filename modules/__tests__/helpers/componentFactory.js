import React from 'react'
import { Text } from 'react-native'

const componentFactory = (message) => () => (
  <Text>{message}</Text>
)

export default componentFactory
