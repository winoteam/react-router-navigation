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
  static renderTabIcon = ({ active }) => (
    active
      ? <Image source={require('./../assets/icon-blue.png')} />
      : <Image source={require('./../assets/icon-default.png')} />
  )
  static wrapInScrollView = true

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        {Array.from({ length: 20 }).map((item, index) => (
          <Row
            key={index}
            onPress={() => router.push({
              key: 'article',
              params: {
                articleId: index,
              },
            })}
          >
            Push to article n°{index}
          </Row>
        ))}
      </View>
    )
  }

}

export default withRouter(FeedScene)
