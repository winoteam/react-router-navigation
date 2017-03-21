/* eslint global-require: 0 */

import React from 'react'
import { StatusBar, Platform, View, Image, Text } from 'react-native'
import { withRouter, Switch, Route, Redirect } from 'react-router'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { BRAND_COLOR_60 } from '@ressources/theme'
import Feed from './modules/Feed'
import Profile from './modules/Profile'
import Modal from './components/Modal'
import styles from './styles'

const App = (props) => (
  <Switch>
    <Route
      exact
      path="/app"
      render={({ match }) => <Redirect to={`${match.url}/feed`} />}
    />
    <Route
      path="/app"
      render={({ location, match: { state, url } }) => (
        <View style={styles.tabs}>
          <Modal
            isOpen={state && state.modal.isOpen}
            renderContent={() => (
              <Text style={styles.modal}>My modal</Text>
            )}
          />
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
            labelStyle={({ isActive }) => isActive && styles.activeLabel}
            tabTintColor={Platform.OS === 'android' ? 'white' : '#a5aaB2'}
            tabActiveTintColor={Platform.OS === 'android' ? 'white' : BRAND_COLOR_60}
          >
            <Tab
              path={`${url}/feed`}
              render={(ownProps) => (
                <Feed
                  {...ownProps}
                  ref={(c) => this.feed = c}
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
                    top: Platform.OS === 'android' ? 1.5 : 2.5,
                    width: Platform.OS === 'android' ? 22.5 : 25,
                    height: Platform.OS === 'android' ? 22.5 : 25,
                    tintColor: focused ? tabActiveTintColor : tabTintColor,
                  }]}
                />
              )}
            />
            <Tab
              path={`${url}/profile`}
              component={Profile}
              onReset={() => props.history.replace(`${url}/profile/likes`)}
              label="Profile"
              renderTabIcon={({ focused, tabTintColor, tabActiveTintColor }) => (
                <Image
                  source={require('./assets/profile.png')}
                  style={{
                    top: Platform.OS === 'android' ? -.75 : 2.25,
                    width: Platform.OS === 'android' ? 27.5 : 30,
                    height: Platform.OS === 'android' ? 27.5 : 30,
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
)

export default withRouter(App)
