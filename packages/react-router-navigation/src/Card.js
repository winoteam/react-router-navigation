import * as React from 'react'
import { Route } from 'react-router'
import { SceneView } from 'react-router-navigation-core'
import { CardPropTypes } from './PropTypes'

export default class Card extends React.Component {
  static propTypes = CardPropTypes

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
