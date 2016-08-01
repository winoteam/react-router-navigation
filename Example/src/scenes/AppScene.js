import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Row from '@components/Row'

class AppScene extends Component {

  static title: string = 'App'
  static navBarStyle: Object = {
    backgroundColor: '#e91d56',
    borderBottomWidth: 0,
  }
  static titleStyle: Object = { color: 'white' }
  static hideBackButton: string = true
  static statusBarStyle: string = 'light-content'

  render() {
    const { children } = this.props
    console.log('AppScene', children)
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default AppScene
