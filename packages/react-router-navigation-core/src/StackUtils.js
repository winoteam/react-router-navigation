/* @flow */

import * as React from 'react'
import { type Location, matchPath } from 'react-router'
import shallowEqual from 'fbjs/lib/shallowEqual'
import type { RouteProps } from './TypeDefinitions'

const StackUtils = {
  create: (children: ?Array<React$Node>, props: *) => {
    return React.Children.toArray(children).reduce((stack, child) => {
      return [
        ...stack,
        { ...props, ...child.props },
      ]
    }, [])
  },

  shallowEqual: (oldStack: Array<*>, newStack: Array<*>): boolean => {
    return oldStack.every((oldItem, index) => {
      return shallowEqual(oldItem, newStack[index])
    })
  },

  getHistoryEntries: (
    stack: Array<RouteProps>,
    entries: Array<Location>,
    location: Location,
  ): Array<Location> => {
    const startHistoryIndex = entries.reduce((acc, entry, index) => {
      if (stack.find(item => matchPath(entry.pathname, item))) {
        if (acc === -1) return index
        return acc
      }
      return -1
    }, -1)
    const lastHistoryIndex = entries.reduce((acc, entry, index) => {
      if (index < startHistoryIndex) return -1
      if (location.pathname === entry.pathname) return index
      return acc
    }, -1)
    return entries.slice(startHistoryIndex, lastHistoryIndex + 1)
  },
}

export default StackUtils
