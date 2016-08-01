import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

class WelcomeScene extends Component {

  static title: string = 'Welcome'
  static navBarStyle: Object = {
    backgroundColor: '#e91d56',
    borderBottomWidth: 0,
  }
  static titleStyle: Object = { color: 'white' }
  static backButtonStyle: string = 'light'
  static statusBarStyle: string = 'light-content'

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('app')}>
          Go to app  (tabs)
        </Row>
        <Row onPress={router.pop}>
          Pop to launch scene
        </Row>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default withRouter(WelcomeScene)
