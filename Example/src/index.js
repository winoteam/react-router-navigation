import React from 'react'
import { View } from 'react-native'
import Router from 'react-native-router-navigation'
import { LaunchScene, FeedScene } from '@scenes'

const scenes = [{
  key: 'launch',
  title: 'Launch',
  component: LaunchScene,
}, {
  key: 'feed',
  title: 'Feed',
  component: FeedScene,
}]

export default () => {
  return (
    <Router scenes={scenes} />
  )
}
