/* @flow */

import * as React from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import type { RouteProps } from './TypeDefinitions'

const StackUtils = {
  create: (children: Array<React$Node>, props: *) => {
    return React.Children.toArray(children).reduce((stack, child) => {
      return [
        ...stack,
        {
          ...props,
          ...child.props,
          children: child.props.children,
          history: child.props.history,
          render: child.props.render,
        },
      ]
    }, [])
  },

  shallowEqual: (oldStack: Array<*>, newStack: Array<*>) => {
    return oldStack.every((oldItem, index) => {
      return shallowEqual(oldItem, newStack[index])
    })
  },
}

export default StackUtils
