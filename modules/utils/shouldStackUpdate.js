/* @flow */
/* eslint no-duplicate-imports: 0*/

import { matchPath } from 'react-router'
import type { RouterHistory, Location } from 'react-router'
import type { Card } from './../TypeDefinitions'

export default function (
  currentCard: Card,
  nextCard: Card,
  routerHistory: RouterHistory,
  previousLocation: Location,
): boolean {
  const { entries, location, index } = routerHistory
  if (entries === undefined || index === undefined) return false
  const previousEntry = entries[index - 1]
  const currentEntry = entries[index]
  const nextEntry = entries[index + 1]
  const matchCurrentRoute = matchPath(location.pathname, currentCard.path, currentCard)
  const matchNextRoute = matchPath(location.pathname, nextCard.path, nextCard)
  return (
    // URL changes
    (previousLocation.pathname !== location.pathname) &&
    // case 1) basic pathname
    ((currentCard.key !== nextCard.key) ||
    // case 2) Pathname with query params
    // Ex: with same path article/:id,
    //     pathname article/2 !== article/3
    (matchCurrentRoute !== null && matchNextRoute !== null &&
     Object.keys(matchCurrentRoute.params).length !== 0 &&
     Object.keys(matchNextRoute.params).length !== 0 &&
     ((previousEntry && currentEntry.pathname !== previousEntry.pathname) ||
      (nextEntry && currentEntry.pathname !== nextEntry.pathname))
    ))
  )
}
