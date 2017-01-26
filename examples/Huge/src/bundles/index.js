import React, { Component } from 'react'
import { Navigation, BottomNavigation, Card, Tab } from 'react-router-navigation'

import Launch from './Launch'
import Auth from './Auth'
import Feed from './Feed'
import Search from './Search'
import Profile from './Profile'

const Root = () => (
  <Navigation>
    <Card
      pattern="/launch"
      component={Launch}
      hideNavBar
    />
    <Card
      pattern="/auth"
      component={Auth}
      title="Auth"
    />
    <Card
      pattern="/app"
      hideNavBar={true}
      render={() => (
        <BottomNavigation>
          <Tab
            pattern="/app/feed"
            component={Feed}
            label="Feed"
          />
          <Tab
            pattern="/app/search"
            component={Search}
            label="Search"
          />
          <Tab
            pattern="/app/profile"
            component={Profile}
            label="Profile"
          />
        </BottomNavigation>
      )}
    />
  </Navigation>
)

export default Root
