/* @flow */

import type { Route, Cards, Card } from './../TypeDefinitions'
import normalizeRoute from './normalizeRoute'

export default function getCurrentCard(cards: Cards, route: Route): ?Card {
  return cards.find((card) => {
    return normalizeRoute(route).key === card.key
  })
}
