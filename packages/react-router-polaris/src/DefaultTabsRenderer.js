/* @flow */

import * as React from 'react'
import { Route } from 'react-router'
import { Card, Tabs } from '@shopify/polaris'
import type { NavigationState } from 'react-router-navigation-core'
import { DefaultTabsRendererPropTypes } from './PropTypes'

type Props = {
  children?: React$Node[],
  navigationState: NavigationState,
  onIndexChange: (index: number) => void,
  renderTab: (route: Route) => ?React$Node,
}

export default class DefaultTabsRenderer extends React.Component<Props> {
  static propTypes = DefaultTabsRendererPropTypes

  renderCurrentTab = () => {
    const { renderTab, navigationState } = this.props
    return renderTab(navigationState.routes[navigationState.index])
  }

  render() {
    const { navigationState, onIndexChange, tabs } = this.props
    return (
      <Card>
        <Tabs
          selected={navigationState.index}
          onSelect={onIndexChange}
          tabs={tabs.map(tab => {
            const item: { path?: string, label?: string } = { ...tab }
            return {
              id: item.path,
              content: item.label,
              panelID: item.label,
            }
          })}
        />
        {this.renderCurrentTab()}
      </Card>
    )
  }
}
