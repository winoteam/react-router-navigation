import React from 'react'
import { Navigation, Card } from 'react-router-navigation'
import Launch from './modules/Launch'
import Auth from './modules/Auth'
import App from './modules/App'

const Root = () => (
  <Navigation>
    <Card
      path="/launch"
      component={Launch}
      hideNavBar
    />
    <Card
      path="/auth"
      component={Auth}
      title="Auth"
    />
    <Card
      path="/app"
      component={App}
      hideNavBar
    />
  </Navigation>
)

export default Root
