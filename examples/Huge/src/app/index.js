import React from 'react'
import { StatusBar, View } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { BRAND_COLOR_60 } from '@ressources/theme'
import Feed from './modules/Feed'
import Profile from './modules/Profile'
import Search from './modules/Search'
import styles from './styles'

const App = () => (
  <Switch>
    <Route
      exact
      path="/app"
      render={({ match }) => <Redirect to={`${match.url}/feed`} />}
    />
    <Route
      path="/app"
      render={({ location, match }) => (
        <View style={styles.tabs}>
          <StatusBar
            barStyle={location.pathname.startsWith(`${match.url}/search`)
              ? 'dark-content'
              : 'light-content'
            }
            backgroundColor={!location.pathname.startsWith(`${match.url}/search`)
              ? BRAND_COLOR_60
              : '#ffffff'
            }
          />
          <BottomNavigation
            labelStyle={({ isActive }) => isActive && styles.activeLabel}
          >
            <Tab
              path={`${match.url}/feed`}
              render={(props) => (
                <Feed
                  {...props}
                  ref={(c) => this.feed = c}
                />
              )}
              label="Feed"
              onReset={() => {
                if (this.feed && this.feed.listView) {
                  this.feed.listView.scrollTo({ y: 0 })
                }
              }}
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
)

export default App
