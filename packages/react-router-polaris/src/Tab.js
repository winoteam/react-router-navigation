/* @flow */

import * as React from 'react'
import { Route } from 'react-router'
import { SceneView, type RouteProps } from 'react-router-navigation-core'
import { TabPropTypes } from './PropTypes'
import { TabOptions } from './TypeDefinitions'

type Props = {
  ...RouteProps,
  ...TabOptions,
}

export default class Tab extends React.Component {
  static propTypes = TabPropTypes

  render() {
    return (
      <Route>
        {({ history }) => {
          return <SceneView {...this.props} history={history} />
        }}
      </Route>
    )
  }
}
