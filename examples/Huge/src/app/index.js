/* eslint global-require: 0 */

import React from 'react'
import { StatusBar, View, Image, Text } from 'react-native'
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
            tabActiveTintColor={BRAND_COLOR_60}
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
              renderIcon={() => (
                <Image
                  source={require('./assets/feed.png')}
                  style={{ top: 1.5, width: 22.5, height: 22.5, tintColor: 'white' }}
                />
              )}
            />
            <Tab
              path={`${url}/profile`}
              component={Profile}
              onReset={() => props.history.replace(`${url}/profile/likes`)}
              label="Profile"
              renderIcon={() => (
                <Image
                  source={require('./assets/profile.png')}
                  style={{ top: -.75, width: 27.5, height: 27.5, tintColor: 'white' }}
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
