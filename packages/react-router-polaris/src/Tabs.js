/* @flow */

import * as React from 'react'
import { TabStack } from 'react-router-navigation-core'
import { Route } from 'react-router'
import DefaultTabsRenderer from './DefaultTabsRenderer'
import { TabsPropTypes } from './PropTypes'

type Props = {
  children?: React$Node[],
}

export default class Tabs extends React.Component<Props> {
  static defaultProps = TabsPropTypes

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
