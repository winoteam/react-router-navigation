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
        <Link to="/app/feed">Go to app</Link>
      </View>
    )
  }
}

class FeedIndexScene extends Component {
  static hideNavBar = true
  static title = 'Feed'
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

class Historic extends Component {
  static title = 'Historic'
  render() {
    return (
      <ScrollScene style={styles.scene}>
        <Text style={styles.welcome}>
          Historic
        </Text>
      </ScrollScene>
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

// class AppScene extends Component {
//
//   static statusBarStyle = 'light-content'
//   static navBarStyle = { backgroundColor: '#9f1d71', elevation: 0 }
//   static title = 'App'
//   static titleStyle = { color: 'white' }
//   static backButtonStyle = 'light'
//   static tabBarStyle = { backgroundColor: '#9f1d71' }
//
//   render() {
//     return (
//       <Tabs {...this.props}>
//         <Match exactly pattern="/app/feed" component={FeedIndexScene} />
//         <Match exactly pattern="/app/historic" component={Historic} />
//       </Tabs>
//     )
//   }
//
// }

class AppScene extends Component {

  static statusBarStyle = 'light-content'
  static navBarStyle = { backgroundColor: '#9f1d71', elevation: 0 }
  static title = 'App'
  static titleStyle = { color: 'white' }
  static backButtonStyle = 'light'
  static tabBarStyle = { backgroundColor: '#9f1d71' }

  render() {
    return (
      <BottomNavigation {...this.props}>
        <Match exactly pattern="/app/feed" component={FeedIndexScene} />
        <Match exactly pattern="/app/historic" component={Historic} />
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
    paddingTop: 54,
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
