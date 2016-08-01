import React, { Component } from 'react'
import { View } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

class HistoryScene extends Component {

  static title: string = "History"
  static navBarStyle: Object = { backgroundColor: '#8A0262' }
  static titleStyle: Object = { color: 'white' }
  static statusBarStyle: string = 'light-content'

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
