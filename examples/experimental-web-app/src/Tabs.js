/* @flow */

import * as React from 'react'
import { TabStack } from 'react-router-navigation-core'
import { Route } from 'react-router'
import * as Polaris from '@shopify/polaris'

type Props = {
  children?: React$Node[],
}

class Tabs extends React.Component<Props> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Route>
        {contextRouter => (
          <TabStack
            {...contextRouter}
            {...this.props}
            render={({ navigationState, tabs, onIndexChange, renderTab }) => (
              <Polaris.Card>
                <Polaris.Tabs
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
                {renderTab(navigationState.routes[navigationState.index])}
              </Polaris.Card>
            )}
          />
        )}
      </Route>
    )
  }
}

export default Tabs
