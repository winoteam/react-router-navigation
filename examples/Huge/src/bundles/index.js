import React, { Component } from 'react'
import { Navigation, BottomNavigation, MatchCard, MatchTab } from 'react-router-navigation'

import Launch from './Launch'
import Auth from './Auth'
import Feed from './Feed'
import Search from './Search'
import Profile from './Profile'

const Root = () => (
  <Navigation>
    <MatchCard
      pattern="/launch"
      component={Launch}
      hideNavBar
    />
    <MatchCard
      pattern="/auth"
      component={Auth}
      title="Auth"
    />
    <MatchCard
      pattern="/app"
      hideNavBar={true}
      render={() => (
        <BottomNavigation>
          <MatchTab
            pattern="/app/feed"
            component={Feed}
            label="Feed"
          />
          <MatchTab
            pattern="/app/search"
            component={Search}
            label="Search"
          />
          <MatchTab
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
