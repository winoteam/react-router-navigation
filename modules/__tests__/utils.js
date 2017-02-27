import React, { PropTypes, Component, createElement } from 'react'
import { View, Text } from 'react-native'
import StackUtils from './../StackUtils'

export const componentFactory = (message) => ({ match: { params } }) => (
  <Text>{params.id || params.slug || message}</Text>
)

export const CardView = ({ navigationState: { routes, index }, cards }) => {
  const route = routes[index]
  const card = StackUtils.get(cards, route)
  return createElement(card.render, { key: card.key })
}

export const TabView = ({ navigationState: { routes, index }, tabs }) => {
  const route = routes[index]
  const tab = StackUtils.get(tabs, route)
  return createElement(tab.render, { key: route.key })
}
