/* @flow */

import type { Route, Cards, Card, CardRoute } from './TypeDefinitions'

export default function getCurrentCard(cards: Cards, route: Route & CardRoute): ?Card {
  return cards.find((card) => {
    return route.routeName === card.key
  })
}
