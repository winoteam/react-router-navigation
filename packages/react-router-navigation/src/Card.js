/* @flow */

import { Route } from 'react-router'
import type { CardProps } from './TypeDefinitions'
import SceneView from './SceneView'
import * as React from 'react'

type Props = CardProps

const Card = (props: Props) => (
  <Route>
    {({ history }) => {
      return <SceneView {...props} type="card" history={history} />
    }}
  </Route>
)

export default Card
