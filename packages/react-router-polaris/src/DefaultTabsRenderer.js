/* @flow */

import * as React from 'react'
import { Card, Tabs } from '@shopify/polaris'
import {
  type TabsRendererProps,
  TabsRendererPropType,
} from 'react-router-navigation-core'

type Props = TabsRendererProps<>

export default class DefaultTabsRenderer extends React.Component<Props> {
  static propTypes = TabsRendererPropType

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
            const item: {
              path?: string,
              label?: string,
            } = { ...tab }
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
