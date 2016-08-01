/* @flow */

import React from 'react'
import { View } from 'react-native'
import Router, { Scene } from 'react-native-router-navigation'
import LaunchScene from './scenes/LaunchScene'
import AuthScene from './scenes/AuthScene'
import AppScene from './scenes/AppScene'
import FeedScene from './scenes/FeedScene'
import ArticleScene from './scenes/ArticleScene'
import HistoryScene from './scenes/HistoryScene'

export default () => (
  <Router>
    <Scene key="launch" component={LaunchScene} />
    <Scene key="auth" component={AuthScene} />
    <Scene key="app" tabs="true" component={AppScene}>
      <Scene key="feed" component={FeedScene}>
        <Scene key="article" component={ArticleScene} />
      </Scene>
      <Scene key="history" component={HistoryScene} />
    </Scene>
  </Router>
)
