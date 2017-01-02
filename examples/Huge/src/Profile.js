import React from 'react'
import { StatusBar, StyleSheet, Platform, View, Text } from 'react-native'
import { Match, Redirect } from 'react-router'
import { Tabs, MatchTab } from 'react-native-router-navigation'

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
    backgroundColor: '#8a0262',
  },
})

const Profile = () => (
  <View style={styles.container}>
    <Match
      exactly
      pattern="/app/profile"
      render={() => <Redirect to="/app/profile/likes" />}
    />
    <Match
      pattern="/app/profile/(likes|bookmarks)"
      render={() => (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#730652"
          />
          <Tabs tabBarStyle={styles.tabBar}>
            <MatchTab
              pattern="/app/profile/likes"
              label="Likes"
              render={() => (
                <View style={styles.scene}>
                  <Text>Likes</Text>
                </View>
              )}
            />
            <MatchTab
              pattern="/app/profile/bookmarks"
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
