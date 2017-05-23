/* eslint global-require: 0 */

import React from 'react'
import { StyleSheet, StatusBar, Platform, View, Image } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import Feed from './Feed'
import Profile from './Profile'
import { BRAND_COLOR_60 } from './theme'

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
})

const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const loggerMiddleware = () => (next) => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    console.log(history.entries.map(({ pathname }) => pathname))
  }
  next(action)
}

const store = createStore(
  combineReducers({ router: routerReducer }),
  applyMiddleware(
    historyMiddleware,
    loggerMiddleware,
  ),
)

const App = (): React$Element<any> => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/feed" />}
        />
        <Route
          path="/"
          render={({ location, match: { url } }) => (
            <View style={styles.tabs}>
              <StatusBar
                barStyle={location.pathname.startsWith(`${url}/search`)
                  ? 'dark-content'
                  : 'light-content'
                }
                backgroundColor={!location.pathname.startsWith(`${url}/search`)
                  ? BRAND_COLOR_60
                  : '#ffffff'
                }
              />
              <BottomNavigation
                tabTintColor={'#a5aaB2'}
                tabActiveTintColor={BRAND_COLOR_60}
              >
                <Tab
                  path="/feed"
                  render={ownProps => (
                    <Feed
                      {...ownProps}
                      ref={(c) => {
                        this.feed = c
                      }}
                    />
                  )}
                  onReset={() => {
                    if (this.feed && this.feed.listView) {
                      this.feed.listView.scrollTo({ y: 0 })
                    }
                  }}
                  label="Feed"
                  renderTabIcon={({ focused, tabTintColor, tabActiveTintColor }) => (
                    <Image
                      source={require('./assets/feed.png')}
                      style={[{
                        marginBottom: Platform.OS === 'android' ? 2.5 : 1,
                        width: Platform.OS === 'android' ? 22.5 : 25,
                        height: Platform.OS === 'android' ? 22.5 : 25,
                        tintColor: focused ? tabActiveTintColor : tabTintColor,
                      }]}
                    />
                  )}
                />
                <Tab
                  path="/profile/(likes|bookmarks)"
                  component={Profile}
                  onRequestChangeTab={() => history.replace('/profile/likes')}
                  onReset={() => history.replace(`${url}/profile/likes`)}
                  label="Profile"
                  renderTabIcon={({ focused, tabTintColor, tabActiveTintColor }) => (
                    <Image
                      source={require('./assets/profile.png')}
                      style={{
                        marginBottom: Platform.OS === 'android' ? 0 : -2,
                        width: Platform.OS === 'android' ? 27.5 : 31,
                        height: Platform.OS === 'android' ? 27.5 : 31,
                        tintColor: focused ? tabActiveTintColor : tabTintColor,
                      }}
                    />
                  )}
                />
              </BottomNavigation>
            </View>
          )}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
