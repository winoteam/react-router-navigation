/* @flow */

import React from 'react'
import { Platform, Image } from 'react-native'
import { BottomNavigation, Tab } from 'react-router-navigation'
import type { RouterHistory } from 'react-router'
import Feed from './Feed'
import Profile from './Profile'
import { NEUTRAL_COLOR_50, BRAND_COLOR_60 } from './theme'

type Props = {
  history: RouterHistory,
}

class App extends React.Component<Props> {
  props: Props
  feed: Feed

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { history } = this.props
    return (
      <BottomNavigation tabTintColor={NEUTRAL_COLOR_50} tabActiveTintColor={BRAND_COLOR_60}>
        <Tab
          path="/feed"
          render={ownProps => (
            <Feed
              {...ownProps}
              ref={c => {
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
              style={[
                {
                  marginBottom: Platform.OS === 'android' ? 2.5 : 1,
                  width: Platform.OS === 'android' ? 22.5 : 25,
                  height: Platform.OS === 'android' ? 22.5 : 25,
                  tintColor: focused ? tabActiveTintColor : tabTintColor,
                },
              ]}
            />
          )}
        />
        <Tab
          path="/profile/(likes|bookmarks|settings)"
          component={Profile}
          onIndexChange={() => history.replace('/profile/likes')}
          onReset={() => history.replace('/profile/likes')}
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
    )
  }
}

export default App
