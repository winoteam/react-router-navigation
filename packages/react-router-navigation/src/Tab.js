/* @flow */

import * as React from 'react'
import { Route as ReactRoute } from 'react-router'
import { SceneView, type Route } from 'react-router-navigation-core'
import { type CardProps } from './TypeDefinitions'

type Props = CardProps & Route

const Tab = (props: Props) => (
  <ReactRoute>
    {({ history }) => {
      return <SceneView {...props} history={history} />
    }}
  </ReactRoute>
)

export default Tab
