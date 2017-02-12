import React, { PropTypes, Component, createElement } from 'react'
import { View, Text } from 'react-native'
import { normalizeRoute } from './../utils'

export const componentFactory = (message) => ({ match: { params } }) => (
  <Text>{params.id || params.slug || message}</Text>
)

export const CardView = ({ navigationState, cards }) => {
  const route = navigationState.routes[navigationState.index]
  const currentRoute = navigationState.routes[navigationState.index]
  const currentCard = cards.find(({ key }) => key === normalizeRoute(currentRoute).key)
  return createElement(currentCard.render, { key: route.key })
}

export const TabView = ({ navigationState, tabs, onRequestChangeTab }) => {
  const currentRoute = navigationState.routes[navigationState.index]
  const currentTab = tabs.find(({ key }) => key === currentRoute.key)
  return createElement(currentTab.render)
}
