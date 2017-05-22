/* @flow */

import React from 'react'
import { StyleSheet, Platform, View, TouchableOpacity, Text } from 'react-native'
import { Route, Redirect } from 'react-router'
import type { Match } from 'react-router'
import { Link } from 'react-router-native'
import { Tabs, Tab } from 'react-router-navigation'
import { BRAND_COLOR_50 } from './theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: BRAND_COLOR_50,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  link: {
    marginTop: 20,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND_COLOR_50,
    borderRadius: 3,
  },
  span: {
    color: BRAND_COLOR_50,
  },
  strong: {
    fontWeight: '700',
  },
})

type Props = {
  match: Match,
}

const Profile = ({ match: { url } }: Props): React$Element<any> => (
  <View style={styles.container}>
    <Route
      exact
      path={url}
      render={() => <Redirect to="/app/profile/likes" />}
    />
    <Route
      path={`${url}/(likes|bookmarks)`}
      render={() => (
        <View style={styles.container}>
          <Tabs
            tabBarStyle={styles.tabBar}
            tabBarIndicatorStyle={styles.indicatorStyle}
          >
            <Tab
              path={`${url}/likes`}
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
              path={`${url}/bookmarks`}
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
