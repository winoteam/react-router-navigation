/* @flow */

import React from 'react'
import { View } from 'react-native'
import Router, { Scene } from 'react-native-router-navigation'
import { LaunchScene, FeedScene, HistoryScene } from '@scenes'

export default () => (
  <Router>
    <Scene key="launch" title="Launch" component={LaunchScene} />
    <Scene key="app" tabs="true">
      <Scene key="feed" title="Feed" component={FeedScene} />
      <Scene key="history" title="History" component={HistoryScene} />
    </Scene>
  </Router>
)
