/* eslint react/prop-types: 0 */

import React, { createElement } from 'react'
import { Text } from 'react-native'
import * as StackUtils from './../StackUtils'

export const componentFactory = message => ({ match }) => (
  <Text>{(match && (match.params.id || match.params.slug)) || message}</Text>
)

export const renderCardView = ({ navigationState: { routes, index }, cards }) => {
  const route = routes[index]
  const card = StackUtils.get(cards, route)
  return createElement(card.render, { key: card.key })
}

export const renderTabView = ({ navigationState: { routes, index }, tabs }) => {
  const route = routes[index]
  const tab = StackUtils.get(tabs, route)
  return createElement(tab.render, { key: tab.key })
}
