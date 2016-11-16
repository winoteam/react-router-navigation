/* @flow */
/* eslint no-use-before-define: 0 */
/* eslint react/no-multi-comp: 0 */
/* eslint react/jsx-first-prop-new-line: 0 */

import React, { Component } from 'react'
import ReactNative, { AppRegistry, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native'
import { MemoryRouter, Match } from 'react-router'
import Navigator from './modules/Navigator'
import ScrollScene from './modules/ScrollScene'
import Tabs from './modules/Tabs'
import BottomNavigation from './modules/BottomNavigation'

class HomeScene extends Component {
  static title = 'Home'
  render() {
    return (
      <View style={styles.scene}>
        <Text style={styles.welcome}>
          Welcome to React Native! =)
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Link to="/app/feed">Go to app (feed)</Link>
      </View>
    )
  }
}

class FeedIndexScene extends Component {
  static title = 'Feed'
  static statusBarBackgroundColor = '#871c61' // android
  static statusBarStyle = 'light-content' // ios
  static navBarStyle = { backgroundColor: '#9f1d71', elevation: 0 }
  static titleStyle = { color: 'white' }
  render() {
    return (
      <View style={styles.scene}>
        <Text style={styles.welcome}>
          Feed
        </Text>
        <Link to="/app/feed/foo">Go to foo</Link>
      </View>
    )
  }
}

class FeedFooScene extends Component {
  static title = 'Feed'
  static statusBarBackgroundColor = '#871c61' // android
  static statusBarStyle = 'light-content' // ios
  static navBarStyle = { backgroundColor: '#9f1d71', elevation: 0 }
  static backButtonStyle = 'light'
  static titleStyle = { color: 'white' }
  render() {
    return (
      <View style={styles.scene}>
        <Text style={styles.welcome}>
          Feed
        </Text>
      </View>
    )
  }
}

class Historic extends Component {

  static title = 'Historic'
  static hideNavBar : true
  static tabBarStyle = { backgroundColor: '#9f1d71' }

  render() {
    return (
      <Tabs {...this.props}>
        <Match
          exactly
          pattern="/app/historic/first"
          component={() => (
            <ScrollScene style={styles.scene}>
              <Text>First tab</Text>
            </ScrollScene>
          )}
        />
        <Match
          exactly
          pattern="/app/historic/second"
          component={() => (
            <ScrollScene style={styles.scene}>
              <Text>Second tab</Text>
            </ScrollScene>
          )}
        />
      </Tabs>
    )
  }

}

class FeedScene extends Component {
  static title = 'Feed'
  render() {
    return (
      <Navigator {...this.props}>
        <Match exactly pattern="/app/feed" component={FeedIndexScene} />
        <Match exactly pattern="/app/feed/foo" component={FeedFooScene} />
      </Navigator>
    )
  }
}

const Link = ({ to, children }, context) => {
  const pressHandler = () => context.router.transitionTo(to)
  return (
    <TouchableWithoutFeedback onPress={pressHandler}>
      <View style={styles.link}>
        <Text>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
Link.contextTypes = { router: React.PropTypes.object }

class AppScene extends Component {

  static title = 'App'
  static hideNavBar = true

  render() {
    return (
      <BottomNavigation {...this.props}>
        <Match pattern="/app/feed" component={FeedScene} />
        <Match pattern="/app/historic" component={Historic} />
      </BottomNavigation>
    )
  }

}

const Root = () => (
  <MemoryRouter>
    <Navigator {...this.props}>
      <Match exactly pattern="/" component={HomeScene} />
      <Match pattern="/app" component={AppScene} />
    </Navigator>
  </MemoryRouter>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  link: {
    padding: 10,
  },
  footer: {
    marginBottom: 10,
  },
})

AppRegistry.registerComponent('Lab', () => Root)
