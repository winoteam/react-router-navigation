/* @flow */

import React from 'react'
import type { CardProps } from './TypeDefinitions'
import History from './History'
import SceneView from './SceneView'

type Props = CardProps

const Card = (props: Props) => (
  <History>
    {({ history, location }) => (
      <SceneView
        {...props}
        type="card"
        location={location}
        history={history}
      />
    )}
  </History>
)

export default Card
