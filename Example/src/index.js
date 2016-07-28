/* @flow */

import React from 'react'
import { View } from 'react-native'
import Router, { Scene } from 'react-native-router-navigation'
import { LaunchScene, FeedScene, HistoryScene, ArticleScene } from '@scenes'

export default () => (
  <Router>
    <Scene key="launch" title="Launch" component={LaunchScene} />
    <Scene key="app" tabs="true">
      <Scene key="feed" title="Feed" component={FeedScene}>
        <Scene key="article" title="Article" component={ArticleScene} />
      </Scene>
      <Scene key="history" title="History" component={HistoryScene} />
    </Scene>
  </Router>
)
