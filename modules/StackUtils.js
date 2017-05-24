/* @flow */
/* eslint no-duplicate-imports: 0 */

import React from 'react'
import { matchPath } from 'react-router'
import type { Location } from 'react-router'
import type { Route } from './TypeDefinitions'


/**
 * Build stack with React elements
 */
// eslint-disable-next-line
export const build = <Item>(
  children: Array<React$Element<Item>>,
): Array<Item & { key: string }> => {
  return React.Children.toArray(children).reduce((stack, child) => {
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
          [key]: () => React.cloneElement(child),
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
   currentLocation: Location,
   nextLocation: Location,
 ): boolean => {
  // Get entries and matchs
  const matchCurrentRoute = matchPath(currentLocation.pathname, currentItem)
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
     currentLocation.pathname !== nextLocation.pathname))
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
  return `${route.key}@@${Math.random().toString(10).slice(1)}`
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
  additionalProps?: any = {}, // $FlowFixMe
) => (ownProps: any): ?React$Element<any> => {
  const props = { ...additionalProps, ...ownProps }
  const { cards, tabs, scene, route, navigationState: { routes, index } } = props
  const item = get(
    cards || tabs,
    (scene && scene.route) || route || routes[index],
  )
  if (!item) return null
  return render({ ...props, ...item }, props)
}
