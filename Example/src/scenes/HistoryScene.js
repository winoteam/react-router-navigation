/* eslint-disable global-require */

import React, { PropTypes, Component } from 'react'
import { Platform, StyleSheet, View, Image } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
})

class HistoryScene extends Component {

  static propTypes = {
    router: PropTypes.shape({
      pop: PropTypes.func.isRequired,
    }),
  }

  static title = 'History'
  static renderTabIcon = ({ active }) => (
    active
      ? <Image source={require('./../assets/icon-blue.png')} />
      : <Image source={require('./../assets/icon-default.png')} />
  )
  static navBarStyle = { backgroundColor: '#8A0262' }
  static titleStyle = { color: 'white' }
  static statusBarStyle = 'light-content'
  static wrapInScrollView = true
  static hideNavBarOnScroll = true

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        {Array.from({ length: 20 }).map((item, index) => (
          <Row key={index} onPress={() => router.push('article')}>
            Article n°{index}
          </Row>
        ))}
      </View>
    )
  }

}

export default withRouter(HistoryScene)
