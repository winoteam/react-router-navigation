/* @flow */
/* eslint no-duplicate-imports: 0 */

import React from 'react'
import { Route } from 'react-router'
import type { CardProps } from './TypeDefinitions'
import SceneView from './SceneView'

type Props = CardProps

const Card = (props: Props): React$Element<any> => (
  <Route
    path={props.path}
    exact={props.exact}
    strict={props.strict}
  >
    {({ history, location, match }) => (
      <SceneView
        {...props}
        history={history}
        location={location}
        match={match}
      />
    )}
  </Route>
)

export default Card
