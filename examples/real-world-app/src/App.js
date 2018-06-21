/* @flow */

import * as React from 'react'
import { Platform, Image } from 'react-native'
import { BottomNavigation, Tab } from 'react-router-navigation'
import type { RouterHistory, ContextRouter } from 'react-router'
import Feed from './Feed'
import Profile from './Profile'
import { NEUTRAL_COLOR_50, BRAND_COLOR_60 } from './theme'

type Props = {
  history: RouterHistory,
}

class App<T> extends React.Component<Props> {
  feed: ?Feed = null

  onReset = () => {
    if (this.feed && this.feed.listView) {
      this.feed.listView.scrollTo({ y: 0 })
    }
  }

  renderFeed = (contextRouter: ContextRouter) => {
    return (
      <Feed
        ref={c => (this.feed = c)}
        history={contextRouter.history}
        location={contextRouter.location}
        match={contextRouter.match}
      />
    )
  }

  renderTabIcon = (tabIconProps: {
    tabActiveTintColor: string,
    tabTintColor: string,
    focused: boolean,
    route: { routeName: string },
  }) => {
    const { route, focused, tabActiveTintColor, tabTintColor } = tabIconProps
    switch (route.routeName) {
      case '/feed':
        return (
          <Image
            source={require('./assets/feed.png')}
            style={{
              marginBottom: Platform.OS === 'android' ? 2.5 : 1,
              width: Platform.OS === 'android' ? 22.5 : 25,
              height: Platform.OS === 'android' ? 22.5 : 25,
              tintColor: focused ? tabActiveTintColor : tabTintColor,
            }}
          />
        )
      case '/profile/(likes|bookmarks|settings)':
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
      default:
        return null
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { history } = this.props
    return (
      <BottomNavigation
        tabTintColor={NEUTRAL_COLOR_50}
        tabActiveTintColor={BRAND_COLOR_60}
      >
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
          onRequestChangeTab={() => history.replace('/profile/likes')}
          onReset={() => history.replace('/profile/likes')}
          label="Profile"
          renderTabIcon={this.renderTabIcon}
        />
      </BottomNavigation>
    )
  }
}

export default App
