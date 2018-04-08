/* @flow */

import * as React from 'react'
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
  onReset() {
    if (this.feed && this.feed.listView) {
      this.feed.listView.scrollTo({ y: 0 })
    }
  }

  renderFeed(router: ContextRouter) {
    return (
      <Feed
        {...router}
        ref={c => {
          this.feed = c
        }}
      />
    )
  }

  renderTabIcon() {
    return (
      <Image
        source={require('./assets/profile.png')}
        style={{
          marginBottom: Platform.OS === 'android' ? 0 : -2,
          width: Platform.OS === 'android' ? 27.5 : 31,
          height: Platform.OS === 'android' ? 27.5 : 31,
          tintColor: focused ? tabActiveTintColor : tabTintColor,
        }}
      />
    )
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { history } = this.props
    return (
      <BottomNavigation tabTintColor={NEUTRAL_COLOR_50} tabActiveTintColor={BRAND_COLOR_60}>
        <Tab
          path="/feed"
          render={this.renderFeed}
          onReset={this.onReset}
          label="Feed"
          renderTabIcon={this.renderTabIcon}
        />
        <Tab
          path="/profile/(likes|bookmarks|settings)"
          component={Profile}
          onIndexChange={() => history.replace('/profile/likes')}
          onReset={() => history.replace('/profile/likes')}
          label="Profile"
          renderTabIcon={this.renderTabIcon}
        />
      </BottomNavigation>
    )
  }
}

export default App
