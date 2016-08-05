import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

class LaunchScene extends Component {

  static title: string = 'Launch'
  static navBarStyle: Object = { backgroundColor: '#8A0262' }
  static titleStyle: Object = { color: 'white' }
  static statusBarStyle: string = 'light-content'

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('auth')}>
          Go to auth
        </Row>
        <Row onPress={() => router.push('app')}>
          Go to app
        </Row>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default withRouter(LaunchScene)
