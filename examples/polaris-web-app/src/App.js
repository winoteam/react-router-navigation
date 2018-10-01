/* @flow */

import * as React from 'react'
import { type ContextRouter } from 'react-router'
import { Card } from '@shopify/polaris'
import { Tabs, Tab } from 'react-router-polaris'
import './App.css'

type Props = {}

class App extends React.Component<Props> {
  renderAllCustomersTab = (contextRouter: ContextRouter) => {
    const { pathname } = contextRouter.location
    return (
      <Card.Section title="All customers">
        <p>First tab « {pathname} »</p>
      </Card.Section>
    )
  }

  renderAcceptsMarketingTab = (contextRouter: ContextRouter) => {
    const { pathname } = contextRouter.location
    return (
      <Card.Section title="Accepts marketing">
        <p>Second tab « {pathname} »</p>
      </Card.Section>
    )
  }

  renderRepeatCustomersTab = (contextRouter: ContextRouter) => {
    const { pathname } = contextRouter.location
    return (
      <Card.Section title="Repeat customers">
        <p>Third tab « {pathname} »</p>
      </Card.Section>
    )
  }

  renderProspectsTab = (contextRouter: ContextRouter) => {
    const { pathname } = contextRouter.location
    return (
      <Card.Section title="Prospects">
        <p>Fourth tab « {pathname} »</p>
      </Card.Section>
    )
  }

  render() {
    return (
      <div className="container">
        <Tabs>
          <Tab
            exact={true}
            path="/"
            label="All customers"
            render={this.renderAllCustomersTab}
          />
          <Tab
            path="/accepts-marketing"
            label="Accepts marketing"
            render={this.renderAcceptsMarketingTab}
          />
          <Tab
            path="/repeat-customers"
            label="Repeat customers"
            render={this.renderRepeatCustomersTab}
          />
          <Tab
            path="/prospects"
            label="Prospects"
            render={this.renderProspectsTab}
          />
        </Tabs>
      </div>
    )
  }
}

export default App
