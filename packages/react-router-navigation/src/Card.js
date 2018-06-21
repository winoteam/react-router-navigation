import * as React from 'react'
import { Route } from 'react-router'
import { SceneView } from 'react-router-navigation-core'

const Card = props => (
  <Route>
    {({ history }) => {
      return <SceneView {...props} history={history} />
    }}
  </Route>
)

export default Card
