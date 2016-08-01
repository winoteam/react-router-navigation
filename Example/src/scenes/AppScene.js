import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

class AppScene extends Component {

  static title: string = 'Yolo'
  static navBarStyle: Object = {
    backgroundColor: '#e91d56',
    borderBottomWidth: 0,
  }
  static titleStyle: Object = { color: 'white' }
  static hideBackButton: string = true
  static statusBarStyle: string = 'light-content'

  render() {
    const { children } = this.props
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
  },
})

export default AppScene
