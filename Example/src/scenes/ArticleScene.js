import React, { PropTypes } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
})

const ArticleScene = (props) => {
  const { router } = props
  return (
    <View style={styles.container}>
      <Row onPress={router.pop}>Pop to feed</Row>
    </View>
  )
}

ArticleScene.propTypes = {
  router: PropTypes.shape({
    pop: PropTypes.func,
  }),
}

export default withRouter(ArticleScene)
