/* @flow */

import type { NavigationRoute } from './../types'

type Children = Array<React$Element<any>>

export default function extractScenes(children: Children) {
  return children.map((child) => ({
    ...child.props,
    key: child.key,
  }))
}
