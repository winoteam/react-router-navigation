/* @flow */

import type { NavigationScene, NavigationRoute } from './../types'

type Children = Array<React$Element<NavigationScene>>
type Routes = Array<NavigationRoute>

export default function extractScenes(children: Children): Routes {
  return children.map((child) => ({
    ...child.props,
    key: child.key,
  }))
}
