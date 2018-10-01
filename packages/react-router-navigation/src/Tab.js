import * as React from 'react'
import { Route } from 'react-router'
import { SceneView } from 'react-router-navigation-core'
import { TabPropTypes } from './PropTypes'

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
