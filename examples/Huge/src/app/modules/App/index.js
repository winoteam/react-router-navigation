import React from 'react'
import { View } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { BottomNavigation, Tab } from 'react-router-navigation'
import Feed from './modules/Feed'
import Profile from './modules/Profile'
import Search from './modules/Search'
import TabBar from './components/TabBar'
import Modal from './components/Modal'
import styles from './styles'

const App = () => (
  <View style={styles.container}>
    <Switch>
      <Route
        exact
        path="/app"
        render={() => <Redirect to="/app/feed" />}
      />
      <Route
        path="/app"
        render={() => (
          <BottomNavigation
            renderTabBar={TabBar}
          >
            <Tab
              path="/app/feed"
              component={Feed}
              label="Feed"
            />
            <Tab
              path="/app/search"
              component={Search}
              label="Search"
            />
            <Tab
              path="/app/profile"
              component={Profile}
              label="Profile"
            />
          </BottomNavigation>
        )}
      />
    </Switch>
    <Modal />
  </View>
)

export default App
