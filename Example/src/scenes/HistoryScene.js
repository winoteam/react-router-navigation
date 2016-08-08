import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

class HistoryScene extends Component {

  static propTypes = {
    router: PropTypes.shape({
      pop: PropTypes.func.isRequired,
    }),
  }

  static title = 'History'
  static navBarStyle = { backgroundColor: '#8A0262' }
  static titleStyle = { color: 'white' }
  static statusBarStyle = 'light-content'

  render() {
    const { router } = this.props
    return (
      <View>
        <Row onPress={router.pop}>
          Pop
        </Row>
      </View>
    )
  }

}

export default withRouter(HistoryScene)
