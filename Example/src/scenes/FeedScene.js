/* eslint-disable global-require */

import React, { PropTypes, Component } from 'react'
import { Platform, StyleSheet, View, Image } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
})

class FeedScene extends Component {

  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  }

  static title = 'Feed'
  static renderTabIcon = ({ selected }) => (
    selected
      ? <Image source={require('./../assets/icon-blue.png')} />
      : <Image source={require('./../assets/icon-default.png')} />
  )

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('article')}>Push to article</Row>
        <Row onPress={() => router.push('history')}>Push to historic</Row>
      </View>
    )
  }

}

export default withRouter(FeedScene)
