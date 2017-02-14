import React, { PropTypes, Component, createElement } from 'react'
import { View, Text } from 'react-native'
import { normalizeRoute } from './../utils'

export const componentFactory = (message) => ({ match: { params } }) => (
  <Text>{params.id || params.slug || message}</Text>
)

export const CardView = ({ navigationState, cards }) => {
  const route = navigationState.routes[navigationState.index]
  const card = cards.find(({ key }) => key === normalizeRoute(route).key)
  return createElement(card.render, { key: route.key })
}

export const TabView = ({ navigationState, tabs, onRequestChangeTab }) => {
  const route = navigationState.routes[navigationState.index]
  const tab = tabs.find(({ key }) => key === route.key)
  return createElement(tab.render, { key: route.key })
}
