/* @flow */

import * as React from 'react'
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Link } from 'react-router-native'
import { Tabs, Tab } from 'react-router-navigation'
import { TabBar, type SceneRendererProps } from 'react-native-tab-view'
import { SafeAreaView } from 'react-navigation'
import { NEUTRAL_COLOR_50, BRAND_COLOR_50 } from './theme'

const styles = StyleSheet.create({
  tabBarSafeView: {
    backgroundColor: BRAND_COLOR_50,
  },
  tabBar: {
    paddingTop:
      Platform.OS === 'ios' && Dimensions.get('window').height !== 812 ? 10 : 0,
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
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  link: {
    marginTop: 12,
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
  separator: {
    backgroundColor: NEUTRAL_COLOR_50,
    marginVertical: 20,
    width: '75%',
    height: 1 / PixelRatio.get(),
  },
})

type Props = {}

type State = {|
  tabsLength: number,
|}

export default class Profile extends React.Component<Props, State> {
  state = { tabsLength: 2 }

  renderTabBar = (tabBarProps: SceneRendererProps<any>) => {
    return (
      <SafeAreaView
        forceInset={{ bottom: 'never', top: 'always' }}
        style={styles.tabBarSafeView}
      >
        <TabBar {...tabBarProps} />
      </SafeAreaView>
    )
  }

  renderTabLikes = () => {
    const { tabsLength } = this.state
    return (
      <View style={styles.scene}>
        <Text>
          Current: <Text style={styles.strong}>likes</Text>
        </Text>
        <Link
          style={styles.link}
          replace={true}
          component={TouchableOpacity}
          to="/profile/bookmarks"
        >
          <Text style={styles.span}>Go to bookmarks</Text>
        </Link>
        <Link
          style={styles.link}
          replace={true}
          component={TouchableOpacity}
          to="/feed/article/4"
        >
          <Text style={styles.span}>Go to the article #4 (replace)</Text>
        </Link>
        <Link
          style={styles.link}
          component={TouchableOpacity}
          to="/feed/article/4"
        >
          <Text style={styles.span}>Go to the article #4 (push)</Text>
        </Link>
        {tabsLength === 2 && (
          <TouchableOpacity
            style={styles.link}
            onPress={this.handleToggleSettingsTab}
          >
            <Text style={styles.span}>Add settings tab</Text>
          </TouchableOpacity>
        )}
        {tabsLength === 3 && (
          <Link
            style={styles.link}
            replace={true}
            component={TouchableOpacity}
            to="/profile/settings"
          >
            <Text style={styles.span}>Go to settings</Text>
          </Link>
        )}
      </View>
    )
  }

  renderTabBookmarks = () => {
    const { tabsLength } = this.state
    return (
      <View style={styles.scene}>
        <Text>
          Current: <Text style={styles.strong}>bookmarks</Text>
        </Text>
        <Link
          style={styles.link}
          replace={true}
          component={TouchableOpacity}
          to="/profile/likes"
        >
          <Text style={styles.span}>Go to likes</Text>
        </Link>
        {tabsLength === 2 && (
          <TouchableOpacity
            style={styles.link}
            onPress={this.handleToggleSettingsTab}
          >
            <Text style={styles.span}>Add settings tab</Text>
          </TouchableOpacity>
        )}
        {tabsLength === 3 && (
          <Link
            style={styles.link}
            replace={true}
            component={TouchableOpacity}
            to="/profile/settings"
          >
            <Text style={styles.span}>Go to settings</Text>
          </Link>
        )}
      </View>
    )
  }

  renderTabSettings = () => {
    return (
      <View style={styles.scene}>
        <Text>
          Current: <Text style={styles.strong}>settings</Text>
        </Text>
        <Link
          style={styles.link}
          replace={true}
          component={TouchableOpacity}
          to="/profile/likes"
        >
          <Text style={styles.span}>Go to likes</Text>
        </Link>
        <Link
          style={styles.link}
          replace={true}
          component={TouchableOpacity}
          to="/profile/bookmarks"
        >
          <Text style={styles.span}>Go to bookmarks</Text>
        </Link>
      </View>
    )
  }

  handleToggleSettingsTab = () => {
    this.setState(prevState => ({
      tabsLength: prevState.tabsLength === 2 ? 3 : 2,
    }))
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.tabsLength !== nextState.tabsLength
  }

  render() {
    const { tabsLength } = this.state
    return (
      <Tabs
        tabBarStyle={styles.tabBar}
        tabBarIndicatorStyle={styles.indicatorStyle}
        renderTabBar={this.renderTabBar}
      >
        <Tab path="/profile/likes" label="Likes" render={this.renderTabLikes} />
        <Tab
          path="/profile/bookmarks"
          label="Bookmarks"
          render={this.renderTabBookmarks}
        />
        {tabsLength === 3 && (
          <Tab
            path="/profile/settings"
            label="Settings"
            render={this.renderTabSettings}
          />
        )}
      </Tabs>
    )
  }
}
