/* @flow */
/* eslint no-duplicate-imports: 0*/

import { matchPath } from 'react-router'
import type { RouterHistory } from 'react-router'
import type { Card } from './TypeDefinitions'

export default function (
  currentCard: Card,
  nextCard: Card,
  currentRouterHistory: RouterHistory,
  nextRouterHistory: RouterHistory,
): boolean {
  const { location: currentLocation } = currentRouterHistory
  const { entries, index, location: nextLocation } = nextRouterHistory
  if (entries === undefined || index === undefined) return false
  // Get entries and matchers
  const previousEntry = entries[index - 1]
  const currentEntry = entries[index]
  const nextEntry = entries[index + 1]
  const matchCurrentRoute = matchPath(nextLocation.pathname, currentCard.path, currentCard)
  const matchNextRoute = matchPath(nextLocation.pathname, nextCard.path, nextCard)
  return (
    // Test if pathame are different
    (currentLocation.pathname !== nextLocation.pathname) &&
    // case 1) basic pathname
    ((currentCard.path !== nextCard.path) ||
    // case 2) Pathname with query params
    // ex: with same path article/:id,
    //     pathname article/2 !== article/3
    (matchCurrentRoute !== null && matchNextRoute !== null &&
     Object.keys(matchCurrentRoute.params).length !== 0 &&
     Object.keys(matchNextRoute.params).length !== 0 &&
     ((previousEntry && currentEntry.pathname !== previousEntry.pathname) ||
      (nextEntry && currentEntry.pathname !== nextEntry.pathname))
    ))
  )
}
