/* @flow */

import * as React from 'react'
import { Route } from 'react-router'
import { SceneView } from 'react-router-navigation-core'
import { type CardProps } from './TypeDefinitions'

type Props = CardProps & Route

const Card = (props: Props) => (
  <Route>
    {({ history }) => {
      return <SceneView {...props} history={history} />
    }}
  </Route>
)

export default Card
