/* @flow */
/* eslint no-param-reassign: 0*/

import { Children, cloneElement } from 'react'

export default function buildStack<Item>(
  children: Array<React$Element<Item>>
): Array<Item & { key: string }> {
  return Children.toArray(children).reduce((stack, child) => {
    const item = Object.keys(child.props).reduce((props, key) => {
      if (key === 'path') {
        props.key = child.props[key]
        props[key] = child.props[key]
      } else if (key === 'render' || key === 'component' || key === 'children') {
        const renderMethod = (ownProps: any) => cloneElement(child, ownProps)
        Object.defineProperty(renderMethod, 'name', { value: key })
        props[key] = renderMethod
      } else {
        props[key] = child.props[key]
      }
      return props
    }, {})
    if (!item.path) return stack
    return [...stack, item]
  }, [])
}
