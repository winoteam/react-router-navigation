import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-native'
import { Tabs, Tab } from 'react-router-navigation'
import styles from './styles'

const Profile = () => (
  <View style={styles.container}>
    <Route
      exact
      path="/app/profile"
      render={() => <Redirect to="/app/profile/likes" />}
    />
    <Route
      path="/app/profile/(likes|bookmarks)"
      render={() => (
        <View style={styles.container}>
          <Tabs
            tabBarStyle={styles.tabBar}
            tabBarIndicatorStyle={styles.indicatorStyle}
          >
            <Tab
              path="/app/profile/likes"
              label="Likes"
              render={() => (
                <View style={styles.scene}>
                  <Text>Current: <Text style={styles.strong}>likes</Text></Text>
                  <Link
                    style={styles.link}
                    replace
                    component={TouchableOpacity}
                    to="/app/profile/bookmarks"
                  >
                    <Text style={styles.span}>Go to bookmarks</Text>
                  </Link>
                </View>
              )}
            />
            <Tab
              path="/app/profile/bookmarks"
              label="Bookmarks"
              render={() => (
                <View style={styles.scene}>
                  <Text>Current: <Text style={styles.strong}>bookmarks</Text></Text>
                  <Link
                    style={styles.link}
                    replace
                    component={TouchableOpacity}
                    to="/app/profile/likes"
                  >
                    <Text style={styles.span}>Go to likes</Text>
                  </Link>
                </View>
              )}
            />
          </Tabs>
        </View>
      )}
    />
  </View>
)

export default Profile
