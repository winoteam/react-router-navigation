/* @flow */
/* eslint no-param-reassign: 0 */

import { Children, cloneElement } from 'react'
import { matchPattern } from 'react-router'
import type { NavigationRoute } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps, Tab, MatchTabProps } from './StackTypeDefinitions'
import type { History, Location, Entries } from './HistoryTypeDefinitions'

/**
 * Extract current match from all matches
 * and return a route with key prop
 */
export function getCurrentRoute(
  matchs: Array<{ pattern: string, exactly?: boolean } & Object>,
  parent: ?string,
  location: Location,
): ?NavigationRoute {
  const route = matchs
    .find(({ pattern, exactly }) => {
      return matchPattern(pattern, location, exactly || false, parent)
    })
  if (!route) return null
  return { key: route.pattern }
}


/**
 * Build an item stack by extracting
 * all valid props
 */
export function buildItemStack<Item>(
  children: Array<React$Element<Item>>,
  advancedProps: Array<string>,
  matchComponent: string,
): Array<Item & { key: string }> {
  // Define required props
  const defaultProps = ['component', 'render', 'pattern', 'exactly']
  // Map all children
  return Children.toArray(children).reduce((items, child) => {
    // child === <Match /> || child === <MatchCard />
    const displayName = child.displayName || child.type.displayName || child.type.name
    const isAdvancedMatch = matchComponent === displayName
    if (displayName !== 'Match' && !isAdvancedMatch) return items
    // Build item
    const item = Object.keys(child.props).reduce((props, key) => {
      if (key === 'pattern') {
        props.key = child.props[key]
        props[key] = child.props[key]
      } else if (isAdvancedMatch && (key === 'render' || key === 'component')) {
        props[key] = (ownProps: any) => cloneElement(child, ownProps)
      } else if (
        defaultProps.includes(key) ||
        (isAdvancedMatch && advancedProps.includes(key))
      ) {
        props[key] = child.props[key]
      }
      return props
    }, {})
    if (!item.key) return items
    return [...items, item]
  }, [])
}


/**
 * Build a card stack
 */
export function buildCards(children: Array<React$Element<MatchCardProps>>): Array<Card> {
  return buildItemStack(
    children,
    ['title', 'titleStyle', 'navBarStyle', 'hideNavBar'],
    'MatchCard',
  )
}


/**
 * Build a tab stack
 */
export function buildTabs(children: Array<React$Element<MatchTabProps>>): Array<Tab> {
  return buildItemStack(
    children,
    ['label', 'tabBarStyle', 'tabBarIndicatorStyle'],
    'MatchTab',
  )
}


/**
 * Normalize a route :
 *   - clean key of each route
 */
export function normalizeRoute(route: NavigationRoute): NavigationRoute {
  const extraIndex = route.key.indexOf('@@')
  if (extraIndex === -1) return route
  const key = route.key.slice(0, extraIndex)
  return { key }
}


/**
 * Get current card with route given
 */
export function getCurrentCard(route: NavigationRoute, cards: Array<Card>): ?Card {
  return cards.find((card) => {
    return normalizeRoute(route).key === card.key
  })
}

/**
 * Sync history with navigation state actions
 */
export function getCleanedHistory(
  history: History,
  { tabs, tabsEntries, firstEntryIndex, currentTabIndex }: {
    tabs: Array<Tab>,
    tabsEntries: { [key: number]: Entries },
    firstEntryIndex: number,
    currentTabIndex: number,
  } = {},
): History {
  // Simple pop action
  if (history.action === 'POP' && (history.length - 1) !== history.index) {
    const length = history.index + 1
    history.entries = history.entries.slice(0, length)
    history.length = length
  }
  if (tabs) {
    history.entries = history.entries.reduce((acc, entry, index, arr) => {
      if (index >= firstEntryIndex) {
        // Remove the entry
        if (!matchPattern(tabs[currentTabIndex].key, entry)) {
          return acc
        }
        // Add missing entries
        if (
          history.action === 'REPLACE' &&
          tabsEntries[currentTabIndex] &&
          arr.length === index && // This is last item
          (acc.length + 1) < tabsEntries[currentTabIndex].length // Entries are missing
        ) {
          const missingEntries = tabsEntries[currentTabIndex]
            .slice(
              firstEntryIndex,
              tabsEntries[currentTabIndex].findIndex((tabEntry) => {
                return matchPattern(tabEntry.key, entry)
              }),
            )
          return [
            ...acc,
            ...missingEntries,
            entry,
          ]
        }
      }
      // Add the entry
      return [...acc, entry]
    }, [])
    // Update length and index
    const newLength = history.entries.length
    history.length = newLength
    history.index = newLength - 1
  }
  return history
}
