import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Match, Redirect } from 'react-router'
import { BottomNavigation, MatchTab } from 'react-native-router-navigation'

import Feed from './Feed'
import Search from './Search'
import Profile from './Profile'

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const App = () => (
  <View style={styles.container}>
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
