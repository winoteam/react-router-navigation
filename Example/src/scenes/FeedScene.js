import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const FeedScene = (props) => {
  const { router } = props
  return (
    <View style={styles.container}>
      <Row onPress={router.pop}>Pop</Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 64 : 56,
  },
})

export default withRouter(FeedScene)
