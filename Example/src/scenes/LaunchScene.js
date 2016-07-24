import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const LaunchScene = (props) => {
  const { router } = props
  return (
    <View style={styles.container}>
      <Row onPress={() => router.push('feed')}>
        Go to feed
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default withRouter(LaunchScene)
