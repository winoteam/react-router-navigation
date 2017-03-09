/* @flow */
/* eslint no-duplicate-imports: 0 */
/* eslint no-param-reassign: 0 */

import { Children, cloneElement } from 'react'
import { matchPath } from 'react-router'
import type { ContextRouter, Location } from 'react-router'
import type { Route } from './TypeDefinitions'


/**
 * Build stack with React elements
 */
export const build = <Item>(
  children: Array<React$Element<Item>>
): Array<Item & { key: string }> => {
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
          [key]: (ownProps) => {
            return cloneElement(
              child,
              { state: ownProps && ownProps.state },
            )
          },
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
}


/**
 * Test if current stack item should be updated
 */
export const shouldUpdate = (
   currentItem: { path: string, exact?: boolean, strict?: boolean },
   nextItem: { path: string, exact?: boolean, strict?: boolean },
   currentContext: ContextRouter,
   nextContext: ContextRouter,
 ): boolean => {
  const { location: currentLocation } = currentContext
  const { history: { entries, index }, location: nextLocation } = nextContext
  if (entries === undefined || index === undefined) return false
  // Get entries and matchs
  const previousEntry = entries[index - 1]
  const currentEntry = entries[index]
  const nextEntry = entries[index + 1]
  const matchCurrentRoute = matchPath(nextLocation.pathname, currentItem)
  const matchNextRoute = matchPath(nextLocation.pathname, nextItem)
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
}


/**
 * Get stack item from a specific route
 * $FlowFixMe
 */
export const get = <Item>(items: Array<Item>, route: Route): ?Item => ({
  ...route,
  ...items.find((item) => {
    return (
      item && item.key &&
      route.routeName === item.key
    )
  }),
})


/**
 * Generate unique key
 */
export const createKey = (route: Route): string => {
  return `${route.key}@@${Math.random().toString(10)}`
}


/**
 * Get current route from a specific history location
 */
export const getRoute = (stack: Array<Object>, location: Location): ?Route => {
  const { pathname } = location
  const item = stack.find((stackItem) => {
    return matchPath(pathname, stackItem)
  })
  if (!item || !item.key) return null
  return {
    key: createKey(item),
    routeName: item.key,
    match: matchPath(pathname, item),
  }
}


/**
 * Render a subview with props
 */
export const renderSubView = (
  render: Function,
  ownProps?: any = {},
) => (props: any): ?React$Element<any> => {
  const allProps = { ...ownProps, ...props }
  const { cards, tabs, scene, route, navigationState: { routes, index } } = allProps
  const item = get(
    cards || tabs,
    (scene && scene.route) || route || routes[index],
  )
  if (!item) return null
  return render({ ...allProps, ...item })
}
