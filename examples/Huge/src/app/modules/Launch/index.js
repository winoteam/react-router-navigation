import React, { Component } from 'react'
import { View, StatusBar, ActivityIndicator, Text } from 'react-native'
import { withRouter } from 'react-router'
import styles from './styles'

class Launch extends Component {

  componentDidMount() {
    const { replace } = this.props
    setTimeout(() => {
      replace('/auth')
    }, 1500)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="default"
        />
        <ActivityIndicator style={styles.loader} />
        <Text>Loading ...</Text>
      </View>
    )
  }

}

export default withRouter(Launch)
