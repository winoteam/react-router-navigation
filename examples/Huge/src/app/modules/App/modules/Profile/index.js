import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { Route, Redirect } from 'react-router'
import { Tabs, Tab } from 'react-router-navigation'
import { BRAND_COLOR_60 } from '@ressources/theme'
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
          <StatusBar
            barStyle="light-content"
            backgroundColor={BRAND_COLOR_60}
          />
          <Tabs
            tabBarStyle={styles.tabBar}
            tabBarIndicatorStyle={styles.indicatorStyle}
          >
            <Tab
              path="/app/profile/likes"
              label="Likes"
              render={() => (
                <View style={styles.scene}>
                  <Text>Likes</Text>
                </View>
              )}
            />
            <Tab
              path="/app/profile/bookmarks"
              label="Bookmarks"
              render={() => (
                <View style={styles.scene}>
                  <Text>Bookmarks</Text>
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
