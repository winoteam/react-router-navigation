import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class AppScene extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  static navBarStyle = {
    backgroundColor: '#e91d56',
    borderBottomWidth: 0,
  }
  static titleStyle = { color: 'white' }
  static hideBackButton = true
  static statusBarStyle = 'light-content'

  render() {
    const { children } = this.props
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }

}

export default AppScene
