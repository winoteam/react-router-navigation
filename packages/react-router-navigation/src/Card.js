/* @flow */

import React from 'react'
import { Route } from 'react-router'
import type { CardProps } from './TypeDefinitions'
import SceneView from './SceneView'

type Props = CardProps

const Card = (props: Props) => (
  <Route>
    {({ history }) => {
      return <SceneView {...props} type="card" history={history} />
    }}
  </Route>
)

export default Card
