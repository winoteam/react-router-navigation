/* @flow */

import React from 'react'
import { Route } from 'react-router'
import { type TabProps } from './TypeDefinitions'
import SceneView from './SceneView'

type Props = TabProps

const Tab = (props: Props) => (
  <Route>
    {({ history }) => {
      return <SceneView {...props} type="tab" history={history} />
    }}
  </Route>
)

export default Tab
