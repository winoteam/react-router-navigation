import React from 'react'
import { StatusBar, View } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { BRAND_COLOR_60 } from '@ressources/theme'
import Feed from './modules/Feed'
import Profile from './modules/Profile'
import Search from './modules/Search'
import styles from './styles'

const App = ({ match }) => (
  <View style={styles.container}>
    <Switch>
      <Route
        exact
        path={match.url}
        render={() => <Redirect to={`${match.url}/feed`} />}
      />
      <Route
        path={match.url}
        render={({ location: { pathname } }) => (
          <View style={styles.tabs}>
            <StatusBar
              barStyle={pathname.startsWith(`${match.url}/search`)
                ? 'dark-content'
                : 'light-content'
              }
              backgroundColor={!pathname.startsWith(`${match.url}/search`)
                ? BRAND_COLOR_60
                : '#ffffff'
              }
            />
            <BottomNavigation
              labelStyle={({ isActive }) => isActive && styles.activeLabel}
            >
              <Tab
                path={`${match.url}/feed`}
                component={Feed}
                label="Feed"
              />
              <Tab
                path={`${match.url}/search`}
                component={Search}
                label="Search"
              />
              <Tab
                path={`${match.url}/profile`}
                component={Profile}
                label="Profile"
              />
            </BottomNavigation>
          </View>
        )}
      />
    </Switch>
  </View>
)

export default App
