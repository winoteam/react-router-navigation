import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

class FeedScene extends Component {

  static title: string = 'Feed'

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('article')}>Push to article</Row>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default withRouter(FeedScene)
