/* @flow */
/* eslint no-duplicate-imports: 0 */

import React, { PropTypes, Children, cloneElement } from 'react'
import { matchPath } from 'react-router'
import type { RouterHistory, Location } from 'react-router'
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
    currentContext: { location: Location, history: RouterHistory },
    nextContext: { location: Location, history: RouterHistory },
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
  },


  /**
   * Get stack item from a specific route
   */
  get: <Item>(items: Array<Item>, route: Route): ?Item => {
    return items.find((item) => {
      return (
        item && item.key &&
        route.routeName === item.key
      )
    })
  },


  /**
   * Get current route from a specific history location
   */
  getRoute: <Item>(stack: Array<Item>, location: Location): ?Route => {
    const item = stack.find((stackItem) => {
      // $FlowFixMe
      return matchPath(location.pathname, stackItem)
    })
    if (!item || !item.key || typeof item.key !== 'string') return null
    return { key: item.key, routeName: item.key }
  },


  /**
   * Generate unique key
   */
  createKey: (route: Route): string => {
    return `${route.key}@@${Math.random().toString(36).substr(2, 10)}`
  },


  /**
   * Get history from context
   * @TODO remove this util in favor of ReactRouter.withRouter
   */
  withRouter: (Component: ReactClass<any>): ((props: any, context: any) => React$Element<any>) => {
    const WithRouter = (props: any, context: any): React$Element<any> => (
      <Component
        {...props}
        history={context && { ...context.history }}
        location={context && context.history.location}
      />
    )
    WithRouter.contextTypes = { history: PropTypes.object.isRequired }
    WithRouter.displayName = `withRouter(${Component.displayName || Component.name})`
    return WithRouter
  },

}
