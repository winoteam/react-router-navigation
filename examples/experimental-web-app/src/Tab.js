/* @flow */

import * as React from 'react'
import { Route, type ContextRouter } from 'react-router'
import { SceneView } from 'react-router-navigation-core'

type Props = {
  exact?: boolean,
  path: string,
  label: string,
  render: (router: ContextRouter) => React$Node,
}

export default function Tab(props: Props) {
  return (
    <Route>
      {contextRouter => {
        // $FlowFixMe
        return <SceneView {...contextRouter} {...props} />
      }}
    </Route>
  )
}
