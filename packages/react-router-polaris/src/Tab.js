/* @flow */

import * as React from 'react'
import PropTypes from 'prop-types'
import * as ReactRouter from 'react-router'
import {
  SceneView,
  TabPropType,
  type RouteProps,
} from 'react-router-navigation-core'
import { type TabOptions } from './TypeDefinitions'

type Props = RouteProps & TabOptions

export default class Tab extends React.Component<Props> {
  // $FlowFixMe
  static propTypes = { ...TabPropType, label: PropTypes.string.isRequired }

  render() {
    return (
      <ReactRouter.Route>
        {({ history }) => {
          return <SceneView {...this.props} history={history} />
        }}
      </ReactRouter.Route>
    )
  }
}
