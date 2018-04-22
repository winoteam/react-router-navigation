/* @noflow */

import React, { createElement } from 'react'
import { Text } from 'react-native'
import * as StackUtils from './../StackUtils'

export const componentFactory = message => ({ match }) => {
  if (!match && !message) return null
  return <Text>{(match && (match.params.id || match.params.slug)) || message}</Text>
}

export const renderCardView = ({ navigationState, renderCard }) => {
  const route = navigationState.routes[navigationState.index]
  return renderCard(route)
}

export const renderTabView = ({ navigationState, renderTab }) => {
  const route = navigationState.routes[navigationState.index]
  return renderTab(route)
}
