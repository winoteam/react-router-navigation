/* @flow */

import * as React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { TabStack } from 'react-router-navigation-core'
import DefaultTabsRenderer from './DefaultTabsRenderer'

type Props = {
  children?: React$Node[],
}

export default class Tabs extends React.Component<Props> {
  static defaultProps = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  render() {
    return (
      <Route>
        {contextRouter => (
          <TabStack
            {...contextRouter}
            {...this.props}
            render={tabStackProps => (
              <DefaultTabsRenderer {...this.props} {...tabStackProps} />
            )}
          />
        )}
      </Route>
    )
  }
}
