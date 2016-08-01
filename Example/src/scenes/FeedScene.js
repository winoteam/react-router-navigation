import React from 'react'
import { View } from 'react-native'
import { withRouter } from 'react-native-router-navigation'
import Row from '@components/Row'

const FeedScene = (props) => {
  const { router } = props
  return (
    <View>
      <Row onPress={() => router.push('article')}>Push to article</Row>
    </View>
  )
}

export default withRouter(FeedScene)
