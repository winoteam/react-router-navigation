import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
})

class AuthScene extends Component {

  static propTypes = {
    router: PropTypes.shape({
      pop: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }),
  }

  static title = 'Auth'
  static navBarStyle = {
    backgroundColor: '#e91d56',
    borderBottomWidth: 0,
  }
  static titleStyle = { color: 'white' }
  static backButtonStyle = 'light'
  static statusBarStyle = Platform.OS === 'ios' ? 'light-content' : '#d11348'

  render() {
    const { router } = this.props
    return (
      <View style={styles.container}>
        <Row onPress={() => router.push('welcome')}>
          Push to welcome scene
        </Row>
        <Row onPress={router.pop}>
          Pop to launch scene
        </Row>
      </View>
    )
  }

}

export default withRouter(AuthScene)
