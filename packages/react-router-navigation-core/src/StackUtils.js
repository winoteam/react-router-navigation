/* @flow */

import * as React from 'react'
import { type Location, matchPath } from 'react-router'
import shallowEqual from 'fbjs/lib/shallowEqual'
import type { RouteProps } from './TypeDefinitions'

export default {
  create(stackChildren: React$Node[], props: any) {
    // eslint-disable-next-line
    const { history, children, render, ...rest } = props
    return React.Children.toArray(stackChildren).reduce((stack, child) => {
      return [...stack, { ...rest, ...child.props }]
    }, [])
  },

  shallowEqual<T>(oldStack: T[], newStack: T[]): boolean {
    if (oldStack.length !== newStack.length) return false
    return oldStack.every((oldItem, index) => {
      return shallowEqual(oldItem, newStack[index])
    })
  },

  getHistoryEntries(
    stack: RouteProps[],
    entries: Location[],
    location: Location,
    historyIndex?: number,
  ): Location[] {
    const startHistoryIndex = entries.reduce((acc, entry, index) => {
      if (stack.find(item => matchPath(entry.pathname, item))) {
        if (acc === -1) {
          return index
        }
        return acc
      }
      if (typeof historyIndex === 'number' && index > historyIndex) {
        return acc
      }
      return -1
    }, -1)
    const lastHistoryIndex = entries.reduce((acc, entry, index) => {
      if (
        index < startHistoryIndex &&
        typeof historyIndex === 'number' &&
        index <= historyIndex
      ) {
        return -1
      }
      if (location.pathname === entry.pathname) {
        return index
      }
      return acc
    }, -1)
    return entries.slice(startHistoryIndex, lastHistoryIndex + 1)
  },
}
