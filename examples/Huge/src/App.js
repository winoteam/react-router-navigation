import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { Match, Redirect } from 'react-router'
import { BottomNavigation, MatchTab } from 'react-router-navigation'

import Feed from './Feed'
import Search from './Search'
import Profile from './Profile'

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const App = () => (
  <View style={styles.container}>
    <StatusBar
      backgroundColor="black"
      barStyle="default"
    />
    <Match
      exactly
      pattern="/app"
      render={() => <Redirect to="/app/feed" />}
    />
    <Match
      pattern="/app/(feed|search|profile)"
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
  </View>
)

export default App
