/* @flow */
/* eslint no-param-reassign: 0 */

import { Children } from 'react'
import { matchPattern } from 'react-router'
import type { NavigationRoute } from 'react-native/Libraries/NavigationExperimental/NavigationTypeDefinition'
import type { Card, MatchCardProps, Tab, MatchTabProps } from './StackTypeDefinitions'

/**
 * Extract current match from all matches
 * and return a route with key prop
 */
export function getCurrentRoute(
  matchs: Array<{ pattern: string, exactly?: boolean } & Object>,
  parent: ?string,
  location: { pathname: string },
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
        props[key] = () => child
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
  return buildItemStack(children, ['title', 'hideNavBar'], 'MatchCard')
}


/**
 * Build a tab stack
 */
export function buildTabs(children: Array<React$Element<MatchTabProps>>): Array<Tab> {
  return buildItemStack(children, ['label', 'tabBarStyle'], 'MatchTab')
}
