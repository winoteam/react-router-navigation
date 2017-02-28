/* @flow */
/* eslint no-duplicate-imports: 0 */

import { Children, cloneElement } from 'react'
import { matchPath } from 'react-router'
import type { RouterHistory } from 'react-router'
import type { Route } from './TypeDefinitions'

export default {

  /**
   * Build stack with React elements
   */
  build: <Item>(children: Array<React$Element<Item>>): Array<Item & { key: string }> => {
    return Children.toArray(children).reduce((stack, child) => {
      const item = Object.keys(child.props).reduce((props, key) => {
        if (key === 'path') {
          return {
            ...props,
            [key]: child.props[key],
            key: child.props[key],
          }
        } else if (key === 'render' || key === 'component' || key === 'children') {
          return {
            ...props,
            [key]: (ownProps: any) => cloneElement(child, ownProps),
          }
        }
        return {
          ...props,
          [key]: child.props[key],
        }
      }, {})
      if (!item.key) return stack
      return [...stack, item]
    }, [])
  },


  /**
   * Test if current stack item should be updated
   */
  shouldUpdate: (
    currentItem: { path: string, exact?: boolean, strict?: boolean },
    nextItem: { path: string, exact?: boolean, strict?: boolean },
    currentRouterHistory: RouterHistory,
    nextRouterHistory: RouterHistory,
  ): boolean => {
    const { location: currentLocation } = currentRouterHistory
    const { entries, index, location: nextLocation } = nextRouterHistory
    if (entries === undefined || index === undefined) return false
    // Get entries and matchs
    const previousEntry = entries[index - 1]
    const currentEntry = entries[index]
    const nextEntry = entries[index + 1]
    const matchCurrentRoute = matchPath(nextLocation.pathname, currentItem.path, currentItem)
    const matchNextRoute = matchPath(nextLocation.pathname, nextItem.path, nextItem)
    return (
      // Test if pathames are different
      (currentLocation.pathname !== nextLocation.pathname) &&
      // case 1) basic pathname
      ((currentItem.path !== nextItem.path) ||
      // case 2) pathname with query params
      // ex: with same path article/:id,
      //     pathname article/2 !== article/3
      (matchCurrentRoute !== null && matchNextRoute !== null &&
       Object.keys(matchCurrentRoute.params).length !== 0 &&
       Object.keys(matchNextRoute.params).length !== 0 &&
       ((previousEntry && currentEntry.pathname !== previousEntry.pathname) ||
        (nextEntry && currentEntry.pathname !== nextEntry.pathname))
      ))
    )
  },


  /**
   * Get stack item from a specific route
   */
  get: <Item>(items: Array<Item>, route: Route & { routeName?: string }): ?Item => {
    return items.find((item) => {
      return (
        item && item.key &&
        (route.routeName === item.key || route.key === item.key)
      )
    })
  },


  /**
   * Get current route from a specific history location
   */
  getRoute: <Item>(stack: Array<Item>, location: Location): ?Route => {
    const item = stack.find((stackItem) => {
      // $FlowFixMe
      return matchPath(location.pathname, stackItem.path, stackItem)
    })
    if (!item || !item.key || typeof item.key !== 'string') return null
    return { key: item.key }
  },


  /**
   * Generate unique key
   */
  createKey: (route: Route): string => {
    return `${route.key}@@${Math.random().toString(36).substr(2, 10)}`
  },

}
