import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { withHistory } from 'react-native-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 14,
  },
})

class Launch extends Component {

  componentDidMount() {
    const { history } = this.props
    setTimeout(() => {
      history.replace('auth')
    }, 1500)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loader} />
        <Text>Loading ...</Text>
      </View>
    )
  }

}

export default withHistory(Launch)
