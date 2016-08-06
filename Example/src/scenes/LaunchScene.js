import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
})

class LaunchScene extends Component {

  static propTypes = {
    router: PropTypes.shape({
      pop: PropTypes.func,
      push: PropTypes.func,
    }),
  }

  static title = 'Launch'

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

export default withRouter(LaunchScene)
