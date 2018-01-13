/* @flow */

import React from 'react'
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { Link } from 'react-router-native'
import { Tabs, Tab } from 'react-router-navigation'
import { BRAND_COLOR_50 } from './theme'

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: BRAND_COLOR_50,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

type Props = {}

class Profile extends React.Component<Props> {
  props: Props

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Tabs
        tabBarStyle={styles.tabBar}
        tabBarIndicatorStyle={styles.indicatorStyle}
      >
        <Tab
          path="/profile/likes"
          label="Likes"
          render={() => (
            <View style={styles.scene}>
              <Text>
                Current: <Text style={styles.strong}>likes</Text>
              </Text>
              <Link
                style={styles.link}
                replace
                component={TouchableOpacity}
                to="/profile/bookmarks"
              >
                <Text style={styles.span}>Go to bookmarks</Text>
              </Link>
            </View>
          )}
        />
        <Tab
          path="/profile/bookmarks"
          label="Bookmarks"
          render={() => (
            <View style={styles.scene}>
              <Text>
                Current: <Text style={styles.strong}>bookmarks</Text>
              </Text>
              <Link
                style={styles.link}
                replace
                component={TouchableOpacity}
                to="/profile/likes"
              >
                <Text style={styles.span}>Go to likes</Text>
              </Link>
            </View>
          )}
        />
      </Tabs>
    )
  }
}

export default Profile
