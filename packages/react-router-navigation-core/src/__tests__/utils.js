/* @noflow */

import React, { createElement } from 'react'
import { Text } from 'react-native'
import * as StackUtils from './../StackUtils'

export function componentFactory(message) {
  return function({ match }) {
    if (!match && !message) return null
    return (
      <Text>
        {(match &&
          Object.values(match.params).length > 0 &&
          JSON.stringify(match.params)) ||
          message}
      </Text>
    )
  }
}

export function renderCardView({ navigationState, renderCard }) {
  const route = navigationState.routes[navigationState.index]
  return renderCard(route)
}

export function renderTabView({ navigationState, renderTab }) {
  const route = navigationState.routes[navigationState.index]
  return renderTab(route)
}
