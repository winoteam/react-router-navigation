import React, { PropTypes, Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
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
      push: PropTypes.func,
    }),
  }

  static title = 'Feed'

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('article')}>Push to article</Row>
      </View>
    )
  }

}

export default withRouter(FeedScene)
