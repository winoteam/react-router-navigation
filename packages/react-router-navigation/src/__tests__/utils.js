/* eslint react/prop-types: 0 */

import React from 'react'
import { Text } from 'react-native'

export const componentFactory = message => ({ match }) => (
  <Text>{(match && (match.params.id || match.params.slug)) || message}</Text>
)
